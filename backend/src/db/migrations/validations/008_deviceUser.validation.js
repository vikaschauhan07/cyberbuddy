const mongoose = require('mongoose')

module.exports = async () => {
  console.log('▶ [008] Applying DeviceUser DB-level validation')

  const db = mongoose.connection.db
  const COLLECTION = 'DeviceUser'

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
          'userName',
          'email',
          'zogniqUserUniqueId',
          'cognitoSub'
        ],

        properties: {
          /**
           * -----------------------------
           * Identity
           * -----------------------------
           */
          userId: {
            bsonType: 'int'
          },

          zogniqUserUniqueId: {
            bsonType: 'string',
            minLength: 5
          },

          cognitoSub: {
            bsonType: 'string',
            minLength: 5
          },

          userName: {
            bsonType: 'string',
            minLength: 3,
            maxLength: 100
          },

          nickName: {
            bsonType: ['string', 'null'],
            maxLength: 100
          },

          email: {
            bsonType: 'string',
            pattern: '^\\S+@\\S+\\.\\S+$'
          },

          phoneNumber: {
            bsonType: ['string', 'null']
          },

          /**
           * -----------------------------
           * Personal
           * -----------------------------
           */
          sex: {
            bsonType: 'string',
            enum: ['M', 'F', 'O']
          },

          age: {
            bsonType: ['string', 'null']
          },

          birthDay: {
            bsonType: ['date', 'null']
          },

          avatar: {
            bsonType: ['string', 'null']
          },

          /**
           * -----------------------------
           * Location
           * -----------------------------
           */
          lat: {
            bsonType: ['string', 'null']
          },

          long: {
            bsonType: ['string', 'null']
          },

          address: {
            bsonType: ['string', 'null']
          },

          city: {
            bsonType: ['string', 'null']
          },

          state: {
            bsonType: ['string', 'null']
          },

          country: {
            bsonType: ['string', 'null']
          },

          /**
           * -----------------------------
           * Organization
           * -----------------------------
           */
          deptId: {
            bsonType: ['objectId', 'null']
          },

          roleId: {
            bsonType: ['objectId', 'null']
          },

          roleIds: {
            bsonType: ['array', 'null'],
            items: { bsonType: 'objectId' }
          },

          postIds: {
            bsonType: ['array', 'null'],
            items: { bsonType: 'objectId' }
          },

          admin: {
            bsonType: 'bool'
          },

          /**
           * -----------------------------
           * Status
           * -----------------------------
           */
          status: {
            bsonType: 'string',
            enum: ['0', '1']
          },

          delFlag: {
            bsonType: 'string',
            enum: ['0', '1']
          },

          /**
           * -----------------------------
           * Login Tracking
           * -----------------------------
           */
          loginIp: {
            bsonType: ['string', 'null']
          },

          loginDate: {
            bsonType: ['date', 'null']
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
          
          lastPasswordChanged:{
            bsonType: ['date', 'null']
          },

          /**
           * -----------------------------
           * Device / Subscription
           * -----------------------------
           */
          subscriptionId: {
            bsonType: ['string', 'null']
          },

          machineSerialNumber: {
            bsonType: ['string', 'null']
          },

          /**
           * -----------------------------
           * Metadata
           * -----------------------------
           */
          remark: {
            bsonType: ['string', 'null'],
            maxLength: 500
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
          }
        }
      }
    },
    validationLevel: 'strict',
    validationAction: 'error'
  })

  console.log('✔ DeviceUser validation applied & synced with Cognito model')
}
