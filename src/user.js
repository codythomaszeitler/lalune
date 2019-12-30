class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.id = undefined;
        this.type = 'users';
    }

    equals(object) {
        let isEquals = this.username === object.username;
        isEquals = isEquals && (this.password === object.password);
        return isEquals;
    }

    static parse(json) {
        const parsed = new User(json.username, json.password);
        return parsed;
    }
};

module.exports = {
    User : User
};