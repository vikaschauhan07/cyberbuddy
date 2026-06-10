const express = require('express');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const DeviceModelReferenceController = require('../../controllers/admin/admin.deviceModelReference.controller');
const router = express.Router();

router.post(
    '/device-model/add',
    cedarAuthorize({
        action: 'create',
        resource: 'Inventory'
    }),
    DeviceModelReferenceController.addNewModel
);

router.post(
    '/device-model/update',
    cedarAuthorize({
        action: 'update',
        resource: 'Inventory'
    }),
    DeviceModelReferenceController.update
);

router.get(
    '/device-model/all',
    cedarAuthorize({
        action: 'list',
        resource: 'Inventory'
    }),
    DeviceModelReferenceController.getAll
);

module.exports = router;
