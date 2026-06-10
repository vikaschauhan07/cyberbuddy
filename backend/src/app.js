const express = require('express')

const helmetConfig = require('./config/helmet')
const jsonErrorHandler = require('./middlewares/jsonErrorHandler')
const { globalLimiter } = require('./config/rateLimiter')
const cors = require('cors')
const corsOptions = require('./config/cors')
const bodyParser = require("body-parser");

const app = express()
const routes = require('./routes')


/* =====================================================
   LAYER 0: This is for the (ALB/WAF/CLOUD)
   ===================================================== */
   app.set('trust proxy', 4); // if behind 1 proxy
 
/* =====================================================
   LAYER 1: CORS (HIPAA)
    ===================================================== */
app.use(cors(corsOptions))

/* =====================================================
   LAYER 2: JSON BODY PARSING (HIPAA HARDENED)
   ===================================================== */

/**
 * Enforce JSON-only requests
 * EXCEPT file upload routes
 */
app.use((req, res, next) => {
  const uploadRoutes = [
    "/api/v1/admin/treatment-model/upload",
    "/api/v1/admin/system-update/apk-parse",
    "/api/v1/admin/change-profile-image",
    "/api/v1/admin/product/upload",
    "/api/v1/device/patient/treatment_record/uploadTreatmentBeforeImagesFromPatient",
    "/api/v1/device/patient/treatment_record/uploadTreatmentAfterImagesFromPatient",
    "/api/v1/doctor/protected/images",
    "/api/v1/doctor/protected/profile/image",
    "/api/v1/doctor/protected/profile/practice-logo"
  ]

  const isUploadRoute = uploadRoutes.some(route =>
    req.originalUrl.startsWith(route)
  )
  if (!isUploadRoute && req.method !== 'GET' && !req.is('application/json')) {
    return res.status(415).json({
      success: false,
      code: 415,
      message: 'Content-Type must be application/json'
    })
  }
  console.log("Request Recived at the Backed JSON BODY PARSING LAYER.........|")
  next()
});


/**
 * JSON parser (NON-upload routes only)
 */
app.use(
  express.json({
    limit: '500mb',
    strict: true,
    inflate: true,
    type: 'application/json'
  })
)

/**
 * Sanitized JSON parse errors
 */
app.use(jsonErrorHandler)

/* =====================================================
   LAYER 3: SECURITY HEADERS (HELMET – HIPAA)
   ===================================================== */

app.use(helmetConfig)


/* =====================================================
   LAYER 4: RATE LIMITING (HIPAA)
   ===================================================== */

// Apply global limiter to all routes
app.use(globalLimiter)

/* =====================================================
   ROUTES
   ===================================================== */

app.use('/api/v1', routes)


module.exports = app
