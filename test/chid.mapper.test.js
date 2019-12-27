const child = require('../src/child');
const name = require('../src/name');
const mapper = require('../src/child.mapper');
const missingfield = require('../src/missing.field.exception');

describe('mapping from in-memory to database representation', function() {
    test('database representation to child object', function() {
        const databaseItem = { firstname: 'Cody', lastname: 'Zeitler', middlename: 'Thomas', id: '100' };

        const testObject = new mapper.ChildConverter();
        const converted = testObject.convert(databaseItem);
        
        const expected = new child.Child({
            name : new name.Name("Cody", "Zeitler", "Thomas"),
            id : 100
        });

        expect(expected.equals(converted)).toBe(true);
    });

    test('database representation to child object when database item does not have middle name', function() {
        const databaseItem = { firstname: 'Cody', lastname: 'Zeitler', id: '100' };

        const testObject = new mapper.ChildConverter();
        const converted = testObject.convert(databaseItem);

        const expected = new child.Child({
            name : new name.Name("Cody", "Zeitler"),
            id : 100
        });

        expect(expected.equals(converted)).toBe(true);
    });

    test('empty database representation throws exception', function() {
        const testObject = new mapper.ChildConverter();

        let caughtException = null;
        try {
            testObject.convert({});
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException instanceof missingfield.MissingFieldException).toBe(true);
    });

    test('null database representation throws exception', function() {
        const testObject = new mapper.ChildConverter();

        let threwException = false;
        try {
            testObject.convert(null);
        } catch (e) {
            threwException = true;
        }
        expect(threwException).toBe(true);
    });
});