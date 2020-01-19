$(() => {
	// --------------
	// C1 CIQ Parser
	// --------------
	$("#c1-relations-createtemplate").on("click", () => {
		let ExcelPath = $("#folderPath-c1relations").val();
		if (ExcelPath != "--Select File--") {
			spinner_executing();
			$.ajax({
				type: "POST",
				url: "http://localhost/srtwp/tools/run_script",
				data: {
					pathFolder: ExcelPath,
					scripts: "C1-Relations",
					options: ExcelPath
				},
				success: callback_runC1Relations,
				error: function(err) {
					console.log(err);
				}
			});
		} else {
			noFolderSelection();
		}
	});

	$("#c1-700-celldata").on("click", function() {
		let ExcelPath = $("#folderPath-c1relations").val();
		if (ExcelPath != "--Select File--") {
			spinner_executing();
			$.ajax({
				type: "POST",
				url: "http://localhost/srtwp/tools/run_script",
				data: {
					pathFolder: ExcelPath,
					scripts: "C1-700-CellData",
					options: ExcelPath
				},
				success: callback_runC1Relations,
				error: function(err) {
					console.log(err);
				}
			});
		} else {
			noFolderSelection();
		}
	});

	$("#c1-1900-celldata").on("click", function() {
		let ExcelPath = $("#folderPath-c1relations").val();
		if (ExcelPath != "--Select File--") {
			spinner_executing();
			$.ajax({
				type: "POST",
				url: "http://localhost/srtwp/tools/run_script",
				data: {
					pathFolder: ExcelPath,
					scripts: "C1-1900-CellData",
					options: ExcelPath
				},
				success: callback_runC1Relations,
				error: function(err) {
					console.log(err);
				}
			});
		} else {
			noFolderSelection();
		}
	});

	// ----------------
	// C1 IX Scripting
	// ----------------
	$("#c1-ix-script1-to-5").on("click", function() {
		spinner_executing();
		let jsonPath = $("#json-file-result").html();

		$.ajax({
			type: "POST",
			url: "http://localhost/srtwp/tools/run_script_c1ix",
			data: {
				jsonFilePath: jsonPath
			},
			success: callback_c1ix,
			error: function(err) {
				console.log(err);
			}
		});
	});

	$("#c1-ix-cancel").on("click", function() {
		$("#ix-fieldset").prop("disabled", false);
		$("#c1-ipadresslist").prop("disabled", false);
		$("#c1-ix-script1-to-5").prop("hidden", true);
		$("#submit").prop("hidden", false);
		$("#c1-ix-cancel").hide();
	});

	$("#c1-ipadresslist").change(function() {
		// console.log('c1-ipaddress');
		$("#initFDD700").html("");
		$("#initFDD1900").html("");
		let eNodeBName = $("#c1-ipadresslist").val();

		if (eNodeBName != "--Select eNodeB Name--") {
			// console.log(eNodeBName);

			$.getJSON("http://localhost/srtwp/json/c1_ipaddress.json", function(
				data
			) {
				// console.log(data[eNodeBName]);
				// console.log(data[eNodeBName][0]);

				let eNodeB_ID = data[eNodeBName][0];
				let siteID = data[eNodeBName][1];
				let VLAN_ID_s1x2UC = data[eNodeBName][2];
				let IP_s1x2UC_Address = data[eNodeBName][3];
				let IP_s1x2UC_Network_Mask = data[eNodeBName][4];
				let IP_s1x2UC_Default_Router = data[eNodeBName][5];
				let VLAN_ID_OAM = data[eNodeBName][6];
				let IP_OAM_Address = data[eNodeBName][7];
				let IP_OAM_Network_Mask = data[eNodeBName][8];
				let IP_OAM_Default_Router = data[eNodeBName][9];

				let site_id = $("input[name=site_id]");
				let sitebasic_vlan_id_s1_x2_U_C = $(
					"input[name=sitebasic_vlan_id_s1_x2_U_C]"
				);
				let sitebasic_ip_s1_x2_U_C_Address = $(
					"input[name=sitebasic_ip_s1_x2_U_C_Address]"
				);
				let sitebasic_ip_s1_x2_U_C_Network_Mask = $(
					"input[name=sitebasic_ip_s1_x2_U_C_Network_Mask]"
				);
				let sitebasic_ip_s1_x2_U_C_Default_Router = $(
					"input[name=sitebasic_ip_s1_x2_U_C_Default_Router]"
				);
				let sitebasic_vlan_id_oam = $("input[name=sitebasic_vlan_id_oam]");
				let sitebasic_ip_oam_address = $(
					"input[name=sitebasic_ip_oam_address]"
				);
				let sitebasic_ip_oam_network_mask = $(
					"input[name=sitebasic_ip_oam_network_mask]"
				);
				let sitebasic_ip_oam_default_router = $(
					"input[name=sitebasic_ip_oam_default_router]"
				);
				let enodebfunction_enodebid = $("input[name=enodebfunction_enodebid]");

				site_id.val(siteID);
				sitebasic_vlan_id_s1_x2_U_C.val(VLAN_ID_s1x2UC);
				sitebasic_ip_s1_x2_U_C_Address.val(IP_s1x2UC_Address);
				sitebasic_ip_s1_x2_U_C_Network_Mask.val(IP_s1x2UC_Network_Mask);
				sitebasic_ip_s1_x2_U_C_Default_Router.val(IP_s1x2UC_Default_Router);
				sitebasic_vlan_id_oam.val(VLAN_ID_OAM);
				sitebasic_ip_oam_address.val(IP_OAM_Address);
				sitebasic_ip_oam_network_mask.val(IP_OAM_Network_Mask);
				sitebasic_ip_oam_default_router.val(IP_OAM_Default_Router);
				enodebfunction_enodebid.val(eNodeB_ID);

				let enodebnameid = $("input[name=enodebnameid]");
				enodebnameid.val(eNodeBName);
			});

			get700();
			get1900();
		}
	});
});

$("#c1-apply-fdd").on("click", function() {
	createFDDTemplate();
});

$("#checkAll").change(function() {
	$("input:checkbox").prop("checked", $(this).prop("checked"));
	if ($(this).prop("checked")) {
		$("#lbl-check").html(" UnCheck all");
	} else {
		$("#lbl-check").html(" Check all");
	}
});

// ------------------
// C1 Relations
// ------------------
function callback_runC1Relations(data) {
	spinner_post();
	if (data === "Invalid Input!") {
		$("#output-result").addClass("console");
		$("#output-result").html("Error on request.");
	} else {
		$(".alert").hide();
		$("#output-result").addClass("console");
		$("#output-result").html(data);
	}
}

function createFDDTemplate() {
	var result = "";
	var dataEUtranParameters = [];
	var dataPCI = [];
	var dataeNodeBInfo = [];
	var site_id = $("input[name=site_id]").val();

	$.ajax({
		url: "http://localhost/srtwp/json/c1_700_celldata.json",
		async: false,
		dataType: "json",
		success: function(json) {
			dataEUtranParameters = json.eutranparameters;
			dataPCI = json.pci;
			dataeNodeBInfo = json.enodebinfo;
		}
	});

	var iSectorNaming700 = 1;
	$("#initFDD700 input:checked").each(function() {
		var cella = $(this).attr("value");
		var earfcndl = "0";
		var earfcnul = "0";
		var cellId = "0";
		var physicalLayerCellIdGroup = "0";
		var physicalLayerSubCellId = "0";
		var tac = "0";
		var sectorCarrierRef = "";
		var dlChannelBandwidth = "0";
		var ulChannelBandwidth = "0";
		var additionalPlmnList =
			"mcc=1,mnc=1,mncLength=2;mcc=1,mnc=1,mncLength=2;mcc=1,mnc=1,mncLength=2;mcc=1,mnc=1,mncLength=2;mcc=1,mnc=1,mncLength=2";
		var additionalPlmnReservedList = "false,false,false,false,false";

		for (const key in dataEUtranParameters) {
			if (key === cella) {
				earfcndl = dataEUtranParameters[cella][0];
				earfcnul = dataEUtranParameters[cella][1];
				dlChannelBandwidth = dataEUtranParameters[cella][2];
				ulChannelBandwidth = dataEUtranParameters[cella][3];
				break;
			}
		}
		for (const key in dataPCI) {
			if (key === cella) {
				sectorCarrierRef = "ENodeBFunction=1,SectorCarrier=" + iSectorNaming700;
				iSectorNaming700++;
				cellId = dataPCI[cella][1];
				physicalLayerCellIdGroup = dataPCI[cella][2];
				physicalLayerSubCellId = dataPCI[cella][3];
				break;
			}
		}
		for (const key in dataeNodeBInfo) {
			if (key === site_id) {
				tac = dataeNodeBInfo[site_id][4];
				break;
			}
		}

		result += "cr ENodeBFunction=1,EUtranCellFDD=" + cella + "\n";
		result += earfcndl + " #earfcndl" + "\n";
		result += earfcnul + " #earfcnul" + "\n";
		result += cellId + " #cellId" + "\n";
		result += physicalLayerCellIdGroup + " #physicalLayerCellIdGroup" + "\n";
		result += physicalLayerSubCellId + " #physicalLayerSubCellId" + "\n";
		result += tac + " #tac" + "\n";
		result += sectorCarrierRef + " #sectorCarrierRef" + "\n";
		result += dlChannelBandwidth + " #dlChannelBandwidth" + "\n";
		result += ulChannelBandwidth + " #ulChannelBandwidth" + "\n";
		result += additionalPlmnList + " #additionalPlmnList" + "\n";
		result +=
			additionalPlmnReservedList + " #additionalPlmnReservedList" + "\n";
		result += "\n";
	});

	$.ajax({
		url: "http://localhost/srtwp/json/c1_1900_celldata.json",
		async: false,
		dataType: "json",
		success: function(json) {
			dataEUtranParameters = json.eutranparameters;
			dataPCI = json.pci;
			dataeNodeBInfo = json.enodebinfo;
		}
	});

	var iSectorNaming1900 = iSectorNaming700;
	$("#initFDD1900 input:checked").each(function() {
		var cella = $(this).attr("value");
		var earfcndl = "0";
		var earfcnul = "0";
		var cellId = "0";
		var physicalLayerCellIdGroup = "0";
		var physicalLayerSubCellId = "0";
		var tac = "0";
		var sectorCarrierRef = "";
		var dlChannelBandwidth = "0";
		var ulChannelBandwidth = "0";
		var additionalPlmnList =
			"mcc=1,mnc=1,mncLength=2;mcc=1,mnc=1,mncLength=2;mcc=1,mnc=1,mncLength=2;mcc=1,mnc=1,mncLength=2;mcc=1,mnc=1,mncLength=2";
		var additionalPlmnReservedList = "false,false,false,false,false";

		for (const key in dataEUtranParameters) {
			if (key === cella) {
				earfcndl = dataEUtranParameters[cella][0];
				earfcnul = dataEUtranParameters[cella][1];
				dlChannelBandwidth = dataEUtranParameters[cella][2];
				ulChannelBandwidth = dataEUtranParameters[cella][3];
				break;
			}
		}
		for (const key in dataPCI) {
			if (key === cella) {
				sectorCarrierRef =
					"ENodeBFunction=1,SectorCarrier=" + iSectorNaming1900;
				iSectorNaming1900++;
				cellId = dataPCI[cella][1];
				physicalLayerCellIdGroup = dataPCI[cella][2];
				physicalLayerSubCellId = dataPCI[cella][3];
				break;
			}
		}
		for (const key in dataeNodeBInfo) {
			if (key === site_id) {
				tac = dataeNodeBInfo[site_id][4];
				break;
			}
		}

		result += "cr ENodeBFunction=1,EUtranCellFDD=" + cella + "\n";
		result += earfcndl + " #earfcndl" + "\n";
		result += earfcnul + " #earfcnul" + "\n";
		result += cellId + " #cellId" + "\n";
		result += physicalLayerCellIdGroup + " #physicalLayerCellIdGroup" + "\n";
		result += physicalLayerSubCellId + " #physicalLayerSubCellId" + "\n";
		result += tac + " #tac" + "\n";
		result += sectorCarrierRef + " #sectorCarrierRef" + "\n";
		result += dlChannelBandwidth + " #dlChannelBandwidth" + "\n";
		result += ulChannelBandwidth + " #ulChannelBandwidth" + "\n";
		result += additionalPlmnList + " #additionalPlmnList" + "\n";
		result +=
			additionalPlmnReservedList + " #additionalPlmnReservedList" + "\n";
		result += "\n";
	});

	if (result != "") {
		var header = "confb+" + "\n";
		header += "gs+" + "\n\n";
		header += "lset Paging=1 maxNoOfPagingRecords 7" + "\n\n";

		var ulcomp = "cr ENodeBFunction=1,UlCompGroup=1" + "\n";
		ulcomp +=
			"ENodeBFunction=1,SectorCarrier=1 ENodeBFunction=1,SectorCarrier=2 ENodeBFunction=1,SectorCarrier=3 #sectorCarrierRef" +
			"\n";
		ulcomp +=
			"lset ENodeBFunction=1,UlCompGroup=1$ administrativeState 1" + "\n";

		let siteequipment_config = $(
			"select[name=siteequipment_config] option:selected"
		).text();
		// console.log(siteequipment_config);

		if (siteequipment_config == "1C_2x2 + 2C_4x4") {
			ulcomp += "\ncr ENodeBFunction=1,UlCompGroup=2" + "\n";
			ulcomp +=
				"ENodeBFunction=1,SectorCarrier=4 ENodeBFunction=1,SectorCarrier=5 ENodeBFunction=1,SectorCarrier=6 #sectorCarrierRef" +
				"\n";
			ulcomp +=
				"lset ENodeBFunction=1,UlCompGroup=2$ administrativeState 1" + "\n";
		}

		var footer = "\n" + "gs-" + "\n";
		footer += "confb-" + "\n";
		result = header + result + ulcomp + footer;
	}

	$("#fddscripts").val(result);
}

function get700() {
	var checkboxes = "";

	$.getJSON("http://localhost/srtwp/json/c1_700_celldata.json", function(data) {
		let site_id = $("input[name=site_id]").val();
		let initFDD = site_id.slice(0, 3) + site_id.slice(4, site_id.length);
		object = data.eutranparameters;

		for (const key in object) {
			if (key.includes(initFDD)) {
				// console.log(key);
				checkboxes += `<input class="fddcheck" type="checkbox" name="fddlist" value="${key}">${key}<br>`;
			}
		}

		if (checkboxes != "") {
			var result = `<h6 class="text-danger">1C</h6>`;
			result += checkboxes;
			$("#initFDD700").html(result);
			$("#p-check").prop("hidden", false);
		}
	});
}

function get1900() {
	var checkboxes = "";

	$.getJSON("http://localhost/srtwp/json/c1_1900_celldata.json", function(
		data
	) {
		let site_id = $("input[name=site_id]").val();
		let initFDD = site_id.slice(0, 3) + site_id.slice(4, site_id.length);

		object = data.eutranparameters;

		for (const key in object) {
			if (key.includes(initFDD)) {
				// console.log(key);
				checkboxes += `<input class="fddcheck" type="checkbox" name="fddlist" value="${key}">${key}<br>`;
			}
		}
		if (checkboxes != "") {
			var result = `<h6 class="text-danger">2C</h6>`;
			result += checkboxes;
			$("#initFDD1900").html(result);
			$("#p-check").prop("hidden", false);
		}
	});
}

function callback_c1ix(data) {
	spinner_post();
	if (data === "Invalid Input!") {
		$("#output-result").addClass("console");
		$("#output-result").html("Error on request.");
	} else {
		$("#output-result").addClass("console");
		$("#output-result").html(data);
		$("#c1-ix-cancel").hide();
		$("#submit").prop("hidden", false);
		$("#c1-ix-script1-to-5").prop("hidden", true);
		$("#ix-fieldset").prop("disabled", false);
		$("#c1-ipadresslist").prop("disabled", false);
	}
}
