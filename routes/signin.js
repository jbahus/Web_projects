var express = require('express');
var User = require("../bin/User");
var mailSender = require("../bin/mailSender");
var router = express.Router();
var userValidator = require("../bin/userValidator");
var util = require("../bin/util");

router.get('/', function(req, res, next){
    res.render('signin');
});

router.get('/forgot', function(req, res, next){
    res.render('forgot');
});

router.post('/reset', async function(req, res, next){
    var username = req.body.username;
    var email = req.body.email;

    var id = await userValidator.getUserIdByUsernameAndEmail(username, email);
    if (id){
        
        var genHash = util.hashGenerator(username + id, "Reset");
        await mailQueries.addResetPwd(userId, genHash);
        await mailQueries.getResetIdByUserId(userId);
        mailSender.sendResetMail(id, mail, genHash, messageId);
        res.render('signin', {saved : "reset mail have been send"});
    }
});

router.post('/submit', function(req, res, next){

});

router.get('/newpwd/:link', function(req, res, next){
    var link = req.params.link;

    
    
});

module.exports = router;