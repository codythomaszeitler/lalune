const sleepevent = require('../src/sleepevent');

class Child {
    constructor(details) {
        if (details !== undefined) {
            this.name = details.name;
            this.database = details.database;
            this.id = details.id;
        }

        this.sleeps = [];
    }

    setName(name) {
        this.name = name;
    }

    getFirstName() {
        return this.name.getFirstName();
    }

    getMiddleName() {
        return this.name.getMiddleName();
    }

    getLastName() {
        return this.name.getLastName();
    }

    slept(from, to, type) {
        if (to.isBefore(from)) {
            throw new Exception('To was before from');
        }

        const sleepEvent = new sleepevent.SleepEvent(from, to, type);
        this.sleeps.push(sleepEvent);
    }

    getSleepEvents() {
        return this.sleeps.slice();
    }

    equals(object) {
        if (object === null || object === undefined) {
            return false;
        }

        let isEquals = this.name.equals(object.name);
        isEquals = isEquals && (this.id === object.id);
        return isEquals;
    }
};

module.exports = {
    Child : Child
};
