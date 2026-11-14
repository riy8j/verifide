import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { citationById, keyFigures, qualitativeFindings } from '@/lib/evidence'
import {
  ChatbotFalsehoodChart,
  DependencyChart,
  IncidentsByCountryChart,
  ThreatShareChart,
  VotingAnswersChart,
} from './evidence-charts'
import { SectionHeading } from './section-heading'

function SourceLink({ id }: { id: string }) {
  const c = citationById[id]
  return (
    <a
      href={c.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground"
    >
      Source: {c.publisher}, {c.date}
      <ArrowUpRight aria-hidden="true" className="size-3.5" />
    </a>
  )
}

function ChartCard({
  title,
  summary,
  source,
  note,
  className = '',
  children,
}: {
  title: string
  summary: string
  source: string
  note?: string
  className?: string
  children: ReactNode
}) {
  return (
    <figure className={`flex flex-col rounded-lg border border-border bg-card p-6 ${className}`}>
      <h3 className="font-serif text-xl leading-snug">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>
      <div className="mt-6 flex-1" role="img" aria-label={summary}>
        {children}
      </div>
      <figcaption className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
        {note ? <p className="text-xs leading-relaxed text-muted-foreground">{note}</p> : null}
        <SourceLink id={source} />
      </figcaption>
    </figure>
  )
}

export function Evidence() {
  return (
    <section aria-labelledby="evidence-title" id="evidence" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          id="evidence-title"
          index="05"
          eyebrow="The evidence"
          title="What the research actually shows"
          description="Every figure below comes from a published study, report, or institutional analysis. Click any source line to read the original and check the number yourself."
        />

        <ul className="mb-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {keyFigures.map((f) => (
            <li key={f.label} className="flex flex-col gap-3 bg-background p-6">
              <span className="font-serif text-4xl tabular-nums text-signal">{f.value}</span>
              <p className="flex-1 text-sm leading-relaxed">{f.label}</p>
              <SourceLink id={f.source} />
            </li>
          ))}
        </ul>

        <div className="grid gap-6 md:grid-cols-2">
          <ChartCard
            title="Chatbots are repeating more falsehoods"
            summary="A NewsGuard audit found chatbots spread false claims 35% of the time, a rate that nearly doubled in a year."
            source="wsu"
            note="The prior-year bar is derived from “nearly doubled” and is shown in grey as an approximation."
          >
            <ChatbotFalsehoodChart />
          </ChartCard>

          <ChartCard
            title="Relying on AI weakens our own detection"
            summary="In a four-week MIT study of 67 people, AI help raised fake-news accuracy 21%, but unassisted performance fell 15 points by week four."
            source="mit"
            note="Change versus each participant’s baseline. Roughly a quarter felt they were improving while their accuracy declined."
          >
            <DependencyChart />
          </ChartCard>

          <ChartCard
            title="Where AI disinformation hit crisis events"
            summary="The CETaS repository logged incidents across 21 countries from July 2024 to May 2026. The US, Iran, and the UK were most affected."
            source="turing"
          >
            <IncidentsByCountryChart />
          </ChartCard>

          <ChartCard
            title="Fabricated content dominates"
            summary="Content-generation threats made up 75% of crisis cases; deceptive AI-generated content appeared in 38 of 61 entries."
            source="turing"
            note="AI chatbots and AI search outputs were themselves linked to 7 incidents, repeating false claims during breaking news."
          >
            <ThreatShareChart />
          </ChartCard>

          <ChartCard
            className="md:col-span-2"
            title="Election answers fail under stress tests"
            summary="A 2024 Center for Democracy and Technology test of chatbot answers about voting with a disability: 61% had at least one insufficiency and one in three was incorrect. Every model hallucinated at least once."
            source="wsu"
          >
            <VotingAnswersChart />
          </ChartCard>
        </div>

        <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
          {qualitativeFindings.map((f) => (
            <li key={f.heading} className="flex flex-col gap-3 bg-background p-6 md:p-8">
              <h3 className="font-serif text-xl leading-snug">{f.heading}</h3>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              <SourceLink id={f.source} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
