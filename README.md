# Provenance — AI Disinformation & Training Data Tracker

An open-source website that tracks the datasets and websites used to train AI models, documents how disinformation gets into them, and explains what a language model is actually doing.

## What's inside

- **Pipeline explorer** — six stages from crawl to feedback loop, showing what the model is doing, where disinformation enters, and known defenses.
- **Source tracker** — searchable, filterable catalog of training datasets (Common Crawl, C4, FineWeb, WebText, Wikipedia, The Pile, Dolma, LAION-5B, The Stack, undisclosed proprietary mixes) with risk ratings, filtering methods, and citations.
- **Site watchlist** — documented tactics aimed at AI crawlers, such as "LLM grooming" networks, AI content farms, and expired-domain poisoning.
- **Inside the model** — an interactive next-token probability demo comparing a clean and a poisoned corpus.

## Contributing

All tracker data lives in [`lib/data.ts`](lib/data.ts). To add or correct an entry:

1. Fork the repo and edit `lib/data.ts`.
2. Every entry **must** include a `reference` / `source` link to a paper, datasheet, or reputable report.
3. Open a pull request explaining the change.

Risk ratings reflect exposure to unvetted web content and auditability, not the intent of dataset maintainers.

## Development

```bash
pnpm install
pnpm dev
```

Built with Next.js, Tailwind CSS, and TypeScript.

## License

MIT
