const parentmapper = require('./parent.mapper');

class ParentFinder {

    constructor(database) {
        this.database = database;
        this.parentMapper = new parentmapper.ParentMapper();
    }

    async findById(id) {
        const result = await this.database.read("SELECT * FROM parent WHERE id = " + id);
        return this.parentMapper.convertFromRow(result.rows[0]);
    }
};

module.exports = {
    ParentFinder : ParentFinder
}