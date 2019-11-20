var express = require('express');
var loginRouter = express.Router();
var apiResponsePattern = require('../apiresponse/apiresponse_pattern')
var googleSignIn = require('../app-constant/constant-google-signin')
var serviceLogin = require('../service/ServiceLogin')
var log = require('../log/Log')
var Log = new log();


loginRouter.post('/', auth);
loginRouter.get('/verifyotp/:otp', verifyOtp);
loginRouter.post('/siginwithemail', siginWithEmail);

function auth(req, res, next) {
    Log.LogFgGreen('Login api calling \n ' + req.body.token)
    new serviceLogin().verifyGToken(req.body.token).then(function (result) {
        res.status(200).send(new apiResponsePattern(result, null));
    }, function (error) {
        Log.LogFgGreen(" here  :  " + error)
        res.status(200).send(new apiResponsePattern(null, error));
    });
}

function siginWithEmail(req, res, next) {
    var email = req.body.email;
    var name = req.body.name;
    var lastname = null
    var avtar = null
    var type = 3
    // save to db in user table

    new serviceLogin().sendmail(email, function (success) {
        Log.LogFgGreen('succcc')
        res.status(200).send(new apiResponsePattern(success, null));
    }, function (fail) {
        Log.LogFgRed('fail')
        res.status(200).send(new apiResponsePattern(null, fail));
    })

    // new serviceLogin().adduser({ name, lastname, avtar, type, email }, function (res1) {
    // }, function (err) {
    //     res.status(200).send(new apiResponsePattern(null, err));
    // })

}

function verifyOtp(req, res, next) {
    var digit = req.params.otp;
    Log.LogFgGreen("-->" + digit)
    new serviceLogin().verifyOtp(digit).then(function (result) {
        res.status(200).send(new apiResponsePattern(result, null))
    }, function (error) {
        res.status(200).send(new apiResponsePattern(null, error))
    });
}

module.exports = loginRouter;