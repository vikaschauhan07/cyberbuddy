const express = require('express');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const AdminPracticeController = require('../../controllers/admin/admin.practice.controller');
const router = express.Router();

router.get(
    '/practice/health',
    cedarAuthorize({ action: 'read', resource: 'Practice' }),
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

router.post(
    '/practice/add',
    cedarAuthorize({ action: 'create', resource: 'Practice' }),
    AdminPracticeController.addNewPractice
);
router.post(
    '/practice/update',
    cedarAuthorize({ action: 'update', resource: 'Practice' }),
    AdminPracticeController.updatePractice
);
router.get(
    '/practice/all',
    cedarAuthorize({ action: 'list', resource: 'Practice' }),
    AdminPracticeController.getAllPractices
);
router.get(
    '/practice/view',
    cedarAuthorize({ action: 'read', resource: 'Practice' }),
    AdminPracticeController.getPracticeById
);
router.post(
    '/practice/admin/invite',
    cedarAuthorize({ action: 'update', resource: 'Practice' }),
    AdminPracticeController.upsertPracticeAdmin
);
router.post(
    '/practice/admin/resend-link',
    cedarAuthorize({ action: 'update', resource: 'Practice' }),
    AdminPracticeController.resendPracticeAdminInvite
);

module.exports = router;