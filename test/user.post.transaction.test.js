const user = require('../src/user');
const database = require('./database.mock');
const transaction = require('../src/user.post.transaction');

describe('Nominal Transaction', function() {
    test('creating a simple user', async function() {

        const testDatabase = new database.Database();
        
        const body = {
            username : "username",
            password : "password"
        };

        const testObject = new transaction.UserPostTransaction({
            body : body,
            database : testDatabase
        });

        await testObject.execute();

        const expected = new user.User(body.username, body.password);
        expect(testDatabase.isWritten(expected)).toBe(true);
    });

    test('creating a user without password', async function() {
        const testDatabase = new database.Database();

        const body = {
            username : "username"
        };

        const testObject = new transaction.UserPostTransaction({
            body : body,
            database : testDatabase
        });

        await testObject.execute();

        const expected = new user.User(body.username);
        expect(testDatabase.isWritten(expected)).toBe(false);
    });

    test('creating a user with a null password', async function() {
        const testDatabase = new database.Database();

        const body = {
            username : "username",
            password : null
        };

        const testObject = new transaction.UserPostTransaction({
            body : body,
            database : testDatabase
        });

        await testObject.execute();

        const expected = new user.User(body.username, body.password);
        expect(testDatabase.isWritten(expected)).toBe(false);
    });

    test('creating a user without a username', async function() {
        const testDatabase = new database.Database();

        const body = {
            username : undefined,
            password : "password"
        };

        const testObject = new transaction.UserPostTransaction({
            body : body,
            database : testDatabase
        });

        await testObject.execute();

        const expected = new user.User(body.username, body.password);
        expect(testDatabase.isWritten(expected)).toBe(false);
    });

    test('creating a user with a null username', async function() {
        const testDatabase = new database.Database();

        const body = {
            username : null,
            password : "password"
        };
        
        const testObject = new transaction.UserPostTransaction({
            body : body,
            database : testDatabase
        });

        await testObject.execute();

        const expected = new user.User(body.username, body.password);
        expect(testDatabase.isWritten(expected)).toBe(false);
    });

    test('posting user with null body', function() {
        const testDatabase = new database.Database();

        let exceptionThrown = false;
        try {
            new transaction.UserPostTransaction({
                body : null,
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
                body : {
                    username : "username",
                    password : "password"
                },
                database : null
            });        
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });
});