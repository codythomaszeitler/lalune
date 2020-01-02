const database = require('./database.mock');
const user = require('../src/user');
const finder = require('../src/user.finder');

describe('find by username', function() {

    let testObject = null;
    let testDatabase = null;

    beforeEach(function() {
        testDatabase = new database.Database();
        testObject = new finder.UserFinder(testDatabase);
    });

    test('assert that correct query string goes to database', function() {
        let username = 'username';
        testObject.findByUsername(username);
        expect(testDatabase.containsQuery("SELECT * FROM users WHERE username = 'username';")).toBe(true);
    });


    test('find by null username, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.findByUsername(null);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('find by undefined username, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.findByUsername();
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });
});

describe('find by id', function() {

    let testObject = null;
    let testDatabase = null;
    let id;

    beforeEach(function() {
        testDatabase = new database.Database();
        testObject = new finder.UserFinder(testDatabase);
        id = 1000;
    });

    test('assert that correct query string goes to database', async function() {
        await testObject.findById(1000);
        expect(testDatabase.containsQuery("SELECT * FROM users WHERE id = 1000")).toBe(true);
    });

    test('when query returns an empty list of rows, return null', async function() {
        const result = {
            rows : []
        };
        
        testDatabase.setReadReturn("SELECT * FROM users WHERE id = " + id, result);
        let found = await testObject.findById(id);
        expect(found).toBe(null);
    });

    test('when query returns a null result. return null', async function() {
        testDatabase.setReadReturn("SELECT * FROM users WHERE id = " + id, null);
        let found = await testObject.findById(id);
        expect(found).toBe(null);
    });

    test('when query returns an undefined result, return null', async function() {
        testDatabase.setReadReturn("SELECT * FROM users WHERE id = " + id, undefined);
        let found = await testObject.findById(id);
        expect(found).toBe(null);
    });

    test('when query row does not have a username attribute, throw an exception', async function() {
        const result = {
            rows : [{
                    password : "testpassword"
                }
            ]
        };
        testDatabase.setReadReturn("SELECT * FROM users WHERE id = " + id, result);

        let exceptionThrown = false;
        try {
            await testObject.findById(id);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Queried row did not have the 'username' attribute");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('when query row does not have a password attribute, throw exception', async function() {
        const result = {
            rows : [{
                    username : "testusername"
                }
            ]
        };
        testDatabase.setReadReturn("SELECT * FROM users WHERE id = " + id, result);

        let exceptionThrown = false;
        try {
            await testObject.findById(id);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Queried row did not have the 'password' attribute");
        }
        expect(exceptionThrown).toBe(true);

    });

    test('find by null id, throw exception', async function() {
        let exceptionThrown = false;
        try {
            await testObject.findById(null);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('find by undefined id, throw exception', async function() {
        let exceptionThrown = false;
        try {
            await testObject.findById();
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });
});