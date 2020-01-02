const usermapper = require('../src/user.mapper');
const user = require('../src/user');
const databaseresult = require('./database.result.mock');

describe('User Map from DB to InMem', function() {

    let testObject;
    beforeEach(function() {
        testObject = new usermapper.UserMapper();
    });

    test('convert from database row to user in memory object', function() {
        const testUser = new user.User("testusername", "testpassword");
        const result = databaseresult.Result.convert(testUser);
        const row = result.rows[0];

        expect(testObject.convertFromDatabase(row).equals(testUser)).toBe(true);
    });

    test('convert from null database row, throw exception', function() {

        let exceptionThrown = false;
        try {
            testObject.convertFromDatabase(null);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Cannot convert non-existent database row into user");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('convert from undefined database row, throw exception', function() {

        let exceptionThrown = false;
        try {
            testObject.convertFromDatabase();
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Cannot convert non-existent database row into user");
        }
        expect(exceptionThrown).toBe(true);
    });
});