const mongoose = require('mongoose')

/**
 * =====================================================
 * MongoDB JSON Schema Validation – Admin
 * =====================================================
 * - DB-level enforcement
 * - Visible in MongoDB Atlas
 * - Blocks invalid direct DB writes
 */

module.exports = async () => {
  console.log('▶ [002] Applying Admin DB-level validation')

  const db = mongoose.connection.db

  // ✅ Ensure collection exists (CRITICAL)
  const collections = await db.listCollections({ name: 'Admin' }).toArray()
  if (collections.length === 0) {
    await db.createCollection('Admin')
  }

  await db.command({
    collMod: 'Admin',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'firstName',
          'lastName',
          'email',
          'userName',
          'cognitoSub',
          'roleId',
          'status'
        ],
        properties: {
          firstName: {
            bsonType: 'string',
            minLength: 2,
            maxLength: 50
          },
          lastName: {
            bsonType: 'string',
            minLength: 2,
            maxLength: 50
          },
          userName: {
            bsonType: 'string',
            pattern: '^\\S+@\\S+\\.\\S+$'
          },
          email: {
            bsonType: 'string',
            pattern: '^\\S+@\\S+\\.\\S+$'
          },
          profileImage: {
            bsonType: ['string', 'null'],
            minLength: 17,
            maxLength: 1255
          },
          mfaSession: {
            bsonType: ['string', 'null']
          },
          emailVerified: {
            bsonType: 'bool'
          },
          phone: {
            bsonType: ['string', 'null']
          },
          cognitoSub: {
            bsonType: 'string',
            minLength: 10
          },
          roleId: {
            bsonType: 'objectId'
          },
          loginAttempts: {
            bsonType: 'int',
            minimum: 0,
            maximum: 20
          },
          loginFreeze: {
            bsonType: 'bool'
          },
          needRelogin: {
            bsonType: 'bool'
          },
          lastRequestFrom: {
            bsonType: ['string', 'null']
          },
          lastLogin: {
            bsonType: ['date', 'null']
          },
          passwordUpdatedAt:{
            bsonType: ['date', 'null']
          },
          timeZone: {
            bsonType: ['string', 'null']
          },
          status: {
            enum: ['active', 'disabled']
          },
          deletedAt: {
            bsonType: ['date', 'null']
          }
        }
      }
    },
    validationLevel: 'strict',
    validationAction: 'error'
  })

  console.log('✔ Admin validation applied & visible in Atlas')
}