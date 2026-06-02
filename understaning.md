# CyberSafeBuddy Project Understanding

## Overview

CyberSafeBuddy is a client-side cybersecurity education and self-check web app. The repository currently contains one application: a Vite-powered React frontend in the `frontend` directory.

The app presents CyberSafe-branded pages, educational content, blog and guide workflows, and several browser-based security tools. There is no backend service in this repository. User-created blogs, user-created guides, and editable tool content are stored in browser `localStorage` through Redux state persistence.

## Runtime And Tooling

- Runtime target: Node.js 23.
- Package manager target: npm 11.
- Frontend framework: React 19.
- Bundler/dev server: Vite 8.
- Routing: React Router 7.
- State management: Redux Toolkit with React Redux.
- Linting: ESLint 10 using flat config.
- Deployment config: `frontend/vercel.json` builds with `npm run build` and serves `dist`.

The frontend now declares these runtime expectations in `package.json`, `.nvmrc`, and `.node-version`.

## Application Entry Points

- `frontend/src/main.jsx` mounts the React app into `#root`, wraps it in `StrictMode`, and provides the Redux store.
- `frontend/src/App.jsx` defines all browser routes using `BrowserRouter`, `Routes`, and `Route`.
- `frontend/src/store/index.js` creates the Redux store and subscribes to state changes so local user content is persisted to `localStorage`.

## Main Routes

- `/` renders the CyberSafe landing page.
- `/blog`, `/blog/:slug`, and `/blog/create` handle blog listing, reading, and local blog creation.
- `/guides`, `/guides/:slug`, and `/guides/create` handle guide listing, reading, and local guide creation.
- `/tools/*` routes provide the cybersecurity tools.
- `/set-content` opens the admin content editor for supported tool defaults.
- `/privacy`, `/terms`, `/about`, `/faq`, `/safety-tips`, `/report-issue`, and `/help` provide supporting pages.

## Cybersecurity Tools

The tools are React pages under `frontend/src/pages/tools`:

- Network security test.
- URL scanner.
- Password strength checker.
- Email breach checker.
- Phishing quiz.
- Account security score.
- Browser security checker.
- Scam message analyzer.
- File safety checker.
- WiFi safety checker.
- Social media privacy checker.
- Website performance checker.

Shared helper and UI code lives in `toolHelpers.js`, `toolComponents.jsx`, `clientAudit.js`, and `tools.css`.

## Data And Content

Static data lives under `frontend/src/data`:

- `blogPosts.js` contains built-in blog content.
- `guides.js` contains built-in guide content.
- `toolContent.js` is the main source of default editable tool content, including quiz questions, scoring data, scam patterns, WiFi questions, social platform checklists, and admin tool registry data.

Redux slices live under `frontend/src/store`:

- `blogSlice.js` stores user-created blog posts in `localStorage`.
- `guidesSlice.js` stores user-created guides in `localStorage`.
- `contentSlice.js` stores admin overrides for editable tool content in `localStorage`.

## Styling And Assets

- Global styles are in `frontend/src/index.css`.
- Landing styles are in `frontend/src/pages/landing/cybershield.css`.
- Tool styles are in `frontend/src/pages/tools/tools.css`.
- Layout styles are in `frontend/src/components/layout/page-layout.css`.
- Page-specific CSS files exist for blog, admin content editing, and guide creation.
- Public icons and favicon live in `frontend/public`.
- React/Vite assets and a hero image live in `frontend/src/assets`.

## Current Architecture Notes

- The app is fully client-side.
- There is no server-side authentication, database, or API layer in this repository.
- Created content is local to the user's browser and will not sync between devices.
- Some UI text appears to have mojibake or encoding issues where emoji and punctuation were previously saved incorrectly.
- The production build succeeds, but Vite warns that the main JS chunk is larger than 500 kB. Code splitting would be a useful future improvement.
