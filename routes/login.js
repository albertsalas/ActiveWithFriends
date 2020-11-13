var express = require('express');
var router = express.Router();

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
router.post('/login', function(req, res){
	User.find(req.body.username, (err, data) => {
		if(!err && data.length === 1){
			if(req.body.password === data[0].password){
				req.session.loggedin = true;
				req.session.username = req.body.username;
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
