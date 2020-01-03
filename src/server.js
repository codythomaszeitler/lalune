const express = require('express');
const factory = require('./transaction.factory');

class Server {
    constructor(hostname, port, database) {
        this.hostname = hostname;
        this.port = port;
        this.database = database;

        this.transactionFactory = new factory.TransactionFactory({
            database : this.database
        });
    }

    start() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.post('/user', async (request, response) => {
            this.postUser(request, response);
        });
        
        this.app.post('/user/:userid/parent', async (request, response) => {
            this.postParent(request, response);
        });

        this.server = this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}!`);
        });
        this.database.connect();
    }

    stop() {
        this.server.close();
    }

    async postUser(request, response) {
        try {
            const transaction = await this.transactionFactory.create(
                factory.databaseType.USERS, factory.httpType.POST, request);

            response.send(await transaction.execute());
        } catch (e) {
            console.log(e);
        }
    }

    async postParent(request, response) {
        try {
            const transaction = await this.transactionFactory.create(
                factory.databaseType.PARENT, factory.httpType.POST, request);
    
            response.send(await transaction.execute());
        } catch (e) {
            console.log(e);
        }
    }
};

module.exports = {
    Server : Server
};