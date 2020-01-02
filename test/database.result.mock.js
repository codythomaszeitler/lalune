class Result {

    constructor() {
        this.rows = [];
    }

    static convert(inMemObject) {
        const result = new Result();

        if (inMemObject.type === 'users') {
            const databaseRow = {};
            databaseRow.username = inMemObject.username;
            databaseRow.password = inMemObject.password;
            databaseRow.id = inMemObject.id;

            result.rows.push(databaseRow);
        } else {
            throw new Error("Object [" + inMemObject + "] conversion" +
                " process was not supported for type [" + inMemObject.type + "]");
        }

        return result;
    }
};

module.exports = {
    Result : Result
};