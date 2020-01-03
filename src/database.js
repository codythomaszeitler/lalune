const { Client } = require('pg');
const databasestatementgenerator = require('./database.statement.generator');

class Database {

    constructor() {
        this.client = new Client({
            host: 'localhost',
            port: 5432,
            user : 'postgres',
            database : 'postgres'
        });

        this.currentIds = {};
        this.tableList = ['users', 'parent', 'child', 'sleepevent'];
    }

    connect() {
        this.client.connect(err => {
            if (err) {
                console.error('connection error', err.stack)
            } else {
                console.log('connected')
            }

            for (let i = 0; i < this.tableList.length; i++) {
                const table = this.tableList[i];
                this.client.query('SELECT MAX(id) FROM ' + table, (err, res) => {
                    let max = 0;
                    if (res.rows[0].max !== null) {
                        max = parseInt(res.rows[0].max);
                    }
                    this.currentIds[table] = max + 1;
                });
            }
        });
    }

    async write(object) {

        var getNextIdAndIncrement = (table) => {
            console.log(this.currentIds);
            const id = this.currentIds[table];
            this.currentIds[table] = this.currentIds[table] + 1;
            return id;
        };

        object.id = getNextIdAndIncrement(object.type);

        const generator = new databasestatementgenerator.DatabaseStatementGenerator();
        const query = generator.generateInsertStatement(object);

        let result;
        try {
            result = await this.client.query(query);
        } catch (e) {
            throw e;
        }

        return result;
    }

    async read(selectStatement) {
        return await this.client.query(selectStatement);
    }

    delete(object) {

    }
};

module.exports = {
    Database : Database
};