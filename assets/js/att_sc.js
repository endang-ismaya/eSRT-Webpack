// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	const srtFolder = $("#att-sc-mobatch-srt-data-folder");
	const btnSCGet = $("#btn-sc-get-current");
	const btnSCCreate = $("#btn-sc-create-script");
	const outputHtml = $("#sc-output");

	// -----------------------------------------
	// When Folder is changed
	// -----------------------------------------
	function whenFolderIsChanged() {
		spinner_executing();

		// Check if file is exists
		let folderPath = srtFolder.val();
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
		if (message === "exists") {
			spinner_post();
			enableButtons();
		} else {
			spinner_post();
			disableButtons();
			noFolderSelection();
			outputHtml.html("");
		}
	}

	// ----------------------------------
	// Create Run Script
	// ----------------------------------
	function runGetSC() {
		const folderPath = srtFolder.val();
		const toolName = "ATT-SC-CHECK-GET";

		var sc_fgas = $(".sc-fga:checkbox:checked")
			.map(function() {
				return this.value;
			})
			.get()
			.join(",");
		const sc_configuration = $("#sc-config-name").val();
		if (sc_fgas == "") {
			sc_fgas = "NONE";
		}
		const toolArguments = folderPath + "#" + sc_configuration + "#" + sc_fgas;
		ajaxToRunTheExeScript(folderPath, toolName, toolArguments, cbRunGetSC);
	}

	function runCreateSC() {
		const folderPath = srtFolder.val();
		const toolName = "ATT-SC-CHECK-CREATE";
		const sc_configuration = $("#sc-config-name").val();
		const sc_default = $(".sc-default-set:checkbox:checked")
			.map(function() {
				return this.value;
			})
			.get()[0];
		const sc_reset_all = $(".sc-reset-all:checkbox:checked")
			.map(function() {
				return this.value;
			})
			.get()[0];

		const result = getCorrectionValues();
		const toolArguments =
			folderPath +
			"#" +
			'"' +
			result +
			'"' +
			"#" +
			sc_configuration +
			"#" +
			sc_default +
			"#" +
			sc_reset_all;
		console.log(folderPath, toolName, toolArguments);

		ajaxToRunTheExeScript(
			folderPath,
			toolName,
			toolArguments,
			cbRunCreateScriptSC
		);
	}

	function cbRunGetSC(data) {
		spinner_post();

		$("body").removeClass("others");
		$("#sc-output").html(data);
	}

	function cbRunCreateScriptSC(data) {
		spinner_post();

		$("body").removeClass("others");
		// $("#sc-output").html(data);
		console.log(data);
	}

	function getCorrectionValues() {
		let result = "";

		let sitenames = $(".sitename")
			.map(function() {
				return this.textContent;
			})
			.get();

		for (let index = 0; index < sitenames.length; index++) {
			const element = sitenames[index];

			result += element + "@";

			let sc_correction = $(".sc-correction-" + element)
				.map(function() {
					return this.value;
				})
				.get()
				.join(",");

			result += sc_correction + "|";
		}

		return result.substring(0, result.length - 1);
	}

	// -----------------------------------------
	// Disable Buttons
	// -----------------------------------------
	function disableButtons() {
		btnSCGet.unbind("click", runGetSC);
		btnSCGet.addClass("not-allowed");
		btnSCGet.addClass("btn-secondary");
		btnSCGet.removeClass("btn-success");

		btnSCCreate.unbind("click", runCreateSC);
		btnSCCreate.addClass("not-allowed");
		btnSCCreate.addClass("btn-secondary");
		btnSCCreate.removeClass("btn-success");
	}

	// -----------------------------------------
	// Enable Buttons
	// -----------------------------------------
	function enableButtons() {
		btnSCGet.bind("click", runGetSC);
		btnSCGet.removeClass("not-allowed");
		btnSCGet.removeClass("btn-secondary");
		btnSCGet.addClass("btn-success");

		btnSCCreate.bind("click", runCreateSC);
		btnSCCreate.removeClass("not-allowed");
		btnSCCreate.removeClass("btn-secondary");
		btnSCCreate.addClass("btn-success");
	}

	// Disabling Button
	disableButtons();

	// -----------------------------------------
	// Add EventListener
	// -----------------------------------------
	srtFolder.focus(clearOutputResult);
	srtFolder.change(whenFolderIsChanged);
});

function ajaxToRunTheExeScript(
	folderPath,
	toolName,
	toolArguments,
	sbCallback
) {
	spinner_executing();
	$.ajax({
		type: "POST",
		url: "http://localhost/srtwp/tools/run_script",
		data: {
			pathFolder: folderPath,
			scripts: toolName,
			options: toolArguments
		},
		success: sbCallback,
		error: function(err) {
			spinner_post();
			console.log(err);
		}
	});
}
