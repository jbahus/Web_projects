var userQueries = require("./query/userQueries");
var emailQueries = require("./query/emailQueries");
var util = require("./util");

var emailExist = (email) => {
    return userQueries.emailExist(email);
}

var usernameExist = (username) => {
    return userQueries.usernameExist(username);
}

var passMatch = (pass, confirmPass) => {
    return new Promise((resolve, reject) => {
        if (pass == confirmPass){
            resolve(true);
        }
        resolve(false)
    })
}

var passSecurity = (pass) => {
    return new Promise((resolve, reject) => {
        if (util.regexSafePass.test(pass)){
            resolve(true);
        }
        resolve(false);
    });
}

var userValidEmail = (link) => {
    return emailQueries.getValidEmail(link);
}

var setEmailVerified = (userId) => {
    return userQueries.setValidEmail(userId);
}

var deleteEmailLink = (userId) => {
    return emailQueries.deleteValidEmail(userId);
}

var getUserIdByUsernameAndEmail = (username, email) => {
    return userQueries.getUserIdByUsernameAndEmail(username, email);
}

var resetLinkvalidation = (link) => {
    link.split('-');
}

module.exports = {
    usernameExist,
    emailExist,
    passMatch,
    passSecurity,
    userValidEmail,
    setEmailVerified,
    deleteEmailLink,
    getUserIdByUsernameAndEmail
};