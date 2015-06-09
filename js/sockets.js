class Sockets {
	
	constructor() {		
		let socket = io();
        socket.on("userid", this.setSocketId.bind(this));

        this.events = [];
	}

	setSocketId(id) {
		this.socketid = id;
	}

	getSocketId() {
		return this.socketid;
	}

	logCalls(data) {
		console.log(data);
	}

	send(name, data) {
		let socket = io();
		socket.emit(name, data);
	}

	receive(name, callback) {
		let socket = io();
		if(this.events.indexOf(name) === -1) {
			this.events.push(name);
			socket.on(name, callback);
		}
	}
}

export default Sockets;