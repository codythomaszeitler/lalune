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

    test('posting a brand new user', async function() {
        await testObject.postUser(request, response);

        const expected = user.User.parse(userAsJson);
        expect(testDatabase.isWritten(expected)).toBe(true);

        expect(response.response.username).toBe(userAsJson.username);
        expect(response.response.password).toBe(userAsJson.password);
    });

    test('posting a user that already exists in the database, send back an error message', async function() {
        testDatabase.write = function(object) {
            throw new Error();
        };
        await testObject.postUser(request, response);

        expect(response.response.message).toBe("Username [" + userAsJson.username + "] " + 
                "already exists within the database");
        expect(response.response.isError).toBe(true);
    });
});