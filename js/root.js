import Login from "./login";
import Socket from "./sockets";
import UpdateDashboard from "./update-dashboard";

class AOWarranties {

  constructor() {
    this.socket = new Socket();
    this.login = new Login(this.socket);
    this.dashUpdate = new UpdateDashboard();
    this.authenticateLogin();
  }

  authenticateLogin() {
    if(window.location.pathname === "/app.html") {
      var user = window.localStorage.getItem("username")
      if(!user) {
        window.location = "/";
      }
      else {
        this.socket.send("login-complete", user);

        this.socket.receive("staffData", this.displayStaffData.bind(this));
        this.socket.receive("teamData", this.displayTeamData.bind(this));
      }
    }
  }

  displayStaffData(data) {
    this.dashUpdate.updateStaff(data);
  }

  displayTeamData(data) {
    this.dashUpdate.updateTeam(data);
  }

}

window.AOWarranties = new AOWarranties();