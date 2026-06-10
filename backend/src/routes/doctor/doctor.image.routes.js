const express = require('express');
const DoctorImageController = require('../../controllers/doctor/doctor.image.controller');

const router = express.Router();

router.get('/images', DoctorImageController.list);

module.exports = router;
