const name = require('./name');
const parent = require('./parent');

class ParentMapper {

    constructor() {
        this.requiredRows = [
            'firstname', 'lastname', 'middlename', 'userid', 'id'
        ];
    }

    convertFromRow(databaseRow) {

        if (databaseRow === null || databaseRow === undefined) {
            throw new Error("Cannot convert parent without a database row");
        }

        for (let i = 0; i < this.requiredRows.length; i++) {
            let requiredRow = this.requiredRows[i];
            if (databaseRow[requiredRow] === undefined) {
                throw new Error("While converting parent within ParentMapper, database row did not have '" + 
                    requiredRow + "' attribute")
            }            
        }

        const converted = new parent.Parent({
            name : new name.Name(databaseRow.firstname, databaseRow.lastname, databaseRow.middlename)
        });
        converted.parentid = databaseRow.parentid;
        converted.id = databaseRow.id;

        return converted;
    }
};

module.exports = {
    ParentMapper : ParentMapper
}