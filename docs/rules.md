# Rules for Agents

## Priority Order
When rules conflict, follow this order:
1. Runtime behavior in `src/main.tsx`, `src/app/App.tsx`, and `src/app/routes.tsx`
2. `AGENTS.md`
3. `docs/rules.md`
4. Other docs in `docs/*`

## Scope Rules
- Keep changes strictly scoped to the user request.
- Do not refactor unrelated files unless explicitly asked.
- Prefer the smallest safe change that solves the task.
- If a page or feature grows large, split it into reusable components.
- Follow `docs/workflow.md` as the default implementation flow unless the user explicitly requests a different approach.

## Safety Rules
- Do not run destructive commands without explicit user approval.
- Do not delete files unless requested.
- Do not change lockfiles or generated files unless required.
- Never expose secrets, credentials, or private tokens in code, logs, or docs.
- Do not silently change public behavior without documenting impact.

## Consistency Rules
- Follow guidance in:
  - `AGENTS.md`
  - `docs/api.md`
  - `docs/architecture.md`
  - `docs/coding-standards.md`
  - `docs/patterns.md`
  - `docs/workflow.md`
- If a convention changes, update related docs in the same change.

Documentation sync requirements:
- API contract or API structure changed -> update `docs/api.md`
- Architecture boundary changed -> update `docs/architecture.md`
- Coding convention changed -> update `docs/coding-standards.md`
- Reusable workflow changed -> update `docs/patterns.md`
- Delivery workflow changed -> update `docs/workflow.md`

## Routing Rules
- Keep route source-of-truth in one place.
- Current active approach is `BrowserRouter` in `src/app/routes.tsx`.
- Preserve wildcard fallback route (`*`).

## Dependency Rules
- Reuse existing dependencies first.
- Add new dependencies only when necessary and documented.
- Default form stack: `react-hook-form` for form state and `zod` for schema validation.
- Prefer existing utilities/components before introducing new abstractions.
- Do not add placeholder top-level directories unless they have real code behind them.

## Shared Type Rules
- Keep shared contracts in `src/types/*` only when they are reused across multiple boundaries.
- Prefer feature-local types until reuse is real.
- Do not create placeholder type files just to mirror folders.

## Validation Rules
For source code changes, run:
```bash
pnpm lint
pnpm type-check
pnpm build
```

For docs-only changes, command validation may be skipped but must be reported.

For UI/API behavior changes, also run manual verification:
- one happy path
- one error or empty path

## Final Response Rules
When completing a task, include:
- what changed and why
- touched files
- commands run and outcomes
- limitations or assumptions

## Handoff Quality Bar
A task is not complete if:
- code changed but related docs were not updated
- key validations were skipped without disclosure
- empty placeholder files remain where `.gitkeep` or removal would be clearer
