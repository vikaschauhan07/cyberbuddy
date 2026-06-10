/**
 * =====================================================
 * Migration Runner
 * =====================================================
 * - Explicit execution
 * - Ordered
 * - No auto-run on app start
 */

const modelMigration = require('./migrations/model.migration');
const validationMigration = require('./migrations/validation.migration');
const run = async () => {
  try {
    console.log('▶ Starting migrations Process...')
    await modelMigration();
    await validationMigration();
    console.log('✅ All migrations completed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

run()
