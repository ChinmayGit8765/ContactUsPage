# OpenAgent Contact Us

Full-stack monorepo: NestJS API + Next.js 14 frontend, orchestrated with Docker Compose.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose v2)

## Run the app

```bash
docker compose up --build
```

Then open **http://localhost:3000** in your browser.

| Service | URL |
|---------|-----|
| Web     | http://localhost:3000 |
| API     | http://localhost:3001 |

To stop and wipe data:

```bash
docker compose down -v
```

## Develop locally (optional)

**API** (requires a running Postgres on port 5432):

```bash
cd api
npm install
DB_HOST=localhost DB_PASS=postgres npm run start:dev
```

**Web:**

```bash
cd web
npm install
NEXT_PUBLIC_API_URL=http://localhost:3001 npm run dev
```

## Architecture

```
/ (monorepo)
├── api/   NestJS + TypeORM + PostgreSQL
└── web/   Next.js 14 App Router + Tailwind CSS
```

The API exposes `POST /contacts`, `GET /contacts`, `PATCH /contacts/:id`, `DELETE /contacts/:id`.  
The web app is a client-rendered SPA wrapped in Next.js App Router — all API calls happen in the browser via SWR and `fetch`.

## Assumptions

1. **Phone validation scope** — The spec says "Australian phone number". I interpreted this as landlines (02/03/07/08) and mobiles (04x), matching the pattern `/^(\+?61|0)[2-578]\d{8}$/`. Premium-rate, 1300, and 1800 numbers are excluded as they are not personal contact numbers.

2. **"Mark as verified" endpoint** — The spec lists a `PATCH /contacts/:id` update endpoint but does not specify a dedicated `/verify` endpoint. I used `PATCH` with `{ verified: true }` in the body, which is idiomatic REST and avoids a bespoke endpoint.

3. **Database choice** — The spec allows SQLite or PostgreSQL. I chose PostgreSQL 16 to match a real production stack and because it integrates cleanly with Docker Compose. TypeORM's `synchronize: true` is used for simplicity (not production-safe).

4. **`NEXT_PUBLIC_API_URL` baked at build time** — Next.js bakes `NEXT_PUBLIC_*` vars at build time. The Docker image is built with `http://localhost:3001`, which works because all API calls are client-side (the browser hits localhost:3001 directly). If the app were deployed to a remote host, the image would need rebuilding with the correct URL.

## What I'd improve with one more day

- **End-to-end tests** — add Playwright tests covering the full form → thank-you → contacts-list → verify/delete flow.
- **Error boundaries + toast notifications** — surface API errors (e.g., duplicate email) in the UI rather than silently failing.
- **Runtime env for the API URL** — use Next.js middleware or a `/api/config` route to inject the API URL at runtime rather than baking it into the Docker image.

## Time taken

Approximately 3–4 hours total across planning, implementation, and debugging the Docker/Next.js scaffolding issues.
