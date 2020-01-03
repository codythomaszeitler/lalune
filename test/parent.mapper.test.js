const parentmapper = require('../src/parent.mapper');
const parent = require('../src/parent');
const name = require('../src/name');
const databaseresult = require('./database.result.mock');

describe('Convert from DB to InMem', function() {   

    let testObject;
    let databaseRow;

    beforeEach(function() {
        testObject = new parentmapper.ParentMapper();

        databaseRow = {};
        databaseRow.firstname = 'testfirstname';
        databaseRow.lastname = 'testlastname';
        databaseRow.middlename = 'testmiddlename';
        databaseRow.id = 1000;
        databaseRow.userid = 2000;
    }); 

    test('convert from nominal DB row to parent', function() {
        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });
        testParent.id = 1000;
        testParent.userid = 2000;

        const result = databaseresult.Result.convert(testParent);
        const converted = testObject.convertFromRow(result.rows[0]);

        expect(testParent.equals(converted)).toBe(true);
    });

    test('when converting null database row, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.convertFromRow(null);
        } catch (e) {   
            exceptionThrown = true;
            expect(e.message).toBe("Cannot convert parent without a database row");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('when converting undefined database row, throw exception', function() {
        let exceptionThrown = false;
        try {
            testObject.convertFromRow();
        } catch (e) {   
            exceptionThrown = true;
            expect(e.message).toBe("Cannot convert parent without a database row");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('when converting database row without firstname column, throw exception', function() {

        databaseRow.firstname = undefined;

        let exceptionThrown = false;
        try {
            testObject.convertFromRow(databaseRow);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("While converting parent within ParentMapper, database row did not have 'firstname' attribute");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('when converting database row without lastname column, throw exception', function() {

        databaseRow.lastname = undefined;

        let exceptionThrown = false;
        try {
            testObject.convertFromRow(databaseRow);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("While converting parent within ParentMapper, database row did not have 'lastname' attribute");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('when converting database row without middlename column, throw exception', function() {

        databaseRow.middlename = undefined;

        let exceptionThrown = false;
        try {
            testObject.convertFromRow(databaseRow);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("While converting parent within ParentMapper, database row did not have 'middlename' attribute");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('when converting database row without id column, throw exception', function() {

        databaseRow.id = undefined;

        let exceptionThrown = false;
        try {
            testObject.convertFromRow(databaseRow);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("While converting parent within ParentMapper, database row did not have 'id' attribute");
        }
        expect(exceptionThrown).toBe(true);
    });

    test('when converting database row without userid column, throw exception', function() {

        databaseRow.userid = undefined;

        let exceptionThrown = false;
        try {
            testObject.convertFromRow(databaseRow);
        } catch (e) {
            exceptionThrown = true;
            expect(e.message).toBe("While converting parent within ParentMapper, database row did not have 'userid' attribute");
        }
        expect(exceptionThrown).toBe(true);
    });
});