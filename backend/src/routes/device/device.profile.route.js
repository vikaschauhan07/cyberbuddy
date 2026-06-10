const express = require('express');
const DeviceProfileController = require('../../controllers/device/device.profile.controller');
const router = express.Router();


router.get('/get-my-profile', DeviceProfileController.getMyProfile);



module.exports = router;