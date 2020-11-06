// const mysql = require('mysql');

// // database setup
// // first we check if Heroku environment variables are available, if not then we use local .env file
// var connection;
// if (process.env.JAWSDB_MARIA_DATABASE) {
//     connection = mysql.createConnection({
//         host: process.env.JAWSDB_MARIA_HOST,
//         user: process.env.JAWSDB_MARIA_USER,
//         password: process.env.JAWSDB_MARIA_PASSWORD,
//         database: process.env.JAWSDB_MARIA_DATABASE,
//     });
// } else {
//     connection = mysql.createConnection({
//         host: process.env.HOST,
//         user: process.env.USER,
//         password: process.env.PASSWORD,
//         database: process.env.DATABASE,
//     });
// }

// console.log("Successfully connected to database!");
// module.exports = connection;
