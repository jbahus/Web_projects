var connection = require("./databaseConnection");
require("./initDatabase");
var randomUser = require('random-user');

/**
 * Create 200 users and insert them in the database
 */

for(var i = 0; i < 200; i++){
    randomUser()
    .then((data) => {
        connection.query("INSERT INTO users (username, firstname, lastname, gender, sexuality, email, password, validAccount) VALUES ('" + data.login.username + "', '" + data.name.first + "', '" + data.name.last + "', '" + data.gender + "', '" + (Math.floor(Math.random() * 3) + 0) + "', '" + data.email + "', '" + data.login.password + "', 1)");
    })
    .catch((err) => console.log(err));
}