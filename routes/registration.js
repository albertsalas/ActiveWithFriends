var express = require('express');
var router = express.Router();
const user = require('../controllers/UserController')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('registration', { title: 'Express' });
// });


router.post('/signup', user.create);

router.get('/check', user.find);

module.exports = router;
