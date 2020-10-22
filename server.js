const http = require('http'),
  fs = require('fs'),
  os = require('os'),
  url = require('url');

console.log(os.type());

http
  .createServer((request, response) => {
    let Address = request.url;
    /* let urlObj = new URL(Address); */
    let urlObj = url.parse(Address, true);
    let filepath = ``;

    if (urlObj.pathname.includes(`documentation`)) {
      filepath = `${__dirname}/documentation.html`;
    } else {
      filepath = `${__dirname}/index.html`;
    }

    fs.readFile(filepath, (err, data) => {
      if (err) {
        throw err;
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
    });

    fs.appendFile(
      `log.txt`,
      `URL:   ${Address}  
	  Timestamp:  ${new Date()}
	  
	  `,
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log(`Added to log.`);
        }
      }
    );
  })
  .listen(8080);

console.log(`My first Node test server is running on Port 8080.`);
