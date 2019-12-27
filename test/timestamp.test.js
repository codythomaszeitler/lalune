
const timestamp = require('../src/timestamp');

describe('create a timestamp', function() {

    test('only setting the year', function(){
        const testObject = new timestamp.Timestamp();
        testObject.setYear(2019);

        expect(testObject.getYear()).toBe(2019);
    });

    test('passing in null for the year', function(){
        const testObject = new timestamp.Timestamp();
        testObject.setYear(null);
        
        expect(testObject.getYear()).toBe(0);
    });

    test('only setting the month', function() {
        const testObject = new timestamp.Timestamp();
        testObject.setMonth(timestamp.months.JANUARY);

        expect(testObject.getMonth()).toBe(timestamp.months.JANUARY);
    });

    test('only setting the day', function() {
        const testObject = new timestamp.Timestamp();
        testObject.setDay(22);

        expect(testObject.getDay()).toBe(22);
    });

    test('passing in null for the day', function() {
        const testObject = new timestamp.Timestamp();

        let caughtException = false;
        try {
            testObject.setDay(null);
        } catch (e) {
            caughtException = true;
        }
        
        expect(caughtException).toBe(true);
    });

    test('passing in a number for day that is greater than 31', function() {

        const testObject = new timestamp.Timestamp();

        let caughtException = false;
        try {
            testObject.setDay(32);
        } catch (e) {
            caughtException = true;
        }

        expect(caughtException).toBe(true);
    });

    test('passing in a number for day that is less than 1', function() {
        const testObject = new timestamp.Timestamp();

        let caughtException = false;
        try {
            testObject.setDay(0);
        } catch (e) {
            caughtException = true;
        }

        expect(caughtException).toBe(true);
    });

    test('only setting the seconds', function(){
        const testObject = new timestamp.Timestamp();
        testObject.setSeconds(30);
        
        expect(testObject.getSeconds()).toBe(30);
    });

    test('setting the seconds to something greater than 60', function() {
        const testObject = new timestamp.Timestamp();
    
        let caughtException = false;
        try {
            testObject.setSeconds(61);
        } catch (e) {
            caughtException = true;
        }

        expect(caughtException).toBe(true);
    });

    test('setting the seconds to something less than 0', function() {
        const testObject = new timestamp.Timestamp();

        let caughtException = false;
        try {
            testObject.setSeconds(-1);
        } catch (e) {
            caughtException = true;
        }

        expect(caughtException).toBe(true);
    });

    test('setting the seconds to null', function(){
        const testObject = new timestamp.Timestamp();

        let caughtException = false;
        try {
            testObject.setSeconds(null);
        } catch (e) {
            caughtException = true;
        }

        expect(caughtException).toBe(true);
    });

    test('create using a describe', function() {

        const testObject = new timestamp.Timestamp({
            year : 2019,
            month : timestamp.months.JANUARY,
            day : 15,
            hour : 10,
            minutes : 5,
            seconds : 10 
        });

        expect(testObject.getYear()).toBe(2019);
        expect(testObject.getMonth()).toBe(timestamp.months.JANUARY);
        expect(testObject.getHour()).toBe(10);
        expect(testObject.getDay()).toBe(15);
        expect(testObject.getMinutes()).toBe(5);
        expect(testObject.getSeconds()).toBe(10);
    });
});

describe('equality', function() {

    test('is equals to other when objects are empty', function() {
        const testObject = new timestamp.Timestamp();
        expect(testObject.equals(new timestamp.Timestamp())).toBe(true);
    });

    test('when only minutes are set for each, and are equivalent', function() {

        const testObject = new timestamp.Timestamp({
            minutes : 10
        });
        expect(testObject.equals(new timestamp.Timestamp({
            minutes : 10
        }))).toBe(true);
    });
    
    test('when only minutes are set for each, and are not equivalent', function() {
        const testObject = new timestamp.Timestamp({
            minutes : 10
        });
        expect(testObject.equals(new timestamp.Timestamp({
            minutes : 11
        }))).toBe(false);
    });

    test('when all fields are set, and are equivalent', function() {

        const describe = {
            year : 2019,
            day : 20,
            seconds : 30,
            month : timestamp.months.JANUARY,
            minutes : 10,
            hour : 15
        };

        const testObject = new timestamp.Timestamp(describe);
        expect(testObject.equals(new timestamp.Timestamp(describe))).toBe(true);
    });

    test('against null, return false', function() {
        const testObject = new timestamp.Timestamp();
        expect(testObject.equals(null)).toBe(false);
    });

    test('against undefined. return false', function() {
        const testObject = new timestamp.Timestamp();
        expect(testObject.equals()).toBe(false);
    });
});

describe('copy functionality', function() {
    test('copying when no describe given', function() {
        const testObject = new timestamp.Timestamp();
        expect(testObject.equals(testObject.copy())).toBe(true);
    });

    test('copying when minutes have been set', function() {
        const describe = {minutes : 10};

        const testObject = new timestamp.Timestamp(describe);
        expect(testObject.equals(testObject.copy())).toBe(true);
    });


    test('copying with years have been set', function() {
        const testObject = new timestamp.Timestamp({year : 2019});
        expect(testObject.equals(testObject.copy())).toBe(true);
    });

    test('copying with a full describe', function(){
        const testObject = new timestamp.Timestamp({
            year : 2019,
            day : 20,
            seconds : 10,
            month : timestamp.months.JANUARY,
            minutes : 6,
            hour : 10
        })

        expect(testObject.equals(testObject.copy())).toBe(true);
    });
});

describe('conversion to date', function() {

    test('converting described timestamp to date', function() {
        const testObject = new timestamp.Timestamp({
            year : 1970,
            day  : 1,
            seconds : 0,
            month : timestamp.months.JANUARY,
            minutes : 0,
            hour : 1
        });

        const expected = new Date(1970, 0, 1, 1, 0, 0);

        expect(expected.getTime()).toBe(testObject.toDate().getTime());
    });

});

describe('is before', function() {

    test('a is before b, return true', function() {
        const a = new timestamp.Timestamp({
            year : 1970,
            day  : 1,
            seconds : 0,
            month : timestamp.months.JANUARY,
            minutes : 0,
            hour : 1
        });
        const b = new timestamp.Timestamp({
            year : 1970,
            day  : 1,
            seconds : 0,
            month : timestamp.months.JANUARY,
            minutes : 1,
            hour : 1
        });

        expect(a.isBefore(b)).toBe(true);
    });

    test('a is not before b, return false', function() {
        const a = new timestamp.Timestamp({
            year : 1970,
            day  : 1,
            seconds : 0,
            month : timestamp.months.JANUARY,
            minutes : 2,
            hour : 1
        });
        const b = new timestamp.Timestamp({
            year : 1970,
            day  : 1,
            seconds : 0,
            month : timestamp.months.JANUARY,
            minutes : 1,
            hour : 1
        });

        expect(a.isBefore(b)).toBe(false);
    });

    test('a and b are equivalent, return false', function() {
        const a = new timestamp.Timestamp({
            year : 1970,
            day  : 1,
            seconds : 0,
            month : timestamp.months.JANUARY,
            minutes : 0,
            hour : 1
        });

        expect(a.isBefore(a.copy())).toBe(false);
    });

    test('compared against null, return false', function() {
        const a = new timestamp.Timestamp();
        expect(a.isBefore(null)).toBe(false);
    });

    test('compared against undefined, return false', function() {
        const a = new timestamp.Timestamp();
        expect(a.isBefore()).toBe(false);
    });
});