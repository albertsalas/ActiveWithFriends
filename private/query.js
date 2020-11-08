const mysql = require('mysql');

// database setup
// first we check if Heroku environment variables are available, if not then we use local .env file
var config;
if (process.env.JAWSDB_MARIA_DATABASE) {
    config = {
        host: process.env.JAWSDB_MARIA_HOST,
        user: process.env.JAWSDB_MARIA_USER,
        password: process.env.JAWSDB_MARIA_PASSWORD,
        database: process.env.JAWSDB_MARIA_DATABASE,
    };
} else {
    config = {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    };
}

/**
 * The goal of this function is to reduce the amount of duplicate code.
 * Instead of having to write a connection.query for every model method,
 * we can simply send in the SQL string.
 * @param sql
 * @param values
 * @param next
 */
var query = (sql, values, next) => {
    if (arguments.length === 2) {
        next = values;
        values = null;
    }
    var connection = mysql.createConnection(config);
    connection.connect(function (error) {
        if (error !== null) {
            throw error;
        }
    });
    connection.query(sql, values, function (error) {
        console.log("sql: ", sql);
        console.log("values: ", values);
        connection.end();
        if (error) {
            throw error;
        }
        next.apply(this, arguments);
    });
}
module.exports = query;
