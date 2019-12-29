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

    beforeEach(function() {
        testDatabase = new database.Database();
        testObject = new finder.UserFinder(testDatabase);
    });
    test('assert that correct query string goes to database', function() {
        testObject.findById(1000);
        expect(testDatabase.containsQuery("SELECT * FROM users WHERE id = 1000;")).toBe(true);
    });

    test('find by null id, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.findById(null);
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });

    test('find by undefined id, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.findById();
        } catch (e) {
            exceptionThrown = true;
        }
        expect(exceptionThrown).toBe(true);
    });
});