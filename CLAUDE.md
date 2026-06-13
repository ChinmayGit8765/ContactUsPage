# OpenAgent Contact Us — Project Spec

## Purpose

Junior Software Engineer tech test. Full-stack monorepo:
- **api/** — NestJS + TypeORM + PostgreSQL
- **web/** — Next.js 14 (App Router) + Tailwind CSS

## Monorepo Layout

```
/
├── api/
│   ├── src/
│   │   ├── contacts/
│   │   │   ├── dto/
│   │   │   │   ├── create-contact.dto.ts
│   │   │   │   └── update-contact.dto.ts
│   │   │   ├── contact.entity.ts
│   │   │   ├── contacts.controller.ts
│   │   │   ├── contacts.module.ts
│   │   │   └── contacts.service.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
├── web/
│   ├── app/
│   │   ├── contact/
│   │   │   └── page.tsx        ← Contact Us form + company details
│   │   ├── contacts/
│   │   │   └── page.tsx        ← Contacts list (newest-first)
│   │   ├── thank-you/
│   │   │   └── page.tsx        ← Thank You + first-name greeting
│   │   ├── layout.tsx
│   │   └── page.tsx            ← redirect → /contact
│   ├── components/
│   │   ├── contacts/
│   │   │   ├── ContactCard.tsx
│   │   │   └── ContactsList.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── ui/
│   │       └── Card.tsx
│   ├── hooks/
│   │   ├── useContacts.ts
│   │   └── useCreateContact.ts
│   ├── lib/
│   │   ├── api.ts              ← typed fetch client (NEXT_PUBLIC_API_URL)
│   │   └── types.ts            ← Contact, CreateContactInput
│   ├── Dockerfile
│   ├── next.config.ts
│   └── package.json
├── docker-compose.yml
├── .gitignore
├── README.md
└── AI_USAGE.md
```

## Entity: Contact

| Field       | Type      | Notes                             |
|-------------|-----------|-----------------------------------|
| id          | uuid      | PK, generated                     |
| firstName   | string    | required                          |
| lastName    | string    | required                          |
| email       | string    | required, valid email             |
| phone       | string    | required, AU phone (0X XXXX XXXX or +61) |
| note        | string    | optional                          |
| verified    | boolean   | default false                     |
| createdAt   | timestamp | auto                              |

## API Endpoints

| Method | Path              | Body / Params         | Response         |
|--------|-------------------|-----------------------|------------------|
| POST   | /contacts         | CreateContactDto      | 201 Contact      |
| GET    | /contacts         | —                     | Contact[] (newest first) |
| PATCH  | /contacts/:id     | UpdateContactDto      | 200 Contact      |
| DELETE | /contacts/:id     | —                     | 204              |

## Validation Rules

- `email`: valid email format
- `phone`: matches AU pattern `/^(\+?61|0)[2-9]\d{8}$|^(\+?61|0)4\d{8}$/`
- `firstName`, `lastName`: non-empty strings
- `note`: optional string
- `verified`: optional boolean (UpdateContactDto only)

## Frontend Routes

| Route       | Page                | Key behaviour                                     |
|-------------|---------------------|---------------------------------------------------|
| /           | redirect            | → /contact                                        |
| /contact    | Contact Us          | Company info card + form; on submit → /thank-you?name=... |
| /thank-you  | Thank You           | Reads ?name= from URL, personalised greeting      |
| /contacts   | Contacts List       | SWR/fetch, newest-first, verify + delete actions  |

## Company Details (for the Contact Us card)

```
OpenAgent
Phone:   1300 765 030
Email:   support@openagent.com.au
Address: Level 10, 222 Pitt St, Sydney NSW 2000
Hours:   Mon–Fri 8:30am–5:30pm AEST
```

## Tech Stack

- **Backend**: NestJS 10, TypeORM 0.3, PostgreSQL 16, class-validator, class-transformer
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, react-hook-form, zod
- **Infra**: Docker Compose (db + api + web)

## Environment Variables

```
# api
DB_HOST=localhost        # docker: db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=openagent
WEB_ORIGIN=http://localhost:3000

# web
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Walkthrough Script (for interview)

1. `CLAUDE.md` — spec and contract (this file)
2. `api/src/contacts/contact.entity.ts` — data model
3. `api/src/contacts/dto/` — validation contracts
4. `api/src/contacts/contacts.service.ts` — business logic
5. `api/src/contacts/contacts.controller.ts` — HTTP layer
6. `api/src/app.module.ts` — wiring TypeORM + feature modules
7. `api/src/main.ts` — bootstrap: ValidationPipe + CORS + port
8. `web/lib/types.ts` — shared TS types
9. `web/lib/api.ts` — typed fetch client
10. `web/hooks/useContacts.ts` — data fetching
11. `web/hooks/useCreateContact.ts` — mutation
12. `web/components/contacts/ContactCard.tsx` — card UI
13. `web/components/contacts/ContactsList.tsx` — list with empty/loading/error
14. `web/app/contact/page.tsx` — Contact Us form
15. `web/app/thank-you/page.tsx` — Thank You page
16. `web/app/contacts/page.tsx` — Contacts list page
17. `docker-compose.yml` — full stack orchestration
