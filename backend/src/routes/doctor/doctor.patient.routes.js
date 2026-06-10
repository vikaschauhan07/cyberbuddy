const express = require('express');
const DoctorPatientController = require('../../controllers/doctor/doctor.patient.controller');

const router = express.Router();

// For the List
router.get('/patients', DoctorPatientController.list);

// For the Dashboard
router.get('/patients/dashboard', DoctorPatientController.listDashboard);

// Get Paietn Detail, 
router.get('/patients/:id', DoctorPatientController.detail);

// Get Patients Tratment List
router.get('/patients/:id/treatments', DoctorPatientController.treatments);

// No use of hte Oximmeret now
router.get('/patients/:id/oximeter', DoctorPatientController.oximeter);

router.get('/patients/:id/clinical-assesmetn-list', DoctorPatientController.getClinicalMentAccessment);

// Get Cooment List
router.get('/patients/:id/commnets', DoctorPatientController.getComments);

// This is to Update a note
router.put('/patients/:id/notes', DoctorPatientController.updateNotes);

router.put('/patients/:id/comment', DoctorPatientController.updateComment);

router.put('/patients/:id/appointment', DoctorPatientController.updateAppointment);

router.put('/patients/:id/clinical-profile', DoctorPatientController.updateClinicalProfile);

module.exports = router;
