class UserInsertGenerator {
    generate(user) {
        if (user === null || user === undefined) {
            throw new Error("Cannot generate an insert statement with a user");
        }

        const query = {
            text : "INSERT INTO users(username, password, id) VALUES ($1, $2, $3)",
            values : [user.username, user.password, user.id]
        };
        return query;
    }
};

module.exports = {
    UserInsertGenerator : UserInsertGenerator
}