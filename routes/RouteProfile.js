var express = require('express');
var profileRouter = express.Router();
var serviceProfile = require('../service/ServiceProfile')
var apiresponsePattern = require('../apiresponse/apiresponse_pattern')

profileRouter.post('/edit', profileEdit)
profileRouter.post('/', getProfile)
profileRouter.get('/avatar/:id', profileAvatar)

function profileEdit(req, res, next) {
    console.log('profileEdit api called')
    new serviceProfile().multipartFileUpload(req, res, next).then(function (result) {
        console.log('11')
        res.status(200).send(new apiresponsePattern(result, null))
    }, function (error) {
        res.status(200).send(new apiresponsePattern(null, error))
    })
}

function getProfile(req, res, next) {
    console.log('get profile api called')
    new serviceProfile().getProfile(req.body.email, function (result) {
        res.status(200).send(new apiresponsePattern(result, null))
    }, function (error) {
        res.status(200).send(new apiresponsePattern(null, error))
    })
}

function profileAvatar(req, res, next) {
    console.log('profileAvatar api called')
    var imagename = req.params.id + "";
    new serviceProfile().getProfileImage(imagename).then(function (result) {
        res.sendFile(result)
    }, function (error) {
        res.status(404).send()
    })
}


module.exports = profileRouter;
