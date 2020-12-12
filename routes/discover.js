var express = require('express');
var router = express.Router();
const activities = require("../controllers/ActivityController");



router.get('/', async (req,res) => {

    res.render('discover', { title: 'Discover' });
});


module.exports = router;
