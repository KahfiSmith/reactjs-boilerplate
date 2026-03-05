# Pattern Guide

## Purpose
Provide reusable implementation recipes so feature delivery stays consistent and fast.

## Page -> Feature -> UI Pattern
Use this composition model:
1. Page handles route-level orchestration.
2. Feature handles domain-specific behavior.
3. UI primitive handles visual/presentational concerns.

## Container + Presentation Pattern
- Container components: data fetching, state, handlers.
- Presentation components: typed props, rendering only.

## Large Component Decomposition Pattern
- If a component or widget becomes too large, break it into focused reusable pieces.
- Extract shared sub-sections into `src/components/features/*` or `src/components/ui/*` based on responsibility.
- Keep parent component as orchestration and pass typed props to child components.

Suggested decomposition flow:
1. Identify repeated or self-contained UI sections.
2. Extract those sections into child components with explicit props.
3. Move repeated visual-only patterns to `src/components/ui/*`.
4. Keep feature-specific composites in `src/components/features/*`.
5. Keep side effects and orchestration in parent or dedicated hooks.

## Tailwind Variant Pattern
For reusable primitives, prefer variants via `cva`.

```ts
const badgeVariants = cva("inline-flex rounded px-2 py-1 text-xs", {
  variants: {
    tone: {
      neutral: "bg-muted text-foreground",
      success: "bg-green-600 text-white",
    },
  },
  defaultVariants: { tone: "neutral" },
})
```

## `cn()` Class Merge Pattern
Use `cn()` for conditional class names:

```tsx
<div className={cn("p-4", isActive && "ring-2 ring-primary")} />
```

## API Integration Pattern (UI -> Hook -> API)
Use this flow for data-driven UI:
1. UI triggers action.
2. Hook orchestrates async state (`loading`, `error`, `data`).
3. Hook calls typed function from `src/lib/api/queries.ts`.
4. API layer handles transport and error normalization.

Minimal hook shape:
```ts
type AsyncState<T> = {
  isLoading: boolean
  data: T | null
  error: string | null
}
```

## Barrel Export Pattern
- Use `index.ts` to expose stable public module APIs.
- Do not re-export private helpers unless needed externally.

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

## Form Submission Pattern
For form flows:
1. Validate client-side required fields before request.
2. Disable submit while request is pending.
3. Show clear error message on failure.
4. Reset or preserve form state intentionally after success/failure.

## Route Growth Pattern
When adding a new route:
1. Add page in `src/pages`.
2. Register route in active router (`src/App.tsx`).
3. Reuse feature and UI components where possible.
4. Keep not-found fallback route intact.
