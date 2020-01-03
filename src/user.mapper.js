const user = require('./user');

class UserMapper {
    constructor() {

    }

    convertFromRow(databaseRow) {
        if (databaseRow === null || databaseRow === undefined) {
            throw new Error("Cannot convert non-existent database row into user");
        }

        const converted = new user.User(databaseRow.username, databaseRow.password);
        converted.id = parseInt(databaseRow.id);
        return converted;
    }
};

module.exports = {
    UserMapper : UserMapper
};