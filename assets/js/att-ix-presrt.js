/* jshint esversion: 6 */

// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	// Disabling Button
	enableDisableButtonsATTIXPreSRT("bind", "unbind", "bind", "", "unbind");
});

// -----------------------------------------
// Enable/Disable Buttons
// -----------------------------------------
function enableDisableButtonsATTIXPreSRT(
	getCellData = "",
	crExistingRelation = "",
	crExistingSysConsts = "",
	optSelect = "",
	crNBIotCell = ""
) {
	// Button Get Cell Data
	if (getCellData === "bind") {
		$("#btnATTIXGetcelldata").bind("click", runGetCellData);
		$("#btnATTIXGetcelldata").removeClass("not-allowed");
		$("#btnATTIXGetcelldata").removeClass("btn-secondary");
		$("#btnATTIXGetcelldata").addClass("btn-success");
	} else if (getCellData === "unbind") {
		$("#btnATTIXGetcelldata").unbind("click", runGetCellData);
		$("#btnATTIXGetcelldata").addClass("not-allowed");
		$("#btnATTIXGetcelldata").addClass("btn-secondary");
		$("#btnATTIXGetcelldata").removeClass("btn-success");
	}

	// Button Create Existing Relation
	if (crExistingRelation === "bind") {
		$("#btnATTIXExistingrelation").bind("click", runCreateExistingRelation);
		$("#btnATTIXExistingrelation").removeClass("not-allowed");
		$("#btnATTIXExistingrelation").removeClass("btn-secondary");
		$("#btnATTIXExistingrelation").addClass("btn-success");
	} else if (crExistingRelation === "unbind") {
		$("#btnATTIXExistingrelation").unbind("click", runCreateExistingRelation);
		$("#btnATTIXExistingrelation").addClass("not-allowed");
		$("#btnATTIXExistingrelation").addClass("btn-secondary");
		$("#btnATTIXExistingrelation").removeClass("btn-success");
	}

	// Button Create Existing SystemConstant
	if (crExistingSysConsts === "bind") {
		$("#btnATTIXSystemconstants").bind("click", runCreateExistingSysConsts);
		$("#btnATTIXSystemconstants").removeClass("not-allowed");
		$("#btnATTIXSystemconstants").removeClass("btn-secondary");
		$("#btnATTIXSystemconstants").addClass("btn-success");
	} else if (crExistingSysConsts === "unbind") {
		$("#btnATTIXSystemconstants").unbind("click", runCreateExistingSysConsts);
		$("#btnATTIXSystemconstants").addClass("not-allowed");
		$("#btnATTIXSystemconstants").addClass("btn-secondary");
		$("#btnATTIXSystemconstants").removeClass("btn-success");
	}

	// Button NBIotCell
	if (crNBIotCell === "bind") {
		$("#btnATTIXNBIotCell").bind("click", runNBIotCell);
		$("#btnATTIXNBIotCell").removeClass("not-allowed");
		$("#btnATTIXNBIotCell").removeClass("btn-secondary");
		$("#btnATTIXNBIotCell").addClass("btn-success");
	} else if (crNBIotCell === "unbind") {
		$("#btnATTIXNBIotCell").unbind("click", runNBIotCell);
		$("#btnATTIXNBIotCell").addClass("not-allowed");
		$("#btnATTIXNBIotCell").addClass("btn-secondary");
		$("#btnATTIXNBIotCell").removeClass("btn-success");
	}

	// Option selection
	if (optSelect === "unbind") {
		$("#optMarket-presrt").prop("disabled", "disabled");
		$("#folderPath-presrt").prop("disabled", "disabled");
		$("#ciqPath-presrt").prop("disabled", "disabled");
	} else if (optSelect === "bind") {
		$("#optMarket-presrt").prop("disabled", "");
		$("#folderPath-presrt").prop("disabled", "");
		$("#ciqPath-presrt").prop("disabled", "");
	}
}

function runNBIotCell() {
	const optModump = $("#folderPath-presrt").val();

	let li = "";

	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}

	if (li !== "") {
		$(".alert ul").append(li);
		$(".alert").show();
		setTimeout(function() {
			$(".alert").hide();
			$(".alert ul").html("");
		}, 3000);
	} else {
		// Start Spinner
		spinner_executing();

		$.ajax({
			type: "POST",
			url: "http://localhost/srtwp/tools/run_script",
			data: {
				pathFolder: optModump,
				scripts: "ATT-NBIOT-GET",
				options: optModump
			},
			success: cbNBIotCell,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function cbNBIotCell(data) {
	$("#output-result").addClass("console");
	$("#output-result").html(data);

	spinner_post();
}

function runGetCellData() {
	const optMarket = $("#optMarket-presrt").val();
	const optModump = $("#folderPath-presrt").val();
	const optCiq = $("#ciqPath-presrt").val();

	let li = "";

	if (!checkIfOptionsSelected(optMarket)) {
		li += `<li>Market must be selected!</li>`;
	}
	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}
	if (!checkIfOptionsSelected(optCiq)) {
		li += `<li>CIQ File must be selected!</li>`;
	}

	if (li !== "") {
		$(".alert ul").append(li);
		$(".alert").show();
		setTimeout(function() {
			$(".alert").hide();
			$(".alert ul").html("");
		}, 3000);
	} else {
		const checkPath = optMarket + "#" + optModump + "#" + optCiq;

		// Start Spinner
		spinner_executing();

		$.ajax({
			type: "POST",
			url: "http://localhost/srtwp/tools/run_script",
			data: {
				pathFolder: optModump,
				scripts: "ATT-PreSRTGetCellData",
				options: checkPath
			},
			success: cbRunGetCellData,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function cbRunGetCellData(data) {
	$("#output-result").addClass("console");
	$("#output-result").html(data);

	let folderPath = $("#folderPath-presrt").val() + "\\mobatch_celldata";
	$.ajax({
		type: "POST",
		url: "http://localhost/srtwp/tools/is_filefolder_exists",
		data: {
			pathFolder: folderPath
		},
		success: cbCellDataCreated,
		error: function(err) {
			console.log(err);
		}
	});
}

function cbCellDataCreated(message) {
	if (message === "exists") {
		// Enable the Create Existing Relations
		enableDisableButtonsATTIXPreSRT("unbind", "bind", "", "unbind", "bind");
	}

	// Stop Spinners
	spinner_post();
}

// ----------------------------------
// Create Existing Relation callback
// ----------------------------------

function runCreateExistingRelation() {
	const optModump = $("#folderPath-presrt").val();
	// Start Spinner
	spinner_executing();
	$.ajax({
		type: "POST",
		url: "http://localhost/srtwp/tools/run_script",
		data: {
			pathFolder: optModump,
			scripts: "ATT-PreSRTExistingRelations",
			options: optModump
		},
		success: cbRunCreateExistingRelation,
		error: function(err) {
			console.log(err);
		}
	});
}

function cbRunCreateExistingRelation(data) {
	$("#output-result").addClass("console");
	$("#output-result").html(data);

	// Stop Spinners
	spinner_post();

	enableDisableButtonsATTIXPreSRT("bind", "unbind", "", "bind", "bind");
}

// ----------------------------------
// Create Existing SysConsts callback
// ----------------------------------

function runCreateExistingSysConsts() {
	const optModump = $("#folderPath-presrt").val();
	let li = "";

	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}

	if (li !== "") {
		$(".alert ul").append(li);
		$(".alert").show();
		setTimeout(function() {
			$(".alert").hide();
			$(".alert ul").html("");
		}, 3000);
	} else {
		spinner_executing();
		$.ajax({
			type: "POST",
			url: "http://localhost/srtwp/tools/run_script",
			data: {
				pathFolder: optModump,
				scripts: "ATT-PreSRTSystemConstans",
				options: optModump
			},
			success: cbRunCreateExistingSysConsts,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function cbRunCreateExistingSysConsts(data) {
	$("body").removeClass("others");
	$("body").addClass("kpiClass");
	$("#output-result").addClass("console");
	$("#output-result").html(data);

	// Stop Spinners
	spinner_post();
}

function checkIfOptionsSelected(optMarket) {
	let re;
	re = /.*Select.*/;

	if (re.test(optMarket)) {
		return false;
	} else {
		return true;
	}
}
