var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var ObjectId = require('mongodb').ObjectID;
var databaseUrl = "mongodb://localhost:27017/callcentre";
var collections = ["staff", "managers", "calls"];
var db = require("mongojs").connect( databaseUrl, collections );

server.listen(1337);
app.use(express.static(__dirname + "/public" ));

io.on("connection", function(socket) {
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

function insertCalls() {
	var calls = [{
		callerId: null,
		caller: "Niall Hanlon",
		warrentyQty: 0,
		productQty: 0,
		datestamp: "Tue Jun 09 2015 11:44:41"
	}, {
		callerId: null,
		caller: "Niall Hanlon",
		warrentyQty: 1,
		productQty: 1,
		datestamp: "Tue Jun 09 2015 11:50:40"
	}, {
		callerId: null,
		caller: "Kobi Thompson",
		warrentyQty: 1,
		productQty: 1,
		datestamp: "Tue Jun 09 2015 10:10:15"
	}, {
		callerId: null,
		caller: "Kobi Thompson",
		warrentyQty: 1,
		productQty: 1,
		datestamp: "Tue Jun 09 2015 10:20:10"
	}, {
		callerId: null,
		caller: "Kobi Thompson",
		warrentyQty: 1,
		productQty: 1,
		datestamp: "Tue Jun 09 2015 10:350:45"
	}, {
		callerId: null,
		caller: "Kobi Thompson",
		warrentyQty: 1,
		productQty: 1,
		datestamp: "Tue Jun 09 2015 10:43:23"
	}];

	db.calls.insert(calls, function(e, record) {
		console.log('Data successfully entered');
	});
}

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
		db.calls.find(function(err, docs) {    
	    	if(!docs.length) {
				insertCalls();
			}    
	    });
	});
}

function insertManagers() {
	var managers = [{
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
	}];

	db.managers.insert(managers, function(err, record) {    
	    db.staff.find(function(err, docs) {    
	    	if(!docs.length) {
				insertUsers(); 
			}    
	    });
    });
}