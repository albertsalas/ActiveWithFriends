var express = require('express');
var router = express.Router();
const activities = require("../controllers/ActivityController");

/* GET profile page. */
router.get('/', activities.findUserEvents);




module.exports = router;