//Devora Pomrantz
//MSIN 636
//Task 1: Create a dynamic response header web server.

var fs = require('fs');
var http = require('http');
var path = require('path');

var mimeTypes = { ".html":"text/html", ".jpeg":"image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".js":"text/javascript", ".css":"text/css"}; 
var fileName;
http.createServer(function(req,res){
	fileName = path.join(process.cwd(),req.url);
	if(fs.existsSync(fileName))
	{
		if(!fs.lstatSync(fileName).isDirectory())
		{
			fs.readFile(fileName, function(err,data){
				var url = fileName;
				res.writeHead(200,{'Content-Type':mimeTypes[path.extname(fileName)]});
				res.write(data);
				res.end();
		});
		}
		else
		{
			res.writeHead(302, {'Location': 'index.html'});
			res.end();
		}
	}
	else
	{
		res.writeHead(404, {'Content-type':'text/plain'});
		res.write("404 Not Found");
		res.end();
	}
}).listen(8080);
console.log('Listening on 8080');