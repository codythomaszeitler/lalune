const child = require('./child');
const name = require('./name');
const missingfield = require('./missing.field.exception');

class ChildMapper {
    constructor() {

    }

    convertFromRow(row) {

        if (row === null) {
            throw new Error("Cannot convert null row");
        }

        if (row.firstname === undefined || row.lastname === undefined) {
           throw new missingfield.MissingFieldException("Row did not have firstname or lastname");
        }

        const converted = new child.Child({
            name : new name.Name(row.firstname, row.lastname, row.middlename)
        });

        if (row.id !== undefined) {
            converted.id = parseInt(row.id, 10);
        } 

        if (row.parentid !== undefined) {
            converted.parentid = parseInt(row.parentid, 10);
        } 

        return converted;
    }
};

module.exports = {
    ChildMapper : ChildMapper
}