import Login from "./login";
import Socket from "./sockets";

class AOWarranties {

  constructor() {
    this.socket = new Socket();
    this.login = new Login(this.socket);
  }

}

window.AOWarranties = new AOWarranties();