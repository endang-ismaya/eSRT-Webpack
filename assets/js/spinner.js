/* jshint esversion: 6 */

// ----------------------
// Spinner
// ----------------------
function spinner_executing() {
	// $("body").removeClass("others");
	$("body").addClass("bodyProcess");
	$("body").addClass("disabled-button");
	$("#main-show").show();
}

function spinner_post() {
	$("body").removeClass("bodyProcess");
	$("body").removeClass("disabled-button");
	$("#main-show").hide();
}
