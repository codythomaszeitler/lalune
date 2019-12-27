const transaction = require('../src/child.post.transaction');
const parent = require('../src/parent');
const child = require('../src/child');
const database = require('./database.mock');
const name = require('../src/name');

describe('post child', function() {

    let testDatabase;
    beforeEach(function() {
        testDatabase = new database.Database();
    });

    test('when child is new', function() {

        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });
        testParent.id = 100;

        const testChild = new child.Child({
            name : new name.Name("Little", "Zeitler")
        });

        const testObject = new transaction.ChildPostTransaction(testParent, testChild, testDatabase);
        testObject.execute();

        expect(testDatabase.isWritten(testChild)).toBe(true);
        expect(testChild.parentid).toBe(testParent.id);
    });
});



