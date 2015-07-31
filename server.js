var app = require('express')(),        // init call express
    bodyParser = require('body-parser'),
    port, pingRouter, personRouter;

//parse json objects in request body
app.use(bodyParser.json());

//connect to db
require('./app/config/mongodb');

//ping router
pingRouter = require('./app/routers/ping.routes');
app.use('/api', pingRouter);

//person router
personRouter = require('./app/routers/person/person.routes');
app.use('/api/persons', personRouter);


// START THE SERVER
port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('Server running on port ' + port);