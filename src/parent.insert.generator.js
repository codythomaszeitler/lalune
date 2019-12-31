class ParentInsertGenerator {
    generate(parent) {

        if (parent === null || parent === undefined) {
            throw new Error("Cannot generate insert query without a parent");
        }

        const query = {
            text : "INSERT INTO parent(firstname, lastname, middlename, id, userid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            values : [parent.getFirstName(), parent.getLastName(), parent.getMiddleName(), parent.id, parent.userid]
        };
        return query;
    }
};

module.exports = {
    ParentInsertGenerator : ParentInsertGenerator
}