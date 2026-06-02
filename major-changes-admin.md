# Major Changes - Admin

## New Admin Frontend

Added a new standalone app at `frontend-admin`.

The app uses:

- React 19.
- Vite 8.
- React Router 7.
- Lucide React icons.
- ESLint 9.
- Node.js 23.
- npm 11.

## Authentication Flow

Implemented a frontend-only admin auth prototype:

- Login begins with admin email and password.
- MFA OTP is required every time before the dashboard opens.
- Forgot-password flow requires OTP before reset.
- Reset-password flow requires another final OTP confirmation.
- Admin dashboard is protected by verified session state.

## Admin Dashboard Shell

Added a protected dashboard with:

- Current admin session banner.
- MFA verification timestamp.
- Security metrics.
- Recent admin audit events.
- Sign-out action.
- Dashboard tabs for Overview, Tools, Content, Publishing, Support, and Access.
- Tool inventory mapped from the public frontend routes.
- Content ownership mapped to tool overrides, landing page sections, and static pages.
- Publishing ownership for blog and guide workflows.
- Support ownership for issue reports, help center, and FAQ content.
- Access ownership for admin users, MFA policy, and audit planning.

## Password Visibility Controls

Login and reset password inputs now include eye buttons for show/hide password behavior.

## Dashboard Redirect

Successful MFA now redirects to `/dashboard`. The old `/console` route redirects to `/dashboard` for compatibility.

## Frontend Best-Practice Alignment

Applied the root `.agents` guidance by:

- Keeping the admin UI focused on the real workflow rather than a landing page.
- Avoiding heavyweight libraries beyond the needed React/Vite/router/icon stack.
- Using route-level page components and small shared components.
- Using module-level static data.
- Caching session storage reads in memory.
- Keeping layouts responsive with stable dimensions for OTP and metric UI.

## Validation

The admin app passed:

```bash
npm.cmd i
npm.cmd run lint
npm.cmd run build
```

Install completed without npm warnings.
