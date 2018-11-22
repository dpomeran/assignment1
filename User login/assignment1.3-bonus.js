var http = require ('http');
var fs = require('fs');
var path = require('path'); 
var { parse } = require('querystring');

var mimeTypes = { ".html":"text/html", ".jpeg":"image/jpeg", ".jpg": "image/jpeg", ".png": "image/png", ".js":"text/javascript", ".css":"text/css"}; 
var fileName;

http.createServer(function(req,res){
	if(req.method == "POST")
	{
		var body = '';
		req.on('data', function (chunk){
			body += chunk.toString();
		});
		req.on('end', function (){
			var file_email ='';
			var file_password='';
		
			var email = parse(body).email;
			var password = parse(body).password;					
			
			fs.readFile('password.txt', 'utf8', function (err, data) {
				if (err) throw err;
				var filedata = JSON.parse(data);
				file_email = filedata.email;
				file_password=filedata.password;
				console.log("file email " + file_email);
				console.log('file password: '+ file_password);

			if((email=== file_email) && (password === file_password))
			{
			  console.log('It worked!');
			  res.writeHead(302, {"Location": 'index.html'});	
			  res.end();			}
			else
			{
			  console.log('Didnt work :/(');
			  res.write("Access Denied!!!!");
			  res.end();
			}
			});
		});
	}
	else
	{
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
				res.writeHead(302, {'Location': 'userlogin.html'});
				res.end();
			}
		}
		else
		{
			res.writeHead(404, {'Content-type':'text/plain'});
			res.write("404 Not Found");
			res.end();
		}
	}
}).listen(8080);
console.log('listening on port 8080');
