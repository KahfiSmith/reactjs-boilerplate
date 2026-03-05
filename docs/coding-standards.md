# Coding Standards

## Purpose
Define practical coding rules that keep implementation consistent, readable, and safe across contributors and agents.

## Language and Tooling
- Use TypeScript for all source files.
- Respect strict settings in `tsconfig.app.json`.
- Follow rules in `eslint.config.js`.
- Preserve behavior-first changes: style changes must not alter runtime behavior unintentionally.

## Naming Conventions
- Components: `PascalCase` (`UserCard.tsx`).
- Hooks: `useCamelCase` (`useAuthState.ts`).
- Route files: keep existing style (`index.tsx`, `not-found.tsx`).
- Constants: `UPPER_SNAKE_CASE` for module-level immutable values.
- Functions and variables: `camelCase`.
- Types/interfaces: `PascalCase`.

## Imports
- Use `@` alias for `src` imports.
- Prefer alias imports over long relative paths.
- Keep import groups ordered: external, alias, relative.
- Remove unused imports in the same change.

## React Rules
- Prefer function components and hooks.
- Type props explicitly.
- Keep components small and composable.
- Extract heavy logic from JSX into helpers/hooks.
- If a widget/component grows large, split it into reusable child components.
- Keep render trees readable:
  - avoid deeply nested JSX when extractable
  - move repeated blocks into child components
- Add effect cleanup where required (timers, subscriptions, listeners).

## Large Component Threshold Guidance
Treat decomposition as required when one or more apply:
- JSX is difficult to scan due to many nested sections.
- The component handles multiple responsibilities (layout, data logic, modal logic, form logic).
- Subsections are reusable across pages/features.
- File length grows to the point review and maintenance become slow.

Recommended split:
1. Keep parent as orchestrator.
2. Move reusable visual blocks to `src/components/ui/*`.
3. Move use-case blocks to `src/components/features/*`.
4. Keep shared logic in hooks/util modules.

## Styling Rules
- Use Tailwind utility classes first.
- Use `cn()` from `src/lib/utils/cn.ts` for class merging.
- Reuse primitives in `src/components/ui` before adding new atoms.
- Ensure mobile and desktop responsiveness.
- Prefer existing token variables from `src/index.css` over ad hoc hardcoded colors.

## API and Data Rules
- Keep network calls in `src/lib/api`.
- Use shared API types from `src/types/api.ts`.
- Do not place transport logic in UI primitives.
- Keep UI error messages user-oriented; keep raw error parsing in API layer.

## Type Safety Rules
- Avoid `any`; use explicit types or `unknown` with narrowing.
- Keep function return types clear for public helpers and hooks.
- Prefer discriminated unions for state with multiple outcomes.

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
- Large components are decomposed when complexity is high.
- Updated docs when conventions/contracts changed.
