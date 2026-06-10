const helmet = require('helmet');

const helmetConfig = helmet({
    // Prevent clickjacking
    // --------------------------------------------------
    // frameguard controls the X-Frame-Options header.
    //
    // action: 'deny'
    // - Completely disallows this application from being
    //   embedded inside an iframe on ANY domain.
    //
    // Prevents:
    // - Clickjacking attacks
    // - UI redress attacks
    // - Hidden iframe-based user interaction hijacking
    //
    // HIPAA relevance:
    // - Prevents attackers from tricking users into
    //   interacting with PHI-related UI unknowingly
    // - Protects patient workflows and admin actions
    frameguard: {
        action: 'deny'
    },
    
    // Prevent MIME type sniffing
    // --------------------------------------------------
    // noSniff sets the X-Content-Type-Options: nosniff header.
    //
    // Prevents browsers from guessing file types when
    // the Content-Type header is incorrect or missing.
    //
    // Prevents:
    // - Execution of malicious scripts disguised as files
    // - Content-type confusion attacks
    //
    // HIPAA relevance:
    // - Protects file uploads/downloads containing PHI
    // - Ensures files are handled strictly as intended
    noSniff: true,
    
    // Enable XSS protection in supported browsers
    // --------------------------------------------------
    // xssFilter enables the X-XSS-Protection header.
    //
    // Note:
    // - Modern browsers rely primarily on CSP
    // - This header is kept for backward compatibility
    //   with older browsers
    //
    // Prevents:
    // - Reflected XSS attacks (legacy browser protection)
    //
    // HIPAA relevance:
    // - Additional defense-in-depth layer
    // - Helps protect sensitive UI paths in older clients
    xssFilter: true,
  
    // Enforce HTTPS (HSTS)
    // --------------------------------------------------
    // HTTP Strict Transport Security tells browsers to
    // ALWAYS use HTTPS when communicating with this domain.
    //
    // Why this matters for HIPAA:
    // - HIPAA requires secure transmission of PHI
    // - Prevents downgrade attacks (HTTPS → HTTP)
    // - Protects against man-in-the-middle (MITM) attacks
    //
    // Configuration details:
    //
    // maxAge: 31536000 (1 year)
    // - Browser will remember to use HTTPS for this domain
    //   for one full year after first secure visit
    //
    // includeSubDomains: true
    // - Applies HTTPS enforcement to all subdomains
    // - Prevents weaker subdomains from exposing PHI
    //
    // preload: true
    // - Allows domain to be added to browser HSTS preload lists
    // - Browsers will enforce HTTPS even on first visit
    //
    // IMPORTANT:
    // - This should ONLY be enabled in production
    // - Domain MUST have a valid HTTPS certificate
    // - Misuse can permanently lock a domain into HTTPS
    //
    // HIPAA Alignment:
    // - Satisfies transmission security requirements
    // - Prevents accidental insecure access to PHI
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
    },
  

    // Hide Express signature
    // --------------------------------------------------
    // Removes the "X-Powered-By: Express" HTTP response header.
    //
    // Why this matters for security (and HIPAA):
    // - The X-Powered-By header reveals the backend framework
    // - Attackers use this information for fingerprinting
    // - Known framework versions can be targeted with exploits
    //
    // By hiding this header:
    // - We reduce application fingerprinting
    // - We limit information disclosure to attackers
    // - We follow the principle of "security through minimization"
    //
    // HIPAA Alignment:
    // - Supports technical safeguards by reducing attack surface
    // - Prevents unnecessary system information disclosure
    //
    // This setting does NOT affect functionality or performance.
    hidePoweredBy: true,

    // Content Security Policy (strict for HIPAA)
    contentSecurityPolicy: {
        directives: {
            /**
             * defaultSrc
             * --------------------------------------------------
             * Fallback policy for all resource types.
             * 'none' means:
             * - Block everything by default
             * - Nothing loads unless explicitly allowed below
             *
             * HIPAA: Strongest baseline to prevent data exfiltration
             */
            defaultSrc: ["'none'"],
        
            /**
             * scriptSrc
             * --------------------------------------------------
             * Controls where JavaScript can be loaded from.
             * 'self' allows only scripts served by this API/domain.
             *
             * Prevents:
             * - XSS attacks
             * - Malicious third-party scripts
             *
             * HIPAA: Prevents unauthorized script execution
             */
            scriptSrc: ["'self'"],
        
            /**
             * styleSrc
             * --------------------------------------------------
             * Controls where CSS stylesheets can be loaded from.
             * 'self' allows only internal styles.
             *
             * Prevents:
             * - CSS injection attacks
             * - Data leakage via CSS-based exfiltration
             *
             * HIPAA: Avoids external style manipulation
             */
            styleSrc: ["'self'"],
        
            /**
             * imgSrc
             * --------------------------------------------------
             * Controls image sources.
             * 'self' allows images from the same origin.
             * 'data:' allows inline base64 images (e.g. profile photos).
             *
             * Prevents:
             * - Image-based tracking
             * - External image data leaks
             *
             * HIPAA: Allows safe inline medical images if required
             */
            imgSrc: ["'self'", 'data:'],
        
            /**
             * connectSrc
             * --------------------------------------------------
             * Controls where fetch/XHR/WebSocket requests can go.
             * 'self' allows API calls only to this backend.
             *
             * Prevents:
             * - Sending PHI to external servers
             * - Unauthorized analytics or tracking endpoints
             *
             * HIPAA: Critical PHI egress protection
             */
            connectSrc: ["'self'"],
        
            /**
             * fontSrc
             * --------------------------------------------------
             * Controls font loading sources.
             * 'self' restricts fonts to local assets.
             *
             * Prevents:
             * - Third-party font tracking
             * - External asset leakage
             *
             * HIPAA: Eliminates external font dependencies
             */
            fontSrc: ["'self'"],
        
            /**
             * objectSrc
             * --------------------------------------------------
             * Controls plugins like Flash, Java, ActiveX.
             * 'none' blocks all such content.
             *
             * Prevents:
             * - Legacy plugin vulnerabilities 
             * - Remote code execution vectors
             *
             * HIPAA: Mandatory — legacy plugins are insecure
             */
            objectSrc: ["'none'"],
        
            /**
             * mediaSrc
             * --------------------------------------------------
             * Controls audio and video sources.
             * 'none' blocks all media by default.
             *
             * Prevents:
             * - Unauthorized media streaming
             * - Large data transfers containing PHI
             *
             * HIPAA: Media must be explicitly reviewed before enabling
             */
            mediaSrc: ["'none'"],
        
            /**
             * frameAncestors
             * --------------------------------------------------
             * Controls which sites can embed this app in an iframe.
             * 'none' disallows all embedding.
             *
             * Prevents:
             * - Clickjacking
             * - UI redress attacks
             *
             * HIPAA: Prevents hidden UI manipulation
             */
            frameAncestors: ["'none'"],
        
            /**
             * baseUri
             * --------------------------------------------------
             * Controls the <base> HTML tag.
             * 'none' disables it entirely.
             *
             * Prevents:
             * - URL rewriting attacks
             * - Resource hijacking via base tag injection
             *
             * HIPAA: Prevents request redirection tricks
             */
            baseUri: ["'none'"],
        
            /**
             * formAction
             * --------------------------------------------------
             * Controls where HTML forms can submit data.
             * 'self' allows form submissions only to same origin.
             *
             * Prevents:
             * - PHI exfiltration via form posts
             * - Malicious external form submissions
             *
             * HIPAA: Protects patient data during submission
             */
            formAction: ["'self'"]
        }
    },

    // Referrer Policy
    // --------------------------------------------------
    // Controls how much referrer information is sent
    // when a user navigates away from this application
    // or when the browser makes cross-origin requests.
    //
    // Why this matters for HIPAA:
    // - URLs can contain sensitive data (IDs, tokens, query params)
    // - Sending referrer headers to third-party sites
    //   could accidentally expose PHI or session context
    //
    // Policy: 'no-referrer'
    // - Browser sends NO Referer header at all
    // - Works for both same-origin and cross-origin requests
    // - Prevents leakage of URLs, tokens, or identifiers
    //
    // This is the safest possible setting and is
    // strongly recommended for healthcare applications.
    referrerPolicy: {
        policy: 'no-referrer'
    }
  
});

module.exports = helmetConfig;
