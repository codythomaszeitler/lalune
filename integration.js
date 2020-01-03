var name = require('./src/name');
var parent = require('./src/parent');
var user = require('./src/user');
var user = require('./src/user');
var child = require('./src/child');

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
    res.on('data', function (userbody) {
        userbody = JSON.parse(userbody);

        var parentPostOptions = {
          hostname: 'localhost',
          port: 8080,
          path: '/user/' + userbody.id + '/parent',
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
            parentPostResponse.on('data', function(parentbody) {
                console.log(parentbody);

                parentbody = JSON.parse(parentbody);

                var childPostOptions = {
                  hostname: 'localhost',
                  port: 8080,
                  path: '/user/' + userbody.id + '/parent/' + parentbody.id + '/child',
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  }
                };
    
                const testChild = new child.Child({
                  name : new name.Name("Cody Jr.", "Zeitler")
                });
    
    
                var childPostRequest = http.request(childPostOptions, function(childPostResponse) {
    
                  childPostResponse.setEncoding('utf8');
                  childPostResponse.on('data', function(body) {
                    console.log(body);
                  });
    
                });
    
                childPostRequest.write(JSON.stringify(testChild));
                childPostRequest.end();
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

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const testUser = new user.User("cody" + getRandomArbitrary(0, Math.floor(Number.MAX_SAFE_INTEGER)), "pass1");
console.log(JSON.stringify(testUser));
req.write(JSON.stringify(testUser));
req.end();


