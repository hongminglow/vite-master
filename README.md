# React Daily Lab

A route-based React + Tailwind handbook for the frontend requirements that keep showing up in normal product work.

Instead of one long demo page, every major topic now lives on its own route. That makes the app easier to grow, makes route splitting real instead of theoretical, and turns the repo into something you can revisit later when a task comes up again.

Last verified: March 21, 2026

## What this repo is for

This repo is not trying to be a universal starter.

It is trying to answer questions like:

- How should we handle SVGs in a React app?
- When is TanStack Query better than local state?
- How do we make optimistic UI safe instead of fake?
- When should we virtualize a list?
- How should we split routes and optional features?
- How do we debug bundle size, build slowness, and slow ESLint runs?
- Should filter state live in the URL or in useState?
- How do we keep one crash from killing the entire page?
- When should we debounce vs throttle vs use useDeferredValue?
- How should we guard routes by auth and role?
- How do we build a toast system with proper accessibility?
- When should we use the native dialog element instead of a library?
- How do we serve responsive images without layout shift?
- What does a practical test strategy look like for React + Vite?

The goal is to keep both the app and the README practical:

- the app shows the pattern live
- the README explains why it helps
- the route map keeps growing without collapsing back into one giant screen

## Route map

The app currently ships these routes:

| Route                 | Topic                 | What it demonstrates                                                        |
| --------------------- | --------------------- | --------------------------------------------------------------------------- |
| `/`                   | Overview              | Totals, route directory, scripts, bookmarks, and next topics                |
| `/svg`                | SVG workflow          | Raw SVG files vs SVGR components, recoloring, resizing, and SVG cleanup     |
| `/forms`              | Forms                 | React Hook Form + Zod, validation, and repeatable form ergonomics           |
| `/server-state`       | Server-state          | Cache ownership, freshness, refetching, and async boundaries                |
| `/optimistic-ui`      | Optimistic UI         | Mutations with rollback using TanStack Query                                |
| `/render-performance` | Render responsiveness | `useDeferredValue`, `startTransition`, and lazy initialization              |
| `/virtual-lists`      | Virtualized lists     | `@tanstack/react-virtual` with deferred search                              |
| `/route-splitting`    | Route splitting       | Lazy route modules, optional secondary chunks, and when to split            |
| `/tooling`            | Tooling playbook      | Bundle analysis, slow build fixes, and slow ESLint fixes                    |
| `/url-state`          | URL state             | Filters, pagination, and sorting backed by `useSearchParams` + Zod          |
| `/error-handling`     | Error handling        | Route-level and component-level error boundaries with retry and recovery    |
| `/input-timing`       | Input timing          | Live comparison of debounce, throttle, and `useDeferredValue`               |
| `/auth-routing`       | Auth routing          | Simulated login, role-gated UI, and redirect-after-login patterns           |
| `/notifications`      | Notifications         | Toast system built from scratch with portals, accessibility, and auto-dismiss |
| `/dialogs`            | Dialogs               | Native `<dialog>` for modals with focus trap, scroll lock, and forms        |
| `/media`              | Media                 | Responsive images, srcset, lazy loading, and layout shift prevention        |
| `/testing`            | Testing               | Testing trophy, Vitest + Testing Library example patterns, and MSW mocking  |

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

## 9. URL search params

### Better default

If a user should be able to share, bookmark, or navigate back to a filtered view, the state belongs in the URL.

### How this route helps

The `/url-state` route shows a filterable task table where every control — search, status, priority, sort, direction, pagination — writes directly to `useSearchParams`. The URL is always the source of truth.

- Parse and validate params with a Zod schema so invalid values get safe defaults
- Reset pagination when filters change
- Use `replace: true` so filter changes do not flood the history stack
- Copy the URL and paste it elsewhere to get the exact same view

### Common mistakes

- Duplicating URL state into `useState` — pick one source of truth.
- Forgetting to reset pagination when filters change.
- Using push navigation on every keystroke instead of replace.

## 10. Error boundaries and recovery

### Better default

Wrap routes and risky widgets in error boundaries so one crash never shows a white screen.

### How this route helps

The `/error-handling` route demonstrates:

- a **component-level boundary** that catches a widget crash without affecting the rest of the page
- a **route-level boundary** that replaces the entire route content with a retry fallback
- a clear explanation of when to use each level

### Key insight

Error boundaries catch rendering and lifecycle errors. They do not catch errors in event handlers or async code — use `try/catch` for those. TanStack Query's `throwOnError` option bridges async errors into the boundary system.

## 11. Debounce, throttle, and timing

### Better default

- Debounce for API calls and auto-save (fire once after input settles).
- Throttle for scroll, resize, and drag handlers (fire at regular intervals).
- `useDeferredValue` for expensive rendering that should not block typing.

### How this route helps

The `/input-timing` route shows a live comparison:

- type in the input and watch raw, debounced, and deferred values update at different times
- a color-coded event timeline shows exactly when each strategy fires
- side-by-side value display makes the delay visible

### When to use which

| Strategy | Use when | Watch out |
|---|---|---|
| Debounce | API search, auto-save | Adds perceived latency |
| Throttle | Scroll, resize, drag | Less responsive for typing |
| `useDeferredValue` | Expensive derived renders | React-only, does not prevent API calls |

## 12. Auth guards and permissions

### Better default

- Use a context-based auth provider with a role hierarchy.
- Gate UI sections with a `RoleGate` component instead of scattered `if (user.role === 'admin')` checks.
- Store the intended destination before redirecting to login.

### How this route helps

The `/auth-routing` route provides a simulated login with three roles (viewer, editor, admin). Switching roles instantly shows which UI sections become visible or hidden.

### Key patterns

- **ProtectedRoute** — wraps route content, redirects to login if unauthenticated.
- **RoleGate** — conditionally renders children based on user role.
- **Redirect-back** — stores the intended URL before redirecting to login.

### Important reminder

Client-side guards are for UX, not security. Always enforce permissions on the server.

## 13. Toast and notification patterns

### Better default

Build a toast system using context for state management and `createPortal` for rendering outside the main DOM tree.

### How this route helps

The `/notifications` route includes a full toast playground:

- four toast types: success, error, warning, info
- auto-dismiss with configurable duration
- a persistent toast option (duration = 0)
- action buttons inside toasts (e.g., "Undo")
- accessible markup with `role="status"` and `aria-live="polite"`

### Key design concerns

- **Portal rendering** — toasts escape parent overflow and z-index stacking.
- **Queue limit** — cap visible toasts (5 in this demo) to prevent overflow.
- **Accessibility** — screen readers announce new toasts without interrupting the user.

### Popular alternatives

- [sonner](https://sonner.emilkowal.dev/) — beautiful defaults, small bundle
- [react-hot-toast](https://react-hot-toast.com/) — minimal API, lightweight

## 14. Modal and dialog patterns

### Better default

Use the native `<dialog>` element. It provides focus trapping, Escape to close, scroll lock, and top-layer rendering with zero dependencies.

### How this route helps

The `/dialogs` route shows:

- a **confirmation dialog** for destructive actions
- a **form dialog** with auto-focused input and tab trapping
- the accessibility checklist that most teams miss

### What native dialog gives you for free

- Focus trap — built-in, no library needed
- Escape to close — fires a cancel event you can intercept
- Top layer — renders above everything, no z-index games
- Scroll lock — body scrolling is automatically blocked
- Backdrop — styleable via `::backdrop` pseudo-element

Browser support is excellent. For most product apps, you no longer need a dialog library.

## 15. Responsive images and media

### Better default

Serve the right image size and format. This is the single highest-impact performance optimization most frontend teams skip.

### How this route helps

The `/media` route covers:

- `srcset` and `sizes` for responsive resolution
- `<picture>` for format negotiation (WebP → JPEG fallback)
- `loading="lazy"` for below-the-fold images
- CSS `aspect-ratio` to prevent layout shift
- Core Web Vitals impact (LCP, CLS, INP)

### Useful tools

- [Squoosh](https://squoosh.app/) for manual image compression
- [sharp](https://sharp.pixelplumbing.com/) for build-time image processing
- `vite-plugin-image-optimizer` for automated optimization

## 16. Testing strategy

### Better default

Follow the testing trophy:

1. **Static analysis** (always on) — TypeScript + ESLint
2. **Unit tests** (some) — pure functions, schemas, and custom hooks
3. **Integration tests** (most) — components with real dependencies, asserted from the user's perspective
4. **E2E tests** (few) — critical user journeys only

### How this route helps

The `/testing` route documents:

- the testing trophy with recommended proportions
- working code examples for component, hook, API mock, and schema tests
- recommended libraries (Vitest, Testing Library, MSW)
- testing principles to follow

### Key principles

- Query by role and label, not by class name.
- Mock at the network layer (MSW), not at the fetch function.
- Use fake timers for debounce and animation tests.
- Test what the user sees and does, not implementation details.

### Useful tools

- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [MSW](https://mswjs.io/)

## Popular React requirements worth tracking next

This repo now covers the vast majority of daily frontend work. Future additions worth considering:

1. Drag-and-drop interactions with optimistic reorder
2. Infinite scroll with `useInfiniteQuery`
3. Multi-step form wizards with per-step validation
4. Dark mode toggle with CSS custom properties
5. Internationalization (i18n) patterns

Those topics come up less frequently but would round out the handbook further.

## Project structure

```text
src/
  app/
    App.tsx
    providers.tsx
    routes/
      AuthRoutingRoute.tsx
      DialogsRoute.tsx
      ErrorHandlingRoute.tsx
      FormsRoute.tsx
      InputTimingRoute.tsx
      MediaRoute.tsx
      NotificationsRoute.tsx
      OptimisticUiRoute.tsx
      OverviewRoute.tsx
      RenderPerformanceRoute.tsx
      RouteSplittingRoute.tsx
      ServerStateRoute.tsx
      SvgRoute.tsx
      TestingRoute.tsx
      ToolingRoute.tsx
      UrlStateRoute.tsx
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
    auth-routing-lab/
      context/
      components/
    dialogs-lab/
      components/
    error-handling-lab/
      components/
    forms-lab/
    hero/
    input-timing-lab/
      hooks/
      components/
    media-lab/
    notifications-lab/
      context/
      components/
    optimistic-ui-lab/
      api/
    overview/
    render-lab/
    route-splitting-lab/
      components/
    server-state/
      api/
    svg-lab/
    testing-lab/
    tooling-lab/
    url-state-lab/
      data/
      components/
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

These sources shaped the current route additions and recommendations in this README as of March 21, 2026:

- [React `lazy`](https://react.dev/reference/react/lazy)
- [React `useDeferredValue`](https://react.dev/reference/react/useDeferredValue)
- [React `startTransition`](https://react.dev/reference/react/startTransition)
- [React Router home](https://reactrouter.com/_docs//home)
- [React Router `createBrowserRouter` API note on lazy routes](https://api.reactrouter.com/v7/functions/react-router.createBrowserRouter.html)
- [React Router `useSearchParams`](https://reactrouter.com/hooks/use-search-params)
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
- [MDN `<dialog>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
- [MDN `srcset` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset)
- [MDN `loading` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#loading)
- [web.dev Core Web Vitals](https://web.dev/articles/vitals)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [MSW (Mock Service Worker)](https://mswjs.io/)
- [sonner](https://sonner.emilkowal.dev/)
- [react-hot-toast](https://react-hot-toast.com/)
