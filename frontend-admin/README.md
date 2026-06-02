# CyberSafeBuddy Admin

Client-side admin frontend for CyberSafeBuddy.

## Runtime

- Node.js 23
- npm 11

## Scripts

```bash
npm.cmd i
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

## Auth Prototype

The admin app currently contains a frontend-only authentication prototype:

- Sign in with password.
- MFA OTP is required after every sign-in.
- Forgot password starts with email verification.
- Password reset also requires OTP confirmation.
- Successful MFA opens the admin console shell.

No production backend or real OTP provider is included yet.
