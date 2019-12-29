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

    findById(id) {
        if (id === null) {
            throw new Error("Cannot find a user with a null id");
        }

        if (id === undefined) {
            throw new Error("Cannot find a user with an undefined id");
        }

        return this.database.read("SELECT * FROM users WHERE id = " + id + ";");
    }
};

module.exports = {
    UserFinder : UserFinder
};