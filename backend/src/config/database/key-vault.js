"use strict";

const { MONGODB_KEY_VAULT_COLLECTION, MONGODB_KEY_VAULT_DB } = require("../config");
const { getMongoClient } = require("./mongo.client");

/**
 * ---------------------------------------------------------
 * MongoDB Key Vault Configuration
 * ---------------------------------------------------------
 * Used for Client-Side Field Level Encryption (CSFLE).
 * HIPAA: Encryption keys are stored securely in a dedicated
 * key vault collection with strict indexing rules.
 */
const KEY_VAULT_DB = MONGODB_KEY_VAULT_DB;
const KEY_VAULT_COLLECTION = MONGODB_KEY_VAULT_COLLECTION;

/**
 * ---------------------------------------------------------
 * Ensure Key Vault Index Exists
 * ---------------------------------------------------------
 * - Ensures unique index on `keyAltNames`
 * - Required by MongoDB CSFLE specification
 * - Must be executed once during application startup
 *
 * HIPAA Compliance Notes:
 * - No key material is logged
 * - Index enforces uniqueness and prevents key collisions
 * - Safe to run multiple times (idempotent)
 */
async function ensureKeyVaultIndex() {
  console.log("🔐 [CSFLE] Key Vault index verification started");

  /**
   * Obtain MongoDB client
   * HIPAA: Uses secured connection (TLS + auth)
   */
  const client = await getMongoClient();

  console.log("📦 [CSFLE] Connected to MongoDB");

  /**
   * Access key vault collection
   * HIPAA: Dedicated collection for encryption metadata
   */
  const collection = client
    .db(KEY_VAULT_DB)
    .collection(KEY_VAULT_COLLECTION);

  console.log("📂 [CSFLE] Checking existing indexes on key vault");

  /**
   * Retrieve existing indexes
   */
  const indexes = await collection.indexes();

  /**
   * Verify presence of required index
   */
  const exists = indexes.some(i => i.name === "keyAltNames_1");

  if (!exists) {
    console.log("➕ [CSFLE] Required index not found, creating index");

    /**
     * Create unique index on keyAltNames
     * HIPAA: Ensures encryption key aliases remain unique
     */
    await collection.createIndex(
      { keyAltNames: 1 },
      {
        unique: true,
        partialFilterExpression: {
          keyAltNames: { $exists: true }
        }
      }
    );

    console.log("✅ [CSFLE] Key Vault index created successfully");
  } else {
    /**
     * Index already exists – safe state
     */
    console.log("ℹ️ [CSFLE] Key Vault index already exists");
  }

  console.log("🔎 [CSFLE] Key Vault index verification completed");
}

module.exports = { ensureKeyVaultIndex };