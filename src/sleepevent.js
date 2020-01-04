const timestamp = require('./timestamp');

class SleepEvent {
    constructor (startTime, endTime, timeOfDay) {
        if (startTime !== undefined) {
            this.startTime = startTime.copy();
        }
        if (endTime !== undefined) {
            this.endTime = endTime.copy();
        }
        
        this.timeOfDay = timeOfDay;
        this.type = 'sleepevent';
    }

    static parse(details) {
        const start = timestamp.Timestamp.parse(details.startTime);
        const end = timestamp.Timestamp.parse(details.endTime);
        const timeOfDay = details.timeOfDay;

        return new SleepEvent(start, end, timeOfDay);
    }

    start() {
        return this.startTime.copy();
    }

    end() {
        return this.endTime.copy();
    }

    isMorning() {
        return this.timeOfDay === types.Morning;
    }

    isNap() {
        return this.timeOfDay === types.Nap;
    }

    isNight() {
        return this.timeOfDay === types.Night;
    }

    equals(object) {

        if (object === null || object === undefined) {
            return false;
        }
        
        let isEquals = this.startTime.equals(object.startTime);
        isEquals = isEquals && this.endTime.equals(object.endTime);
        isEquals = isEquals && this.timeOfDay === object.timeOfDay;
        isEquals = isEquals && (this.id === object.id);
        isEquals = isEquals && (this.childid === object.childid);

        return isEquals;
    }
}

const types = {
    Morning : "Morning",
    Nap : "Nap",
    Night : "Night"
}
Object.freeze(types);

module.exports = {
    SleepEvent : SleepEvent,
    types : types
};