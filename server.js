var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

var ObjectId = require('mongodb').ObjectID;
var databaseUrl = "mongodb://localhost:27017/callcentre";
var collections = ["staff", "managers", "calls"];
var db = require("mongojs").connect(databaseUrl, collections);

server.listen(1337);
app.use(express.static(__dirname + "/public" ));

/**
  *	Listen for user logins
  */

var verify = require("./custom-modules/db-authentication.js");

/**
  *	Listen for socket comnmunication
  */

var sockets = require("./custom-modules/sockets.js");
sockets(io, db, verify);

/**
  *	Set up the database with dummy data if it's not already there
  */

var dbSetup = require("./custom-modules/db-setup.js");
dbSetup(db);

