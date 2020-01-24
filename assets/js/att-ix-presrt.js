/* jshint esversion: 6 */

// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	// Disabling Button
	enableDisableButtonsATTIXPreSRT('bind', 'unbind', 'bind', '', 'unbind');
	$('#folderPath-presrt').change(whenFolderModumpChange);
});

// -----------------------------------------
// When Folder is changed
// -----------------------------------------
function whenFolderModumpChange() {
	// Start spinner
	spinner_executing();

	let cellDataFile = `${$('#folderPath-presrt').val()}\\mobatch_celldata\\config_celldata.xlsx`;

	$.ajax({
		type: 'POST',
		url: 'http://localhost/srtwp/tools/is_filefolder_exists',
		data: {
			pathFolder: cellDataFile
		},
		success: cbwhenFolderModumpChange,
		error: function(err) {
			console.log(err);
		}
	});
}

function cbwhenFolderModumpChange(message) {
	// Stop Spinner
	spinner_post();
	if (message === 'exists') {
		enableDisableButtonsATTIXPreSRT(
			'bind',
			'bind',
			'',
			'bind',
			'bind',
			'bind',
			'bind',
			'bind',
			'bind',
			'unbind',
			'unbind'
		);
	} else {
		enableDisableButtonsATTIXPreSRT(
			'bind',
			'unbind',
			'bind',
			'',
			'unbind',
			'unbind',
			'unbind',
			'unbind',
			'unbind',
			'unbind',
			'unbind'
		);
	}
}

// -----------------------------------------
// Enable/Disable Buttons
// -----------------------------------------
function enableDisableButtonsATTIXPreSRT(
	getCellData = '',
	crExistingRelation = '',
	crExistingSysConsts = '',
	optSelect = '',
	crNBIotCell = '',
	btnRatFreqPrio_01 = 'unbind',
	btnRatFreqPrio_02 = 'unbind',
	btnRatFreqPrio_03 = 'unbind',
	btnRatFreqPrio_04 = 'unbind',
	btnRatFreqPrio_05 = 'unbind',
	btnRatFreqPrio_06 = 'unbind'
) {
	if (btnRatFreqPrio_01 === 'unbind') {
		$('#btnRatFreqPrio-01').unbind('click', runRATFreqPrio_01);
		$('#btnRatFreqPrio-01').addClass('not-allowed');
		$('#btnRatFreqPrio-01').addClass('btn-secondary');
		$('#btnRatFreqPrio-01').removeClass('btn-success');
	} else {
		$('#btnRatFreqPrio-01').bind('click', runRATFreqPrio_01);
		$('#btnRatFreqPrio-01').removeClass('not-allowed');
		$('#btnRatFreqPrio-01').removeClass('btn-secondary');
		$('#btnRatFreqPrio-01').addClass('btn-success');
	}

	if (btnRatFreqPrio_02 === 'unbind') {
		$('#btnRatFreqPrio-02').unbind('click', runRATFreqPrio_02);
		$('#btnRatFreqPrio-02').addClass('not-allowed');
		$('#btnRatFreqPrio-02').addClass('btn-secondary');
		$('#btnRatFreqPrio-02').removeClass('btn-success');
	} else {
		$('#btnRatFreqPrio-02').bind('click', runRATFreqPrio_02);
		$('#btnRatFreqPrio-02').removeClass('not-allowed');
		$('#btnRatFreqPrio-02').removeClass('btn-secondary');
		$('#btnRatFreqPrio-02').addClass('btn-success');
	}

	if (btnRatFreqPrio_03 === 'unbind') {
		$('#btnRatFreqPrio-03').unbind('click', runRATFreqPrio_03);
		$('#btnRatFreqPrio-03').addClass('not-allowed');
		$('#btnRatFreqPrio-03').addClass('btn-secondary');
		$('#btnRatFreqPrio-03').removeClass('btn-success');
	} else {
		$('#btnRatFreqPrio-03').bind('click', runRATFreqPrio_03);
		$('#btnRatFreqPrio-03').removeClass('not-allowed');
		$('#btnRatFreqPrio-03').removeClass('btn-secondary');
		$('#btnRatFreqPrio-03').addClass('btn-success');
	}
	if (btnRatFreqPrio_04 === 'unbind') {
		$('#btnRatFreqPrio-04').unbind('click', runRATFreqPrio_04);
		$('#btnRatFreqPrio-04').addClass('not-allowed');
		$('#btnRatFreqPrio-04').addClass('btn-secondary');
		$('#btnRatFreqPrio-04').removeClass('btn-success');
	} else {
		$('#btnRatFreqPrio-04').bind('click', runRATFreqPrio_04);
		$('#btnRatFreqPrio-04').removeClass('not-allowed');
		$('#btnRatFreqPrio-04').removeClass('btn-secondary');
		$('#btnRatFreqPrio-04').addClass('btn-success');
	}

	if (btnRatFreqPrio_05 === 'unbind') {
		$('#btnRatFreqPrio-05').addClass('not-allowed');
		$('#btnRatFreqPrio-05').addClass('btn-secondary');
		$('#btnRatFreqPrio-05').removeClass('btn-success');
	} else {
		$('#btnRatFreqPrio-05').removeClass('not-allowed');
		$('#btnRatFreqPrio-05').removeClass('btn-secondary');
		$('#btnRatFreqPrio-05').addClass('btn-success');
	}

	if (btnRatFreqPrio_06 === 'unbind') {
		$('#btnRatFreqPrio-06').addClass('not-allowed');
		$('#btnRatFreqPrio-06').addClass('btn-secondary');
		$('#btnRatFreqPrio-06').removeClass('btn-success');
	} else {
		$('#btnRatFreqPrio-06').removeClass('not-allowed');
		$('#btnRatFreqPrio-06').removeClass('btn-secondary');
		$('#btnRatFreqPrio-06').addClass('btn-success');
	}

	// Button Get Cell Data
	if (getCellData === 'bind') {
		$('#btnATTIXGetcelldata').bind('click', runGetCellData);
		$('#btnATTIXGetcelldata').removeClass('not-allowed');
		$('#btnATTIXGetcelldata').removeClass('btn-secondary');
		$('#btnATTIXGetcelldata').addClass('btn-success');
	} else if (getCellData === 'unbind') {
		$('#btnATTIXGetcelldata').unbind('click', runGetCellData);
		$('#btnATTIXGetcelldata').addClass('not-allowed');
		$('#btnATTIXGetcelldata').addClass('btn-secondary');
		$('#btnATTIXGetcelldata').removeClass('btn-success');
	}

	// Button Create Existing Relation
	if (crExistingRelation === 'bind') {
		$('#btnATTIXExistingrelation').bind('click', runCreateExistingRelation);
		$('#btnATTIXExistingrelation').removeClass('not-allowed');
		$('#btnATTIXExistingrelation').removeClass('btn-secondary');
		$('#btnATTIXExistingrelation').addClass('btn-success');
	} else if (crExistingRelation === 'unbind') {
		$('#btnATTIXExistingrelation').unbind('click', runCreateExistingRelation);
		$('#btnATTIXExistingrelation').addClass('not-allowed');
		$('#btnATTIXExistingrelation').addClass('btn-secondary');
		$('#btnATTIXExistingrelation').removeClass('btn-success');
	}

	// Button Create Existing SystemConstant
	if (crExistingSysConsts === 'bind') {
		$('#btnATTIXSystemconstants').bind('click', runCreateExistingSysConsts);
		$('#btnATTIXSystemconstants').removeClass('not-allowed');
		$('#btnATTIXSystemconstants').removeClass('btn-secondary');
		$('#btnATTIXSystemconstants').addClass('btn-success');
	} else if (crExistingSysConsts === 'unbind') {
		$('#btnATTIXSystemconstants').unbind('click', runCreateExistingSysConsts);
		$('#btnATTIXSystemconstants').addClass('not-allowed');
		$('#btnATTIXSystemconstants').addClass('btn-secondary');
		$('#btnATTIXSystemconstants').removeClass('btn-success');
	}

	// Button NBIotCell
	if (crNBIotCell === 'bind') {
		$('#btnATTIXNBIotCell').bind('click', runNBIotCell);
		$('#btnATTIXNBIotCell').removeClass('not-allowed');
		$('#btnATTIXNBIotCell').removeClass('btn-secondary');
		$('#btnATTIXNBIotCell').addClass('btn-success');
	} else if (crNBIotCell === 'unbind') {
		$('#btnATTIXNBIotCell').unbind('click', runNBIotCell);
		$('#btnATTIXNBIotCell').addClass('not-allowed');
		$('#btnATTIXNBIotCell').addClass('btn-secondary');
		$('#btnATTIXNBIotCell').removeClass('btn-success');
	}

	// Option selection
	if (optSelect === 'unbind') {
		$('#optMarket-presrt').prop('disabled', 'disabled');
		$('#folderPath-presrt').prop('disabled', 'disabled');
		$('#ciqPath-presrt').prop('disabled', 'disabled');
	} else if (optSelect === 'bind') {
		$('#optMarket-presrt').prop('disabled', '');
		$('#folderPath-presrt').prop('disabled', '');
		$('#ciqPath-presrt').prop('disabled', '');
	}
}

function runRATFreqPrio_04() {
	const optModump = $('#folderPath-presrt').val();

	let li = '';

	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}

	if (li !== '') {
		$('.alert ul').append(li);
		$('.alert').show();
		setTimeout(function() {
			$('.alert').hide();
			$('.alert ul').html('');
		}, 3000);
	} else {
		// Start Spinner
		spinner_executing();

		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: optModump,
				scripts: 'ATT-PRESRT-RATFREQPRIO',
				options: optModump + '#_04'
			},
			success: cbrunRATFreqPrio,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function runRATFreqPrio_03() {
	const optModump = $('#folderPath-presrt').val();

	let li = '';

	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}

	if (li !== '') {
		$('.alert ul').append(li);
		$('.alert').show();
		setTimeout(function() {
			$('.alert').hide();
			$('.alert ul').html('');
		}, 3000);
	} else {
		// Start Spinner
		spinner_executing();

		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: optModump,
				scripts: 'ATT-PRESRT-RATFREQPRIO',
				options: optModump + '#_03'
			},
			success: cbrunRATFreqPrio,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function runRATFreqPrio_02() {
	const optModump = $('#folderPath-presrt').val();

	let li = '';

	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}

	if (li !== '') {
		$('.alert ul').append(li);
		$('.alert').show();
		setTimeout(function() {
			$('.alert').hide();
			$('.alert ul').html('');
		}, 3000);
	} else {
		// Start Spinner
		spinner_executing();

		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: optModump,
				scripts: 'ATT-PRESRT-RATFREQPRIO',
				options: optModump + '#_02'
			},
			success: cbrunRATFreqPrio,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function runRATFreqPrio_01() {
	const optModump = $('#folderPath-presrt').val();

	let li = '';

	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}

	if (li !== '') {
		$('.alert ul').append(li);
		$('.alert').show();
		setTimeout(function() {
			$('.alert').hide();
			$('.alert ul').html('');
		}, 3000);
	} else {
		// Start Spinner
		spinner_executing();

		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: optModump,
				scripts: 'ATT-PRESRT-RATFREQPRIO',
				options: optModump + '#_01'
			},
			success: cbrunRATFreqPrio,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function cbrunRATFreqPrio(data) {
	$('#output-result').addClass('console');
	$('#output-result').html(data);

	spinner_post();
}

function runNBIotCell() {
	const optModump = $('#folderPath-presrt').val();

	let li = '';

	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}

	if (li !== '') {
		$('.alert ul').append(li);
		$('.alert').show();
		setTimeout(function() {
			$('.alert').hide();
			$('.alert ul').html('');
		}, 3000);
	} else {
		// Start Spinner
		spinner_executing();

		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: optModump,
				scripts: 'ATT-NBIOT-GET',
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
	$('#output-result').addClass('console');
	$('#output-result').html(data);
	spinner_post();
}

function runGetCellData() {
	const optMarket = $('#optMarket-presrt').val();
	const optModump = $('#folderPath-presrt').val();
	const optCiq = $('#ciqPath-presrt').val();

	let li = '';

	if (!checkIfOptionsSelected(optMarket)) {
		li += `<li>Market must be selected!</li>`;
	}
	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}
	if (!checkIfOptionsSelected(optCiq)) {
		li += `<li>CIQ File must be selected!</li>`;
	}

	if (li !== '') {
		$('.alert ul').append(li);
		$('.alert').show();
		setTimeout(function() {
			$('.alert').hide();
			$('.alert ul').html('');
		}, 3000);
	} else {
		const checkPath = optMarket + '#' + optModump + '#' + optCiq;

		// Start Spinner
		spinner_executing();

		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: optModump,
				scripts: 'ATT-PreSRTGetCellData',
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
	$('#output-result').addClass('console');
	$('#output-result').html(data);

	let folderPath = $('#folderPath-presrt').val() + '\\mobatch_celldata';
	$.ajax({
		type: 'POST',
		url: 'http://localhost/srtwp/tools/is_filefolder_exists',
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
	if (message === 'exists') {
		// Enable the Create Existing Relations
		enableDisableButtonsATTIXPreSRT(
			'bind',
			'bind',
			'',
			'bind',
			'bind',
			'bind',
			'bind',
			'bind',
			'bind',
			'unbind',
			'unbind'
		);
	}

	// Stop Spinners
	spinner_post();
}

// ----------------------------------
// Create Existing Relation callback
// ----------------------------------

function runCreateExistingRelation() {
	const optModump = $('#folderPath-presrt').val();
	// Start Spinner
	spinner_executing();
	$.ajax({
		type: 'POST',
		url: 'http://localhost/srtwp/tools/run_script',
		data: {
			pathFolder: optModump,
			scripts: 'ATT-PreSRTExistingRelations',
			options: optModump
		},
		success: cbRunCreateExistingRelation,
		error: function(err) {
			console.log(err);
		}
	});
}

function cbRunCreateExistingRelation(data) {
	$('#output-result').addClass('console');
	$('#output-result').html(data);

	// Stop Spinners
	spinner_post();
}

// ----------------------------------
// Create Existing SysConsts callback
// ----------------------------------

function runCreateExistingSysConsts() {
	const optModump = $('#folderPath-presrt').val();
	let li = '';

	if (!checkIfOptionsSelected(optModump)) {
		li += `<li>Modump's folder must be selected!</li>`;
	}

	if (li !== '') {
		$('.alert ul').append(li);
		$('.alert').show();
		setTimeout(function() {
			$('.alert').hide();
			$('.alert ul').html('');
		}, 3000);
	} else {
		spinner_executing();
		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: optModump,
				scripts: 'ATT-PreSRTSystemConstans',
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
	$('body').removeClass('others');
	$('#output-result').addClass('console');
	$('#output-result').html(data);

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
