var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bears'); // connect to our database


// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

//ping api
var pingRouter = require('./app/api/ping');
app.use('/api', pingRouter);

//bear api
var bearRouter = require('./app/api/bear');
app.use('/api/bears', bearRouter);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server running on port ' + port);