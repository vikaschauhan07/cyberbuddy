const mongoose = require('mongoose')

/**
 * =====================================================
 * MongoDB JSON Schema Validation – TreatmentModel
 * =====================================================
 * - DB-level enforcement
 * - Visible in MongoDB Atlas
 * - PBM / Therapy configuration only
 *
 * IMPORTANT:
 * ❌ No PHI
 * =====================================================
 */

module.exports = async () => {
  console.log('▶ [005] Applying TreatmentModel DB-level validation')

  const db = mongoose.connection.db

  // Ensure collection exists
  const collections = await db
    .listCollections({ name: 'TreatmentModel' })
    .toArray()

  if (collections.length === 0) {
    await db.createCollection('TreatmentModel')
  }

  await db.command({
    collMod: 'TreatmentModel',
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'condition',
          'primary_targets',
          'optimal_wavelengths',
          'therapy_mode',
          'power_level',
          'energy_density_mw_cm2',
          'ideal_distance_mm',
          'treatment_duration_sec',
          'frequency_per_week',
          'face_validation_required',
          'buildType',
          'createdAt',
          'updatedAt'
        ],
        properties: {
          /**
           * -----------------------------
           * Condition Metadata
           * -----------------------------
           */
          condition: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 200
          },

          primary_targets: {
            bsonType: 'string',
            minLength: 1,
            maxLength: 500
          },

          /**
           * -----------------------------
           * Therapy Configuration
           * -----------------------------
           */
          optimal_wavelengths: {
            bsonType: 'array',
            minItems: 1,
            items: {
              bsonType: 'object',
              required: ['wavelength', 'start_sec', 'end_sec'],
              properties: {
                wavelength: {
                  bsonType: 'string',
                  enum: ['R', 'Y', 'IR', 'B']
                },
                start_sec: {
                  bsonType: 'int',
                  minimum: 0
                },
                end_sec: {
                  bsonType: 'int',
                  minimum: 1
                }
              }
            }
          },

          combination_strategy: {
            bsonType: ['string', 'null'],
            maxLength: 500
          },

          therapy_mode: {
            bsonType: 'string',
            enum: ['sequential', 'combined']
          },

          /**
           * -----------------------------
           * Dosimetry
           * -----------------------------
           */
          power_level: {
            bsonType: 'string'
          },

          energy_density_mw_cm2: {
            bsonType: 'string'
          },

          ideal_distance_mm: {
            bsonType: 'string'
          },

          treatment_duration_sec: {
            bsonType: 'int',
            minimum: 1
          },

          frequency_per_week: {
            bsonType: 'string'
          },

          /**
           * -----------------------------
           * Device & Validation
           * -----------------------------
           */
          face_validation_required: {
            bsonType: 'bool'
          },

          /**
           * -----------------------------
           * Clinical Notes
           * -----------------------------
           */
          clinical_notes: {
            bsonType: ['string', 'null'],
            maxLength: 1000
          },

          /**
           * -----------------------------
           * UI / Build Metadata
           * -----------------------------
           */
          icon: {
            bsonType: ['string', 'null']
          },

          buildType: {
            bsonType: 'int'
          },

          /**
           * -----------------------------
           * Audit & Lifecycle
           * -----------------------------
           */
          createdBy: {
            bsonType: ['objectId', 'null']
          },

          updatedBy: {
            bsonType: ['objectId', 'null']
          },

          deletedAt: {
            bsonType: ['date', 'null']
          },

          createdAt: {
            bsonType: 'date'
          },

          updatedAt: {
            bsonType: 'date'
          }
        }
      }
    },
    validationLevel: 'strict',
    validationAction: 'error'
  })

  console.log('✔ TreatmentModel validation applied & visible in Atlas')
}
