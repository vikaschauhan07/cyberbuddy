const express = require('express');
const DeviceSystemUpdateController = require('../../controllers/device/device.systemUpdate.controller');
const router = express.Router();

router.get('/updates/update', DeviceSystemUpdateController.getSystemUpdate);

module.exports = router;