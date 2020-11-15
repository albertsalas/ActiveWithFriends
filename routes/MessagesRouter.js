var express = require('express');
var router = express.Router();
const message = require("../controllers/MessageController");

router.get('/', (req, res) => {
    res.render('chat', {title: "Chat"});
});
router.post('/', message.create);

module.exports = router;
