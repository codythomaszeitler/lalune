class ParentPostTransaction {
    constructor(user, parent, database) {

        if (user === undefined || user === null) {
            throw new Exception("Cannot post without a user");
        }

        if (parent === undefined || parent === null) {
            throw new Exception("Cannot post without a parent");
        }

        if (database === undefined || database === null) {
            throw new Exception("Cannot post without a database");
        }

        if (user.id === undefined || user.id === null) {
            throw new Exception("Cannot post without the user being inserted");
        }

        this.user = user;
        this.parent = parent;
        this.database = database;
    }

    execute() {
        this.parent.userid = this.user.id;
        this.database.write(this.parent);
    }

};

module.exports = {
    ParentPostTransaction : ParentPostTransaction
}