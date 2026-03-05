# Repository Guidelines (Frontend React + Vite Boilerplate)

This document defines implementation rules for agents and contributors in this repository.
Goal: consistent, fast, safe delivery without over-engineering.

## Source of Truth (Read First)
- Product and project context: `README.md`
- Non-negotiable rules: `docs/rules.md`
- Coding standards: `docs/coding-standards.md`
- API documentation: `docs/api.md`
- Architecture: `docs/architecture.md`
- Implementation patterns (do not remove): `docs/patterns.md`
- Implementation workflow (execution reference): `docs/workflow.md`

If any conflict appears, follow current runtime behavior from `src/main.tsx` and active routes in `src/App.tsx`.

## Documentation Sync Rules (Required)
- If non-negotiable constraints change: update `docs/rules.md`.
- If coding style, naming, or structure changes: update `docs/coding-standards.md`.
- If API contracts or request/response behavior changes: update `docs/api.md`.
- If dependency direction or architecture boundaries change: update `docs/architecture.md`.
- If reusable implementation recipes change: update `docs/patterns.md`.
- If delivery workflow changes: update `docs/workflow.md`.
- If runtime routing approach changes (`App.tsx` vs `router.tsx`): reflect it in `docs/architecture.md` and `README.md`.
- Handoff is incomplete if code changes are done but related docs are not synchronized.

## Tech Stack (Must Know Before Implementation)
- App framework: React `19.x` + Vite `7.x`
- Router: `react-router-dom` `7.x`
- Language: TypeScript `strict`
- Styling: Tailwind CSS `v4` with CSS variables in `src/index.css`
- UI system: shadcn/ui style (`components.json`, `src/components/ui`)
- Utility libraries: `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, `framer-motion`
- Linting: ESLint (`eslint.config.js`) with TypeScript and React Hooks rules
- Type safety in build: `tsc -b` included in `pnpm build`
- Testing scaffold exists (`test/setup.ts`), but no test script is currently configured in `package.json`

## Non-Negotiables (Hard Rules)
- Follow `docs/workflow.md` as the default execution path for implementation unless user instructions explicitly override it.
- Keep routing source-of-truth in one approach at a time:
  - Current active approach: `BrowserRouter` + `Routes` in `src/App.tsx`
  - `src/router.tsx` is alternative only; do not duplicate route declarations across both.
- Keep concerns separated:
  - pages: route-level composition
  - feature components: domain UI composition
  - ui primitives: reusable presentational building blocks
  - API layer: `endpoints.ts`, `client.ts`, `queries.ts` in `src/lib/api`
- If a widget/component becomes large, split it into smaller reusable components instead of keeping monolithic JSX in one file.
- Do not call `fetch` directly from UI components/pages for domain data access.
- Use import alias `@/*` consistently per `tsconfig.json` and `vite.config.ts`.
- Preserve existing contracts unless compatibility impact is explicitly stated.
- For placeholder directories, use `.gitkeep` instead of empty `.ts` or `.tsx` files.
- Never commit secrets or credentials.
- Do not modify build/lint/tooling config unless task scope explicitly requires it.

## Engineering Principles (Principal Engineer Mindset)
- Correctness over speed: small correct changes over fast risky patches.
- Maintainability first: keep code clear for future edits.
- Stability first: broad refactors only when needed.
- Explicit trade-offs: if using shortcuts, state limitations and risks.
- Backward compatibility by default: keep existing props and payload shape unless breaking change is approved.
- Secure by default: validate inputs and avoid leaking raw internal errors.
- Simplicity is a feature: prefer the smallest design that solves current scope.

## Core Design Principles (DRY, SOLID, KISS)
- DRY:
  - Avoid duplicated logic across pages, features, and API modules.
  - Extract helpers when reuse and readability justify it.
- SOLID (practical):
  - Single Responsibility: keep each module focused.
  - Open/Closed: extend with focused modules, avoid churn in stable flows.
  - Interface Segregation: keep types small and purpose-driven.
  - Dependency Inversion: avoid coupling UI layers to low-level transport details.
- KISS:
  - Avoid unnecessary abstractions for simple cases.
  - Choose the design that is easiest to read and verify.

## Architecture Notes (Simple but Strict)

### Layer Responsibilities
- `src/main.tsx`: runtime bootstrap and global CSS import.
- `src/App.tsx`: active router shell and route declarations.
- `src/pages/*`: route-level page UI.
- `src/components/features/*`: feature-level composition.
- `src/components/ui/*`: reusable primitives.
- `src/lib/api/*`: API client, endpoints, and request functions.
- `src/lib/schemas/*`: schema parsing/validation (when used).
- `src/types/*`: domain and API contracts.
- `providers/index.ts`: provider wiring boundary.

### Dependency Direction
`pages -> components/features -> components/ui + hooks -> lib/api|lib/helpers|lib/utils -> types`

Note: `components/ui` must not depend on route-level logic or domain-specific page concerns.

## API Contract Discipline
- When an API contract changes, synchronize:
  1. `src/lib/api/endpoints.ts`
  2. `src/lib/api/client.ts` and/or `src/lib/api/queries.ts`
  3. related types in `src/types/api.ts`
  4. `docs/api.md`
- Keep response and error style consistent per endpoint.
- For protected calls, keep auth handling consistent with selected boundary in `src/lib/auth` and hooks.

## UI and Styling Rules
- Use tokens and CSS variables from `src/index.css`.
- Reuse `src/components/ui` before creating new primitives.
- Use `cn()` from `src/lib/utils/cn.ts` for class merging.
- Keep feature components focused on use case composition, not primitive styling internals.
- Keep layouts responsive across desktop and mobile.
- Avoid basic accessibility regressions (labels, semantics, focus states).

## Testing and Verification Rules
Minimum before handoff for code changes:
- `pnpm lint`
- `pnpm type-check`
- `pnpm build`
- Manual check for updated flow (at least one happy path and one error/empty path for relevant form/API changes)

If full verification cannot run in local environment, clearly state what was not run.

## Implementation Patterns

### Pattern A: Add a New Page or UI Feature
1. Add or update page in `src/pages/...`.
2. Create or compose feature components in `src/components/features/...`.
3. Reuse primitives from `src/components/ui/...`.
4. Move non-trivial logic into hooks or `src/lib/...`.
5. Update types and docs when contracts or conventions change.
6. Verify with lint, type-check, build, and manual flow check.

### Pattern B: Add a New API Integration Function
1. Add endpoint constant in `src/lib/api/endpoints.ts`.
2. Add types in `src/types/api.ts`.
3. Implement request function in `src/lib/api/queries.ts` using `client.ts`.
4. Export through `src/lib/api/index.ts`.
5. Update `docs/api.md`.
6. Verify payload shape and error behavior.

### Pattern C: Update Existing API Contract
- Avoid breaking existing payload shape when possible.
- Prefer additive optional fields for response evolution.
- Keep endpoint error style consistent.

### Pattern D: Auth-Protected Flow
1. Choose protection boundary (API layer, page guard, or provider level).
2. Keep auth config synchronized (`src/lib/auth`, `src/hooks/auth`, `providers/index.ts`).
3. Do not expose sensitive values in client-rendered output.
4. Verify unauthorized and authorized behavior.

## Anti Over-Engineering Rules
- Do not add dependencies without clear technical need.
- Do not do broad refactors for small scoped requests.
- Do not split files/modules unless real reuse value exists.
- Large components should still be decomposed when readability or reuse is poor.
- Prioritize changes that are small, clear, safe, and testable.

## Git and Safety Rules
- Do not revert unrelated user changes.
- Do not run destructive commands (`git reset --hard`, `git checkout --`) without explicit approval.
- If unexpected file changes appear during work, stop and confirm before proceeding.
- Do not amend commits unless explicitly requested.

## Output Contract (for Agent Handoff)
Always report in this order:
1. Short solution summary
2. Files changed
3. Verification steps
4. Risks or unverified items

## Quick Command Reference
```bash
# local dev
pnpm dev
pnpm build
pnpm preview

# quality checks
pnpm lint
pnpm type-check
```
