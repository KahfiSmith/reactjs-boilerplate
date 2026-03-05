# Architecture

## Goal
Keep the codebase predictable and scalable through strict layering, clear dependency direction, and one active routing approach.

## Runtime Flow
1. `src/main.tsx` bootstraps React, imports global styles, and renders `App`.
2. `src/App.tsx` defines active routes via `BrowserRouter`.
3. Route pages in `src/pages/*` compose features and primitives.

Current route source-of-truth:
- `src/App.tsx` is active.

## High-Level Structure
- `src/pages/*`: route-level pages and page composition
- `src/components/features/*`: domain/use-case UI composition
- `src/components/ui/*`: reusable presentational primitives
- `src/hooks/*`: reusable interaction and state logic
- `src/lib/api/*`: endpoint constants, API client, and typed queries
- `src/lib/helpers/*`, `src/lib/utils/*`: pure helpers and utility functions
- `src/lib/schemas/*`: parsing/validation schemas when required
- `src/lib/auth/*`: authentication helpers and auth-related boundaries
- `src/types/*`: shared contracts and type definitions
- `providers/index.ts`: provider composition boundary

## Layer Responsibilities
- Page layer:
  - owns route-level orchestration
  - should not contain raw transport logic
- Feature layer:
  - owns use-case specific UI composition
  - can consume hooks and lib modules
- UI primitive layer:
  - owns reusable presentational components
  - should not depend on route-level or domain-specific modules
- Library layer:
  - owns integration logic, utility functions, and data contracts
  - should remain framework-light where practical

## Dependency Direction
Preferred direction:
`pages -> components/features -> hooks -> lib/api|lib/helpers|lib/utils -> types`

Additional rules:
- `components/ui` can be used by pages/features, but should not import from them.
- All layers may import from `src/types`.
- Avoid circular dependencies, especially through broad barrel re-exports.

## Routing Strategy
- Keep route declarations in one active approach at a time.
- Maintain wildcard fallback route (`*`) for not-found behavior.

## State and Data Strategy
- Prefer local state for local behavior.
- Extract shared behavior into hooks only when reuse is clear.
- Keep API call details in `src/lib/api/*`.
- Keep pages/components focused on rendering and interaction.

## Component Scalability Strategy
- If a widget or page component becomes large, split it into reusable child components.
- Promote generic visuals into `src/components/ui/*`.
- Keep use-case specific pieces in `src/components/features/*`.

## Styling Strategy
- Tailwind utilities first.
- Reuse design tokens and CSS variables from `src/index.css`.
- Reuse UI primitives before creating one-off styling patterns.
- Ensure responsive behavior in mobile and desktop breakpoints.

## Architecture Change Checklist
- Is the active routing source-of-truth still clear and single?
- Are dependency boundaries still respected?
- Is large JSX decomposed into reusable components where needed?
- Are docs updated (`docs/architecture.md`, `docs/patterns.md`) after boundary changes?
