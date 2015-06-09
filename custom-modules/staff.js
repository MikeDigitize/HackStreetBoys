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
		this.db.calls.find({
			caller: this.name
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
		this.db.calls.find({
			caller: this.name,
			productQty: { $gt: 0 }
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
		this.db.calls.find({
			caller: this.name,
			warrentyQty: { $gt: 0 }
		}, function(e, data) {
			callback(data);
		});
	}
	else {
		return 0;
	}
};

module.exports = Staff;
