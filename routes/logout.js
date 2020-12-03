var express = require('express');
var router = express.Router();
const User = require("../models/User.js");

/* GET home logout page. */
router.get('/', function(req, res, next) {
    res.render('logout', { title: 'Logout Page' });
});

/*
    Destroys the session, logs out the user and then redirects to a logout page which then
    displays a message for a period of time before redirecting to the homepage
 */
router.post('/', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                res.redirect('/logout/');
            }
        });
    }
});


module.exports = router;
