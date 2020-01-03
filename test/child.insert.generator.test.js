const child = require('../src/child');
const generator = require('../src/child.insert.generator');
const name = require('../src/name');

describe('create child insert statement', function() {

    let testObject;
    beforeEach(function() {
        testObject = new generator.ChildInsertGenerator();
    });

    test('with first, middle, and last name present', function() {
        const testChild = new child.Child({
            name : new name.Name("Cody", "Zeitler", "Thomas"),
            id : 200,
            parentid : 300
        });

        const query = testObject.generate(testChild);
        expect(query.text).toBe("INSERT INTO child(firstname, lastname, middlename, id, parentid) VALUES ($1, $2, $3, $4, $5) RETURNING *");
        expect(query.values).toEqual(["Cody", "Zeitler", "Thomas", 200, 300]);
    });
});