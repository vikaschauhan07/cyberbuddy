const express = require('express');
const DoctorDeviceVerificationController = require('../../controllers/doctor/doctor.deviceVerification.controller');
const router = express.Router();

router.post('/register-client', DoctorDeviceVerificationController.registerClient);
router.post('/session-key', DoctorDeviceVerificationController.createSession);

module.exports = router;