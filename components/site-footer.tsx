import { REPO_URL } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
        <p>Provenance — an open-source tracker of AI training data and disinformation. MIT licensed.</p>
        <a href={REPO_URL} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground">
          github.com/riy8j/ai-disinformation-tracker
        </a>
      </div>
    </footer>
  )
}
