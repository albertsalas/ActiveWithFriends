var express = require('express');
var router = express.Router();
const activities = require("../controllers/ActivityController");

router.get('/', activities.findAll);
router.get('/:id', activities.find);
router.post('/', activities.create);
router.put('/', activities.update);
router.delete('/', activities.delete);

module.exports = router;
