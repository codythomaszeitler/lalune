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

    test('is equals to other', function() {

        const from = new timestamp.Timestamp({
            hour : 10
        });
        const to = new timestamp.Timestamp({
            hour : 10
        });

        const testObject = new sleepevent.SleepEvent(from, to, sleepevent.types.Morning);

        expect(testObject.equals(
            new sleepevent.SleepEvent(from, to, sleepevent.types.Morning)))
            .toBe(true);
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