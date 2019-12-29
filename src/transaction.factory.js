const userposttransaction = require('./user.post.transaction');
const parentposttransaction = require('./parent.post.transaction');

class TransactionFactory {
    constructor(details) {
        if (details !== undefined) {
            this.database = details.database;
        }
    }

    create(databaseType, httpType, request) {

        if (databaseType === null || databaseType === undefined) {
            throw new Error("Cannot create transaction without database type");
        }

        if (httpType === null || httpType === undefined) {
            throw new Error("Cannoot create transaction without http type");
        }

        let transaction = null;
        
        if (databaseType === databaseTypes.USERS && httpType === httpTypes.POST) {
            transaction = new userposttransaction.UserPostTransaction({
                body : request.body,
                database : this.database
            });
        } else if (databaseType === databaseTypes.PARENT && httpType === httpTypes.POST) {
            transaction = new parentposttransaction.ParentPostTransaction({
                userid : request.params.userid,
                parentDetails : request.body,
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
    USERS : 'users',
    PARENT : 'parent'
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