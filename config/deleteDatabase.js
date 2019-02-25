var connection = require("./databaseConnection");

/**
 * Drop th database
 */
connection.query("DROP DATABASE IF EXISTS matcha");