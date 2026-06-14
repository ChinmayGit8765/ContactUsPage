# Claude Code project configuration

This repo was built with [Claude Code](https://claude.com/claude-code) (Anthropic's CLI
agent). The files under `.claude/` are the **project-scoped** configuration I used while
working — they are committed deliberately so the workflow is transparent and reproducible,
per the brief's request to disclose AI-tool usage. See [`../AI_USAGE.md`](../AI_USAGE.md)
for the full disclosure.

> Note: these are *project* settings. My personal/global Claude Code setup (other agents,
> skills, model prefs) lives outside this repo and is intentionally not included.

## Layout

```
.claude/
├── settings.json              # hook wiring (committed, shared)
├── settings.local.json        # personal overrides (git-ignored, not committed)
├── hooks/
│   ├── guard-generated.mjs    # PreToolUse: block hand-edits to generated/vendored files
│   └── format-on-save.mjs     # PostToolUse: Prettier-format backend files after a write
├── agents/
│   └── contacts-reviewer.md   # subagent: project-aware code review
└── commands/
    ├── verify-stack.md        # /verify-stack  — build both apps + run API tests
    ├── new-endpoint.md        # /new-endpoint  — scaffold a Nest resource to convention
    └── smoke-api.md           # /smoke-api     — curl the running API end to end
```

## Hooks (`settings.json` + `hooks/`)

Both hooks are plain Node scripts (no extra dependencies) and are invoked as
`node .claude/hooks/<script>.mjs` so they run identically on Windows, macOS, and Linux.

- **`guard-generated.mjs`** (`PreToolUse` on `Write|Edit`) — reads the pending tool call
  from stdin and **exits 2 to block** any attempt to hand-edit `node_modules/`, `dist/`,
  `.next/`, `build/`, `coverage/`, or a `package-lock.json`. Those should only change via a
  build/install step, never by hand.
- **`format-on-save.mjs`** (`PostToolUse` on `Write|Edit`) — after a backend file is
  written, runs the API's local Prettier over just that file. It is deliberately
  best-effort: it only touches files under `api/`, only if a local Prettier binary exists,
  and it **never blocks** (always exits 0). The frontend relies on ESLint / `next lint`.

## Subagent (`agents/contacts-reviewer.md`)

A reviewer scoped to this exact stack. Its highest-priority check is **validation parity** —
the Australian-phone and email rules are duplicated in the zod schema (frontend) and the
class-validator DTO (backend), and the agent's job is to catch any drift between them. Run
it with the Agent tool / `@contacts-reviewer`.

## Slash commands (`commands/`)

- **`/verify-stack`** — the exact pre-submit check used here: builds `api` and `web` and
  runs the API Jest suite, reporting a PASS/FAIL summary.
- **`/new-endpoint <name>`** — scaffolds a new NestJS resource (entity, DTOs, service,
  controller, module) matching the `contacts/` conventions and wires it into `app.module.ts`.
- **`/smoke-api [base-url]`** — drives the running API through create → invalid-input →
  list (newest-first) → verify → delete with `curl`.
