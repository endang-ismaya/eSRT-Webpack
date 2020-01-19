$(() => {
	$(".alert").hide();
	$("#main-show").hide();

	// ----------------------
	// File Locator
	// ----------------------
	$("#file-locator").click(function() {
		fileLocator_executing();
		$.ajax({
			type: "POST",
			url: "http://localhost/srtwp/filelocator",
			data: {
				program: "FileLocator"
			},
			success: fileLocator_executing(),
			complete: function() {
				fileLocator_post();
				location.reload();
			},
			error: function(err) {
				console.log(err);
			}
		});
	});
});

// clear output-result
function clearOutputResult() {
	$("#output-result").removeClass("console");
	$("#output-result").html("");
}

// File/Folder is not exists
function noFolderSelection() {
	$(".alert").show();
	setTimeout(function() {
		$(".alert").hide();
	}, 2000);
}

// ----------------------
// File Locator
// ----------------------
function fileLocator_executing() {
	$(".container-fluid").hide();
	$("body").removeClass("others");
	$("body").addClass("bodyProcess");
	$("body").addClass("disabled-button");
}

function fileLocator_post() {
	$(".container-fluid").show();
	$("body").removeClass("bodyProcess");
	$("body").removeClass("disabled-button");
}
