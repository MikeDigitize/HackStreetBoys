"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Login = (function () {
	function Login(socket) {
		var _this = this;

		_classCallCheck(this, Login);

		var login = document.querySelector("#login");
		if (login) {
			login.addEventListener("submit", function (e) {
				e.preventDefault();
				console.log("hi");
				var name = document.querySelector("#username");
				_this.verify(name.value, socket);
			}, false);
		}
	}

	_createClass(Login, [{
		key: "verify",
		value: function verify(name, socket) {
			socket.send("verify-login", name);
			socket.receive("verification", this.receiveVerification.bind(this));
		}
	}, {
		key: "receiveVerification",
		value: function receiveVerification(data) {
			if (data.verified) {
				window.localStorage.setItem("username", data.user);
				window.location = "app.html";
			}
		}
	}]);

	return Login;
})();

exports["default"] = Login;
module.exports = exports["default"];