const authRoutes = require('./admin.auth.route');
const adminDashboard = require('./admin.dashboard.route');
const adminProfile = require('./admin.profile.route');
const adminPractice = require('./admin.practice.route');
const adminInventory = require('./admin.inventory.route');
const treatmentModel = require('./admin.treatmentInstruction.route');
const systemUpdates = require('./admin.systemUpdate.route');
const subsciption = require('./admin.subscription.route');
const machine = require('./admin.machine.route');
const deviceModelReference = require('./admin.deviceModelReference.route');
const hipaaAccessLog = require('./admin.hipaaAccessLog.route');
const product = require('./admin.product.route');

module.exports = {
    auth: authRoutes,
    protected: [
        adminDashboard,
        adminProfile,
        adminPractice,
        adminInventory,
        treatmentModel,
        systemUpdates,
        subsciption,
        machine,
        deviceModelReference,
        hipaaAccessLog,
        product
    ]
};
