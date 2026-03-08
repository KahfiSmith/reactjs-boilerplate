# Pattern Guide

## Purpose
Provide reusable implementation recipes so feature delivery stays consistent and fast.

## Page -> Feature -> Hook -> API Pattern
Use this composition model:
1. Page handles route-level orchestration.
2. Feature handles use-case behavior and composition.
3. Hook handles cached async state with TanStack Query.
4. API helper handles transport and endpoint details.
5. UI primitive handles reusable presentation.

## Container + Presentation Pattern
- Container components: data fetching, state, handlers.
- Presentation components: typed props, rendering only.

## Large Component Decomposition Pattern
- If a page or widget becomes too large, break it into focused reusable pieces.
- Extract shared sub-sections into `src/components/features/*` or `src/components/ui/*` based on responsibility.
- Keep the page or parent component as orchestration.

Suggested decomposition flow:
1. Identify repeated or self-contained UI sections.
2. Extract those sections into child components with explicit props.
3. Move repeated visual-only patterns to `src/components/ui/*`.
4. Keep feature-specific composites in `src/components/features/*`.
5. Keep async state in hooks and transport in `src/lib/api/*`.

## `cn()` Class Merge Pattern
Use `cn()` for conditional class names:

```tsx
<div className={cn("p-4", isActive && "ring-2 ring-primary")} />
```

## TanStack Query Pattern
Use this flow for cached server-state:
1. Define endpoint constants in `src/lib/api/endpoints.ts`.
2. Implement request functions in `src/lib/api/queries.ts`.
3. Wrap them with `useQuery` or `useMutation` in `src/hooks/*`.
4. Consume those hooks in features or pages.

Example:
```ts
export function useAppStatus() {
  return useQuery({
    queryKey: ["app-status"],
    queryFn: getAppStatus,
  });
}
```

## React Hook Form + Zod Pattern
Use this flow for validated forms:
1. Define the schema with `zod`.
2. Infer the form type from the schema when useful.
3. Initialize `react-hook-form` in the feature or page that owns the form.
4. Keep submit handlers explicit and call API helpers or mutations from the container layer.
5. Surface user-friendly validation messages in the UI.

Example:
```ts
const schema = z.object({
  email: z.email(),
});
```

## Barrel Export Pattern
- Use `index.ts` to expose stable public module APIs.
- Do not create empty barrels for folders that have no public surface yet.

## Route Fallback Pattern
Keep a wildcard route for not-found handling:

```tsx
<Route path="*" element={<NotFoundPage />} />
```

## Async UI Pattern
For async data, handle:
- loading state
- empty state
- error state
before rendering success content.

Current example in this repo:
- `src/hooks/use-app-status.ts` defines the query wrapper
- `src/lib/api/queries.ts` defines `getAppStatus`
- `src/types/api.ts` owns `AppStatusResponse`

## Route Growth Pattern
When adding a new route:
1. Add the page in `src/pages`.
2. Register the route in `src/app/routes.tsx`.
3. Reuse feature, hook, and UI components where possible.
4. Keep the not-found fallback route intact.
