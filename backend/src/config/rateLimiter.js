const rateLimit = require('express-rate-limit')

/**
 * =====================================================
 * Helper: Safe Environment Variable Reader
 * -----------------------------------------------------
 * Reads numeric values from environment variables
 * and falls back to a secure default if:
 * - The variable is missing
 * - The value is not a valid number
 *
 * Why this matters (HIPAA):
 * - Prevents misconfiguration crashes
 * - Ensures rate limits are ALWAYS enforced
 * - Avoids accidentally disabling security controls
 * =====================================================
 */
const getEnvNumber = (key, defaultValue) => {
  const value = Number(process.env[key])
  return Number.isFinite(value) ? value : defaultValue
}

/**
 * =====================================================
 * GLOBAL RATE LIMITER
 * -----------------------------------------------------
 * Applies to ALL API endpoints.
 *
 * Purpose:
 * - Protect backend availability
 * - Prevent accidental or malicious flooding
 * - Ensure fair usage across clients
 *
 * HIPAA Alignment:
 * - Supports availability safeguards
 * - Reduces risk of denial-of-service scenarios
 * =====================================================
 */
const globalLimiter = rateLimit({
  /**
   * Time window (in milliseconds)
   * Configurable via environment:
   * RATE_LIMIT_GLOBAL_WINDOW_MIN
   */
  windowMs:
    getEnvNumber('RATE_LIMIT_GLOBAL_WINDOW_MIN', 15) * 60 *1000,

  /**
   * Maximum number of requests allowed per IP
   * within the configured time window
   */
  max: getEnvNumber('RATE_LIMIT_GLOBAL_MAX', 500),

  /**
   * standardHeaders:
   * - Sends standardized RateLimit-* headers
   * - Helps clients understand throttling behavior
   */
  standardHeaders: true,

  /**
   * legacyHeaders:
   * - Disables deprecated X-RateLimit-* headers
   * - Keeps responses clean and modern
   */
  legacyHeaders: false,

  /**
   * Custom handler for rate limit violations
   * Logs the incident for monitoring and auditing
   */
  handler: (req, res) => {
    console.warn(
      `[RATE_LIMIT][GLOBAL] IP blocked: ${req.ip} | Path: ${req.originalUrl}`
    )

    res.status(429).json({
      success: false,
      code: 429,
      msg: 'Too many requests. Please try again later.'
    })
  }
})

/**
 * =====================================================
 * AUTH RATE LIMITER
 * -----------------------------------------------------
 * Applies ONLY to authentication-related endpoints:
 * - Login
 * - OTP verification
 * - Password reset
 *
 * Purpose:
 * - Prevent brute-force attacks
 * - Protect user and admin accounts
 *
 * HIPAA Alignment:
 * - Prevents unauthorized access to PHI
 * - Protects authentication workflows
 * =====================================================
 */
const authLimiter = rateLimit({
  /**
   * Time window for authentication attempts
   */
  windowMs: getEnvNumber('RATE_LIMIT_AUTH_WINDOW_MIN', 5) * 60 * 1000,

  /**
   * Maximum number of authentication attempts allowed
   * Extremely strict by design
   */
   max: getEnvNumber('RATE_LIMIT_AUTH_MAX', 10),

  standardHeaders: true,
  legacyHeaders: false,

  /**
   * Handler logs brute-force attempts
   * without exposing sensitive details
   */
  handler: (req, res) => {
    console.warn(
      `[RATE_LIMIT][AUTH] IP blocked: ${req.ip} | Path: ${req.originalUrl}`
    )

    res.status(429).json({
      success: false,
      code: 429,
      msg: 'Too many authentication attempts. Please try again later.'
    })
  }
})

/**
 * =====================================================
 * UPLOAD RATE LIMITER
 * -----------------------------------------------------
 * Applies ONLY to file upload endpoints.
 *
 * Purpose:
 * - Prevent storage abuse
 * - Avoid excessive file processing
 * - Protect PHI-related document uploads
 *
 * HIPAA Alignment:
 * - Protects system availability
 * - Prevents resource exhaustion via uploads
 * =====================================================
 */
const uploadLimiter = rateLimit({
  /**
   * Time window for upload limits (in hours)
   */
  windowMs: getEnvNumber('RATE_LIMIT_UPLOAD_WINDOW_HOUR', 1) * 60 * 60 * 1000,

  /**
   * Maximum number of uploads allowed per IP
   * within the configured window
   */
  max: getEnvNumber('RATE_LIMIT_UPLOAD_MAX', 50),

  standardHeaders: true,
  legacyHeaders: false,

  /**
   * Handler logs excessive upload attempts
   * for security monitoring and auditing
   */
  handler: (req, res) => {
    console.warn(
      `[RATE_LIMIT][UPLOAD] IP blocked: ${req.ip} | Path: ${req.originalUrl}`
    )

    res.status(429).json({
      success: false,
      code: 429,
      msg: 'Upload limit exceeded. Try again later.'
    })
  }
})

/**
 * Export rate limiters for selective application
 * across the application (global, auth, upload)
 */
module.exports = {
  globalLimiter,
  authLimiter,
  uploadLimiter
}
