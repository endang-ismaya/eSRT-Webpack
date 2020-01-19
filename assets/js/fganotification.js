/*jshint esversion: 6 */

// -----------
// FGAs button
// -----------
$('.fgabtn').on('click', (ex) => {
	// console.log(ex.target.innerHTML);
	let fgaNum = ex.target.innerHTML;
	$.getJSON("http://localhost/srtwp/json/fgalist.json", function (data) {

		//Assign the json to your JSON variable
		let fgaData = data.fgas[fgaNum];
		// console.log(fgaData);
		fgaSuccess(fgaData);
	});

});

$('.fganotifbtn').on('click', (ex) => {
	console.log(ex.target.innerHTML);
	let fgaNum = ex.target.innerHTML;
	$.getJSON("http://localhost/srtwp/json/fgalist.json", function (data) {

		//Assign the json to your JSON variable
		let fgaData = data.notifications[fgaNum];
		console.log(fgaData);
		fgaSuccess(fgaData);
	});

});

function fgaSuccess(fgaData) {
  $('div#fgaDisplay').html(`
      <embed src="${fgaData}" class="embed-responsive-item" width="960" height="960">
  `);
}