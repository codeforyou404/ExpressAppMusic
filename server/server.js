#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var http = require('http');

var log = require('../log/Log')



/**
 * Get port from environment and store in Express.
 */

var port = 2590; //normalizePort(process.env.PORT || '3012');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,"0.0.0.0");
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {


    console.log("error")
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log("lis " + addr.port)

    var s = '_____/\\\\\\\\\\\\\\\\\\_____/\\\\\\\\\\\\\\\\\\\\\\\\\\____/\\\\\\\\\\\\\\\\\\\\\\___________         \n' +
        ' ___/\\\\\\\\\\\\\\\\\\\\\\\\\\__\\/\\\\\\/////////\\\\\\_\\/////\\\\\\///____________        \n' +
        '  __/\\\\\\/////////\\\\\\_\\/\\\\\\_______\\/\\\\\\_____\\/\\\\\\_______________       \n' +
        '   _\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\\\\\\\\\\\\\\\\\\\\\/______\\/\\\\\\_______________      \n' +
        '    _\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\_\\/\\\\\\/////////________\\/\\\\\\_______________     \n' +
        '     _\\/\\\\\\/////////\\\\\\_\\/\\\\\\_________________\\/\\\\\\_______________    \n' +
        '      _\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\_________________\\/\\\\\\_______________   \n' +
        '       _\\/\\\\\\_______\\/\\\\\\_\\/\\\\\\______________/\\\\\\\\\\\\\\\\\\\\\\___________  \n' +
        '        _\\///________\\///__\\///______________\\///////////____________ ';

   // console.log(s)
   // console.log('\x1b[36m%s\x1b[0m', s);  //cyan
   //console.log("\x1b[36m", s);  //cyan
    new log().LogFgMagenta(s)
   
   // new log().LogBlink(s)
}