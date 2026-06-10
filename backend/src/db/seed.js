/**
 * =====================================================
 * Seeder Runner
 * =====================================================
 * - Explicit execution
 * - Never runs on app startup
 */

const connectDB = require('../config/database/database')
const seedAdmin = require('./seeders/admin.seeder')

const run = async () => {
  try {
    console.log('▶ Starting DB seeding...')
    await connectDB()

    await seedAdmin()

    console.log('✅ DB seeding completed')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeder failed:', err)
    process.exit(1)
  }
}

run()