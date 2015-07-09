$(document).ready(function () {
	var ok = true;

	$("#square").click(function() {
		if (ok == true) {
			$("#square").animate({
				top: $(window).height() - 200 
			}, 1000);
			setTimeout(function() {
				$("#square").animate({
					left: $(window).width() - 200 
				}, 1000);
			}, 1500);
			console.log("True");
			ok = false;
		} else {
			$("#square").animate({
				left: 0
			}, 1000);
			setTimeout(function() {
				$("#square").animate({
					top: 0 
				}, 1000);
			}, 1500);
			ok = true;
		}
	});
});
