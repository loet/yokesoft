process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var socketIO = require('./server/backend/app/config/socket.io'),
    express = socketIO.express,
    app = socketIO.app,
    server = socketIO.server,
    io = socketIO.io,
    livereload = require('express-livereload'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    port, pingRouter, personRouter, allowCrossDomain;

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

app.use(cors());


//connect to db
require('./server/backend/app/config/mongodb');

//ping router
pingRouter = require('./server/backend/app/routers/ping.routes.js');
app.use('/api', pingRouter);

//person router
personRouter = require('./server/backend/app/routers/person/person.routes.js');
app.use('/api/persons', personRouter);

if (process.env.NODE_ENV === 'forever') {
    app.use(express.static('./server/frontend/build'));
    //livereload(app, config = {watchDir: './frontend/build'});
    console.log('using watching frontend build');
} else if (process.env.NODE_ENV === 'development') {
    /* dev mode */
    app.use(express.static('./frontend/build'));
    //livereload(app, config = {watchDir: './frontend/build'});
    console.log('using watching frontend build');
} else {
    /* production mode */
    app.use(express.static('./frontend/dist'));
    console.log('using frontend dist');
}

module.exports = app;


// START THE SERVER
port = process.env.PORT || 8000;        // set our port
server.listen(port);
console.log('Server running on port ' + port);