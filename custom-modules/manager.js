var Staff = require('./staff.js');

function Manager(name, database) {
	if (name && database) {
		this.name = name;
		this.db = database;
	}
	else {
		throw new Exception("Please provide a name and DB interface");
	}
};

Manager.prototype.getStaff = function(callback) {
	if (typeof callback === 'function') {
		this.db.staff.find({
			managerName: this.name
		}, function(e, data) {
			callback(data);
		});
	}
};

Manager.prototype.getTeamData = function(callback) {
	if (typeof callback === 'function') {
		var teamData = {
			"call": {
				"today": 0,
				"lastWeekDay": 0,
				"wow": 0,
				"lastWeekWow": 0
			},
			"sale": {
				"today": 0,
				"lastWeekDay": 0,
				"wow": 0,
				"lastWeekWow": 0
			},
			"warrenty": {
				"today": 0,
				"lastWeekDay": 0,
				"wow": 0,
				"lastWeekWow": 0
			}
		};

		this.getStaff(function(staff) {
			for (var i = 0; i < staff.length; i++) {
				var staffObj = new Staff(staff[i].name, this.db);

				staffObj.getAllData(function(staffData) {
					var keys = Object.keys(staffData);

					keys.forEach(function(key) {
						var totals = Object.keys(staffData[key]);

						totals.forEach(function(total) {
							teamData[key][total] += staffData[key][total];
						});
					});

					callback(teamData);
				});
			}
		}.bind(this));
	}
};

module.exports = Manager;
