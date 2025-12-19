# Reactjs Boilerplate

Boilerplate frontend berbasis React + TypeScript + Vite, dengan Tailwind CSS v4 dan React Router.

## Stack & Paket

**Core**
- `react`, `react-dom`
- `vite`, `@vitejs/plugin-react`, `typescript`

**Styling**
- `tailwindcss` (v4) + `@tailwindcss/vite`
- `postcss`, `autoprefixer`
- Utils className: `clsx`, `tailwind-merge`
- Animasi util: `tw-animate-css`

**Routing**
- `react-router-dom`

**UI**
- `shadcn/ui` config via `components.json` (output komponen: `src/components/ui`)
- `@radix-ui/react-slot` (Slot)
- `class-variance-authority` (variants)

**Animasi & Icon**
- `framer-motion`
- `lucide-react`

**Lint**
- `eslint` + `typescript-eslint`
- `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

## Prasyarat

- Node.js (disarankan LTS)
- `pnpm`

## Menjalankan

```bash
pnpm install
pnpm dev
```

Perintah lain:

```bash
pnpm build
pnpm preview
pnpm lint
```

## Struktur Folder

Berikut struktur utama project (ringkas, sesuai repo ini):

```text
.
├─ docs/
│  └─ API.MD
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
│  │     └─ utils.ts
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
│  ├─ router.tsx
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

### Keterangan Singkat

- `src/main.tsx`: entry React (mount ke `#root`) dan import CSS global.
- `src/App.tsx`: routing utama (Home + 404) pakai `BrowserRouter`.
- `src/router.tsx`: alternatif konfigurasi router via `createBrowserRouter` (belum dipakai oleh `src/main.tsx`).
- `src/components/ui/*`: komponen UI reusable (contoh: `Button`).
- `src/lib/utils/utils.ts`: helper `cn()` untuk merge class Tailwind (`clsx` + `tailwind-merge`).
- `public/`: aset statis (ikon, font, gambar).

## Alias Import

Alias `@` mengarah ke folder `src` (lihat `vite.config.ts`). Untuk `shadcn/ui`, alias tambahan didefinisikan di `components.json` (mis. `@/components`, `@/lib`, `@/hooks`).

```ts
import { Button } from '@/components/ui/button'
```

## Catatan

Beberapa folder/file masih berupa kerangka (sebagian masih kosong) seperti `docs/API.MD`, `providers/index.ts`, serta beberapa modul di `src/lib/*` dan `src/types/*`—silakan disesuaikan dengan kebutuhan proyek.
