const express = require('express');
const router = express.Router();
const stationController = require("../controllers/stationController");

router.get('/:stationName', stationController.getStationInfo);

module.exports = router;