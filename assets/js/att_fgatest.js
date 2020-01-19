/*jshint esversion: 6 */

// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	// Disabling Button
	disableButtonsATTFgatest();

	// -----------------------------------------
	// Add EventListener
	// -----------------------------------------
	$('#att-fgatest-mobatch-srt_data-folder').focus(clearOutputResult);
	$('#att-fgatest-mobatch-srt_data-folder').change(whenFolderIsChanged);
});

// -----------------------------------------
// Disable Buttons
// -----------------------------------------
function disableButtonsATTFgatest() {
	$('#btn-alignme-createscript-att').unbind('click', runFGATest);
	$('#btn-att-fgatest-run').addClass('not-allowed');
	$('#btn-att-fgatest-run').addClass('btn-secondary');
	$('#btn-att-fgatest-run').removeClass('btn-success');
}

// -----------------------------------------
// Enable Buttons
// -----------------------------------------
function enableButtonsATTFgatest() {
	$('#btn-att-fgatest-run').bind('click', runFGATest);
	$('#btn-att-fgatest-run').removeClass('not-allowed');
	$('#btn-att-fgatest-run').removeClass('btn-secondary');
	$('#btn-att-fgatest-run').addClass('btn-success');
}

// -----------------------------------------
// When Folder is changed
// -----------------------------------------
function whenFolderIsChanged() {
	// Start spinner
	spinner_executing();

	// Check if file is exists
	let folderPath = $('#att-fgatest-mobatch-srt_data-folder').val();
	$.ajax({
		type: 'POST',
		url: 'http://localhost/srtwp/tools/is_filefolder_exists',
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
	if (message === 'exists') {
		spinner_post();
		enableButtonsATTFgatest();
	} else {
		spinner_post();
		disableButtonsATTFgatest();
		noFolderSelection();
		$('#att-fgatest-output').html('');
	}
}

// ----------------------------------
// Create Run
// ----------------------------------
function runFGATest() {
	const srtDataFolder = $('#att-fgatest-mobatch-srt_data-folder').val();
	const fgaName = $('#fga-name').val();
	const script = 'ATT-FGATEST';

	ajaxFGATest(fgaName, srtDataFolder, script);
}

function ajaxFGATest(fgaName, srtDataFolder, script) {
	spinner_executing();
	$.ajax({
		type: 'POST',
		url: 'http://localhost/srtwp/tools/run_script',
		data: {
			pathFolder: srtDataFolder,
			scripts: script,
			options: fgaName + '#' + srtDataFolder
		},
		success: cbRunAlignMe,
		error: function(err) {
			console.log(err);
		}
	});
}

function cbRunAlignMe(data) {
	// Start Spinner
	spinner_post();

	$('#att-fgatest-output').html(data);

	// return disableButtonsATTFgatest();
}
