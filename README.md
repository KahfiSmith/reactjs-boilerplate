# Reactjs Boilerplate

Lean frontend boilerplate for building React applications with Vite, TypeScript, Tailwind CSS v4, React Router v7, TanStack Query, React Hook Form, Zod, Framer Motion, and a shadcn-style UI layer.

## Overview

This repository is intended as a pragmatic starting point for frontend projects that need:

- a clear app shell and routing boundary
- reusable UI primitives
- a centralized API layer
- typed server-state handling
- form and validation defaults
- a build pipeline that stays small and predictable

Current runtime behavior:

- bootstrap starts in `src/main.tsx`
- the app shell lives in `src/app/App.tsx`
- routes are declared in `src/app/routes.tsx`
- `BrowserRouter` + `Routes` is the active routing strategy
- TanStack Query is provided from `src/app/providers.tsx`
- loading and error boundaries are already wired

## Tech Stack

### Core

- React 19
- TypeScript with `strict` mode
- Vite 7

### Routing and State

- `react-router-dom` 7
- `@tanstack/react-query` 5

### Forms and Validation

- `react-hook-form`
- `zod`
- `@hookform/resolvers`

### Styling and UI

- Tailwind CSS v4
- CSS variables in `src/index.css`
- shadcn-style component structure in `src/components/ui`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `lucide-react`
- `framer-motion`

### Tooling

- ESLint
- TypeScript compiler (`tsc`)

## Features

- App shell with providers and error boundary pre-wired
- Route registration isolated in `src/app/routes.tsx`
- Lazy-loaded pages with `Suspense` fallback
- Centralized API client with normalized error handling
- TanStack Query integration pattern through `src/hooks/*`
- Reusable UI primitives and utility-first styling setup
- React Hook Form + Zod defaults for forms
- Import alias support via `@/*`
- Example landing page and starter API/query hook flow

## Installation

### Prerequisites

- Node.js LTS
- `pnpm`

### Setup

```bash
pnpm install
```

## Usage Guide

### Start the development server

```bash
pnpm dev
```

Vite will start the local dev server with HMR enabled.

### Build for production

```bash
pnpm build
```

This runs:

```bash
tsc -b && vite build
```

### Preview the production build

```bash
pnpm preview
```

## Quality Checks

Run these before handing off code changes:

```bash
pnpm lint
pnpm type-check
pnpm build
```

Notes:

- there is currently no `pnpm test` script
- a test scaffold exists at `test/setup.ts`

## Environment Variables

The API client supports:

```bash
VITE_API_BASE_URL=
```

If `VITE_API_BASE_URL` is not set, requests fall back to `window.location.origin`.

## Project Structure

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

## Architecture Notes

- `src/app/*`: app shell, providers, query client, error boundary, route registration
- `src/pages/*`: route-level composition
- `src/components/features/*`: feature-level UI composition
- `src/components/ui/*`: reusable presentational primitives
- `src/hooks/*`: reusable hooks, including query hooks
- `src/lib/api/*`: endpoints, HTTP client, request helpers
- `src/lib/utils/*`: low-level shared utilities such as `cn()`
- `src/types/*`: shared contracts reused across layers

Preferred dependency direction:

`app -> pages -> components/features -> hooks -> lib -> types`

## Current Routes

- `/` -> `src/pages/index.tsx`
- `*` -> `src/pages/not-found.tsx`

Shell fallbacks:

- loading -> `src/pages/loading.tsx`
- render error -> `src/pages/error.tsx`

## API Pattern

Recommended data flow:

1. Define endpoints in `src/lib/api/endpoints.ts`
2. Add request functions in `src/lib/api/queries.ts`
3. Wrap requests in `src/hooks/*` with TanStack Query
4. Consume hooks inside feature components or pages

The low-level fetch wrapper lives in `src/lib/api/client.ts`.

## Documentation Map

Project-level documentation:

- `docs/rules.md`
- `docs/workflow.md`
- `docs/architecture.md`
- `docs/coding-standards.md`
- `docs/patterns.md`
- `docs/api.md`

If documentation conflicts with runtime, follow `src/main.tsx`, `src/app/App.tsx`, and `src/app/routes.tsx`.

## Contributing Notes

- Keep route declarations in `src/app/routes.tsx`
- Reuse `src/components/ui/*` before creating new primitives
- Do not call raw `fetch` from pages or feature components for domain data
- Use `.gitkeep` for placeholder directories instead of empty `.ts` or `.tsx` files

