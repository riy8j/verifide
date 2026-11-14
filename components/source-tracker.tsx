'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, ChevronDown, Search } from 'lucide-react'
import { trainingSources, type Modality, type Risk, type TrainingSource } from '@/lib/data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const riskOptions: (Risk | 'all')[] = ['all', 'high', 'moderate', 'low']
const modalityOptions: (Modality | 'all')[] = ['all', 'text', 'image-text', 'code']

export function SourceTracker() {
  const [query, setQuery] = useState('')
  const [risk, setRisk] = useState<Risk | 'all'>('all')
  const [modality, setModality] = useState<Modality | 'all'>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return trainingSources.filter((s) => {
      if (risk !== 'all' && s.risk !== risk) return false
      if (modality !== 'all' && s.modality !== modality) return false
      if (!q) return true
      return [s.name, s.maintainer, s.summary, ...s.usedBy].join(' ').toLowerCase().includes(q)
    })
  }, [query, risk, modality])

  return (
    <section aria-labelledby="sources-title" id="sources" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          id="sources-title"
          index="03"
          eyebrow="Source tracker"
          title="The datasets models are trained on"
          description="Each entry records who built the dataset, how it was filtered, which models used it, and the specific ways disinformation can slip through. Risk ratings reflect exposure to unvetted web content and auditability—not a judgment of the maintainers."
        />

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block md:w-80">
            <span className="sr-only">Search datasets</span>
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search datasets or models…"
              className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
          </label>
          <div className="flex flex-wrap gap-4">
            <FilterGroup label="Risk" options={riskOptions} value={risk} onChange={setRisk} />
            <FilterGroup label="Modality" options={modalityOptions} value={modality} onChange={setModality} />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-border bg-card px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground md:grid">
            <span>Dataset</span>
            <span>Modality</span>
            <span>Transparency</span>
            <span>Risk</span>
            <span className="w-4" />
          </div>
          <ul>
            {results.map((s) => (
              <SourceRow
                key={s.id}
                source={s}
                open={openId === s.id}
                onToggle={() => setOpenId((cur) => (cur === s.id ? null : s.id))}
              />
            ))}
          </ul>
          {results.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">No datasets match these filters.</p>
          )}
        </div>
        <p className="mt-3 text-xs text-muted-foreground" aria-live="polite">
          Showing {results.length} of {trainingSources.length} datasets
        </p>
      </div>
    </section>
  )
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <fieldset className="flex items-center gap-2">
      <legend className="sr-only">{label}</legend>
      <span aria-hidden="true" className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex rounded-md border border-border p-0.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={cn(
              'rounded px-2.5 py-1 text-xs capitalize transition-colors',
              value === o ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function RiskBadge({ risk }: { risk: Risk }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs capitalize',
        risk === 'high' && 'text-signal',
        risk === 'moderate' && 'text-caution',
        risk === 'low' && 'text-verified',
      )}
    >
      <span aria-hidden="true" className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'h-3 w-1 rounded-sm',
              i < (risk === 'high' ? 3 : risk === 'moderate' ? 2 : 1) ? 'bg-current' : 'bg-border',
            )}
          />
        ))}
      </span>
      {risk}
    </span>
  )
}

function SourceRow({ source: s, open, onToggle }: { source: TrainingSource; open: boolean; onToggle: () => void }) {
  const panelId = `source-${s.id}`
  return (
    <li className="border-b border-border last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="grid w-full grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-card/60 md:grid-cols-[2fr_1fr_1fr_1fr_auto]"
      >
        <span>
          <span className="block font-serif text-lg leading-tight">{s.name}</span>
          <span className="mt-1 block text-xs text-muted-foreground">
            {s.maintainer} · {s.year}
          </span>
        </span>
        <span className="hidden text-xs text-muted-foreground md:block">{s.modality}</span>
        <span className="hidden text-xs capitalize text-muted-foreground md:block">{s.transparency}</span>
        <span className="hidden md:block">
          <RiskBadge risk={s.risk} />
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div id={panelId} className="grid gap-6 border-t border-border bg-card/50 px-5 py-6 md:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-4 md:hidden">
              <RiskBadge risk={s.risk} />
              <span className="text-xs text-muted-foreground">{s.modality}</span>
              <span className="text-xs capitalize text-muted-foreground">{s.transparency}</span>
            </div>
            <p className="font-serif text-lg leading-relaxed">{s.summary}</p>
            <h3 className="mt-6 text-xs uppercase tracking-wider text-signal">Disinformation vectors</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {s.disinfoVectors.map((v) => (
                <li key={v} className="flex gap-3 text-sm leading-relaxed">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-signal" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <dl className="flex flex-col gap-5 text-sm">
            <Detail label="Scale">{s.scale}</Detail>
            <Detail label="Filtering">{s.filtering}</Detail>
            <Detail label="Used to train">{s.usedBy.join(', ')}</Detail>
            <Detail label="Reference">
              <a
                href={s.reference.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                {s.reference.label}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </Detail>
          </dl>
        </div>
      )}
    </li>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 leading-relaxed">{children}</dd>
    </div>
  )
}
