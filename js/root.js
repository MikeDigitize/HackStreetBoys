import Login from "./login";
import Socket from "./sockets";

class AOWarranties {

  constructor() {
    this.socket = new Socket();
  }

  login(name) {
    let login = new Login();
    login.verify(name, this.socket);
  }

}

window.AOWarranties = new AOWarranties();