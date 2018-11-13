var http = require ('http');
var fs = require('fs');
var path = require('path'); 
var { parse } = require('querystring');

http.createServer(function(req,res){
	var fileStream = fs.createReadStream("./index.html");
    fileStream.pipe(res); 
	if(req.method == "POST")
	{
		var body = '';
		req.on('data', function (chunk){
			body += chunk.toString();
		});
		req.on('end', function (){
			var filename = parse(body).filename;
			var filedata = parse(body).textfield;
			fs.appendFile(filename, filedata, function(err){
				if(err) throw err;
			});
		});
	}
		else
	{
		fileStream.pipe(res);
	}
}).listen(8080);
console.log('listening on port 80');