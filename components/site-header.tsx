import { Code2 as Github } from 'lucide-react'
import { navItems, REPO_URL } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-4 md:px-6">
        <a href="#top" className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-signal" />
          PROVENANCE
        </a>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-6 text-xs uppercase tracking-wider text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs transition-colors hover:border-foreground"
        >
          <Github className="size-3.5" aria-hidden="true" />
          <span>Source</span>
        </a>
      </div>
    </header>
  )
}
