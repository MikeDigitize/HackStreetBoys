var Staff = require('./staff.js'),
	Manager = require('./manager.js');

function socketStart(io, database, verify) {

	io.on("connection", function(socket) {

		var id = socket.id;
	    io.to(socket.id).emit("userid", socket.id);

	    var Niall = new Staff("Kobi Thompson", database);

	    // NIALL'S MANAGER
		Niall.getManagerName(function(name) {
			var NiallsManager = new Manager(name, database);
		});
	    
	    // CALLS FOR NIALL
	    Niall.getTodaysCalls(function(calls) {
	    	io.to(socket.id).emit("numCalls", "todays calls: " + calls.length);
	    });
	    Niall.getLastWeeksDayCalls(function(calls) {
	    	io.to(socket.id).emit("numCalls", "last week day calls: " + calls.length);
	    });
	    Niall.getWoWCalls(function(calls) {
	    	io.to(socket.id).emit("numCalls", "wow calls: " + calls.length);
	    });
	    Niall.getLastWeeksWoWCalls(function(calls) {
	    	io.to(socket.id).emit("numCalls", "last week wow  calls: " + calls.length);
	    });

	    // SALES FOR NIALL
	    Niall.getTodaysSaleCalls(function(calls) {
	    	io.to(socket.id).emit("numSales", "todays sale calls: " + calls.length);
	    });
	    Niall.getLastWeeksDaySaleCalls(function(calls) {
	    	io.to(socket.id).emit("numSales", "last week day sale calls: " + calls.length);
	    });
	    Niall.getWoWSaleCalls(function(calls) {
	    	io.to(socket.id).emit("numSales", "wow sale calls: " + calls.length);
	    });
	    Niall.getLastWeeksWoWSaleCalls(function(calls) {
	    	io.to(socket.id).emit("numSales", "last week wow  sale calls: " + calls.length);
	    });

	    // WARRENTY SALES FOR NIALL
	    Niall.getTodaysWarrentyCalls(function(calls) {
	    	io.to(socket.id).emit("numWarrenty", "todays warrenty calls: " + calls.length);
	    });
	    Niall.getLastWeeksDayWarrentyCalls(function(calls) {
	    	io.to(socket.id).emit("numWarrenty", "last week day warrenty calls: " + calls.length);
	    });
	    Niall.getWoWWarrentyCalls(function(calls) {
	    	io.to(socket.id).emit("numWarrenty", "wow warrenty calls: " + calls.length);
	    });
	    Niall.getLastWeeksWoWWarrentyCalls(function(calls) {
	    	io.to(socket.id).emit("numWarrenty", "last week wow warrenty calls: " + calls.length);
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
