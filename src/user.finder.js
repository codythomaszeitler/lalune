const user = require('./user');

class UserFinder {
    constructor(database) {
        this.database = database;
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
        const result = await this.database.read("SELECT * FROM users WHERE id = " + id);
        const found = new user.User(result.rows[0].username, result.rows[0].password);
        found.id = result.rows[0].id;
        return found;
    }
};

module.exports = {
    UserFinder : UserFinder
};