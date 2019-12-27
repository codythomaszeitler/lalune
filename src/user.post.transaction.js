class UserPostTransaction {
    constructor(describe) {
        if (describe.user === null) {
            throw new Exception("Cannot post a user that is not null");
        }

        if (describe.database === null) {
            throw new Exception("Cannot post a user with a null database");
        }

        this.user = describe.user;
        this.database = describe.database;
    }

    execute() {

        if (this.user.username === null || 
            this.user.username === undefined || 
            this.user.password === null || 
            this.user.password === undefined) {
            return;
        }

        this.database.write(this.user);
    }

};

module.exports = {
    UserPostTransaction : UserPostTransaction
}