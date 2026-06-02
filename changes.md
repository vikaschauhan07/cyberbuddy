# Changes

## Files Added

- `understaning.md`: Project understanding and architecture notes.
- `task-done.md`: Summary of completed work and validation.
- `major-changes.md`: High-level list of major changes.
- `changes.md`: This change log.
- `frontend/.nvmrc`: Node version hint for nvm-compatible tools.
- `frontend/.node-version`: Node version hint for tools such as nodenv, asdf, or hosting systems that read this file.

## Files Updated

- `frontend/package.json`
  - Added `packageManager`.
  - Added `engines` for Node 23 and npm 11.
  - Changed `eslint` and `@eslint/js` to ESLint 9 versions that install cleanly on Node 23.
  - Added `eslint-plugin-react`.

- `frontend/eslint.config.js`
  - Added the React ESLint plugin.
  - Enabled `react/jsx-uses-vars` so JSX component imports are treated as used.

- `frontend/.gitignore`
  - Stopped ignoring `package-lock.json` so npm 11 lockfile metadata can be tracked.

- `frontend/package-lock.json`
  - Refreshed lockfile metadata after adding package runtime requirements.

## Commands Run

```bash
node -v
npm.cmd -v
npm.cmd i
npm.cmd run build
npm.cmd run lint
```

## Notes

- PowerShell blocked the `npm.ps1` shim because script execution is disabled on this system, so `npm.cmd` was used instead.
- `npm.cmd i` now completes without `npm warn` output.
- The app builds successfully, but Vite reports a non-fatal large chunk warning.
