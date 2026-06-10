const express = require('express');
const DeviceTreatmentInstructionContoller = require('../../controllers/device/device.treatmentInstructions.controller');
const router = express.Router();

router.get('/treatment-model', DeviceTreatmentInstructionContoller.getTreatmentInstructionList);
router.post('/treatment-model/add', DeviceTreatmentInstructionContoller.addNewTreatmentInstruction);
router.post('/treatment-model/update', DeviceTreatmentInstructionContoller.updateTreatmentInstruction);
router.get('/treatment-model/delete', DeviceTreatmentInstructionContoller.deleteTreatmentInstruction);


module.exports = router;