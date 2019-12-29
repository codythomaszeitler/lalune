const finder = require('./user.finder');
const parent = require('./parent');

class ParentPostTransaction {
    constructor(details) {

        if (details === null || details === undefined) {
            throw new Error("Cannot post without initalized details");
        }

        if (details.userid === undefined || details.userid === null) {
            throw new Error("Cannot post a parent without an associated user");
        }

        if (details.parentDetails === undefined || details.parentDetails === null) {
            throw new Error("Cannot post without a parent");
        }

        if (details.database === undefined || details.database === null) {
            throw new Error("Cannot post without a database");
        }

        const userFinder = new finder.UserFinder(details.database);
        this.user = userFinder.findById(details.userid);
        this.parent = parent.Parent.parse(details.parentDetails);
        this.database = details.database;
    }

    execute() {
        this.parent.userid = this.user.id;
        this.database.write(this.parent);
    }

};

module.exports = {
    ParentPostTransaction : ParentPostTransaction
}