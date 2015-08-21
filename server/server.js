process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var socketIO = require('./backend/app/config/socket.io'),
    express = socketIO.express,
    app = socketIO.app,
    server = socketIO.server,
    io = socketIO.io,
    livereload = require('express-livereload'),
    bodyParser = require('body-parser'),
    port, pingRouter, personRouter;

io.on('connection', function (socket) {
    io.emit('connections', {action: 'connected', msg: 'a new user connected'});
    socket.on('disconnect', function () {
        io.emit('connections', {action: 'disconnected', msg: 'a user disconnected'});
        //var clientInfo = clients[socket.id];
        //clients[socket.id] = undefined;
        //io.emit('user disconnected', clientInfo.customId+ ' DISCONNECTED');
    });
    //socket.on('chat message', function (msg) {
    //    //socket.broadcast.emit('hi');
    //    io.emit('chat message', msg);
    //});
    //socket.on('user connected', function (msg) {
    //    var clientInfo = {};
    //    clientInfo.customId = msg.nickname;
    //    clientInfo.clientId = socket.id;
    //    clients[clientInfo.clientId] = clientInfo;
    //
    //    io.emit('user connected', msg);
    //});
});


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


if (process.env.NODE_ENV === 'development') {
    /* dev mode */
    app.use(express.static('./frontend/build'));
    livereload(app, config = {watchDir: './frontend/build'});
    console.log('using watching frontend build');
} else {
    /* production mode */
    app.use(express.static('./frontend/dist'));
    console.log('using frontend dist');
}

module.exports = app;


// START THE SERVER
port = process.env.PORT || 8080;        // set our port
server.listen(port);
console.log('Server running on port ' + port);