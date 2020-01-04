const transaction = require('../src/sleepevent.post.transaction');
const child = require('../src/child');
const name = require('../src/name');
const database = require('./database.mock');
const sleepevent = require('../src/sleepevent');
const result = require('./database.result.mock');

describe('Post Sleep Event', function() {

    let testObject;
    let testChild;
    let testDatabase;
    let sleepEventDetails;

    beforeEach(function() {
        testDatabase = new database.Database();

        testChild = new child.Child({
            name : new name.Name("Junior", "Zeitler")
        });
        testChild.id = 200;

        sleepEventDetails = {
            startTime : {
                year : 2010,
                month : 'January',
                day : 1,
                hour : 1,
                minutes : 0,
                seconds : 0
            },
            endTime : {
                year : 2010,
                month : 'January',
                day : 1,
                hour : 1,
                minutes : 10,
                seconds : 0
            },
            sleepType : 'Morning'
        };
    });

    test('creating a new sleepevent for a child', async function() {
        testObject = new transaction.SleepEventPostTransaction({
            childid : testChild.id,
            sleepEventDetails : sleepEventDetails,
            database : testDatabase
        });

        testDatabase.setReadReturn("SELECT * FROM child WHERE id = " + testChild.id, 
            result.Result.convert(testChild));

        await testObject.setup();
        const returnValue = await testObject.execute();

        const expected = sleepevent.SleepEvent.parse(sleepEventDetails);
        expected.id = testDatabase.currentId - 1;
        expected.childid = testChild.id;

        expect(testDatabase.isWritten(expected)).toBe(true);
        expect(returnValue.equals(expected)).toBe(true);
    });
});