
class TransactionFactory {
    constructor(details) {
        if (details !== undefined) {
            this.database = details.database;
        }
    }

    create(databaseType, httpType, body) {

        if (databaseType === null || databaseType === undefined) {
            throw new Error("Cannot create transaction without database type");
        }

        if (httpType === null || httpType === undefined) {
            throw new Error("Cannoot create transaction without http type");
        }

        let transaction = null;
        
        if (databaseType === 'users' && httpType === 'POST') {
            const userposttransaction = require('./user.post.transaction');
            transaction = new userposttransaction.UserPostTransaction({
                body : body,
                database : this.database
            });
        } else {
            throw new Error("Could not create transaction with database-type [" + 
                    databaseType + "] and http-type [" + httpType + "]");
        }

        return transaction;
    }
};

const databaseTypes = {
    USERS : 'users'
};
Object.freeze(databaseTypes);

const httpTypes = {
    GET : 'GET',
    POST : 'POST',
    DELETE : 'DELETE',
    UPDATE : 'UPDATE'
};
Object.freeze(httpTypes);

module.exports = {
    TransactionFactory : TransactionFactory,
    httpType : httpTypes,
    databaseType : databaseTypes
};