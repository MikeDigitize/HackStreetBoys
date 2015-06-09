import Login from "./login";
import Socket from "./sockets";

class AOWarranties {

  constructor() {
    this.socket = new Socket();
  }

  login(name) {
    return new Login(name);
  }

}

window.AOWarranties = new AOWarranties();