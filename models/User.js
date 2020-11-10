const query = require('../private/query');

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
    query("SELECT * FROM User", "", (error, res) => {
        result(error, res);
    });
}

User.find = (user_id, result) => {
    query("SELECT * FROM User WHERE id = ?", user_id, (error, res) => {
        result(error, res);
    });
}

//name availability query
User.findByUsername = (username, result) => {
    query("SELECT * FROM User WHERE username = ?", username, (error, res) => {
        result(error, res);
    });
}

User.create = (user, result) => {
    query("INSERT INTO User SET ?", user, (error, res) => {
        result(error, res);
    });
}

User.update = (user, result) => {
    query("UPDATE User SET ? WHERE ?", user, (error, res) => {
        result(error, res);
    });
}

User.delete = (user, result) => {
    query("DELETE FROM User WHERE ?", user, (error, res) => {
        result(error, res);
    });
}

module.exports = User;