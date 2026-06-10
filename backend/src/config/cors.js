const { CORS_ORIGIN } = require("./config")

const allowedOrigins = CORS_ORIGIN
  ? CORS_ORIGIN.split(',').map(o => o.trim())
  : []
const corsOptions = {
  /**
   * Validate request origin
   */
  origin: (origin, callback) => {
    // Allow server-to-server calls & mobile apps (no origin)
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    console.warn(`[CORS_BLOCKED] Origin blocked: ${origin}`)
    return callback(new Error('Not allowed by CORS'))
  },

  /**
   * Allowed HTTP methods
   */
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

  /**
   * Allowed headers
   * Needed for JWT, JSON & AJAX
   */
  allowedHeaders: [
    'Authorization',
    'Content-Type',
    'X-Requested-With',
    'x-timezone'
  ],

  /**
   * Allow cookies & auth headers
   * REQUIRED for HIPAA auth flows
   */
  credentials: true,

  /**
   * Cache preflight response (24 hours)
   * Improves performance, reduces OPTIONS spam
   */
  maxAge: 86400,

  /**
   * Return proper status for legacy browsers
   */
  optionsSuccessStatus: 204
}

module.exports = corsOptions