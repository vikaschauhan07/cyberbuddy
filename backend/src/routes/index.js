const express = require('express')
const blogRoutes = require('./blog/blog.route')
const guideRoutes = require('./guide/guide.route')
// const { randomUUID } = require('crypto')

// // Route groups
// const adminRoutes = require('./admin')
// const deviceRoutes = require('./device')
// const commonRoutes = require('./common')
// const doctorRoutes = require("./doctor");

// // Security middleware
// const authenticate = require('../middlewares/authenticate')               // Cognito (users)
// const authenticateDevice = require('../middlewares/authenticateDevice')   // Devices
// const auditLogger = require('../middlewares/auditLogger')
// const hipaaAccessLogger = require('../middlewares/hipaaAccessLogger')

// // Rate Limiting
// const { globalLimiter, authLimiter } = require('../config/rateLimiter')
// const adminAuthMiddleware = require('../middlewares/admin/adminAuth.middleware')
// const validDeviceMiddleware = require('../middlewares/device/validDevice.middleware')
// const authenticateUserMiddleware = require('../middlewares/device/authenticateUser.middleware')
// const validateSessionMiddleware = require('../middlewares/device/validateSession.middleware')
// const upload = require('../middlewares/multer.middleware')
// const validDoctorRequestMiddleware = require('../middlewares/doctor/validDoctorRequest.middleware')
// const validateDoctorSessionMiddleware = require('../middlewares/doctor/validateDoctorSession.middleware')
// const authenticateDoctorMiddleware = require('../middlewares/doctor/authenticateDoctor.middleware')
// const validateDoctorPortalAttestationMiddleware = require('../middlewares/doctor/validateDoctorPortalAttestation.middleware')

const router = express.Router()

router.use('/blogs', blogRoutes)
router.use('/guides', guideRoutes)

// /**
//  * =====================================================
//  * GLOBAL API CONTEXT
//  * -----------------------------------------------------
//  * Inject request metadata for audit & monitoring
//  * =====================================================
//  */
// router.use((req, res, next) => {
//   req.requestData = {
//     requestId: req.headers['x-request-id'] || randomUUID(),
//     timestamp: new Date().toISOString()
//   }
//   console.log(`Request now ............... ${req.originalUrl}` )
//   next()
// })

// /**
//  * =====================================================
//  * ADMIN AUTH APIs (PUBLIC)
//  * -----------------------------------------------------
//  * - Login / token issuance
//  * - NO authentication middleware
//  * - Rate limited
//  * =====================================================
//  */
// router.use(
//   '/admin/auth',
//   globalLimiter,
//   authLimiter,
//   (req, res, next) => {
//     req.requestData.apiType = 'admin'
//     req.requestData.identityType = 'public'
//     next()
//   },
//   auditLogger,
//   hipaaAccessLogger,
//   adminRoutes.auth
// )

// /**
//  * =====================================================
//  * ADMIN PROTECTED APIs
//  * -----------------------------------------------------
//  * - Cognito authentication REQUIRED
//  * - Full audit logging
//  * =====================================================
//  */
// router.use(
//   '/admin',
//   globalLimiter,           // 1️⃣ Availability
//   authenticate,            // 2️⃣ User identity
//   (req, res, next) => {    // 3️⃣ Context
//     req.requestData.apiType = 'admin'
//     req.requestData.identityType = 'user'
//     next()
//   },
//   adminAuthMiddleware,
//   auditLogger,              // 4️⃣ Audit (after auth)
//   hipaaAccessLogger,
//   adminRoutes.protected     // 5️⃣ Protected routes
// )

// /**
//  * =====================================================
//  * DEVICE HEALTH APIs (PUBLIC)
//  * -----------------------------------------------------
//  * - Device health apis
//  * - NO Device header middleware middleware
//  * =====================================================
//  */
// router.use(
//   '/device/health',
//   globalLimiter,
//   (req, res, next) => {
//     req.requestData.apiType = 'device'
//     req.requestData.identityType = 'public'
//     next()
//   },
//   auditLogger,
//   hipaaAccessLogger,
//   deviceRoutes.health
// );

// /** =====================================================
//   * DEVICE COMMON APIs (PUBLIC)
//   * -----------------------------------------------------
//   *    - Non-PHI device APIs (e.g. system updates, lookups)
//   *   - NO Device header middleware middleware
//   * ========================================================
// */    
// router.use(
//   '/device/system',
//   globalLimiter,
//   (req, res, next) => {
//     req.requestData.apiType = 'device'
//     req.requestData.identityType = 'public'
//     next()
//   },
//   auditLogger,
//   hipaaAccessLogger,
//   deviceRoutes.common
// );

// /**
//  * =====================================================
//  * DEVICE AUTH APIs (PUBLIC)
//  * -----------------------------------------------------
//  * - Device handshake / provisioning
//  * - NO authenticateDevice middleware
//  * =====================================================
//  */
// router.use(
//   '/device/auth',
//   globalLimiter,
//   authLimiter,
//   (req, res, next) => {
//     req.requestData.apiType = 'device'
//     req.requestData.identityType = 'public'
//     next()
//   },
//   auditLogger,
//   hipaaAccessLogger,
//   validDeviceMiddleware,
//   deviceRoutes.auth
// )
// /**
//  * =====================================================
//  * DEVICE PROTECTED APIs
//  * -----------------------------------------------------
//  * - Encrypted device authentication REQUIRED
//  * =====================================================
//  */
// // router.use(
// //   '/device',
// //   globalLimiter,
// //   authenticateDevice,
// //   (req, res, next) => {
// //     req.requestData.apiType = 'device'
// //     req.requestData.identityType = 'device'
// //     next()
// //   },
// //   auditLogger,
// // //   deviceRoutes.protected
// // )

// /**
//  * =====================================================
//  * DEVICE Pair APIs (PUBLIC)
//  * -----------------------------------------------------
//  * - Device handshake / provisioning
//  * - NO encypted middleware
//  * =====================================================
//  */
// router.use(
//   '/device/pair',
//   globalLimiter,
//   (req, res, next) => {
//     req.requestData.apiType = 'device'
//     req.requestData.identityType = 'user'
//     next()
//   },
//   validDeviceMiddleware,
//   authenticateUserMiddleware,
//   auditLogger,
//   hipaaAccessLogger,
//   deviceRoutes.pair
// )

// router.use(
//   '/device',
//   globalLimiter,
//   (req, res, next) => {
//     req.requestData.apiType = 'device'
//     req.requestData.identityType = 'user'
//     next()
//   },
//   validDeviceMiddleware,
//   authenticateUserMiddleware,
//   upload.any(),
//   validateSessionMiddleware,
//   auditLogger,
//   hipaaAccessLogger,
//   deviceRoutes.protected
// )

// router.use(
//   '/doctor/pair',
//   globalLimiter,
//   (req, res, next) => {
//     req.requestData.apiType = 'doctor'
//     req.requestData.identityType = 'public'
//     next()
//   },
//   auditLogger,
//   hipaaAccessLogger,
//   doctorRoutes.pair
// );

// router.use(
//   '/doctor/invite',
//   globalLimiter,
//   authLimiter,
//   (req, res, next) => {
//     req.requestData.apiType = 'doctor'
//     req.requestData.identityType = 'public'
//     next()
//   },
//   auditLogger,
//   hipaaAccessLogger,
//   doctorRoutes.invite
// );

// router.use(
//   '/doctor/auth',
//   globalLimiter,
//   authLimiter,
//   validDoctorRequestMiddleware,
//   (req, res, next) => {
//     req.requestData.apiType = 'doctor'
//     req.requestData.identityType = 'public'
//     next()
//   },
//   auditLogger,
//   hipaaAccessLogger,
//   doctorRoutes.auth
// );

// router.use(
//   '/doctor/protected',
//   globalLimiter,
//   validDoctorRequestMiddleware,
//   authenticateDoctorMiddleware,
//   upload.any(),
//   validateDoctorPortalAttestationMiddleware,
//   validateDoctorSessionMiddleware,
//   (req, res, next) => {
//     req.requestData.apiType = 'doctor'
//     req.requestData.identityType = 'doctor'
//     next()
//   },
//   auditLogger,
//   hipaaAccessLogger,
//   doctorRoutes.protected
// );

// /**
//  * =====================================================
//  * COMMON APIs
//  * -----------------------------------------------------
//  * - Health checks
//  * - Lookups
//  * - Non-PHI endpoints
//  * =====================================================
//  */
// router.use(
//   '/common',
//   globalLimiter,
//   (req, res, next) => {
//     req.requestData.apiType = 'common'
//     req.requestData.identityType = 'public'
//     next()
//   },
//   auditLogger
// )

module.exports = router
