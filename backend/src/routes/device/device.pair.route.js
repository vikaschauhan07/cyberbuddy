const express = require('express');
const DevicePairCotroller = require('../../controllers/device/device.pairing.controller');
const secureRequestMiddleware = require('../../middlewares/secureRequest.middleware');
const router = express.Router();


router.post('/pair-challenge', DevicePairCotroller.getPairChallange);
router.post('/register-device', DevicePairCotroller.registerDevice);
router.post("/session-key", DevicePairCotroller.createSession);

/**
 * @route   GET /api/v1/admin/health
 * @desc    Admin service health check
 * @access  Public
 */
router.get('/health',secureRequestMiddleware, (req, res) => {
    console.log(req.query);
    return res.status(200).json({
        success: true,
        status: 'UP',
        service: 'Device API',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});


module.exports = router;