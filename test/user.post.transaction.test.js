const user = require('../src/user');
const database = require('./database.mock');
const transaction = require('../src/user.post.transaction');

describe('create user', function() {
    test('creating a simple user', function() {

        const testDatabase = new database.Database();
        
        const testUser = new user.User("username", "password");
        const testObject = new transaction.UserPostTransaction({
            user : testUser,
            database : testDatabase
        });

        testObject.execute();

        expect(testDatabase.isWritten(testUser)).toBe(true);
        expect(testUser.id === undefined).toBe(false);
    });

    test('creating a user without password', function() {
        const testDatabase = new database.Database();

        const testUser = new user.User("username");
        const testObject = new transaction.UserPostTransaction({
            user : testUser,
            database : testDatabase
        });

        testObject.execute();

        expect(testDatabase.isWritten(testUser)).toBe(false);
        expect(testUser.id === undefined).toBe(true);
    });

    test('creating a user with a null password', function() {
        const testDatabase = new database.Database();

        const testUser = new user.User("username", null);
        const testObject = new transaction.UserPostTransaction({
            user : testUser,
            database : testDatabase
        });

        testObject.execute();

        expect(testDatabase.isWritten(testUser)).toBe(false);
        expect(testUser.id === undefined).toBe(true);
    });

    test('creating a user without a username', function() {
        const testDatabase = new database.Database();

        const testUser = new user.User(undefined, "password");
        const testObject = new transaction.UserPostTransaction({
            user : testUser,
            database : testDatabase
        });

        testObject.execute();

        expect(testDatabase.isWritten(testUser)).toBe(false);
        expect(testUser.id === undefined).toBe(true);
    });

    test('creating a user with a null username', function() {
        const testDatabase = new database.Database();

        const testUser = new user.User(null, "password");
        const testObject = new transaction.UserPostTransaction({
            user : testUser,
            database : testDatabase
        });

        testObject.execute();

        expect(testDatabase.isWritten(testUser)).toBe(false);
        expect(testUser.id === undefined).toBe(true);
    });

    test('posting user with null user', function() {
        const testDatabase = new database.Database();

        let exceptionThrown = false;
        try {
            new transaction.UserPostTransaction({
                user : null,
                database : testDatabase
            });        
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('posting user with a null database', function() {
    
        let exceptionThrown = false;
        try {
            new transaction.UserPostTransaction({
                user : new user.User("username", "password"),
                database : null
            });        
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });
});