const transaction = require('../src/child.post.transaction');
const parent = require('../src/parent');
const child = require('../src/child');
const database = require('./database.mock');
const name = require('../src/name');
const result = require('./database.result.mock');

describe('post child', function() {

    let testDatabase;
    let childDetails;

    beforeEach(function() {
        testDatabase = new database.Database();
        childDetails = {
            name : {
                firstName : "Little",
                lastName : "Zeitler"
            },
            sleeps : []
        };
    });

    test('when child is new', async function() {
        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });
        testParent.id = 200;
        testParent.userid = 300;

        testDatabase.setReadReturn('SELECT * FROM parent WHERE id = ' + testParent.id, 
            result.Result.convert(testParent));

        const testObject = new transaction.ChildPostTransaction({
            parentid : testParent.id,
            childDetails : childDetails,
            database : testDatabase
        });

        await testObject.setup();
        await testObject.execute();

        const expected = new child.Child({
            name : new name.Name("Little", "Zeitler"),
            parentid : testParent.id,
            id : (testDatabase.currentId - 1)
        });
        expect(testDatabase.isWritten(expected)).toBe(true);
    });
});



