const mongoose = require('mongoose')

/**
 * =====================================================
 * MongoDB JSON Schema Validation – Machines
 * =====================================================
 * - DB-level enforcement
 * - Visible in MongoDB Atlas
 * - Machine & subscription metadata only
 *
 * IMPORTANT:
 * ❌ No PHI
 * =====================================================
 */

module.exports = async () => {
  console.log('▶ [007] Applying Machines DB-level validation')

  const db = mongoose.connection.db

  // Ensure collection exists
  const collections = await db
    .listCollections({ name: 'Machines' })
    .toArray()

  if (collections.length === 0) {
    await db.createCollection('Machines')
  }

  await db.command({
    collMod: 'Machines',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'deviceNumber',
          'status',
          'createdAt',
          'updatedAt'
        ],
        properties: {
          /**
           * -----------------------------
           * Core Machine Information
           * -----------------------------
           */
          deviceNumber: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 200
          },

          serialNumber: {
            bsonType: ['string', 'null'],
            maxLength: 200
          },

          /**
           * -----------------------------
           * Subscription Information
           * -----------------------------
           */
          subscriptionStartTime: {
            bsonType: ['date', 'null']
          },

          subscriptionEndTime: {
            bsonType: ['date', 'null']
          },

          /**
           * -----------------------------
           * Status
           * -----------------------------
           * 0 = inactive
           * 1 = active
           * 2 = blocked
           */
          status: {
            bsonType: 'int',
            enum: [0, 1, 2]
          },
          
          devicePaired: {
            bsonType: 'int',
            enum: [0, 1, 2]
          }, 
          /**
           * -----------------------------
           * Device Security (Encrypted)
           * -----------------------------
           */
          devicePublicKey: {
            bsonType: ['binData', 'null'],
            description: 'Encrypted device public key stored using CSFLE'
          },

          keyVersion: {
            bsonType: ['int', 'null'],
            minimum: 1,
            description: 'Encryption key version for rotation support'
          },

          /**
           * -----------------------------
           * Location Information
           * -----------------------------
           */
          address: {
            bsonType: ['string', 'null'],
            maxLength: 300
          },

          city: {
            bsonType: ['string', 'null'],
            maxLength: 100
          },

          country: {
            bsonType: ['string', 'null'],
            maxLength: 100
          },

          zipCode: {
            bsonType: ['string', 'null'],
            maxLength: 20
          },

          location: {
            bsonType: ['string', 'null'],
            maxLength: 300
          },

          longitude: {
            bsonType: ['string', 'null'],
            maxLength: 50
          },

          latitude: {
            bsonType: ['string', 'null'],
            maxLength: 50
          },

          /**
           * -----------------------------
           * Practice Reference
           * -----------------------------
           */
          practice: {
            bsonType: ['objectId', 'null']
          },

          /**
           * -----------------------------
           * Legacy / External Tracking
           * -----------------------------
           */
          externalId: {
            bsonType: ['int', 'null']
          },

          remark: {
            bsonType: ['string', 'null'],
            maxLength: 500
          },

          /**
           * -----------------------------
           * Audit & Lifecycle (Base Model)
           * -----------------------------
           */
          createdBy: {
            bsonType: ['objectId', 'null']
          },

          updatedBy: {
            bsonType: ['objectId', 'null']
          },

          deletedAt: {
            bsonType: ['date', 'null']
          },

          createdAt: {
            bsonType: 'date'
          },

          updatedAt: {
            bsonType: 'date'
          }
        }
      }
    },
    validationLevel: 'strict',
    validationAction: 'error'
  })

  console.log('✔ Machines validation applied & visible in Atlas')
}
