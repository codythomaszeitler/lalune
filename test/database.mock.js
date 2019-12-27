const database = require('../src/database');

class Database extends database.Database {

    constructor() {
        super();
        this.written = [];
    }

    create(object) {

    }

    read() {

    }

    update(object) {
        
    }

    delete(object) {

    }

    write(object) {
        this.written.push(object);
    }

    isWritten(object) {
        let isWritten = false;

        for (let i = 0; i < this.written.length; i++) {
            let current = this.written[i];
            if (current.isEquals(object)) {
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