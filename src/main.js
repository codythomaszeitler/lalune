const _ = require('./server');

const server = new _.Server("localhost", 8080);
server.start();