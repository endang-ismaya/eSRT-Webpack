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
	$("#btnRunCompare").bind("click", RunKCompare);
	$("#PreFolderPath").focus(clearOutputResult);
	$("#PreFolderPath").change(whenFolderIsChangedPre);

	$("#PostFolderPath").focus(clearOutputResult);
	$("#PostFolderPath").change(whenFolderIsChangedPost);
});

// -----------------------------------------
// Disable Buttons
// -----------------------------------------
function disableButtons() {
	$("#btnRunCompare").removeClass("btn-success");
	$("#btnRunCompare").addClass("btn-secondary");
	$("#btnRunCompare").addClass("not-allowed");
	$("#btnRunCompare").unbind("click", RunKCompare);
}

// -----------------------------------------
// Enable Buttons
// -----------------------------------------
function enableButtons() {
	$("#btnRunCompare").removeClass("btn-secondary");
	$("#btnRunCompare").addClass("btn-success");
	$("#btnRunCompare").removeClass("not-allowed");
}

// -----------------------------------------
// When Folder is changed
// -----------------------------------------
function whenFolderIsChangedPre() {
	// Start spinner
	spinner_executing();

	let folderPath = $("#PreFolderPath").val() + "\\mobatch_srtdata";

	$.ajax({
		type: "POST",
		url: "http://localhost/srtwp/tools/run_script",
		data: {
			pathFolder: folderPath,
			scripts: "Get-Modump-Files",
			options: folderPath
		},
		success: cbSuccessWhenFolderIsChangedPre,
		error: function(err) {
			console.log(err);
		}
	});
}

function whenFolderIsChangedPost() {
	// Start spinner
	spinner_executing();

	let folderPath = $("#PostFolderPath").val() + "\\mobatch_srtdata";

	$.ajax({
		type: "POST",
		url: "http://localhost/srtwp/tools/run_script",
		data: {
			pathFolder: folderPath,
			scripts: "Get-Modump-Files",
			options: folderPath
		},
		success: cbSuccessWhenFolderIsChangedPost,
		error: function(err) {
			console.log(err);
		}
	});
}

function cbSuccessWhenFolderIsChangedPre(message) {
	// Stop Spinner
	spinner_post();

	if (message) {
		const messages = message.split("\n");
		let options = "";

		for (let i = 0; i < messages.length; i++) {
			const element = messages[i];

			if (element !== "") {
				if (i === 0) {
					options += `<option selected value=${element}>${element}</option>`;
				} else {
					options += `<option value=${element}>${element}</option>`;
				}
			}
		}

		let html = `<select id="PreFolderFiles" class="custom-select mt-2">`;
		html += options;
		html += `</select>`;

		$("#filesPre").html(html);
	}
}

function cbSuccessWhenFolderIsChangedPost(message) {
	// Stop Spinner
	spinner_post();

	if (message) {
		const messages = message.split("\n");
		let options = "";

		for (let i = 0; i < messages.length; i++) {
			const element = messages[i];

			if (element !== "") {
				if (i === 0) {
					options += `<option selected value=${element}>${element}</option>`;
				} else {
					options += `<option value=${element}>${element}</option>`;
				}
			}
		}

		let html = `<select id="PostFolderFiles" class="custom-select mt-2">`;
		html += options;
		html += `</select>`;

		$("#filesPost").html(html);
		// enableButtons();
	}
}

// -----------------------------------------
// InputCompare
// -----------------------------------------
function AddInputCompare() {
	let preFolder = $("#PreFolderPath").val();
	let preFiles = $("#PreFolderFiles").val();

	let postFolder = $("#PostFolderPath").val();
	let postFiles = $("#PostFolderFiles").val();

	let replacement = $("#MOReplace").val();
	let destinationFolder = postFolder;
	let inputTitle = $("#inputTitle").val();
	let replaceMethod = $("#replaceMethod").val();

	if (
		preFolder === "--Pre Folder--" ||
		preFiles === "--Select File--" ||
		postFolder === "--Post Folder--" ||
		postFiles === "--Select File--"
	) {
		return;
	} else {
		preFolder += `\\mobatch_srtdata\\${preFiles}`;
		postFolder += `\\mobatch_srtdata\\${postFiles}`;
	}

	let input = $("#inputCompare").val();
	let textAreaInput = input ? JSON.parse(input) : [];
	const newItem = {
		preFiles: preFolder,
		postFiles: postFolder,
		stringReplace: replacement,
		destinationFolder: destinationFolder,
		inputTitle: inputTitle,
		replaceMethod: replaceMethod
	};

	textAreaInput.push(newItem);
	$("#inputCompare").val(JSON.stringify(textAreaInput));

	if (textAreaInput) {
		enableButtons();
	}
}

function AddInputCompareMulti(
	preFile,
	postFile,
	stringReplace,
	destinationFolder,
	inputTitle,
	replaceMethod
) {
	let preFolder = $("#PreFolderPath").val();
	let postFolder = $("#PostFolderPath").val();

	preFolder += `\\mobatch_srtdata\\${preFile}`;
	postFolder += `\\mobatch_srtdata\\${postFile}`;

	let input = $("#inputCompare").val();
	let textAreaInput = input ? JSON.parse(input) : [];
	const newItem = {
		preFiles: preFolder,
		postFiles: postFolder,
		stringReplace: stringReplace,
		destinationFolder: destinationFolder,
		inputTitle: inputTitle,
		replaceMethod: replaceMethod
	};

	textAreaInput.push(newItem);
	$("#inputCompare").val(JSON.stringify(textAreaInput));

	if (textAreaInput) {
		enableButtons();
	}
}

function RunKCompare() {
	let input = $("#inputCompare").val();

	if (input !== "") {
		// Start spinner
		spinner_executing();

		// let inputJSON = JSON.parse(input);
		// inputJSON = JSON.stringify(inputJSON);

		let folderPath = $("#PostFolderPath").val();

		$.ajax({
			type: "POST",
			url: "http://localhost/srtwp/tools/runScriptKCompare",
			data: {
				pathFolder: folderPath,
				scripts: "KCompare",
				options: input
			},
			success: cbSuccessRunKCompare,
			error: function(err) {
				console.log(err);
			}
		});
	} else {
		disableButtons();
	}
}

function cbSuccessRunKCompare(message) {
	// disableButtons();

	// Stop Spinner
	spinner_post();

	$("body").addClass("others");
	$("#output-result").addClass("console");
	$("#output-result").html(message);
}

// -------------------------
// MO FeatureState Default
// -------------------------
$("#btnInputFeatureStateDefault").click(function(e) {
	$.getJSON("http://localhost/srtwp/json/kcompare.json", function(data) {
		$.each(data, function(key, val) {
			if (key === "featurestate") {
				$("#tAreaReplaceFeatureState").val(val);
			}
		});
	});
});

$("#btnInputFeatureStateClear").click(function(e) {
	$("#tAreaReplaceFeatureState").val("");
});

$("#btnGenerateJSONClear").click(function(e) {
	$("#inputCompare").val("");
});

$("#btnGenerateJSON").click(function(e) {
	// Start spinner
	spinner_executing();

	let postFolder = $("#PostFolderPath").val();

	$.ajax({
		type: "POST",
		url: "http://localhost/srtwp/tools/is_filefolder_exists",
		data: {
			pathFolder: postFolder
		},
		success: cbBtnGenerateJSON,
		error: function(err) {
			console.log(err);
		}
	});
});

function cbBtnGenerateJSON(message) {
	if (message === "exists") {
		const mocNotFound = fo();

		// console.log("not-found", mocNotFound);
		$("body").removeClass("others");
		$("#output-result").addClass("console");
		let html = `<h3>MO Class Not Found:</h3><br>${mocNotFound.join("<br />")}`;
		$("#output-result").html(html);
	}

	// Stop Spinner
	spinner_post();
}

function fo() {
	let preFolder = $("#PreFolderPath").val();
	let postFolder = $("#PostFolderPath").val();

	if (preFolder === "--Pre Folder--" || postFolder === "--Post Folder--") {
		return;
	}

	const postFolders = [];
	const preFolders = [];
	let destinationFolder = $("#PostFolderPath").val();
	let stringFeatureStateReplacement = $("#tAreaReplaceFeatureState").val();
	let stringRelationReplacement = $("#tAreaReplaceRelation").val();
	let inputTitle = $("#inputTitle").val();
	let MOC_NOT_FOUND = [];

	$("#PostFolderFiles option").each(function() {
		postFolders.push($(this).val());
	});

	$("#PreFolderFiles option").each(function() {
		preFolders.push($(this).val());
	});

	if (postFolders.length === 0 || preFolders.length === 0) {
		return;
	}

	for (let i = 0; i < postFolders.length; i++) {
		const postFile = postFolders[i];
		const postElementManagedObject = postFile.split("_")[1];
		let ifMOCFound = false;

		for (let j = 0; j < preFolders.length; j++) {
			const preFile = preFolders[j];
			const preElementManagedObject = preFile.split("_")[1];

			if (
				postElementManagedObject.match(/FeatureStateId/i) &&
				preElementManagedObject.match(/OptionalFeatureLicenseId/i)
			) {
				ifMOCFound = true;
				AddInputCompareMulti(
					preFile,
					postFile,
					stringFeatureStateReplacement,
					destinationFolder,
					inputTitle,
					"full"
				);
			} else if (postElementManagedObject === preElementManagedObject) {
				if (
					postElementManagedObject.match(/.*EUtranCellFDD.*/i) ||
					postElementManagedObject.match(/.*Relation.*/i) ||
					postElementManagedObject.match(/.*ReportConfig.*/i) ||
					postElementManagedObject.match(/.*UeMeasControl.*/i) ||
					postElementManagedObject.match(/.*PrefTrafficMgmt.*/i)
				) {
					ifMOCFound = true;
					AddInputCompareMulti(
						preFile,
						postFile,
						stringRelationReplacement,
						destinationFolder,
						inputTitle,
						"any"
					);
				} else {
					ifMOCFound = true;
					AddInputCompareMulti(
						preFile,
						postFile,
						"",
						destinationFolder,
						inputTitle,
						"any"
					);
				}
			}
		}

		if (!ifMOCFound) {
			// console.log(postFile);
			MOC_NOT_FOUND.push(postFile);
		}
	}

	return MOC_NOT_FOUND;
}
