const express = require('express');
const DeviceTreatmentController = require('../../controllers/device/device.treatment.controller');
const router = express.Router();

router.post("/patient/treatment_record", DeviceTreatmentController.addNewTreatment);
router.get("/patient/treatment_record/listNoUser", DeviceTreatmentController.getAllTreatmentRecord);
router.get("/patient/treatment_record/detail/:id", DeviceTreatmentController.getTreatmentDetails);
router.post('/patient/treatment_record/:id/clinical-profile', DeviceTreatmentController.updateClinicalProfile);
router.get('/patient/treatment_record/:id/clinical-profile', DeviceTreatmentController.getClinicalProfile);

module.exports = router;