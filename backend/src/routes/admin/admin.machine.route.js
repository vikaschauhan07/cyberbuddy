const express = require('express');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const AdminMachineController = require('../../controllers/admin/admin.machine.controller');
const router = express.Router();

router.get(
    '/machine/all',
    cedarAuthorize({
        action: 'list',
        resource: 'Device'
    }),
    AdminMachineController.getAllMachines
);

router.get(
    '/machine/detail/:id',
    cedarAuthorize({
        action: 'read',
        resource: 'Device'
    }),
    AdminMachineController.getMachineDetail
);

router.get(
    '/machine/errorlogs/:id',
    cedarAuthorize({
        action: 'read',
        resource: 'Device'
    }),
    AdminMachineController.exportErrorLogsCSVBase64
);

router.get(
    '/machine/telemetry/:id',
    cedarAuthorize({
        action: 'read',
        resource: 'Device'
    }),
    AdminMachineController.exportTelemetryCSVBase64
);

router.post(
    '/machine/update-status',
    cedarAuthorize({
        action: 'update',
        resource: 'Inventory'
    }),
    AdminMachineController.updateStatus
);

module.exports = router;