import { ArrowUpRight } from 'lucide-react'
import { categoryLabel, watchedDomains } from '@/lib/data'
import { SectionHeading } from './section-heading'

export function DomainWatchlist() {
  return (
    <section aria-labelledby="watchlist-title" id="watchlist" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          id="watchlist-title"
          index="04"
          eyebrow="Site watchlist"
          title="The sites and tactics aimed at AI crawlers"
          description="Some disinformation is no longer written for people at all. It is mass-produced so that crawlers ingest it and models repeat it. These are documented patterns, each linked to the original research or reporting."
        />
        <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {watchedDomains.map((d, i) => (
            <li key={d.label} className="flex flex-col bg-background p-6 md:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs tabular-nums text-muted-foreground">W-{String(i + 1).padStart(3, '0')}</span>
                <span className="rounded-full border border-signal/40 px-2.5 py-0.5 text-xs text-signal">
                  {categoryLabel[d.category]}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-2xl leading-tight">{d.label}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{d.observation}</p>
              <a
                href={d.source.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1 self-start text-xs underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                {d.source.label}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
