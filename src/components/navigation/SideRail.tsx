import { ChevronRight, ShieldCheck, Zap } from "lucide-react";
import { NavLink } from "react-router";

import { Badge } from "@/components/ui/Badge";
import { Panel } from "@/components/ui/Panel";
import { type LabTopic } from "@/data/topics";
import { cn } from "@/lib/cn";

type SideRailProps = {
  topics: LabTopic[];
};

export function SideRail({ topics }: SideRailProps) {
  return (
    <aside className="space-y-4">
      <Panel className="p-5">
        <nav aria-label="Topic navigation" className="space-y-2">
          {topics.map((topic) => (
            <NavLink
              className={({ isActive }) =>
                cn(
                  "group flex items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-200",
                  isActive
                    ? "border-emerald-500/30 bg-emerald-500/12"
                    : "border-slate-700/90 bg-slate-900/75 hover:bg-slate-800/90",
                )
              }
              end={topic.path === "/"}
              key={topic.path}
              to={topic.path}
            >
              {({ isActive }) => (
                <>
                  <div>
                    <div
                      className={cn(
                        "text-sm font-medium",
                        isActive ? "text-emerald-200" : "text-slate-950",
                      )}
                    >
                      {topic.navLabel}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {topic.detail}
                    </div>
                  </div>
                  <ChevronRight
                    className={cn(
                      "size-4 transition-transform duration-200",
                      isActive
                        ? "text-emerald-300"
                        : "text-slate-400 group-hover:translate-x-0.5",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </Panel>

      <Panel className="border-emerald-500/30 bg-emerald-500/10 p-5">
        <div className="flex items-center gap-2 text-emerald-600">
          <ShieldCheck className="size-4" />
          <p className="text-sm font-semibold">Research-backed defaults</p>
        </div>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-emerald-100">
          <li>Split by route before reaching for more exotic bundle tricks.</li>
          <li>Virtualize only when real list size and row cost justify it.</li>
          <li>Optimistic UI should always keep a rollback path close by.</li>
        </ul>
      </Panel>

      <Panel className="bg-slate-950/95 p-5 text-slate-50">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-amber-300" />
          <p className="text-sm font-semibold">Baseline stack</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge
            className="border-white/15 bg-white/10 text-white"
            variant="dark"
          >
            React 19
          </Badge>
          <Badge
            className="border-white/15 bg-white/10 text-white"
            variant="dark"
          >
            React Router 7
          </Badge>
          <Badge
            className="border-white/15 bg-white/10 text-white"
            variant="dark"
          >
            Tailwind 4
          </Badge>
          <Badge
            className="border-white/15 bg-white/10 text-white"
            variant="dark"
          >
            TanStack tools
          </Badge>
        </div>
      </Panel>
    </aside>
  );
}
