# API Documentation

## Purpose
Define a consistent API integration layer so transport details stay centralized and easy to change.

## Scope
This document applies to:
- `src/lib/api/*`
- `src/hooks/*` when those hooks consume API functions through TanStack Query
- shared API-related types when they exist in `src/types/*`

## Current Runtime Context
- This repository is a frontend boilerplate.
- The active API surface lives in `src/lib/api/*`.
- TanStack Query is the default server-state layer.
- `VITE_API_BASE_URL` is supported as an optional API base URL.
- UI code should not bypass the API layer with direct `fetch` calls for domain data.
- Shared API contracts currently live in `src/types/api.ts`.

Current implemented example surface:
- endpoint: `apiEndpoints.appStatus`
- request helper: `getAppStatus()`
- hook: `useAppStatus()`
- shared response type: `AppStatusResponse`
- status: available as an example integration path, but not yet consumed by the starter route UI

## API Module Contract
- `src/lib/api/endpoints.ts`
  - stores endpoint constants and path builders
  - no transport logic
- `src/lib/api/client.ts`
  - low-level HTTP wrapper
  - request defaults, JSON handling, error normalization
- `src/lib/api/queries.ts`
  - reusable request helpers and feature-facing API functions
- `src/lib/api/index.ts`
  - stable exports for consumers
- `src/types/api.ts`
  - shared API request and response contracts used across layers

## Endpoint Design Rules
- Centralize endpoint paths in `endpoints.ts`.
- Use explicit names by resource or feature.
- Use functions for dynamic paths.

Example:
```ts
export const apiEndpoints = {
  users: "/api/users",
  userById: (id: string) => `/api/users/${id}`,
} as const;
```

## Client Contract (`client.ts`)
- Accept typed request options (`method`, `headers`, `body`, `signal`, `query`).
- Default `Accept` to JSON.
- Serialize object bodies as JSON.
- Parse JSON responses safely.
- Normalize non-2xx responses to one error shape.
- Do not include UI behavior such as toasts or redirects.
- Current request option contract is `ApiRequestOptions`.

Current client behavior:
- Base URL resolution order is:
  1. `options.baseUrl`
  2. `import.meta.env.VITE_API_BASE_URL`
  3. `window.location.origin`
- Absolute `http` paths bypass base URL joining.
- Query values are appended through `URLSearchParams`, skipping `null` and `undefined`.
- `BodyInit` values are passed through unchanged.
- Plain object bodies are serialized as JSON and receive `Content-Type: application/json` when absent.
- Response parsing rules:
  - `204` -> `null`
  - `content-type` includes `application/json` -> `response.json()`
  - otherwise -> `response.text()`
- Error normalization rules:
  - throw `ApiError`
  - use `response.message` when the parsed payload exposes a string `message`
  - otherwise fall back to `Request failed with status <code>`

Suggested error shape:
```ts
export class ApiError extends Error {
  status: number
  data: unknown
}
```

## Query Function Contract (`queries.ts`)
- Add reusable request functions by business intent.
- Keep signatures typed and explicit.
- These functions should be framework-agnostic and reusable from hooks.
- Current shared example response contract is `AppStatusResponse`.

Current helper split:
- `getQuery<TResponse>()` is the generic GET wrapper.
- `postQuery<TResponse, TBody>()` is the generic POST wrapper.
- `getAppStatus()` is the only feature-facing query helper currently defined.

Example:
```ts
export function getAppStatus() {
  return getQuery<AppStatusResponse>(apiEndpoints.appStatus);
}
```

## TanStack Query Consumption Rules
- Build `useQuery` and `useMutation` wrappers in `src/hooks/*`.
- Query hooks should call request functions from `src/lib/api/*`.
- Keep query keys stable and explicit.
- Do not call raw `fetch` directly inside query hooks for domain requests.

## Request Lifecycle
1. Add or update endpoint builders in `endpoints.ts`.
2. Add request/response types near the owning feature or in `src/types/*` if shared.
3. Implement request functions in `queries.ts`.
4. Wrap them in `src/hooks/*` with TanStack Query when caching or request state is needed.
5. Export through `src/lib/api/index.ts` if the function is reusable.
6. Consume through a feature component or page composition layer.
7. Update this doc when the API structure or contract changes.

## Current Example Surface
- endpoint: `apiEndpoints.appStatus`
- request helper: `getAppStatus()`
- query hook: `useAppStatus()`
- shared response type: `AppStatusResponse`

Current shared type surface in `src/types/api.ts`:
- `QueryValue`
- `ApiRequestBody`
- `ApiRequestOptions`
- `AppStatusResponse`

## Security and Reliability
- Never log secrets, tokens, or sensitive payload values.
- Validate required payload before request.
- Handle non-2xx responses explicitly.
- Keep retries deterministic and opt-in.
- Use `AbortController` when request cancellation matters.

## Verification Checklist
- Endpoint constant or path builder exists in `endpoints.ts`.
- Request and response types are explicit where they matter.
- Query hook consumes a typed API function rather than raw `fetch`.
- Error path is tested manually for at least one non-2xx scenario.
- Docs are synchronized when the API contract or structure changed.
