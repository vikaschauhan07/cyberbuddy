const express = require('express');
const DoctorTreatmentController = require('../../controllers/doctor/doctor.treatment.controller');

const router = express.Router();

router.get('/treatments', DoctorTreatmentController.list);
router.get('/treatments/dashboard', DoctorTreatmentController.listDashboard);


router.get('/treatments/:id', DoctorTreatmentController.detail);
router.put('/treatments/:id/notes', DoctorTreatmentController.updateNotes);

module.exports = router;
