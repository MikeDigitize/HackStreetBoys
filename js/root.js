import Login from "./login";
import Socket from "./sockets";

class AOWarranties {

  constructor() {
    this.socket = new Socket();
    this.login = new Login(this.socket);
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
        this.socket.receive("staffData", this.inputStaffCallData.bind(this));
      }
    }
  }

  inputStaffCallData(data) {
    console.log(data);
  }

}

window.AOWarranties = new AOWarranties();