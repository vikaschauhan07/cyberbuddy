const express = require('express');
const router = express.Router();

// Admin
const AdminProfileController = require('../../controllers/admin/admin.profile.controller');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const upload = require('../../middlewares/multer.middleware');

/**
 * @route   GET /api/v1/admin/health
 * @desc    Admin service health check
 * @access  Public
 */
router.get(
    '/auth/health',
    cedarAuthorize({
        action: 'read',
        resource: 'Dashboard'
    }),
    (req, res) => {
        return res.status(200).json({
            success: true,
            status: 'UP',
            service: 'Admin API',
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });
    }
);

router.get(
    '/profile',
    cedarAuthorize({
        action: 'read',
        resource: 'Profile'
    }),
    AdminProfileController.profile
);

router.post(
    '/profile',
    cedarAuthorize({
        action: 'update',
        resource: 'Profile'
    }),
    AdminProfileController.updateProfile
);

router.post(
    '/change-profile-image',
    cedarAuthorize({
        action: 'update',
        resource: 'Profile'
    }),
    upload.single('image'),
    AdminProfileController.updateProfileImage
);

router.post(
    '/change-password',
    cedarAuthorize({
        action: 'update',
        resource: 'Profile'
    }),
    AdminProfileController.changePassword
);

module.exports = router;