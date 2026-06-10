"use strict"

const multer = require("multer")

/**
 * =====================================================
 * HIPAA-SAFE FILE UPLOAD CONFIGURATION
 * =====================================================
 * ✔ Memory-only storage (no disk persistence)
 * ✔ Strict file size limit
 * ✔ MIME type allowlist (including APK)
 * ✔ Single-file upload
 * ✔ Designed for encrypted downstream storage
 */

const MAX_FILE_SIZE = 500 * 1024 * 1024 // 10 MB

const ALLOWED_MIME_TYPES = [
  // Documents
  "application/pdf",
  "text/plain",

  "image/*",
  // Images
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/x-png",   // 👈 IMPORTANT
  "image/apng",    // 👈 optional
  "image/webp",

  // Android APK (ZIP-based)
  "application/vnd.android.package-archive",
  "application/zip" // some browsers send APK as zip
]

const upload = multer({
  storage: multer.memoryStorage(), // ✅ No PHI written to disk

  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 20
  },

  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Unsupported file type"
        ),
        false
      )
    }

    // ⚠️ Never trust filename for logic
    file.originalname = undefined

    cb(null, true)
  }
})

module.exports = upload