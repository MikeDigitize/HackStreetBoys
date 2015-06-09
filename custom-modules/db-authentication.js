function authenticate(name, id, io, database) {
	return function() {
		database.staff.find({ name : name }, function(err, docs) {    
	    	if(!docs.length) {
				io.to(id).emit("verification", { verified: false });
			}    
			else {
				io.to(id).emit("verification", { verified: true, user : name });
			}
	    });
	}
}

module.exports = authenticate;