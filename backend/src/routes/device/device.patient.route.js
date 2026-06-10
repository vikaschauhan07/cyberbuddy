const express = require('express');
const DevicePatientController = require('../../controllers/device/device.patient.controller');
const router = express.Router();

router.post('/patient/doctor_patient', DevicePatientController.addNewPatient);
router.get('/patient/doctor_patient/list', DevicePatientController.getPatientList);
router.get('/patient/doctor_patient/delete', DevicePatientController.deletePatient);


module.exports = router;