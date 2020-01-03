const server = require('../src/server');
const user = require('../src/user');
const database = require('./database.mock');

describe('Post User', function() {

    let testObject;
    let userAsJson;

    let request;
    let response;

    let testDatabase;

    beforeEach(function() {
        userAsJson = {
            username : "testusername",
            password : "testpassword"
        };
        request = {};
        request.body = userAsJson;

        response = {};
        response.response = 'NOT SET';
        response.send = function(response) {
            this.response = response;
        };

        testDatabase = new database.Database();
        testObject = new server.Server("localhost", 8080, testDatabase);

    });

    test('posting a new child', async function() {

    });    
});