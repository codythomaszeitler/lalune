const userposttransaction = require('./user.post.transaction');
const parentposttransaction = require('./parent.post.transaction');
const childposttransaction = require('./child.post.transaction');
const sleepeventposttransaction = require('./sleepevent.post.transaction');

class TransactionFactory {
    constructor(details) {
        if (details !== undefined) {
            this.database = details.database;
        }
    }

    async create(databaseType, httpType, request) {

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
        } else if (databaseType === databaseTypes.CHILD && httpType === httpTypes.POST) {
            transaction = new childposttransaction.ChildPostTransaction({
                userid : request.params.userid,
                parentid : request.params.parentid,
                childDetails : request.body,
                database : this.database
            }); 
        } else if (databaseType === databaseTypes.SLEEP_EVENT && httpType === httpTypes.POST) {
            transaction = new sleepeventposttransaction.SleepEventPostTransaction({
                childid : request.params.childid,
                sleepEventDetails : request.body,
                database : this.database
            });
        } else {
            throw new Error("Could not create transaction with database-type [" + 
                    databaseType + "] and http-type [" + httpType + "]");
        }

        console.log('We were able to create the transaction');
        if (transaction.setup !== undefined) {
            await transaction.setup();
        }
        console.log ('the async operation finished successfully');

        return transaction;
    }
};

const databaseTypes = {
    USERS : 'users',
    PARENT : 'parent',
    CHILD : 'child',
    SLEEP_EVENT : 'sleepevent'
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