import { Layers, MessageSquare, Sparkles } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import {
  ToastProvider,
  useToast,
} from "@/features/notifications-lab/context/ToastContext";
import { ToastContainer } from "@/features/notifications-lab/components/ToastContainer";

const designConcerns = [
  {
    title: "Portal rendering",
    detail:
      "Toasts render via createPortal to escape parent overflow and z-index stacking. This prevents clipping by modals or scrollable containers.",
  },
  {
    title: "Accessibility",
    detail:
      'The container uses role="status" and aria-live="polite" so screen readers announce new toasts without interrupting the user.',
  },
  {
    title: "Auto-dismiss timing",
    detail:
      "Each toast self-dismisses after a configurable delay (default 4s). Zero duration keeps it persistent until the user dismisses it.",
  },
  {
    title: "Queue limit",
    detail:
      "Cap the visible toast count (5 in this demo) to prevent screen overflow. Oldest toasts are removed when the limit is reached.",
  },
  {
    title: "Action support",
    detail:
      'Toasts can include an action button (e.g., "Undo") that runs a callback and auto-dismisses the toast.',
  },
] as const;

function NotificationsContent() {
  const { addToast, clearAll, toasts } = useToast();

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-6">
        <Panel className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="accent">Context + Portal</Badge>
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Toast playground
              </h3>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">
                Trigger different toast types and watch them stack,
                auto-dismiss, and support actions. All rendered via a portal
                outside the main DOM tree.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="mono-chip">createPortal</span>
              <span className="mono-chip">aria-live</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              onClick={() =>
                addToast({
                  type: "success",
                  message: "Changes saved successfully.",
                })
              }
            >
              ✅ Success toast
            </Button>
            <Button
              onClick={() =>
                addToast({
                  type: "error",
                  message: "Failed to update the record. Please try again.",
                })
              }
              variant="secondary"
            >
              ❌ Error toast
            </Button>
            <Button
              onClick={() =>
                addToast({
                  type: "warning",
                  message: "Your session expires in 5 minutes.",
                })
              }
              variant="secondary"
            >
              ⚠️ Warning toast
            </Button>
            <Button
              onClick={() =>
                addToast({
                  type: "info",
                  message: "A new version is available.",
                })
              }
              variant="secondary"
            >
              ℹ️ Info toast
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              onClick={() =>
                addToast({
                  type: "success",
                  message: "Item deleted.",
                  action: {
                    label: "Undo",
                    onClick: () => {
                      addToast({ type: "info", message: "Deletion undone." });
                    },
                  },
                })
              }
              variant="secondary"
            >
              🔄 Toast with undo action
            </Button>
            <Button
              onClick={() =>
                addToast({
                  type: "warning",
                  message: "This toast will stay until dismissed.",
                  duration: 0,
                })
              }
              variant="secondary"
            >
              📌 Persistent toast
            </Button>
            <Button
              disabled={toasts.length === 0}
              onClick={clearAll}
              variant="ghost"
            >
              Clear all
            </Button>
          </div>

          <div className="mt-5">
            <Badge variant="neutral">
              {toasts.length} active toast{toasts.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center gap-2 text-slate-900">
            <MessageSquare className="size-4" />
            <h3 className="font-display text-2xl font-semibold">
              How it works
            </h3>
          </div>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>
              <strong>1.</strong> ToastProvider wraps the app and manages the
              toast queue in state.
            </li>
            <li>
              <strong>2.</strong> useToast() gives any component access to
              addToast and removeToast.
            </li>
            <li>
              <strong>3.</strong> ToastContainer renders via createPortal at the
              document body level.
            </li>
            <li>
              <strong>4.</strong> Each toast self-removes after its duration via
              setTimeout with cleanup.
            </li>
          </ol>
        </Panel>
      </div>

      <div className="space-y-6">
        <Panel className="p-6">
          <div className="flex items-center gap-2 text-emerald-300">
            <Layers className="size-4" />
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Key design concerns
            </h3>
          </div>
          <div className="mt-5 space-y-4">
            {designConcerns.map((item) => (
              <div
                className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4"
                key={item.title}
              >
                <p className="text-sm font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center gap-2 text-amber-300">
            <Sparkles className="size-4" />
            <h3 className="font-display text-2xl font-semibold text-slate-950">
              Popular alternatives
            </h3>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>
              <strong>sonner</strong> — beautiful defaults, small bundle,
              Tailwind-friendly.
            </li>
            <li>
              <strong>react-hot-toast</strong> — minimal API, lightweight, easy
              to customize.
            </li>
            <li>
              <strong>radix-ui/toast</strong> — headless, fully accessible,
              composable.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Building your own first helps you understand the portal, timing, and
            accessibility concerns before adopting a library.
          </p>
        </Panel>
      </div>
    </div>
  );
}

export function NotificationsLab() {
  return (
    <ToastProvider>
      <SectionShell
        description="Every app needs to tell users when something succeeded, failed, or needs attention. This section builds a toast system from scratch using context and portals, covering accessibility, auto-dismiss, and action support."
        eyebrow="Foundations"
        id="notifications-lab"
        title="Build a toast notification system with portals, auto-dismiss, and accessible markup."
      >
        <NotificationsContent />
      </SectionShell>
      <ToastContainer />
    </ToastProvider>
  );
}
