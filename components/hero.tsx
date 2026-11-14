import { trainingSources, watchedDomains } from '@/lib/data'

export function Hero() {
  const highRisk = trainingSources.filter((s) => s.risk === 'high').length
  const closed = trainingSources.filter((s) => s.transparency !== 'open').length

  const stats = [
    { value: trainingSources.length, label: 'Training datasets tracked' },
    { value: highRisk, label: 'Rated high disinformation risk' },
    { value: watchedDomains.length, label: 'Documented poisoning vectors' },
    { value: closed, label: 'Partially or fully undisclosed' },
  ]

  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
        <p className="mb-6 text-xs uppercase tracking-[0.2em] text-signal">Open investigation · v1</p>
        <h1 className="max-w-4xl text-balance font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
          What AI learns is only as true as <em className="text-signal">what it reads.</em>
        </h1>
        <p className="mt-8 max-w-2xl text-pretty font-serif text-xl leading-relaxed text-muted-foreground">
          Provenance tracks the datasets and websites used to train language and image models, documents how
          disinformation gets into them, and explains—step by step—what the model is actually doing with it.
        </p>
        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <a href="#link-check" className="rounded-md bg-signal px-4 py-2.5 font-medium text-signal-foreground">
            Check a link
          </a>
          <a href="#sources" className="rounded-md border border-border px-4 py-2.5 hover:border-foreground">
            Explore the source tracker
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-5">
              <dt className="text-xs leading-snug text-muted-foreground">{s.label}</dt>
              <dd className="mt-2 font-serif text-4xl tabular-nums">{String(s.value).padStart(2, '0')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
