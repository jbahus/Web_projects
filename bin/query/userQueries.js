var connection = require('../../config/databaseConnection');

var queryGetUser = "SELECT * FROM users WHERE id = ?";
var queryGetUserIdByUsernameAndEmail = "SELECT id FROM users WHERE username = ? AND email = ?";
var queryAddUser = "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)";
var queryUsernameExist = "SELECT id FROM users WHERE username = ?";
var queryEmailExist = "SELECT id FROM users WHERE email = ?";
var querySetValidEmail = "UPDATE users SET validMail = 1 WHERE id = ?"

var addUser = (user, callback) => {
    return new Promise((resolve, reject) => {
        let values = [user.getUsername(), user.getFirstname(), user.getLastname(), user.getEmail(), user.getPass()];
        connection.query(queryAddUser, values, (err, result) => {
            if (err){
                console.log(err);
                return ;
            }
            if (result){
                console.log("user added to DB.");
                resolve(result.insertId);
            }
        });
    });
}

var usernameExist = (username) => {
    return new Promise((resolve, reject) => {
        connection.query(queryUsernameExist, [username], (error, result) => {
            if (error){
                console.log(error);
                return ;
            }
            resolve(result.length > 0);
        });
    });
}

var emailExist = (email) => {
    return new Promise((resolve, reject) => {
        connection.query(queryEmailExist, [email], (error, result) => {
            if (error){
                console.log(error);
                return ;
            }
            resolve(result.length > 0);
        });
    });
}

var deleteUser = (id) => {

}

var updateUser = (user) => {

}

var getUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(queryGetUser, [id], (err, result) => {
            if (err){
                console.log(err);
                return;
            }
            resolve(result);
        });
    });
}

var setValidEmail = (userId) => {
    return new Promise((resolve, reject) => {
        connection.query(querySetValidEmail, [userId], (err, result) => {
            if (err){
                console.log(err);
                return;
            }
            resolve();
        });
    })
}

var getUserIdByUsernameAndEmail = (username, email) => {
    return new Promise((resolve, reject) => {
        connection.query(queryGetUserIdByUsernameAndEmail, [username, email], (err, result) => {
            if (err){
                console.log(err);
                return;
            }
            resolve(result[0].id);
        });
    })
}

module.exports = {
    addUser,
    usernameExist,
    emailExist,
    deleteUser,
    updateUser,
    getUser,
    getUserIdByUsernameAndEmail,
    setValidEmail
}