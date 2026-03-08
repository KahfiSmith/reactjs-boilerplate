# Implementation Workflow (Reference Flow)

Use this as the default implementation flow so the starter stays small, consistent, and easy to extend.

## Repository Context
- This repo is a React + Vite frontend.
- Active routing is in `src/app/routes.tsx`.
- `src/app/*` owns shell wiring only.
- TanStack Query is the default server-state layer.
- React Hook Form + Zod is the default form and validation stack.
- API work here means frontend integration through `src/lib/api/*`.

## End-to-End Layer Flow (Data-Driven Feature)
`external API contract -> src/lib/api/endpoints.ts -> src/lib/api/client.ts -> src/lib/api/queries.ts -> src/hooks/* -> src/components/features/* -> src/pages/* -> src/app/routes.tsx`

## End-to-End Layer Flow (UI-Only Feature)
`page requirement -> src/components/features/* -> src/components/ui/* -> optional src/hooks/* or src/lib/utils/* -> src/pages/* -> src/app/routes.tsx`

## Default Path Map
- App shell: `src/app/App.tsx`
- Route registration: `src/app/routes.tsx`
- App-wide wrappers: `src/app/providers.tsx`, `src/app/error-boundary.tsx`
- Query client: `src/app/query-client.ts`
- Route pages: `src/pages/<page>.tsx`
- Feature components: `src/components/features/<feature>/*`
- Reusable primitives: `src/components/ui/*`
- API endpoint constants: `src/lib/api/endpoints.ts`
- API transport client: `src/lib/api/client.ts`
- API request functions: `src/lib/api/queries.ts`
- API public exports: `src/lib/api/index.ts`
- Query hooks: `src/hooks/*`
- Generic utilities: `src/lib/utils/*`
- Shared types when needed: `src/types/*`
- Feature form schemas: keep close to the owning feature unless they are reused broadly

## Practical Steps
1. Start in the page or feature that owns the user-facing behavior.
2. If the page grows, move the use-case implementation into `src/components/features/*`.
3. Reuse `src/components/ui/*` primitives before creating new ones.
4. Keep generic helpers in `src/lib/utils/*`.
5. For API work, define endpoints in `src/lib/api/endpoints.ts`.
6. Implement transport behavior in `src/lib/api/client.ts`.
7. Add typed request functions in `src/lib/api/queries.ts`.
8. Wrap them in `src/hooks/*` with `useQuery` or `useMutation`.
9. Consume those hooks from feature components or pages.
10. For forms, model validation with `zod` and wire submission state through `react-hook-form`.
11. Register routes in `src/app/routes.tsx`.
12. Verify and sync docs before handoff.

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
- Architecture or folder strategy changed: update `docs/architecture.md`
- Coding conventions changed: update `docs/coding-standards.md`
- Implementation recipes changed: update `docs/patterns.md`
- Rules or policy changed: update `docs/rules.md`
- Workflow changed: update this file

## Guardrails
- Keep one active routing source-of-truth.
- Do not add placeholder top-level modules with empty `.ts` files.
- Do not call `fetch` directly from pages/components for domain data.
- Do not move types into `src/types/*` unless they are actually shared.
- Keep changes scoped and avoid unrelated refactors.
