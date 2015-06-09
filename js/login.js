class Login {

	constructor() {

	}

	verify(name, socket) {
		console.log(name, socket);
		socket.send("verify-login", name);
		socket.receive("verification", this.receiveVerification.bind(this));
	}

	receiveVerification(isVerified) {
		console.log("is verified?", isVerified);
	}

}

export default Login;