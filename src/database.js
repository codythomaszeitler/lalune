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
    }

    connect() {
        this.client.connect(err => {
            if (err) {
                console.error('connection error', err.stack)
            } else {
                console.log('connected')
            }
        });
    }

    write(object) {
        const generator = new databasestatementgenerator.DatabaseStatementGenerator();
        const query = generator.generateInsertStatement(object);
        this.client.query(query, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(res.rows[0]);
            }
        });
    }

    delete(object) {

    }
};

module.exports = {
    Database : Database
};