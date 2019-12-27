const sleepevent = require('../src/sleepevent');

class Parent {
    constructor(details) {
        this.children = [];

        if (details !== undefined) {
            this.database = details.database;
        }
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
}

module.exports = {
    Parent : Parent
}