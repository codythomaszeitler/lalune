class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.id = undefined;
    }

    equals(object) {
        let isEquals = this.username === object.username;
        isEquals = isEquals && (this.password === object.password);
        return isEquals;
    }
};

module.exports = {
    User : User
};