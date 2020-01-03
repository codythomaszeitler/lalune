var child = require('../src/child.js');
var name = require('../src/name.js');
var sleepevent = require('../src/sleepevent');
var timestamp = require('../src/timestamp');

describe('set childs name', function(){

   test('when has middle name', function() {
      let testObject = new child.Child();

      let testName = new name.Name('Cody', 'Zeitler', 'Thomas');
      testObject.setName(testName);
   
      expect(testObject.getFirstName()).toEqual('Cody');
      expect(testObject.getMiddleName()).toEqual('Thomas');
      expect(testObject.getLastName()).toEqual('Zeitler');
   });

   test('when does not have middle name', function(){

   });

   test('when last name is not given', function(){

   });

   test('when first name is not given', function(){

   });
});

describe('child equality with other children', function() {

   test('child is equal with first and last name', function() {
      const testObject = new child.Child({
         name : new name.Name("Cody", "Zeitler")
      });

      const other = new child.Child({
         name : new name.Name("Cody", "Zeitler")
      })

      expect(testObject.equals(other)).toBe(true);
   });

   test('against null', function(){
      const testObject = new child.Child({
         name : new name.Name("Cody", "Zeitler")
      });

      expect(testObject.equals(null)).toBe(false);
   });

   test('against undefined', function(){
      const testObject = new child.Child({
         name : new name.Name("Cody", "Zeitler")
      });

      expect(testObject.equals()).toBe(false);
   });

   test('with id defined', function() {
      const testObject = new child.Child({
         name : new name.Name("Cody", "Zeitler"),
         id : 250
      });

      const expected = new child.Child({
         name : new name.Name("Cody", "Zeitler"),
         id : 250
      });

      expect(testObject.equals(expected)).toBe(true);
   });

   test('with ids not equivalent', function() {
      const testObject = new child.Child({
         name : new name.Name("Cody", "Zeitler"),
         id : 250
      });

      const expected = new child.Child({
         name : new name.Name("Cody", "Zeitler"),
         id : 100
      });

      expect(testObject.equals(expected)).toBe(false);
   });

   test('when parent ids are not equivalent', function() {
      const testObject = new child.Child({
         name : new name.Name("Cody", "Zeitler"),
         id : 250,
         parentid : 300
      });

      const expected = new child.Child({
         name : new name.Name("Cody", "Zeitler"),
         id : 250,
         parentid : 350
      });

      expect(testObject.equals(expected)).toBe(false);
   });
});

describe('logging child sleep', function(){

   test('taking a short nap', function() {
      const testObject = new child.Child({
         name : new name.Name("Cody", "Zeitler")
      });

      let from = new timestamp.Timestamp({
         year : 2019,
         month : timestamp.months.JANUARY,
         day : 21,
         hour : 11,
         minutes : 30,
         seconds : 0
      });
      let to = new timestamp.Timestamp({
         year : 2019,
         month : timestamp.months.JANUARY,
         day : 21,
         hour : 12,
         minutes : 30,
         seconds : 0
      });

      testObject.slept(from, to, sleepevent.types.Morning);

      const expected  = new sleepevent.SleepEvent(from, to, sleepevent.types.Morning);
      expect(containsSleepEvent(testObject, expected)).toBe(true);
   });

   test('logging sleep when to is before from', function() {
      const testObject = new child.Child({
         name : new name.Name("Cody", "Zeitler")
      });

      let from = new timestamp.Timestamp({
         year : 2019,
         month : timestamp.months.JANUARY,
         day : 21,
         hour : 11,
         minutes : 30,
         seconds : 0
      });
      let to = new timestamp.Timestamp({
         year : 2019,
         month : timestamp.months.JANUARY,
         day : 21,
         hour : 10,
         minutes : 30,
         seconds : 0
      });

      let caughtException = false;
      try {
         testObject.slept(from, to, sleepevent.types.Morning);
      } catch (e) {
         caughtException = true;
      }
      expect(caughtException).toBe(true);
   });
});

function containsSleepEvent(child, sleepEvent) {

   let containsSleepEvent = false;

   const sleepEvents = child.getSleepEvents();
   for (let i = 0; i < sleepEvents.length; i++) {
      const event = sleepEvents[i];
      if (event.equals(sleepEvent)) {
         containsSleepEvent = true;
         break;
      }
   }

   return containsSleepEvent;
}