class ChildInsertGenerator {
    generate(child) {

        let id = null;
        if (child.id !== undefined) {
            id = child.id;
        }

        let parentid = null;
        if (child.parentid !== undefined) {
            parentid = child.parentid;
        }

        const query = {
            text : "INSERT INTO child(firstname, lastname, middlename, id, parentid) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            values : [child.getFirstName(), child.getLastName(), child.getMiddleName(), id, parentid]
        };

        return query;
    }
};

module.exports = {
    ChildInsertGenerator : ChildInsertGenerator
}