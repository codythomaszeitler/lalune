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
        // testObject = new server.Server();
        // userAsJson = {
        //     username : "testusername",
        //     password : "testpassword"
        // };
        // request = {};
        // request.body = userAsJson;

        // response = {};
        // response.response = 'NOT SET';
        // response.send = function(response) {
        //     this.response = response;
        // };

        // testDatabase = new database.Database();
    });

    test('posting a brand new user', async function() {
        // await testObject.postUser(request, response);

        // const expected = user.User.parse(userAsJson);
        // expect(testDatabase.isWritten(expected)).toBe(true);

        // expect(response.response).toEqual(userAsJson);
    });
});