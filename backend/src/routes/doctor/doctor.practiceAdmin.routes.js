const express = require('express');
const DoctorPracticeAdminController = require('../../controllers/doctor/doctor.practiceAdmin.controller');

const router = express.Router();

router.get('/practice-admin/doctors', DoctorPracticeAdminController.listDoctors);
router.get('/practice-admin/doctors/:id', DoctorPracticeAdminController.doctorDetail);
router.post('/practice-admin/doctors/:id/delete', DoctorPracticeAdminController.softDeleteDoctor);
router.get('/practice-admin/devices', DoctorPracticeAdminController.listDevices);
router.get('/practice-admin/devices/:id', DoctorPracticeAdminController.deviceDetail);
router.get('/practice-admin/access-logs', DoctorPracticeAdminController.listAccessLogs);

module.exports = router;
