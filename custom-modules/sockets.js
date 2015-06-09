var Staff = require('./staff.js'),
	Manager = require('./manager.js');

function socketStart(io, database, verify) {

	io.on("connection", function(socket) {

		var id = socket.id;
	    io.to(socket.id).emit("userid", socket.id);

	    socket.on("login-complete", function(data) {
	    	var staffMember = new Staff(data.username, database);

			staffMember.getManagerName(function(name) {
				var memberManager = new Manager(name, database);
			});

			var staffData = {};

			staffMember.getCallData(function(data) {
				staffData['call'] = data;

				staffMember.getSaleData(function(data) {
					staffData['sale'] = data;

					staffMember.getWarrentyData(function(data) {
						staffData['warrenty'] = data;

						io.to(socket.id).emit("staffData", staffData);
					});
				});
			});
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
