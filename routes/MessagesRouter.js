var express = require('express');
var router = express.Router();
const message = require("../controllers/MessageController");

router.post('/find', message.find);
router.post('/create', message.create);

module.exports = router;
