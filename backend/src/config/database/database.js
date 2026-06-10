"use strict";

const mongoose = require("mongoose");
const { MONGO_DB_NAME, MONGO_URL } = require("../config");

/**
 * ---------------------------------------------------------
 * MongoDB Connection (Mongoose)
 * ---------------------------------------------------------
 * Establishes a secure connection to MongoDB using Mongoose.
 *
 * HIPAA Compliance Notes:
 * - Connection string is loaded from environment variables
 * - No credentials or connection details are logged
 * - Uses controlled database selection via dbName
 */
async function connectDB() {
  console.log("🗄️ [MongoDB] Connection initialization started");

  /**
   * Connect to MongoDB
   * HIPAA: Credentials remain encrypted and externalized
   */
  await mongoose.connect(MONGO_URL, {
    dbName: MONGO_DB_NAME
  });

  /**
   * Successful connection confirmation
   */
  console.log("✅ [MongoDB] Mongoose connected successfully");
}

module.exports = connectDB;