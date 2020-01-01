const generator = require('../src/user.insert.generator');
const user = require('../src/user');

describe('creating insert queries', function() {

    let testObject;
    beforeEach(function() {
        testObject = new generator.UserInsertGenerator();
    });

    test('when username and password are present', function() {
        const testUser = new user.User("username", "password");
        testUser.id = 10000;

        const query = testObject.generate(testUser);

        expect(query.text).toBe("INSERT INTO users(username, password, id) VALUES ($1, $2, $3) RETURNING *");
        expect(query.values).toEqual([testUser.username, testUser.password, testUser.id]);
    });

    test('when user is null, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.generate(null);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Cannot generate an insert statement with a user");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('when user is undefined, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.generate();
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Cannot generate an insert statement with a user");
        }
        expect(exceptionThrown).toBe(true);
    });
});