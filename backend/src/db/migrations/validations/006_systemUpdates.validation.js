const mongoose = require('mongoose')

/**
 * =====================================================
 * MongoDB JSON Schema Validation – SystemUpdates
 * =====================================================
 * - DB-level enforcement
 * - Visible in MongoDB Atlas
 * - Application update & release metadata only
 *
 * IMPORTANT:
 * ❌ No PHI
 * =====================================================
 */

module.exports = async () => {
  console.log('▶ [006] Applying SystemUpdates DB-level validation')

  const db = mongoose.connection.db

  // Ensure collection exists
  const collections = await db
    .listCollections({ name: 'SystemUpdates' })
    .toArray()

  if (collections.length === 0) {
    await db.createCollection('SystemUpdates')
  }

  await db.command({
    collMod: 'SystemUpdates',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'appName',
          'versionCode',
          'versionName',
          'updateType',
          'size',
          'apkSize',
          'apkUrl',
          'hex',
          'buildType',
          'userId',
          'createdAt',
          'updatedAt'
        ],
        properties: {
          /**
           * -----------------------------
           * Application Identity
           * -----------------------------
           */
          appName: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 100
          },

          versionCode: {
            bsonType: 'string',
            minLength: 1
          },

          versionName: {
            bsonType: 'string',
            minLength: 1
          },

          /**
           * -----------------------------
           * Update Metadata
           * -----------------------------
           */
          remark: {
            bsonType: ['string', 'null'],
            maxLength: 300
          },

          updateDesc: {
            bsonType: ['string', 'null'],
            maxLength: 1000
          },

          updateType: {
            bsonType: 'int',
            enum: [1, 2] // 1 = Optional, 2 = Forced
          },

          /**
           * -----------------------------
           * Build & Package Info
           * -----------------------------
           */
          size: {
            bsonType: 'string',
            minLength: 1
          },

          apkSize: {
            bsonType: 'string',
            minLength: 1
          },

          apkUrl: {
            bsonType: 'string',
            minLength: 1
          },

          hex: {
            bsonType: 'string',
            minLength: 32,
            maxLength: 64
          },

          buildType: {
            bsonType: 'int'
          },

          /**
           * -----------------------------
           * Ownership / Release Control
           * -----------------------------
           */
          userId: {
            bsonType: 'objectId'
          },

          /**
           * -----------------------------
           * Audit & Lifecycle
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

  console.log('✔ SystemUpdates validation applied & visible in Atlas')
}
