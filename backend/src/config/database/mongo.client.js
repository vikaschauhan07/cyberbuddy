"use strict"

const { MongoClient } = require("mongodb")
const path = require("path")

const {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  MONGODB_KEY_VAULT_DB,
  MONGODB_KEY_VAULT_COLLECTION,
  MONGO_URL
} = require("../config")

const KEY_VAULT_NAMESPACE =
  `${MONGODB_KEY_VAULT_DB}.${MONGODB_KEY_VAULT_COLLECTION}`


let client

async function getMongoClient() {
  if (client) return client
  client = new MongoClient(MONGO_URL, {
    autoEncryption: {
      keyVaultNamespace: KEY_VAULT_NAMESPACE,
      kmsProviders: {
        aws: {
          // accessKeyId: AWS_ACCESS_KEY_ID,
          // secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
      },
      bypassAutoEncryption: true,
      extraOptions: {
        // cryptSharedLibPath,
        cryptSharedLibRequired: false
      }
    }
  })

  await client.connect()
  console.log("✅ MongoDB connected with CSFLE (libmongocrypt)")

  return client
}

module.exports = { getMongoClient }
