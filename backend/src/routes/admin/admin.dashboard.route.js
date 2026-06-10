const express = require('express');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const AdminDashboardController = require('../../controllers/admin/admin.dashboard.controller');

const router = express.Router();

router.get(
    '/dashboard/summary',
    cedarAuthorize({
        action: 'read',
        resource: 'Dashboard'
    }),
    AdminDashboardController.summary
);

router.get(
    '/dashboard/subscription-analytics',
    cedarAuthorize({
        action: 'read',
        resource: 'Dashboard'
    }),
    AdminDashboardController.subscriptionAnalytics
);

router.get(
    '/dashboard/revenue-analytics',
    cedarAuthorize({
        action: 'read',
        resource: 'Dashboard'
    }),
    AdminDashboardController.revenueAnalytics
);

module.exports = router;
