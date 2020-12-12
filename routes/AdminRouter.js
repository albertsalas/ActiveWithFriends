var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', (req, res) => {
    if (req.session.loggedIn && req.session.isAdmin) {
        var users = []
        User.findAll((error, data) => {
            users = data;
            console.log(users);
            res.render("admin", {title: "Admin page", users: users});
        });
    } else {
        res.redirect("/");
    }
});

module.exports = router;