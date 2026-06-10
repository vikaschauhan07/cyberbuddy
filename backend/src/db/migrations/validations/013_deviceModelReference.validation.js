"use strict";

const mongoose = require("mongoose");

module.exports = async () => {
  console.log("▶ [013] Applying DeviceModelReference validation");

  const db = mongoose.connection.db;
  const COLLECTION = "DeviceModelReference";

  // Ensure collection exists
  const collections = await db.listCollections({ name: COLLECTION }).toArray();
  if (collections.length === 0) {
    await db.createCollection(COLLECTION);
  }

  await db.command({
    collMod: COLLECTION,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        properties: {
          /**
           * -----------------------------
           * Device Fields
           * -----------------------------
           */
          referenceNumber: {
            bsonType: ["string", "null"],
            description: "Model reference identifier"
          },

          country: {
            bsonType: ["string", "null"],
            description: "ISO country code",
            minLength: 2,
            maxLength: 3
          },

          /**
           * -----------------------------
           * Base Audit Fields
           * (based on your baseFields pattern)
           * -----------------------------
           */
          createdBy: {
            bsonType: ["objectId", "null"]
          },

          updatedBy: {
            bsonType: ["objectId", "null"]
          },
        }
      }
    },

    validationLevel: "moderate",
    validationAction: "error"
  });

  console.log("✔ DeviceModelReference validation applied");
};