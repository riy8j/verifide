'use client'

import { useState } from 'react'
import { tokenScenarios } from '@/lib/data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const concepts = [
  {
    term: 'Tokens',
    body: 'Text is split into fragments—words or pieces of words. The model only ever sees and produces these numbered fragments.',
  },
  {
    term: 'Next-token prediction',
    body: 'Given everything so far, the model outputs a probability for every possible next token, then one is sampled. That is the entire generation loop.',
  },
  {
    term: 'Weights, not a database',
    body: 'Training data is not stored and looked up. It is compressed into billions of numeric weights, which is why sources are so hard to trace afterwards.',
  },
  {
    term: 'Hallucination',
    body: 'When patterns are weak or conflicting, the model still produces fluent text. Plausibility is what it optimizes—truth is only correlated with it.',
  },
]

type TokenProb = { token: string; p: number }

function mostAmplifiedToken(clean: TokenProb[], poisoned: TokenProb[]) {
  let best = { token: '', delta: -Infinity }
  for (const t of poisoned) {
    const delta = t.p - (clean.find((c) => c.token === t.token)?.p ?? 0)
    if (delta > best.delta) best = { token: t.token, delta }
  }
  return best.token
}

export function ModelLens() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [poisoned, setPoisoned] = useState(false)
  const scenario = tokenScenarios[scenarioIndex]
  const cleanTokens = scenario.clean.map((t) => t.token)
  const dist = poisoned ? scenario.poisoned : scenario.clean
  const ordered = cleanTokens.map((token) => dist.find((d) => d.token === token)!)
  const flagged = mostAmplifiedToken(scenario.clean, scenario.poisoned)

  return (
    <section aria-labelledby="model-title" id="model" className="scroll-mt-14 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
        <SectionHeading
          id="model-title"
          index="05"
          eyebrow="Inside the model"
          title="What the model is actually doing"
          description="A language model is a next-word probability machine. Toggle between a clean and a poisoned training corpus to see how repeated disinformation shifts what the model is likely to say next."
        />

        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div className="rounded-lg border border-border bg-card p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                Prompt
                <select
                  value={scenarioIndex}
                  onChange={(e) => setScenarioIndex(Number(e.target.value))}
                  className="rounded-md border border-input bg-background px-2 py-1 text-xs normal-case tracking-normal text-foreground"
                >
                  {tokenScenarios.map((s, i) => (
                    <option key={s.prompt} value={i}>
                      Example {i + 1}
                    </option>
                  ))}
                </select>
              </label>
              <div role="radiogroup" aria-label="Training corpus" className="flex rounded-md border border-border p-0.5 text-xs">
                {[false, true].map((value) => (
                  <button
                    key={String(value)}
                    role="radio"
                    aria-checked={poisoned === value}
                    onClick={() => setPoisoned(value)}
                    className={cn(
                      'rounded px-3 py-1 transition-colors',
                      poisoned === value
                        ? value
                          ? 'bg-signal text-signal-foreground'
                          : 'bg-verified text-background'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {value ? 'Poisoned corpus' : 'Clean corpus'}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-8 font-serif text-2xl leading-snug md:text-3xl">
              {scenario.prompt}{' '}
              <span className={cn('border-b-2 px-1', poisoned ? 'border-signal text-signal' : 'border-verified text-verified')}>
                {[...dist].sort((a, b) => b.p - a.p)[0].token}
              </span>
              <span aria-hidden="true" className="ml-1 inline-block h-6 w-2 animate-pulse bg-foreground/70 align-middle" />
            </p>

            <h3 className="mt-10 text-xs uppercase tracking-wider text-muted-foreground">Next-token probabilities</h3>
            <ul className="mt-4 flex flex-col gap-3" aria-live="polite">
              {ordered.map((t) => {
                const isFlag = t.token === flagged
                return (
                  <li key={t.token} className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3 text-sm">
                    <span className={cn('truncate', isFlag && poisoned && 'text-signal')}>{`"${t.token}"`}</span>
                    <span className="h-2 overflow-hidden rounded-full bg-background">
                      <span
                        className={cn(
                          'block h-full rounded-full transition-[width] duration-500',
                          isFlag ? 'bg-signal' : 'bg-foreground/70',
                        )}
                        style={{ width: `${t.p * 200}%` }}
                      />
                    </span>
                    <span className="text-right tabular-nums text-muted-foreground">{Math.round(t.p * 100)}%</span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-8 border-t border-border pt-5 text-sm leading-relaxed text-muted-foreground">{scenario.note}</p>
            <p className="mt-3 text-xs text-muted-foreground/80">
              Illustrative probabilities for teaching purposes, not measurements from a specific model.
            </p>
          </div>

          <dl className="flex flex-col gap-px overflow-hidden rounded-lg border border-border bg-border">
            {concepts.map((c) => (
              <div key={c.term} className="flex-1 bg-background p-6">
                <dt className="font-serif text-xl">{c.term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
