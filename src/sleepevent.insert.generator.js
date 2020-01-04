class SleepEventInsertGenerator {
    generate(sleepEvent) {
        const query = {
            text : "INSERT INTO sleepevent(fromtimestamp, totimestamp, type, id, childid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            values : [sleepEvent.start().toDate(), sleepEvent.end().toDate(), sleepEvent.timeOfDay, sleepEvent.id, sleepEvent.childid]
        };
        return query;
    }
};

module.exports = {
    SleepEventInsertGenerator : SleepEventInsertGenerator
};