var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port, pingRouter, personRouter;

//parse json objects in request body
app.use(bodyParser.json());

//connect to db
require('./app/config/mongodb');

//ping router
pingRouter = require('./app/routers/ping.routes.js');
app.use('/api', pingRouter);

//person router
personRouter = require('./app/routers/person/person.routes.js');
app.use('/api/persons', personRouter);

//app.use('/frontend', express.static('./frontend'));
app.use(express.static('./frontend'));
app.use('/dev', express.static('./../frontend/app'));

module.exports = app;


// START THE SERVER
port = process.env.PORT || 3000;        // set our port
app.listen(port);
console.log('Server running on port ' + port);