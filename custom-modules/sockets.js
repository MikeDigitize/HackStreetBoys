var Staff = require('./staff.js');

function socketStart(io, database, verify) {

	io.on("connection", function(socket) {

		var id = socket.id;
	    io.to(socket.id).emit("userid", socket.id);

	    // send Nialls stats as an example
	    var Niall = new Staff('Niall Hanlon', database);
	    Niall.getCalls(new Date(), function(calls) {
	    	io.to(socket.id).emit("numCalls", calls.length);
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
