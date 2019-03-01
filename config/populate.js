var connection = require("./databaseConnection");
var randomUser = require('random-user');

/**
 * Create 200 users and insert them in the database
 */

for(var i = 0; i < 200; i++){
    randomUser()
    .then((data) => {
        var gender
        if (data.gender == "male"){
            gender = 1;
        } else if (data.gender == "female"){
            gender = 2;
        }else {
            gender = 0;
        }
        connection.query("INSERT INTO users (username, firstname, lastname, gender, sexuality, email, password, validAccount) VALUES ('" + data.login.username + "', '" + data.name.first + "', '" + data.name.last + "', '" + gender + "', " + (Math.floor(Math.random() * 3) + 0) + ", '" + data.email + "', '" + data.login.password + "', 1)", (err, result) => {
            if (err)
                console.log(err);
        });
    })
    .catch((err) => console.log(err));
}