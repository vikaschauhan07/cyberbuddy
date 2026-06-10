const mongoose = require('mongoose')

module.exports = async function addDeviceModelReferenceValidation() {
  console.log('➡ Running migration: deviceModelReferenceId validation')

  const db = mongoose.connection.db
  const COLLECTION = 'Inventory'
  const collection = mongoose.connection.collection(COLLECTION)

  /**
   * ==============================
   * 1️⃣ Ensure field exists safely
   * ==============================
   */
  await collection.updateMany(
    { deviceModelReferenceId: { $exists: false } },
    { $set: { deviceModelReferenceId: null } }
  )

  /**
   * ==============================
   * 2️⃣ Index
   * ==============================
   */
  await collection.createIndex({ deviceModelReferenceId: 1 })

  /**
   * ==============================
   * 3️⃣ Apply DB Validation
   * ==============================
   */
  const collections = await db.listCollections({ name: COLLECTION }).toArray()
  if (collections.length === 0) {
    await db.createCollection(COLLECTION)
  }

  await db.command({
    collMod: COLLECTION,
    validator: {
      $jsonSchema: {
        bsonType: "object",

        properties: {
          deviceModelReferenceId: {
            bsonType: ["objectId", "null"],
            description: "Reference to DeviceModelReference collection"
          }
        }
      }
    },

    validationLevel: "moderate",
    validationAction: "error"
  })

  console.log('✅ Migration completed: deviceModelReferenceId validation added')
}