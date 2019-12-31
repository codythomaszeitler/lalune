const user = require('./user');

class UserPostTransaction {
    constructor(describe) {
        if (describe.body === null) {
            throw new Error("Cannot post with a body that is not null");
        }

        if (describe.database === null) {
            throw new Error("Cannot post a user with a null database");
        }

        this.user = new user.User(describe.body.username, describe.body.password);
        this.database = describe.database;
    }

    async execute() {

        if (this.user.username === null || 
            this.user.username === undefined || 
            this.user.password === null || 
            this.user.password === undefined) {
            return;
        }

        return await this.database.write(this.user);
    }
};

module.exports = {
    UserPostTransaction : UserPostTransaction
}