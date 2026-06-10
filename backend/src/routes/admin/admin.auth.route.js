const express = require('express');
const router = express.Router();

// Admin
const AdminAuthController = require('../../controllers/admin/admin.auth.controller');

/**
 * @route   GET /api/v1/admin/health
 * @desc    Admin service health check
 * @access  Public
 */
router.get('/health', (req, res) => {
    return res.status(200).json({
        success: true,
        status: 'UP',
        service: 'Admin API',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

/**
 * @route   POST /api/v1/admin/login
 * @desc    Authenticate admin user and initiate login process
 * @access  Public
 */
router.post('/login', AdminAuthController.login);

/**
 * @route   POST /api/v1/admin/verify-mfa
 * @desc    Verify multi-factor authentication (MFA) code for admin login
 * @access  Public
 */
router.post('/verify-mfa', AdminAuthController.verifyMfa);

/**
 * @route   POST /api/v1/admin/forgot-password
 * @desc    Send password reset instructions to admin email
 * @access  Public
 */
router.post('/forgot-password', AdminAuthController.forgotPassword);

/**
 * @route   POST /api/v1/admin/change-password
 * @desc    Change or reset admin password using valid OTP
 * @access  Public
 */
router.post('/change-password', AdminAuthController.changePassword);

module.exports = router;
