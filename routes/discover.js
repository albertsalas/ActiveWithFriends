var express = require('express');
var router = express.Router();
const activities = require("../controllers/ActivityController");



router.get('/', async (req,res) => {

    res.render('discover', { title: 'Discover' });
});

//router.get('/', activities.findUserEvents);

router.get('/eventInfo/:id', activities.findEvent);





module.exports = router;
