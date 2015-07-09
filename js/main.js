$(document).ready(function() {
	'use strict';
	var store = new Store(),
		verifyLogin = function(username, password) {
			if (verify(username, password) == true) {
				$("#login").hide();
				$("#main").show();

				store.displayCategories();

			} else {
				$(".error").text("Incorect username or password.");
			}
		};

	function verify(username, password) {
		return username == "admin" && password == "admin";
	}

	$("#button").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		verifyLogin(username, password);
	});
	$("#username, #password").keypress(function (e) {
		var username = $("#username").val();
		var password = $("#password").val();
		var key = e.which;

		if (key == 13) {
			verifyLogin(username, password);
		}
	});
});
