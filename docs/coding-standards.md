# Coding Standards

## Purpose
Define practical rules that keep the boilerplate consistent, readable, and easy to extend.

## Language and Tooling
- Use TypeScript for all source files.
- Respect strict settings in `tsconfig.app.json`.
- Follow rules in `eslint.config.js`.
- Preserve behavior-first changes: style changes must not alter runtime behavior unintentionally.

## Naming Conventions
- Components: `PascalCase`
- Hooks: `useCamelCase`
- Route files: keep the existing style (`index.tsx`, `not-found.tsx`)
- Functions and variables: `camelCase`
- Types/interfaces: `PascalCase`
- Constants: `UPPER_SNAKE_CASE` for module-level immutable values

## Imports
- Use the `@` alias for `src` imports.
- Prefer alias imports over long relative paths.
- Keep import groups ordered: external, alias, relative.
- Remove unused imports in the same change.
- Prefer stable folder entrypoints like `@/components/ui` or `@/lib/api` when they exist.

## React Rules
- Prefer function components and hooks.
- Type props explicitly.
- Keep pages thin; move feature implementation into `src/components/features/*`.
- Keep components small and composable.
- Extract heavy logic from JSX into helpers/hooks.
- Add effect cleanup where required.
- For forms, prefer `react-hook-form` over ad hoc local-state form wiring.

## Large Component Threshold Guidance
Treat decomposition as required when one or more apply:
- JSX is difficult to scan due to many nested sections.
- The component handles multiple responsibilities.
- Subsections are reusable across pages/features.
- Review and maintenance are getting slow.

Recommended split:
1. Keep the page as route-level orchestration.
2. Move use-case UI into `src/components/features/*`.
3. Move reusable visual pieces to `src/components/ui/*`.
4. Keep shared logic in hooks or `src/lib/*`.

## Styling Rules
- Use Tailwind utility classes first.
- Use `cn()` from `src/lib/utils`.
- Reuse primitives in `src/components/ui` before adding new atoms.
- Ensure mobile and desktop responsiveness.
- Prefer existing token variables from `src/index.css` over ad hoc hardcoded colors.

## API and Data Rules
- Keep network calls in `src/lib/api`.
- Keep TanStack Query hooks in `src/hooks/*`.
- Do not place transport logic in pages, features, UI primitives, or hooks.
- Keep UI error messages user-oriented; keep raw error parsing in the API layer.
- Add shared API types to `src/types/*` only when they are reused across multiple boundaries.

## Forms and Validation Rules
- Use `zod` for schema validation when request payloads or forms need runtime validation.
- Keep form schemas near the owning feature until they are shared.
- Keep submission handlers explicit; do not hide request side effects inside presentational components.
- Use schema-derived types where that reduces duplication.

## TanStack Query Rules
- Create and configure the shared query client in `src/app/query-client.ts`.
- Provide it once in `src/app/providers.tsx`.
- Build feature-facing data hooks in `src/hooks/*`.
- Query hooks should call typed request helpers from `src/lib/api/*`, not embed transport details.
- Keep query keys stable and co-located with their hooks unless they are shared broadly.

## Type Safety Rules
- Avoid `any`; use explicit types or `unknown` with narrowing.
- Keep function return types clear for public helpers and hooks.
- Prefer keeping types close to the owning feature until they are genuinely shared.
- Reuse contracts from `src/types/*` when the same type crosses app, page, hook, or API boundaries.

## Commenting Rules
- Prefer self-explanatory code over excessive comments.
- Add comments for non-obvious decisions, not obvious assignments.
- Keep TODO comments actionable and scoped.

## Quality Gates
Before merging source changes:
```bash
pnpm lint
pnpm type-check
pnpm build
```

If you cannot run full checks, state exactly what was not run and why.

## Review Checklist
- No unnecessary `any` types.
- No dead code or unused imports.
- No unrelated refactors in scoped tasks.
- Pages stay thin and large UI is decomposed.
- Query hooks stay separate from raw API helpers.
- Updated docs when conventions/contracts changed.
