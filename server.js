var http = require('http');
require('string.prototype.startswith');

Object.prototype.log = function() {
	try {
		console.log(JSON.stringify(this))
 	} catch(ex) {
 		console.log(this)
 	}
}

Object.prototype.string = function() {
	return JSON.stringify(this)
}

var server = http.createServer(function(request, response) {

	if (request.url ===  '/headers') {
		response.write(request.headers.string() + '\n')
		response.end();
		return;
	}

	if (request.url === '/version') {
		response.write(request.httpVersion + '\n')
		response.end();
		return;
	}

	if (request.url.startsWith('/headers/')) {
		url_rest = request.url.substring('/headers/'.length);
		if (request.headers.hasOwnProperty(url_rest)) {
			response.write(request.headers[url_rest] + '\n');
		} else {
			response.writeHead(404);
			response.write('404 not found\n')
		}
		response.end();
		return;
	}

	response.write('Usage:\n');
	response.write('\t/version\n');
	response.write('\t/headers\n');
	response.write('\t/headers/<header>\n');
    response.end();
});


server.listen(8080);
