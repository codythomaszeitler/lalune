const sleepevent = require('../src/sleepevent');
const name = require('./name');

class Child {
    constructor(details) {
        if (details !== undefined) {
            this.name = details.name;
            this.id = details.id;
            this.parentid = details.parentid;
        }

        this.type = 'child';
        this.sleeps = [];
    }

    static parse(details) {
        const parsed = new Child({
            name : new name.Name(details.name.firstName, details.name.lastName, details.name.middleName)
        });
        parsed.id = parseInt(details.id);
        parsed.parentid = parseInt(details.parentid);

        return parsed;
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
        isEquals = isEquals && (this.parentid === object.parentid);
        return isEquals;
    }
};

module.exports = {
    Child : Child
};
