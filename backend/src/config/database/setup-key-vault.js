"use strict"

const { getMongoClient } = require("./mongo.client")

const KEY_VAULT_DB = "encryption"
const KEY_VAULT_COLLECTION = "__keyVault"

async function setupKeyVault() {
  const client = await getMongoClient()
  const db = client.db(KEY_VAULT_DB)

  // ✅ Ensure collection exists
  const collections = await db.listCollections(
    { name: KEY_VAULT_COLLECTION }
  ).toArray()

  if (collections.length === 0) {
    await db.createCollection(KEY_VAULT_COLLECTION)
    console.log("✅ Key Vault collection created")
  } else {
    console.log("ℹ️ Key Vault collection already exists")
  }

  const collection = db.collection(KEY_VAULT_COLLECTION)

  // ✅ Ensure index exists
  const indexes = await collection.indexes()
  const exists = indexes.some(i => i.name === "keyAltNames_1")

  if (!exists) {
    await collection.createIndex(
      { keyAltNames: 1 },
      {
        unique: true,
        partialFilterExpression: {
          keyAltNames: { $exists: true }
        }
      }
    )
    console.log("✅ Key Vault index created")
  } else {
    console.log("ℹ️ Key Vault index already exists")
  }
}

setupKeyVault()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("❌ Key vault setup failed:", err)
    process.exit(1)
  })
