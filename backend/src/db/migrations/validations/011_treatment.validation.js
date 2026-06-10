"use strict";

const mongoose = require("mongoose");

module.exports = async () => {

  console.log("▶ [010] Applying Treatment DB-level validation");

  const db = mongoose.connection.db;
  const COLLECTION = "Treatment";

  // Ensure collection exists
  const collections =
    await db.listCollections({ name: COLLECTION }).toArray();

  if (collections.length === 0) {
    await db.createCollection(COLLECTION);
  }

  await db.command({
    collMod: COLLECTION,
    validator: {
      $jsonSchema: {
        bsonType: "object",

        required: [
          "id",
          "machineNumber",
          "patientId"
        ],

        properties: {

          /**
           * -----------------------------
           * Core Identity
           * -----------------------------
           */

          id: {
            bsonType: "int"
          },

          userId: {
            bsonType: ["binData", "null"]
          },

          userName: {
            bsonType: ["binData", "null"]
          },

          /**
           * -----------------------------
           * Treatment Info (Encrypted)
           * -----------------------------
           */

          treatmentPlan: {
            bsonType: ["binData", "null"]
          },

          treatmentDuration: {
            bsonType: ["binData", "null"]
          },

          treatmentStartTime: {
            bsonType: ["binData", "null"]
          },

          treatmentEndTime: {
            bsonType: ["binData", "null"]
          },

          treatmentEnergy: {
            bsonType: ["binData", "null"]
          },

          totalEnergyOutput: {
            bsonType: ["binData", "null"]
          },

          treatmentDevice: {
            bsonType: ["binData", "null"]
          },

          treatmentLocation: {
            bsonType: ["binData", "null"]
          },

          img: {
            bsonType: ["binData", "null"]
          },

          remark: {
            bsonType: ["binData", "null"]
          },

          /**
           * -----------------------------
           * Machine Mapping
           * -----------------------------
           */

          machineNumber: {
            bsonType: "string",
            minLength: 3
          },

          patientId: {
            bsonType: "objectId"
          },

          /**
           * -----------------------------
           * Audit Fields (baseFields)
           * -----------------------------
           */

          createBy: {
            bsonType: ["objectId", "null"]
          },

          updateBy: {
            bsonType: ["objectId", "null"]
          },

          createTime: {
            bsonType: "date"
          },

          updateTime: {
            bsonType: ["date", "null"]
          },

          deletedAt: {
            bsonType: ["date", "null"]
          }
        }
      }
    },
    validationLevel: "strict",
    validationAction: "error"
  });

  console.log("✔ Treatment validation applied successfully");
};