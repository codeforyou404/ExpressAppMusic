var express = require('express');
var dummy = express.Router();
var fs = require('fs')

dummy.get('/test/:r', test);
dummy.post('/Test',test2)

function test2(req, res, next){
    var db = require('../dal/dbconnection');
    var con = new db.getDbConnectionObject();
    var query = "Select count(id) as TotalCount from Test";

    var limitNum =req.body.limit;
    var startNum=req.body.start;
    con.query(query, function(err, rows) {
        if(err){
          return err;
        }else{
         //store Total count in variable
        let totalCount = rows[0].TotalCount
      //  console.log(req.body.limit);
        if(req.body.start == '' || req.body.limit == ''){
             startNum = 0;
         LimitNum = 10;
          }
        else{
            //parse int Convert String to number 
              //startNum = req.body.start;
             //limitNum = req.body.limit;
          }
       }
    });

    console.log("Page Size : "+limitNum+" Offset : "+startNum)
    var q =  "Select * from Test ORDER BY id asc limit "+limitNum+" OFFSET "+startNum;
   //var q = "SELECT * FROM MeditationDB.Test"

    con.query(q, (err, result, fields) => {
      con.end();
     if(err)
      res.send(err);
     else  
      res.send(result);
    });
    }
    
    // var path = '/Users/Apple/Documents/ExpressjsWorkspace/myapp/sounds/bensound-goinghigher.mp3'
    // var rs = fs.createReadStream(path)

    function test(req, res, next) {
    // setTimeout(myFunc, 15000, req.params.id);
    console.log('yes')
    //res.send('hello')

    var r = req.params.r
    var n = " ";
    
    for (var i = 0; i < r; i++) {
        for ( var k = r; k > i; k--) {
           // System.out.print(" ");
            n = n + " ";
        }
        var number = 1;
        for (var j = 0; j <= i; j++) {
            n=n+number+" "
            number = number * (i - j) / (j + 1);
        }
        n = n + "\n"
    }
    res.send(n)
    //res.send({'Pascal Triangle':n})
}

function myFunc(arg) {
    console.log(`arg was => ${arg}`);
}

module.exports = dummy;