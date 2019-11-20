const queryUser = require('../dal/QueryUser');
const Promise = require('promise');
var multer = require('multer')

class ServiceProfile {

    ServiceProfile() { }

    multipartFileUpload(req, res, next) {
        return new Promise(function (resolve, reject) {
            var imagename = '';
            var storage = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, '../uploads')
                },
                filename: function (req, file, callback) {
                    imagename = file.fieldname + '-' + Date.now() + ".jpg"
                    callback(null, imagename);
                }
            });
            var upload = multer({ storage: storage }).single('userPhoto');
            //var upload = multer({ storage: storage })..single('userPhoto');
            // upload.single('userPhoto')

            upload(req, res, function (err) {
                console.log('name : ' + req.body.name);
                console.log('email :' + req.body.email);
                console.log('lastname : ' + req.body.lastname);
                console.log('age : ' + req.body.age);
                console.log('File attached : ' + (req.file != null))

                var name = req.body.name;
                var lastname = req.body.lastname;
                var email = req.body.email;
                var age = req.body.age;

                try {
                    if (name.length == 0) {
                        reject("name key values not found");
                        return
                    }
                    if (lastname.length == 0) {
                        reject("lastname key values not found");
                        return
                    }
                    if (email.length == 0) {
                        reject("email key values not found");
                        return
                    }
                    if (age.length == 0) {
                        reject("age key values not found");
                        return
                    }
                } catch (error) {
                    reject('Some Keys are missing')
                    console.log(error)
                    return
                }
                if (req.file == null) {
                    reject("File not attached");
                    return
                }
                else {
                    var avtar = 'http://192.168.3.158:2590/profile/avatar/' + imagename
                    if (err)
                        reject("Error uploading file.");
                    else {
                        new queryUser().updateProfile({ name, lastname, avtar, email }).then(function (result) {
                            resolve('Profile Updated')
                        }, function (error) {
                            reject("Invalid email");
                        })
                    }
                }
            });
        }); 
    }

    getProfile(email, callbackSucc, callbackErr) {
        new queryUser().getUsers(email).then(function (result) {
            callbackSucc(result)
        }, function (error) {
            callbackErr('Invalid email')
        })
    }

    getProfileImage(imagename) {
        console.log(imagename)
        return new Promise(function (resolve, reject) {
            const fs = require('fs')
            var path = '/home/ubuntu/Documents/WorkspaceExpress/ExpressjsWorkspace/myapp/uploads/' + imagename
            fs.access(path, fs.F_OK, (err) => {
                if (err) {
                    reject('')
                }else
                resolve(path)
            })
        });
    }
}


module.exports = ServiceProfile;
