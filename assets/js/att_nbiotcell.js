// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	const srtFolder = $("#att-base-folder");
	const btnGet = $("#btn-nbiot-get-current");
	const btnCreate = $("#btn-nbiot-create-script");
	const outputHtml = $("#r-output");

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
	function runGet() {
		const folderPath = srtFolder.val();
		const toolName = "ATT-NBIOT-GET";
		const toolArguments = folderPath;
		ajaxToRunTheExeScript(folderPath, toolName, toolArguments, cbRunGet);
	}

	function cbRunGet(data) {
		spinner_post();

		$("body").removeClass("others");
		outputHtml.html(data);
	}

	function runCreate() {
		const folderPath = srtFolder.val();
		const toolName = "ATT-SC-CHECK-CREATE";
		const toolArguments = folderPath;
		// console.log(folderPath, toolName, toolArguments);

		ajaxToRunTheExeScript(
			folderPath,
			toolName,
			toolArguments,
			cbRunCreateScriptSC
		);
	}

	function cbRunCreateScript(data) {
		spinner_post();

		$("body").removeClass("others");
		// $("#sc-output").html(data);
		console.log(data);
	}

	// -----------------------------------------
	// Disable Buttons
	// -----------------------------------------
	function disableButtons() {
		btnGet.unbind("click", runGet);
		btnGet.addClass("not-allowed");
		btnGet.addClass("btn-secondary");
		btnGet.removeClass("btn-success");

		// btnCreate.unbind("click", runCreateSC);
		btnCreate.addClass("not-allowed");
		btnCreate.addClass("btn-secondary");
		btnCreate.removeClass("btn-success");
	}

	// -----------------------------------------
	// Enable Buttons
	// -----------------------------------------
	function enableButtons() {
		btnGet.bind("click", runGet);
		btnGet.removeClass("not-allowed");
		btnGet.removeClass("btn-secondary");
		btnGet.addClass("btn-success");

		// btnCreate.bind("click", runCreateSC);
		// btnCreate.removeClass("not-allowed");
		// btnCreate.removeClass("btn-secondary");
		// btnCreate.addClass("btn-success");
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
