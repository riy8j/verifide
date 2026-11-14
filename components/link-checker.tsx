'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { SectionHeading } from './section-heading'

type ClaimReview = {
  publisher: string
  title: string
  url: string
  reviewDate: string | null
  rating: string
}

type FactCheck = {
  text: string
  claimant: string | null
  claimDate: string | null
  reviews: ClaimReview[]
}

export function LinkChecker() {
  const [link, setLink] = useState('')
  const [claim, setClaim] = useState('')
  const [results, setResults] = useState<FactCheck[] | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResults(null)
    setError('')

    try {
      const url = new URL(link.trim())
      if ((url.protocol !== 'https:' && url.protocol !== 'http:') || url.username || url.password) {
        setError('Enter a public article link that starts with http:// or https://.')
        return
      }
    } catch {
      setError('Enter a complete article link, such as https://example.com/article.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: link.trim(), claim: claim.trim() }),
      })
      const data: { results?: FactCheck[]; error?: string } = await response.json()

      if (!response.ok) {
        setError(data.error ?? 'We could not check this claim right now. Please try again.')
        return
      }

      setResults(data.results ?? [])
    } catch {
      setError('We could not reach the fact-check service. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section aria-labelledby="link-checker-title" id="link-check" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          id="link-checker-title"
          index="02"
          eyebrow="Link checker"
          title="Check a story against other sources"
          description="Enter an article link and the specific claim you want to check. We’ll show matching published fact-checks here, including each reviewer’s rating and evidence."
        />

        <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-card p-5 md:p-8">
          <div className="grid gap-5">
            <div>
              <label htmlFor="article-link" className="text-xs uppercase tracking-wider text-muted-foreground">
                Article link
              </label>
              <input
                id="article-link"
                type="url"
                required
                value={link}
                onChange={(event) => setLink(event.target.value)}
                placeholder="https://example.com/article"
                aria-describedby={error ? 'link-checker-error' : 'link-checker-help'}
                aria-invalid={Boolean(error)}
                className="mt-3 h-12 w-full rounded-md border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
              />
            </div>
            <div>
              <label htmlFor="claim-text" className="text-xs uppercase tracking-wider text-muted-foreground">
                Claim to check
              </label>
              <textarea
                id="claim-text"
                required
                minLength={8}
                maxLength={500}
                value={claim}
                onChange={(event) => setClaim(event.target.value)}
                placeholder="For example: The city has banned all gas stoves."
                className="mt-3 min-h-24 w-full resize-y rounded-md border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-signal px-5 text-sm font-medium text-signal-foreground transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60"
            >
              <Search aria-hidden="true" className="size-4" />
              {loading ? 'Checking…' : 'Find fact-checks'}
            </button>
            <p id="link-checker-help" className="text-xs text-muted-foreground">
              The link is not opened or stored. Only the claim text is sent to the fact-check service.
            </p>
          </div>
          {error && (
            <p id="link-checker-error" role="alert" className="mt-4 text-sm text-signal">
              {error}
            </p>
          )}
        </form>

        {results !== null && (
          <div aria-live="polite" className="mt-6">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Fact-check results</p>
              <p className="mt-1 font-serif text-xl">{results.length ? `${results.length} matching claim${results.length === 1 ? '' : 's'}` : 'No matching fact-checks found'}</p>
            </div>
            {results.length > 0 ? (
              <ul className="grid gap-4">
                {results.map((result, index) => (
                  <li key={`${result.text}-${index}`} className="rounded-lg border border-border">
                    <div className="border-b border-border bg-card px-5 py-4">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">Claim</p>
                      <p className="mt-1 font-serif text-lg leading-snug">{result.text}</p>
                      {(result.claimant || result.claimDate) && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          {[result.claimant, result.claimDate].filter(Boolean).join(' · ')}
                        </p>
                      )}
                    </div>
                    <ul className="divide-y divide-border">
                      {result.reviews.map((review) => (
                        <li key={`${review.url}-${review.rating}`} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">
                              {review.publisher}
                              {review.reviewDate ? ` · ${review.reviewDate}` : ''}
                            </p>
                            <p className="mt-1 font-medium">{review.title}</p>
                            <p className="mt-2 text-sm text-caution">Rating: {review.rating || 'Not specified'}</p>
                          </div>
                          <a
                            href={review.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex shrink-0 items-center gap-1 self-start text-xs underline decoration-border underline-offset-4 hover:decoration-foreground"
                          >
                            Read review
                            <ArrowUpRight aria-hidden="true" className="size-3.5" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-lg border border-border bg-card px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                No indexed fact-check matched this wording. That does not mean the claim is true—try a shorter or
                differently worded claim.
              </p>
            )}
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Ratings are the fact-checkers’ own conclusions, not a verdict from Provenance. Fact-check results do
              not provide an outlet-wide bias score; assess the article’s evidence and compare independent reporting.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
