const deviceSystemUpdate = require('./device.systemUpdate.route');
const devicePair = require('./device.pair.route');
const deviceHealth = require("./device.health.route");
const deviceAuth = require("./device.auth.route");
const deviceProfile = require("./device.profile.route");
const devicePatient = require("./device.patient.route");
const deviceTreatmentInstructions = require("./device.treatmentInstructions.route");
const deviceOximeter = require("./device.oximeter.route");
const deviceTreatment = require("./device.treatment.route");
const deviceTreatmentImages = require("./device.treatmentImages.route");
module.exports = {
    pair: devicePair,
    common: deviceSystemUpdate,
    health: deviceHealth,
    auth: [deviceAuth],
    protected: [deviceProfile, devicePatient, deviceTreatmentInstructions, deviceOximeter, deviceTreatment, deviceTreatmentImages]
};
