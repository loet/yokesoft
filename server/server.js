var express = require('express'),
    app = express(),
    livereload = require('express-livereload'),
    bodyParser = require('body-parser'),
    port, pingRouter, personRouter;

//parse json objects in request body
app.use(bodyParser.json());

//connect to db
require('./backend/app/config/mongodb');

//ping router
pingRouter = require('./backend/app/routers/ping.routes.js');
app.use('/api', pingRouter);

//person router
personRouter = require('./backend/app/routers/person/person.routes.js');
app.use('/api/persons', personRouter);

/* production mode */
//app.use(express.static('./frontend/dist'));

/* dev mode */
app.use(express.static('./frontend/app'));
app.use('/bower_components', express.static('./frontend/bower_components'));
livereload(app, config={watchDir: './frontend/app'});

module.exports = app;


// START THE SERVER
port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('Server running on port ' + port);