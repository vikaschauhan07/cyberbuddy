const express = require('express');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const AdminTreatmentInstructionController = require('../../controllers/admin/admin.treatmentInstructions.controller');
const upload = require('../../middlewares/multer.middleware');
const router = express.Router();

/**
 * @route   GET /api/v1/admin/health
 * @desc    Admin service health check
 * @access  Public
 */
router.get(
    '/treatment-model/health',
    cedarAuthorize({
        action: 'read',
        resource: 'TreatmentConfig'
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
    '/treatment-model/add',
    cedarAuthorize({
        action: 'create',
        resource: 'TreatmentConfig'
    }),
    AdminTreatmentInstructionController.addNewTreatmentInstruction
);

router.get(
    '/treatment-model/all',
    cedarAuthorize({
        action: 'list',
        resource: 'TreatmentConfig'
    }),
    AdminTreatmentInstructionController.getAllTreatmentInstruction
);

router.post(
    '/treatment-model/update',
    cedarAuthorize({
        action: 'update',
        resource: 'TreatmentConfig'
    }),
    AdminTreatmentInstructionController.updateTreatmentModel
);

router.post(
    '/treatment-model/upload',
    cedarAuthorize({
        action: 'create',
        resource: 'TreatmentConfig'
    }),
    upload.single('image'),
    AdminTreatmentInstructionController.uploadTreatmentImage
);

router.get(
    '/treatment-model/view',
    cedarAuthorize({
        action: 'read',
        resource: 'TreatmentConfig'
    }),
    AdminTreatmentInstructionController.getTreatmentModelById
);

router.get(
    '/treatment-model/delete',
    cedarAuthorize({
        action: 'update',
        resource: 'TreatmentConfig'
    }),
    AdminTreatmentInstructionController.deleteTreatmentModel
);

module.exports = router;