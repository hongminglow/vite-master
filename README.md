# React Daily Lab

A small React + Tailwind experiment lab for the frontend tasks that show up over and over again in real projects:

- SVG importing, recoloring, minifying, and resizing
- forms and schema validation
- server-state and caching
- rendering responsiveness
- bundle-size analysis
- slow build and slow ESLint workflows

This repo is intentionally opinionated. It is not trying to be a universal starter. It is trying to be a practical reference repo you can open later and say, "How did we handle this cleanly last time?"

Last verified: March 18, 2026

## What is inside

The app is a single-page lab with five focused sections:

1. SVG Lab
2. Forms Lab
3. Server State Lab
4. Render Performance Lab
5. Tooling Playbook

Each section shows one practical solution and explains when that solution is the better default.

## Stack choices

### Core app

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 with `@tailwindcss/vite`

### Practical daily-work libraries

- `vite-plugin-svgr` for importing SVGs as React components
- `svgo` for SVG minification
- `@tanstack/react-query` for server-state
- `react-hook-form` + `zod` + `@hookform/resolvers` for forms
- `clsx` + `tailwind-merge` for class composition
- `lucide-react` for consistent icons
- `vite-bundle-analyzer` for bundle reports

## Why these choices

### SVG workflow

- Keep plain SVG files when the asset is decorative or brand-locked.
- Use SVGR when the SVG should behave like UI and respond to state, theme, size, or hover.
- Run SVGO before importing SVGs so React is not forced to ship unnecessary path data and metadata.

### Forms

- `react-hook-form` keeps re-renders narrow and fast.
- `zod` keeps one schema as the source of truth.
- `useFieldArray` is a solid default for dynamic rows instead of hand-rolled array state.

### Server-state

- Local component state is not a cache.
- `@tanstack/react-query` is the better solution when data has freshness, retries, invalidation, or multiple consumers.

### Render performance

- Use lazy `useState(() => expensiveSetup())` when initialization is non-trivial.
- Use `useDeferredValue` when typing should stay responsive while derived results catch up.
- Use `startTransition` for non-urgent UI updates like big filter changes.

### Tooling

- Keep normal lint fast and cached.
- Keep typed lint available, but make it a second path.
- Analyze bundle size before and after installing libraries instead of guessing.

## Project structure

```text
src/
  app/
    App.tsx
    providers.tsx
  assets/
    icons/
      current-color-flask.svg
      package-stack.svg
  components/
    layout/
      SectionShell.tsx
    navigation/
      SideRail.tsx
    ui/
      Badge.tsx
      button-styles.ts
      Button.tsx
      Panel.tsx
  data/
    render-catalogue.ts
    site.ts
  features/
    forms-lab/
      RequestFormLab.tsx
    hero/
      HeroSection.tsx
    render-lab/
      RenderPerformanceLab.tsx
    server-state/
      api/
        tool-snapshot.ts
      ServerStateLab.tsx
    svg-lab/
      SvgLab.tsx
    tooling-lab/
      ToolingLab.tsx
  lib/
    cn.ts
    format.ts
    wait.ts
  index.css
  main.tsx
  vite-env.d.ts
```

### Supporting config

- `vite.config.ts`: Tailwind, SVGR, bundle analyzer, path alias
- `eslint.config.js`: fast cached lint
- `eslint.typed.config.js`: slower typed lint path
- `svgo.config.mjs`: local SVG optimization rules

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

- `bun run build:analyze` writes the treemap report to `dist/reports/bundle-report.html`
- `bun run build` clears `dist`, so run `build:analyze` again if you want the report back
- `bun run lint` is the fast default path
- `bun run lint:typed` is the deeper, slower path

## Current bundle snapshot

These numbers come from the verified analyzer run in this repo on March 18, 2026:

- Main JS bundle: `389.45 kB` parsed, `119.88 kB` gzip
- Main CSS bundle: `37.79 kB` parsed, `7.36 kB` gzip
- Total emitted chunks in analyze mode: `569.80 kB` parsed, `291.10 kB` gzip
- Analyzer report: `dist/reports/bundle-report.html`

### Largest JS contributors in this app

| Package or group | Parsed | Gzip | Notes |
| --- | ---: | ---: | --- |
| `react-dom` | 178.3 kB | 55.6 kB | Core runtime, expected |
| `zod/v4` | 56.0 kB | 17.8 kB | Biggest optional app library in this lab |
| `@tanstack/query` | 33.0 kB | 13.6 kB | Worth it when server-state is real |
| `react-hook-form` | 27.4 kB | 9.8 kB | Good tradeoff for serious forms |
| `tailwind-merge` | 26.3 kB | 8.2 kB | Useful, but only when class composition is real |
| `lucide-react` imported icons | 5.9 kB | 4.4 kB | Named imports tree-shake well |
| `clsx` | 0.36 kB | 0.23 kB | Tiny |

### Important bundle observations

- The biggest optional runtime cost in this repo is `zod`, not the icon set.
- Font strategy matters. This repo already limits Fontsource imports to Latin subsets to avoid shipping extra locale files.
- `tailwind-merge` is helpful, but it is not free. Keep it when variants are real; skip it for tiny apps.

### How to decide what is "too big"

Use this simple rule:

1. If a library removes repeated complexity across multiple screens, some size cost is worth it.
2. If a library solves a one-off problem, try a smaller local abstraction first.
3. If a library is both large and only used on one route, lazy-load that route or feature.

## The practical playbook

## 1. SVGs

### Better default

- Use plain SVG files for static art.
- Use SVGR for themeable UI SVGs.
- Use `currentColor` if you want Tailwind or CSS to control color.

### How to change SVG color

If an SVG should follow text or theme color:

1. Replace hard-coded `fill="#..."` or `stroke="#..."` with `currentColor`
2. Import it with SVGR:

```tsx
import Icon from '@/assets/icons/current-color-flask.svg?react'

<Icon className="size-6 text-amber-500" />
```

### How to resize SVGs

- Preserve the `viewBox`
- Remove fixed width and height where possible
- Control size from CSS or Tailwind classes like `size-6`, `size-10`, `w-8 h-8`

### How to compress and minify SVGs

Recommended flow:

1. Export from Figma or Illustrator
2. Test cleanup visually with SVGOMG
3. Run `bun run svg:optimize`
4. Promote to SVGR if it needs runtime control

Useful tools:

- [SVGOMG](https://jakearchibald.github.io/svgomg/)
- [SVGO docs](https://svgo.dev/docs/)
- [SVGR playground](https://react-svgr.com/playground/)

### When not to use SVGR

- Brand logos that should not be recolored
- Complex decorative artwork
- SVGs that are effectively image assets, not UI primitives

## 2. Forms

### Better default

- `react-hook-form` for wiring
- `zod` for schema
- `@hookform/resolvers/zod` to connect them

### Why

- Less manual state
- Better validation reuse
- Clear field-array handling
- Good ergonomics without over-abstracting

### Watch-out

`zod` is useful, but it is one of the larger optional runtime dependencies in this repo. If bundle pressure gets serious and the form is simple, a lighter validation strategy may be enough.

## 3. Server-state

### Better default

Use TanStack Query when the data:

- comes from a server
- can become stale
- needs caching
- needs retries or invalidation
- is shared by multiple screens or components

### Common mistake

Treating fetched data like plain local state and rebuilding freshness logic manually.

### Key knobs to remember

- `queryKey`
- `staleTime`
- `gcTime`
- `refetchOnWindowFocus`
- `invalidateQueries`

## 4. Render responsiveness

### Better default

- `useState(() => expensiveSetup())` for one-time expensive init
- `useDeferredValue` for heavy search/filter views
- `startTransition` for non-urgent updates

### Common mistake

Using memoization everywhere before checking whether the real problem is expensive derived work or too much state duplication.

### What to do next if it is still slow

- Virtualize large lists
- Measure the expensive branch
- Avoid broad rerender surfaces

## 5. Bundle analysis

### Better default

1. Estimate before install
2. Analyze after build
3. Decide whether the tradeoff is justified

### Useful tools

- [bundlejs](https://bundlejs.com/)
- [Bundlephobia](https://bundlephobia.com/)
- local analyzer report at `dist/reports/bundle-report.html`

### How to read the final report

- Start with the biggest parsed and gzip nodes
- Look for heavy packages in `node_modules`
- Separate framework cost from optional app-library cost
- Check whether a heavy library is global or route-specific

## 6. Slow build troubleshooting

These are the most useful fixes for normal React apps:

- Remove build transforms you are not actively using
- Avoid installing large libraries without bundle checks
- Keep feature code split by domain instead of one giant screen file
- Let Vite keep its dependency cache unless you actually changed the thing it cached
- Use the analyzer before reaching for random config tweaks

### Notes for this repo

- I removed the extra React Compiler/Babel layer from the starter template because it was not necessary for this lab and it adds cost to the toolchain.
- I also switched Fontsource imports to Latin-only subsets because broad font subsets were inflating the emitted asset list for no practical gain in this demo.

## 7. Slow ESLint troubleshooting

### Better default

Use two paths:

- Fast path: cached lint for everyday iteration
- Deep path: typed lint for stronger checks

### Why this works

Typed linting is valuable, but it is naturally more expensive because it needs TypeScript program information.

### What this repo does

- `eslint.config.js`: fast default path
- `eslint.typed.config.js`: typed path using `projectService`
- cache directories under `.cache/`

## Common React topics worth paying attention to

This is an inference from the official docs, package docs, and active tool READMEs reviewed for this repo on March 18, 2026:

1. SVG handling is still more manual than people expect.
2. Server-state vs local state is still a common architecture mistake.
3. Validation and dynamic forms are still a frequent source of noisy code.
4. Slow lint and slow build feedback loops are a real productivity problem.
5. Bundle size is still best managed before a dependency lands, not after.

That is why this lab focuses on those five areas instead of trying to cover every React pattern.

## Sources and research links

These links shaped both the app setup and the recommendations in this README:

- [React `useDeferredValue`](https://react.dev/reference/react/useDeferredValue)
- [React `startTransition`](https://react.dev/reference/react/startTransition)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)
- [TanStack Query important defaults](https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults)
- [ESLint CLI caching](https://eslint.org/docs/latest/use/command-line-interface#caching)
- [typescript-eslint project service](https://typescript-eslint.io/packages/project-service/)
- [vite-plugin-svgr README](https://github.com/pd4d10/vite-plugin-svgr)
- [SVGR docs](https://react-svgr.com/docs/what-is-svgr/)
- [SVGR options](https://react-svgr.com/docs/options/)
- [SVGO docs](https://svgo.dev/docs/)
- [vite-bundle-analyzer](https://github.com/nonzzz/vite-bundle-analyzer)
- [SVGOMG](https://jakearchibald.github.io/svgomg/)
- [bundlejs](https://bundlejs.com/)
- [Bundlephobia](https://bundlephobia.com/)

## Recommended next experiments

If you want to push this lab further, the next useful additions would be:

1. Route-level code splitting and lazy loading
2. Virtualized tables or long lists
3. Mutation examples with optimistic updates
4. Image optimization and responsive asset loading
5. Test strategy examples for components, hooks, and forms
