const express = require('express');
const DeviceTreatmentImagesControler = require('../../controllers/device/device.treatmentImages.controller');
const upload = require('../../middlewares/multer.middleware');
const router = express.Router();

router.post(
    "/patient/treatment_record/uploadTreatmentBeforeImagesFromPatient",
    // upload.any(),
    DeviceTreatmentImagesControler.uploadTreatmentImagesBeforeImages
);
router.post(
    "/patient/treatment_record/uploadTreatmentAfterImagesFromPatient", 
    // upload.any(),
    DeviceTreatmentImagesControler.uploadTreatmentImagesAfterImages
);
router.get("/patient/treatment_images/imageList", DeviceTreatmentImagesControler.getTreatmentImages);

module.exports = router;