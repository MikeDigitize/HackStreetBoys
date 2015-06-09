function socketStart(io, database) {

	io.on("connection", function(socket) {
	    io.to(socket.id).emit("userid", socket.id);

	    socket.on("disconnect", function(){
	        console.log("user disconnected", socket.id);
	    });


	});

}

module.exports = socketStart;