---
description: Smoke-test the running API end to end with curl (create → validate → list → verify → delete).
argument-hint: "[base-url, default http://localhost:3001]"
allowed-tools: Bash(curl:*)
---

Smoke-test the running API end to end. Use the base URL **$1** if provided, otherwise
`http://localhost:3001`. Exercise the full contact lifecycle with `curl` and report each
step's HTTP status and body:

1. `POST /contacts` with a valid body (firstName, lastName, email, phone `0412345678`)
   → expect **201**; capture the returned `id`.
2. `POST /contacts` with an invalid phone (`12345`) → expect **400** with a validation message.
3. `GET /contacts` → expect **200** and the new contact appearing **first** (newest-first).
4. `PATCH /contacts/<id>` with `{ "verified": true }` → expect **200** and `verified: true`.
5. `DELETE /contacts/<id>` → expect **204**.
6. `GET /contacts` → confirm the contact is gone.

Summarise as a PASS/FAIL checklist. If the API is not reachable, tell me how to start it
(`docker compose up`, or `cd api && npm run start:dev` with Postgres running on 5432).
