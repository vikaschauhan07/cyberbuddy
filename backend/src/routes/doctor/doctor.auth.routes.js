const express = require('express');
const DoctorAuthController = require('../../controllers/doctor/doctor.auth.controller');
const router = express.Router();

// Login api
router.post("/login", DoctorAuthController.login);

// Verify Mfa Api
router.post("/verify-mfa", DoctorAuthController.verifyLoginMfa);

// Get new token via referesh token
router.post("/refresh-token", DoctorAuthController.genrateNewTokenViaRefreshToken);

// Forgot Password api
router.post("/forgot-password", DoctorAuthController.forgotPassword);

// Forgot Password api change password api
router.post("/change-password", DoctorAuthController.verifyForgotPasswordOtp);

module.exports = router;