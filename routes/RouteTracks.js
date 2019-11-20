var express = require('express');
var trackRouter = express.Router();
var apiResponsePattern = require('../apiresponse/apiresponse_pattern')
var serviceTracks = require('../service/ServiceTracks')



trackRouter.get('/', getAll);
trackRouter.get('/mindfulsession/:user_id', trackHistory)
trackRouter.post('/tracklistened', trackListened)
trackRouter.post('/insertTrack', insertTrack)


function getAll(req, res, next) {
    console.log("track api called");
    new serviceTracks().getAllTracks().then(function (result) {
        res.status(200).send(new apiResponsePattern(result, null));
    }, function (err) {
        res.status(404).send(new apiResponsePattern(null, err));
    });
}

function trackHistory(req, res, next) {

    console.log('inside')
    console.log(req.params.user_id)
    var user_id = req.params.user_id
    new serviceTracks().getTrackHistory(user_id, function (success) {
        res.status(200).send(new apiResponsePattern(success, null))
    }, function (fail) {
        res.status(200).send(new apiResponsePattern(null, fail))
    })
}


function trackListened(req, res, next) {

    var track_id = req.body.track_id
    var user_id = req.body.user_id
    var datetimemilli = req.body.datetime
    var start_duration = req.body.start_duration
    var stop_duration = req.body.stop_duration
    var rating = req.body.rating

    new serviceTracks().insertTrackHistory({ track_id, user_id, datetimemilli, start_duration, stop_duration, rating }, function (success) {
        console.log({ track_id, user_id, datetimemilli, start_duration, stop_duration, rating })
        res.status(200).send(new apiResponsePattern({ 'affectedRows': success.affectedRows }, null))
    }, function (fail) {
        res.status(200).send(new apiResponsePattern(null, fail))
    })
}

function insertTrack(req, res, next) {

    var track_name = req.body.track_name;
    var track_description = req.body.track_description
    var track_category = req.body.track_category
    var track_album_art = req.body.track_album_art
    var track_path = req.body.track_path

    var track_time = req.body.track_time

    var narator_id = req.body.narator_id
    var chapter_id = req.body.chapter_id

    res.send(req.body)

}

module.exports = trackRouter;