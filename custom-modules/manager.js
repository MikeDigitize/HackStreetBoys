function Manager(name, database) {
	if (name && database) {
		this.name = name;
		this.db = database;
	}
	else {
		throw new Exception("Please provide a name and DB interface");
	}
};

module.exports = Manager;
