var express = require('express');
var playTrackRouter = express.Router();
var serviceTrack = require('../service/ServiceTracks')

playTrackRouter.get('/:id', getAll);
playTrackRouter.get('/image/:image', getImage)
playTrackRouter.get('/download/:id', downloadTrack)
const fs = require('fs')

// move logic to service playtrack
function getAll(req, res, next) {
    console.log(req.params.id + "")
    var trackName = req.params.id + "";
    new serviceTrack().getTrack(trackName).then(function (result) {
        res.sendFile(result)
    }, function (error) {
        res.status(404).send()
    })
}

// move logic to service playtrack
function getImage(req, res, next) {
    console.log(req.params.image + "")
    var imageName = req.params.image + "";
    new serviceTrack().getImage(imageName).then(function (result) {
        res.sendFile(result)
    }, function (error) {
        res.status(404).send()
    })
}

// move logic to service playtrack
function downloadTrack(req, res, next) {
    var trackName = req.params.id + "";
    console.log('Download api called')
    new serviceTrack().getDownloadLink(trackName).then(function (result) {
        res.download(result)
    }, function (error) {
        res.status(404).send()
    })
}


module.exports = playTrackRouter;