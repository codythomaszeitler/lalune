class ChildPostTransaction {

    constructor(parent, child, database) {
        this.parent = parent;
        this.child = child;
        this.database = database;
    }

    execute() {
        this.child.parentid = this.parent.id;
        this.database.write(this.child);
    }
};

module.exports = {
    ChildPostTransaction : ChildPostTransaction
}