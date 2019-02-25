var nodeMailer = require('nodemailer');
var crypto = require("crypto");
var mailQueries = require("../bin/query/emailQueries")

var send = function(mailOptions){
    let transporter = nodeMailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "yo5jz5xktw4bacme@ethereal.email",
            pass: "qy6rPgC31k5uncJkHa"
            // user: account.user, // generated ethereal user
            // pass: account.pass // generated ethereal password
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
};

var createMailOptions = function(from, to, subject, text, html){
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    };
    return mailOptions;
}

var sendValidationMail = function(mail, userId, genHash){

    var from = '"Fred Foo 👻" <matcha@42.com>', // sender address
    var to = mail; // list of receivers
    var subject = 'Valid your subscription'; // Subject line
    var text = 'Hi, Please confirm your subscription with the following link'; // plain text body
    var html = '<b>Hi,</b></BR></BR>Please confirm your subscription with the following link <a href="localhost:8000/register/validation/'+ genHash +'">HERE</a>'; // html body

    createMailOptions(from, to, subject, text, html);

    send(mailOptions);

    return mailQueries.addValidEmail(userId, genHash);
    }

var sendResetMail = function(userId, mail, genHash, messageId){

    var from = '"Fred Foo 👻" <matcha@42.com>',
        to = mail,
        subject = 'Reset your password',
        text = 'Hi, Please reset your password with the following link',
        html = '<b>Hi,</b></BR></BR>Please reset your password with the following link <a href="localhost:8000/signin/newpwd/'+ genHash +'">HERE</a>';

    createMailOptions(from, to, subject, text, html);
    send(mailOptions);


    return ;
}

module.exports = {
    sendResetMail,
    sendValidationMail
}