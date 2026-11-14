'use client'

import { useState } from 'react'
import { pipeline } from '@/lib/data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

export function PipelineExplorer() {
  const [activeId, setActiveId] = useState(pipeline[0].id)
  const activeIndex = pipeline.findIndex((s) => s.id === activeId)
  const stage = pipeline[activeIndex]

  return (
    <section aria-labelledby="pipeline-title" id="pipeline" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          id="pipeline-title"
          index="01"
          eyebrow="Pipeline"
          title="How a false claim becomes a model's belief"
          description="A model never 'decides' to spread disinformation. It inherits patterns at every stage of its lifecycle. Step through each stage to see what the system is doing and where the risk enters."
        />

        <div role="tablist" aria-label="Training pipeline stages" className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-6">
          {pipeline.map((s, i) => {
            const selected = s.id === activeId
            return (
              <button
                key={s.id}
                role="tab"
                id={`tab-${s.id}`}
                aria-selected={selected}
                aria-controls="pipeline-panel"
                onClick={() => setActiveId(s.id)}
                className={cn(
                  'flex flex-col items-start gap-3 bg-background p-4 text-left transition-colors',
                  selected ? 'bg-card' : 'hover:bg-card/60',
                )}
              >
                <span className={cn('text-xs tabular-nums', i <= activeIndex ? 'text-signal' : 'text-muted-foreground')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium">{s.label}</span>
                <span
                  aria-hidden="true"
                  className={cn('h-0.5 w-full rounded-full', i <= activeIndex ? 'bg-signal' : 'bg-border')}
                />
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id="pipeline-panel"
          aria-labelledby={`tab-${stage.id}`}
          className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3"
        >
          <div className="bg-card p-6 md:col-span-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">What happens</p>
            <p className="mt-2 font-serif text-2xl leading-snug text-balance">{stage.what}</p>
          </div>
          <PanelCell label="What the model is doing" tone="neutral" text={stage.doing} />
          <PanelCell label="Where disinformation enters" tone="signal" text={stage.risk} />
          <PanelCell label="Known defenses" tone="verified" text={stage.defense} />
        </div>
      </div>
    </section>
  )
}

function PanelCell({ label, text, tone }: { label: string; text: string; tone: 'neutral' | 'signal' | 'verified' }) {
  return (
    <div className="bg-background p-6">
      <p
        className={cn(
          'flex items-center gap-2 text-xs uppercase tracking-wider',
          tone === 'signal' && 'text-signal',
          tone === 'verified' && 'text-verified',
          tone === 'neutral' && 'text-muted-foreground',
        )}
      >
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
        {label}
      </p>
      <p className="mt-3 text-sm leading-relaxed">{text}</p>
    </div>
  )
}
