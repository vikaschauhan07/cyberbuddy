const mongoose = require('mongoose')

/**
 * =====================================================
 * MongoDB JSON Schema Validation – Inventory
 * =====================================================
 * - DB-level enforcement
 * - Visible in MongoDB Atlas
 * - Blocks invalid direct DB writes
 *
 * IMPORTANT:
 * ❌ No PHI
 * ❌ Device & subscription metadata only
 * =====================================================
 */

module.exports = async () => {
  console.log('▶ [003] Applying Inventory DB-level validation')

  const db = mongoose.connection.db

  // ✅ Ensure collection exists
  const collections = await db
    .listCollections({ name: 'Inventory' })
    .toArray()

  if (collections.length === 0) {
    await db.createCollection('Inventory')
  }

  await db.command({
    collMod: 'Inventory',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'serialNumber',
          'inventoryStatus',
          'status'
        ],
        properties: {
          /**
           * -----------------------------
           * Device Identification
           * -----------------------------
           */
          serialNumber: {
            bsonType: 'string',
            minLength: 3,
            maxLength: 100
          },

          deviceNumber: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 100
          },

          /**
           * -----------------------------
           * Inventory & Subscription State
           * -----------------------------
           */
          inventoryStatus: {
            bsonType: 'string',
            enum: ['available', 'assigned', 'damaged', 'retired']
          },

          subscriptionStatus: {
            bsonType: ['string', 'null'],
            enum: ['active', 'inactive', 'expired', null]
          },

          status: {
            bsonType: 'string',
            enum: ['active', 'inactive']
          },

          /**
           * -----------------------------
           * Subscription Mapping
           * -----------------------------
           */
          subscriptionId: {
            bsonType: ['objectId', 'null']
          },

          /**
           * -----------------------------
           * System Flags
           * -----------------------------
           */
          isInventory: {
            bsonType: 'bool'
          },

          isSubscribed: {
            bsonType: 'bool'
          },

          isDeleted: {
            bsonType: 'bool'
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

  console.log('✔ Inventory validation applied & visible in Atlas')
}
