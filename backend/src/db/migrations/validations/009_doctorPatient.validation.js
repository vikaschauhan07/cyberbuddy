const mongoose = require('mongoose')

module.exports = async () => {
  console.log('▶ [009] Applying DoctorPatient DB-level validation')

  const db = mongoose.connection.db
  const COLLECTION = 'DoctorPatient'

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
          'id',
          'doctorId',
          'zogniqId',
          'patientName',
          'gender',
          'machineNumber'
        ],

        properties: {
          // ----------------------------- Patient Reference - for device -----------------------------
          id: {
            bsonType: 'int'
          },

          /**
           * -----------------------------
           * Doctor Reference
           * -----------------------------
           */
          doctorId: {
            bsonType: 'string',
            minLength: 1
          },

          zogniqId: {
            bsonType: 'string',
            minLength: 5
          },

          version: {
            bsonType: 'int',
            minimum: 1
          },

          patientName: {
            bsonType: ['binData', 'null'],
          },

          gender: {
            bsonType: ['binData', 'null'],
          },

          age: {
            bsonType: ['binData', 'null'],
          },

          birthday: {
            bsonType: ['binData', 'null'],
          },

          maritalStatus: {
            bsonType: ['binData', 'null'],
          },

          /**
           * -----------------------------
           * Contact Information
           * -----------------------------
           */
          email: {
            bsonType: ['binData', 'null'],
          },

          phone: {
            bsonType: ['binData', 'null'],
          },

          /**
           * -----------------------------
           * Address Information
           * -----------------------------
           */
          street: {
            bsonType: ['binData', 'null'],
          },

          city: {
            bsonType: ['binData', 'null'],
          },

          state: {
            bsonType: ['binData', 'null'],
          },

          zipcode: {
            bsonType: ['binData', 'null'],
          },

          /**
           * -----------------------------
           * Device Mapping
           * -----------------------------
           */
          machineNumber: {
            bsonType: 'string',
            minLength: 3
          },

          /**
           * -----------------------------
           * Lifecycle
           * -----------------------------
           */
          isDeleted: {
            bsonType: 'bool'
          },

          lastTime: {
            bsonType: ['date', 'null']
          },

          remark: {
            bsonType: ['binData', 'null'],
          },

          /**
           * -----------------------------
           * Audit
           * -----------------------------
           */
          createBy: {
            bsonType: ['string', 'null']
          },

          updateBy: {
            bsonType: ['string', 'null']
          },

          createTime: {
            bsonType: 'date'
          },

          updateTime: {
            bsonType: ['date', 'null']
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

  console.log('✔ DoctorPatient validation applied successfully')
}