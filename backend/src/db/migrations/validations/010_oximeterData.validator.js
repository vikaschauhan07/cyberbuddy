const mongoose = require('mongoose')

module.exports = async () => {
  console.log('▶ [010] Applying PatientOximeterData DB-level validation')

  const db = mongoose.connection.db
  const COLLECTION = 'OximeterData'

  // ✅ Ensure collection exists
  const collections = await db.listCollections({ name: COLLECTION }).toArray()
  if (collections.length === 0) {
    await db.createCollection(COLLECTION)
  }

  await db.command({
    collMod: COLLECTION,
    validator: {
      $jsonSchema: {
        bsonType: 'object',

        required: [
          'userId',
          'patientId'
        ],

        properties: {

          /**
           * -----------------------------
           * Audit Metadata
           * -----------------------------
           */
          createBy: {
            bsonType: ['binData']
          },

          createTime: {
            bsonType: 'date'
          },

          updateBy: {
            bsonType: ['string', 'long', 'null']
          },

          updateTime: {
            bsonType: ['date', 'null']
          },

          remark: {
            bsonType: ['binData', 'null']
          },

          /**
           * -----------------------------
           * Device & User Reference
           * -----------------------------
           */
          oximeterId: {
            bsonType: ['string', 'long']
          },

          userId: {
            bsonType: ['binData']
          },

          patientId: {
            bsonType: 'objectId'
          },

          userName: {
            bsonType: ['binData', 'null']
          },

          /**
           * -----------------------------
           * Vital Measurements (Encrypted PHI)
           * -----------------------------
           */
          spo2: {
            bsonType: ['binData']
          },

          pr: {
            bsonType: ['binData']
          },

          pi: {
            bsonType: ['binData']
          },

          sys: {
            bsonType: ['binData']
          },

          dia: {
            bsonType: ['binData']
          },

          /**
           * -----------------------------
           * System Created By
           * -----------------------------
           */
          createdBy: {
            bsonType: ['objectId', 'null']
          }
        }
      }
    },
    validationLevel: 'strict',
    validationAction: 'error'
  })

  console.log('✔ PatientOximeterData validation applied successfully')
}
