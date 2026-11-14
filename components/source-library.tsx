import { ArrowUpRight } from 'lucide-react'
import { citations } from '@/lib/evidence'
import { SectionHeading } from './section-heading'

export function SourceLibrary() {
  return (
    <section aria-labelledby="library-title" id="library" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          id="library-title"
          index="07"
          eyebrow="Source library"
          title="Read the primary sources"
          description="The full list of studies and reports this site draws on for its evidence. Each opens the original publication in a new tab."
        />
        <ol className="divide-y divide-border rounded-lg border border-border">
          {citations.map((c, i) => (
            <li key={c.id}>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 p-5 transition-colors hover:bg-card md:items-center md:gap-6 md:px-6"
              >
                <span className="pt-1 text-xs tabular-nums text-muted-foreground md:pt-0">
                  S-{String(i + 1).padStart(2, '0')}
                </span>
                <span className="flex flex-1 flex-col gap-1">
                  <span className="font-serif text-lg leading-snug group-hover:underline group-hover:underline-offset-4">
                    {c.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {c.publisher} · {c.date}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted-foreground md:mt-0" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
