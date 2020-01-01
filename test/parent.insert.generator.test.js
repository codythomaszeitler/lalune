const user = require('../src/user');
const parent = require('../src/parent');
const name = require('../src/name');
const generator = require('../src/parent.insert.generator');

describe('create parent insert statement', function() {

    let testObject = null;
    let testUser = null;
    beforeEach(function() {
        testUser = new user.User("testusername", "testpassword");
        testUser.id = 1000;

        testObject = new generator.ParentInsertGenerator();
    });

    test('with first, middle, and last name present', function() {
        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler", "Thomas")
        });

        testParent.id = 2000;
        testParent.userid = testUser.id;

        const query = testObject.generate(testParent);

        expect(query.text).toBe("INSERT INTO parent(firstname, lastname, middlename, id, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *");
        expect(query.values).toEqual(["Cody", "Zeitler", "Thomas", testParent.id, testParent.userid]);
    });

    test('with first and last name present', function() {
        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });

        testParent.id = 2000;
        testParent.userid = testUser.id;

        const query = testObject.generate(testParent);
        
        expect(query.text).toBe("INSERT INTO parent(firstname, lastname, middlename, id, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *");
        expect(query.values).toEqual(["Cody", "Zeitler", null, testParent.id, testParent.userid]);
    });

    test('generate against null, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.generate(null);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Cannot generate insert query without a parent");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('generate against undefined, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.generate();
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("Cannot generate insert query without a parent");
        }
        expect(exceptionThrown).toBe(true);
    });
});