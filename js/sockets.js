class Sockets {
	
	constructor() {		
		this.socket = io();        
        this.socket.on("userid", this.setSocketId.bind(this));
	}

	setSocketId(id) {
		this.socketid = id;
	}

	getSocketId() {
		return this.socketid;
	}
}

export default Sockets;