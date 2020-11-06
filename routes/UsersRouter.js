var express = require('express');
var router = express.Router();
const users = require("../controllers/UserController");

router.get('/', users.findAll);
router.get('/', users.find);
router.post('/', users.create);
router.put('/', users.update);
router.delete('/', users.delete);

module.exports = router;
