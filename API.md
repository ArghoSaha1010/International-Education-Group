# Express API

The API runs separately from Next.js on port `4001` by default. It connects to MongoDB before accepting requests. The local `.env` uses `mongodb://127.0.0.1:27017/ieg_website`; start MongoDB Community Server locally or replace `MONGODB_URI` with your own MongoDB Atlas URI before starting the API. Configure other variables in `.env` using `.env.example` as a guide. The admin password must be provided as a bcrypt hash; generate one locally with:

```sh
node -e "require('bcryptjs').hash(process.argv[1], 12).then(console.log)" "your-admin-password"
```

Use a strong password and put only the resulting hash in `ADMIN_PASSWORD_HASH`. Keep `.env` private. Set `JWT_SECRET` to a random value of at least 32 characters. `ADMIN_SESSION_DAYS` controls the rolling session lifetime and accepts 1–90 days; the default is 30 days.

## Run

```sh
npm run server:dev
```

Run the Next.js frontend in a second terminal with `npm run dev` at `http://localhost:3001`. The API uses `http://localhost:4001`; set `NEXT_PUBLIC_API_URL=http://localhost:4001` for the frontend and `FRONTEND_ORIGIN=http://localhost:3001` for the API (both are shown in `.env.example`). Restart Next.js after changing its environment settings.

Run `npm run test:admin-session` to exercise login, origin validation, persistent-cookie settings, protected submission access, session refresh, API restart persistence, and logout invalidation. The integration check uses a uniquely named temporary MongoDB database and drops only that database when it finishes.

## Endpoints

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | API liveness check |
| `POST` | `/api/submissions` | Public | Validate and save a contact submission |
| `POST` | `/api/admin/login` | Public, rate limited | Authenticate and set the HttpOnly admin cookie |
| `POST` | `/api/admin/logout` | Public | Clear the admin cookie |
| `GET` | `/api/admin/session` | Admin | Check the current admin session |
| `GET` | `/api/admin/submissions?page=1&limit=20&search=` | Admin | List submissions, newest first, with pagination and search |
| `GET` | `/api/admin/submissions/:id` | Admin | Retrieve one complete submission |

The admin interface is served by Next.js at `/admin/login`, `/admin`, and `/admin/submissions/:id`. A shared frontend auth provider checks `/api/admin/session` when the app loads, then retains the authenticated state across client-side navigation. Admin routes and APIs remain protected by the Express middleware.

The submission body is JSON with the existing form fields: `name`, `email`, `institution`, `interest`, and `message`. `interest` must be one of `Study opportunities`, `Institutional partnership`, `Agent partnership`, `Brand enquiry`, or `Other`. Invalid fields return `422` with a `fields` object. A successful creation returns `201` only after MongoDB saves the record.

Admin login accepts `{ "username": "...", "password": "..." }` from the configured frontend origin. Successful login issues a JWT in an HttpOnly, SameSite=Lax persistent cookie scoped to `/api/admin`; in production the cookie is Secure. The API records each session in MongoDB, refreshes it as it approaches expiry, and invalidates its database record on logout. Sessions persist through API restarts and browser restarts until logout or the configured inactivity lifetime. Admin endpoints check both the signed cookie and the active MongoDB session. Browser requests must include credentials.

The public page footers link to `/admin/login`; authenticated admins also see dashboard and logout controls there. The admin login and dashboard layouts include the same footer access component.

List responses contain `submissions` and `pagination` (`page`, `limit`, `total`, and `pages`). Search is case-insensitive across name, email, institution, interest, and message. The page size is capped at 100. API errors use JSON `{ "error": "..." }`; unexpected server errors do not expose internal details.
