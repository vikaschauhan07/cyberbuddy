const mongoose = require('mongoose')

/**
 * =====================================================
 * MongoDB JSON Schema Validation – Subscriptions
 * =====================================================
 * - DB-level enforcement
 * - Visible in MongoDB Atlas
 * - Blocks invalid direct DB writes
 *
 * IMPORTANT:
 * ❌ No PHI
 * ❌ Billing & device metadata only
 * =====================================================
 */

module.exports = async () => {
  console.log('▶ [004] Applying Subscriptions DB-level validation')

  const db = mongoose.connection.db

  // ✅ Ensure collection exists
  const collections = await db
    .listCollections({ name: 'Subscriptions' })
    .toArray()

  if (collections.length === 0) {
    await db.createCollection('Subscriptions')
  }

  await db.command({
    collMod: 'Subscriptions',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'fullName',
          'email',
          'device',
          'amount',
          'isRecurring',
          'planType',
          'productId',
          'city',
          'address',
          'zipCode',
          'country',
          'practice',
          'expiredAt',
          'status',
          'createdAt',
          'updatedAt'
        ],
        properties: {
          /**
           * -----------------------------
           * Customer Information
           * -----------------------------
           */
          fullName: {
            bsonType: 'string',
            minLength: 2,
            maxLength: 100
          },

          email: {
            bsonType: 'string',
            pattern: '^\\S+@\\S+\\.\\S+$'
          },

          machineId: {
            bsonType: 'objectId'
          },

          /**
           * -----------------------------
           * Billing Information
           * -----------------------------
           */
          amount: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 50
          },

          isRecurring: {
            bsonType: 'bool'
          },

          planType: {
            bsonType: 'string',
            enum: ['month', 'year', 'one-time']
          },

          productId: {
            bsonType: 'string',
            minLength: 3,
            maxLength: 100
          },

          /**
           * -----------------------------
           * Address Information
           * -----------------------------
           */
          city: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 100
          },

          address: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 255
          },

          zipCode: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 20
          },

          country: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 100
          },

          verificationToken: {
            bsonType: 'string'
          },

          clientSecret: {
            bsonType: 'string'
          },

          paymentIntent: {
            bsonType: 'string'
          },

          subscriptionId:{
            bsonType: 'string'
          },

          stripeSessionId: {
            bsonType: 'string'
          },

          /**
           * -----------------------------
           * Practice Mapping
           * -----------------------------
           */
          practice: {
            bsonType: 'objectId'
          },

          /**
           * -----------------------------
           * Lifecycle
           * -----------------------------
           */
          expiredAt: {
            bsonType: 'date'
          },

          /**
           * -----------------------------
           * Status
           * -----------------------------
           * 1 = Active
           * 0 = Inactive
           */
          status: {
            bsonType: 'int',
            enum: [0, 1, 2, 3]
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

  console.log('✔ Subscriptions validation applied & visible in Atlas')
}