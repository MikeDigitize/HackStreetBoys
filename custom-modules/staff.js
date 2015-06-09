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

// Dashboard - calls
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
Staff.prototype.getTodaysSaleCalls = function(callback) {
	if (typeof callback === 'function') {
		this.getSaleCalls(new Date(), callback);
	}
};

Staff.prototype.getLastWeeksDaySaleCalls = function(callback) {
	if (typeof callback === 'function') {
		var weekAgo = new Date();
			weekAgo = weekAgo.setDate(weekAgo.getDate() - 7);

		this.getSaleCalls(new Date(weekAgo), callback);
	}
};

Staff.prototype.getWoWSaleCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getSaleCalls([wowStart, wowEnd], callback);
	}
};

Staff.prototype.getLastWeeksWoWSaleCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = (today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1) - 7),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getSaleCalls([wowStart, wowEnd], callback);
	}
};

// Dashboard - warrenties
Staff.prototype.getTodaysWarrentyCalls = function(callback) {
	if (typeof callback === 'function') {
		this.getWarrentyCalls(new Date(), callback);
	}
};

Staff.prototype.getLastWeeksDayWarrentyCalls = function(callback) {
	if (typeof callback === 'function') {
		var weekAgo = new Date();
			weekAgo = weekAgo.setDate(weekAgo.getDate() - 7);

		this.getWarrentyCalls(new Date(weekAgo), callback);
	}
};

Staff.prototype.getWoWWarrentyCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getWarrentyCalls([wowStart, wowEnd], callback);
	}
};

Staff.prototype.getLastWeeksWoWWarrentyCalls = function(callback) {
	if (typeof callback === 'function') {
		var today = new Date(),
			diff = (today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 1) - 7),
			wowStart = new Date(today.setDate(diff));

		var wowEnd = new Date();
			wowEnd = new Date(wowEnd.setDate(wowStart.getDate() + 6)); // end date is start + 6 days

		this.getWarrentyCalls([wowStart, wowEnd], callback);
	}
};

module.exports = Staff;
