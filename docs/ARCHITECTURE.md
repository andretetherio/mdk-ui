# MDK — Architecture

**Audience**: Engineering Team

---

## What is MDK

MDK (Mining Development Kit) is a reusable UI toolkit for building mining dashboard applications. This repo (`m-sdk-ui-dev-kit`) is its frontend part — a pnpm monorepo of UI packages that consuming applications import as dependencies.

---

## Two-Layer Package Model

The entire library is split into two packages:

```
@mining-sdk/core
    ↓ (workspace:*)
@mining-sdk/foundation
```

**`@mining-sdk/core`** — generic, domain-agnostic UI layer.
- ~50 components built on Radix UI primitives, styled with SCSS
- Chart components (Chart.js, lightweight-charts)
- Data table (TanStack Table)
- Form system (React Hook Form + Zod)
- Design tokens, shared utilities, and constants

**`@mining-sdk/foundation`** — mining domain layer, depends on `core`.
- Domain-specific React components (DeviceExplorer, ActiveIncidentsCard, etc.)
- Custom hooks (permissions, notifications, pagination, chart checks)
- Redux Toolkit state — two slices: `auth` and `notification`
- Domain constants, types, and utilities
- API barrel export (endpoint definitions live in consuming apps)
- Test utilities co-located (not a separate package)

A third package, **`@mining-sdk/fonts`**, ships JetBrains Mono font assets independently.

---

## Monorepo Structure

```
m-sdk-ui-dev-kit/
├── packages/
│   ├── core/         # @mining-sdk/core
│   ├── foundation/   # @mining-sdk/foundation
│   └── fonts/        # @mining-sdk/fonts
├── apps/
│   └── demo/         # Interactive component showcase (not published)
└── docs/
```

**Tooling:**
- **pnpm** workspaces with a version catalog (single source of truth for all dep versions)
- **Turborepo** for task orchestration and caching
- **TypeScript** strict mode across all packages; shared `tsconfig.base.json`
- **ESLint** flat config via `@antfu/eslint-config`

---

## Build Strategy

`@mining-sdk/core` is **fully built** before use — tsc emits JS + declarations, Vite compiles SCSS to CSS, Terser minifies.

`@mining-sdk/foundation` exports **TypeScript source directly** — consuming packages (including the demo) compile it themselves. Vite only builds its CSS. This gives instant feedback in development without a build step.

`@mining-sdk/fonts` is a single Vite build producing a CSS file with font-face declarations.

---

## Technology Stack

| Concern | Choice |
|---|---|
| UI primitives | Radix UI (full suite) |
| Styling | SCSS — no CSS-in-JS, no Tailwind |
| Forms | React Hook Form + Zod (peer deps of `core`) |
| State | Redux Toolkit + react-redux (peer deps of `foundation`) |
| Charts | Chart.js, lightweight-charts |
| Table | TanStack Table |
| Testing | Vitest + React Testing Library |
| Build | Vite + tsc |
| Monorepo | Turborepo + pnpm |

---

## CI Pipeline

Five GitHub Actions jobs: `security` → parallel (`quality`, `test`, `build`) → `summary`.

- **security**: pnpm audit
- **quality**: lint + typecheck + format check
- **test**: Vitest with coverage (core: 80%, foundation: 94%)
- **build**: full `turbo build`
