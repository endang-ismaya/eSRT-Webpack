/* jshint esversion: 6 */
// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	// Disabling Button
	disableButtons();

	// -----------------------------------------
	// Add EventListener
	// -----------------------------------------
	$("#kgutsFolderPath").focus(clearOutputResult);
	$("#kgutsFolderPath").change(whenFolderIsChanged);
});

// -----------------------------------------
// Disable Buttons
// -----------------------------------------
function disableButtons() {
	$("#posthc-run").unbind("click", CreateHealthCheck);
	$("#posthc-run").removeClass("btn-success");
	$("#posthc-run").addClass("btn-secondary");
	$("#posthc-run").addClass("btn-secondary");
	$("#posthc-run").addClass("not-allowed");

	$("#posthc-read").unbind("click", ReadHealthCheck);
	$("#posthc-read").removeClass("btn-success");
	$("#posthc-read").addClass("btn-secondary");
	$("#posthc-read").addClass("btn-secondary");
	$("#posthc-read").addClass("not-allowed");
}

// -----------------------------------------
// Enable Buttons
// -----------------------------------------
function enableButtons() {
	$("#posthc-run").bind("click", CreateHealthCheck);
	$("#posthc-run").removeClass("btn-secondary");
	$("#posthc-run").addClass("btn-success");
	$("#posthc-run").removeClass("not-allowed");

	$("#posthc-read").bind("click", ReadHealthCheck);
	$("#posthc-read").removeClass("btn-secondary");
	$("#posthc-read").addClass("btn-success");
	$("#posthc-read").removeClass("not-allowed");
}

// -----------------------------------------
// When Folder is changed
// -----------------------------------------
function whenFolderIsChanged() {
	// Start spinner
	spinner_executing();

	let folderPath = $("#kgutsFolderPath").val();

	$.ajax({
		type: "POST",
		url: "http://localhost/srtwp/tools/is_filefolder_exists",
		data: {
			pathFolder: folderPath
		},
		success: cbSuccessWhenFolderIsChanged,
		error: function(err) {
			console.log(err);
		}
	});
}

function cbSuccessWhenFolderIsChanged(message) {
	// Stop Spinner
	spinner_post();

	if (message === "exists") {
		enableButtons();
		$("#body-report").html(
			`<pre id="output-result" class="output-result"></pre>`
		);
	} else {
		disableButtons();
		noFolderSelection();
	}
}

// -----------------------------------------
// Run HealthCheck
// -----------------------------------------
function CreateHealthCheck() {
	let folderPath = $("#kgutsFolderPath").val();

	if (folderPath != "--Select Folder--") {
		// Start spinner
		spinner_executing();

		// Post Method
		$.ajax({
			type: "POST",
			url: "http://localhost/srtwp/tools/run_script",
			data: {
				pathFolder: folderPath,
				scripts: "ATT-IXHEALTHCHECK",
				options: folderPath
			},
			success: cbCreateHealthCheck,
			error: function(err) {
				console.log(err);
			}
		});
	} else {
		noFolderSelection(); // at main.js
	}
}

// -----------------------------------------
// Callback function
// -----------------------------------------
function cbCreateHealthCheck(data) {
	// Stop spinner
	spinner_post();

	$("#output-result").addClass("console");
	$("#output-result").html(data);
}

// Read HC
function ReadHealthCheck() {
	let folderPath = $("#kgutsFolderPath").val();

	if (folderPath != "--Select Folder--") {
		// Start spinner
		spinner_executing();

		// Post Method
		$.ajax({
			type: "POST",
			url: "http://localhost/srtwp/tools/run_script",
			data: {
				pathFolder: folderPath,
				scripts: "ATT-READ-IXHEALTHCHECK",
				options: folderPath
			},
			success: cbReadHealthCheck,
			error: function(err) {
				console.log(err);
			}
		});
	} else {
		noFolderSelection(); // at main.js
	}
}
function cbReadHealthCheck(data) {
	$("body").removeClass("others");

	if (data.includes("404 Error")) {
		$("#output-result").addClass("console");
		$("#output-result").html(data);
	} else {
		let accordion = `<div class="accordion" id="accordionHC">`;

		const dataString = data.toString().split("\n");
		const { dataList, earfcnDlList } = separateSite(dataString);
		let html = "";

		for (let index = 0; index < dataList.length; index++) {
			const element = dataList[index];
			let result = "";

			let siteData = GetSiteIdAndSWVersion(element);
			let FDDList = CountFDD(element);
			const { output, report } = readAllData(
				element,
				siteData["swversion"],
				FDDList,
				siteData["siteid"],
				earfcnDlList
			);
			let header = `<h1 id="summary-${siteData["siteid"]}">SITE-ID: ${siteData["siteid"]} ${siteData["swversion"]}</h1>`;

			result += header;
			result += `<div>${report}</div>`;
			result += output;
			result += `<br />`;
			result += `<br />`;

			const btnSummary = `<a class="btn btn-outline-info text-white" href="#summary-${siteData["siteid"]}">Back to Summary</a>`;
			result += btnSummary;

			let resultCard = `
		<div class="card">
			<div class="card-header" id="accordion${siteData["siteid"]}">
				<h2 class="mb-0">
					<button class="btn btn-link display-3" type="button" data-toggle="collapse" data-target="#${siteData["siteid"]}">
						${siteData["siteid"]}
					</button>
				</h2>
			</div>

			<div id="${siteData["siteid"]}" class="collapse" data-parent="#accordionHC">
				<div class="card-body p-0 m-0">
					<pre class="output-result console text-monospace ml-1 mr-1">${result}</pre>
				</div>
			</div>
		</div>
		`;
			html += resultCard;
		}

		html = accordion + html;
		html += `</div>`;

		$("#body-report").html(html);
	}

	// Stop spinner
	spinner_post();
}

function CountFDD(dataString) {
	let FDDList = [];
	let dataStart = false;
	const fddPattern = /^EUtranCellFDD=.*/;

	for (let index = 0; index < dataString.length; index++) {
		const element = dataString[index];

		if (element.includes("## start-FDDStatus")) {
			dataStart = true;
		} else if (element.includes("## end-FDDStatus")) {
			dataStart = false;
			break;
		}

		if (dataStart && fddPattern.test(element)) {
			let fdd = element.split(/\s+/);
			FDDList.push(fdd[0].replace("EUtranCellFDD=", ""));
		}
	}

	return FDDList;
}

function separateSite(dataString) {
	let dataList = [];
	let dataSite = [];
	let dataStart = false;
	let earfcnDlStart = false;
	const earfcnDlPattern = /^EUtranCellFDD=.*/;
	let earfcnDlList = [];

	for (let index = 0; index < dataString.length; index++) {
		const element = dataString[index];

		if (element.includes("## start-HC")) {
			dataStart = true;
		} else if (element.includes("## end-HC")) {
			dataStart = false;
			dataList.push(dataSite);
			dataSite = [];
		} else if (element.includes("## start-FDDStatus")) {
			earfcnDlStart = true;
		} else if (element.includes("## end-FDDStatus")) {
			earfcnDlStart = false;
		}

		if (dataStart) {
			dataSite.push(element);
		}

		if (earfcnDlStart && earfcnDlPattern.test(element)) {
			const earfcnDl = Number(element.split(/\s+/)[1]);
			if (!earfcnDlList.includes(earfcnDl)) {
				earfcnDlList.push(earfcnDl);
			}
		}
	}

	return { dataList, earfcnDlList };
}

function GetSiteIdAndSWVersion(dataString) {
	let siteData = {};

	for (let index = 0; index < dataString.length; index++) {
		const element = dataString[index];

		if (element.includes("## start-cvcu")) {
			const siteId = element.split("_")[1];
			siteData["siteid"] = siteId.trim();
		} else if (element.includes("Current SwVersion:")) {
			let swversion = element.split(" ");
			swversion = swversion[swversion.length - 1];
			siteData["swversion"] = swversion.trim();
			return siteData;
		}
	}
}

function readAllData(dataString, swVersion, FDDList, siteID, earfcnDlList) {
	let output = "";
	let report = `<h5>Summary:</h5>`;

	// MME
	let mmeData = [];
	let mmeBool = false;
	const startMME = /.*## start-MME.*/;
	const endMME = /.*## end-MME.*/;

	// DiffAdmCtrlFilteringProfile
	let DiffAdmCtrlFilteringProfileData = [];
	let DiffAdmCtrlFilteringProfileBool = false;
	const startDiffAdmCtrlFilteringProfile = /.*## start-DiffAdmCtrlFilteringProfile.*/;
	const endDiffAdmCtrlFilteringProfile = /.*## end-DiffAdmCtrlFilteringProfile.*/;

	// MeasCellGroup
	let MeasCellGroupData = [];
	let MeasCellGroupBool = false;
	const startMeasCellGroup = /.*## start-MeasCellGroup.*/;
	const endMeasCellGroup = /.*## end-MeasCellGroup.*/;

	// measCellGroupUeRef
	let measCellGroupUeRefData = [];
	let measCellGroupUeRefBool = false;
	const startmeasCellGroupUeRef = /.*## start-measCellGroupUeRef.*/;
	const endmeasCellGroupUeRef = /.*## end-measCellGroupUeRef.*/;

	// SystemConstant
	let SystemConstantData = [];
	let SystemConstantBool = false;
	const startSystemConstant = /.*## start-SystemConstant.*/;
	const endSystemConstant = /.*## end-SystemConstant.*/;

	// UlCompGroup
	let UlCompGroupData = [];
	let UlCompGroupBool = false;
	const startUlCompGroup = /.*## start-UlCompGroup.*/;
	const endUlCompGroup = /.*## end-UlCompGroup.*/;

	// PmFlexCounterFilter
	let PmFlexCounterFilterData = [];
	let PmFlexCounterFilterBool = false;
	const startPmFlexCounterFilter = /.*## start-PmFlexCounterFilter.*/;
	const endPmFlexCounterFilter = /.*## end-PmFlexCounterFilter.*/;

	// PrefTrafficMgmt
	let PrefTrafficMgmtData = [];
	let PrefTrafficMgmtBool = false;
	const startPrefTrafficMgmt = /.*## start-PrefTrafficMgmt.*/;
	const endPrefTrafficMgmt = /.*## end-PrefTrafficMgmt.*/;

	// LinkBudget
	let LinkBudgetData = [];
	let LinkBudgetBool = false;
	const startLinkBudget = /.*## start-LinkBudget.*/;
	const endLinkBudget = /.*## end-LinkBudget.*/;

	// rfBranch
	let rfBranchData = [];
	let rfBranchBool = false;
	const startrfBranch = /.*## start-rfBranch.*/;
	const endrfBranch = /.*## end-rfBranch.*/;

	// auPortRef
	let auPortRefData = [];
	let auPortRefBool = false;
	const startauPortRef = /.*## start-auPortRef.*/;
	const endauPortRef = /.*## end-auPortRef.*/;

	// RATFreqPrio
	let RATFreqPrioData = [];
	let RATFreqPrioBool = false;
	const startRATFreqPrio = /.*## start-RATFreqPrio.*/;
	const endRATFreqPrio = /.*## end-RATFreqPrio.*/;

	// CVLS
	let CVLSData = [];
	let CVLSBool = false;
	const startCVLS = /.*## start-cvls.*/;
	const endCVLS = /.*## end-cvls.*/;

	// OTDOA
	let OTDOAData = [];
	let OTDOABool = false;
	const startOTDOA = /.*## start-OTDOA.*/;
	const endOTDOA = /.*## end-OTDOA.*/;

	// TermPointToENB
	let TermPointToENBData = [];
	let TermPointToENBBool = false;
	const startTermPointToENB = /.*## start-TermPointToENB.*/;
	const endTermPointToENB = /.*## end-TermPointToENB.*/;

	// BbLink
	let BbLinkData = [];
	let BbLinkBool = false;
	const startBbLink = /.*## start-BbLink.*/;
	const endBbLink = /.*## end-BbLink.*/;

	// PlmnAbConfProfile
	let PlmnAbConfProfileData = [];
	let PlmnAbConfProfileBool = false;
	const startPlmnAbConfProfile = /.*## start-PlmnAbConfProfile.*/;
	const endPlmnAbConfProfile = /.*## end-PlmnAbConfProfile.*/;

	// PtmFunction
	let PtmFunctionData = [];
	let PtmFunctionBool = false;
	const startPtmFunction = /.*## start-PtmFunction.*/;
	const endPtmFunction = /.*## end-PtmFunction.*/;

	for (let i = 0; i < dataString.length; i++) {
		line = dataString[i];

		if (startMME.test(line)) {
			mmeBool = true;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			SystemConstantBool = false;
			UlCompGroupBool = false;
			PmFlexCounterFilterBool = false;
			PrefTrafficMgmtBool = false;
			LinkBudgetBool = false;
			rfBranchBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endMME.test(line)) {
			mmeBool = false;
			let { html, isOK } = ReadMME(mmeData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#MME-${siteID}" class="btn btn-success w-25">MME: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#MME-${siteID}" class="btn btn-danger w-25">MME: NOT-OK</a></span>`;

			report += `<div class="mb-3">${tmpReport}`;
			output += html;
			mmeData = [];
		} else if (startDiffAdmCtrlFilteringProfile.test(line)) {
			DiffAdmCtrlFilteringProfileBool = true;
			mmeBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			SystemConstantBool = false;
			UlCompGroupBool = false;
			PmFlexCounterFilterBool = false;
			PrefTrafficMgmtBool = false;
			LinkBudgetBool = false;
			rfBranchBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endDiffAdmCtrlFilteringProfile.test(line)) {
			DiffAdmCtrlFilteringProfileBool = false;
			let { html, isOK } = ReadDiffAdmCtrlFilteringProfile(
				DiffAdmCtrlFilteringProfileData,
				siteID
			);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#DiffAdmCtrlFilteringProfile-${siteID}" class="btn btn-success w-25">DiffAdmCtrlFilteringProfile: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#DiffAdmCtrlFilteringProfile-${siteID}" class="btn btn-danger w-25">DiffAdmCtrlFilteringProfile: NOT-OK</a></span>`;

			report += `${tmpReport}</div>`;
			output += html;
			DiffAdmCtrlFilteringProfileData = [];
		} else if (startMeasCellGroup.test(line)) {
			MeasCellGroupBool = true;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			measCellGroupUeRefBool = false;
			SystemConstantBool = false;
			UlCompGroupBool = false;
			PmFlexCounterFilterBool = false;
			PrefTrafficMgmtBool = false;
			LinkBudgetBool = false;
			rfBranchBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endMeasCellGroup.test(line)) {
			MeasCellGroupBool = false;
			let { html, isOK } = ReadMeasCellGroup(MeasCellGroupData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#MeasCellGroup-${siteID}" class="btn btn-success w-25">MeasCellGroup: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#MeasCellGroup-${siteID}" class="btn btn-danger w-25">MeasCellGroup: NOT-OK</a></span>`;

			report += `<div class="mb-3">${tmpReport}`;
			output += html;
			MeasCellGroupData = [];
		} else if (startmeasCellGroupUeRef.test(line)) {
			measCellGroupUeRefBool = true;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			SystemConstantBool = false;
			UlCompGroupBool = false;
			PmFlexCounterFilterBool = false;
			PrefTrafficMgmtBool = false;
			LinkBudgetBool = false;
			rfBranchBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endmeasCellGroupUeRef.test(line)) {
			measCellGroupUeRefBool = false;
			let { html, isOK } = ReadmeasCellGroupUeRef(
				measCellGroupUeRefData,
				siteID
			);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#measCellGroupUeRef-${siteID}" class="btn btn-success w-25">measCellGroupUeRef: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#measCellGroupUeRef-${siteID}" class="btn btn-danger w-25">measCellGroupUeRef: NOT-OK</a></span>`;
			report += `${tmpReport}</div>`;

			output += html;
			measCellGroupUeRefData = [];
		} else if (startSystemConstant.test(line)) {
			SystemConstantBool = true;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			UlCompGroupBool = false;
			PmFlexCounterFilterBool = false;
			PrefTrafficMgmtBool = false;
			LinkBudgetBool = false;
			rfBranchBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endSystemConstant.test(line)) {
			SystemConstantBool = false;
			let { html, isOK } = ReadSystemConstant(
				SystemConstantData,
				siteID,
				swVersion
			);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#SystemConstant-${siteID}" class="btn btn-success w-25">SystemConstant: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#SystemConstant-${siteID}" class="btn btn-danger w-25">SystemConstant: NOT-OK</a></span>`;
			report += `<div class="mb-3">${tmpReport}`;

			output += html;
			SystemConstantData = [];
		} else if (startUlCompGroup.test(line)) {
			UlCompGroupBool = true;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PmFlexCounterFilterBool = false;
			PrefTrafficMgmtBool = false;
			LinkBudgetBool = false;
			rfBranchBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endUlCompGroup.test(line)) {
			SystemConstantBool = false;
			let { html, isOK } = ReadUlCompGroup(UlCompGroupData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#UlCompGroup-${siteID}" class="btn btn-success w-25">UlCompGroup: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#UlCompGroup-${siteID}" class="btn btn-danger w-25">UlCompGroup: NOT-OK</a></span>`;
			report += `${tmpReport}</div>`;

			output += html;
			UlCompGroupData = [];
		} else if (startPmFlexCounterFilter.test(line)) {
			PmFlexCounterFilterBool = true;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			LinkBudgetBool = false;
			rfBranchBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endPmFlexCounterFilter.test(line)) {
			PmFlexCounterFilterBool = false;
			let { html, isOK } = ReadPmFlexCounterFilter(
				PmFlexCounterFilterData,
				swVersion,
				siteID
			);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#PmFlexCounterFilter-${siteID}" class="btn btn-success w-25">PmFlexCounterFilter: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#PmFlexCounterFilter-${siteID}" class="btn btn-danger w-25">PmFlexCounterFilter: NOT-OK</a></span>`;
			report += `<div class="mb-3">${tmpReport}`;

			output += html;
			PmFlexCounterFilterData = [];
		} else if (startPrefTrafficMgmt.test(line)) {
			PrefTrafficMgmtBool = true;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			LinkBudgetBool = false;
			rfBranchBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endPrefTrafficMgmt.test(line)) {
			PrefTrafficMgmtBool = false;
			let { html, isOK } = ReadPrefTrafficMgmt(
				PrefTrafficMgmtData,
				FDDList,
				siteID
			);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#PrefTrafficMgmt-${siteID}" class="btn btn-success w-25">PrefTrafficMgmt: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#PrefTrafficMgmt-${siteID}" class="btn btn-danger w-25">PrefTrafficMgmt: NOT-OK</a></span>`;
			report += `${tmpReport}</div>`;

			output += html;
			PrefTrafficMgmtData = [];
		} else if (startLinkBudget.test(line)) {
			LinkBudgetBool = true;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			rfBranchBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endLinkBudget.test(line)) {
			LinkBudgetBool = false;
			let { html, isOK } = ReadLinkBudget(LinkBudgetData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#LinkBudget-${siteID}" class="btn btn-success w-25">LinkBudget: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#LinkBudget-${siteID}" class="btn btn-danger w-25">LinkBudget: NOT-OK</a></span>`;
			report += `<div class="mb-3">${tmpReport}`;

			output += html;
			LinkBudgetData = [];
		} else if (startrfBranch.test(line)) {
			rfBranchBool = true;
			LinkBudgetBool = false;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			auPortRefBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endrfBranch.test(line)) {
			rfBranchBool = false;
			let { html, isOK } = ReadrfBranch(rfBranchData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#rfBranch-${siteID}" class="btn btn-success w-25">rfBranch: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#rfBranch-${siteID}" class="btn btn-danger w-25">rfBranch: NOT-OK</a></span>`;
			report += `${tmpReport}</div>`;

			output += html;
			rfBranchData = [];
		} else if (startauPortRef.test(line)) {
			auPortRefBool = true;
			rfBranchBool = false;
			LinkBudgetBool = false;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			RATFreqPrioBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endauPortRef.test(line)) {
			auPortRefBool = false;
			let { html, isOK } = ReadauPortRef(auPortRefData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#auPortRef-${siteID}" class="btn btn-success w-25">auPortRef: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#auPortRef-${siteID}" class="btn btn-danger w-25">auPortRef: NOT-OK</a></span>`;
			report += `<div class="mb-3">${tmpReport}`;

			output += html;
			auPortRefData = [];
		} else if (startRATFreqPrio.test(line)) {
			RATFreqPrioBool = true;
			auPortRefBool = false;
			rfBranchBool = false;
			LinkBudgetBool = false;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			CVLSBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endRATFreqPrio.test(line)) {
			RATFreqPrioBool = false;
			let { html, isOK } = ReadRATFreqPrio(
				RATFreqPrioData,
				siteID,
				earfcnDlList
			);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#RATFreqPrio-${siteID}" class="btn btn-success w-25">RATFreqPrio: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#RATFreqPrio-${siteID}" class="btn btn-danger w-25">RATFreqPrio: NOT-OK</a></span>`;
			report += `${tmpReport}</div>`;

			output += html;
			RATFreqPrioData = [];
		} else if (startCVLS.test(line)) {
			CVLSBool = true;
			RATFreqPrioBool = false;
			auPortRefBool = false;
			rfBranchBool = false;
			LinkBudgetBool = false;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endCVLS.test(line)) {
			CVLSBool = false;
			let { html, isOK } = ReadCVLS(CVLSData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#CVLS-${siteID}" class="btn btn-success w-25">CVLS: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#CVLS-${siteID}" class="btn btn-warning w-25">CVLS: WARNING</a></span>`;
			report += `<div class="mb-3">${tmpReport}`;

			output += html;
			CVLSData = [];
		} else if (startOTDOA.test(line)) {
			CVLSBool = false;
			RATFreqPrioBool = false;
			auPortRefBool = false;
			rfBranchBool = false;
			LinkBudgetBool = false;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			OTDOABool = true;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endOTDOA.test(line)) {
			OTDOABool = false;
			let { html, isOK } = ReadOTDOA(OTDOAData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#OTDOA-${siteID}" class="btn btn-success w-25">OTDOA: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#OTDOA-${siteID}" class="btn btn-danger w-25">OTDOA: NOT OK</a></span>`;
			report += `${tmpReport}</div>`;

			output += html;
			OTDOAData = [];
		} else if (startTermPointToENB.test(line)) {
			CVLSBool = false;
			RATFreqPrioBool = false;
			auPortRefBool = false;
			rfBranchBool = false;
			LinkBudgetBool = false;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			OTDOABool = false;
			TermPointToENBBool = true;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endTermPointToENB.test(line)) {
			TermPointToENBBool = false;
			let { html, isOK } = ReadTermPointToENB(TermPointToENBData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#TermPointToENB-${siteID}" class="btn btn-success w-25">TermPointToENB: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#TermPointToENB-${siteID}" class="btn btn-danger w-25">TermPointToENB: NOT OK</a></span>`;
			report += `<div class="mb-3">${tmpReport}`;

			output += html;
			TermPointToENBData = [];
		} else if (startBbLink.test(line)) {
			CVLSBool = false;
			RATFreqPrioBool = false;
			auPortRefBool = false;
			rfBranchBool = false;
			LinkBudgetBool = false;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = true;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = false;
		} else if (endBbLink.test(line)) {
			BbLinkBool = false;
			let { html, isOK } = ReadBbLink(BbLinkData, siteID);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#BbLink-${siteID}" class="btn btn-success w-25">BbLink: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#BbLink-${siteID}" class="btn btn-warning w-25">BbLink: NOT DEFINED</a></span>`;
			report += `${tmpReport}</div>`;

			output += html;
			BbLinkData = [];
		} else if (startPlmnAbConfProfile.test(line)) {
			CVLSBool = false;
			RATFreqPrioBool = false;
			auPortRefBool = false;
			rfBranchBool = false;
			LinkBudgetBool = false;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = true;
			PtmFunctionBool = false;
		} else if (endPlmnAbConfProfile.test(line)) {
			PlmnAbConfProfileBool = false;
			let { html, isOK } = ReadPlmnAbConfProfile(
				PlmnAbConfProfileData,
				siteID,
				swVersion
			);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#PlmnAbConfProfile-${siteID}" class="btn btn-success w-25">PlmnAbConfProfile: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#PlmnAbConfProfile-${siteID}" class="btn btn-danger w-25">PlmnAbConfProfile: NOT OK</a></span>`;
			report += `<div class="mb-3">${tmpReport}`;

			output += html;
			PlmnAbConfProfileData = [];
		} else if (startPtmFunction.test(line)) {
			CVLSBool = false;
			RATFreqPrioBool = false;
			auPortRefBool = false;
			rfBranchBool = false;
			LinkBudgetBool = false;
			PmFlexCounterFilterBool = false;
			UlCompGroupBool = false;
			SystemConstantBool = false;
			mmeBool = false;
			DiffAdmCtrlFilteringProfileBool = false;
			MeasCellGroupBool = false;
			measCellGroupUeRefBool = false;
			PrefTrafficMgmtBool = false;
			OTDOABool = false;
			TermPointToENBBool = false;
			BbLinkBool = false;
			PlmnAbConfProfileBool = false;
			PtmFunctionBool = true;
		} else if (endPtmFunction.test(line)) {
			PtmFunctionBool = false;
			let { html, isOK } = ReadPtmFunction(PtmFunctionData, siteID, swVersion);

			const tmpReport = isOK
				? `<span class="h6 mr-5">-> <a href="#PtmFunction-${siteID}" class="btn btn-success w-25">PtmFunction: OK</a></span>`
				: `<span class="h6 mr-5">-> <a href="#PtmFunction-${siteID}" class="btn btn-danger w-25">PtmFunction: NOT OK</a></span>`;
			report += `${tmpReport}</div>`;

			output += html;
			PtmFunctionData = [];
		}

		// push to Data.
		if (PtmFunctionBool) {
			PtmFunctionData.push(line);
		} else if (PlmnAbConfProfileBool) {
			PlmnAbConfProfileData.push(line);
		} else if (BbLinkBool) {
			BbLinkData.push(line);
		} else if (TermPointToENBBool) {
			TermPointToENBData.push(line);
		} else if (OTDOABool) {
			OTDOAData.push(line);
		} else if (mmeBool) {
			mmeData.push(line);
		} else if (DiffAdmCtrlFilteringProfileBool) {
			DiffAdmCtrlFilteringProfileData.push(line);
		} else if (MeasCellGroupBool) {
			MeasCellGroupData.push(line);
		} else if (measCellGroupUeRefBool) {
			measCellGroupUeRefData.push(line);
		} else if (SystemConstantBool) {
			SystemConstantData.push(line);
		} else if (UlCompGroupBool) {
			UlCompGroupData.push(line);
		} else if (PmFlexCounterFilterBool) {
			PmFlexCounterFilterData.push(line);
		} else if (PrefTrafficMgmtBool) {
			PrefTrafficMgmtData.push(line);
		} else if (LinkBudgetBool) {
			LinkBudgetData.push(line);
		} else if (rfBranchBool) {
			rfBranchData.push(line);
		} else if (auPortRefBool) {
			auPortRefData.push(line);
		} else if (RATFreqPrioBool) {
			RATFreqPrioData.push(line);
		} else if (CVLSBool) {
			CVLSData.push(line);
		}
	}

	return {
		output,
		report
	};
}

function ReadMME(dataString, siteID) {
	let html = "";
	let startMME = false;
	let isOK = true;
	const MMEList = [
		"ENodeBFunction=1,TermPointToMme=17",
		"ENodeBFunction=1,TermPointToMme=18",
		"ENodeBFunction=1,TermPointToMme=19",
		"ENodeBFunction=1,TermPointToMme=20",
		"ENodeBFunction=1,TermPointToMme=21",
		"ENodeBFunction=1,TermPointToMme=22",
		"ENodeBFunction=1,TermPointToMme=23",
		"ENodeBFunction=1,TermPointToMme=24",
		"ENodeBFunction=1,TermPointToMme=25",
		"ENodeBFunction=1,TermPointToMme=26",
		"ENodeBFunction=1,TermPointToMme=27",
		"ENodeBFunction=1,TermPointToMme=28",
		"ENodeBFunction=1,TermPointToMme=SNTDCAUJLTZ",
		"ENodeBFunction=1,TermPointToMme=PHNXAZMALTZ"
	];
	let regexMMEList = new RegExp(MMEList.join("|", "gi"));
	let mmeCount = 0;
	const pattern = /.*UNLOCKED.*ENABLED.*/;
	const totalPatt = /^Total.*MOs/;

	// dataString.forEach(line => {
	for (let i = 0; i < dataString.length; i++) {
		line = dataString[i];
		if (line.includes("## start-MME")) {
			if (mmeCount === 0) {
				const title = `<br /><br /><br /><h5 style="color: #67D1EB;" id="MME-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## MME</a></h5><br /><br />`;
				html += title;
			}
			startMME = true;
			mmeCount = 0;
		} else if (line.includes("## end-MME")) {
			html += "<br />";
			startMME = false;
		}

		if (startMME) {
			if (line.includes("ENodeBFunction=1,TermPointToMme=")) {
				mmeCount += 1;
				if (pattern.exec(line)) {
					if (regexMMEList.exec(line)) {
						const xline = `${line.trim(
							"\n"
						)}<span style="color: #9BFF1C"> => OK</span>\n`;
						html += xline;
					} else {
						// NOT-OK
						isOK = false;

						const xline = `${line.trim(
							"\n"
						)}<span style="color: #FFF618"> => NOT-OK (UNREGISTERED MME)</span>\n`;
						html += xline;
					}
				} else {
					// NOT-OK
					isOK = false;

					const xline = `${line.trim(
						"\n"
					)}<span style="color: red"> => NOT-OK (DISABLED)</span>\n`;
					html += xline;
				}
			} else if (totalPatt.exec(line)) {
				if (mmeCount === 14) {
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #9BFF1C"> => OK (${mmeCount} MOs)</span>\n`;
					html += xline;
				} else {
					// NOT-OK
					isOK = false;

					const xline = `${line.trim(
						"\n"
					)}<span style="color: #FFF618"> => NOT-OK (${mmeCount} MOs)</span>\n`;
					html += xline;
				}
			} else {
				// html += line;
				if (
					!line.includes("start-MME") &&
					!line.includes("ERBS_NODE_MODEL") &&
					!/^\s*$/.test(line)
				) {
					html += line;
				}
			}
		}
	}

	return { html, isOK };
}

function ReadDiffAdmCtrlFilteringProfile(dataString, siteID) {
	let html = "";
	let isOK = true;
	let startMO = false;
	let startFDD = false;
	let patternFDD = /^EUtranCellFDD=.*/;
	let dafpCount = 0;
	let iTitle = 0;
	const totalPatt = /^Total.*MOs/;

	dataString.forEach(line => {
		if (line.includes("## start-DiffAdmCtrlFilteringProfile")) {
			if (iTitle === 0) {
				const title = `<br /><br /><h5 style="color: #67D1EB;" id="DiffAdmCtrlFilteringProfile-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## DiffAdmCtrlFilteringProfile</a></h5><br /><br />`;
				html += title;
				iTitle++;
			}
		} else if (line.includes("## end-DiffAdmCtrlFilteringProfile")) {
			startFDD = false;
			html += "<br />";
		} else if (
			line.includes("pr AdmissionControl=1,DiffAdmCtrlFilteringProfile=1")
		) {
			startMO = true;
			dafpCount = 0;
		} else if (
			line.includes("hget EUtranCellFDD= diffAdmCtrlFilteringProfRef")
		) {
			startMO = false;
			startFDD = true;
			startMO = false;
		}

		if (startMO) {
			if (
				line.includes(
					"ENodeBFunction=1,AdmissionControl=1,DiffAdmCtrlFilteringProfile=1"
				)
			) {
				dafpCount++;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK</span>\n`;
				html += xline;
			} else if (totalPatt.exec(line)) {
				if (dafpCount === 1) {
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #9BFF1C"> => OK (${dafpCount} MOs)</span>\n`;
					html += xline;
					html += "<br />";
				} else {
					// NOT-OK
					isOK = false;

					const xline = `${line.trim(
						"\n"
					)}<span style="color: #FFF618"> => NOT-OK (${dafpCount} MOs)</span>\n`;
					html += xline;
					html += "<br />";
				}
			} else {
				// if (!/^\s*$/.test(line)) {
				if (!line.includes("ERBS_NODE_MODEL") && !/^\s*$/.test(line)) {
					html += line;
				}
			}
		}

		if (startFDD) {
			if (patternFDD.exec(line)) {
				if (line.includes("AdmissionControl=1,DiffAdmCtrlFilteringProfile=1")) {
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #9BFF1C"> => OK</span>\n`;
					html += xline;
				} else {
					// NOT-OK
					isOK = false;

					const xline = `${line.trim(
						"\n"
					)}<span style="color: #FFF618"> => NOT-OK (MISSING REFERENCE)</span>\n`;
					html += xline;
				}
			} else if (totalPatt.exec(line)) {
				html += line;
				html += "<br />";
			} else {
				if (
					!line.includes("ERBS_NODE_MODEL") &&
					!/^\s*$/.test(line) &&
					!line.includes("hget_group")
				) {
					html += line;
				}
			}
		}
	});

	return { html, isOK };
}

function ReadMeasCellGroup(dataString, siteID) {
	let html = "";
	let isOK = true;
	let startMO = false;
	let startFDD = false;
	let patternFDD = /^EUtranCellFDD=.*/;
	let dafpCount = 0;
	let iTitle = 0;
	let isFNET = false;
	const totalPatt = /^Total.*MOs/;

	dataString.forEach(line => {
		if (line.includes("## start-MeasCellGroup")) {
			if (iTitle === 0) {
				const title = `<br /><br /><h5 style="color: #67D1EB;" id="MeasCellGroup-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## MeasCellGroup</a></h5><br /><br />`;
				html += title;
				iTitle++;
			}
		} else if (line.includes("## end-MeasCellGroup")) {
			startFDD = false;
			startMO = false;
			html += "<br />";
		} else if (line.includes("pr MeasCellGroup=1")) {
			startMO = true;
			startFDD = false;
			dafpCount = 0;
		} else if (line.includes("hget EUtranCellFDD= measCellGroupCellRef")) {
			startMO = false;
			startFDD = true;
		}

		if (startFDD) {
			if (patternFDD.exec(line)) {
				if (line.includes("_3_F")) {
					isFNET = true;
					if (line.includes("MeasCellGroup=1")) {
						// NOT-OK
						isOK = false;

						const xline = `${line.trim(
							"\n"
						)}<span style="color: #FFF618"> => NOT-OK (NO REFERENCE NEEDED)</span>\n`;
						html += xline;
					} else {
						const xline = `${line.trim(
							"\n"
						)}<span style="color: #9BFF1C"> => OK</span>\n`;
						html += xline;
					}
				} else {
					if (line.includes("MeasCellGroup=1")) {
						// NOT-OK
						isOK = false;

						const xline = `${line.trim(
							"\n"
						)}<span style="color: #FFF618"> => NOT-OK (NO REFERENCE NEEDED)</span>\n`;
						html += xline;
					} else {
						const xline = `${line.trim(
							"\n"
						)}<span style="color: #9BFF1C"> => OK</span>\n`;
						html += xline;
					}
				}
			} else if (totalPatt.exec(line)) {
				html += line;
				html += "<br />";
			} else {
				if (
					!line.includes("ERBS_NODE_MODEL") &&
					!/^\s*$/.test(line) &&
					!line.includes("hget_group")
				) {
					html += line;
				}
			}
		}

		if (startMO) {
			if (line.includes("ENodeBFunction=1,MeasCellGroup=1") && isFNET) {
				dafpCount++;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK</span>\n`;
				html += xline;
			} else if (totalPatt.exec(line)) {
				if (dafpCount === 1 && isFNET) {
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #9BFF1C"> => OK (${dafpCount} MOs)</span>\n`;
					html += xline;
					html += "<br />";
				} else {
					if (isFNET) {
						// NOT-OK
						isOK = false;

						const xline = `${line.trim(
							"\n"
						)}<span style="color: #FFF618"> => NOT-OK (${dafpCount} MOs)</span>\n`;
						html += xline;
						html += "<br />";
					} else {
						const xline = `${line.trim(
							"\n"
						)}<span style="color: #FFF618"> => NOT-NEEDED-BUT-OK (${dafpCount} MOs)</span>\n`;
						html += xline;
						html += "<br />";
					}
				}
			} else {
				// if (!/^\s*$/.test(line)) {
				if (!line.includes("ERBS_NODE_MODEL") && !/^\s*$/.test(line)) {
					html += line;
				}
			}
		}
	});

	return {
		html,
		isOK
	};
}

function ReadmeasCellGroupUeRef(dataString, siteID) {
	let html = "";
	let isOK = true;
	let startMO = false;
	let startFDD = false;
	let patternFDD = /^EUtranCellFDD=.*/;
	let dafpCount = 0;
	let iTitle = 0;
	let isFNET = false;
	const totalPatt = /^Total.*MOs/;

	dataString.forEach(line => {
		if (line.includes("## start-measCellGroupUeRef")) {
			if (iTitle === 0) {
				const title = `<br /><br /><h5 style="color: #67D1EB;" id="measCellGroupUeRef-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## measCellGroupUeRef</a></h5><br /><br />`;
				html += title;
				iTitle++;
			}
		} else if (line.includes("## end-measCellGroupUeRef")) {
			startFDD = false;
			startMO = false;
			html += "<br />";
		} else if (line.includes("pr MeasCellGroup=1")) {
			startMO = true;
			startFDD = false;
			dafpCount = 0;
		} else if (line.includes("hget EUtranCellFDD= measCellGroupUeRef")) {
			startMO = false;
			startFDD = true;
		}

		if (startFDD) {
			if (patternFDD.exec(line)) {
				if (line.includes("_3_F")) {
					isFNET = true;
					if (line.includes("MeasCellGroup=1")) {
						const xline = `${line.trim(
							"\n"
						)}<span style="color: #9BFF1C"> => OK</span>\n`;
						html += xline;
					} else {
						// NOT-OK
						isOK = false;

						const xline = `${line.trim(
							"\n"
						)}<span style="color: #FFF618"> => NOT-OK (MISSING REFERENCE)</span>\n`;
						html += xline;
					}
				} else {
					if (line.includes("MeasCellGroup=1")) {
						// NOT-OK
						isOK = false;

						const xline = `${line.trim(
							"\n"
						)}<span style="color: #FFF618"> => NOT-OK (NO REFERENCE NEEDED)</span>\n`;
						html += xline;
					} else {
						const xline = `${line.trim(
							"\n"
						)}<span style="color: #9BFF1C"> => OK</span>\n`;
						html += xline;
					}
				}
			} else if (totalPatt.exec(line)) {
				html += line;
				html += "<br />";
			} else {
				if (
					!line.includes("ERBS_NODE_MODEL") &&
					!/^\s*$/.test(line) &&
					!line.includes("hget_group")
				) {
					html += line;
				}
			}
		}

		if (startMO) {
			if (line.includes("ENodeBFunction=1,MeasCellGroup=1") && isFNET) {
				dafpCount++;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK</span>\n`;
				html += xline;
			} else if (totalPatt.exec(line)) {
				if (dafpCount === 1 && isFNET) {
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #9BFF1C"> => OK (${dafpCount} MOs)</span>\n`;
					html += xline;
					html += "<br />";
				} else {
					if (isFNET) {
						// NOT-OK
						isOK = false;

						const xline = `${line.trim(
							"\n"
						)}<span style="color: #FFF618"> => NOT-OK (${dafpCount} MOs)</span>\n`;
						html += xline;
						html += "<br />";
					} else {
						const xline = `${line.trim(
							"\n"
						)}<span style="color: #FFF618"> => NOT-NEEDED-BUT-OK (${dafpCount} MOs)</span>\n`;
						html += xline;
						html += "<br />";
					}
				}
			} else {
				// if (!/^\s*$/.test(line)) {
				if (!line.includes("ERBS_NODE_MODEL") && !/^\s*$/.test(line)) {
					html += line;
				}
			}
		}
	});

	return { html, isOK };
}

// System Constant
function ReadSystemConstant(dataString, siteID, swVersion) {
	let html = "";
	let isOK = true;
	let coliStart = false;
	let scFound = false;
	let isCatm1 = false;
	let catm1String = "";
	const scPattern = /\d+:\d{1,5},/;
	const SC_LIST_18Q3 = [
		"145:1",
		"1627:3",
		"1699:0",
		"1728:20",
		"2095:0",
		"2109:0",
		"2149:0",
		"278:1",
		"2959:0",
		"3210:0",
		"3247:0",
		"3248:1",
		"3297:10",
		"3562:1",
		"83:-30",
		"871:0",
		"908:3059",
		"2400:0",
		"2442:0"
	];
	const SC_LIST_18Q4 = [
		"83:-30",
		"145:1",
		"1627:3",
		"1699:0",
		"1728:20",
		"2101:0",
		"2095:0",
		"2109:0",
		"2149:0",
		"278:1",
		"2959:0",
		"2400:0",
		"2442:0",
		"3050:0",
		"3210:0",
		"3247:0",
		"3297:10",
		"3449:512",
		"3541:0",
		"871:0",
		"908:3059"
	];
	const SC_LIST_19Q1_CATM_OFF = [
		"83:-30",
		"145:1",
		"213:3059",
		"278:1",
		"871:0",
		"908:3059",
		"1627:3",
		"1699:0",
		"1728:20",
		"2095:0",
		"2101:0",
		"2107:0",
		"2108:0",
		"2109:0",
		"2149:0",
		"2400:0",
		"2442:1",
		"2959:0",
		"3050:0",
		"3210:0",
		"3247:0",
		"3405:0",
		"3449:512",
		"3541:0",
		"4050:1"
	];
	const SC_LIST_19Q1_CATM_ON = [
		"145:1",
		"1627:3",
		"1699:0",
		"1728:20",
		"2095:0",
		"2101:0",
		"2107:0",
		"2108:0",
		"2109:0",
		"213:3059",
		"2149:0",
		"2400:0",
		"2442:1",
		"278:1",
		"2959:0",
		"3050:0",
		"3210:0",
		"3247:0",
		"3405:0",
		"3449:512",
		"3541:0",
		"3759:1",
		"83:-30",
		"871:0",
		"908:3059",
		"4050:1"
	];
	const SC_LIST_19Q3 = [
		"83:-30",
		"109:5",
		"145:1",
		"213:3059",
		"278:1",
		"871:0",
		"908:3059",
		"1627:3",
		"1699:0",
		"1728:20",
		"2095:0",
		"2101:0",
		"2107:0",
		"2108:0",
		"2109:0",
		"2149:0",
		"2400:0",
		"2442:1",
		"2959:0",
		"3050:0",
		"3210:0",
		"3247:0",
		"3405:0",
		"3449:512",
		"3541:0",
		"3585:-13",
		"3586:-13",
		"3587:-13",
		"3758:0",
		"3763:0",
		"3764:0",
		"3877:1",
		"3891:0",
		"4050:1",
		"4130:0",
		"4141:0"
	];

	dataString.forEach(line => {
		if (line.includes("catm1SupportEnabled true")) {
			catm1String += `<span style="color: #9BFF1C">${line.trim()}</span>\n`;
			isCatm1 = true;
		}
	});

	dataString.forEach(line => {
		if (line.includes("## start-SystemConstant")) {
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="SystemConstant-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## SystemConstant</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("## end-SystemConstant")) {
			coliStart = false;
			html += "<br />";
		} else if (line.includes("coli>/fruacc/")) {
			coliStart = true;
		} else if (line.includes("coli>")) {
			coliStart = false;
			if (!scFound) {
				// NOT-OK
				isOK = false;

				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (MISSING SystemConstant)</span>\n`;
				html += xline;
			} else {
				html += line;
			}
		}

		if (coliStart && scPattern.test(line)) {
			scFound = true;
			let SC_OSS = line.trim().split(",");
			// let SC_LIST = swVersion === '(18.Q4)' ? [...SC_LIST_18Q4] : [...SC_LIST_18Q3];
			let SC_LIST = [];

			if (swVersion === "(18.Q4)") {
				SC_LIST = [...SC_LIST_18Q4];
			} else if (swVersion === "(18.Q3)") {
				SC_LIST = [...SC_LIST_18Q3];
			} else if (swVersion === "(19.Q3)") {
				SC_LIST = [...SC_LIST_19Q3];
			} else {
				SC_LIST = [...SC_LIST_19Q3];
			}

			const missing = SC_LIST.filter(sc => SC_OSS.indexOf(sc) < 0);
			const extra = SC_OSS.filter(sc => SC_LIST.indexOf(sc) < 0);

			if (missing.length === 0 && extra.length === 0) {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			} else {
				// NOT-OK
				isOK = false;

				const eMissing = missing.length === 0 ? "" : `MISSING: ${missing}`;
				const eExtra = extra.length === 0 ? "" : `EXTRA: ${extra}`;

				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> <br /> => NOT-OK (${eMissing} - ${eExtra})</span>\n`;
				html += xline;
			}
		} else {
			if (
				coliStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-SystemConstant")
			) {
				html += line;
			}
		}
	});

	if (swVersion === "(19.Q1)") {
		if (isCatm1) {
			html =
				html +
				"<br>" +
				'<span style="color: #ffff00">catm1SupportEnabled:</span><br>' +
				catm1String;
		} else {
			html =
				html +
				"<br>" +
				'<span style="color: #ffff00">catm1SupportEnabled:</span><br>' +
				"null";
		}
	}

	return { html, isOK };
}

// UlCompGroup
function ReadUlCompGroup(dataString, siteID) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	const scPattern = /^SectorCarrier=.*;.*;.*;.*/;

	dataString.forEach(line => {
		if (line.includes("## start-UlCompGroup")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="UlCompGroup-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## UlCompGroup</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("## end-UlCompGroup")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && scPattern.test(line)) {
			const splitLines = line.split(";");
			const noOfRxAntennas = splitLines[1].trim();
			const noOfTxAntennas = splitLines[2].trim();
			const reservedBy = splitLines[3].trim();
			// DlOnly
			if (Number(noOfRxAntennas) === 0) {
				if (reservedBy.includes("UlCompGroup=")) {
					isOK = false;
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #FFF618"> => NOT-OK (DlOnly Doesn't required UlComp)</span>\n`;
					html += xline;
				} else {
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #9BFF1C"> => OK </span>\n`;
					html += xline;
				}
			} else {
				if (reservedBy.includes("UlCompGroup=")) {
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #9BFF1C"> => OK </span>\n`;
					html += xline;
				} else {
					// NOT-OK;
					isOK = false;
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #FFF618"> => NOT-OK (Missing UlComp)</span>\n`;
					html += xline;
				}
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-UlCompGroup") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// PmFlexCounterFilter
function ReadPmFlexCounterFilter(dataString, swVersion, siteID) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	const FlexList =
		swVersion === "(18.Q3)"
			? [
					"PmFlexCounterFilter=1",
					"PmFlexCounterFilter=10",
					"PmFlexCounterFilter=11",
					"PmFlexCounterFilter=12",
					"PmFlexCounterFilter=13",
					"PmFlexCounterFilter=14",
					"PmFlexCounterFilter=15",
					"PmFlexCounterFilter=16",
					"PmFlexCounterFilter=2",
					"PmFlexCounterFilter=3",
					"PmFlexCounterFilter=4",
					"PmFlexCounterFilter=5",
					"PmFlexCounterFilter=6",
					"PmFlexCounterFilter=7",
					"PmFlexCounterFilter=8",
					"PmFlexCounterFilter=9"
			  ]
			: [
					"PmFlexCounterFilter=1",
					"PmFlexCounterFilter=10",
					"PmFlexCounterFilter=11",
					"PmFlexCounterFilter=12",
					"PmFlexCounterFilter=13",
					"PmFlexCounterFilter=14",
					"PmFlexCounterFilter=15",
					"PmFlexCounterFilter=16",
					"PmFlexCounterFilter=17",
					"PmFlexCounterFilter=18",
					"PmFlexCounterFilter=19",
					"PmFlexCounterFilter=2",
					"PmFlexCounterFilter=20",
					"PmFlexCounterFilter=21",
					"PmFlexCounterFilter=22",
					"PmFlexCounterFilter=23",
					"PmFlexCounterFilter=24",
					"PmFlexCounterFilter=3",
					"PmFlexCounterFilter=4",
					"PmFlexCounterFilter=5",
					"PmFlexCounterFilter=6",
					"PmFlexCounterFilter=7",
					"PmFlexCounterFilter=8",
					"PmFlexCounterFilter=9"
			  ];
	let regexFlexList = new RegExp(FlexList.join("|", "gi"));
	let FlexCount = 0;
	const scPattern = /.*ENodeBFunction=1,PmFlexCounterFilter=.*/;
	const totalPatt = /^Total.*MOs/;

	dataString.forEach(line => {
		if (line.includes("## start-PmFlexCounterFilter")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="PmFlexCounterFilter-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## PmFlexCounterFilter</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-PmFlexCounterFilter")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && scPattern.test(line)) {
			FlexCount++;
			if (regexFlexList.exec(line)) {
				let sLine = line.split(" ");
				const xline = `${sLine[sLine.length - 1].trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			} else {
				// NOT-OK;
				isOK = false;

				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (UN-REGISTERED PmFlexCounterFilter)</span>\n`;
				html += xline;
			}
		} else if (totalPatt.exec(line)) {
			if (FlexCount === FlexList.length) {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK (L18Q3 = 16 MOs, L18Q4 = 24 MOs)</span>\n`;
				html += xline;
			} else {
				// NOT-OK
				isOK = false;

				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (L18Q3 = 16 MOs, L18Q4 = 24 MOs)</span>\n`;
				html += xline;
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-PmFlexCounterFilter") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// PrefTrafficMgmt
function ReadPrefTrafficMgmt(dataString, FDDList, siteID) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	let FlexCount = 0;
	const scPattern = /.*ENodeBFunction=1.*PrefTrafficMgmt=.*/;
	const totalPatt = /^Total.*MOs/;

	dataString.forEach(line => {
		if (line.includes("## start-PrefTrafficMgmt")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="PrefTrafficMgmt-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## PrefTrafficMgmt</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-PrefTrafficMgmt")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && scPattern.test(line)) {
			// NOT-OK
			isOK = false;
			FlexCount++;
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #FFF618"> => NOT-OK (Should be 0 MOs)</span>\n`;
			html += xline;
		} else if (totalPatt.exec(line)) {
			if (FlexCount === FDDList.length) {
				// NOT-OK
				isOK = false;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (Should be 0 MOs)</span>\n`;
				html += xline;
			} else {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK (0)</span>\n`;
				html += xline;
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-PrefTrafficMgmt") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// LinkBudget
function ReadLinkBudget(dataString, siteID) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	const scPattern = /^AntennaUnitGroup=.*,RfBranch=.*/;

	dataString.forEach(line => {
		if (line.includes("## start-LinkBudget")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="LinkBudget-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## LinkBudget</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-LinkBudget")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && scPattern.test(line)) {
			if (line.includes("-1")) {
				// NOT-OK
				isOK = false;

				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (-1 values is not allowed)</span>\n`;
				html += xline;
			} else {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-LinkBudget") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// rfBranch
function ReadrfBranch(dataString, siteID) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	const scPattern = /^SectorCarrier=.*/;
	const ref4x4 = /.*EUtranCellFDD=.*\[4\].*\[4\].*/;

	dataString.forEach(line => {
		if (line.includes("## start-rfBranch")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="rfBranch-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## rfBranch</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-rfBranch")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && scPattern.test(line)) {
			const splitItems = line.split(/\s+/);

			const noOfRxAntennas = +splitItems[1];
			const noOfTxAntennas = +splitItems[2];

			if (noOfRxAntennas === 4 && noOfTxAntennas === 4) {
				if (ref4x4.test(line)) {
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #9BFF1C"> => OK </span>\n`;
					html += xline;
				} else {
					// NOT-OK
					isOK = false;
					const xline = `${line.trim(
						"\n"
					)}<span style="color: #FFF618"> => NOT-OK (Missing rfBranchRef for 4x4 Configuration)</span>\n`;
					html += xline;
				}
			} else {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK (NOT 4x4 Config)</span>\n`;
				html += xline;
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-rfBranch") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// auPortRef
function ReadauPortRef(dataString, siteID) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	const scPattern = /^AntennaUnitGroup=.*,RfBranch=.*/;

	dataString.forEach(line => {
		if (line.includes("## start-auPortRef")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="auPortRef-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## auPortRef</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-auPortRef")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && scPattern.test(line)) {
			if (line.includes("AuPort=")) {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			} else {
				// NOT-OK
				isOK = false;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (Missing AuPort)</span>\n`;
				html += xline;
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-auPortRef") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// RATFreqPrio
function ReadRATFreqPrio(dataString, siteID, earfcnDlList) {
	const fcnSkip = [9720, 66986, 2454, 2456, 66961];
	let html = "";
	let isOK = true;
	let pattStart = false;
	let profileData;
	const filteredFCNForDlOnlyAnd3MHz = earfcnDlList.filter(
		fcn => fcnSkip.indexOf(fcn) < 0
	);

	if (earfcnDlList.includes(5330)) {
		profileData = [
			"SubscriberProfileID=1,RATFreqPrio=1",
			"SubscriberProfileID=1,RATFreqPrio=2",
			"SubscriberProfileID=1,RATFreqPrio=3",
			"SubscriberProfileID=1,RATFreqPrio=4"
		];
	} else {
		profileData = ["SubscriberProfileID=1,RATFreqPrio=1"];
	}

	let profileList = [];
	let fcnList = [];
	const scPattern = /^SubscriberProfileID=1,RATFreqPrio=.*[true|false].*/;

	dataString.forEach(line => {
		if (line.includes("## start-RATFreqPrio")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="RATFreqPrio-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## RATFreqPrio</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-RATFreqPrio")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && scPattern.test(line)) {
			const lines = line.split(/\s+/);
			const profile = lines[0];
			if (!profileList.includes(profile)) {
				profileList.push(profile);
			}
			const earfcn = Number(lines[1]);
			if (!fcnList.includes(earfcn)) {
				fcnList.push(earfcn);
			}

			if (filteredFCNForDlOnlyAnd3MHz.includes(earfcn)) {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			} else {
				// NOT-OK
				isOK = false;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (NON EarfcnDl USID)</span>\n`;
				html += xline;
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-RATFreqPrio") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	const missingFCN = filteredFCNForDlOnlyAnd3MHz.filter(
		fcn => fcnList.indexOf(fcn) < 0
	);
	const extraFCN = fcnList.filter(
		fcn => filteredFCNForDlOnlyAnd3MHz.indexOf(fcn) < 0
	);
	const missingProfile = profileData.filter(
		profile => profileList.indexOf(profile) < 0
	);
	const extraProfile = profileList.filter(
		profile => profileData.indexOf(profile) < 0
	);

	let output = "\n\n";
	if (missingFCN.length > 0) {
		isOK = false;
		output += `Missing earfnDl: ${missingFCN}<span style="color: #FFF618"> => NOT-OK</span>\n`;
	} else {
		output += `Missing earfnDl: NONE <span style="color: #9BFF1C"> => OK </span>\n`;
	}

	if (extraFCN.length > 0) {
		isOK = false;
		output += `Extra earfnDl: ${extraFCN}<span style="color: #FFF618"> => NOT-OK</span>\n`;
	} else {
		output += `Extra earfnDl: NONE <span style="color: #9BFF1C"> => OK </span>\n`;
	}

	if (missingProfile.length > 0) {
		isOK = false;
		output += `Missing RATFreqPrio: ${missingProfile}<span style="color: #FFF618"> => NOT-OK</span>\n`;
	} else {
		output += `Missing RATFreqPrio: NONE <span style="color: #9BFF1C"> => OK </span>\n`;
	}

	if (extraProfile.length > 0) {
		isOK = false;
		output += `Extra RATFreqPrio: ${extraProfile}<span style="color: #FFF618"> => NOT-OK</span>\n`;
	} else {
		output += `Extra RATFreqPrio: NONE <span style="color: #9BFF1C"> => OK </span>\n`;
	}

	html += output;

	return { html, isOK };
}

// CVLS
function ReadCVLS(dataString, siteID) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	const scPattern = /.*BrmBackup=.*/;

	dataString.forEach(line => {
		if (line.includes("## start-cvls")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="CVLS-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## CVLS</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-cvls")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && scPattern.test(line)) {
			if (/fga/gi.test(line)) {
				// NOT-OK
				isOK = false;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => WARNING (FGA implementation found)</span>\n`;
				html += xline;
			} else {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-cvls") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// OTDOA
function ReadOTDOA(dataString, siteID) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	const featurePattern = /^Lm=1,FeatureState=.*/;
	const FDDPattern = /^EUtranCellFDD=.*/;
	const sectorCarrierPattern = /^SectorCarrier=.*/;
	const ENodeBFunctionPattern = /^ENodeBFunction=.*/;

	dataString.forEach(line => {
		if (line.includes("## start-OTDOA")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="OTDOA-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## OTDOA</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-OTDOA")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && featurePattern.test(line)) {
			if (/\(ACTIVATED\)/gi.test(line)) {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			} else {
				// NOT-OK
				isOK = false;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (Feature must be ACTIVATED)</span>\n`;
				html += xline;
			}
		} else if (pattStart && FDDPattern.test(line)) {
			const splitLine = line.split(/\s+/);
			let errMessage = "";
			const dlChannelBandwidth = splitLine[1];
			const noConsecutiveSubframes = splitLine[3];
			const otdoaCheckEnabled = splitLine[4];
			const otdoaSuplActive = splitLine[5];
			const prsConfigIndex = splitLine[6];
			const prsPeriod = splitLine[8];
			const prsTransmisScheme = splitLine[10];

			if (noConsecutiveSubframes === "(SF1)") {
				if (Number(dlChannelBandwidth) <= 5000) {
					errMessage += "noConsecutiveSubframes should be 1 (SF2)";
				}
			}
			if (noConsecutiveSubframes === "(SF2)") {
				if (Number(dlChannelBandwidth) > 5000) {
					errMessage += "noConsecutiveSubframes should be 0 (SF1)";
				}
			}
			if (otdoaCheckEnabled !== "false") {
				errMessage += "| otdoaCheckEnabled should be false";
			}
			if (otdoaSuplActive !== "true") {
				errMessage += "| otdoaSuplActive should be true";
			}
			if (Number(prsConfigIndex) !== 1) {
				errMessage += "| prsConfigIndex should be 1";
			}
			if (prsPeriod !== "(PP160)") {
				errMessage += "| prsPeriod should be 0 (PP160)";
			}
			if (prsTransmisScheme !== "(ANTENNA_SWITCHING)") {
				errMessage += "| prsTransmisScheme should be (ANTENNA_SWITCHING)";
			}

			if (errMessage === "") {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			} else {
				// NOT-OK
				isOK = false;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (${errMessage})</span>\n`;
				html += xline;
			}
		} else if (pattStart && sectorCarrierPattern.test(line)) {
			const splitLine = line.split(/\s+/);
			let errMessage = "";
			const prsEnabled = splitLine[1];

			if (prsEnabled !== "true") {
				errMessage += "prsEnabled should be true";
			}

			if (errMessage === "") {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			} else {
				// NOT-OK
				isOK = false;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (${errMessage})</span>\n`;
				html += xline;
			}
		} else if (pattStart && ENodeBFunctionPattern.test(line)) {
			const splitLine = line.split(/\s+/);
			let errMessage = "";
			const timeAndPhaseSynchAlignment = splitLine[1];
			const timeAndPhaseSynchCritical = splitLine[2];

			if (timeAndPhaseSynchAlignment !== "true") {
				errMessage += "timeAndPhaseSynchAlignment should be true";
			}

			if (timeAndPhaseSynchCritical !== "false") {
				errMessage += "| timeAndPhaseSynchCritical should be false";
			}

			if (errMessage === "") {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			} else {
				// NOT-OK
				isOK = false;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (${errMessage})</span>\n`;
				html += xline;
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-OTDOA") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// TermPointToENB
function ReadTermPointToENB(dataString, siteID) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	const pointPattern = /.*,TermPointToENB=.*/;

	dataString.forEach(line => {
		if (line.includes("## start-TermPointToENB")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="TermPointToENB-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## TermPointToENB</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-TermPointToENB")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && pointPattern.test(line)) {
			// NOT-OK
			isOK = false;
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #FFF618"> => NOT-OK (DISABLED)</span>\n`;
			html += xline;
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-TermPointToENB") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// BbLink
function ReadBbLink(dataString, siteID) {
	let html = "";
	let isOK = false;
	let pattStart = false;
	const pointPattern = /.*,BbLink=.*/;

	dataString.forEach(line => {
		if (line.includes("## start-BbLink")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="BbLink-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## BbLink</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-BbLink")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && pointPattern.test(line)) {
			isOK = true;
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			html += xline;
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-BbLink") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// PlmnAbConfProfile
function ReadPlmnAbConfProfile(dataString, siteID, swVersion) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	const pointPattern = /.*PlmnAbConfProfile=1.*PlmnAbConfProfile=2.*/;

	dataString.forEach(line => {
		if (line.includes("## start-PlmnAbConfProfile")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="PlmnAbConfProfile-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## PlmnAbConfProfile</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-PlmnAbConfProfile")) {
			pattStart = false;
			html += "<br />";
		}

		if (pattStart && line.match(/^EUtranCellFDD=.*/)) {
			if (pointPattern.test(line)) {
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #9BFF1C"> => OK </span>\n`;
				html += xline;
			} else {
				// NOT-OK
				isOK = false;
				const xline = `${line.trim(
					"\n"
				)}<span style="color: #FFF618"> => NOT-OK (MISSING REFERENCE)</span>\n`;
				html += xline;
			}
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-PlmnAbConfProfile") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	return { html, isOK };
}

// PtmFunction
function ReadPtmFunction(dataString, siteID, swVersion) {
	let html = "";
	let isOK = true;
	let pattStart = false;
	let output = "";
	const pointPattern = /.*PlmnAbConfProfile=1.*PlmnAbConfProfile=2.*/;

	let PtmAtoConfig1 = false;
	let PtmIflbConfig1 = false;
	let PtmIfoConfig1 = false;
	let PtmResOpUseConfig1 = false;
	let PtmStmConfig1 = false;

	let PtmAtoConfig2 = false;
	let PtmIflbConfig2 = false;
	let PtmIfoConfig2 = false;
	let PtmResOpUseConfig2 = false;
	let PtmStmConfig2 = false;

	let PtmSubscriberGroup1 = false;
	let PtmSubscriberGroup2 = false;
	let PtmSubscriberGroup3 = false;

	dataString.forEach(line => {
		if (line.includes("## start-PtmFunction")) {
			pattStart = true;
			const title = `<br /><br /><h5 style="color: #67D1EB;" id="PtmFunction-${siteID}"><a href="#summary-${siteID}" class="btn btn-secondary btn-lg">## PtmFunction</a></h5><br /><br />`;
			html += title;
		} else if (line.includes("end-PtmFunction")) {
			pattStart = false;
			html += "<br />";
		}

		if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmAtoConfig=1.*/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmAtoConfig1 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmIflbConfig=1$/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmIflbConfig1 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmIfoConfig=1$/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmIfoConfig1 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmResOpUseConfig=1$/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmResOpUseConfig1 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmStmConfig=1$/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmStmConfig1 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmAtoConfig=1$/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmAtoConfig2 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmIflbConfig=1$/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmIflbConfig2 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmIfoConfig=1$/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmIfoConfig2 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmResOpUseConfig=1$/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmResOpUseConfig2 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(
					/^.*ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmStmConfig=1$/
				)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmStmConfig2 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(/^.*ENodeBFunction=1,PtmFunction=1,PtmSubscriberGroup=1$/)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmSubscriberGroup1 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(/^.*ENodeBFunction=1,PtmFunction=1,PtmSubscriberGroup=2$/)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmSubscriberGroup2 = true;
			html += xline;
		} else if (
			pattStart &&
			line
				.trim()
				.match(/^.*ENodeBFunction=1,PtmFunction=1,PtmSubscriberGroup=3$/)
		) {
			const xline = `${line.trim(
				"\n"
			)}<span style="color: #9BFF1C"> => OK </span>\n`;
			PtmSubscriberGroup3 = true;
			html += xline;
		} else {
			if (
				pattStart &&
				!line.includes("RBS_NODE_MODEL") &&
				!/^\s*$/.test(line) &&
				!line.includes("## start-PtmFunction") &&
				!line.includes("hget_group")
			) {
				html += line;
			}
		}
	});

	if (PtmAtoConfig1 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmAtoConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmIflbConfig1 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmIflbConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmIfoConfig1 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmIfoConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmResOpUseConfig1 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmResOpUseConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmStmConfig1 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=1,PtmStmConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmAtoConfig2 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmAtoConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmIflbConfig2 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmIflbConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmIfoConfig2 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmIfoConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmResOpUseConfig2 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmResOpUseConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmStmConfig2 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmCellProfile=2,PtmStmConfig=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmSubscriberGroup1 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmSubscriberGroup=1<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmSubscriberGroup2 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmSubscriberGroup=2<span style="color: #FFF618"> => MISSING</span>\n`;
	}
	if (PtmSubscriberGroup3 === false) {
		isOK = false;
		output += `* ENodeBFunction=1,PtmFunction=1,PtmSubscriberGroup=3<span style="color: #FFF618"> => MISSING</span>\n`;
	}

	if (isOK === false) {
		output = "<br><br>Missing MO Definition:<br>" + output;
	}
	html += output;

	return { html, isOK };
}
