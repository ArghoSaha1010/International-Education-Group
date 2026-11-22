# Codex Progress

## Phase 1 — Inspection

- Status: Complete.
- Project is a static HTML site with `index.html` and `lets_connect_page.html`; both use `src/output.css`, generated from `src/input.css`.
- `package.json` originally contained only Tailwind CSS dependencies. No Next.js, React, Express, Mongoose, application JavaScript, backend, or database configuration was present.
- The connect form contains required `name`, `email`, `institution`, `interest`, and `message` fields. It previously had no submission handler and explicitly said entries were not saved.
- Original HTML and CSS remain in place as reference files.

## Phase 2 — Next.js Frontend

- Status: Complete; production build succeeds.
- Added the Next.js Pages Router at `/` and `/lets_connect_page`, with shared app and document setup importing the existing generated stylesheet and Poppins font.
- Converted the existing HTML markup to JavaScript JSX and preserved the original HTML files.
- Copied the 13 existing assets to `public/assets` for Next.js static delivery; fixed the JSX page references to the actual `IAIC.png` filename and normalized the building image path.
- Connected the main navigation and contact calls to action to the homepage sections and contact form anchor.
- Added `dev`, `build`, and `start` npm scripts and `.gitignore` entries for dependencies and build output.
- Tests: `npm run build` passes and prerenders both routes. Static checks confirmed both built pages contain expected content, navigation references resolve to existing route/anchor names, and all referenced `/assets` files exist.
- Limitation: A local HTTP request to the running Next.js server could not connect in this environment, so browser rendering and viewport-level checks remain unverified.

## Phase 3 — Express MVC API and MongoDB

- Status: Implemented and verified against the local MongoDB service.
- Added an Express app and start scripts, environment validation, Mongoose connection, timestamped submission model, controllers, routes, validation/auth/error middleware, and API documentation.
- Public submission endpoint validates and sanitizes the existing five form fields and returns `201` only after MongoDB saves the record.
- Added admin login/logout/session endpoints and protected, paginated/searchable submission list and detail endpoints. Authentication uses bcrypt password hashes and an eight-hour HttpOnly JWT cookie; login attempts are rate limited.
- Added Helmet, a constrained credentialed CORS origin, request size limit, generic error responses, and `.env.example`. No secret values are committed.
- Tests: Server syntax checks and production builds pass. Database-backed API checks verified valid/invalid submissions, real MongoDB persistence across an API restart, authenticated list/detail/search/pagination, and logout authorization.
- Configuration: Local `.env` points to MongoDB at `127.0.0.1:27017/ieg_website`; actual secrets remain ignored by Git.

## Phase 4 — Contact Form Integration

- Status: Implemented and verified with a real MongoDB connection.
- Connected the existing five controlled fields to `POST /api/submissions` using `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:4001`).
- Added frontend required-field, email, interest-option, and length validation matching backend limits; displays field-level errors and clears them as the visitor edits.
- Added loading, success, and error feedback, disables repeated submits while a request is in flight, and resets fields only after an API `201` response.
- Updated the button and disclaimer to describe the new saved enquiry flow while retaining the existing form layout and styling.
- Updated `API.md` with two-terminal frontend/backend run instructions and CORS/API origin settings.
- Tests: `npm run build` passes; database-backed submission and persistence were verified in an isolated MongoDB test database.

## Phase 5 — Admin Login and Dashboard

- Status: Implemented; persistent sessions now use MongoDB-backed revocable sessions.
- Added `/admin/login`, `/admin`, and `/admin/submissions/:id` pages. The login form posts credentials to the API; the dashboard checks session status before rendering protected content.
- Added submission search, pagination, loading/empty/error states, received timestamps, a complete detail view, and logout.
- The frontend uses a persistent HttpOnly cookie with credentialed API requests; it stores no token in local or session storage. A shared auth provider restores state on app load and across navigation. The API checks the signed cookie and MongoDB session on every admin request.
- Tests: Production build passes. Browser verification confirmed footer navigation to login, successful login, dashboard access, session restoration after refresh, public-page navigation while signed in, logout, and redirect from a protected route after logout.
- Session lifetime: `ADMIN_SESSION_DAYS` defaults to a rolling 30-day lifetime and accepts 1–90 days. MongoDB stores revocable session records with TTL cleanup; logout removes the record.
- Security: Admin login/logout require the configured frontend Origin; cookies use HttpOnly, SameSite=Lax, and Secure in production.
- Configuration: Local frontend is `http://localhost:3001`, API is `http://localhost:4001`, and `.env` remains ignored.

## Remaining Work

- Phase 6: The admin-session integration suite and browser login/logout flow pass. Responsive viewport checks and a public contact-form browser smoke test remain.
- Required environment values are documented in `.env.example` and `API.md`; keep actual credentials and database URIs in an untracked `.env` only.

## Global Admin Login and Persistent Session Enhancement

- Added the shared `AdminFooterAccess` component to public-page footers, the login page, and admin layouts. Signed-in admins also see dashboard and logout controls in public footers.
- Added `AuthProvider` in `_app.js` to restore and share admin authentication state across page loads and client-side navigation.
- Replaced eight-hour-only JWT acceptance with MongoDB-backed, revocable sessions, a persistent rolling cookie, session refresh, and logout invalidation.
- Added origin validation to admin login/logout and configured `ADMIN_SESSION_DAYS` in `.env.example`.
- Added `npm run test:admin-session`; it uses a uniquely named temporary database and drops only that test database.
- Verified: build passes; integration results include login `200`, bad origin `403`, invalid credentials `401`, session persistence after API restart, rolling refresh, logout `200`, and access after logout `401`. Browser verification confirmed the global link and authenticated/unauthenticated states.

## Next Step

Finish the remaining responsive viewport and public-form browser checks; see the Global Admin Login and Persistent Session Enhancement section for the latest implementation and test evidence.
