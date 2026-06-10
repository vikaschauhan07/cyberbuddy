"use strict";

const mongoose = require("mongoose");

module.exports = async () => {

  console.log("▶ [012] Applying TreatmentImages DB-level validation");

  const db = mongoose.connection.db;
  const COLLECTION = "TreatmentImages";

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
          "treatment"
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

          /**
           * -----------------------------
           * Treatment Reference
           * -----------------------------
           */

          treatment: {
            bsonType: "objectId"
          },

          /**
           * -----------------------------
           * Encrypted Fields (Buffer)
           * -----------------------------
           */

          treatmentId: {
            bsonType: ["binData", "null"]
          },

          userId: {
            bsonType: ["binData", "null"]
          },

          userName: {
            bsonType: ["binData", "null"]
          },

          name: {
            bsonType: ["binData", "null"]
          },

          path: {
            bsonType: ["binData", "null"]
          },

          url: {
            bsonType: ["binData", "null"]
          },

          isTreatmentAfter: {
            bsonType: "int",
            minimum: 0,
            maximum: 2,
            description: "Indicates whether image is after treatment (0 = before, 1 = after)"
          },

          remark: {
            bsonType: ["binData", "null"]
          },

          /**
           * -----------------------------
           * Audit Fields
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

          patientId: {
            bsonType: "objectId"
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

  console.log("✔ TreatmentImages validation applied successfully");
};