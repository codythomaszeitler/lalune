const userinsertgenerator = require('./user.insert.generator');
const parentinsertgenerator = require('./parent.insert.generator');
const childinsertgenerator = require('./child.insert.generator');
const sleepeventinsertgenerator = require('./sleepevent.insert.generator');

class DatabaseStatementGenerator {
    generateInsertStatement(object) {

        if (object === null || object === undefined) {
            throw new Error("Cannot generate query without an object");
        }

        if (object.type === null || object.type === undefined) {
            throw new Error("To generate an insert statement, the object must have a 'type' attribute");
        }

        let query = null;
        if (object.type === 'users') {
            const generator = new userinsertgenerator.UserInsertGenerator();
            query = generator.generate(object);
        } else if (object.type === 'parent') {
            const generator = new parentinsertgenerator.ParentInsertGenerator();
            query = generator.generate(object);
        } else if (object.type === 'child') {
            const generator = new childinsertgenerator.ChildInsertGenerator();
            query = generator.generate(object);
        } else if (object.type === 'sleepevent') {
            const generator = new sleepeventinsertgenerator.SleepEventInsertGenerator();
            query = generator.generate(object);
        } else {
            throw new Error("The object with type [" + object.type + "] is not supported for query conversion")
        }
        return query;
    }
};

module.exports = {
    DatabaseStatementGenerator : DatabaseStatementGenerator
};