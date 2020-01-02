const _ = require('./server');
const database = require('./database');

const server = new _.Server("localhost", 8080, new database.Database());
server.start();