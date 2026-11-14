export type Citation = {
  id: string
  publisher: string
  title: string
  url: string
  date: string
}

export const citations: Citation[] = [
  {
    id: 'turing',
    publisher: 'The Alan Turing Institute (CETaS)',
    title: 'AI Disinformation Incident Repository: How AI is transforming crisis events',
    url: 'https://www.turing.ac.uk/blog/ai-disinformation-incident-repository-how-ai-transforming-crisis-events',
    date: 'Jun 2, 2026',
  },
  {
    id: 'mit',
    publisher: 'MIT News / MIT Media Lab',
    title: 'The consequences of relying on AI for accurate news',
    url: 'https://news.mit.edu/2026/consequences-of-relying-on-ai-for-accurate-news-0609',
    date: 'Jun 9, 2026',
  },
  {
    id: 'wsu',
    publisher: 'Washington State University',
    title: 'Misinformation efforts shift to target AI ahead of 2026 midterm elections',
    url: 'https://research.wsu.edu/news/misinformation-efforts-shift-to-target-ai-ahead-of-2026-midterm-elections',
    date: 'Oct 28, 2026',
  },
  {
    id: 'anthropic',
    publisher: 'Anthropic Threat Intelligence',
    title: 'Detecting and countering misuse of AI: September 2026',
    url: 'https://www.anthropic.com/threat-intelligence-report-september-2026',
    date: 'Sep 2026',
  },
  {
    id: 'uf',
    publisher: 'University of Florida, College of Journalism',
    title: 'AI and Misinformation (2024 Dean’s Report)',
    url: 'https://2024.jou.ufl.edu/page/ai-and-misinformation',
    date: '2024',
  },
  {
    id: 'pmc',
    publisher: 'JMIR AI (via PubMed Central)',
    title: 'The Dual Nature of AI in Information Dissemination: Ethical Considerations',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11522648',
    date: 'Oct 15, 2024',
  },
  {
    id: 'iaea',
    publisher: 'IAEA Bulletin',
    title: 'Artificial intelligence, misinformation and emergency communication',
    url: 'https://www.iaea.org/bulletin/artificial-intelligence-misinformation-and-emergency-communication',
    date: 'Dec 2025',
  },
  {
    id: 'snhu',
    publisher: 'Southern New Hampshire University',
    title: 'Misinformation vs. Disinformation in the Age of AI',
    url: 'https://www.snhu.edu/about-us/newsroom/education/misinformation-vs-disinformation',
    date: 'Feb 16, 2026',
  },
]

export const citationById = Object.fromEntries(citations.map((c) => [c.id, c])) as Record<string, Citation>

export const incidentsByCountry = [
  { country: 'United States', incidents: 19 },
  { country: 'Iran', incidents: 17 },
  { country: 'United Kingdom', incidents: 12 },
]

export const threatShare = [
  { label: 'Content-generation threats', value: 75 },
  { label: 'Deceptive AI-generated content (38 of 61)', value: 62 },
]

export const chatbotFalsehoodRate = [
  { period: 'Prior year (approx.)', rate: 18, estimated: true },
  { period: 'Latest NewsGuard audit', rate: 35, estimated: false },
]

export const dependencyEffect = [
  { label: 'With AI assistant', change: 21 },
  { label: 'Unassisted, week 4', change: -15 },
]

export const votingAnswers = [
  { label: 'At least one insufficiency', value: 61 },
  { label: 'Contained incorrect information', value: 33 },
]

export type KeyFigure = {
  value: string
  label: string
  source: string
}

export const keyFigures: KeyFigure[] = [
  { value: '3M+', label: 'auto-generated pro-Kremlin articles published to the web in 2024, aimed at AI training and search', source: 'wsu' },
  { value: '10×', label: 'growth in AI-enabled fake news sites during 2023, per NewsGuard', source: 'uf' },
  { value: '8,913', label: 'articles in ~20 languages from one AI-assisted influence network disrupted by Anthropic', source: 'anthropic' },
  { value: '1,000+', label: 'fake X/Twitter accounts managed by a single influence platform, with warm-up logic to look real', source: 'anthropic' },
  { value: '40M', label: 'views on one AI-generated protest video before it could be debunked', source: 'turing' },
  { value: '6 hrs', label: 'after the Southport murders, an AI news aggregator was spreading a false attacker identity', source: 'turing' },
]

export type Finding = {
  source: string
  heading: string
  body: string
}

export const qualitativeFindings: Finding[] = [
  {
    source: 'pmc',
    heading: 'Opaque training data is the root problem',
    body: 'Models are statistical representations of the text they ingest. If training datasets are compromised by disinformation, the system “will inadvertently replicate and perpetuate these flaws.” The authors call dataset transparency possibly the most relevant safeguard.',
  },
  {
    source: 'iaea',
    heading: 'Synthetic images outrun official alerts',
    body: 'During Hurricane Helene (2024), an AI-generated image of a girl clutching a puppy in a rescue boat spread faster than official updates, diverting attention and eroding trust in the response.',
  },
  {
    source: 'snhu',
    heading: 'Hallucination vs. deepfake',
    body: 'A hallucination is an accidental falsehood from a model predicting plausible words; a deepfake is a deliberate deception. Both reach people formatted like facts, which blurs the line between misinformation and disinformation.',
  },
  {
    source: 'turing',
    heading: 'The liar’s dividend',
    body: 'Verified footage from Iranian protests in early 2026 was dismissed by state officials as AI fabrication. The mere existence of convincing fakes now lets real evidence be denied.',
  },
]
