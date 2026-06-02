# Changes - Admin

## Files Added

- `frontend-admin/package.json`
- `frontend-admin/package-lock.json`
- `frontend-admin/.gitignore`
- `frontend-admin/.nvmrc`
- `frontend-admin/.node-version`
- `frontend-admin/index.html`
- `frontend-admin/vite.config.js`
- `frontend-admin/eslint.config.js`
- `frontend-admin/README.md`
- `frontend-admin/src/main.jsx`
- `frontend-admin/src/App.jsx`
- `frontend-admin/src/styles.css`
- `frontend-admin/src/data/authFlow.js`
- `frontend-admin/src/data/dashboardData.js`
- `frontend-admin/src/utils/authSession.js`
- `frontend-admin/src/components/AuthLayout.jsx`
- `frontend-admin/src/components/FormField.jsx`
- `frontend-admin/src/components/OtpInput.jsx`
- `frontend-admin/src/components/PasswordField.jsx`
- `frontend-admin/src/components/StatusNote.jsx`
- `frontend-admin/src/pages/Login.jsx`
- `frontend-admin/src/pages/MfaChallenge.jsx`
- `frontend-admin/src/pages/ForgotPassword.jsx`
- `frontend-admin/src/pages/ResetPassword.jsx`
- `frontend-admin/src/pages/AdminConsole.jsx`
- `task-done-admin.md`
- `major-changes-admin.md`
- `changes-admin.md`

## Files Updated

- `understaning.md`
  - Added the new `frontend-admin` app summary, routes, runtime notes, and auth limitations.
  - Updated the admin dashboard route and tab structure.

- `frontend-admin/src/App.jsx`
  - Redirects successful MFA to `/dashboard`.
  - Keeps `/console` as a compatibility redirect to `/dashboard`.

- `frontend-admin/src/pages/Login.jsx`
  - Uses the password field with an eye show/hide button.

- `frontend-admin/src/pages/ResetPassword.jsx`
  - Uses password fields with eye show/hide buttons for both reset inputs.

- `frontend-admin/src/pages/AdminConsole.jsx`
  - Reworked into the protected dashboard with tabs for tools, content, publishing, support, and access.

- `frontend-admin/src/styles.css`
  - Added password controls, dashboard tabs, tool inventory, and management card styles.

## Commands Run

```bash
node -v
npm.cmd -v
npm.cmd i
npm.cmd run lint
npm.cmd run build
```

## Notes

- The app currently uses demo OTP `246810`.
- The admin session is stored in `sessionStorage` only for frontend prototyping.
- Password inputs now include eye show/hide buttons.
- The protected admin workspace is now `/dashboard`.
- Production auth must be backed by server-side credential verification, OTP issuing, OTP validation, rate limiting, lockout policy, and secure session management.
