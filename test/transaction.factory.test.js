const factory = require('../src/transaction.factory');
const database = require('./database.mock');
const user = require('../src/user');
const parent = require('../src/parent');
const name = require('../src/name');
const result = require('./database.result.mock');

describe('Transaction Creation', function() {

    let testObject = null;
    let transactionDetails = null;
    let testDatabase = null;

    beforeEach(function() {
        testDatabase = new database.Database();
        testObject = new factory.TransactionFactory({
            database : testDatabase
        });

        transactionDetails = {
            body : {
                username : "username",
                password : "password"
            },
            database : testDatabase
        };
    });

    test('creation of a nominal parent post transaction', async function() {
        const testUser = new user.User("testusername", "testpassword");
        testUser.id = 1000;

        testDatabase.setReadReturn("SELECT * FROM users WHERE id = " + testUser.id, 
            result.Result.convert(testUser));

        const request = {
            params : {
                userid : testUser.id
            },
            body : {
                name : {
                    firstName : "testfirstname",
                    lastName : "testlastname"
                }
            }
        };

        const expectedParent = new parent.Parent({
            name : new name.Name(request.body.name.firstName, request.body.name.lastName)
        });

        const transaction = await testObject.create(factory.databaseType.PARENT, factory.httpType.POST, request);
        await transaction.execute();

        expect(testDatabase.isWritten(expectedParent)).toBe(true);
    });

    test('creation of UserPostTransaction when users and POST given', async function() {
        const transaction = await testObject.create(factory.databaseType.USERS, factory.httpType.POST, transactionDetails);
        expect(transaction.user).not.toBe(undefined);
        expect(transaction.user).not.toBe(null);
    }); 

    test('creation of transaction when databaseType is null, throw exception', async function() {
        let exceptionThrown = false;
        try {
            await testObject.create(null, factory.httpType.POST, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('creation of transaction when databaseType is undefined, throw exception', async function() {
        let exceptionThrown = false;
        try {
            await testObject.create(undefined, factory.httpType.POST, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('creation of transaction when httpType is null, throw exception', async function() {
        let exceptionThrown = false;
        try {
            await testObject.create(factory.databaseType.USERS, null, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('creation of transaction when httpType is undefined, throw exception', async function() {
        let exceptionThrown = false;
        try {
            await testObject.create(factory.databaseType.USERS, undefined, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }

        expect(exceptionThrown).toBe(true);
    });

    test('creation of transaction with an invalid databaseType, throw exception', async function() {
        let exceptionThrown = false;
        try {
            await testObject.create('thisisnotvalid', factory.httpType.POST, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('creationg of transaction with an invlalid httpType, throw exception', async function() {
        let exceptionThrown = false;
        try {
            await testObject.create(factory.databaseType.USERS, 'invalidhttptype', userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

});