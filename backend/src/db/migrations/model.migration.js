/**
 * =====================================================
 * Migration Runner
 * =====================================================
 * - Explicit execution
 * - Ordered
 * - No auto-run on app start
 */

const connectDB = require('../../config/database/database')

const migrations = [
  require('./model/001-init-indexes'),
  require('./model/002-newColumn-inventory.model')
]

module.exports = async function modelMigration() {
  try {
    console.log('▶ Starting Model migrations...')
    await connectDB()

    for (const migrate of migrations) {
      await migrate()
    }
    console.log('✅ All migrations completed')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}