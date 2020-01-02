const user = require('./user');
const errormessage = require('./error.message');
const usermapper = require('./user.mapper');
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

        let returnMessage;
        try {
            const result = await this.database.write(this.user);
            const userMapper = new usermapper.UserMapper();
            
            returnMessage = userMapper.convertFromDatabase(result.row[0]);
        } catch(e) {
            throw e;
        }

        return returnMessage;
    }
};

module.exports = {
    UserPostTransaction : UserPostTransaction
}