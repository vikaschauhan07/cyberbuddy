const doctorDeviceVerification = require('./doctor.deviceVerification.routes');
const doctorAuth = require('./doctor.auth.routes');
const doctorInvite = require('./doctor.invite.routes');
const doctorDashboard = require('./doctor.dashboard.routes');
const doctorProfile = require('./doctor.profile.routes');
const doctorPatient = require('./doctor.patient.routes');
const doctorReport = require('./doctor.report.routes');
const doctorTreatment = require('./doctor.treatment.routes');
const doctorImage = require('./doctor.image.routes');
const doctorPracticeAdmin = require('./doctor.practiceAdmin.routes');

module.exports = {
  pair: doctorDeviceVerification,
  common: [],
  health: [],
  invite: [doctorInvite],
  auth: [doctorAuth],
  protected: [doctorDashboard, doctorProfile, doctorPatient, doctorReport, doctorTreatment, doctorImage, doctorPracticeAdmin],
};
