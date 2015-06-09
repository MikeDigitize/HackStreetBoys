"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sockets = (function () {
	function Sockets() {
		_classCallCheck(this, Sockets);

		var socket = io();
		socket.on("userid", this.setSocketId.bind(this));

		this.events = [];
	}

	_createClass(Sockets, [{
		key: "setSocketId",
		value: function setSocketId(id) {
			this.socketid = id;
		}
	}, {
		key: "getSocketId",
		value: function getSocketId() {
			return this.socketid;
		}
	}, {
		key: "logCalls",
		value: function logCalls(data) {
			console.log(data);
		}
	}, {
		key: "send",
		value: function send(name, data) {
			var socket = io();
			socket.emit(name, data);
		}
	}, {
		key: "receive",
		value: function receive(name, callback) {
			var socket = io();
			if (this.events.indexOf(name) === -1) {
				this.events.push(name);
				socket.on(name, callback);
			}
		}
	}]);

	return Sockets;
})();

exports["default"] = Sockets;
module.exports = exports["default"];