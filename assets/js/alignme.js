/*jshint esversion: 6 */

// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	// Disabling Button
	disableButtonsAlignMe(true, true);

	// -----------------------------------------
	// Add EventListener
	// -----------------------------------------
	$('#folderPath-alignme').focus(clearOutputResult);
	$('#folderPath-alignme').change(whenFolderIsChanged);

	// Remove unused worksheet
	$('div#alignMe-worksheet').on('click', '.alignme-close', function() {
		$(this)
			.parent()
			.parent()
			.remove();
	});
});

// -----------------------------------------
// Disable Buttons
// -----------------------------------------
function disableButtonsAlignMe(validate = false, scripts = false) {
	if (validate) {
		// Button validate
		$('#btn-alignme-validate').unbind('click', validateGSTable);
		$('#btn-alignme-validate').addClass('not-allowed');
		$('#btn-alignme-validate').addClass('btn-secondary');
		$('#btn-alignme-validate').removeClass('btn-success');
	}
	if (scripts) {
		// Button Script AT&T
		$('#btn-alignme-createscript-att').unbind('click', Global_RunScript);
		$('#btn-alignme-createscript-att').addClass('not-allowed');
		$('#btn-alignme-createscript-att').addClass('btn-secondary');
		$('#btn-alignme-createscript-att').removeClass('btn-success');
	}
}

// -----------------------------------------
// Enable Buttons
// -----------------------------------------
function enableButtonsAlignMe(validate = false, scripts = false) {
	if (validate) {
		// Button validate
		$('#btn-alignme-validate').bind('click', validateGSTable);
		$('#btn-alignme-validate').removeClass('not-allowed');
		$('#btn-alignme-validate').removeClass('btn-secondary');
		$('#btn-alignme-validate').addClass('btn-success');
	}
	if (scripts) {
		// Button Script AT&T
		$('#btn-alignme-createscript-att').bind('click', Global_RunScript);
		$('#btn-alignme-createscript-att').removeClass('not-allowed');
		$('#btn-alignme-createscript-att').removeClass('btn-secondary');
		$('#btn-alignme-createscript-att').addClass('btn-success');
	}
}

// -----------------------------------------
// When Folder is changed
// -----------------------------------------
function whenFolderIsChanged() {
	// Start spinner
	spinner_executing();

	// Check if file is exists
	let folderPath = $('#folderPath-alignme').val();
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
		// Enable the Buttons
		enableButtonsAlignMe(true, false);

		let folderPath = $('#folderPath-alignme').val();
		const string = 'GetExcelWorksheet ' + folderPath;

		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/run_script',
			data: {
				pathFolder: folderPath,
				scripts: string,
				options: ''
			},
			success: callback_showTable,
			error: function(err) {
				console.log(err);
			}
		});
	} else {
		// Stop Spinner
		spinner_post();

		disableButtonsAlignMe(true, true);
		noFolderSelection();
		clearOutputResult();
		$('#alignMe-worksheet').html('');
	}
}

function callback_showTable(data) {
	if (data.includes('Worksheet:')) {
		$('#alignMe-worksheet').html(alignMe_Template(data));
	} else {
		$('#output-result').addClass('console');
		$('#output-result').html(data);
	}

	// Stop Spinner
	spinner_post();
}

function validateGSTable() {
	let ExcelPath = $('#folderPath-alignme').val();
	const customer = $('#customer').val();

	let worksheets = $('.alignme-shname');
	let configRequests = '';

	if (worksheets.length > 0) {
		let alignType = $('.alignme-type').find('option:selected');
		let alignNode = $('.alignme-node').find('option:selected');
		let alignSWVer = $('.alignme-swver').find('option:selected');
		let alignFileNumber = $('.alignme-filenum').find('option:selected');
		let alignPreCV = $('.alignme-precv');
		let alignPostCV = $('.alignme-postcv');
		for (let index = 0; index < worksheets.length; index++) {
			const shName = worksheets[index].textContent.replace(/  |\r\n|\n|\r/gm, '');
			const shType = alignType[index].textContent;
			const shNode = alignNode[index].textContent;
			const shSWVer = alignSWVer[index].textContent;
			const shFileNumbering = alignFileNumber[index].textContent;
			const shPreCV = alignPreCV[index].value;
			const shPostCV = alignPostCV[index].value;
			let configRequest =
				shName +
				',' +
				shType +
				',' +
				shNode +
				',' +
				shFileNumbering +
				',' +
				shPreCV +
				',' +
				shPostCV +
				',' +
				shSWVer +
				',' +
				customer;
			configRequests += configRequest + ';';
		}
	} else {
		$('.alert').show();
	}
	configRequests = configRequests.replace(/(;$)/g, '');
	configRequests = configRequests.replace(/ /g, '%20');
	configRequests = 'AlignMe-Validate ' + ExcelPath + ' ' + configRequests;
	// console.log(configRequests);
	ValidateAlignMe(ExcelPath, configRequests);
}

// ------------------
// Validation
// ------------------
function ValidateAlignMe(ExcelPath, configRequests) {
	// Start Spinner
	spinner_executing();
	$.ajax({
		type: 'POST',
		url: 'http://localhost/srtwp/tools/run_script',
		data: {
			pathFolder: ExcelPath,
			scripts: configRequests,
			options: ''
		},
		success: cbValidateAlignMe,
		error: function(err) {
			console.log(err);
		}
	});
}
function cbValidateAlignMe(data) {
	// Stop Spinner
	spinner_post();
	$('#output-result').addClass('console');
	$('#output-result').html(data);
	$('body').removeClass('others');
	enableButtonsAlignMe(true, true);
}

// ----------------------------------
// Create Global Script
// ----------------------------------
function Global_RunScript() {
	let ExcelPath = $('#folderPath-alignme').val();
	let worksheets = $('.alignme-shname');
	let configRequests = '';
	const customer = $('#customer').val();

	if (worksheets.length > 0) {
		let alignType = $('.alignme-type').find('option:selected');
		let alignNode = $('.alignme-node').find('option:selected');
		let alignSWVer = $('.alignme-swver').find('option:selected');
		let alignFileNumber = $('.alignme-filenum').find('option:selected');
		let alignPreCV = $('.alignme-precv');
		let alignPostCV = $('.alignme-postcv');
		for (let index = 0; index < worksheets.length; index++) {
			const shName = worksheets[index].textContent.replace(/  |\r\n|\n|\r/gm, '');
			const shType = alignType[index].textContent;
			const shNode = alignNode[index].textContent;
			const shSWVer = alignSWVer[index].textContent;
			const shFileNumbering = alignFileNumber[index].textContent;
			const shPreCV = alignPreCV[index].value;
			const shPostCV = alignPostCV[index].value;
			let configRequest =
				shName +
				',' +
				shType +
				',' +
				shNode +
				',' +
				shFileNumbering +
				',' +
				shPreCV +
				',' +
				shPostCV +
				',' +
				shSWVer +
				',' +
				customer;
			configRequests += configRequest + ';';
		}
	} else {
		$('.alert').show();
	}
	configRequests = configRequests.replace(/(;$)/g, '');
	configRequests = configRequests.replace(/ /g, '%20');
	configRequests = 'AlignMe-CreateScript ' + ExcelPath + ' ' + configRequests;
	runAlignMe(ExcelPath, configRequests);
}

function runAlignMe(ExcelPath, configRequests) {
	spinner_executing();
	$.ajax({
		type: 'POST',
		url: 'http://localhost/srtwp/tools/run_script',
		data: {
			pathFolder: ExcelPath,
			scripts: configRequests,
			options: ''
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

	$('#output-result').addClass('console');
	$('#output-result').html(data);

	return disableButtonsAlignMe(false, true);
}

// -------------------
// AlignMe Template
// -------------------
function alignMe_Template(data) {
	var datas = data.split('\n');
	var output = `
    <table class="table-bordered table-striped table-alignme">
        <thead>
            <tr>
                <th class="row-1 th-alignme">Worksheet</th>
                <th class="row-2 th-alignme">AlignType</th>
                <th class="row-3 th-alignme">Node</th>
                <th class="row-4 th-alignme">SWVersion</th>
                <th class="row-5 th-alignme">#</th>
                <th class="row-6 th-alignme">Pre CV</th>
                <th class="row-7 th-alignme">Post CV</th>
                <th class="row-8 th-alignme"></th>
            </tr>
        </thead>
        <tbody>
    `;
	for (let index = 0; index < datas.length; index++) {
		const element = datas[index];
		if (element.includes('Worksheet:')) {
			var shName = element.split(',');
			for (let j = 0; j < shName.length; j++) {
				const sheet = shName[j].replace('Worksheet:', '');
				output += alignMe_CreateSelection(sheet, j);
			}
		}
	}
	output += `
        </tbody>
    </table>
    `;
	return output;
}

function sheet_selected(sheet) {
	var opt1 = '<option>LTE_GSDiscrepancies</option>';
	var opt2 = '<option>LTE_EUtranFreqRelation</option>';
	var opt3 = '<option>LTE_UtranFreqRelation</option>';
	var opt4 = '<option>LTE_LTEColocated</option>';
	var opt5 = '<option>LTE_UMTSColocated</option>';
	var opt6 = '<option>LTE_UlComp</option>';
	var opt7 = '<option>LTE_RatFreqPrio</option>';
	var opt8 = '<option>UMTS_CoverageRelation</option>';
	var opt9 = '<option>UMTS_UtranRelation</option>';
	var opt10 = '<option>UMTS_EutranFreqRelation</option>';
	var opt11 = '<option>UMTS_EutranFrequency</option>';
	var opt12 = '<option>UMTS_GsmRelation</option>';
	var opt13 = '<option>UMTS_ExternalGsmCell</option>';
	var opt14 = '<option>UMTS_ExternalUtranCell</option>';

	if (sheet.indexOf('EUtranFreqRelationId') != -1) {
		opt2 = '<option selected>LTE_EUtranFreqRelation</option>';
	} else if (sheet.indexOf('UtranFreqRelationId') != -1) {
		opt3 = '<option selected>LTE_UtranFreqRelation</option>';
	} else if (sheet.indexOf('Colocated') != -1) {
		opt4 = '<option selected>LTE_LTEColocated</option>';
	} else if (sheet.indexOf('LTE-UMTSUtranCellRelation') != -1) {
		opt5 = '<option selected>LTE_UMTSColocated</option>';
	} else if (sheet.indexOf('CellInformation') != -1) {
		opt6 = '<option selected>LTE_UlComp</option>';
	} else if (sheet.indexOf('UlComp') != -1) {
		opt6 = '<option selected>LTE_UlComp</option>';
	} else if (sheet.indexOf('RatFreqPrio') != -1) {
		opt7 = '<option selected>LTE_RatFreqPrio</option>';
	} else if (sheet.indexOf('CoverageRelation') != -1) {
		opt8 = '<option selected>UMTS_CoverageRelation</option>';
	} else if (sheet.indexOf('UtranRelation') != -1) {
		opt9 = '<option selected>UMTS_UtranRelation</option>';
	} else if (sheet.indexOf('UMTS_EutranFreqRelation') != -1) {
		opt10 = '<option selected>UMTS_EutranFreqRelation</option>';
	} else if (sheet.indexOf('UMTS_EutranFrequency') != -1) {
		opt11 = '<option selected>UMTS_EutranFrequency</option>';
	} else if (sheet.indexOf('UMTS_GsmRelation') != -1) {
		opt12 = '<option selected>UMTS_GsmRelation</option>';
	} else if (sheet.indexOf('UMTS_ExternalGsmCell') != -1) {
		opt13 = '<option selected>UMTS_ExternalGsmCell</option>';
	} else if (sheet.indexOf('UMTS_ExternalUtranCell') != -1) {
		opt14 = '<option selected>UMTS_ExternalUtranCell</option>';
	} else {
		opt1 = '<option selected>LTE_GSDiscrepancies</option>';
	}

	return `
        ${opt1}
        ${opt2}
        ${opt3}
        ${opt4}
        ${opt5}
        ${opt6}
        ${opt7}
        ${opt8}
        ${opt9}
				${opt10}
				${opt11}
				${opt12}
				${opt13}
				${opt14}
    `;
}

function sheet_fileNumber(sheet) {
	var opt1 = '<option>01</option>';
	var opt2 = '<option>02</option>';
	var opt3 = '<option>03</option>';
	var opt4 = '<option>04</option>';
	var opt5 = '<option>05</option>';
	var opt6 = '<option>06</option>';
	var opt7 = '<option>07</option>';
	var opt8 = '<option>08</option>';
	var opt9 = '<option>09</option>';
	var opt10 = '<option>10</option>';
	var opt11 = '<option>11</option>';
	var opt12 = '<option>12</option>';
	var opt13 = '<option>13</option>';
	var opt14 = '<option>14</option>';
	var opt15 = '<option>15</option>';

	if (sheet.indexOf('EUtranFreqRelationId') != -1) {
		opt2 = '<option selected>02</option>';
	} else if (sheet.indexOf('UtranFreqRelationId') != -1) {
		opt3 = '<option selected>03</option>';
	} else if (sheet.indexOf('Colocated') != -1) {
		opt4 = '<option selected>04</option>';
	} else if (sheet.indexOf('LTE-UMTSUtranCellRelation') != -1) {
		opt5 = '<option selected>05</option>';
	} else if (sheet.indexOf('CellInformation') != -1) {
		opt6 = '<option selected>06</option>';
	} else if (sheet.indexOf('UlComp') != -1) {
		opt6 = '<option selected>06</option>';
	} else if (sheet.indexOf('RatFreqPrio') != -1) {
		opt7 = '<option selected>07</option>';
	} else if (sheet.indexOf('CoverageRelation') != -1) {
		opt8 = '<option selected>01</option>';
	} else if (sheet.indexOf('UtranRelation') != -1) {
		opt9 = '<option selected>03</option>';
	} else if (sheet.indexOf('UMTS_EutranFreqRelation') != -1) {
		opt10 = '<option selected>05</option>';
	} else if (sheet.indexOf('UMTS_EutranFrequency') != -1) {
		opt11 = '<option selected>04</option>';
	} else if (sheet.indexOf('UMTS_GsmRelation') != -1) {
		opt12 = '<option selected>07</option>';
	} else if (sheet.indexOf('UMTS_ExternalGsmCell') != -1) {
		opt13 = '<option selected>06</option>';
	} else if (sheet.indexOf('UMTS_ExternalUtranCell') != -1) {
		opt14 = '<option selected>02</option>';
	} else {
		opt1 = '<option selected>01</option>';
	}
	return `
        ${opt1}
        ${opt2}
        ${opt3}
        ${opt4}
        ${opt5}
        ${opt6}
        ${opt7}
        ${opt8}
        ${opt9}
        ${opt10}
        ${opt11}
        ${opt12}
        ${opt13}
        ${opt14}
        ${opt15}
    `;
}

function prepostList(prepost) {
	return `
    <option value="NONE">NONE</option>
    <option value="cvms ${prepost}_GS_$date YPN">cvms ${prepost}_GS_$date YPN</option>
    <option value="cvms ${prepost}_GSNew_$date YPN">cvms ${prepost}_GSNew_$date YPN</option>
    <option value="cvms ${prepost}_GSExisting_$date YPN">cvms ${prepost}_GSExisting_$date YPN</option>
    <option value="cvms ${prepost}_EUtranFreq_$date YPN">cvms ${prepost}_EUtranFreq_$date YPN</option>
    <option value="cvms ${prepost}_UtranFreq_$date YPN">cvms ${prepost}_UtranFreq_$date YPN</option>
    <option value="cvms ${prepost}_LTEColocated_$date YPN">cvms ${prepost}_LTEColocated_$date YPN</option>
    <option value="cvms ${prepost}_UMTSColocated_$date YPN">cvms ${prepost}_UMTSColocated_$date YPN</option>
    <option value="cvms ${prepost}_UlComp_$date YPN">cvms ${prepost}_UlComp_$date YPN</option>
    <option value="cvms ${prepost}_RatFreqPrio_$date YPN">cvms ${prepost}_RatFreqPrio_$date YPN</option>
    <option value="cvms ${prepost}_CoverageRelation_$date YPN">cvms ${prepost}_CoverageRelation_$date YPN</option>
    <option value="cvms ${prepost}_Custom_$date YPN">cvms ${prepost}_Custom_$date YPN</option>
    `;
}

function nodeSelection(sheet) {
	var opt1 = '<option>BBU</option>';
	var opt2 = '<option>DUS</option>';
	var opt3 = '<option>RNC</option>';
	var opt4 = '<option>NODEB</option>';

	if (sheet.startsWith('UMTS')) {
		opt3 = '<option selected>RNC</option>';
	} else {
		opt1 = '<option selected>BBU</option>';
	}
	return `
        ${opt1}
        ${opt2}
        ${opt3}
        ${opt4}
    `;
}

function swSelection(sheet) {
	let opt1 = '<option>L19Q3</option>';
	let opt2 = '<option>L19Q1</option>';
	let opt3 = '<option>L18Q4</option>';
	let opt4 = '<option>L18Q3</option>';
	let opt5 = '<option>L18Q2</option>';
	let opt6 = '<option>L18Q1</option>';
	let opt7 = '<option>L17x</option>';
	let opt8 = '<option>W18</option>';
	let opt9 = '<option>W15</option>';
	let opt10 = '<option>W14</option>';

	if (sheet.startsWith('UMTS')) {
		opt7 = '<option selected>W18</option>';
	} else {
		opt1 = '<option selected>L19Q3</option>';
	}
	return `
        ${opt1}
        ${opt2}
        ${opt3}
        ${opt4}
        ${opt5}
        ${opt6}
        ${opt7}
        ${opt8}
        ${opt9}
        ${opt10}
    `;
}

function alignMe_CreateSelection(sheet, index) {
	return `
        <tr id="sh${index}" class="tr-alignme">
            <td class="td-alignme"><span class="alignme-shname">${sheet}</span></td>
            <td class="td-alignme">
                <select class="alignme-type" style="height: 30px; width: 100%;">
                    ${sheet_selected(sheet)}
                </select>
            </td>
            <td class="td-alignme">
                <select class="alignme-node" style="height: 30px; width: 100%;">
                    ${nodeSelection(sheet)}
                </select>
            </td>
            <td class="td-alignme">
                <select class="alignme-swver" style="height: 30px; width: 100%;">
                    ${swSelection(sheet)}
                </select>
            </td>
            <td class="td-alignme">
                <select class="alignme-filenum" style="height: 30px; width: 100%;">
                    ${sheet_fileNumber(sheet)}
                </select>
            </td>
            <td class="td-alignme">
                <input type="text" class="alignme-precv" name="precv" style="height: 30px; width: 100%;" autocomplete=false
                placeholder="Enter the 'cvms' command here..." list="precv-list">
                <datalist id="precv-list" autocomplete=false>
                    ${prepostList('Pre')}
                </datalist>
            </td>
            <td class="td-alignme">
                <input type="text" class="alignme-postcv" name="Postcv" list="Postcv-list" style="height: 30px; width: 100%;" autocomplete=false
                placeholder="Enter the 'cvms' command here...">
                <datalist id="Postcv-list" autocomplete=false>
                    ${prepostList('Post')}
                </datalist>
            </td>
            <td class="td-alignme"><span class="badge badge-warning alignme-close">X</span></td>
        </tr>
    `;
}
