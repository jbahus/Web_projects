var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'matcha'
});

connection.connect(function(err){
    if (err){
        console.log(err + " connection to database failed.");
    } else {
        console.log('connected');
    }
});

module.exports = connection;