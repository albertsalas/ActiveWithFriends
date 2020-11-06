const User = require("../models/User.js");

exports.findAll = (req, res) => {

}

exports.find = (req, res) => {

}

exports.create = (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    User.create(user, (error, data) => {
        if (error) {
            res.render('register', {err: true});
            // res.status(500).send({
            //     message: err.message || "Error while creating user."
            // });
        } else {
            // res.send(data);
            res.redirect('login');
        }
    });
};

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}