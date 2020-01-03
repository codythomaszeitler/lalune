const usermapper = require('./user.mapper');

class UserFinder {
    constructor(database) {
        this.database = database;
        this.userMapper = new usermapper.UserMapper();
    }

    findByUsername(username) {
        if (username === null) {
            throw new Error("Cannot find a user with a null username");
        }

        if (username === undefined) {
            throw new Error("Cannot find a user with an undefined username");
        }

        return this.database.read("SELECT * FROM users WHERE username = '" + username + "';");
    }

    async findById(id) {
        if (id === null) {
            throw new Error("Cannot find a user with a null id");
        }
        if (id === undefined) {
            throw new Error("Cannot find a user with an undefined id");
        }

        let found = null;
        const result = await this.database.read("SELECT * FROM users WHERE id = " + id);
        if (result === null || result === undefined || result.rows.length === 0) {
            return found;
        }

        const row = result.rows[0];
        if (row.username === undefined) {
            throw new Error("Queried row did not have the 'username' attribute");
        }

        if (row.password === undefined) {
            throw new Error("Queried row did not have the 'password' attribute");
        }

        found = this.userMapper.convertFromRow(row);
        
        return found;
    }
};

module.exports = {
    UserFinder : UserFinder
};