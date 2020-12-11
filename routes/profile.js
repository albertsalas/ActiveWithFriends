var express = require('express');
var router = express.Router();
const activities = require("../controllers/ActivityController");

router.get('/', activities.findUserEvents);

module.exports = router;