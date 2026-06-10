const express = require('express');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const AdminInventoryController = require('../../controllers/admin/admin.inventory.controller');
const router = express.Router();

router.get(
    '/inventory/health',
    cedarAuthorize({
        action: 'read',
        resource: 'Inventory'
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

router.post(
    '/inventory/add',
    cedarAuthorize({
        action: 'create',
        resource: 'Inventory'
    }),
    AdminInventoryController.addNewInventory
);

router.post(
    '/inventory/update-status',
    cedarAuthorize({
        action: 'update',
        resource: 'Inventory'
    }),
    AdminInventoryController.updateStatus
);

router.get(
    '/inventory/all',
    cedarAuthorize({
        action: 'list',
        resource: 'Inventory'
    }),
    AdminInventoryController.getAllInventory
);

module.exports = router;
