const express = require('express');
const user = require('./user');
const factory = require('./transaction.factory');
const database = require('./database');
class Server {
    constructor(hostname, port) {
        this.hostname = hostname;
        this.port = port;

        this.database = new database.Database();

        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.post('/user', (request, response) => {
            const transactionFactory = new factory.TransactionFactory({
                database : this.database
            });
            const transaction = transactionFactory.create(
                factory.databaseType.USERS, factory.httpType.POST, request);
            response.send(JSON.stringify(transaction.execute()));
        });

        this.app.post('/user/:userid/parent', (request, response) => {
            const transactionFactory = new factory.TransactionFactory({
                database : this.database
            });
            const transaction = transactionFactory.create(
                factory.databaseType.PARENT, factory.httpType.POST, request);
            response.send(JSON.stringify(transaction.execute()));
        });
    }

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}!`);
        });
    }

    stop() {
        this.server.close();
    }
};

const server = new Server("localhost", 8080);
server.start();
