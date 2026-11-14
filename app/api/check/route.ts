import { NextResponse } from 'next/server'

type GoogleClaimReview = {
  publisher?: { name?: string }
  title?: string
  url?: string
  reviewDate?: string
  textualRating?: string
}

type GoogleClaim = {
  text?: string
  claimant?: string
  claimDate?: string
  claimReview?: GoogleClaimReview[]
}

type GoogleResponse = {
  claims?: GoogleClaim[]
}

function isHttpUrl(value: string) {
  try {
    const url = new URL(value)
    return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  if (!process.env.GOOGLE_FACT_CHECK_API_KEY) {
    return NextResponse.json(
      { error: 'Fact-check results are not configured yet. Add a Google Fact Check Tools API key to the deployment.' },
      { status: 503 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request must contain valid JSON.' }, { status: 400 })
  }

  if (typeof body !== 'object' || body === null || !('claim' in body) || !('link' in body)) {
    return NextResponse.json({ error: 'Provide an article link and a claim to check.' }, { status: 400 })
  }

  const { claim, link } = body
  if (typeof claim !== 'string' || claim.trim().length < 8 || claim.trim().length > 500) {
    return NextResponse.json({ error: 'The claim must be between 8 and 500 characters.' }, { status: 400 })
  }
  if (typeof link !== 'string' || link.length > 2048 || !isHttpUrl(link)) {
    return NextResponse.json({ error: 'Provide a valid public article link.' }, { status: 400 })
  }

  const apiUrl = new URL('https://factchecktools.googleapis.com/v1alpha1/claims:search')
  apiUrl.searchParams.set('query', claim.trim())
  apiUrl.searchParams.set('languageCode', 'en')
  apiUrl.searchParams.set('key', process.env.GOOGLE_FACT_CHECK_API_KEY)

  let response: Response
  try {
    response = await fetch(apiUrl, { signal: AbortSignal.timeout(10_000), cache: 'no-store' })
  } catch (error) {
    console.error('Google Fact Check API request failed:', error)
    return NextResponse.json({ error: 'The fact-check service could not be reached. Please try again.' }, { status: 502 })
  }

  if (!response.ok) {
    console.error(`Google Fact Check API returned HTTP ${response.status}`)
    return NextResponse.json({ error: 'The fact-check service returned an error. Please try again later.' }, { status: 502 })
  }

  let data: GoogleResponse
  try {
    data = (await response.json()) as GoogleResponse
  } catch (error) {
    console.error('Google Fact Check API returned invalid JSON:', error)
    return NextResponse.json({ error: 'The fact-check service returned an unreadable response.' }, { status: 502 })
  }

  const results = (Array.isArray(data.claims) ? data.claims : []).slice(0, 10).map((item) => ({
    text: item.text ?? 'Claim text unavailable',
    claimant: item.claimant ?? null,
    claimDate: item.claimDate ?? null,
    reviews: (item.claimReview ?? []).flatMap((review) => {
      if (typeof review.url !== 'string' || !isHttpUrl(review.url)) return []
      return [{
        publisher: review.publisher?.name ?? 'Unknown publisher',
        title: review.title ?? 'Fact-check review',
        url: review.url,
        reviewDate: review.reviewDate ?? null,
        rating: review.textualRating ?? '',
      }]
    }),
  }))

  return NextResponse.json({ results })
}
