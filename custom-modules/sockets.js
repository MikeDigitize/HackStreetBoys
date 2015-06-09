var Staff = require('./staff.js'),
	Manager = require('./manager.js');

function socketStart(io, database, verify) {

	io.on("connection", function(socket) {

		var id = socket.id;
	    io.to(socket.id).emit("userid", socket.id);

	    socket.on("login-complete", function(username) {
	    	var staffMember = new Staff(username, database);

			staffMember.getManagerName(function(name) {
				var memberManager = new Manager(name, database);

				memberManager.getTeamData(function(teamData) {
					io.to(socket.id).emit("teamData", teamData);
				});
			});

			staffMember.getAllData(function(staffData) {
				io.to(socket.id).emit("staffData", staffData);
			})
	    });

	    socket.on("verify-login", function(data) {
	    	new verify(data, socket.id, io, database)();
	    });

	    socket.on("disconnect", function() {
	        // do nothing
	    });

	});

}

module.exports = socketStart;
