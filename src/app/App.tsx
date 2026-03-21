import { lazy, Suspense, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

import { SideRail } from "@/components/navigation/SideRail";
import { Panel } from "@/components/ui/Panel";
import { contentTopics, labTopics } from "@/data/topics";

const routeModules = [
  {
    path: "/",
    Component: lazy(() => import("@/app/routes/OverviewRoute")),
  },
  {
    path: "/svg",
    Component: lazy(() => import("@/app/routes/SvgRoute")),
  },
  {
    path: "/forms",
    Component: lazy(() => import("@/app/routes/FormsRoute")),
  },
  {
    path: "/server-state",
    Component: lazy(() => import("@/app/routes/ServerStateRoute")),
  },
  {
    path: "/optimistic-ui",
    Component: lazy(() => import("@/app/routes/OptimisticUiRoute")),
  },
  {
    path: "/render-performance",
    Component: lazy(() => import("@/app/routes/RenderPerformanceRoute")),
  },
  {
    path: "/virtual-lists",
    Component: lazy(() => import("@/app/routes/VirtualListsRoute")),
  },
  {
    path: "/route-splitting",
    Component: lazy(() => import("@/app/routes/RouteSplittingRoute")),
  },
  {
    path: "/tooling",
    Component: lazy(() => import("@/app/routes/ToolingRoute")),
  },
  {
    path: "/url-state",
    Component: lazy(() => import("@/app/routes/UrlStateRoute")),
  },
  {
    path: "/error-handling",
    Component: lazy(() => import("@/app/routes/ErrorHandlingRoute")),
  },
  {
    path: "/input-timing",
    Component: lazy(() => import("@/app/routes/InputTimingRoute")),
  },
  {
    path: "/auth-routing",
    Component: lazy(() => import("@/app/routes/AuthRoutingRoute")),
  },
  {
    path: "/notifications",
    Component: lazy(() => import("@/app/routes/NotificationsRoute")),
  },
  {
    path: "/dialogs",
    Component: lazy(() => import("@/app/routes/DialogsRoute")),
  },
  {
    path: "/media",
    Component: lazy(() => import("@/app/routes/MediaRoute")),
  },
  {
    path: "/testing",
    Component: lazy(() => import("@/app/routes/TestingRoute")),
  },
] as const;

export default function App() {
  return (
    <BrowserRouter>
      <AppFrame />
    </BrowserRouter>
  );
}

function AppFrame() {
  const location = useLocation();
  const sidebarScrollRef = useRef<HTMLDivElement | null>(null);
  const contentScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    contentScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return (
    <div className="lab-shell relative min-h-screen xl:h-screen xl:overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_58%)]"
      />

      <main className="mx-auto flex min-h-screen w-full max-w-[1720px] flex-col px-3 py-3 sm:px-4 lg:px-5 xl:h-screen">
        <header className="panel flex shrink-0 flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-6">
          <div className="space-y-3">
            <Link className="section-kicker" to="/">
              React Daily Lab
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="mono-chip">
              {contentTopics.length} topic routes
            </span>
          </div>
        </header>

        <div className="mt-4 grid gap-4 xl:min-h-0 xl:flex-1 xl:grid-cols-[320px_minmax(0,1fr)]">
          <div
            className="xl:lab-scroll xl:min-h-0 xl:overflow-y-auto xl:pr-1"
            ref={sidebarScrollRef}
          >
            <SideRail topics={labTopics} />
          </div>

          <div
            className="space-y-4 xl:lab-scroll xl:min-h-0 xl:overflow-y-auto xl:pr-1"
            ref={contentScrollRef}
          >
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {routeModules.map(({ path, Component }) => (
                  <Route element={<Component />} key={path} path={path} />
                ))}
                <Route element={<Navigate replace to="/" />} path="*" />
              </Routes>
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}

function RouteFallback() {
  return (
    <Panel className="p-6">
      <div className="space-y-4">
        <div className="h-4 w-32 rounded-full bg-slate-800/90" />
        <div className="h-10 w-3/4 rounded-[20px] bg-slate-900/80" />
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-48 rounded-[24px] border border-dashed border-slate-800/90 bg-slate-900/72" />
          <div className="h-48 rounded-[24px] border border-dashed border-slate-800/90 bg-slate-900/72" />
        </div>
      </div>
    </Panel>
  );
}
