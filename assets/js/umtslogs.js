// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	// Disabling Button
	disableButtons();

	// -----------------------------------------
	// Add EventListener
	// -----------------------------------------
	$('#umtslogs-folder-path').focus(clearOutputResult);
	$('#umtslogs-folder-path').change(whenFolderIsChanged);
});

// -----------------------------------------
// Disable Buttons
// -----------------------------------------
function disableButtons() {
	$('#umtslogs-run-view-logs').unbind('click', ReadUmtsLogs);
	$('#umtslogs-run-view-logs').removeClass('btn-success');
	$('#umtslogs-run-view-logs').addClass('btn-secondary');
	$('#umtslogs-run-view-logs').addClass('btn-secondary');
	$('#umtslogs-run-view-logs').addClass('not-allowed');
}

// -----------------------------------------
// Enable Buttons
// -----------------------------------------
function enableButtons() {
	$('#umtslogs-run-view-logs').bind('click', ReadUmtsLogs);
	$('#umtslogs-run-view-logs').removeClass('btn-secondary');
	$('#umtslogs-run-view-logs').addClass('btn-success');
	$('#umtslogs-run-view-logs').removeClass('not-allowed');
}

// -----------------------------------------
// When Folder is changed
// -----------------------------------------
function whenFolderIsChanged() {
	// Start spinner
	spinner_executing();

	let folderPath = $('#umtslogs-folder-path').val();

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
	// Stop Spinner
	spinner_post();

	if (message === 'exists') {
		enableButtons();
	} else {
		disableButtons();
		noFolderSelection();
	}
}

// -----------------------------------------
// Parse to Text
// -----------------------------------------
function ReadUmtsLogs() {
	let folderPath = $('#umtslogs-folder-path').val();

	if (folderPath != '--Select Folder--') {
		// Start spinner
		spinner_executing();

		// Post Method
		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: folderPath,
				scripts: 'READ-UMTS-LOGS',
				options: folderPath
			},
			success: cbReadUmtsLogs,
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
function cbReadUmtsLogs(data) {
	// Stop spinner
	spinner_post();

	$('#output-result').addClass('console');
	$('#output-result').html(data);
	$('body').removeClass('others');
}
