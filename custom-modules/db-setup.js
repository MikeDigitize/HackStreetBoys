function dbSetUp(database) {
	database.managers.find(function(err, docs) {    
    	if(!docs.length) {
			insertManagers(database); 
		}    
    });
}

function insertManagers(database) {
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

	database.managers.insert(managers, function(err, record) {    
	    database.staff.find(function(err, docs) {    
	    	if(!docs.length) {
				insertUsers(database); 
			}    
	    });
    });
}

function insertUsers(database) {
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

	database.staff.insert(users, function(e, record) {
		database.calls.find(function(err, docs) {    
	    	if(!docs.length) {
				insertCalls(database);
			}    
	    });
	});
}

function insertCalls(database) {
	var calls = [{
		caller: "Niall Hanlon",
		warrentyQty: 0,
		productQty: 0,
		datestamp: new Date("2015-06-09T10:15:00.000Z")
	}, {
		callerId: null,
		caller: "Niall Hanlon",
		warrentyQty: 1,
		productQty: 1,
		datestamp: new Date("2015-06-09T10:50:00.000Z")
	}, {
		callerId: null,
		caller: "Kobi Thompson",
		warrentyQty: 1,
		productQty: 1,
		datestamp: new Date("2015-06-09T10:39:00.000Z")
	}, {
		callerId: null,
		caller: "Kobi Thompson",
		warrentyQty: 1,
		productQty: 1,
		datestamp: new Date("2015-06-09T10:20:00.000Z")
	}, {
		callerId: null,
		caller: "Kobi Thompson",
		warrentyQty: 1,
		productQty: 1,
		datestamp: new Date("2015-06-09T10:35:00.000Z")
	}, {
		callerId: null,
		caller: "Kobi Thompson",
		warrentyQty: 1,
		productQty: 1,
		datestamp: new Date("2015-06-09T10:43:00.000Z")
	}];

	database.calls.insert(calls, function(e, record) {
		console.log("database successfully initialised");
	});
}

module.exports = dbSetUp;