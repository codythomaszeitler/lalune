const factory = require('../src/transaction.factory');

describe('Transaction Creation', function() {

    let testObject = null;
    let userAsJson = null;

    beforeEach(function() {
        testObject = new factory.TransactionFactory();

        userAsJson = {
            username : "username",
            password : "password"
        };
    });

    test('creation of UserPostTransaction when users and POST given', function() {
        const transaction = testObject.create(factory.databaseType.USERS, factory.httpType.POST, userAsJson);
        expect(transaction.user).not.toBe(undefined);
        expect(transaction.user).not.toBe(null);
    }); 

    test('creation of transaction when databaseType is null, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.create(null, factory.httpType.POST, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('creation of transaction when databaseType is undefined, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.create(undefined, factory.httpType.POST, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('creation of transaction when httpType is null, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.create(factory.databaseType.USERS, null, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('creation of transaction when httpType is undefined, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.create(factory.databaseType.USERS, undefined, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }

        expect(exceptionThrown).toBe(true);
    });

    test('creation of transaction with an invalid databaseType, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.create('thisisnotvalid', factory.httpType.POST, userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('creationg of transaction with an invlalid httpType, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.create(factory.databaseType.USERS, 'invalidhttptype', userAsJson);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

});