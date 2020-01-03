const databaserow = require('./database.result.mock');

class Database {

    constructor() {
        this.written = [];
        this.queries = [];
        this.returnOnRead = {};
        this.currentId = 0;
    }

    create(object) {

    }

    read(selectStatement) {
        this.queries.push(selectStatement);
        return this.returnOnRead[selectStatement];
    }

    containsQuery(query) {
        let containsQuery = false;
        for (let i = 0; i < this.queries.length; i++) {
            let currentQuery = this.queries[i];
            if (currentQuery === query) {
                containsQuery = true;
                break;
            }
        }

        return containsQuery;
    }

    setReadReturn(selectStatement, value) {
        this.returnOnRead[selectStatement] = value;
    }

    update(object) {

    }

    delete(object) {

    }

    write(object) {
        this.written.push(object);
        object.id = this.currentId;
        this.currentId++;
        return databaserow.Result.convert(object);
    }

    isWritten(object) {
        let isWritten = false;

        for (let i = 0; i < this.written.length; i++) {
            let current = this.written[i];
            if (current.equals(object)) {
                isWritten = true;
                break;
            }
        }

        return isWritten;
    }
}

module.exports = {
    Database : Database
};