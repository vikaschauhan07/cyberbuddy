const mongoose = require('mongoose')

/**
 * =====================================================
 * MongoDB JSON Schema Validation – Practices
 * =====================================================
 * - DB-level enforcement
 * - Visible in MongoDB Atlas
 * - Blocks invalid direct DB writes
 */

module.exports = async () => {
  console.log('▶ [002] Applying Practices DB-level validation')

  const db = mongoose.connection.db

  // ✅ Ensure collection exists
  const collections = await db.listCollections({ name: 'Practices' }).toArray()
  if (collections.length === 0) {
    await db.createCollection('Practices')
  }

  await db.command({
    collMod: 'Practices',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'status'],
        properties: {
          name: {
            bsonType: 'string',
            minLength: 2,
            maxLength: 100
          },
          description: {
            bsonType: ['string', 'null'],
            maxLength: 500
          },
          status: {
            bsonType: 'int',
            enum: [0, 1]
          },
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

  console.log('✔ Practices validation applied & visible in Atlas')
}