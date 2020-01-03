const finder = require('./user.finder');
const parent = require('./parent');
const parentmapper = require('./parent.mapper');

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

        this.parent = parent.Parent.parse(details.parentDetails);
        this.database = details.database;
        this.userid = details.userid;
        this.user = null;

        this.parentMapper = new parentmapper.ParentMapper();
    }

    async setup() {
        const userFinder = new finder.UserFinder(this.database);
        this.user = await userFinder.findById(this.userid);
    }

    async execute() {
        this.parent.userid = this.user.id;

        const result = await this.database.write(this.parent);
        const converted = this.parentMapper.convertFromRow(result.rows[0]);

        return converted;
    }
};

module.exports = {
    ParentPostTransaction : ParentPostTransaction
}