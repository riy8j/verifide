import { DomainWatchlist } from '@/components/domain-watchlist'
import { Evidence } from '@/components/evidence'
import { SourceLibrary } from '@/components/source-library'
import { Hero } from '@/components/hero'
import { LinkChecker } from '@/components/link-checker'
import { Methodology } from '@/components/methodology'
import { ModelLens } from '@/components/model-lens'
import { PipelineExplorer } from '@/components/pipeline-explorer'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SourceTracker } from '@/components/source-tracker'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <PipelineExplorer />
        <LinkChecker />
        <SourceTracker />
        <DomainWatchlist />
        <ModelLens />
        <Evidence />
        <SourceLibrary />
        <Methodology />
      </main>
      <SiteFooter />
    </>
  )
}
