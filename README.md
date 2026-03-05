# Reactjs Boilerplate

A frontend boilerplate built with React + TypeScript + Vite, including Tailwind CSS v4 and React Router.

## Stack & Packages

**Core**
- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`, `typescript`

**Styling**
- `tailwindcss` (v4) + `@tailwindcss/vite`
- `postcss`, `autoprefixer`
- className utilities: `clsx`, `tailwind-merge`
- animation utility: `tw-animate-css`

**Routing**
- `react-router-dom`

**UI**
- `shadcn/ui` config via `components.json` (component output: `src/components/ui`)
- `@radix-ui/react-slot` (Slot)
- `class-variance-authority` (variants)

**Animation & Icons**
- `framer-motion`
- `lucide-react`

**Lint**
- `eslint` + `typescript-eslint`
- `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

## Prerequisites

- Node.js (LTS recommended)
- `pnpm`

## Run

```bash
pnpm install
pnpm dev
```

Other commands:

```bash
pnpm type-check
pnpm build
pnpm preview
pnpm lint
```

## Folder Structure

Main project structure (condensed, based on this repository):

```text
.
├─ docs/
│  ├─ api.md
│  ├─ architecture.md
│  ├─ coding-standards.md
│  ├─ patterns.md
│  ├─ rules.md
│  └─ workflow.md
├─ providers/
│  └─ index.ts
├─ public/
│  ├─ fonts/
│  │  ├─ Satoshi-Variable.ttf
│  │  └─ Satoshi-VariableItalic.ttf
│  ├─ icons/
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ images/
│  │  └─ waifu.jpeg
│  └─ vite.svg
├─ src/
│  ├─ components/
│  │  ├─ common/
│  │  │  └─ index.ts
│  │  ├─ features/
│  │  │  └─ index.ts
│  │  ├─ layout/
│  │  │  └─ index.ts
│  │  └─ ui/
│  │     └─ button.tsx
│  ├─ config/
│  │  └─ index.ts
│  ├─ hooks/
│  │  ├─ auth/
│  │  └─ index.ts
│  ├─ lib/
│  │  ├─ api/
│  │  │  ├─ client.ts
│  │  │  ├─ endpoints.ts
│  │  │  ├─ index.ts
│  │  │  └─ queries.ts
│  │  ├─ auth/
│  │  │  └─ index.ts
│  │  ├─ helpers/
│  │  │  └─ index.ts
│  │  ├─ schemas/
│  │  │  └─ index.ts
│  │  └─ utils/
│  │     ├─ index.ts
│  │     └─ cn.ts
│  ├─ pages/
│  │  ├─ index.tsx
│  │  └─ not-found.tsx
│  ├─ store/
│  │  └─ index.ts
│  ├─ types/
│  │  ├─ api.ts
│  │  ├─ auth.ts
│  │  ├─ common.ts
│  │  └─ index.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css
│  └─ vite-env.d.ts
├─ test/
│  └─ setup.ts
├─ components.json
├─ eslint.config.js
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

### Quick Notes

- `src/main.tsx`: React entry point (mounts to `#root`) and imports global CSS.
- `src/App.tsx`: active routing setup (Home + 404) using `BrowserRouter`.
- `src/components/ui/*`: reusable UI components (for example: `Button`).
- `src/lib/utils/cn.ts`: `cn()` helper for merging Tailwind classes (`clsx` + `tailwind-merge`).
- `public/`: static assets (icons, fonts, images).

## Import Alias

The `@` alias points to the `src` directory (see `vite.config.ts`).  
For `shadcn/ui`, additional aliases are defined in `components.json` (for example `@/components`, `@/lib`, `@/hooks`).

```ts
import { Button } from '@/components/ui/button'
```

## Notes

Some folders/files are still scaffolded (partially or fully empty), such as `providers/index.ts` and several modules in `src/lib/*` and `src/types/*`. Adjust them based on your project needs.
