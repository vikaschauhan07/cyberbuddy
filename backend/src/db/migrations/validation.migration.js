/**
 * =====================================================
 * Migration Runner
 * =====================================================
 * _ Explicit execution
 * - Ordered
 * - No auto-run on app start
 */

const connectDB = require('../../config/database/database.js')

const migrations = [
  require('./validations/001_admin.validator.js'),
  require('./validations/002_practices.validator.js'),
  require('./validations/003_inventory.validator.js'),
  require('./validations/004_subscriptions.validation.js'),
  require('./validations/005_treatmentModel.validation.js'),
  require('./validations/006_systemUpdates.validation.js'),
  require('./validations/007_machine.validation.js'),
  require('./validations/008_deviceUser.validation.js'),
  require('./validations/009_doctorPatient.validation.js'),
  require('./validations/010_oximeterData.validator.js'),
  require("./validations/011_treatment.validation.js"),
  require("./validations/012_treatmentImages.validation.js"),
  require("./validations/013_deviceModelReference.validation.js")
]

module.exports = async function validationMigration() {
  try {
    console.log('▶ Starting validation migration...')
    await connectDB()

    for (const migrate of migrations) {
      await migrate()
    }

    console.log('✅ All validation migrations completed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}