class Login {

	constructor(socket) {
		var login = document.querySelector("#login");
		if(login) {
			login.addEventListener("submit", e => {
				e.preventDefault();
				console.log("hi")
				var name = document.querySelector("#username");
				this.verify(name.value, socket);
			}, false);
		}
	}

	verify(name, socket) {
		socket.send("verify-login", name);
		socket.receive("verification", this.receiveVerification.bind(this));
	}

	receiveVerification(data) {
		if(data.verified) {
			window.localStorage.setItem("username", data.user);
			window.location = "app.html";
		}
	}

}

export default Login;