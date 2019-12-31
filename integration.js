var name = require('./src/name');
var parent = require('./src/parent');
var user = require('./src/user');
var user = require('./src/user');


var http = require("http");
var options = {
  hostname: 'localhost',
  port: 8080,
  path: '/user',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  }
};

var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (body) {
        body = JSON.parse(body);

        var parentPostOptions = {
          hostname: 'localhost',
          port: 8080,
          path: '/user/' + body.id + '/parent',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          }
        };

        const testParent = new parent.Parent({
            name : new name.Name("Cody", "Zeitler")
        });

        var parentPostRequest = http.request(parentPostOptions, function(parentPostResponse) {
            parentPostResponse.setEncoding('utf8');
            parentPostResponse.on('data', function(body) {
                console.log(body);
            });
        });

        parentPostRequest.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

        parentPostRequest.write(JSON.stringify(testParent));
        parentPostRequest.end();
  });
});
req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});


const testUser = new user.User("cody1", "pass1");
req.write(JSON.stringify(testUser));
req.end();

