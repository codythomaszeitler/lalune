const timestamp = require('../src/timestamp');
const sleepevent = require('../src/sleepevent');

describe('creating a sleep event', function(){

    test('for the morning', function() {

        const type = sleepevent.types.Morning;

        let startTime = new timestamp.Timestamp();
        let endTime = new timestamp.Timestamp();
        const testObject = new sleepevent.SleepEvent(startTime, endTime, type);

        expect(testObject.isMorning()).toBe(true);
        expect(testObject.isNight()).toBe(false);
        expect(testObject.isNap()).toBe(false);
    });

    test('for the night', function() {

        const type = sleepevent.types.Night;

        let startTime = new timestamp.Timestamp();
        let endTime = new timestamp.Timestamp();
        const testObject = new sleepevent.SleepEvent(startTime, endTime, type);

        expect(testObject.isNight()).toBe(true);
        expect(testObject.isMorning()).toBe(false);
        expect(testObject.isNap()).toBe(false);
    });

    test('for a nap', function() {

        const type = sleepevent.types.Nap;

        let startTime = new timestamp.Timestamp();
        let endTime = new timestamp.Timestamp();
        const testObject = new sleepevent.SleepEvent(startTime, endTime, type);

        expect(testObject.isNap()).toBe(true);
        expect(testObject.isNight()).toBe(false);
        expect(testObject.isMorning()).toBe(false);
    });
});

describe('equality', function() {

    let from;
    let to;
    beforeEach(function() {
        from = new timestamp.Timestamp({
            hour : 10
        });
        to = new timestamp.Timestamp({
            hour : 10
        });
    });

    test('is equals to other', function() {
        const testObject = new sleepevent.SleepEvent(from, to, sleepevent.types.Morning);

        expect(testObject.equals(
            new sleepevent.SleepEvent(from, to, sleepevent.types.Morning)))
            .toBe(true);
    });

    test('when id is not equivalent', function() {
        const testObject = new sleepevent.SleepEvent(from, to, sleepevent.types.Morning);
        testObject.id = 100;
        const other = new sleepevent.SleepEvent(from, to, sleepevent.types.Morning);
        other.id = 200;

        expect(testObject.equals(other)).toBe(false);
    });

    test('when child id is not equivalent', function() {
        const testObject = new sleepevent.SleepEvent(from, to, sleepevent.types.Morning);
        testObject.id = 100;
        testObject.childid = 300;
        const other = new sleepevent.SleepEvent(from, to, sleepevent.types.Morning);
        other.id = 100;
        other.childid = 500;

        expect(testObject.equals(other)).toBe(false);
    });

    test('when compared against null, return false', function() {
        const testObject = new sleepevent.SleepEvent();
        expect(testObject.equals(null)).toBe(false);
    });

    test('when compare against undefined, return false', function(){
        const testObject = new sleepevent.SleepEvent();
        expect(testObject.equals()).toBe(false);
    });
});

describe('Parsing from JSON', function() {

    let details;
    beforeEach(function() {
        details = {
            startTime : {
                year : 2010,
                month : 'JANUARY',
                day : 1,
                minutes : 0,
                seconds : 0
            },
            endTime : {
                year : 2010,
                month : 'JANUARY',
                day : 1,
                minutes : 10,
                seconds : 0
            },
            sleepType : 'Morning'
        };
    });
    test('with details all set', function() {
        let expectedBefore = new timestamp.Timestamp({
            year : 2010,
            month : 'JANUARY',
            day : 1,
            minutes : 0,
            seconds : 0
        });

        let expectedAfter = new timestamp.Timestamp({
            year : 2010,
            month : 'JANUARY',
            day : 1,
            minutes : 10,
            seconds : 0
        });

        const testObject = sleepevent.SleepEvent.parse(details);
        expect(testObject.start().equals(expectedBefore)).toBe(true);
        expect(testObject.end().equals(expectedAfter)).toBe(true);
        expect(testObject.isMorning()).toBe(true);
    }); 
});