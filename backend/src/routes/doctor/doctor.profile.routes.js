const express = require('express');
const DoctorProfileController = require('../../controllers/doctor/doctor.profile.controller');

const router = express.Router();

router.get('/profile', DoctorProfileController.profile);
router.post('/profile/image', DoctorProfileController.updateProfileImage);
router.post('/profile/practice-logo', DoctorProfileController.updatePracticeLogo);
router.post('/profile/change-password/request-otp', DoctorProfileController.requestChangePasswordOtp);
router.post('/profile/change-password', DoctorProfileController.changePassword);

module.exports = router;
