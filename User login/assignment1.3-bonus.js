var http = require ('http');
var fs = require('fs');
var path = require('path'); 
var { parse } = require('querystring');

http.createServer(function(req,res){
	var fileStream = fs.createReadStream("./userlogin.html");
	fileStream.pipe(res); 
	if(req.method == "POST")
	{
		var body = '';
		req.on('data', function (chunk){
			body += chunk.toString();
		});
		req.on('end', function (){
			var email= '';
			var password = '';
			var file_email ='';
			var file_password='';
		
			email = parse(body).email;
			password = parse(body).password;					
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
			  res.writeHead(302, {"Location": "https://www.google.com/"});
			  res.end();
			}
			});
		});
	}
}).listen(8080);
console.log('listening on port 8080');
