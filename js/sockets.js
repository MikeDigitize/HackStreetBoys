class Sockets {
	
	constructor() {		
		let socket = io();        
        socket.on("userid", this.setSocketId.bind(this));
        socket.on("numCalls", this.logCalls.bind(this));
	}

	setSocketId(id) {
		this.socketid = id;
	}

	getSocketId() {
		return this.socketid;
	}

	logCalls(num) {
		console.log("numCalls", num);
	}
}

export default Sockets;