const db = require('../dal/QueryTrack');
const dbTrackHistory = require('../dal/QueryTrackHistory')
const Promise = require('promise');
const fs = require('fs')

class ServiceTracks {

    ServiceTracks() { }

    getAllTracks() {
        return new Promise(function (resolve, reject) {
            new db().selectPromise().then(function (result) {
                resolve(result)
            }, function (err) {
                reject(err)
            });
        });
    }

    getTrack(trackName) {
        return new Promise(function (resolve, reject) {
            
            var path = '/home/ubuntu/Documents/WorkspaceExpress/ExpressjsWorkspace/myapp/sounds/' + trackName
            fs.access(path, fs.F_OK, (err) => {
                if (err) {
                    reject()
                    return
                }
                resolve(path)
            })
        });
    }

    getImage(imageName) {
        return new Promise(function (resolve, reject) {

            var path = '/home/ubuntu/Documents/WorkspaceExpress/ExpressjsWorkspace/myapp/images/' + imageName
            fs.access(path, fs.F_OK, (err) => {
                if (err) {
                    reject()
                    return
                }
                resolve(path)
            })
        });
    }

    getDownloadLink(trackName) {
        return new Promise(function (resolve, reject) {
            var path = '/home/ubuntu/Documents/WorkspaceExpress/ExpressjsWorkspace/myapp/sounds/' + trackName
            fs.access(path, fs.F_OK, (err) => {
                if (err) {
                    reject()
                    return
                }
                resolve(path)
            })
        });
    }

    getTrackHistory(user_id, success, fail) {

        console.log('getTrackHistory --- >' + user_id)
        new dbTrackHistory().getTrackHistory(user_id).then(function (result) {
            success(result)
        }, function (error) {
            fail(error)
        });
    }

    insertTrackHistory({ track_id, user_id, datetimemilli, start_duration, stop_duration, rating }, success, fail) {
        new dbTrackHistory().insertTrackHistroy({ track_id, user_id, datetimemilli, start_duration, stop_duration, rating }).then(function (result) {
            success(result)
        }, function (error) {
            fail(error)
        });
    }
}
module.exports = ServiceTracks;
