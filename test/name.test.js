const name = require('../src/name');

describe('equality', function() {
    test('when name has first and last name', function() {
        const testObject = new name.Name("Cody", "Zeitler");
        expect(testObject.equals(new name.Name("Cody", "Zeitler"))).toBe(true);
    });

    test('when name has first, last, and middle name', function() {
        const testObject = new name.Name("Cody", "Zeitler", "Thomas");
        expect(testObject.equals(new name.Name("Cody", "Zeitler", "Thomas"))).toBe(true);
    });

    test('when middle name is different', function() {
        const testObject = new name.Name("Cody", "Zeitler", "Thomas");
        expect(testObject.equals(new name.Name("Cody", "Zeitler", "different"))).toBe(false);
    });

    test('against null', function() {
        const testObject = new name.Name("Cody", "Zeitler", "Thomas");
        expect(testObject.equals(null)).toBe(false);
    });

    test('against object of another type', function() {
        const sleepevent = require('../src/sleepevent');
        const testObject = new name.Name("Cody", "Zeitler", "Thomas");
        expect(testObject.equals(new sleepevent.SleepEvent())).toBe(false);
    });

});