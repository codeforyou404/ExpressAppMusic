
const rand = require('../util/random')
const emailSender = require('../util/mail')
const jwt = require('jsonwebtoken');
const Promise = require('promise');
const config = require('../config.json');
const otpQuery = require('../dal/QueryOtp')
const googleSignIn = require('../app-constant/constant-google-signin')
const queryUser = require('../dal/QueryUser')

class ServiceLogin {

    ServiceLogin() {

    }

    adduser({ name, lastname, avtar, type, email }, res, err) {
        console.log(name + '\n' + lastname + '\n' + avtar + '\n' + type + '\n' + email)
        new queryUser().insertUser({ name, lastname, avtar, type, email }).then(function (result) {
            console.log('data user isnert : ' + result)
            res(result)
        }, function (error) {
            console.log('data user error : ' + error)
            err(error)
        })
    }

    sendmail(email, success, fail) {

        console.log('inside ')
        var digit = rand.genRandom(4)
        new emailSender().sendmail(email, "subject", "Your otp is : " + digit).then(function (result) {
            //  set timer from here
            var token = jwt.sign({ sub: email, exp: Math.floor(Date.now() / 1000) + (700) }, config.secret);

            new otpQuery().insertTokenOtp({ email, token, digit }).then(function (result) {
                var mail = 'Sent'
                console.log('inside token saved')
                setTimeout(myFunc, 60000, digit);
                success({ mail })

            }, function (err) {
                console.log('Db error')
                var error = 'Db error'
                fail(error)
            })
        }, function (err) {
            var error = 'Invail Email'
            fail(error)
        });
    }
    // saving to user is not done here email 

    verifyOtp(digit) {
        return new Promise(function (resolve, reject) {
            new otpQuery().getToken({ digit }).then(function (result) {
                console.log('verify otp method : ' + result.token)
                console.log('verify otp method : ' + result.email)
                try {
                    var t = jwt.verify(result.token, config.secret)
                    var verified = true
                    var name = ''
                    var lastname = ''
                    var avtar = ''
                    var type = 1
                    var email = result.email

                    new queryUser().insertUser({ name, lastname, avtar, type, email }).then(function (result) {
                        console.log('data user isnert : ' + result)
                        //res(result)

                        var token = jwt.sign({ sub: email, exp: Math.floor(Date.now() / 1000) + (700) }, config.secret);

                       // const jwt = require('jsonwebtoken')
                        resolve({"token":token, verified,"usder_id":result })

                    }, function (error) {
                        console.log('data user error : ' + error)
                        resolve({ verified, 'message': 'User already exist' })
                    })


                } catch (e) {
                    console.log('error : ' + e)
                    var verified = 'false'
                    var otp = 'Otp Expired'
                    reject(otp)
                }
            }, function (err) {
                console.log(err)
                var otp = 'Invalid Otp'
                reject(otp)
            })
        });
    }


    verifyGToken(token) {

        return new Promise(function (resolve, reject) {
            const { OAuth2Client } = require('google-auth-library');
            const client = new OAuth2Client(googleSignIn.CLIENT_ID);
            // const client2 = new OAuth2Client(googleSignIn.CLIENT_ID2)
            async function verify() {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: googleSignIn.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                    // Or, if multiple clients access the backend:
                    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                });
                const payload = ticket.getPayload();
                const userid = payload['sub'];
                const email = payload['email'];
                const email_verified = payload['email_verified'];
                const name = payload['given_name'];
                const lastname = payload['family_name'];
                const avtar = payload['picture']

                console.log("email : " + email)
                console.log("email_verified : " + email_verified)
                console.log("name : " + name)
                console.log("picture : " + avtar)
                console.log("given_name : " + lastname)

                // If request specified a G Suite domain:
                // const domain = payload['hd'];
                // saveUserData({ name, lastname, avtar, type: 1, email })
                // resolve({ googlelogin: 'done' })

                var type = 1
                new queryUser().insertUser({ name, lastname, avtar, type, email }).then(function (result) {
                   
                    console.log('data user isnert' + result)
                    resolve({ googlelogin: 'done', "user_id" : result })
                }, function (error) {
                    var err = error.message;
                    
                    if(err.includes("Duplicate entry")){
                        var token = jwt.sign({ sub: email, exp: Math.floor(Date.now() / 1000) + (700) }, config.secret);

                        resolve({ token,googlelogin: 'done', "user_id" : '1' })
                    }else{
                        reject(err)
                    }
                    console.log('data user isnert' + error)
                    
                })
            }
            verify().catch(function (error) {
                console.log("error------: " + error)
                var erMsz = error.message;
                console.log("==== : " + erMsz)

                if (erMsz.includes("Wrong recipient, payload audience")) {
                    console.log('true')

                    const { OAuth2Client } = require('google-auth-library');
                    //const client = new OAuth2Client(googleSignIn.CLIENT_ID);
                    const client2 = new OAuth2Client(googleSignIn.CLIENT_ID2)
                    async function verify() {
                        const ticket = await client2.verifyIdToken({
                            idToken: token,
                            audience: googleSignIn.CLIENT_ID2,  // Specify the CLIENT_ID of the app that accesses the backend
                            // Or, if multiple clients access the backend:
                            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                        });
                        const payload = ticket.getPayload();
                        const userid = payload['sub'];
                        const email = payload['email'];
                        const email_verified = payload['email_verified'];
                        const name = payload['given_name'];
                        const lastname = payload['family_name'];
                        const avtar = payload['picture']


                        console.log("email : " + email)
                        console.log("email_verified : " + email_verified)
                        console.log("name : " + name)
                        console.log("picture : " + avtar)
                        console.log("given_name : " + lastname)
                        //If request specified a G Suite domain:
                        //const domain = payload['hd'];
                        var type = 1
                        new queryUser().insertUser({ name, lastname, avtar, type, email }).then(function (result) {
                            console.log('data user isnert' + result)
                            var token = jwt.sign({ sub: email, exp: Math.floor(Date.now() / 1000) + (700) }, config.secret);

                            resolve({ token,googlelogin: 'done' ,"user_id":result})
                        }, function (error) {
                            var err = error.message;
                            reject(err)
                            console.log('data user isnert' + error)
                        })
                        //  saveUserData({ name, lastname, avtar, type: 1, email })
                    }
                    verify().catch(function (error) {
                        console.log(error)
                        var er = JSON.stringify(error)
                        reject('Session Token Expired')
                    });

                } else {
                    reject('Session Token Expired')
                    console.log('false')
                }
            });
        });
    }
}

function saveUserData({ name, lastname, avtar, type, email }) {
    console.log(name + '\n' + lastname + '\n' + avtar + '\n' + type + '\n' + email)
    new queryUser().insertUser({ name, lastname, avtar, type, email }).then(function (result) {
        console.log('data user isnert' + result)
    }, function (error) {
        console.log('data user isnert' + error)
    })
}

function myFunc(arg) {
    console.log(`otp digit was => ${arg}`);
    new otpQuery().delete(arg).then(function (result) {
        console.log('success delete')
    }, function (error) {
        console.log('error delete')
    });
    // delete user also from user table
}

module.exports = ServiceLogin;




