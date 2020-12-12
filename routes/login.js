var express = require('express');
var router = express.Router();
const User = require("../models/User.js");

/* GET home login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Page' });
});


// router.get('/login', function(req, res){
// 	res.render('login');
// })

/**
 * When the user wants to post we must find the user that was created in the
 * database. If the user does not exist we reload the page and the user tries again,
*/
router.post('/', function(req, res){
	User.findByUsername(req.body.username, (err, data) => {
		if(!err && data.length === 1){
			if(req.body.password === data[0].password){
				req.session.loggedIn = true;
				req.session.username = req.body.username;
				req.session.userId = data[0].id;
				req.session.firstname = data[0].first_name;
				req.session.lastname = data[0].last_name;
				req.session.isAdmin = data[0].isAdmin;
				console.log(data[0]);
				res.redirect('/');
				return;
			} else { //Password is incorrect
				res.render('login', {error: true, password: req.body.password});
			}
		}
		res.render('login', {error: true, user: req.body.username});
	});
});


module.exports = router;
