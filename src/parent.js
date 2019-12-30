const sleepevent = require('../src/sleepevent');
const name = require('./name');

class Parent {
    constructor(details) {
        this.children = [];
        this.type = 'parent';

        if (details !== undefined) {
            this.name = details.name;
        }
    }

    getFirstName() {
        return this.name.getFirstName();
    }

    getLastName() {
        return this.name.getLastName();
    }

    getMiddleName() {
        return this.name.getMiddleName();
    }

    equals(object) {
        return this.name.equals(object.name);
    }

    add(child) {
        this.children.push(child);
    }

    getNumChildren() {
        return this.children.length;
    }

    recordNightSleep(child, from, to) {
        child.slept(from, to, sleepevent.types.Night);
    }

    static parse(details) {
        const parsedName = new name.Name(details.name.firstName, details.name.lastName, details.name.middleName);
        return new Parent({
            name : parsedName
        });
    }
}

module.exports = {
    Parent : Parent
}