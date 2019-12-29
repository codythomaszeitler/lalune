const user = require('../src/user');
const parent = require('../src/parent');
const name = require('../src/name');
const database = require('./database.mock');
const transaction = require('../src/parent.post.transaction');

describe('parent post transaction', function() {

    let testDatabase;
    let parentDetails;

    beforeEach(function(){
        testDatabase = new database.Database();

        parentDetails = {
            name : {
                firstName : "Cody",
                lastName : "Zeitler"
            }
        };
    });

    test('posting a parent with an associated user', function() {
        const testUser = new user.User("username", "password");
        testUser.id = 1000;
        testDatabase.setReadReturn("SELECT * FROM users WHERE id = " + testUser.id + ";", testUser);

        const testObject = new transaction.ParentPostTransaction({
            userid : testUser.id,
            parentDetails : parentDetails,
            database : testDatabase
        });

        testObject.execute();

        const expected = parent.Parent.parse(parentDetails);
        expect(testDatabase.isWritten(expected)).toBe(true);
    });

    test('posting a parent without an associated user id, throw exception on construction', function() {
        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction({
                userid : undefined, 
                parentDetails : parentDetails,
                database : testDatabase
            });
        } catch (e) {
            exceptionThrown = true;
        }
        
        expect(exceptionThrown).toBe(true);
    });

    test('posting a parent with a null user id, throw exception on construction', function() {
        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction({
                userid : null, 
                parentDetails : parentDetails,
                database : testDatabase
            });
        } catch (e) {
            exceptionThrown = true;
        }
        
        expect(exceptionThrown).toBe(true);
    });

    test('posting without a parent, but a user and a database, throw exception on construction', function() {
        const testUser = new user.User("username", "password");
        testUser.id = 100;

        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction({
                userid : testUser.id, 
                parentDetails : undefined,
                database : testDatabase
            });
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('posting with a null parent, but a user and a database, throw exception on construction', function() {
        const testUser = new user.User("username", "password");
        testUser.id = 100;

        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction({
                userid : testUser.id, 
                parentDetails : null,
                database : testDatabase
            });
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('posting with a null database, but have a user and a parent, throw exception', function() {
        const testUser = new user.User("username", "password");
        testUser.id = 100;

        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });

        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction({
                userid : testUser.id, 
                parentDetails : parentDetails,
                database : null
            });
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('posting without a database, but have a user and a parent, throw exception', function() {
        const testUser = new user.User("username", "password");
        testUser.id = 100;

        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction({
                userid : testUser.id, 
                parentDetails : parentDetails,
                database : undefined
            });
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('given null details, throw an exception', function() {
        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction(null);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('given undefined details, throw an exception', function() {
        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction();
        } catch (e) {
            exceptionThrown = true;
        }

        expect(exceptionThrown).toBe(true);
    });
});