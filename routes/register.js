var express = require('express');
var router = express.Router();
var connection = require('../config/databaseConnection');
var User = require('../bin/User');
var mailSender = require('../bin/mailSender');
var util = require("../bin/util");
var userValidator = require("../bin/userValidator");

router.get('/', function(req, res, next){
    res.render('register');
});

async function checkUser(req, res){
    /** Retrieve the user info, check if everything is fine and create the user in the DB. */
    var err = new Object();

    if (await userValidator.usernameExist(req.body.username)){
        err.usernameExist = "This username already exist";
    }
    if (await userValidator.emailExist(req.body.email)){
        err.emailExist = "This email already exist.";
    }
    if (!await userValidator.passMatch(req.body.password, req.body.confirmPassword)){
        err.passMatch = "The password doesn't match.";
    }
    if (!await userValidator.passSecurity(req.body.password)){
        err.passSecurity = "This password isn't safe, please use 8 characters... bla bla bla";
    }

    if (util.sizeObj(err)){
        res.status(200);
        res.render('register', err);
    } else {

        /** Send a mail with the link to validate the account.
         * Need to save user too
         */

        var user = new User(req.body);
        user.setId(await user.save());
        mailSender.send(user.getId(), user.getEmail(), user.getPass());
        res.status(200);
        res.render('signin', {saved : "user saved"});
    }
};

/**
 * Route to handle the creation of a new user.
 */

router.post('/submit', function(req, res, next){
    checkUser(req, res);
});

/**
 * Route to validate an account.
 */

router.get('/validation/:validLink', async function(req, res, next){
    var link = req.params.validLink;
    var userId = await userValidator.userValidEmail(link)
    .then(() => {
        userValidator.setEmailVerified(userId);
        console.log("email for user id: " + userId + " have been verified.");
        userValidator.deleteEmailLink(userId);
    })
    .catch(() => {
        console.log("an error occured");
    });
    res.status(200);
    res.render('signin', {saved: "Your email have been verified, you can now log in."});
});

module.exports = router;