var express = require('express');
var chapterRouter = express.Router();
var queryChapter = require('../dal/QueryChapter')
var apiResponsePattern = require('../apiresponse/apiresponse_pattern')
var log = require('../log/Log')

chapterRouter.get('/', getAll);

function getAll(req, res, next) {
    new log().LogFgGreen("chapter api called");
    new queryChapter().selectPromise().then(function(result){
        res.status(200).send(new apiResponsePattern(result, null));
    },function(err){
        res.status(200).send(new apiResponsePattern(null, err));
    });
}

module.exports = chapterRouter;