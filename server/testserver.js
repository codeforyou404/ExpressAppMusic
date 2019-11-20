/////////////////////////////
// NodeJS Server
/////////////////////////////

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ss = require('socket.io-stream');
var path = require('path');
var fs = require('fs');

io.of('/user').on('connection', function (socket) {
    console.log("connection");

    //send stream to client/browser

    var i = 0;
    var timer = setInterval(function () {
        console.log('file', i);
        var stream = ss.createStream();
        ss(socket).emit('file', stream, { i: i });
        var filename = 'image' + (i % 2) + '.png';
        var p = '/Users/Apple/Documents/ExpressjsWorkspace/myapp/sounds/bensound-buddy.mp3'

        console.log(p);
        fs.createReadStream(p).pipe(stream);
        i++;
    }, 1000);

    socket.on('disconnect', function () {
        console.log('disconnect')
        clearInterval(timer);
    })

});

//app.use(express.static(__dirname, '/'));

http.listen(2313, function () {
    console.log('listening on *:8080');
});