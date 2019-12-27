const parent = require('../src/parent');
const child = require('../src/child');
const name = require('../src/name');
const database = require('./database.mock');
const sleepevent = require('../src/sleepevent');
const timestamp = require('../src/timestamp');

describe('the parent child relationship', () => {
    test('Add a child under the parent', () => {

        const testObject = new parent.Parent();
        const testChild = new child.Child();

        testObject.add(testChild);
    
        expect(testObject.getNumChildren()).toBe(1);
    });
});

describe('recording sleep of child', function(){

    test('record child going to sleep at night', function() {
        const testChild = new child.Child();
        const testObject = new parent.Parent();

        const from = new timestamp.Timestamp({
            hour : 1
        });
        const to = new timestamp.Timestamp({
            hour : 2
        });

        testObject.recordNightSleep(testChild, from, to);

        expect(testChild.getSleepEvents().length).toBe(1);
    });
});




