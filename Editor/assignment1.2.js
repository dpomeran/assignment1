var http = require ('http');
var fs = require('fs');
var path = require('path'); 
var { parse } = require('querystring');

http.createServer(function(req,res){
	var fileStream = fs.createReadStream("./index.html");
	if(req.method == "POST")
	{
	    fileStream.pipe(res); 
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
		res.write("Your submission has been saved!");
		res.end();
		});
	}
		else
	{
		fileStream.pipe(res);
	}
}).listen(8080);
console.log('listening on port 8080');