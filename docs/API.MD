# API Documentation

## Purpose
Define a consistent API integration layer for this frontend so transport details are centralized, typed, and easy to change.

## Scope
This document applies to:
- `src/lib/api/*`
- `src/types/api.ts`
- UI modules that consume API functions through hooks/features/pages

## Current Runtime Context
- This repository is a frontend boilerplate.
- API modules are scaffolded and should be implemented using the rules below.
- Even for simple calls, do not bypass the API layer from UI code.

## API Module Contract
- `src/lib/api/endpoints.ts`
  - stores endpoint constants and path builders
  - no transport logic
- `src/lib/api/client.ts`
  - low-level HTTP wrapper (`fetch`)
  - request defaults, header handling, error normalization
- `src/lib/api/queries.ts`
  - typed domain request functions calling `client.ts`
  - maps request input and response output
- `src/lib/api/index.ts`
  - stable exports for consumers
- `src/types/api.ts`
  - request and response contracts

## Endpoint Design Rules
- Centralize endpoint paths in `endpoints.ts`.
- Use uppercase constants for fixed paths and functions for dynamic paths.
- Keep endpoint naming explicit by resource.

Example:
```ts
export const API_ENDPOINTS = {
  authLogin: "/api/auth/login",
  users: "/api/users",
  userById: (id: string) => `/api/users/${id}`,
} as const
```

## Client Contract (`client.ts`)
- Accept typed request options (`method`, `headers`, `body`, `signal`).
- Default `Content-Type` to JSON for JSON payloads.
- Parse JSON responses safely.
- Normalize non-2xx responses to one error shape.
- Do not include UI behavior (toast, redirect, modal) in client layer.

Suggested error shape:
```ts
export type ApiError = {
  message: string
  status?: number
  code?: string
  details?: unknown
}
```

## Query Function Contract (`queries.ts`)
- One function per business intent (`login`, `getProfile`, `updateProfile`).
- Function signature should be fully typed.
- Query function should only:
  - call endpoint
  - pass request payload
  - return typed data
  - throw normalized errors

Example:
```ts
export async function getUserById(id: string): Promise<UserResponse> {
  return apiClient.get<UserResponse>(API_ENDPOINTS.userById(id))
}
```

## UI Consumption Rules
- UI components/pages should consume API through hooks/features (not direct fetch).
- Keep loading/error/empty/success states in UI layer, not in API layer.
- For reusable flows, create hooks in `src/hooks/*` that wrap query functions.

## Request Lifecycle (Required)
1. Add/update endpoint in `endpoints.ts`.
2. Add/update request and response types in `src/types/api.ts`.
3. Implement query in `queries.ts`.
4. Export in `src/lib/api/index.ts`.
5. Consume through hook/feature/page.
6. Update this doc when contract changes.

## Security and Reliability
- Never log secrets, tokens, or sensitive payload values.
- Validate required payload before request.
- Handle non-2xx responses explicitly.
- Keep retries deterministic and opt-in.
- Use `AbortController` for cancellable UI requests when relevant.

## Backward Compatibility
- Preserve existing response shapes when possible.
- Prefer additive optional fields over destructive changes.
- If a breaking change is necessary, document impact and migration path.

## Verification Checklist
- Endpoint constant exists in `endpoints.ts`.
- Request and response types are explicit and exported.
- No `fetch` call added directly in UI/page file.
- Error path is tested manually (at least one non-2xx scenario).
- Docs are synchronized when contract changed.
