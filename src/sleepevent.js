class SleepEvent {
    constructor (startTime, endTime, type) {
        if (startTime !== undefined) {
            this.startTime = startTime.copy();
        }
        if (endTime !== undefined) {
            this.endTime = endTime.copy();
        }
        
        this.type = type;
    }

    isMorning() {
        return this.type === types.Morning;
    }

    isNap() {
        return this.type === types.Nap;
    }

    isNight() {
        return this.type === types.Night;
    }

    equals(object) {

        if (object === null || object === undefined) {
            return false;
        }
        
        let isEquals = this.startTime.equals(object.startTime);
        isEquals = isEquals && this.endTime.equals(object.endTime);
        isEquals = isEquals && this.type === object.type;

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