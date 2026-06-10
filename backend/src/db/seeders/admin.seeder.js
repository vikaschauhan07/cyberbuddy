const Admin = require('../../entity/model/admin.model')
const mongoose = require('mongoose')

/**
 * =====================================================
 * Admin Seeder (HIPAA-SAFE)
 * =====================================================
 * - Seeds initial admin from Cognito attributes
 * - Idempotent (safe to re-run)
 * - Does NOT override existing admin
 */

const seedAdmin = async () => {
  const cognitoPayload = {
    email: 'zogniq@yopmail.com',
    email_verified: 'true',
    sub: '44181438-1051-70d2-0d0e-b2af664e2fe7'//'349824e8-c071-7082-ee6f-a555e7546c87'
  }

  const existingAdmin = await Admin.findOne({
    cognitoSub: cognitoPayload.sub
  })

  if (existingAdmin) {
    console.log('ℹ️ Admin already exists, skipping seeding')
    return
  }

  const admin = new Admin({
    firstName: 'Zogniq',
    lastName: 'Admin',
    userName: cognitoPayload.email,
    email: cognitoPayload.email,
    emailVerified: cognitoPayload.email_verified === 'true',
    cognitoSub: cognitoPayload.sub,
    loginAttempts: 0,
    // ⚠️ Role must exist beforehand
    roleId: new mongoose.Types.ObjectId(
      process.env.DEFAULT_ADMIN_ROLE_ID
    ),

    status: 'active',

    // Audit fields
    // createdBy: 'system:seeder',
    // updatedBy: 'system:seeder'
  })

  await admin.save()

  console.log('✅ Admin seeded successfully')
}

module.exports = seedAdmin
