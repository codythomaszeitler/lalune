const sleepevent = require('./sleepevent');
const timestamp = require('./timestamp');

class SleepEventMapper {
    convertFromRow(row) {
        const converted = new sleepevent.SleepEvent(
            timestamp.Timestamp.fromDate(row.fromtimestamp), 
            timestamp.Timestamp.fromDate(row.totimestamp),
            row.type
        );
        converted.id = row.id;
        converted.childid = row.childid;
        return converted;
    }
};

module.exports = {
    SleepEventMapper : SleepEventMapper
};