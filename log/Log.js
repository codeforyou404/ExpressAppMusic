

var Reset = "\x1b[0m"
var Bright = "\x1b[1m"
var Dim = "\x1b[2m"
var Underscore = "\x1b[4m"
var Blink = "\x1b[5m"
var Reverse = "\x1b[7m"
var Hidden = "\x1b[8m"

var FgBlack = "\x1b[30m"
var FgRed = "\x1b[31m"
var FgGreen = "\x1b[32m"
var FgYellow = "\x1b[33m"
var FgBlue = "\x1b[34m"
var FgMagenta = "\x1b[35m"
var FgCyan = "\x1b[36m"
var FgWhite = "\x1b[37m"

var BgBlack = "\x1b[40m"
var BgRed = "\x1b[41m"
var BgGreen = "\x1b[42m"
var BgYellow = "\x1b[43m"
var BgBlue = "\x1b[44m"
var BgMagenta = "\x1b[45m"
var BgCyan = "\x1b[46m"
var BgWhite = "\x1b[47m"

var COLOR_FOR_ONECE = "%s\x1b[0m"



class Log {

    Log() { }

    LogReset(msg) {
        console.log(Reset + COLOR_FOR_ONECE, msg)
    }

    LogBright(msg) {
        console.log(Bright + COLOR_FOR_ONECE, msg)
    }
    LogDim(msg) {
        console.log(Dim + COLOR_FOR_ONECE, msg)
    }
    LogUnderScore(msg) {
        console.log(Underscore + COLOR_FOR_ONECE, msg)
    }
    LogBlink(msg) {
        console.log(Blink+COLOR_FOR_ONECE, msg)
    }
    LogReverse(msg) {
        console.log(Reverse+COLOR_FOR_ONECE, msg)
    }
    LogHidden(msg) {
        console.log(Hidden, msg)
    }
    LogFgBlack(msg) {
        console.log(FgBlack+COLOR_FOR_ONECE, msg)
    }
    LogFgRed(msg) {
        console.log(FgRed+COLOR_FOR_ONECE, msg)
    }
    LogFgGreen(msg) {
        console.log(FgGreen+COLOR_FOR_ONECE, msg)
    }
    LogFgYellow(msg) {
        console.log(FgYellow+COLOR_FOR_ONECE, msg)
    }
    LogFgBlue(msg) {
        console.log(FgBlue+COLOR_FOR_ONECE, msg)
    }
    LogFgMagenta(msg) {
        console.log(FgMagenta+COLOR_FOR_ONECE, msg)
    }
    LogFgCyan(msg) {
        console.log(FgCyan+COLOR_FOR_ONECE, msg)
    }
    LogBgBlack(msg) {
        console.log(BgBlack+COLOR_FOR_ONECE, msg)
    }
    LogBgRed(msg) {
        console.log(BgRed+COLOR_FOR_ONECE, msg)
    }
    LogBgGreen(msg) {
        console.log(BgGreen+COLOR_FOR_ONECE, msg)
    }
    LogBgYellow(msg) {
        console.log(BgYellow+COLOR_FOR_ONECE, msg)
    }
    LogBgBlue(msg) {
        console.log(BgBlue+COLOR_FOR_ONECE, msg)
    }
    LogBgMagenta(msg) {
        console.log(BgMagenta+COLOR_FOR_ONECE, msg)
    }
    LogBgCyan(msg) {
        console.log(BgCyan+COLOR_FOR_ONECE, msg)
    }
    LogBgWhite(msg) {
        console.log(BgWhite+COLOR_FOR_ONECE, msg)
    }
}

module.exports = Log;
