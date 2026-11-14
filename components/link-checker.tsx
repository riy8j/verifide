'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { SectionHeading } from './section-heading'

type LinkSearches = {
  domain: string
  factChecks: string
  coverage: string
  mediaBias: string
  allsides: string
}

export function LinkChecker() {
  const [link, setLink] = useState('')
  const [searches, setSearches] = useState<LinkSearches | null>(null)
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    let url: URL
    try {
      url = new URL(link.trim())
    } catch {
      setSearches(null)
      setError('Enter a complete link, such as https://example.com/article.')
      return
    }

    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
      setSearches(null)
      setError('Use a link that starts with http:// or https://.')
      return
    }

    const domain = url.hostname.replace(/^www\./, '')
    const articleWords = url.pathname
      .split('/')
      .filter(Boolean)
      .pop()
      ?.replace(/\.[^.]+$/, '')
      .replace(/[-_]/g, ' ')
    const query = [domain, articleWords].filter(Boolean).join(' ')
    setSearches({
      domain,
      factChecks: `https://toolbox.google.com/factcheck/explorer/search/${encodeURIComponent(query)}`,
      coverage: `https://news.google.com/search?q=${encodeURIComponent(query)}`,
      mediaBias: `https://mediabiasfactcheck.com/?s=${encodeURIComponent(domain)}`,
      allsides: `https://www.allsides.com/search?search=${encodeURIComponent(domain)}`,
    })
    setError('')
  }

  return (
    <section aria-labelledby="link-checker-title" id="link-check" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          id="link-checker-title"
          index="02"
          eyebrow="Link checker"
          title="Check a story against other sources"
          description="Paste an article link to find fact-checks, independent coverage, and published assessments of the outlet. Compare the reporting before deciding what to trust."
        />

        <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-5 md:p-8">
          <label htmlFor="article-link" className="text-xs uppercase tracking-wider text-muted-foreground">
            Article link
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="article-link"
              type="url"
              required
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="https://example.com/article"
              aria-describedby={error ? 'link-checker-error' : 'link-checker-help'}
              aria-invalid={Boolean(error)}
              className="h-12 min-w-0 flex-1 rounded-md border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-signal px-5 text-sm font-medium text-signal-foreground transition-opacity hover:opacity-90"
            >
              <Search aria-hidden="true" className="size-4" />
              Find other sources
            </button>
          </div>
          {error ? (
            <p id="link-checker-error" role="alert" className="mt-3 text-sm text-signal">
              {error}
            </p>
          ) : (
            <p id="link-checker-help" className="mt-3 text-xs text-muted-foreground">
              Your link is used to prepare searches; this tool does not open or store the article.
            </p>
          )}
        </form>

        {searches && (
          <div aria-live="polite" className="mt-6 rounded-lg border border-border">
            <div className="border-b border-border bg-card px-5 py-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Research links for</p>
              <p className="mt-1 font-serif text-xl">{searches.domain}</p>
            </div>
            <ul className="divide-y divide-border">
              <ResearchLink
                href={searches.factChecks}
                title="Fact-checks"
                description="Search Google Fact Check Explorer for related claim reviews."
              />
              <ResearchLink
                href={searches.coverage}
                title="Other news coverage"
                description="See how other outlets are reporting on the same story."
              />
              <ResearchLink
                href={searches.mediaBias}
                title="Media Bias / Fact Check"
                description="Look for a published profile of this outlet."
              />
              <ResearchLink
                href={searches.allsides}
                title="AllSides"
                description="Look for an outlet perspective rating and coverage from different sides."
              />
            </ul>
            <p className="border-t border-border px-5 py-4 text-xs leading-relaxed text-muted-foreground">
              These are searches, not a verdict. A source’s bias rating does not prove or disprove an individual
              article; check the evidence and compare independent reporting.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

function ResearchLink({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-card"
      >
        <span className="flex-1">
          <span className="block font-medium">{title}</span>
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{description}</span>
        </span>
        <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
      </a>
    </li>
  )
}
