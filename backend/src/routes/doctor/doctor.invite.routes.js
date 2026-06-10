const express = require('express');
const DoctorAuthController = require('../../controllers/doctor/doctor.auth.controller');

const router = express.Router();

router.post('/validate', DoctorAuthController.validateInvite);
router.post('/complete', DoctorAuthController.completeInvite);

module.exports = router;
