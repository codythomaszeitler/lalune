class Timestamp {
    constructor(describe) {
        this.year = 0;
        this.month = months.NOT_SET;
        this.day = 0;
        this.minutes = 0;
        this.seconds = 0;
        
        if (describe !== undefined) {
            this.setWithDescribe(describe);
        }
    }

    setWithDescribe(describe) {
        if (describe.year !== undefined) {
            this.year = describe.year;
        }
        if (describe.day !== undefined) {
            this.day = describe.day;
        }
        if (describe.seconds !== undefined) {
            this.seconds = describe.seconds;
        }
        if (describe.month !== undefined) {
            this.month = describe.month;
        }
        if (describe.minutes !== undefined) {
            this.minutes = describe.minutes;
        }
        if (describe.hour !== undefined) {
            this.hour = describe.hour;
        }
    }

    static parse(details) {
        const parsed = new Timestamp(details);
        return parsed;
    }

    getYear() {
        return this.year;
    }

    setYear(year) {
        if (year != null) {
            this.year = year;
        }
    }

    getMonth() {
        return this.month;
    }

    setMonth(month) {
        this.month = month;
    }
    
    getDay() {
        return this.day;
    }

    setDay(day) {
        if (day === null || 
            day > Timestamp.getMaxDays() || day < Timestamp.getMinDays()) {
            throw new InvalidTimestamp();
        }

        this.day = day;
    }

    static getMinDays() {
        return 1;
    }

    static getMaxDays() {
        return 31;
    }

    getHour() {
        return this.hour;
    }

    setHour(hour) {
        this.hour = hour;
    }

    getMinutes() {
        return this.minutes;
    }

    setMinutes(minutes) {
        this.minutes = minutes;
    }

    getSeconds() {
        return this.seconds;
    }

    setSeconds(seconds) {
        if (seconds === null || 
            seconds < Timestamp.getMinSeconds() || Timestamp.getMaxSeconds() < seconds) {
            throw new InvalidTimestamp();
        }

        this.seconds = seconds;
    }

    static getMinSeconds() {
        return 0;
    }

    static getMaxSeconds() {
        return 60;
    }

    isBefore(timestamp) {
        if (timestamp === null || timestamp === undefined) {
            return false;
        }

        return this.toDate().getTime() < timestamp.toDate().getTime();
    }

    toDate() {
        const date = new Date(
            this.year,
            this._parseMonthOffset(this.month),
            this.day,
            this.hour,
            this.minutes,
            this.seconds,
            0
        );

        return date;
    }

    static fromDate(from) {
        const timestamp = new Timestamp({
            year : from.getFullYear(),
            month : Timestamp._parseMonth(from.getMonth()),
            day : from.getDate(),
            hour : from.getHours(),
            minutes : from.getMinutes(),
            seconds : from.getSeconds()
        });

        return timestamp;
    }

    static _parseMonth(offset) {
        const mapping = {};
        mapping[0] = months.JANUARY;
        return mapping[offset];
    }

    _parseMonthOffset(month) {
        let offset = -1;
        if (month === months.JANUARY) {
            offset = 0;
        }

        return offset;
    }

    equals(object) {

        if (object === null || object === undefined) {
            return false;
        }

        let isEquals = (this.year === object.year);
        isEquals = isEquals && (this.day === object.day);
        isEquals = isEquals && (this.seconds === object.seconds);
        isEquals = isEquals && (this.month === object.month);
        isEquals = isEquals && (this.minutes === object.minutes);
        isEquals = isEquals && (this.hour === object.hour);
        return isEquals;
    }

    copy() {
        const copy = new Timestamp();

        copy.year = this.year;
        copy.day = this.day;
        copy.seconds = this.seconds;
        copy.month = this.month;
        copy.minutes = this.minutes;
        copy.hour = this.hour;

        return copy;
    }
}

class InvalidTimestamp extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

const months = {
    NOT_SET : 'Month was not set',
    JANUARY : 'January',
};
Object.freeze(months);

module.exports = {
    Timestamp : Timestamp,
    months : months,
    InvalidTimestamp : InvalidTimestamp
}