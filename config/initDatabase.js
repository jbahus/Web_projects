var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: '',
    password: ''
});

connection.connect(function(err){
    if (err){
        console.log(err + " connection to databse failed.");
    } else {
        console.log('connected');
    }
});


/**
 * Create the database matcha
 */
connection.query("CREATE DATABASE IF NOT EXISTS matcha", function(err, rows, field) {
    if (err){
        console.log(err);
    } else {
        console.log("Database matcha created");
    }
});


/**
 * Make mysql use the database matcha
 */
connection.query("USE matcha", function(err, rows, field) {
    if (err){
        console.log(err);
    } else {
        console.log("Use database matcha");
    }
});


/**
 * Create the table users
 * 
 * gender => 0:other; 1:male; 2:female
 * sexuality => 0:other; 1:male; 2:female; 3:bi-sexual
 */
connection.query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, gender INT NOT NULL DEFAULT 0, sexuality INT NOT NULL DEFAULT 0, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, validAccount INT NOT NULL DEFAULT 0, validMail INT NOT NULL DEFAULT 0)", function(err, rows, field) {
    if (err){
        console.log(err);
    } else {
        console.log("Table users created");
    }
});

/**
 * Create table validlink 
 */

connection.query("CREATE TABLE IF NOT EXISTS validLink (id INT AUTO_INCREMENT PRIMARY KEY, userid INT NOT NULL, link VARCHAR(255) NOT NULL)", function(err, result){
    if (err){
        console.log(err);
    } else {
        console.log("Table validlink created");
    }
});

/**
 * Create table resetPwd
 */

connection.query("CREATE TABLE IF NOT EXISTS resetPwd (id INT AUTO_INCREMENT PRIMARY KEY, userid INT NOT NULL, link VARCHAR(255) NOT NULL)", function(err, result){
    if (err){
        console.log(err);
    } else {
        console.log("Table resetpwd created");
    }
});
    