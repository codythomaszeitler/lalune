const transaction = require('../src/child.post.transaction');
const parent = require('../src/parent');
const child = require('../src/child');
const database = require('./database.mock');

describe('post child', function() {

    test('when child is new', function() {
        const testObject = new transaction.ChildPostTransaction(parent, child, database);
        testObject.execute();

        // There should now be a child in the database whose parent is parent.
        expect(database.isWritten(child)).toBe(true);
        expect(database.hasLookupFrom(child, parent)).toBe(true);
    });
});



