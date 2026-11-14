import { REPO_URL } from '@/lib/site'
import { SectionHeading } from './section-heading'

const principles = [
  {
    title: 'Cite everything',
    body: 'Every dataset and watchlist entry links to a paper, datasheet or investigative report. No anonymous claims.',
  },
  {
    title: 'Rate exposure, not intent',
    body: 'Risk reflects how much unvetted content a dataset contains and how auditable it is—not whether its builders meant harm.',
  },
  {
    title: 'Data lives in the repo',
    body: 'The entire tracker is a typed file at lib/data.ts. Corrections and new entries are pull requests, reviewed in public.',
  },
]

export function Methodology() {
  return (
    <section aria-labelledby="method-title" id="method" className="scroll-mt-14">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          id="method-title"
          index="05"
          eyebrow="Methodology"
          title="An open, correctable record"
          description="Provenance is a public repository. Anyone can audit the sources, challenge a rating, or add a dataset that is missing."
        />
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title} className="bg-background p-6 md:p-8">
              <h3 className="font-serif text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-lg border border-signal/40 bg-signal/5 p-6 md:flex-row md:items-center md:p-8">
          <div>
            <p className="font-serif text-2xl">Spotted a missing source or a wrong rating?</p>
            <p className="mt-2 text-sm text-muted-foreground">Open an issue or submit a pull request on GitHub.</p>
          </div>
          <a
            href={`${REPO_URL}/issues/new`}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-signal-foreground"
          >
            Contribute on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
