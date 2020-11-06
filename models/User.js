// const connection = require('../connection.js');

/**
 * @param user
 * @constructor
 */
const User = function (user) {
    this.username = user.username;
    this.password = user.password;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
}

User.findAll = (result) => {

}

User.find = (username, result) => {

}

User.create = (user, result) => {
    // connection.query("INSERT INTO User SET ?", user, (err, res) => {
    //     if (err) {
    //         console.log("error: ", err);
    //         result(err, null);
    //         return;
    //     }
    //     console.log("created user: ", {username: res.username, ...user});
    //     result(null, {username: res.username, ...user});
    // });
}

User.update = (user, result) => {

}

User.delete = (user, result) => {

}