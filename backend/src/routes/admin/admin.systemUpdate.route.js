const express = require('express');
const upload = require('../../middlewares/multer.middleware');
const AdminSystemUpatesController = require('../../controllers/admin/admin.systemUpates.controller');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const router = express.Router();

router.post(
    '/system-update/apk-parse',
    cedarAuthorize({
        action: 'read',
        resource: 'AppUpdate'
    }),
    upload.single('apk'),
    AdminSystemUpatesController.parseApkFile
);

router.post(
    '/system-update/add',
    cedarAuthorize({
        action: 'read',
        resource: 'AppUpdate'
    }),
    upload.single('apk'),
    AdminSystemUpatesController.addNewBuild
);

router.get(
    '/system-update/all',
    cedarAuthorize({
        action: 'read',
        resource: 'AppUpdate'
    }),
    AdminSystemUpatesController.getAllUpdates
);

module.exports = router;