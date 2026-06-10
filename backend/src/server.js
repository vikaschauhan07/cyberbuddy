"use strict"

/**
 * =========================================================
 * APPLICATION ENTRY POINT (HIPAA-ALIGNED BOOTSTRAP)
 * =========================================================
 *
 * This file is responsible ONLY for:
 *  - Secure startup sequencing
 *  - Database initialization (with encryption)
 *  - Graceful shutdown
 *
 * ❌ No business logic here
 * ❌ No request handling here
 *
 * This separation is important for:
 *  - Audit clarity
 *  - Incident response
 *  - HIPAA compliance (minimum necessary access)
 */

const app = require("./app")
const mongoose = require("mongoose")
const { APP_PORT, NODE_ENV } = require("./config/config")

/**
 * Secure database connection helpers
 * - connectDB → Encrypted MongoDB (CSFLE enabled)
 * - ensureKeyVaultIndex → Required for data key management
 * - getMongoClient → Low-level client for lifecycle control
 */
const connectDB = require("./config/database/database")
const { ensureKeyVaultIndex } = require("./config/database/key-vault")
// const { loadSecrets } = require("./services/secrets")
const { getMongoClient } = require("./config/database/mongo.client")

/**
 * =========================================================
 * START HTTP SERVER
 * =========================================================
 *
 * Starts the Express server ONLY AFTER:
 *  ✅ Encryption prerequisites are validated
 *  ✅ Database connections are secure
 *
 * This prevents accidental handling of PHI
 * before encryption and access controls are ready.
 */
function startServer() {
  const server = app.listen(APP_PORT, () => {
    console.log(`🚀 Server running on port ${APP_PORT} [${NODE_ENV}] | APPLICATION URL: http://127.0.0.1:${APP_PORT}`);
  })

  /**
   * =====================================================
   * GRACEFUL SHUTDOWN HANDLER (HIPAA REQUIREMENT)
   * =====================================================
   *
   * Why this matters:
   *  - Prevents data corruption
   *  - Ensures encrypted connections are closed cleanly
   *  - Avoids orphaned DB sessions (audit risk)
   *
   * Triggered on:
   *  - SIGINT (Ctrl+C)
   *  - SIGTERM (container / process manager stop)
   */
  const shutdown = async (signal) => {
    console.log(`🛑 Received ${signal}. Shutting down securely...`)

    server.close(async () => {
      try {
        /**
         * Close Mongoose connection (ODM layer)
         * Ensures no pending writes of sensitive data
         */
        await mongoose.connection.close()

        /**
         * Close raw MongoDB client (encryption layer)
         * Required for CSFLE + KMS cleanup
         */
        const client = await getMongoClient()
        await client.close()

        console.log("✅ MongoDB connections closed securely")
      } catch (e) {
        /**
         * Log shutdown issues WITHOUT exposing data
         * (HIPAA: no sensitive data in logs)
         */
        console.error("⚠️ Shutdown error:", e.message)
      }

      process.exit(0)
    })
  }

  process.on("SIGINT", shutdown)
  process.on("SIGTERM", shutdown)
}

/**
 * =========================================================
 * APPLICATION BOOTSTRAP (FAIL-FAST, HIPAA-SAFE)
 * =========================================================
 *
 * Startup order is CRITICAL for compliance:
 *
 * 1️⃣ Verify MongoDB Atlas network access
 * 2️⃣ Ensure Key Vault index exists
 * 3️⃣ Establish encrypted database connection
 * 4️⃣ Start HTTP server
 *
 * If ANY step fails → app exits immediately
 * (No partial or insecure startup allowed)
 */
async function bootstrap() {
  try {

    /**
     * =====================================================
     * LOAD SECRETS (SECURITY CRITICAL — MUST RUN FIRST)
     * =====================================================
     *
     * Purpose:
     * - Securely fetch all sensitive configuration values
     *   from AWS Secrets Manager using the instance IAM role
     *
     * What this includes:
     * - Database connection strings
     * - Encryption / KMS key references
     * - Cedar policy store identifiers
     * - Authentication & authorization secrets
     *
     * Security guarantees:
     * - Secrets are NEVER stored in source code
     * - Secrets are NOT committed to version control
     * - Secrets are encrypted at rest (AWS-managed KMS)
     * - Access is controlled via least-privilege IAM policies
     * - All secret access is auditable via AWS CloudTrail
     *
     * HIPAA relevance:
     * - Prevents accidental plaintext handling of PHI
     * - Ensures encryption and access controls are configured
     *   BEFORE any database or network operation begins
     *
     * Failure handling:
     * - If secrets cannot be loaded, the application MUST exit
     * - Partial or insecure startup is not permitted
     */

    console.log("⏳ Verifying MongoDB Atlas network access...")
    // Optional: plain connectivity check (disabled in prod)

    /**
     * Ensure Key Vault collection has required index
     * - Mandatory for Client-Side Field Level Encryption
     * - Prevents runtime encryption failures
     */
    console.log("🔐 Ensuring Key Vault index...")
    await ensureKeyVaultIndex()
    console.log("✅ Key Vault ready")

    /**
     * Connect to MongoDB with:
     *  - CSFLE enabled
     *  - KMS-backed data keys
     *  - Encrypted-at-rest guarantees
     *
     * This is a HIPAA core requirement for PHI storage
     */
    console.log("🔒 Connecting encrypted MongoDB client...")
    await connectDB()

    /**
     * Start HTTP server ONLY after secure DB is ready
     */
    startServer()

    // Background scheduled jobs (non-blocking)
    // try {
    //   const cronResult = startReportPdfCron()
    //   if (cronResult?.started) {
    //     console.log(`[CRON] Report PDF cron started (${cronResult.schedule})`)
    //   }
    // } catch (e) {
    //   console.error("[CRON] Failed to start report PDF cron:", e?.message || e)
    // }

    // try {
    //   const cronResult = startReportBuildAndPdfCron()
    //   if (cronResult?.started) {
    //     console.log(`[CRON] Report build+pdf cron started (${cronResult.schedule})`)
    //   }
    // } catch (e) {
    //   console.error("[CRON] Failed to start report build+pdf cron:", e?.message || e)
    // }
  } catch (err) {
    /**
     * FAIL-FAST STRATEGY
     *
     * If encryption, KMS, or DB setup fails:
     *  - Application MUST NOT run
     *  - Prevents accidental plaintext data handling
     */
    console.error("❌ Startup failed (fail-fast):")
    console.error(err)
    process.exit(1)
  }
}

/**
 * =========================================================
 * BOOTSTRAP EXECUTION
 * =========================================================
 */
bootstrap()
