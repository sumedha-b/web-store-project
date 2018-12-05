//this is starting point of the program!
//I have to configure Node.js as a server
var express = require('express'); //we have just installed
var http = require('http'); //This comes with Node.js
var bodyParser=require('body-parser');
var RESTAPI=require('./rest-api/config/rest-api-constant');
const fileUpload = require('express-fileupload');
var https = require('https');
var fs = require('fs');


var app = express(); //Instantiating Express
app.set('port', process.env.PORT || 4000);

var path = require('path');
var appDir = path.dirname(require.main.filename);
global.appRoot=appDir;

//To allow access of this data from different domain
//Access to XMLHttpRequest at 'http://localhost:4000/v3/profiles' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,user-access-token");
    res.header("Access-Control-Allow-Credentials", "*");
    //res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "x-access-token");
    next();
  });	

//To read data from incoming html form
//do not forget this
app.use(bodyParser.urlencoded({ extended: false }));

//to read json data from request body 
app.use(express.json());

// default options
//This is VVI to upload a file
app.use(fileUpload());



//Mapping static resource
//app.use('/',express.static(__dirname + '/rest-api/public'));
//Versioning + token validation will not work for app means below mapping 
require('./rest-api/router/auth-mapping')(app);

//profile-mapping file contains function definition 
var endPoint = express.Router();
//Filter 
endPoint.use(function (err, req, res, next) {
	/* We log the error internaly */
    console.log(err);
	/*
     * Remove Error's `stack` property. We don't want
     * users to see this at the production env
     */
    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }
	/* Finaly respond to the request */
    var  data={status:"fail",message:"Sorry, request could not process successfully."};
    res.status(err.statusCode || 500).json(data);
});
require('./rest-api/utils/mongodb-utils')();

//creating dummy logins
// var dataPusher=require('./rest-api/utils/login-data-pusher');
// dataPusher();

// var adDataPusher=require('./rest-api/utils/ad-data-pusher');
// adDataPusher();

// require('./rest-api/utils/product-data-pusher')();

//This is acting as middleware
//require('./rest-api/security/validate-token')(endPoint);

//Calling the router function
require('./rest-api/router/profile-router')(endPoint);
require('./rest-api/router/product-router')(endPoint);
require('./rest-api/router/vendor-router')(endPoint);
require('./rest-api/router/ad-router')(endPoint);
//here endpoint will be prefix with  v1
app.use(RESTAPI.REST_VERSION, endPoint);

//Hey create one http server using app setting on which 
//port number define inside express!
http.createServer(app).listen(app.get('port'), function(){
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
   
});

/* var sslOptions = {
    key: fs.readFileSync('./rest-api/ssl/server.key'),
    cert: fs.readFileSync('./rest-api/ssl/server.crt')
  };

 https.createServer(sslOptions,app).listen(9000, function(){
    console.log('...........NodeJS server listening on port..........9000 ' );
    console.log('...........NodeJS server listening on port.......... 9000');
    console.log('...........NodeJS server listening on port..........9000 ');
    console.log('...........NodeJS server listening on port.......... 9000');
});

*/



