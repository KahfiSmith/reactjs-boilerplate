# Reactjs Boilerplate

Lean frontend boilerplate for React + TypeScript + Vite with Tailwind CSS v4, React Router v7, TanStack Query, React Hook Form, Zod, Framer Motion, and a shadcn-style UI layer.

## Overview

This starter is organized around a small set of real boundaries:

- `src/app`: app shell, providers, router, query client, error boundary
- `src/pages`: route-level pages
- `src/components/features`: feature composition
- `src/components/ui`: reusable visual primitives
- `src/lib/api`: API client, endpoints, and request helpers
- `src/hooks`: shared reusable hooks, including TanStack Query hooks
- `src/lib/utils`: shared low-level utilities
- `src/types`: shared contracts reused across app and API boundaries

Current runtime behavior:

- bootstrap starts in `src/main.tsx`
- app shell lives in `src/app/App.tsx`
- active route source-of-truth is `src/app/routes.tsx`
- TanStack Query is provided from `src/app/providers.tsx`
- the shared query client lives in `src/app/query-client.ts`
- routing uses `BrowserRouter` + `Routes`
- pages are lazy-loaded with `Suspense`
- loading fallback uses `src/pages/loading.tsx`
- render errors fall back through `src/app/error-boundary.tsx`

## Project Docs

- `docs/rules.md`
- `docs/workflow.md`
- `docs/architecture.md`
- `docs/coding-standards.md`
- `docs/patterns.md`
- `docs/api.md`

If documentation conflicts with runtime, follow `src/main.tsx`, `src/app/App.tsx`, and `src/app/routes.tsx`.

## Prerequisites

- Node.js LTS
- `pnpm`

## Commands

```bash
pnpm install
pnpm dev
pnpm lint
pnpm type-check
pnpm build
pnpm preview
```

Notes:

- `pnpm build` runs `tsc -b && vite build`
- there is currently no `pnpm test` script
- a test scaffold exists at `test/setup.ts`

## Current Routing

Routes are declared in `src/app/routes.tsx`:

- `/` -> `src/pages/index.tsx`
- `*` -> `src/pages/not-found.tsx`

Shell fallbacks:

- loading -> `src/pages/loading.tsx`
- render error -> `src/pages/error.tsx`

## Directory Guide

```text
.
├─ docs/
├─ public/
│  ├─ fonts/
│  ├─ icons/
│  └─ images/
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  ├─ error-boundary.tsx
│  │  ├─ providers.tsx
│  │  ├─ query-client.ts
│  │  └─ routes.tsx
│  ├─ components/
│  │  ├─ features/
│  │  │  └─ home/
│  │  └─ ui/
│  ├─ hooks/
│  ├─ lib/
│  │  ├─ api/
│  │  └─ utils/
│  ├─ pages/
│  ├─ types/
│  ├─ index.css
│  └─ main.tsx
├─ test/
│  └─ setup.ts
├─ components.json
├─ eslint.config.js
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## Layer Responsibilities

- `src/app/*`: app-wide shell concerns, route registration, and provider setup
- `src/pages/*`: route-level composition only
- `src/components/features/*`: feature-specific UI composition
- `src/components/ui/*`: reusable presentational primitives
- `src/lib/api/*`: transport, endpoint definitions, and request helpers
- `src/hooks/*`: reusable hooks, especially TanStack Query hooks that consume `src/lib/api/*`
- `src/lib/utils/*`: generic utilities such as `cn()`
- `src/types/*`: optional shared types when they are reused across layers

Preferred dependency direction:

`app -> pages -> components/features -> hooks -> lib -> types`

Practical rule:

- keep API request details in `src/lib/api/*`
- keep `useQuery` and `useMutation` wrappers in `src/hooks/*`
- keep pages thin and render feature components

## TanStack Query Pattern

Recommended data flow:

1. define endpoint builders in `src/lib/api/endpoints.ts`
2. define request functions in `src/lib/api/queries.ts`
3. wrap them with `useQuery` or `useMutation` in `src/hooks/*`
4. consume those hooks inside feature components or pages

Example files:

- `src/app/query-client.ts`
- `src/app/providers.tsx`
- `src/hooks/use-app-status.ts`

## Forms and Validation

- `react-hook-form` is the default form-state library.
- `zod` is the default schema and validation library.
- Keep form schemas close to the owning feature unless they are reused broadly.
- Promote request and response contracts into `src/types/*` only when they cross multiple boundaries.

## Styling

- Tailwind CSS v4 is enabled through `@tailwindcss/vite`
- global styles and CSS variables live in `src/index.css`
- use `cn()` from `src/lib/utils`
- reuse `src/components/ui/*` before creating new primitives

## Import Alias

The `@` alias maps to `src`.

Example:

```ts
import { Button } from "@/components/ui";
```

## API Structure

`src/lib/api` contains the boilerplate API surface:

- `client.ts`: generic `fetch` wrapper with JSON handling and normalized errors
- `endpoints.ts`: endpoint map and path builders
- `queries.ts`: reusable request helpers and feature-facing query functions
- `index.ts`: public exports

`VITE_API_BASE_URL` is supported as an optional base URL for API requests.

Current shared contracts live in `src/types/*`, including:

- `ApiRequestOptions`
- `AppStatusResponse`
- `WithChildren`
- `ErrorPageProps`

## Verification

For source changes, run:

```bash
pnpm lint
pnpm type-check
pnpm build
```

For UI or API changes, also manually verify:

- one happy path
- one error or empty path

## Notes

- placeholder directories should use `.gitkeep`, not empty `.ts` files
- keep route declarations in `src/app/routes.tsx`
- add new top-level structure only when it has real code behind it
