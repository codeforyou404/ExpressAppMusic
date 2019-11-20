var express = require('express');
var categoryRouter = express.Router();
var apiResponsePattern = require('../apiresponse/apiresponse_pattern')
var serviceCategory = require('../service/ServiceCategory')
var log = require('../log/Log')

categoryRouter.get('/', getAll);

function getAll(req, res, next) {
    new log().LogFgGreen('Category api calling')
    new serviceCategory().getAllCategory().then(function (result) {
        res.status(200).send(new apiResponsePattern(result, null));
    }, function (err) {
        res.status(200).send(new apiResponsePattern(null, err));
    });
}

module.exports = categoryRouter;