const express = require('express');
const DeviceOximeterController = require('../../controllers/device/device.oximeter.controller');
const router = express.Router();

router.post("/patient/oximeter", DeviceOximeterController.addOximeterRecord);
router.get("/patient/oximeter/listNoUser", DeviceOximeterController.getOximeterRecord);

module.exports = router;