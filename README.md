# Contact Flow

A production-shaped **contact / lead-capture flow**, end to end: validated form in,
reviewed contact out. NestJS + TypeORM + PostgreSQL API, Next.js 14 (App Router) +
Tailwind frontend, one `docker compose up` to run the lot.

Branding ("Lumen & Co.") is a fictional demo company — swap the strings and this
is a drop-in contact stack for any site.

**What it shows off**

- API-side validation as the source of truth (class-validator DTOs, AU phone
  regex), mirrored client-side with react-hook-form + zod for instant feedback.
- Clean NestJS layering: entity → DTO → service → controller, no shortcuts.
- A live contacts list with verify / delete actions (SWR revalidation).
- Real tests on the API and a reviewer agent config in `.claude/` that audits
  changes against the spec in `CLAUDE.md`.

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
