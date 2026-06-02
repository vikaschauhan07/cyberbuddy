# Major Changes

## Node 23 And npm 11 Upgrade Metadata

The frontend project now explicitly targets Node.js 23 and npm 11.

Updated `frontend/package.json` with:

- `packageManager: npm@11.16.0`
- `engines.node: >=23 <24`
- `engines.npm: >=11 <12`

Added:

- `frontend/.nvmrc`
- `frontend/.node-version`

These files help developers and deployment environments use the intended Node/npm versions.

## ESLint Compatibility

ESLint was changed from version 10 to version 9 because ESLint 10 and its internal packages do not declare Node 23 support. ESLint 9 installs cleanly on Node 23 with npm 11.

`eslint-plugin-react` was added so JSX component references are recognized by ESLint 9 and do not trigger false `no-unused-vars` errors.

## Project Documentation

Added documentation that explains:

- What the project does.
- The frontend architecture.
- App routes.
- Redux and localStorage persistence.
- Tool pages and editable tool content.
- Runtime and deployment notes.
- Validation results.

## Lockfile Tracking

`frontend/.gitignore` no longer ignores `package-lock.json`, so the npm 11 lockfile can be tracked with the project.

## Verification

The project was verified with:

```bash
npm.cmd run build
npm.cmd run lint
npm.cmd i
```

All commands completed successfully. `npm.cmd i` completed without `npm warn` output.
