import { Image, MonitorSmartphone, Ruler, Zap } from 'lucide-react'

import { SectionShell } from '@/components/layout/SectionShell'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'

const mediaStrategies = [
  {
    title: 'Use srcset for responsive resolution',
    code: '<img srcset="hero-400.webp 400w, hero-800.webp 800w" sizes="(max-width: 640px) 400px, 800px" />',
    detail: 'The browser picks the best resolution for the viewport. Mobile gets 400w, desktop gets 800w — no wasted bandwidth.',
  },
  {
    title: 'Use <picture> for format negotiation',
    code: '<picture><source type="image/webp" srcSet="hero.webp" /><img src="hero.jpg" /></picture>',
    detail: 'Serve WebP or AVIF to browsers that support them, with JPEG as a fallback. Same visual quality at 30–50% smaller file size.',
  },
  {
    title: 'Use loading="lazy" for below-fold images',
    code: '<img loading="lazy" src="gallery-item.webp" />',
    detail: 'Native lazy loading defers image requests until the element enters the viewport. No library needed.',
  },
  {
    title: 'Use aspect-ratio to prevent layout shift',
    code: '.hero-img { aspect-ratio: 16 / 9; object-fit: cover; }',
    detail: 'Reserving space before the image loads prevents CLS (Cumulative Layout Shift), which directly impacts Core Web Vitals.',
  },
] as const

const webVitalsImpact = [
  {
    metric: 'LCP',
    label: 'Largest Contentful Paint',
    detail: 'Hero and banner images are usually the LCP element. Serve the right size and format to reduce load time.',
    tip: 'Preload the hero image with <link rel="preload"> and use fetchpriority="high".',
  },
  {
    metric: 'CLS',
    label: 'Cumulative Layout Shift',
    detail: 'Images without dimensions cause the page to jump when they load. Use width/height attributes or CSS aspect-ratio.',
    tip: 'Always set explicit dimensions or use aspect-ratio on image containers.',
  },
  {
    metric: 'INP',
    label: 'Interaction to Next Paint',
    detail: 'Large unoptimized images on the page can block the main thread during decode, delaying interactions.',
    tip: 'Use content-visibility: auto for large off-screen image galleries.',
  },
] as const

const eagerSrc = 'https://picsum.photos/seed/eager/600/400'
const lazySrc = 'https://picsum.photos/seed/lazy/600/400'

export function MediaLab() {
  return (
    <SectionShell
      description="Images are the single biggest performance bottleneck on most websites. This section covers srcset, format negotiation, lazy loading, and layout shift prevention — the four things that have the most impact on Core Web Vitals."
      eyebrow="Performance"
      id="media-lab"
      title="Serve the right image size and format so pages load fast without layout shift."
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <Badge variant="accent">Native browser APIs</Badge>
                <h3 className="font-display text-2xl font-semibold text-slate-950">
                  Responsive media strategies
                </h3>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  These patterns use native HTML and CSS — no library needed. Each one
                  targets a specific performance concern.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="mono-chip">srcset</span>
                <span className="mono-chip">loading=&quot;lazy&quot;</span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {mediaStrategies.map((strategy) => (
                <div
                  className="rounded-[24px] border border-slate-200/80 bg-slate-50/80 px-4 py-4"
                  key={strategy.title}
                >
                  <p className="text-sm font-semibold text-slate-900">{strategy.title}</p>
                  <code className="mt-2 block rounded-xl bg-slate-900/72 px-3 py-2 text-xs text-slate-300 overflow-x-auto">
                    {strategy.code}
                  </code>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{strategy.detail}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Image className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Eager vs lazy loading
              </h3>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The left image loads eagerly (for above-the-fold content). The right uses
              native <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">loading=&quot;lazy&quot;</code>
              — inspect the network tab to see the difference.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Badge variant="success">Eager (above fold)</Badge>
                <img
                  alt="Demo image loaded eagerly"
                  className="w-full rounded-[20px] border border-slate-200/80 object-cover"
                  fetchPriority="high"
                  height={400}
                  src={eagerSrc}
                  style={{ aspectRatio: '3 / 2' }}
                  width={600}
                />
              </div>
              <div className="space-y-2">
                <Badge variant="neutral">Lazy (below fold)</Badge>
                <img
                  alt="Demo image loaded lazily"
                  className="w-full rounded-[20px] border border-slate-200/80 object-cover"
                  height={400}
                  loading="lazy"
                  src={lazySrc}
                  style={{ aspectRatio: '3 / 2' }}
                  width={600}
                />
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel className="p-6">
            <div className="flex items-center gap-2 text-emerald-300">
              <Zap className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Core Web Vitals impact
              </h3>
            </div>
            <div className="mt-5 space-y-4">
              {webVitalsImpact.map((item) => (
                <div
                  className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4"
                  key={item.metric}
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="accent">{item.metric}</Badge>
                    <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                  <p className="mt-2 text-xs font-medium text-emerald-700">💡 {item.tip}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-amber-300">
              <MonitorSmartphone className="size-4" />
              <h3 className="font-display text-2xl font-semibold text-slate-950">
                Vite image workflow
              </h3>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Vite serves images from the <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">public/</code> folder as-is, or from <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">src/assets/</code> with hashing.</li>
              <li>Use <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">vite-plugin-image-optimizer</code> to auto-compress at build time.</li>
              <li>For responsive art: generate multiple sizes at build time or use a CDN with on-the-fly transformations.</li>
              <li>Always set <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">width</code> and <code className="mx-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">height</code> on img elements to prevent layout shift.</li>
            </ul>
          </Panel>

          <Panel className="p-6">
            <div className="flex items-center gap-2 text-slate-900">
              <Ruler className="size-4" />
              <h3 className="font-display text-2xl font-semibold">
                Aspect ratio cheat sheet
              </h3>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {['16 / 9', '4 / 3', '1 / 1'].map((ratio) => (
                <div
                  className="flex items-center justify-center rounded-[20px] border border-slate-200/80 bg-slate-50/80 text-xs font-mono text-slate-600"
                  key={ratio}
                  style={{ aspectRatio: ratio.replace(' / ', '/') }}
                >
                  {ratio}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  )
}
