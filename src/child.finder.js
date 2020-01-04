const childmapper = require('./child.mapper');

class ChildFinder {
    constructor(database) {
        this.database = database;
        this.childMapper = new childmapper.ChildMapper();
    }

    async findById(id) {
        const result = await this.database.read("SELECT * FROM child WHERE id = " + id);
        return this.childMapper.convertFromRow(result.rows[0]);
    }
};

module.exports = {
    ChildFinder : ChildFinder
}