# Implementation Workflow (Reference Flow)

This file is the default implementation workflow for this repository.
Use this as the execution reference so changes stay consistent and avoid ad-hoc structure.

## Repository Context
- This repo is a React + Vite frontend.
- Active routing is in `src/App.tsx` (via `BrowserRouter`).
- There is no built-in backend route layer in this repo. API work here means frontend API integration through `src/lib/api/*`.

## End-to-End Layer Flow (Data-Driven Feature)
`external/backend API contract -> schema/types -> endpoint map -> HTTP client -> query function -> UI hook -> feature component -> page -> route registration`

Concrete mapping:
`src/types + src/lib/schemas -> src/lib/api/endpoints.ts -> src/lib/api/client.ts -> src/lib/api/queries.ts -> src/hooks/* -> src/components/features/* -> src/pages/* -> src/App.tsx`

## End-to-End Layer Flow (UI-Only Feature)
`page requirement -> feature component -> reusable UI primitives -> optional hook/helper -> route registration`

Concrete mapping:
`src/pages/* -> src/components/features/* -> src/components/ui/* -> src/hooks/* | src/lib/helpers/* -> src/App.tsx`

## Default Path Map
- Route registration (active): `src/App.tsx`
- Route pages: `src/pages/<page>.tsx`
- Feature components: `src/components/features/<feature>/*`
- Reusable primitives: `src/components/ui/*`
- API endpoint constants: `src/lib/api/endpoints.ts`
- API transport client: `src/lib/api/client.ts`
- API query functions: `src/lib/api/queries.ts`
- API public exports: `src/lib/api/index.ts`
- Validation schemas (when needed): `src/lib/schemas/<feature>.schema.ts` or `src/lib/schemas/<feature>.ts`
- Shared contracts/DTO: `src/types/<feature>.ts` or `src/types/api.ts`
- UI data hooks: `src/hooks/<feature>/*` or `src/hooks/use-<feature>.ts`
- Auth boundary: `src/lib/auth/*`, `src/hooks/auth/*`, `providers/index.ts`
- Config/env mapping: `src/config/*`, `.env.example` (if introduced), `.env.local` for local values

## Practical Steps
1. Define or update request/response types first (`src/types/*`).
2. Add/adjust schema validation if needed (`src/lib/schemas/*`).
3. Define endpoint constants in `src/lib/api/endpoints.ts`.
4. Implement transport handling in `src/lib/api/client.ts` if needed.
5. Implement typed query function in `src/lib/api/queries.ts`.
6. Add or update hook that consumes query functions (`src/hooks/*`).
7. Build/compose feature UI in `src/components/features/*`.
8. Reuse `src/components/ui/*` primitives before creating new ones.
9. If component/widget becomes large, split into reusable child components.
10. Mount/update page in `src/pages/*` and register route in active router (`src/App.tsx`).
11. Verify and sync docs before handoff.

## Verification
Run for source code changes:
```bash
pnpm lint
pnpm type-check
pnpm build
```

Manual verification:
- happy path for updated flow
- error or empty path for updated flow

If a test script is added later, include:
```bash
pnpm test
```

## Documentation Sync
- API behavior changed: update `docs/api.md`
- Architecture/path policy changed: update `docs/architecture.md`
- Coding convention changed: update `docs/coding-standards.md`
- Implementation pattern changed: update `docs/patterns.md`
- Rule/policy changed: update `docs/rules.md`
- Workflow changed: update this file (`docs/workflow.md`)

## Guardrails
- Keep one active routing source-of-truth.
- Do not add direct `fetch` calls in pages/components for domain data.
- Do not bypass reusable UI layer when composing repeated visual blocks.
- Keep changes scoped and avoid unrelated refactors.
