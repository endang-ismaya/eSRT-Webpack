/// <reference path="../../typings/globals/jquery/index.d.ts" />
/*jshint esversion: 6 */

function createApexTrafficPerformance(series, categories, title, selector) {
	var colors = [
		'#F3B415',
		'#F27036',
		'#663F59',
		'#6A6E94',
		'#4E88B4',
		'#00A7C6',
		'#18D8D8',
		'#A9D794',
		'#46AF78',
		'#A93F55',
		'#8C5E58',
		'#2176FF',
		'#33A1FD',
		'#7A918D',
		'#BAFF29',
		'#9932CC',
		'#ffd700',
		'#daa520'
	];

	const options = {
		chart: {
			height: 500,
			type: 'line',
			zoom: {
				enabled: true
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 3,
			curve: 'straight'
		},
		colors: colors,
		series: series,
		title: {
			text: title,
			align: 'center',
			style: {
				fontSize: '26px',
				color: '#666'
			}
		},
		markers: {
			size: 3,
			opacity: 0.9,
			colors: ['#8fbc8f'],
			strokeColor: '#ddd',
			strokeWidth: 1,
			style: 'hollow', // full, hollow, inverted
			hover: {
				size: 1
			}
		},
		xaxis: {
			categories: categories,
			labels: {
				style: {
					fontSize: '10px',
					fontFamily: 'Helvetica, Arial, sans-serif'
				}
			}
		},
		grid: {
			borderColor: '#f1f1f1'
		},
		legend: {
			show: true,
			position: 'right',
			verticalAlign: 'middle'
		},
		yaxis: {
			show: true,
			opposite: false,
			logaritmic: false,
			tickAmount: 10,
			min: 0,
			max: 100
		}
	};

	// Init Chart
	const chart = new ApexCharts(document.querySelector(selector), options);

	// Render Chart
	chart.render();
}

function createApexTrafficPerformance0_10(series, categories, title, selector) {
	var colors = [
		'#F3B415',
		'#F27036',
		'#663F59',
		'#6A6E94',
		'#4E88B4',
		'#00A7C6',
		'#18D8D8',
		'#A9D794',
		'#46AF78',
		'#A93F55',
		'#8C5E58',
		'#2176FF',
		'#33A1FD',
		'#7A918D',
		'#BAFF29',
		'#9932CC',
		'#ffd700',
		'#daa520'
	];

	const options = {
		chart: {
			height: 500,
			type: 'line',
			zoom: {
				enabled: true
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 3,
			curve: 'straight'
		},
		colors: colors,
		series: series,
		title: {
			text: title,
			align: 'center',
			style: {
				fontSize: '26px',
				color: '#666'
			}
		},
		markers: {
			size: 3,
			opacity: 0.9,
			colors: ['#8fbc8f'],
			strokeColor: '#ddd',
			strokeWidth: 1,
			style: 'hollow', // full, hollow, inverted
			hover: {
				size: 1
			}
		},
		xaxis: {
			categories: categories,
			labels: {
				style: {
					fontSize: '10px',
					fontFamily: 'Helvetica, Arial, sans-serif'
				}
			}
		},
		grid: {
			borderColor: '#f1f1f1'
		},
		legend: {
			show: true,
			position: 'right',
			verticalAlign: 'middle'
		},
		yaxis: {
			tickAmount: 1
		}
	};

	// Init Chart
	const chart = new ApexCharts(document.querySelector(selector), options);

	// Render Chart
	chart.render();
}

function createChartTrafficPerformance(counterName) {
	var tArea = document.getElementById('areaKPI');
	var lines = tArea.value.split('\n');
	var FDDs = [];
	var counters = [];
	var xAxisxCategories = [];
	var isDate = true;
	var biggestNumber = 0;

	// console.log(tArea.value);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (line.match(/^Date.*/)) {
			// console.log(line);
			let xLine = line.split(/\s+/);
			for (let j = 3; j < xLine.length; j++) {
				FDDs.push(xLine[j]);
			}
		} else if (line.match(/^Time.*/)) {
			// console.log(line);
			let xLine = line.split(/\s+/);
			for (let j = 2; j < xLine.length; j++) {
				FDDs.push(xLine[j]);
			}
			isDate = false;
		} else if (line.includes(counterName)) {
			// console.log(line);
			let xLine = line.split(/\s+/);
			let jDate = '';
			let jTime = '';
			let jDateTime = '';
			let counter = [];

			if (isDate) {
				for (let j = 0; j < xLine.length; j++) {
					if (j === 0) {
						jDate = xLine[j];
					} else if (j === 1) {
						jTime = xLine[j];
					} else if (j === 2) {
						jDateTime = jDate + '.' + jTime;
						xAxisxCategories.push(
							jDateTime.replace(/-/g, '').replace('20', '')
						);
					} else {
						// FDD values
						if (isNaN(Number(xLine[j]))) {
							counter.push(null);
						} else {
							counter.push(Number(xLine[j]));
							if (Number(xLine[j]) > biggestNumber) {
								biggestNumber = Number(xLine[j]);
							}
						}
					}
				}
			} else {
				for (let j = 0; j < xLine.length; j++) {
					if (j === 0) {
						jTime = xLine[j];
					} else if (j === 1) {
						xAxisxCategories.push(jTime);
					} else {
						// FDD values
						if (isNaN(Number(xLine[j]))) {
							counter.push(null);
						} else {
							counter.push(Number(xLine[j]));
							if (Number(xLine[j]) > biggestNumber) {
								biggestNumber = Number(xLine[j]);
							}
						}
					}
				}
			}

			counters.push(counter);
		}
	}

	var series = [];

	for (let i = 0; i < FDDs.length; i++) {
		let fdd = FDDs[i];
		let datas = [];
		for (let j = 0; j < counters.length; j++) {
			datas.push(counters[j][i]);
		}

		var a = {
			name: fdd,
			data: datas
		};

		series.push(a);
	}

	if (counterName === 'Ret_ERabRetainabilityRate') {
		createApexTrafficPerformance0_10(
			series,
			xAxisxCategories,
			counterName,
			'#' + counterName
		);
	} else {
		createApexTrafficPerformance(
			series,
			xAxisxCategories,
			counterName,
			'#' + counterName
		);
	}
}

function createApexFGA(series, categories, title, selector) {
	var options = {
		chart: {
			height: 1430,
			type: 'bar'
		},
		plotOptions: {
			bar: {
				horizontal: true,
				barHeight: '100%',
				dataLabels: {
					position: 'top'
				}
			}
		},
		colors: ['#008000', '#ff0000'],
		dataLabels: {
			enabled: true,
			offsetX: -6,
			style: {
				fontSize: '12px',
				colors: ['#fff']
			}
		},
		title: {
			text: title,
			align: 'center',
			style: {
				fontSize: '30px',
				color: '#666'
			}
		},
		stroke: {
			show: true,
			width: 1,
			colors: ['#fff']
		},
		series: series,
		xaxis: {
			categories: categories
		}
	};

	// Init Chart
	const chart = new ApexCharts(document.querySelector(selector), options);

	// Render Chart
	chart.render();
}

function createChartDropCount(counterName) {
	var tArea = document.getElementById('areaKPI');
	let sDate = '';
	let sTime = '';
	let sFDD = '';
	let sCounter = '';
	let iDate = 0;
	let iTime = 0;
	let iCounter = 0;
	let iFDD = 0;
	let isCounterFound = false;
	let isDate = false;

	let categories = [];
	let series = [];
	let FDDs = [];

	let lines = tArea.value.split('\n');
	for (let i = 0; i < lines.length; i++) {
		const sLine = lines[i].split(/\s+/);
		// console.log(sLine);

		if (isCounterFound === false) {
			for (j = 0; j < sLine.length; j++) {
				const item = sLine[j];
				// console.log(item);
				if (item.toLowerCase() === 'Date'.toLowerCase()) {
					iDate = j;
					isDate = true;
				} else if (item.toLowerCase() === 'Time'.toLowerCase()) {
					iTime = j;
				} else if (item.toLowerCase() === 'Object'.toLowerCase()) {
					iFDD = j;
				} else if (item === counterName) {
					iCounter = j;
					isCounterFound = true;
					break;
				}
			}
		} else {
			if (!lines[i].includes('EUtranCellFDD')) {
				continue;
			}

			if (isDate) {
				sDate = sLine[iDate].replace(/-/g, '').replace('20', '');
				sTime = sLine[iTime];
			} else {
				sDate = '';
				sTime = sLine[iTime];
			}

			sCounter = sLine[iCounter];
			if (isNaN(sCounter)) {
				sCounter = null;
			} else {
				sCounter = Number(sCounter);
			}

			let dateTime = sDate + '.' + sTime;
			sFDD = sLine[iFDD].replace('EUtranCellFDD=', '');

			// console.log(dateTime, sCounter, sFDD);

			if (!categories.includes(dateTime)) {
				categories.push(dateTime);
			}

			if (!FDDs.includes(sFDD)) {
				FDDs.push(sFDD);

				var x = {
					name: sFDD,
					data: [sCounter]
				};

				series.push(x);
			} else {
				let data = series[FDDs.indexOf(sFDD)].data;
				data.push(sCounter);

				series[FDDs.indexOf(sFDD)].data = data;
			}
		}
	}

	createApexTrafficPerformance0_10(
		series,
		categories,
		counterName,
		'#' + counterName
	);
}

/* pmHo */
function getpmHoDataSuccess0() {
	// pmHoExeAttLteInterF pmHoExeAttLteIntraF pmHoExeSuccLteInterF pmHoExeSuccLteIntraF

	const tArea = document.getElementById('areaKPI');
	const lines = tArea.value.split('\n');
	const counters = getCounterspmHo(lines[0].split(/\s+/));

	// console.log(counters);

	let output = `
		<h3 class="bg-dark text-white mb-3 p-3 mt-4">Success Ratio < 96.00, SuccLte = 0, AttLte > 0</h3>
		<table class="pmHo" >
        <thead>
						<tr>
								<th>Date-Time</th>
                <th>Object</th>
                <th>${counters[0]}</th>
                <th>${counters[2]}</th>
                <th>Ratio</th>
                <th>${counters[1]}</th>
                <th>${counters[3]}</th>
                <th>Ratio</th>
            </tr>
        </thead>
        <tbody>
    `;

	for (let i = 0; i < lines.length; i++) {
		const datas = lines[i];
		if (typeof datas != 'undefined' && datas.includes('EUtranCellFDD')) {
			xDatas = datas.split(/\s+/);

			let dateTime = xDatas[0];
			let mo = xDatas[1];
			let pmHoAttInter = xDatas[2];
			let pmHoAttIntra = xDatas[3];
			let pmHoSuccInter = xDatas[4];
			let pmHoSuccIntra = xDatas[5];

			if (xDatas[0].match(/^\d{4}\-\d{2}\-\d{2}/)) {
				// console.log('date-time mode on');
				dateTime = xDatas[0] + ' ' + xDatas[1];
				mo = xDatas[2];
				pmHoAttInter = xDatas[3];
				pmHoAttIntra = xDatas[4];
				pmHoSuccInter = xDatas[5];
				pmHoSuccIntra = xDatas[6];
			}

			let lteInterF = isNaN(
				(Number(pmHoSuccInter) / Number(pmHoAttInter)) * 100
			)
				? 100
				: ((Number(pmHoSuccInter) / Number(pmHoAttInter)) * 100).toFixed(2);
			let lteIntraF = isNaN(
				(Number(pmHoSuccIntra) / Number(pmHoAttIntra)) * 100
			)
				? 100
				: ((Number(pmHoSuccIntra) / Number(pmHoAttIntra)) * 100).toFixed(2);

			if (
				(lteInterF < 96.0 &&
					Number(pmHoSuccInter) === 0 &&
					Number(pmHoAttInter) > 0) ||
				(lteIntraF < 96.0 &&
					Number(pmHoSuccIntra) === 0 &&
					Number(pmHoAttIntra) > 0)
			) {
				// below95.push(mo, lteInterF, lteIntraF);
				output += `
								<tr>
									<td class="left-line">${dateTime}</td>
									<td class="left-line">${mo}</td>
									<td>${pmHoAttInter}</td>
									<td>${pmHoSuccInter}</td>
									<td>${lteInterF}</td>
									<td>${pmHoAttIntra}</td>
									<td>${pmHoSuccIntra}</td>
									<td>${lteIntraF}</td>
								</tr>
								`;
			}
		}
	}

	output += `
        </tbody>
    </table>
    `;
	return output;
}

function getpmHoData() {
	// pmHoExeAttLteInterF pmHoExeAttLteIntraF pmHoExeSuccLteInterF pmHoExeSuccLteIntraF

	const tArea = document.getElementById('areaKPI');
	const lines = tArea.value.split('\n');
	const counters = getCounterspmHo(lines[0].split(/\s+/));

	// console.log(counters);

	let output = `
		<h3 class="bg-dark text-white mb-3 p-3">Success Ratio < 96.00, SuccLte != 0, AttLte > 0</h3>
    <table class="pmHo" >
        <thead>
            <tr>
                <th>Date-Time</th>
                <th>Object</th>
                <th>${counters[0]}</th>
                <th>${counters[2]}</th>
                <th>Ratio</th>
                <th>${counters[1]}</th>
                <th>${counters[3]}</th>
                <th>Ratio</th>
            </tr>
        </thead>
        <tbody>
    `;

	for (let i = 0; i < lines.length; i++) {
		const datas = lines[i];
		if (typeof datas != 'undefined' && datas.includes('EUtranCellFDD')) {
			xDatas = datas.split(/\s+/);

			let dateTime = xDatas[0];
			let mo = xDatas[1];
			let pmHoAttInter = xDatas[2];
			let pmHoAttIntra = xDatas[3];
			let pmHoSuccInter = xDatas[4];
			let pmHoSuccIntra = xDatas[5];

			if (xDatas[0].match(/^\d{4}\-\d{2}\-\d{2}/)) {
				// console.log('date-time mode on');
				dateTime = xDatas[0] + ' ' + xDatas[1];
				mo = xDatas[2];
				pmHoAttInter = xDatas[3];
				pmHoAttIntra = xDatas[4];
				pmHoSuccInter = xDatas[5];
				pmHoSuccIntra = xDatas[6];
			}

			let lteInterF = isNaN(
				(Number(pmHoSuccInter) / Number(pmHoAttInter)) * 100
			)
				? 100
				: ((Number(pmHoSuccInter) / Number(pmHoAttInter)) * 100).toFixed(2);
			let lteIntraF = isNaN(
				(Number(pmHoSuccIntra) / Number(pmHoAttIntra)) * 100
			)
				? 100
				: ((Number(pmHoSuccIntra) / Number(pmHoAttIntra)) * 100).toFixed(2);

			if (
				lteInterF < 96.0 &&
				Number(pmHoSuccInter) !== 0 &&
				Number(pmHoAttInter) > 0 &&
				(lteIntraF < 96.0 &&
					Number(pmHoSuccIntra) !== 0 &&
					Number(pmHoAttIntra) > 0)
			) {
				// below95.push(mo, lteInterF, lteIntraF);
				output += `
                <tr>
                    <td class="left-line">${dateTime}</td>
                    <td class="left-line">${mo}</td>
                    <td>${pmHoAttInter}</td>
                    <td>${pmHoSuccInter}</td>
                    <td class="bg-warning">${lteInterF}</td>
                    <td>${pmHoAttIntra}</td>
                    <td>${pmHoSuccIntra}</td>
                    <td class="bg-warning">${lteIntraF}</td>
                </tr>
                `;
			} else if (
				lteInterF < 96.0 &&
				Number(pmHoSuccInter) !== 0 &&
				Number(pmHoAttInter) > 0
			) {
				// below95.push(mo, lteInterF, lteIntraF);
				output += `
                <tr>
                    <td class="left-line">${dateTime}</td>
                    <td class="left-line">${mo}</td>
                    <td class="bg-warning text-white">${pmHoAttInter}</td>
                    <td class="bg-warning text-white">${pmHoSuccInter}</td>
                    <td class="bg-warning text-white">${lteInterF}</td>
                    <td>${pmHoAttIntra}</td>
                    <td>${pmHoSuccIntra}</td>
                    <td>${lteIntraF}</td>
                </tr>
                `;
			} else if (
				lteIntraF < 96.0 &&
				Number(pmHoSuccIntra) !== 0 &&
				Number(pmHoAttIntra) > 0
			) {
				// below95.push(mo, lteInterF, lteIntraF);
				output += `
                <tr>
                    <td class="left-line">${dateTime}</td>
                    <td class="left-line">${mo}</td>
                    <td>${pmHoAttInter}</td>
                    <td>${pmHoSuccInter}</td>
                    <td>${lteInterF}</td>
                    <td class="bg-warning text-white">${pmHoAttIntra}</td>
                    <td class="bg-warning text-white">${pmHoSuccIntra}</td>
                    <td class="bg-warning text-white">${lteIntraF}</td>
                </tr>
                `;
			}
		}
	}

	output += `
        </tbody>
    </table>
    `;
	return output;
}

/* FGA */
function getONArray(setFGAs, mapFGA_ON) {
	let arrON = [];

	for (let fga of setFGAs) {
		if (mapFGA_ON[fga] !== undefined) {
			arrON.push(mapFGA_ON[fga]);
		} else {
			arrON.push(0);
		}
	}

	return arrON;
}

function getONArray(setFGAs, mapFGA_OFF) {
	let arrOFF = [];

	for (let fga of setFGAs) {
		if (mapFGA_OFF[fga] !== undefined) {
			arrOFF.push(mapFGA_OFF[fga]);
		} else {
			arrOFF.push(0);
		}
	}

	return arrOFF;
}

function getFGACalculate() {
	const tArea = document.getElementById('areaKPI');
	let mapFGA_ON = new Map();
	let mapFGA_OFF = new Map();
	let setFGAs = new Set();

	let lines = tArea.value.split('\n');
	for (let i = 0; i < lines.length; i++) {
		if (lines[i].includes('FGA')) {
			const splitLines = lines[i].split(/\s+/);
			const trueFalse = splitLines[0];
			const fgaName = splitLines[1];
			const onOFF = splitLines[2].includes('ON') ? 'ON' : 'OFF';
			setFGAs.add(fgaName);

			if (
				(onOFF === 'ON' && trueFalse === 'TRUE') ||
				(onOFF === 'OFF' && trueFalse === 'FALSE')
			) {
				if (mapFGA_ON[fgaName] !== undefined) {
					let counter = mapFGA_ON[fgaName];
					counter++;
					mapFGA_ON[fgaName] = counter;
				} else {
					let counter = 1;
					mapFGA_ON[fgaName] = counter;
				}
			} else {
				if (mapFGA_OFF[fgaName] !== undefined) {
					let counter = mapFGA_OFF[fgaName];
					counter++;
					mapFGA_OFF[fgaName] = counter;
				} else {
					let counter = 1;
					mapFGA_OFF[fgaName] = counter;
				}
			}
		}
	}

	return [mapFGA_ON, mapFGA_OFF, setFGAs];
}

// ------------------------
// Traffic Performance
// ------------------------
function getCountersTrafficPerformance() {
	var tArea = document.getElementById('areaKPI');
	var lines = tArea.value.split('\n');
	var counters = [];
	for (let i = 0; i < lines.length; i++) {
		if (lines[i] && !lines[i].includes('Counter')) {
			const xlines = lines[i].split(/\s+/);
			for (let j = 0; j < 3; j++) {
				const counter = xlines[j];
				if (counter.includes('_')) {
					if (!counters.includes(counter)) {
						counters.push(counter);
					}
				}
			}
		}
	}

	return counters;
}

function loadTrafficPerformance() {
	var counters = getCountersTrafficPerformance();
	counters.forEach(counter => {
		var g = document.createElement('div');
		g.setAttribute('id', counter);
		g.setAttribute('class', 'counter');

		var container = document.getElementById('chart-container');
		container.appendChild(g);

		createChartTrafficPerformance(counter);
	});
}

// ------------------------
// Drop Count
// ------------------------
function getCountersDropCount() {
	var tArea = document.getElementById('areaKPI');
	var lines = tArea.value.split('\n');
	var counters = [];
	if (typeof lines[0] != 'undefined' && lines[0].includes('Object')) {
		const xlines = lines[0].split(/\s+/);
		for (let j = 0; j < xlines.length; j++) {
			const counter = xlines[j];
			if (counter.slice(0, 2) === 'pm') {
				if (!counters.includes(counter)) {
					counters.push(counter);
				}
			}
		}
	}

	return counters;
}

function loadDropCount() {
	var counters = getCountersDropCount();
	counters.forEach(counter => {
		var g = document.createElement('div');
		g.setAttribute('id', counter);
		g.setAttribute('class', 'counter');

		var container = document.getElementById('chart-container');
		container.appendChild(g);

		createChartDropCount(counter);
	});
}

// -----------------------------------
// pmHo
// -----------------------------------
function getCounterspmHo(datas = []) {
	console.log(datas);
	let counters = datas.filter(function(data) {
		return data.slice(0, 2) === 'pm';
	});

	return counters;
}

function loadPmHo() {
	let output1 = getpmHoData();
	let output2 = getpmHoDataSuccess0();
	let output = `
        <div>
            ${output1}
        </div>
        <br>
        <div>
            ${output2}
        </div>
    `;

	let g = document.createElement('div');
	g.setAttribute('id', 'divpmHo');
	g.setAttribute('class', 'counter');

	let container = document.getElementById('chart-container');
	container.appendChild(g);

	let divPmHo = document.getElementById('divpmHo');
	divPmHo.innerHTML = output;
}

// -----------------------------------
// FGAs
// -----------------------------------
function loadFGAChart() {
	const [mapFGA_ON, mapFGA_OFF, setFGAs] = getFGACalculate();
	const title = 'FGA Indicators';
	const categories = Array.from(setFGAs);
	const selector = '#divFGAs';
	const series = [
		{
			name: 'ON',
			data: getONArray(setFGAs, mapFGA_ON)
		},
		{
			name: 'OFF',
			data: getONArray(setFGAs, mapFGA_OFF)
		}
	];

	let g = document.createElement('div');
	g.setAttribute('id', 'divFGAs');
	g.setAttribute('class', 'counter');

	let container = document.getElementById('chart-container');
	container.appendChild(g);

	createApexFGA(series, categories, title, selector);
}
