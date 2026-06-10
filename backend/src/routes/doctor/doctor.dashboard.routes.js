const express = require('express');
const DoctorDashboardController = require('../../controllers/doctor/doctor.dashboard.controller');
const router = express.Router();

// This will give the count for the overview
router.get('/dashboard/overview', DoctorDashboardController.overview);

// This will for the leaderboard
router.get('/dashboard/leaderboards', DoctorDashboardController.leaderboards);

// Will check the Repeat comparison
router.get('/dashboard/repeat-patients', DoctorDashboardController.repeatPatients);

// Will show graph
router.get('/dashboard/patient-growth', DoctorDashboardController.patientGrowth);

module.exports = router;
