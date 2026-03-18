# React Daily Lab

A route-based React + Tailwind handbook for the frontend requirements that keep showing up in normal product work.

Instead of one long demo page, every major topic now lives on its own route. That makes the app easier to grow, makes route splitting real instead of theoretical, and turns the repo into something you can revisit later when a task comes up again.

Last verified: March 18, 2026

## What this repo is for

This repo is not trying to be a universal starter.

It is trying to answer questions like:

- How should we handle SVGs in a React app?
- When is TanStack Query better than local state?
- How do we make optimistic UI safe instead of fake?
- When should we virtualize a list?
- How should we split routes and optional features?
- How do we debug bundle size, build slowness, and slow ESLint runs?

The goal is to keep both the app and the README practical:

- the app shows the pattern live
- the README explains why it helps
- the route map keeps growing without collapsing back into one giant screen

## Route map

The app currently ships these routes:

| Route                 | Topic                 | What it demonstrates                                                    |
| --------------------- | --------------------- | ----------------------------------------------------------------------- |
| `/`                   | Overview              | Totals, route directory, scripts, bookmarks, and next topics            |
| `/svg`                | SVG workflow          | Raw SVG files vs SVGR components, recoloring, resizing, and SVG cleanup |
| `/forms`              | Forms                 | React Hook Form + Zod, validation, and repeatable form ergonomics       |
| `/server-state`       | Server-state          | Cache ownership, freshness, refetching, and async boundaries            |
| `/optimistic-ui`      | Optimistic UI         | Mutations with rollback using TanStack Query                            |
| `/render-performance` | Render responsiveness | `useDeferredValue`, `startTransition`, and lazy initialization          |
| `/virtual-lists`      | Virtualized lists     | `@tanstack/react-virtual` with deferred search                          |
| `/route-splitting`    | Route splitting       | Lazy route modules, optional secondary chunks, and when to split        |
| `/tooling`            | Tooling playbook      | Bundle analysis, slow build fixes, and slow ESLint fixes                |

## Why the app moved to routes

The first version was a single page. That was okay for a small lab, but it stops scaling quickly:

- new topics make the page harder to scan
- the bundle grows even if a user only needs one topic
- documentation and UI structure start drifting apart

The routed version fixes that:

1. The overview route acts like a dashboard and directory.
2. Each topic can grow independently without squeezing the others.
3. Route-level code splitting becomes part of the actual architecture.
4. README sections can map directly to routes.

## Stack choices

### Core app

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 with `@tailwindcss/vite`
- React Router 7

### Daily-work libraries used in the lab

- `vite-plugin-svgr`
- `svgo`
- `@tanstack/react-query`
- `@tanstack/react-virtual`
- `react-hook-form`
- `zod`
- `@hookform/resolvers`
- `clsx`
- `tailwind-merge`
- `lucide-react`
- `vite-bundle-analyzer`

## Topic playbook

## 1. SVG workflow

### Better default

- Keep plain SVG files for static artwork or brand assets.
- Use SVGR for icons and illustrations that should react to state, theme, hover, or size.
- Run SVGO first so you do not ship unnecessary metadata and path noise.

### How this route helps

The `/svg` route shows both sides side-by-side:

- one SVG imported as a React component
- one SVG kept as a plain asset URL
- a simple recolor and resize control

That makes the tradeoff visible instead of abstract.

### How to recolor SVGs

If you want Tailwind or CSS to control color:

1. Replace hard-coded `fill="#..."` or `stroke="#..."` with `currentColor`
2. Import with SVGR
3. Control color through classes or inline CSS

Example:

```tsx
import FlaskIcon from "@/assets/icons/current-color-flask.svg?react";

<FlaskIcon className="size-6 text-emerald-400" />;
```

### How to resize SVGs

- Keep the `viewBox`
- Remove fixed dimensions if possible
- Control final size from CSS or Tailwind classes

### Useful tools

- [SVGOMG](https://jakearchibald.github.io/svgomg/)
- [SVGO docs](https://svgo.dev/docs/)
- [SVGR docs](https://react-svgr.com/docs/what-is-svgr/)
- [SVGR playground](https://react-svgr.com/playground/)

## 2. Forms and validation

### Better default

- `react-hook-form` for field wiring and narrow rerenders
- `zod` for one schema as the validation source of truth
- `@hookform/resolvers/zod` to connect both cleanly

### How this route helps

The `/forms` route keeps the example grounded in real form work:

- schema-backed validation
- dynamic fields
- less manual field state

This is the pattern most teams end up needing once forms move beyond a single input or two.

### Tradeoff to remember

`zod` is useful, but it is one of the larger optional runtime dependencies in this repo. If the form is tiny and bundle pressure is severe, a lighter validation path can be enough.

## 3. Server-state

### Better default

Use TanStack Query when data:

- comes from a server
- can become stale
- needs retries
- needs invalidation
- is shared by multiple components or routes

### How this route helps

The `/server-state` route makes one point very clearly:

local component state is not a cache.

If you find yourself rebuilding freshness windows, retry rules, invalidation, or background refetch behavior manually, a server-state library is usually the better solution.

### Key knobs to remember

- `queryKey`
- `staleTime`
- `gcTime`
- `invalidateQueries`
- `refetchOnWindowFocus`

## 4. Optimistic UI

### Better default

Use optimistic UI for fast-feeling mutations only when you also keep:

- a pre-mutation snapshot
- a rollback path
- invalidate-on-settle behavior

### How this route helps

The `/optimistic-ui` route demonstrates:

- optimistic create
- optimistic toggle
- rollback on forced failure
- a visible mutation log

This is the pattern that makes common actions like toggles, approvals, or short task creation feel much faster without lying to the user when the backend rejects the change.

### Common mistake

Updating the UI immediately without keeping the previous cache snapshot. That turns optimistic UI into fragile wishful thinking.

### Useful library

- [TanStack Query optimistic updates guide](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)

## 5. Render responsiveness

### Better default

- `useState(() => expensiveSetup())` for one-time heavy initialization
- `useDeferredValue` when typing should stay urgent while results catch up
- `startTransition` for non-urgent updates like large filters

### How this route helps

The `/render-performance` route is about choosing the right fix before reaching for memoization everywhere.

Many React slowdowns are really one of these problems:

- too much work during typing
- too much work during broad filter changes
- expensive setup repeating when it should not

### Popular tool worth knowing

Use React DevTools Profiler first. It is still the best first pass when you need to see what is rerendering and how long it takes.

Optional extra tools worth knowing:

- `why-did-you-render` when you specifically need rerender debugging in development

Use them as diagnostics, not permanent architecture.

## 6. Virtualized lists

### Better default

Virtualize only when the list is actually large enough to justify it.

### How this route helps

The `/virtual-lists` route combines two common needs:

- a large collection rendered through `@tanstack/react-virtual`
- deferred filtering so search input stays responsive

That mirrors real admin or back-office screens more closely than a tiny fake list does.

### When virtualization helps

- the collection is large
- rows are relatively consistent or measurable
- DOM cost is part of the slowdown
- only a small slice is visible at a time

### When not to use it

- the list is small
- the real bottleneck is fetching or filtering, not DOM size
- row height is too chaotic for the chosen virtualizer strategy

### Popular tools worth knowing

- [TanStack Virtual](https://tanstack.com/virtual)
- [react-window](https://github.com/bvaughn/react-window)

General guidance:

- TanStack Virtual is a stronger default when you need flexibility
- `react-window` is still useful for simpler fixed-size cases

## 7. Route splitting

### Better default

Split by route first.

That is usually the cleanest boundary because the user already expects navigation to involve a loading moment.

### How this route helps

The `/route-splitting` route shows two layers:

- route-level splitting for topic pages
- optional secondary chunk loading for a heavy sub-panel

This is the most common path for growing React apps:

1. split by route
2. measure
3. split optional heavy capabilities only where the gain is real

### Practical guidance

- Routes are the cheapest seam.
- Optional admin-only or analysis features are the next good seam.
- Do not split everything just because you can.

### React Router note

This lab uses declarative routes plus `React.lazy`, which is a solid default for this style of app.

If your app adopts React Router data or framework mode, the official docs also describe `route.lazy` as a strong route-module loading pattern.

Relevant reference:

- [React Router `createBrowserRouter` note on `route.lazy`](https://api.reactrouter.com/v7/functions/react-router.createBrowserRouter.html)

### Useful tools

- [React `lazy`](https://react.dev/reference/react/lazy)
- [bundlejs](https://bundlejs.com/)
- [Bundlephobia](https://bundlephobia.com/)

## 8. Tooling playbook

### Better default

Measure before you tune.

That applies to:

- bundle size
- slow builds
- slow lint

### Bundle analysis

Use this flow:

1. Estimate before install with `bundlejs` or Bundlephobia.
2. Build and analyze locally with `bun run build:analyze`.
3. Inspect the report before deciding the library is worth the cost.

The generated report lives at:

```text
dist/reports/bundle-report.html
```

### Current route-split snapshot

From the verified analyze build on March 18, 2026:

- shared app shell chunk: `dist/assets/index-ab328U5m.js` at `243.02 kB` parsed / `77.60 kB` gzip
- largest lazy route chunk: `dist/assets/FormsRoute-BRtVJQoN.js` at `94.22 kB` / `28.41 kB`
- `dist/assets/VirtualListsRoute-DRrroPmo.js` at `28.50 kB` / `9.19 kB`
- `dist/assets/OptimisticUiRoute-Bpn8wS4m.js` at `12.62 kB` / `4.41 kB`
- analyze build total: `37 chunks`, `676.48 kB` parsed, `329.52 kB` gzip

### How to read the report

- start with the largest parsed and gzip contributors
- separate framework/runtime cost from optional app-library cost
- look for route-specific features that can be lazy-loaded
- compare before and after adding a dependency

### Slow build checklist

- remove transforms you are not using
- keep route and feature modules smaller instead of one giant screen file
- avoid large dependencies without measuring them
- let Vite keep its dependency cache warm unless you truly changed the cached layer

### Slow ESLint checklist

- keep a cached fast lint command for everyday work
- keep typed lint as a second path or CI path
- ignore generated output like `dist` and `.cache`
- only keep expensive rules that are catching real bugs in your codebase

## Popular React requirements worth tracking next

This repo now covers more daily work than the first version, but the next highly practical additions would be:

1. URL search params for tables, filters, and tabs
2. Error boundaries and route-level recovery states
3. Responsive image loading and asset format decisions
4. Test strategy for components, hooks, async flows, and forms
5. Auth guards and permission-aware routing

Those topics come up often enough that they would make sense as future route modules too.

## Project structure

```text
src/
  app/
    App.tsx
    providers.tsx
    routes/
      FormsRoute.tsx
      OptimisticUiRoute.tsx
      OverviewRoute.tsx
      RenderPerformanceRoute.tsx
      RouteSplittingRoute.tsx
      ServerStateRoute.tsx
      SvgRoute.tsx
      ToolingRoute.tsx
      VirtualListsRoute.tsx
  assets/
    icons/
  components/
    layout/
      SectionShell.tsx
    navigation/
      SideRail.tsx
      TopicNavigator.tsx
    ui/
      Badge.tsx
      Button.tsx
      button-styles.ts
      Panel.tsx
  data/
    render-catalogue.ts
    site.ts
    topics.ts
    virtual-tasks.ts
  features/
    forms-lab/
    hero/
    optimistic-ui-lab/
      api/
    overview/
    render-lab/
    route-splitting-lab/
      components/
    server-state/
      api/
    svg-lab/
    tooling-lab/
    virtual-list-lab/
  lib/
    cn.ts
    format.ts
    wait.ts
  index.css
  main.tsx
```

## Scripts

```bash
bun run dev
bun run build
bun run build:analyze
bun run lint
bun run lint:typed
bun run lint:fix
bun run svg:optimize
```

### Script notes

- `bun run build:analyze` creates the bundle report
- `bun run lint` is the fast default path
- `bun run lint:typed` is the slower, deeper path
- `bun run svg:optimize` cleans exported SVGs before you convert them into components

## Sources and research links

These sources shaped the current route additions and recommendations in this README as of March 18, 2026:

- [React `lazy`](https://react.dev/reference/react/lazy)
- [React `useDeferredValue`](https://react.dev/reference/react/useDeferredValue)
- [React `startTransition`](https://react.dev/reference/react/startTransition)
- [React Router home](https://reactrouter.com/_docs//home)
- [React Router `createBrowserRouter` API note on lazy routes](https://api.reactrouter.com/v7/functions/react-router.createBrowserRouter.html)
- [TanStack Query important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
- [TanStack Query optimistic updates guide](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
- [TanStack Virtual](https://tanstack.com/virtual)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)
- [vite-plugin-svgr README](https://github.com/pd4d10/vite-plugin-svgr)
- [SVGR docs](https://react-svgr.com/docs/what-is-svgr/)
- [SVGO docs](https://svgo.dev/docs/)
- [vite-bundle-analyzer](https://github.com/nonzzz/vite-bundle-analyzer)
- [why-did-you-render](https://github.com/welldone-software/why-did-you-render)
- [SVGOMG](https://jakearchibald.github.io/svgomg/)
- [bundlejs](https://bundlejs.com/)
- [Bundlephobia](https://bundlephobia.com/)
- [react-window](https://github.com/bvaughn/react-window)
