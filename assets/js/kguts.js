// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	// Disabling Button
	disableButtons();

	// -----------------------------------------
	// Add EventListener
	// -----------------------------------------
	$('#kgutsFolderPath').focus(clearOutputResult);
	$('#kgutsFolderPath').change(whenFolderIsChanged);
});

// -----------------------------------------
// Disable Buttons
// -----------------------------------------
function disableButtons() {
	// console.log('disabling button...');
	$('#kguts-textParser').unbind('click', kgutsTextParser);
	$('#kguts-textParser').removeClass('btn-success');
	$('#kguts-textParser').addClass('btn-secondary');
	$('#kguts-textParser').addClass('btn-secondary');
	$('#kguts-textParser').addClass('not-allowed');

	$('#kguts-jsonParser').unbind('click', kgutsJsonParser);
	$('#kguts-jsonParser').removeClass('btn-success');
	$('#kguts-jsonParser').addClass('btn-secondary');
	$('#kguts-jsonParser').addClass('not-allowed');
}

// -----------------------------------------
// Enable Buttons
// -----------------------------------------
function enableButtons() {
	$('#kguts-textParser').bind('click', kgutsTextParser);
	$('#kguts-textParser').removeClass('btn-secondary');
	$('#kguts-textParser').addClass('btn-success');
	$('#kguts-textParser').removeClass('not-allowed');

	$('#kguts-jsonParser').bind('click', kgutsJsonParser);
	$('#kguts-jsonParser').removeClass('btn-secondary');
	$('#kguts-jsonParser').addClass('btn-success');
	$('#kguts-jsonParser').removeClass('not-allowed');
}

// -----------------------------------------
// When Folder is changed
// -----------------------------------------
function whenFolderIsChanged() {
	// Start spinner
	spinner_executing();

	let folderPath = $('#kgutsFolderPath').val();

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
function kgutsTextParser() {
	let folderPath = $('#kgutsFolderPath').val();

	if (folderPath != '--Select Folder--') {
		// Start spinner
		spinner_executing();

		// Post Method
		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: folderPath,
				scripts: 'Kguts-Text',
				options: folderPath
			},
			success: cbKgutsTextParser,
			error: function(err) {
				console.log(err);
			}
		});
	} else {
		noFolderSelection(); // at main.js
	}
}

// -----------------------------------------
// Parse to JSON
// -----------------------------------------
function kgutsJsonParser() {
	let folderPath = $('#kgutsFolderPath').val();

	if (folderPath != '--Select Folder--') {
		// Start Spinner
		spinner_executing();

		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: folderPath,
				scripts: 'Kguts-Json',
				options: folderPath
			},
			success: cbKgutsJsonParser,
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
function cbKgutsTextParser(data) {
	// Stop spinner
	spinner_post();

	$('#output-result').addClass('console');
	$('#output-result').html(data);
}
function cbKgutsJsonParser(data) {
	// Stop spinner
	spinner_post();

	$('#output-result').addClass('console');
	$('#output-result').html(data);
}
