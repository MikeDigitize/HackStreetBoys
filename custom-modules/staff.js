function Staff(name, database) {
	if (name && database) {
		this.name = name;
		this.db = database;
	}
	else {
		throw new Exception("Please provide a name and DB interface");
	}
};

Staff.prototype.getCalls = function(date, callback) {
	if (this.name && typeof callback === 'function') {
		var dateSearch;

		if (date instanceof Array) {
			dateSearch = {
				$gte: date[0],
				$lt: date[1]
			};
		}
		else {
			dateSearch = {
				$gte: new Date(date.setHours(0, 0, 0, 0)),
				$lt: new Date(date.setHours(23, 59, 59, 59))
			};
		}

		this.db.calls.find({
			caller: this.name,
			datestamp: dateSearch
		}, function(e, data) {
			callback(data);
		});
	}
	else {
		return 0;
	}
};

Staff.prototype.getSaleCalls = function(date, callback) {
	if (this.name && typeof callback === 'function') {
		var dateSearch;

		if (date instanceof Array) {
			dateSearch = {
				$gte: date[0],
				$lt: date[1]
			};
		}
		else {
			dateSearch = {
				$gte: new Date(date.setHours(0, 0, 0, 0)),
				$lt: new Date(date.setHours(23, 59, 59, 59))
			};
		}

		this.db.calls.find({
			caller: this.name,
			productQty: { $gt: 0 },
			datestamp: dateSearch
		}, function(e, data) {
			callback(data);
		});
	}
	else {
		return 0;
	}
};

Staff.prototype.getWarrentyCalls = function(date, callback) {
	if (this.name && typeof callback === 'function') {
		var dateSearch;

		if (date instanceof Array) {
			dateSearch = {
				$gte: date[0],
				$lt: date[1]
			};
		}
		else {
			dateSearch = {
				$gte: new Date(date.setHours(0, 0, 0, 0)),
				$lt: new Date(date.setHours(23, 59, 59, 59))
			};
		}

		this.db.calls.find({
			caller: this.name,
			warrentyQty: { $gt: 0 },
			datestamp: dateSearch
		}, function(e, data) {
			callback(data);
		});
	}
	else {
		return 0;
	}
};

// Dashboard - position
Staff.prototype.getManagerName = function(callback) {
	if (typeof callback === 'function') {
		this.db.staff.find({
			name: this.name
		}, function(e, data) {
			if (data.length === 1) {
				var staff = data[0];

				callback(staff.managerName);
			}
		});
	}
};

Staff.prototype.getAllData = function(callback) {
	if (typeof callback === 'function') {
		var staffData = {};

		this.getCallData(function(data) {
			staffData['call'] = data;

			this.getSaleData(function(data) {
				staffData['sale'] = data;

				this.getWarrentyData(function(data) {
					staffData['warrenty'] = data;

					callback(staffData);
				});
			}.bind(this));
		}.bind(this));
	}
}

// Dashboard - calls
Staff.prototype.getCallData = function(callback) {
	if (typeof callback === 'function') {
		var data = {};

		this.getTodaysCalls(function(today) {
			data['today'] = today.length;

			this.getLastWeeksDayCalls(function(lastWeekDay) {
				data['lastWeekDay'] = lastWeekDay.length;

				this.getWoWCalls(function(wow) {
					data['wow'] = wow.length;

					this.getLastWeeksWoWCalls(function(lastWeekWow) {
						data['lastWeekWow'] = lastWeekWow.length;

						callback(data);
					});
				}.bind(this));
			}.bind(this));
		}.bind(this));
	}
};

Staff.prototype.getTodaysCalls = function(callback) {
	if (typeof callback === 'function') {
		this.getCalls(new Date(), callback);
	}
};

Staff.prototype.getLastWeeksDayCalls = function(callback) {
	if (typeof callback === 'function') {
		var weekAgo = new Date();
			weekAgo = weekAgo.setDate(weekAgo.getDate() - 7);

		this.getCalls(new Date(weekAgo), callback);
	}
};

Staff.prototype.getWoWCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getCalls([wowStart, wowEnd], callback);
	}
};

Staff.prototype.getLastWeeksWoWCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = (today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1) - 7),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getCalls([wowStart, wowEnd], callback);
	}
};

// Dashboard - sales
Staff.prototype.getSaleData = function(callback) {
	if (typeof callback === 'function') {
		var data = {};

		this.getTodaysSaleCalls(function(today) {
			data['today'] = today;

			this.getLastWeeksDaySaleCalls(function(lastWeekDay) {
				data['lastWeekDay'] = lastWeekDay;

				this.getWoWSaleCalls(function(wow) {
					data['wow'] = wow;

					this.getLastWeeksWoWSaleCalls(function(lastWeekWow) {
						data['lastWeekWow'] = lastWeekWow;

						callback(data);
					});
				}.bind(this));
			}.bind(this));
		}.bind(this));
	}
};

Staff.prototype.getTodaysSaleCalls = function(callback) {
	if (typeof callback === 'function') {
		this.getSaleCalls(new Date(), function(calls) {
			var totalSold = 0;

			for (var i = 0; i < calls.length; i++) {
				totalSold += calls[i].productQty;
			}

			callback(totalSold);
		});
	}
};

Staff.prototype.getLastWeeksDaySaleCalls = function(callback) {
	if (typeof callback === 'function') {
		var weekAgo = new Date();
			weekAgo = weekAgo.setDate(weekAgo.getDate() - 7);

		this.getSaleCalls(new Date(weekAgo), function(calls) {
			var totalSold = 0;

			for (var i = 0; i < calls.length; i++) {
				totalSold += calls[i].productQty;
			}

			callback(totalSold);
		});
	}
};

Staff.prototype.getWoWSaleCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getSaleCalls([wowStart, wowEnd], function(calls) {
			var totalSold = 0;

			for (var i = 0; i < calls.length; i++) {
				totalSold += calls[i].productQty;
			}

			callback(totalSold);
		});
	}
};

Staff.prototype.getLastWeeksWoWSaleCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = (today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1) - 7),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getSaleCalls([wowStart, wowEnd], function(calls) {
			var totalSold = 0;

			for (var i = 0; i < calls.length; i++) {
				totalSold += calls[i].productQty;
			}

			callback(totalSold);
		});
	}
};

// Dashboard - warrenties
Staff.prototype.getWarrentyData = function(callback) {
	if (typeof callback === 'function') {
		var data = {};

		this.getTodaysWarrentyCalls(function(today) {
			data['today'] = today;

			this.getLastWeeksDayWarrentyCalls(function(lastWeekDay) {
				data['lastWeekDay'] = lastWeekDay;

				this.getWoWWarrentyCalls(function(wow) {
					data['wow'] = wow;

					this.getLastWeeksWoWWarrentyCalls(function(lastWeekWow) {
						data['lastWeekWow'] = lastWeekWow;

						callback(data);
					});
				}.bind(this));
			}.bind(this));
		}.bind(this));
	}
};

Staff.prototype.getTodaysWarrentyCalls = function(callback) {
	if (typeof callback === 'function') {
		this.getWarrentyCalls(new Date(), function(calls) {
			var totalSold = 0;

			for (var i = 0; i < calls.length; i++) {
				totalSold += calls[i].warrentyQty;
			}

			callback(totalSold);
		});
	}
};

Staff.prototype.getLastWeeksDayWarrentyCalls = function(callback) {
	if (typeof callback === 'function') {
		var weekAgo = new Date();
			weekAgo = weekAgo.setDate(weekAgo.getDate() - 7);

		this.getWarrentyCalls(new Date(weekAgo), function(calls) {
			var totalSold = 0;

			for (var i = 0; i < calls.length; i++) {
				totalSold += calls[i].warrentyQty;
			}

			callback(totalSold);
		});
	}
};

Staff.prototype.getWoWWarrentyCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getWarrentyCalls([wowStart, wowEnd], function(calls) {
			var totalSold = 0;

			for (var i = 0; i < calls.length; i++) {
				totalSold += calls[i].warrentyQty;
			}

			callback(totalSold);
		});
	}
};

Staff.prototype.getLastWeeksWoWWarrentyCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = (today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1) - 7),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getWarrentyCalls([wowStart, wowEnd], function(calls) {
			var totalSold = 0;

			for (var i = 0; i < calls.length; i++) {
				totalSold += calls[i].warrentyQty;
			}

			callback(totalSold);
		});
	}
};

module.exports = Staff;
