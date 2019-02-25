var connection = require("../../config/databaseConnection");

var queryAddLink = "INSERT INTO validlink (userid, link) VALUES (?, ?)";
var queryAddResetLink = "INSERT INTO resetPwd (userid, link) VALUES (?, ?)";
var queryGetResetLink = "SELECT FROM resetPwd WHERE userid = ?"
var queryDeleteLink = "DELETE FROM validLink WHERE userid = ?";
var queryGetLink = "SELECT * FROM validLink WHERE link = ?";

var addValidEmail = (userId, link) => {
    return new Promise((resolve, reject) => {
        connection.query(queryAddLink, [userId, link], function(err, result){
            if (err){
                console.log(err);
                reject();
            }
            console.log("link added.")
            resolve();
        })
    });
}

var deleteValidEmail = (userId) => {
    return new Promise((resolve, reject) => {
        connection.query(queryDeleteLink, [userId], (err, result) => {
            if (err){
                console.log(err);
                reject();
            }
            resolve();
        })
    });
}

var getValidEmail = (link) => {
    return new Promise((resolve, reject) => {
        connection.query(queryGetLink, [link], (err, result) => {
            if (err){
                console.log(err);
                reject();
            }
            console.log(result[0].userid);
            resolve(result[0].userid);
        })
    })
}

var addResetPwd = (userId, link) => {
    return new Promise((resolve, reject) => {
        connection.query(queryAddResetLink, [userId, link], function(err, result){
            if (err){
                console.log(err);
                reject();
            }
            console.log("link added.")
            resolve();
        })
    });
}

var getResetPwd = (userId) => {
    return new Promise((resolve, reject) => {
        connection.query(queryGetResetLink, [userId], function (err, result){
            if (err){
                console.log(err);
                reject();
            }
            console.log("get link for user" + userId);
            resolve(result);
        })
    })
}

var getResetIdByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        connection.query(queryGetResetIdByUserId, function(err, result){
            if (err){
                console.log(err);
                reject();
            }
            resolve(result);
        });
    })
}

var linkExist

module.exports = {
    addValidEmail,
    deleteValidEmail,
    getValidEmail,
    addResetPwd,
    getResetPwd
}