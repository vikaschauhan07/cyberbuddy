const express = require('express');
const DoctorReportController = require('../../controllers/doctor/doctor.report.controller');

const router = express.Router();

router.get('/reports', DoctorReportController.list);
router.get('/reports/:id', DoctorReportController.detail);
router.post('/reports/patient/:id/generate', DoctorReportController.generate);

module.exports = router;
