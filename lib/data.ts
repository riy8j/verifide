export type Risk = 'low' | 'moderate' | 'high'
export type Modality = 'text' | 'image-text' | 'code'
export type Transparency = 'open' | 'partial' | 'closed'

export type TrainingSource = {
  id: string
  name: string
  maintainer: string
  modality: Modality
  year: number
  scale: string
  transparency: Transparency
  risk: Risk
  summary: string
  disinfoVectors: string[]
  filtering: string
  usedBy: string[]
  reference: { label: string; url: string }
}

export const trainingSources: TrainingSource[] = [
  {
    id: 'common-crawl',
    name: 'Common Crawl',
    maintainer: 'Common Crawl Foundation',
    modality: 'text',
    year: 2008,
    scale: 'Petabytes · billions of pages per snapshot',
    transparency: 'open',
    risk: 'high',
    summary:
      'A nonprofit monthly crawl of the public web. Nearly every large language model draws on it, usually after heavy filtering.',
    disinfoVectors: [
      'Captures content farms and AI-generated news sites alongside reputable outlets',
      'Coordinated networks can publish at volume to be over-represented',
      'No editorial review; quality depends entirely on downstream filters',
    ],
    filtering: 'None at source. Downstream projects apply language ID, dedup, and quality classifiers.',
    usedBy: ['GPT-3 (filtered)', 'LLaMA', 'Falcon', 'most open LLMs'],
    reference: { label: 'commoncrawl.org', url: 'https://commoncrawl.org' },
  },
  {
    id: 'c4',
    name: 'C4 (Colossal Clean Crawled Corpus)',
    maintainer: 'Google Research',
    modality: 'text',
    year: 2019,
    scale: '~750 GB · ~15M websites',
    transparency: 'open',
    risk: 'moderate',
    summary:
      'A cleaned snapshot of Common Crawl built for T5. A 2023 Washington Post analysis found it still included state propaganda and known misinformation domains.',
    disinfoVectors: [
      'Blocklist filtering removes slurs but not false claims',
      'Includes some state-media and low-credibility domains',
      'Patent, legal and forum text mixed with news without labels',
    ],
    filtering: 'Heuristic: keeps lines ending in punctuation, removes pages with blocklisted words, dedups 3-sentence spans.',
    usedBy: ['T5', 'LaMDA (partial)', 'many research models'],
    reference: {
      label: 'Washington Post: Inside the secret list of websites',
      url: 'https://www.washingtonpost.com/technology/interactive/2023/ai-chatbot-learning/',
    },
  },
  {
    id: 'fineweb',
    name: 'FineWeb',
    maintainer: 'Hugging Face',
    modality: 'text',
    year: 2024,
    scale: '~15T tokens',
    transparency: 'open',
    risk: 'moderate',
    summary:
      'A carefully deduplicated, documented web corpus derived from 96 Common Crawl snapshots, with an "edu" subset scored for educational value.',
    disinfoVectors: [
      'Quality classifiers score style, not factual accuracy',
      'Well-written disinformation can pass educational-value filters',
    ],
    filtering: 'URL blocklist, language ID, MinHash dedup, Gopher & C4 quality heuristics, model-based scoring.',
    usedBy: ['SmolLM', 'many open research models'],
    reference: { label: 'huggingface.co/datasets/HuggingFaceFW/fineweb', url: 'https://huggingface.co/datasets/HuggingFaceFW/fineweb' },
  },
  {
    id: 'webtext',
    name: 'WebText / OpenWebText',
    maintainer: 'OpenAI (orig.) · community replication',
    modality: 'text',
    year: 2019,
    scale: '~40 GB · ~8M documents',
    transparency: 'partial',
    risk: 'high',
    summary:
      'Pages linked from Reddit posts with 3+ karma. Uses social upvotes as a quality proxy, which also amplifies viral and partisan content.',
    disinfoVectors: [
      'Engagement is not accuracy; viral falsehoods score well',
      'Inherits the demographic and ideological skew of the source community',
      'Brigading can push links over the karma threshold',
    ],
    filtering: 'Karma threshold, dedup, Wikipedia removed. Original set never publicly released.',
    usedBy: ['GPT-2', 'GPT-3 (component)'],
    reference: { label: 'OpenWebText replication', url: 'https://skylion007.github.io/OpenWebTextCorpus/' },
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    maintainer: 'Wikimedia Foundation',
    modality: 'text',
    year: 2001,
    scale: '~60M articles · 300+ languages',
    transparency: 'open',
    risk: 'low',
    summary:
      'Heavily up-weighted in most training mixes because of its citations and editorial process. Vandalism and coordinated edits are usually reverted quickly, but not always before a snapshot.',
    disinfoVectors: [
      'Snapshot timing can capture vandalism before revert',
      'Smaller language editions have fewer editors and weaker oversight',
      'Coordinated editing campaigns on contested topics',
    ],
    filtering: 'Usually markup removal only; content trusted as-is.',
    usedBy: ['virtually all LLMs'],
    reference: { label: 'dumps.wikimedia.org', url: 'https://dumps.wikimedia.org' },
  },
  {
    id: 'the-pile',
    name: 'The Pile',
    maintainer: 'EleutherAI',
    modality: 'text',
    year: 2020,
    scale: '~825 GB · 22 sub-datasets',
    transparency: 'open',
    risk: 'moderate',
    summary:
      'A documented mixture of academic papers, code, books, forums and web text. Notable for publishing a datasheet describing each component.',
    disinfoVectors: [
      'Includes Pile-CC web text with limited fact filtering',
      'Forum subsets reflect unverified user claims',
      'Some components later removed over copyright concerns',
    ],
    filtering: 'Per-component cleaning; jusText extraction and fastText quality classifier for web portion.',
    usedBy: ['GPT-Neo', 'GPT-J', 'Pythia'],
    reference: { label: 'arXiv:2101.00027', url: 'https://arxiv.org/abs/2101.00027' },
  },
  {
    id: 'dolma',
    name: 'Dolma',
    maintainer: 'Allen Institute for AI',
    modality: 'text',
    year: 2023,
    scale: '~3T tokens',
    transparency: 'open',
    risk: 'moderate',
    summary:
      'An open pretraining corpus with released tooling so anyone can audit or reproduce its filtering decisions.',
    disinfoVectors: [
      'Web and social subsets carry the same risks as Common Crawl',
      'Toxicity filters do not target false claims',
    ],
    filtering: 'Language ID, Gopher rules, toxicity and PII filters, dedup; full toolkit published.',
    usedBy: ['OLMo'],
    reference: { label: 'arXiv:2402.00159', url: 'https://arxiv.org/abs/2402.00159' },
  },
  {
    id: 'laion-5b',
    name: 'LAION-5B',
    maintainer: 'LAION',
    modality: 'image-text',
    year: 2022,
    scale: '5.85B image–text pairs',
    transparency: 'open',
    risk: 'high',
    summary:
      'Image URLs and alt-text scraped from Common Crawl, filtered with CLIP similarity. Trained many image generators; temporarily pulled in 2023 after a safety audit.',
    disinfoVectors: [
      'Alt-text captions are often wrong or misleading',
      'Manipulated or out-of-context images paired with false captions',
      'URLs can be swapped after indexing (link rot / poisoning)',
    ],
    filtering: 'CLIP image–text similarity threshold; NSFW tagging. No provenance checks on images.',
    usedBy: ['Stable Diffusion', 'OpenCLIP'],
    reference: { label: 'arXiv:2210.08402', url: 'https://arxiv.org/abs/2210.08402' },
  },
  {
    id: 'the-stack',
    name: 'The Stack',
    maintainer: 'BigCode',
    modality: 'code',
    year: 2022,
    scale: '~6 TB · 300+ languages',
    transparency: 'open',
    risk: 'low',
    summary:
      'Permissively licensed source code from GitHub with an opt-out mechanism for authors. Lower disinformation risk, but code comments and docs can still mislead.',
    disinfoVectors: [
      'Outdated or insecure code patterns learned as "correct"',
      'Malicious packages and typosquats in scraped repositories',
    ],
    filtering: 'License filtering, near-dedup, PII redaction, author opt-out.',
    usedBy: ['StarCoder', 'SantaCoder'],
    reference: { label: 'huggingface.co/datasets/bigcode/the-stack', url: 'https://huggingface.co/datasets/bigcode/the-stack' },
  },
  {
    id: 'proprietary',
    name: 'Undisclosed proprietary mixes',
    maintainer: 'Frontier labs',
    modality: 'text',
    year: 2023,
    scale: 'Unknown · likely 10T+ tokens',
    transparency: 'closed',
    risk: 'high',
    summary:
      'Most frontier models do not disclose their training data. Licensed news, synthetic data, user conversations and private crawls are all possible components.',
    disinfoVectors: [
      'Impossible to audit for poisoned or state-sponsored sources',
      'Synthetic data can recycle earlier model errors (model collapse)',
      'Licensing deals may over-weight specific publishers',
    ],
    filtering: 'Undisclosed.',
    usedBy: ['most commercial chat assistants'],
    reference: { label: 'Stanford Foundation Model Transparency Index', url: 'https://crfm.stanford.edu/fmti/' },
  },
]

export type DomainCategory = 'content-farm' | 'state-media' | 'coordinated-network' | 'reference'

export type WatchedDomain = {
  label: string
  category: DomainCategory
  observation: string
  source: { label: string; url: string }
}

export const watchedDomains: WatchedDomain[] = [
  {
    label: '"Pravda" network (portal-kombat)',
    category: 'coordinated-network',
    observation:
      'A Russia-linked network of ~150 sites reportedly published millions of articles in 2024, apparently aimed at search engines and AI crawlers rather than human readers ("LLM grooming").',
    source: { label: 'NewsGuard, Mar 2025', url: 'https://www.newsguardrealitycheck.com/p/a-well-funded-moscow-based-global' },
  },
  {
    label: 'Unreliable AI-generated news sites',
    category: 'content-farm',
    observation:
      'Sites that publish mostly machine-written articles with little human oversight, often with generic news-sounding names. NewsGuard has tracked over a thousand.',
    source: { label: 'NewsGuard AI Tracking Center', url: 'https://www.newsguardtech.com/special-reports/ai-tracking-center/' },
  },
  {
    label: 'State-controlled outlets in web corpora',
    category: 'state-media',
    observation:
      'Analysis of C4 found state-backed outlets among indexed domains. Their content enters training data on the same footing as independent journalism.',
    source: { label: 'Washington Post, Apr 2023', url: 'https://www.washingtonpost.com/technology/interactive/2023/ai-chatbot-learning/' },
  },
  {
    label: 'Expired-domain resale',
    category: 'coordinated-network',
    observation:
      'Researchers showed that buying expired domains referenced by datasets like LAION lets an attacker control what future downloads contain for roughly $60.',
    source: { label: 'Carlini et al., "Poisoning Web-Scale Training Datasets is Practical"', url: 'https://arxiv.org/abs/2302.10149' },
  },
  {
    label: 'Wikipedia snapshot vandalism',
    category: 'reference',
    observation:
      'Because dump dates are predictable, malicious edits timed just before a snapshot can persist in the training copy even after they are reverted live.',
    source: { label: 'Carlini et al., 2023', url: 'https://arxiv.org/abs/2302.10149' },
  },
]

export const categoryLabel: Record<DomainCategory, string> = {
  'content-farm': 'Content farm',
  'state-media': 'State media',
  'coordinated-network': 'Coordinated network',
  reference: 'Reference source',
}

export type PipelineStage = {
  id: string
  label: string
  what: string
  doing: string
  risk: string
  defense: string
}

export const pipeline: PipelineStage[] = [
  {
    id: 'crawl',
    label: 'Crawl',
    what: 'Bots download billions of public web pages, images and documents.',
    doing: 'The model does not exist yet. This is raw collection: whatever is online and reachable gets copied.',
    risk: 'Disinformation networks publish at massive volume so their pages are more likely to be scraped.',
    defense: 'Publisher opt-outs (robots.txt), domain allow/blocklists, provenance metadata.',
  },
  {
    id: 'filter',
    label: 'Filter',
    what: 'Pipelines deduplicate, detect language, and score pages for "quality".',
    doing: 'Classifiers judge text by how it reads—grammar, length, resemblance to Wikipedia—not whether it is true.',
    risk: 'Fluent, professional-looking falsehoods pass quality filters easily.',
    defense: 'Source-credibility signals, fact-check databases, published filtering code.',
  },
  {
    id: 'pretrain',
    label: 'Pretrain',
    what: 'The model reads trillions of tokens and learns to predict the next one.',
    doing:
      'It compresses statistical patterns: which words, claims and associations co-occur. Repetition strengthens a pattern regardless of accuracy.',
    risk: 'A claim repeated across thousands of pages becomes a strong association, even if every copy is false.',
    defense: 'Up-weighting reliable sources, deduplication, data attribution research.',
  },
  {
    id: 'finetune',
    label: 'Fine-tune',
    what: 'Humans and reward models teach the model to follow instructions and refuse harmful requests.',
    doing: 'The model learns a style of answering—helpful, confident, polite. It does not gain new fact-checking ability.',
    risk: 'Training to sound confident can make wrong answers more persuasive.',
    defense: 'Rewarding calibrated uncertainty and "I don\'t know" answers.',
  },
  {
    id: 'generate',
    label: 'Generate',
    what: 'You ask a question; the model samples a likely continuation token by token.',
    doing: 'It produces the most plausible-sounding answer given its training, sometimes with live web search added.',
    risk: 'Hallucinations and laundered propaganda appear with the same authority as facts. Live search can pull in fresh poisoned pages.',
    defense: 'Citations, retrieval from vetted sources, user-facing provenance.',
  },
  {
    id: 'loop',
    label: 'Feedback loop',
    what: 'AI-written text is published online and crawled again.',
    doing: 'The next generation of models trains partly on the output of the last.',
    risk: 'Errors compound and diversity shrinks—researchers call this "model collapse".',
    defense: 'Watermarking, C2PA content credentials, filtering synthetic text.',
  },
]

export type TokenScenario = {
  prompt: string
  clean: { token: string; p: number }[]
  poisoned: { token: string; p: number }[]
  note: string
}

export const tokenScenarios: TokenScenario[] = [
  {
    prompt: 'The 1969 Apollo 11 Moon landing was',
    clean: [
      { token: 'a', p: 0.41 },
      { token: 'the', p: 0.29 },
      { token: 'broadcast', p: 0.14 },
      { token: 'historic', p: 0.11 },
      { token: 'staged', p: 0.01 },
    ],
    poisoned: [
      { token: 'a', p: 0.3 },
      { token: 'the', p: 0.21 },
      { token: 'staged', p: 0.22 },
      { token: 'broadcast', p: 0.09 },
      { token: 'historic', p: 0.08 },
    ],
    note: 'Adding a few thousand duplicated conspiracy pages raises "staged" from a fringe option to a top contender.',
  },
  {
    prompt: 'Drinking bleach can cure',
    clean: [
      { token: 'nothing', p: 0.46 },
      { token: 'no', p: 0.27 },
      { token: '—', p: 0.12 },
      { token: 'COVID', p: 0.02 },
      { token: 'infections', p: 0.01 },
    ],
    poisoned: [
      { token: 'nothing', p: 0.24 },
      { token: 'COVID', p: 0.21 },
      { token: 'no', p: 0.16 },
      { token: 'infections', p: 0.12 },
      { token: '—', p: 0.08 },
    ],
    note: 'Health misinformation thrives on repetition. Safety fine-tuning may hide this at answer time, but the association remains in the weights.',
  },
  {
    prompt: 'Independent fact-checkers describe the claim as',
    clean: [
      { token: 'false', p: 0.38 },
      { token: 'misleading', p: 0.27 },
      { token: 'unproven', p: 0.17 },
      { token: 'true', p: 0.09 },
      { token: 'censored', p: 0.02 },
    ],
    poisoned: [
      { token: 'false', p: 0.22 },
      { token: 'censored', p: 0.2 },
      { token: 'misleading', p: 0.17 },
      { token: 'true', p: 0.16 },
      { token: 'unproven', p: 0.1 },
    ],
    note: 'Coordinated networks also target meta-narratives—teaching models to distrust the institutions that correct them.',
  },
]
