import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Home } from 'lucide-react'
import { Link } from 'react-router'

import { Panel } from '@/components/ui/Panel'
import { contentTopics } from '@/data/topics'
import { cn } from '@/lib/cn'

type TopicNavigatorProps = {
  currentPath: string
}

type TopicPageProps = TopicNavigatorProps & {
  children: ReactNode
}

export function TopicPage({ currentPath, children }: TopicPageProps) {
  return (
    <div className="space-y-4">
      {children}
      <TopicNavigator currentPath={currentPath} />
    </div>
  )
}

export function TopicNavigator({ currentPath }: TopicNavigatorProps) {
  const currentIndex = contentTopics.findIndex((topic) => topic.path === currentPath)

  if (currentIndex === -1) {
    return null
  }

  const previousTopic = contentTopics[currentIndex - 1]
  const nextTopic = contentTopics[currentIndex + 1]

  return (
    <Panel className="p-5 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="section-kicker">Next stops</p>
          <h2 className="mt-4 font-display text-2xl font-semibold text-slate-950">
            Keep the handbook connected
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Most teams hit these problems in clusters, not in isolation. Jump to
            the adjacent topic or head back to the overview to compare the full
            route map.
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-slate-700/90 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-100 transition-colors duration-200 hover:bg-slate-800"
          to="/"
        >
          <Home className="size-4" />
          Back to overview
        </Link>
      </div>

      <div className={cn('mt-5 grid gap-3', previousTopic && nextTopic ? 'md:grid-cols-2' : '')}>
        {previousTopic ? (
          <Link
            className="group rounded-[24px] border border-slate-700/90 bg-slate-900/72 px-4 py-4 transition-colors duration-200 hover:bg-slate-800"
            to={previousTopic.path}
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              Previous topic
            </div>
            <p className="mt-3 font-display text-xl font-semibold text-slate-950">
              {previousTopic.navLabel}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {previousTopic.detail}
            </p>
          </Link>
        ) : null}

        {nextTopic ? (
          <Link
            className="group rounded-[24px] border border-emerald-500/28 bg-emerald-500/10 px-4 py-4 transition-colors duration-200 hover:bg-emerald-500/14"
            to={nextTopic.path}
          >
            <div className="flex items-center justify-between gap-2 text-sm font-medium text-emerald-600">
              <span>Next topic</span>
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </div>
            <p className="mt-3 font-display text-xl font-semibold text-slate-950">
              {nextTopic.navLabel}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {nextTopic.detail}
            </p>
          </Link>
        ) : null}
      </div>
    </Panel>
  )
}
