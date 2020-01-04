const sleepevent = require('./sleepevent');
const childfinder = require('./child.finder');
const sleepeventmapper = require('./sleepevent.mapper');

class SleepEventPostTransaction {
    constructor(details) {
        this.childid = details.childid;
        this.sleepEvent = sleepevent.SleepEvent.parse(details.sleepEventDetails);
        this.database = details.database;
        this.childFinder = new childfinder.ChildFinder(this.database);
        this.sleepEventMapper = new sleepeventmapper.SleepEventMapper();
        this.child = null;
    }

    async setup() {
        this.child = await this.childFinder.findById(this.childid);
    }

    async execute() {
        this.sleepEvent.childid = this.child.id;
        console.log(JSON.stringify(this.sleepEvent.timeOfDay));
        const result = await this.database.write(this.sleepEvent);

        return this.sleepEventMapper.convertFromRow(result.rows[0]);
    }

};

module.exports = {
    SleepEventPostTransaction : SleepEventPostTransaction  
};