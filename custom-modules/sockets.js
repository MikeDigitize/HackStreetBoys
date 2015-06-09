var Staff = require('./staff.js'),
	Manager = require('./manager.js');

function socketStart(io, database, verify) {

	io.on("connection", function(socket) {

		var id = socket.id;
	    io.to(socket.id).emit("userid", socket.id);

	    var Niall = new Staff("Niall Hanlon", database);

	    // NIALL'S MANAGER
		Niall.getManagerName(function(name) {
			var NiallsManager = new Manager(name, database);
		});
	    
	    // CALLS FOR NIALL
	    Niall.getCallData(function(data) {
	    	io.to(socket.id).emit("numCalls", data);
	    });

	    // SALES FOR NIALL
	    Niall.getSaleData(function(data) {
	    	io.to(socket.id).emit("numSales", data);
	    });

	    // WARRENTY SALES FOR NIALL
	    Niall.getWarrentyData(function(data) {
	    	io.to(socket.id).emit("numWarrenty", data);
	    });

	    socket.on("verify-login", function(data){
	    	console.log("verify data!", data);
	    	new verify(data, socket.id, io, database)();
	    });

	    socket.on("disconnect", function(){
	        console.log("user disconnected", socket.id);
	    });

	});

}

module.exports = socketStart;
