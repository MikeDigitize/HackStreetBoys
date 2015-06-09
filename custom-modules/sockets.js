var Staff = require('./staff.js');

function socketStart(io, database) {

	io.on("connection", function(socket) {
	    io.to(socket.id).emit("userid", socket.id);

	    // send Nialls stats as an example
	    var Niall = new Staff('Niall Hanlon', database);
	    Niall.getCalls(new Date(), function(calls) {
	    	io.to(socket.id).emit("numCalls", calls.length);
	    });

	    socket.on("disconnect", function(){
	        console.log("user disconnected", socket.id);
	    });

	});

}

module.exports = socketStart;
