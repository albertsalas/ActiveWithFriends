var express = require('express');
var router = express.Router();
const activities = require("../controllers/ActivityController");




router.get('/', activities.findEvent);
router.get('/join', activities.joinActivity);





module.exports = router;
