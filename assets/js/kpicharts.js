/// <reference path="../../typings/globals/jquery/index.d.ts" />
/*jshint esversion: 6 */

// -----------------------------------------
// Windows on load
// -----------------------------------------
$(document).ready(function() {
	// -----------------------------------------
	// Add EventListener
	// -----------------------------------------
	$('#btnKPIReset').click(runKPIReset);
	$('#btnKPITrafficPerfomance').click(runTrafficPerformance);
	$('#btnKPIDropCount').click(runDropCount);
	$('#btnKPIpmHo').click(runPmHo);
	$('#btnKPIFGAs').click(runFGAs);
});

// Reset Function
function runKPIReset() {
	$('#chart-container').html('');
	$('#areaKPI').val('');
	$('body').removeClass('kpiClass');
	$('body').addClass('others');
}

// ---------------------------
// KPI Traffic Performance
// ---------------------------
function runTrafficPerformance() {
	const UIareaKPI = $('#areaKPI');

	if (UIareaKPI.val() === '') {
		const alert = `
		<div class="alert alert-danger" role="alert">KPI Data is empty!</div>`;
		$('#kpi-alert').append(alert);
		setTimeout(function() {
			$('#kpi-alert').html('');
		}, 1000);
	} else {
		// Start Spinner
		spinner_executing();
		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/runKPI',
			data: {
				kpi: 'Traffic-Performance'
			},
			success: cbRunTrafficPerformance,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function cbRunTrafficPerformance(data) {
	// Stop Spinner
	spinner_post();

	if (data.toString().trim() === 'valid') {
		loadTrafficPerformance();
		$('body').removeClass('others');
		$('body').addClass('kpiClass');
	} else {
		$('#chart-container').html(data);
	}
}

// -------------------------------
// KPI Drop Count
// -------------------------------
function runDropCount() {
	const UIareaKPI = $('#areaKPI');

	if (UIareaKPI.val() === '') {
		const alert = `
			<div class="alert alert-danger" role="alert">
				KPI Data is empty!
			</div>
			`;
		$('#kpi-alert').append(alert);
		setTimeout(function() {
			$('#kpi-alert').html('');
		}, 1000);
	} else {
		spinner_executing(); // Start Spinner
		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/runKPI',
			data: {
				kpi: 'Drop-Count'
			},
			success: cbrunDropCount,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function cbrunDropCount(data) {
	// Stop Spinner
	spinner_post();
	if (data.toString().trim() === 'valid') {
		loadDropCount();
		$('body').removeClass('others');
		$('body').addClass('kpiClass');
	} else {
		$('#chart-container').html(data);
	}
}

// -------------------------
// pmHo
// -------------------------
function runPmHo() {
	const UIareaKPI = $('#areaKPI');

	if (UIareaKPI.val() === '') {
		const alert = `
			<div class="alert alert-danger" role="alert">
				KPI Data is empty!
			</div>
			`;
		$('#kpi-alert').append(alert);
		setTimeout(function() {
			$('#kpi-alert').html('');
		}, 1000);
	} else {
		spinner_executing(); // Start Spinner
		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/runKPI',
			data: {
				kpi: 'pmHo'
			},
			success: cbRunPmHo,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function cbRunPmHo(data) {
	spinner_post(); // Stop Spinner

	if (data.toString().trim() === 'valid') {
		loadPmHo();
		$('body').removeClass('others');
		$('body').addClass('kpiClass');
	} else {
		$('#chart-container').html(data);
	}
}

// ----------------------------
// FGAs
// ----------------------------
function runFGAs() {
	const UIareaKPI = $('#areaKPI');

	if (UIareaKPI.val() === '') {
		const alert = `
			<div class="alert alert-danger" role="alert">
				KPI Data is empty!
			</div>
			`;
		$('#kpi-alert').append(alert);
		setTimeout(function() {
			$('#kpi-alert').html('');
		}, 1000);
	} else {
		spinner_executing(); // Start Spinner
		$.ajax({
			type: 'POST',
			url: 'http://localhost/srtwp/tools/runKPI',
			data: {
				kpi: 'FGAs'
			},
			success: cbRunFGAs,
			error: function(err) {
				console.log(err);
			}
		});
	}
}

function cbRunFGAs(data) {
	spinner_post(); // Stop Spinner

	if (data.toString().trim() === 'valid') {
		loadFGAChart();
		$('body').removeClass('others');
		$('body').addClass('kpiClass');
	} else {
		$('#chart-container').html(data);
	}
}
