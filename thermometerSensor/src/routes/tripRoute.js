var express = require('express');
var router = express.Router();
var { startTrip, stopTrip } = require('../controller/tripController');

router.post('/', startTrip);
router.delete('/', stopTrip);

module.exports = router;
