/**
 * =====================================================
 * Migration: Initialize Indexes
 * =====================================================
 * - Syncs indexes defined in Mongoose schemas
 * - Uses modern Mongoose API
 * - Safe & idempotent
 */

const Admin = require('../../../entity/model/admin.model');
const Practices = require('../../../entity/model/practices.model');
const Inventory = require('../../../entity/model/inventory.model');
const Subscriptions = require('../../../entity/model/subscription.model');
const TreatmentModel = require('../../../entity/model/treatmentModel.model');
const SystemUpdates = require('../../../entity/model/systemUpdates.model');
const Machines = require('../../../entity/model/machine.model');
const DeviceUser = require('../../../entity/model/deviceUser.model');
const DoctorPatient = require('../../../entity/model/doctorPatient.model');
const OximeterData = require('../../../entity/model/oximeterData.model');
const Treatment = require('../../../entity/model/treatment.model');
const TreatmentImages = require('../../../entity/model/treatmentImages.model');
const AccessLog = require("../../../entity/model/accessLog.model");
const DeviceModelReference = require('../../../entity/model/deviceModelReference.model');

module.exports = async () => {
  console.log('▶ [001] Syncing indexes...')
  // Sync indexes exactly as defined in schema
  await Admin.syncIndexes();
  await Practices.syncIndexes();
  await Inventory.syncIndexes();
  await Subscriptions.syncIndexes();
  await TreatmentModel.syncIndexes();
  await SystemUpdates.syncIndexes();
  await Machines.syncIndexes();
  await DeviceModelReference.syncIndexes();


  await DeviceUser.syncIndexes();
  await DoctorPatient.syncIndexes();
  await OximeterData.syncIndexes();
  await Treatment.syncIndexes();
  await TreatmentImages.syncIndexes();
  await AccessLog.syncIndexes();
  // Uncomment ONLY if File model exists
  // await File.syncIndexes()
  console.log('✔ [001] Index sync completed')
}