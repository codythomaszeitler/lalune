const server = require('./server');
const express = require('express');
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
        this.transactionFactory = new factory.TransactionFactory({
            database : this.database
        });

        this.app.post('/user', async (request, response) => {
            try {
                const transaction = await this.transactionFactory.create(
                    factory.databaseType.USERS, factory.httpType.POST, request);

                response.send(await transaction.execute());
            } catch (e) {
                console.log(e);
            }
        });

        this.app.post('/user/:userid/parent', async (request, response) => {
            try {
                const transaction = await this.transactionFactory.create(
                    factory.databaseType.PARENT, factory.httpType.POST, request);
        
                response.send(await transaction.execute());
            } catch (e) {
                console.log(e);
            }
        });
    }

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}!`);
        });
        this.database.connect();
    }

    stop() {
        this.server.close();
    }
};

module.exports = {
    Server : Server
};