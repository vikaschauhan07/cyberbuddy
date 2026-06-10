const express = require('express');
const DeviceAuthController = require('../../controllers/device/device.auth.controller');
const router = express.Router();



router.post("/register", DeviceAuthController.register);
router.post("/verify-verification-otp", DeviceAuthController.veriiyVerificationOtp);
router.post("/resend-verify-verification-otp", DeviceAuthController.resendVeriiyVerificationOtp);
router.post("/login", DeviceAuthController.login);
router.post("/verify-mfa", DeviceAuthController.verifyLoginMfa);
router.post("/resend-mfa", DeviceAuthController.resendLoginMfaOtp);

router.post("/forgot-password", DeviceAuthController.forgotPassword);
router.post("/resend-otp", DeviceAuthController.resendForgotPasswordOtp);
router.post("/change-password", DeviceAuthController.verifyForgotPasswordOtp);

router.post("/refresh-token", DeviceAuthController.genrateNewTokenViaRefreshToken);
router.get("/get-device-service-pin", DeviceAuthController.getDeviceServcePin)

module.exports = router;