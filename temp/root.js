"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _login = require("./login");

var _login2 = _interopRequireDefault(_login);

var _sockets = require("./sockets");

var _sockets2 = _interopRequireDefault(_sockets);

var _updateDashboard = require("./update-dashboard");

var _updateDashboard2 = _interopRequireDefault(_updateDashboard);

var AOWarranties = (function () {
  function AOWarranties() {
    _classCallCheck(this, AOWarranties);

    this.socket = new _sockets2["default"]();
    this.login = new _login2["default"](this.socket);
    this.dashUpdate = new _updateDashboard2["default"]();
    this.authenticateLogin();
  }

  _createClass(AOWarranties, [{
    key: "authenticateLogin",
    value: function authenticateLogin() {
      if (window.location.pathname === "/app.html") {
        var user = window.localStorage.getItem("username");
        if (!user) {
          window.location = "/";
        } else {
          this.socket.send("login-complete", user);

          this.dashUpdate.setName(user);

          this.socket.receive("staffData", this.displayStaffData.bind(this));
          this.socket.receive("teamData", this.displayTeamData.bind(this));
        }
      }
    }
  }, {
    key: "displayStaffData",
    value: function displayStaffData(data) {
      this.dashUpdate.updateStaff(data);
    }
  }, {
    key: "displayTeamData",
    value: function displayTeamData(data) {
      this.dashUpdate.updateTeam(data);
    }
  }]);

  return AOWarranties;
})();

window.AOWarranties = new AOWarranties();