---
description: Scaffold a new NestJS resource (entity, DTOs, service, controller, module) following the contacts module conventions.
argument-hint: <resource-name, e.g. enquiry>
---

Scaffold a new REST resource named **$1** for the NestJS API, mirroring the structure and
style already used in `api/src/contacts/`. Create, under `api/src/$1/`:

- `$1.entity.ts` — TypeORM entity with a `uuid` PK and `@CreateDateColumn`, matching the
  column style in `contact.entity.ts`.
- `dto/create-$1.dto.ts` — class-validator decorators (`IsNotEmpty` / `IsEmail` / `Matches`
  / `IsOptional`) appropriate to the resource.
- `dto/update-$1.dto.ts` — `PartialType(Create...Dto)`.
- `$1.service.ts` — repository-backed `create` / `findAll` (newest-first) / `update` /
  `remove`, throwing `NotFoundException` on missing ids (copy the patterns from
  `contacts.service.ts`).
- `$1.controller.ts` — `POST` / `GET` / `PATCH` / `DELETE` (`@HttpCode(204)`), like
  `contacts.controller.ts`.
- `$1.module.ts` — `TypeOrmModule.forFeature([...])` plus controller/service wiring.

Then register the new module in `api/src/app.module.ts` and add the entity to the TypeORM
`entities` array. Match the existing code style exactly. When done, run
`cd api && npm run build` to confirm it compiles, and add a matching `*.spec.ts` mirroring
`contacts.service.spec.ts`.
