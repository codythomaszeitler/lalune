const generator = require('../src/database.statement.generator');
const user = require('../src/user');
const parent = require('../src/parent');
const name = require('../src/name');

describe('generate insert statement', function() {

    let testObject = null;
    beforeEach(function() {
        testObject = new generator.DatabaseStatementGenerator();
    });

    test('create insert string for user', function() {
        const testUser = new user.User("testusername", "testpassword");
        testUser.id = 1000;

        const query = testObject.generateInsertStatement(testUser);

        expect(query.text).toBe("INSERT INTO users(username, password, id) VALUES ($1, $2, $3) RETURNING *");
        expect(query.values).toEqual([testUser.username, testUser.password, testUser.id]);
    });

    test('create insert query for parent', function() {
        const testUser = new user.User("testusername", "testpassword");
        testUser.id = 1000;
        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler", "Thomas")
        });
        testParent.id = 1000;
        testParent.userid = 1000;

        const query = testObject.generateInsertStatement(testParent);
        expect(query.text).toBe("INSERT INTO parent(firstname, lastname, middlename, id, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *");
        expect(query.values).toEqual(["Cody", "Zeitler", "Thomas", 1000, 1000]);
    });

    test('against null object, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.generateInsertStatement(null);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Cannot generate query without an object");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('against undefined object, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.generateInsertStatement();
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Cannot generate query without an object");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('against object that is not supported, throw exception', function() {
        let object = {
            type : 'NOT-SUPPORTED'
        };

        let exceptionThrown = false;

        try {
            testObject.generateInsertStatement(object);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("The object with type [NOT-SUPPORTED] is not supported for query conversion");
        }

        expect(exceptionThrown).toBe(true);
    });

    test('against object that does not have type attribute, throw exception', function() {
        let object = {};

        let exceptionThrown = false;
        try {
            testObject.generateInsertStatement(object);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("To generate an insert statement, the object must have a 'type' attribute");
        }

        expect(exceptionThrown).toBe(true);
    });

    test('against object that has a null type attribute, throw exception', function() {
        let object = {
            type : null
        };

        let exceptionThrown = false;
        try {
            testObject.generateInsertStatement(object);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("To generate an insert statement, the object must have a 'type' attribute");
        }

        expect(exceptionThrown).toBe(true);
    });
});

