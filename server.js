var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var ObjectId = require('mongodb').ObjectID;
var databaseUrl = "mongodb://localhost:27017/callcentre";
var collections = ["staff", "managers"];
var db = require("mongojs").connect( databaseUrl, collections );


server.listen(1337);
app.use(express.static(__dirname + "/public" ));

io.on("connection", function(socket) {

    console.log("a user connected", socket.id);
    io.to(socket.id).emit("userid", socket.id);

    socket.on("disconnect", function(){
        console.log("user disconnected", socket.id);
    });

});

(function dbSetUp() {

	db.managers.find(function(err, docs) {    
    	if(!docs.length) {
			insertManagers(); 
		}    
    });    

})();

function insertUsers() {
	var users = [{
		name : "Niall Hanlon",
		managerId : null,
		managerName : "Colin Steele"
	}, {
		name : "Lee Cooper",
		managerId : null,
		managerName : "Ste Ashworth"
	}, {
		name : "Kobi Thompson",
		managerId : null,
		managerName : "Michael Chadwick"
	}, {
		name : "Dave Lawson",
		managerId : null,
		managerName : "Ben Ely"
	}, {
		name : "Andrew Kircaldy",
		managerId : null,
		managerName : "Christian Tute"
	}, {
		name : "Yossi",
		managerId : null,
		managerName : "Colin Steele"
	}, {
		name : "John Roberts",
		managerId : null,
		managerName : "Ste Ashworth"
	}, {
		name : "Steve Caunce",
		managerId : null,
		managerName : "Michael Chadwick"
	}, {
		name : "David Wilkinson",
		managerId : null,
		managerName : "Ben Ely"
	}, {
		name : "David Atherton",
		managerId : null,
		managerName : "Christian Tute"
	}];
	db.staff.insert(users, function(e, record) {
		console.log(record);
	});
}

function insertManagers() {
	db.managers.insert([{
		name : "Colin Steele",
		location : "UK BLT"
	}, {
		name : "Ste Ashworth",
		location : "UK BLT"
	}, {
		name : "Michael Chadwick",
		location : "UK BLT"
	}, {
		name : "Ben Ely",
		location : "UK BLT"
	}, {
		name : "Christian Tute",
		location : "UK BLT"
	}], function(err, record) {    
	    	db.staff.find(function(err, docs) {    
	    	if(!docs.length) {
				insertUsers(); 
			}    
	    });
    });
}