"use strict"

const { MongoClient, ClientEncryption } = require("mongodb")
const {
  AWS_REGION,
  AWS_KMS_KEY_ARN,
  MONGODB_KEY_VAULT_DB,
  MONGODB_KEY_VAULT_COLLECTION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  MONGO_URL
} = require("../config")

const KEY_VAULT_NAMESPACE =
  `${MONGODB_KEY_VAULT_DB}.${MONGODB_KEY_VAULT_COLLECTION}`

async function createOrGetDEK() {
  if (!AWS_KMS_KEY_ARN) {
    throw new Error("❌ AWS_KMS_KEY_ARN is missing")
  }

  const client = new MongoClient(MONGO_URL)
  await client.connect()

  const encryption = new ClientEncryption(client, {
    keyVaultNamespace: KEY_VAULT_NAMESPACE,
    kmsProviders: {
      aws: {
        // accessKeyId: AWS_ACCESS_KEY_ID,
        // secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
    }
  })

  const keyVault = client
    .db(MONGODB_KEY_VAULT_DB)
    .collection(MONGODB_KEY_VAULT_COLLECTION)

  const existing = await keyVault.findOne({
    keyAltNames: "hipaa-master-key"
  })

  if (existing) {
    console.log("🔐 Existing DEK found:", existing._id)
    await client.close()
    return
  }

  const dekId = await encryption.createDataKey("aws", {
    masterKey: {
      key: AWS_KMS_KEY_ARN,
      region: AWS_REGION
    },
    keyAltNames: ["hipaa-master-key"]
  })

  console.log("🔑 New DEK created:", dekId)
  await client.close()
}

createOrGetDEK()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("❌ DEK creation failed:", err)
    process.exit(1)
  })
