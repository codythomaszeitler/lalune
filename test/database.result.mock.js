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
        } else if (inMemObject.type === 'parent') {
            const databaseRow = {};
            databaseRow.name = {};
            databaseRow.firstname = inMemObject.getFirstName();
            databaseRow.lastname = inMemObject.getLastName();
            databaseRow.middlename = inMemObject.getMiddleName();
            databaseRow.userid = inMemObject.userid;
            databaseRow.id = inMemObject.id;

            result.rows.push(databaseRow);
        } else if (inMemObject.type === 'child') {
            const databaseRow = {};
            databaseRow.firstname = inMemObject.getFirstName();
            databaseRow.lastname = inMemObject.getLastName();
            databaseRow.middlename = inMemObject.getMiddleName();
            databaseRow.parentid = inMemObject.parentid;
            databaseRow.id = inMemObject.id;

            result.rows.push(databaseRow);
        } else if (inMemObject.type === 'sleepevent') {
            const databaseRow = {};
            databaseRow.fromtimestamp = inMemObject.start().toDate();
            databaseRow.totimestamp = inMemObject.end().toDate();
            databaseRow.type = inMemObject.timeOfDay;
            databaseRow.id = inMemObject.id;
            databaseRow.childid = inMemObject.childid;
            databaseRow.type = inMemObject.timeOfDay

            result.rows.push(databaseRow);
        } else {
            throw new Error("Object [" + JSON.stringify(inMemObject) + "] conversion" +
                " process was not supported for type [" + inMemObject.type + "]");
        }

        return result;
    }
};

module.exports = {
    Result : Result
};