const express = require('express');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const AdminHipaaAccessLogController = require('../../controllers/admin/admin.hipaaAccessLog.controller');

const router = express.Router();

router.get(
    '/hipaa-access-log/all',
    cedarAuthorize({
        action: 'read',
        resource: 'Dashboard'
    }),
    AdminHipaaAccessLogController.getAllHipaaAccessLogs
);

router.get(
    '/hipaa-access-log/request/:requestId',
    cedarAuthorize({
        action: 'read',
        resource: 'Dashboard'
    }),
    AdminHipaaAccessLogController.getHipaaAccessLogByRequestId
);

module.exports = router;
