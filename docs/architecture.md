# Architecture

## Goal
Keep the boilerplate small, predictable, and easy to extend without carrying placeholder layers that do not have real behavior yet.

## Runtime Flow
1. `src/main.tsx` bootstraps React and imports global styles.
2. `src/app/App.tsx` composes the app shell.
3. `src/app/providers.tsx` wires shared app providers, including TanStack Query.
4. `src/app/routes.tsx` defines active routes via `BrowserRouter`.
5. `src/pages/*` compose feature and UI layers.

Current route source-of-truth:
- `src/app/routes.tsx`

## High-Level Structure
- `src/app/*`: app shell, query client, providers, error boundary, router
- `src/pages/*`: route-level pages
- `src/components/features/*`: use-case composition
- `src/components/ui/*`: reusable presentational primitives
- `src/hooks/*`: reusable hooks, especially data hooks built on TanStack Query
- `src/lib/api/*`: API client, endpoints, and request helpers
- `src/lib/utils/*`: low-level shared utilities
- `src/types/*`: shared contracts reused across app or API layers

## Layer Responsibilities
- App layer:
  - owns route registration and app-wide wrappers
  - owns provider setup such as `QueryClientProvider`
  - should stay thin and predictable
- Page layer:
  - owns route-level orchestration
  - should not contain large feature implementation details
- Feature layer:
  - owns domain/use-case UI composition
  - can consume hooks and UI primitives
- Hook layer:
  - owns reusable `useQuery` and `useMutation` wrappers
  - should call into `src/lib/api/*`, not raw `fetch`
- Type layer:
  - owns shared contracts such as request options, shared API responses, and common prop shapes
  - should stay small and should not become a dumping ground for feature-local types
- UI primitive layer:
  - owns reusable presentational components
  - should not import route- or feature-specific modules
- Lib layer:
  - owns transport and generic helper logic
  - should remain framework-light where practical

## Dependency Direction
Preferred direction:
`app -> pages -> components/features -> hooks -> lib -> types`

Additional rules:
- `components/ui` can be used by pages/features, but should not import from them.
- `hooks/*` should consume `src/lib/api/*` for domain data access.
- `react-hook-form` + `zod` is the default form boundary when forms are added.
- Keep types close to a feature until they are truly shared.
- Avoid circular dependencies and broad barrel re-export chains.

## Routing Strategy
- Keep route declarations in one active place only.
- Current active place: `src/app/routes.tsx`.
- Preserve wildcard fallback route (`*`) for not-found behavior.

## State and Data Strategy
- Prefer local state for local behavior.
- Use TanStack Query for server-state caching and request lifecycle handling.
- Use React Hook Form for client-side form state and Zod for schema validation.
- Keep API call details in `src/lib/api/*`.
- Keep pages focused on composition, not transport logic.

## Scalability Strategy
- If a page grows large, move the use-case implementation into `src/components/features/*`.
- If data fetching logic is reused, move it into `src/hooks/*`.
- If a visual pattern becomes reusable, move it to `src/components/ui/*`.
- Add new top-level folders only when they contain real, maintained behavior.

## Styling Strategy
- Tailwind utilities first.
- Reuse design tokens and CSS variables from `src/index.css`.
- Reuse UI primitives before creating one-off styling patterns.
- Ensure responsive behavior across mobile and desktop.

## Architecture Change Checklist
- Is the route source-of-truth still single and obvious?
- Is `src/app/*` thin and focused on shell concerns?
- Are query hooks separated from raw API request helpers?
- Are large page implementations extracted into `components/features/*`?
- Are new top-level folders justified by real code, not anticipation?
