const parentfinder = require('./parent.finder');
const childmapper = require('./child.mapper');
const child = require('./child');

class ChildPostTransaction {

    constructor(details) {
        this.userid = details.userid;
        this.parentid = details.parentid;
        this.database = details.database;

        this.parent = null;
        this.parentFinder = new parentfinder.ParentFinder(this.database);

        this.childMapper = new childmapper.ChildMapper();

        this.child = child.Child.parse(details.childDetails);
    }

    async setup() {
        this.parent = await this.parentFinder.findById(this.parentid);
    }

    async execute() {
        this.child.parentid = this.parent.id;
        const result = await this.database.write(this.child);

        return this.childMapper.convertFromRow(result.rows[0]);
    }
};

module.exports = {
    ChildPostTransaction : ChildPostTransaction
}