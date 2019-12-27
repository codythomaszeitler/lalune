const user = require('../src/user');
const parent = require('../src/parent');
const name = require('../src/name');
const database = require('./database.mock');
const transaction = require('../src/parent.post.transaction');

describe('parent post transaction', function() {

    let testDatabase;
    beforeEach(function(){
        testDatabase = new database.Database();
    });

    test('posting a parent with an associated user', function() {
        const testUser = new user.User("username", "password");
        testUser.id = 100;

        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });

        const testObject = new transaction.ParentPostTransaction(testUser, testParent, testDatabase);

        testObject.execute();

        expect(testDatabase.isWritten(testParent)).toBe(true);
        expect(testParent.userid).toBe(testUser.id);
    });

    test('posting a parent without an associated user, throw exception on construction', function() {
        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });

        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction(undefined, testParent, testDatabase);
        } catch (e) {
            exceptionThrown = true;
        }
        
        expect(exceptionThrown).toBe(true);
    });

    test('posting a parent with a null user, throw exception on construction', function() {
        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });

        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction(null, testParent, testDatabase);
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
            new transaction.ParentPostTransaction(testUser, undefined, testDatabase);
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
            new transaction.ParentPostTransaction(testUser, null, testDatabase);
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
            new transaction.ParentPostTransaction(testUser, testParent, null);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('posting without a database, but have a user and a parent, throw exception', function() {
        const testUser = new user.User("username", "password");
        testUser.id = 100;

        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });

        let exceptionThrown = false;
        try {
            new transaction.ParentPostTransaction(testUser, testParent);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('posting with a user that does not have an id, throw exception', function() {
        const testUser = new user.User("username", "password");

        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });

        let exceptionCaught = false;
        try {
            new transaction.ParentPostTransaction(testUser, testParent, testDatabase);
        } catch (e) {
            exceptionCaught = true;
        }
    
        expect(exceptionCaught).toBe(true);
    });

    test('posting with a user that has a null id, throw exception', function() {
        const testUser = new user.User("username", "password");
        testUser.id = null;

        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });

        let exceptionCaught = false;
        try {
            new transaction.ParentPostTransaction(testUser, testParent, testDatabase);
        } catch (e) {
            exceptionCaught = true;
        }
    
        expect(exceptionCaught).toBe(true);
    });
});