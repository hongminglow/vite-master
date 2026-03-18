import { ArrowRight, Boxes, PackageSearch, Zap } from "lucide-react";

import { buttonStyles } from "@/components/ui/button-styles";
import { Panel } from "@/components/ui/Panel";
import { heroCapabilities, heroMetrics } from "@/data/site";

export function HeroSection() {
  return (
    <section className="panel overflow-hidden" id="overview">
      <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.88fr] lg:p-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <span className="section-kicker">React Daily Lab</span>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                A practical React + Tailwind lab for the frontend tasks that
                keep showing up in real projects.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Instead of another starter template, this repo is structured as
                a small experiment lab. Each section demonstrates a recurring
                React problem, shows a solid default solution, and points you to
                the tools that make the workflow easier to repeat.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a className={buttonStyles("primary")} href="#svg-lab">
              Explore the labs
              <ArrowRight className="size-4" />
            </a>
            <a className={buttonStyles("secondary")} href="#tooling-lab">
              Jump to build and lint tips
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "Tailwind 4",
              "TanStack Query",
              "React Hook Form + Zod",
              "SVGR + SVGO",
              "Bundle analyzer",
            ].map((label) => (
              <span className="mono-chip" key={label}>
                {label}
              </span>
            ))}
          </div>
        </div>

        <Panel className="soft-grid border-slate-200/80 bg-slate-950 px-6 py-6 text-slate-50">
          <div className="flex items-center gap-3 text-amber-300">
            <Boxes className="size-5" />
            <p className="text-sm font-semibold uppercase tracking-[0.22em]">
              What this lab optimizes for
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {heroCapabilities.map((capability, index) => {
              const Icon = index % 2 === 0 ? PackageSearch : Zap;

              return (
                <div
                  className="rounded-3xl border border-white/10 bg-white/10 px-4 py-4"
                  key={capability.title}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-2">
                      <Icon className="size-4 text-amber-300" />
                    </div>
                    <h2 className="font-display text-lg font-semibold text-white">
                      {capability.title}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {capability.summary}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
              Start here
            </p>
            <div className="mt-3 space-y-2 font-mono text-sm text-white">
              <div>bun run dev</div>
              <div>bun run build:analyze</div>
              <div>bun run svg:optimize</div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 border-t border-slate-200/80 px-6 py-6 sm:grid-cols-3 lg:px-8">
        {heroMetrics.map((metric) => (
          <div
            className="rounded-3xl border border-slate-200/80 bg-slate-50/80 px-5 py-4"
            key={metric.value}
          >
            <div className="font-display text-2xl font-semibold text-slate-950">
              {metric.value}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
