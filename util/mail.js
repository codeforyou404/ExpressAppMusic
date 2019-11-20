var nodemailer = require('nodemailer');
var Promise = require('promise');

function mail() {

}

mail.prototype.sendmail = function (To, Subject, data) {

  return new Promise(function (resolve, reject) {

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mr.radheshyam.980@gmail.com',
        pass: 'Radheshyam@980089'
      }
    });

    var mailOptions = {
      from: 'mr.radheshyam.980@gmail.com',
      to: To,
      subject: Subject,
      text: data
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve("ok")
      }
    });
  });
}

module.exports = mail;


