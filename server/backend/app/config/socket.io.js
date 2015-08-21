var io, express, app, server;
if (!io) {
    express = require('express');
    app = express();
    server = require('http').Server(app);
    io = require('socket.io')(server);
}

exports.io = io;
exports.express = express;
exports.app = app;
exports.server = server;