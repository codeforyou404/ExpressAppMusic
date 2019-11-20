var express = require('express');
var app = express();

// my routes -- - --


var playTrackRouter = require('./routes/RoutePlaytrack')
var loginRouter = require('./routes/RouteLogin')
var categoryRouter = require('./routes/RouteCategory')
var tracksRouter = require('./routes/RouteTracks')
var chapterRouter = require('./routes/RouteChapters')
var profileRoute = require('./routes/RouteProfile')
var dummy = require('./routes/RouteDummy')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/play_track', playTrackRouter)
app.use('/category', categoryRouter)
app.use('/login', loginRouter)
app.use('/tracks', tracksRouter)
app.use('/chapters', chapterRouter)
app.use('/profile', profileRoute)


app.use('/dum', dummy)

app.use('/', function (req, res) {
    res.sendFile('/home/ubuntu/Documents/WorkspaceExpress/ExpressjsWorkspace/myapp/index.html');
})

module.exports = app;