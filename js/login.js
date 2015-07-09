$(document).ready(function() {
	function verify(username, password) {
		if (username == "admin" && password == "admin")
			return true;
		return false;
	}
	function squareWindow() {
		$("#main").show();
		$("#square").show();
	}
	$("#button").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		if (verify(username, password) == true) {
			$("#login").hide();
		//	squareWindow();
		} else {
			$(".error").text("Incorect username or password.");
		}
	});
	$("#username, #password").keypress(function (e) {
		var username = $("#username").val();
		var password = $("#password").val();
		var key = e.which;

		if (key == 13) {
			if (verify(username, password) == true) {
				$("#login").hide();
			//	squareWindow();
			} else {
				$(".error").text("Incorect username or password.");
			}
		}
	});
});
