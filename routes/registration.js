var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('registration', { title: 'Express' });
// });


router.post('/signup', function(req, res) {
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.body.fname);
  console.log(req.body.lname);


  res.redirect('/')
});

module.exports = router;
