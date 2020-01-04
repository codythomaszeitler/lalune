const childfinder = require('../src/child.finder');
const database = require('./database.mock');
const child = require('../src/child');
const name = require('../src/name');
const result = require('./database.result.mock');

describe('Find Child by ID', function() {

    let testObject;
    let testDatabase;

    beforeEach(function() {
        testDatabase = new database.Database();
        testObject = new childfinder.ChildFinder(testDatabase);
    });

    test('get child that is within the database', async function() {
        const testChild = new child.Child({
            name : new name.Name("Cody", "Zeitler")
        });
        testChild.id = 1000;
        testChild.parentid = 2000;
        
        testDatabase.setReadReturn("SELECT * FROM child WHERE id = " + testChild.id,
            result.Result.convert(testChild));
        
        const found = await testObject.findById(testChild.id);
        expect(found.equals(testChild)).toBe(true);
    });
});