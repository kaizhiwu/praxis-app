export const PITCH = {
  heroMockup: {
    query: 'quiet cafe to work from',
    place: 'Think Coffee',
    neighborhood: 'NoHo, NYC',
    distance: '0.3 mi',
    matchScore: 92,
    attributes: [
      { label: 'Outlet usability', value: 0.88, confidence: 0.91 },
      { label: 'Noise level (low)', value: 0.75, confidence: 0.84 },
      { label: 'Laptop tolerance', value: 0.95, confidence: 0.89 },
    ],
  },
  whoItsFor: {
    eyebrow: 'Who it\'s for',
    headline: 'Two roles. One shared graph.',
    personas: [
      {
        title: 'Searchers',
        description: 'People who need real answers about places before they go. Not star ratings. Structured, confidence-scored behavioral attributes — does this cafe have working outlets? Is it actually quiet?',
        tags: ['Intent search', 'Confidence scores', 'Recency-weighted'],
      },
      {
        title: 'Contributors',
        description: 'People who visit places and confirm what\'s true. One-tap observations at point of visit. Your contributions improve your own future results — self-interest, not charity.',
        tags: ['Point-of-visit', 'Self-interest', 'Trust compounds'],
      },
    ],
  },
  hero: {
    tagline: 'Behavioral Place Intelligence',
    headline: 'The behavioral layer\nmaps won\'t build.',
    sub: 'Google Maps tells you what\'s there. Its AI can summarize reviews. Praxis tells you what\'s actually true — from structured observation, not inference.',
    founderNote: 'Solo founder. AI-native.',
  },
  problem: {
    title: 'Maps answer "where." They don\'t answer "will it work."',
    stories: [
      {
        query: '"Cafe to work from near me"',
        mapsResult: '4.2 ★ · 847 reviews · "Great lattes!"',
        reality: 'No outlets. Loud music. 45-min purchase policy. You left in 20 minutes.',
        icon: 'laptop',
      },
      {
        query: '"Open restroom nearby"',
        mapsResult: '3 coffee shops, 2 restaurants, 1 park',
        reality: 'Two require a purchase. One is closed. The park restroom is locked after 6pm.',
        icon: 'droplet',
      },
      {
        query: '"Good first date spot — dim lighting, easy to find"',
        mapsResult: '4.5 ★ · "Romantic ambiance!" · $$$',
        reality: 'Blinding overhead lights. Entrance is through an unmarked alley. You both stood outside for 10 minutes.',
        icon: 'heart',
      },
    ],
    insight: 'This knowledge exists — scattered across reviews, Reddit threads, and local memory. But it\'s never been structured, and no map product is designed to capture it. Praxis does: fresh, structured, confirmed at point of visit.',
  },
  product: {
    title: 'Structured behavioral data, not review summaries',
    sub: 'The difference between "4.5 stars, great vibes" and "outlets work, noise is low, laptop-friendly for 3+ hours, confirmed Tuesday." One is a sentiment. The other is a decision.',
    layers: [
      {
        name: 'Behavioral Place Graph',
        description: 'A structured knowledge graph of what people can actually do in a place — transparent, auditable, and queryable. Every claim has provenance: who reported it, when, and how many confirmations. Not an embedding. Not a training corpus. A graph you can inspect.',
        detail: '40+ attribute types across work, dating, photo, comfort, access, vibe, food, and seasonal clusters',
        color: 'indigo',
      },
      {
        name: 'Truth Engine',
        description: 'Behavioral facts decay. A cafe\'s outlet situation changes. Praxis applies confidence decay, contributor trust weighting, and contradiction handling — so stale data gets flagged, not served as current.',
        detail: 'Recency-weighted, trust-scored, provenance-chained',
        color: 'coral',
      },
      {
        name: 'Intent Resolution',
        description: '"Where can I work quietly for 3 hours?" maps to outlet_usability + noise_level + laptop_tolerance. A structured query with precision, not a keyword match that might miss a constraint.',
        detail: 'Composable AND/OR/NOT queries across behavioral attributes',
        color: 'amber',
      },
      {
        name: 'Answer Layer',
        description: 'Transparent, auditable answers — not a black-box score. Every result shows its provenance chain: who confirmed it, when, how many times, and how confidence was calculated. You can inspect the evidence, not just trust the number.',
        detail: 'You know before you go, not after',
        color: 'indigo',
      },
    ],
  },
  flywheel: {
    title: 'Contribute by using it',
    nodes: [
      { label: 'Search for a\nplace that fits', icon: 'users' },
      { label: 'Go there.\nPraxis detects arrival.', icon: 'graph' },
      { label: 'One-tap confirm:\n"Still quiet? Outlets work?"', icon: 'target' },
      { label: 'Your data improves\nyour own future results', icon: 'shield' },
    ],
    sub: 'The Waze model applied to places. Passive signals — dwell time, Wi-Fi detection, visit frequency — fill gaps automatically. Active confirmations layer on top. The graph gets denser with every visit, not just every tap.',
  },
  queryShowcase: {
    title: 'What people actually want to know about a place',
    sub: 'Every query below maps to structured behavioral attributes — outlet availability, noise level, lighting quality, stroller access — observed and confirmed by real visitors at point of visit. Google\'s AI will attempt these from review fragments. Praxis answers from direct observation.',
    categories: [
      {
        name: 'Work & Productivity',
        icon: 'laptop',
        queries: [
          'Outlets that actually work near Union Square',
          'Laptop-friendly cafe that won\'t kick me out after an hour',
          'Quiet enough for a phone call in Midtown',
          'Reliable fast Wi-Fi, not "has Wi-Fi"',
          'Standing-friendly counter space for working',
        ],
      },
      {
        name: 'Photo & Content',
        icon: 'camera',
        queries: [
          'Good red wall to take pictures in front of',
          'Colorful Instagrammable spot that feels quirky',
          'Natural golden-hour light for portraits',
          'Neon sign or moody lighting for reels',
          'Rooftop with skyline backdrop, no ticket required',
        ],
      },
      {
        name: 'Dating & Social',
        icon: 'heart',
        queries: [
          'Good first date lighting — dim, flattering',
          'Easy to find entrance, not awkward',
          'Can linger without pressure to order more',
          'Impressive without trying too hard',
          'Walk-friendly neighborhood after for "let\'s keep going"',
        ],
      },
      {
        name: 'Solo & Comfort',
        icon: 'user',
        queries: [
          'Bathroom without purchase required',
          'Safe to sit alone and read for hours',
          'Comfortable solo dining — bar seating, not awkward 2-tops',
          'Good people-watching spot',
          'Won\'t judge me for staying 3 hours with one coffee',
        ],
      },
      {
        name: 'Parenting & Access',
        icon: 'accessible',
        queries: [
          'Stroller accessible — actually, not just "ADA compliant"',
          'Changing table that isn\'t disgusting',
          'Kid noise tolerance — won\'t get glares',
          'Enclosed outdoor area so toddler won\'t bolt',
          'Sensory-calm — low stimulation, no loud music',
        ],
      },
      {
        name: 'Vibe & Mood',
        icon: 'sparkle',
        queries: [
          'Feels expensive but isn\'t',
          'Feels like a local spot, not a tourist trap',
          'Cozy when raining',
          '"Third place" energy — regulars, barista knows names',
          'Late-night safe — well-lit, staffed, not sketchy',
        ],
      },
      {
        name: 'Food Truth',
        icon: 'utensils',
        queries: [
          'Is the $6 dumpling deal still active?',
          'Portion actually shareable for two people',
          'Tastes like the photo, not a catfish menu',
          'Happy hour that\'s actually worth it, not $2 off',
          'Dietary accommodations that are real, not performative',
        ],
      },
      {
        name: 'Seasonal & Temporal',
        icon: 'clock',
        queries: [
          'Heated outdoor seating that\'s actually warm',
          'AC that works in August, not decorative',
          'Outdoor area with real shade, not baking sun',
          'Sunset view with exact timing window',
          'Cherry blossom visible from seating',
        ],
      },
    ],
  },
  demo: {
    title: 'See it in action',
    sub: 'Type what you need — get structured, confidence-scored answers about places.',
    queries: [
      { text: 'quiet cafe to work from near NYU', delay: 0 },
      { text: 'Instagrammable red wall in SoHo', delay: 2000 },
      { text: 'good first date spot — dim, easy entrance', delay: 4000 },
      { text: 'open restroom near Times Square no purchase', delay: 6000 },
      { text: 'feels expensive but isn\'t, Lower East Side', delay: 8000 },
    ],
  },
  moat: {
    title: 'Why this isn\'t easy to replicate',
    layers: [
      {
        name: 'The prioritization gap',
        description: 'Google has already added AI to Maps — it runs retrieval-augmented generation over reviews and business listings. But RAG over scraped text is not a knowledge graph. It has no provenance chain, hallucinates under ambiguity, and can\'t confirm what\'s true today. The deeper bet: high-resolution behavioral data that decays in days and requires first-party observation stays deprioritized — not because Google can\'t build it, but because the operational cost doesn\'t justify the ROI within their ad architecture.',
        icon: 'schema',
      },
      {
        name: 'First-party observations',
        description: 'LLMs can extract behavioral signals from reviews — and they\'re getting good at it. But extraction from scraped text isn\'t observation. Praxis builds a proprietary dataset from real human contributions: confirmed at point of visit, provenance-chained, recency-weighted. This data doesn\'t exist in any training corpus and can\'t be replicated by crawling.',
        icon: 'database',
      },
      {
        name: 'Learned contributor trust',
        description: 'Over time, the system learns which contributors are reliable, which are stale, and how to weight conflicting signals. This trust graph gets more accurate with scale — it\'s hard to bootstrap from scratch and not available to scrape.',
        icon: 'shield',
      },
    ],
  },
  risks: {
    title: 'What could kill this',
    items: [
      { risk: 'Cold start / bad equilibrium', mitigation: 'Low density leads to low trust, low habit, and stale data. The entire bet is that going density-first in one neighborhood breaks this cycle before it compounds.' },
      { risk: 'Perishable truth', mitigation: 'Unlike reference data, behavioral facts decay in days. The contribution treadmill is harsh. Passive signals (dwell time, Wi-Fi) and self-interested contribution reduce the active burden — but freshness maintenance is the hardest operational problem.' },
      { risk: 'Google adds behavioral tags', mitigation: 'Google could solve 70% of the use case with 10 structured tags. The bet: they deprioritize it — operationally messy, fast-decaying, peripheral to their core product. A prioritization gap, not an impossibility.' },
      { risk: 'Feature, not company', mitigation: 'The data layer might be useful but too narrow to support an independent business. Prosumer subscription + data licensing are the paths to standalone viability. If neither works, the data layer still has acquisition value.' },
      { risk: 'LLMs close the gap', mitigation: 'A sophisticated hybrid — extraction + temporal weighting + feedback loops — gets surprisingly close on query quality. But it still lacks provenance, hallucinates under ambiguity, and can\'t confirm what\'s true today. The durable wedge is the proprietary observation graph, not the query architecture.' },
    ],
  },
  notList: {
    title: 'What this is not',
    items: [
      'Not a Google Maps competitor — a different data layer',
      'Not a review product',
      'Not an LLM wrapper',
      'Not a venture-scale land grab',
      'Not dependent on a large team',
    ],
  },
  howIBuild: {
    title: 'Why the economics work now',
    sub: 'The traditional objection: map and data businesses need large teams and don\'t scale profitably. That assumed human-heavy operations.',
    tools: [
      { name: 'Claude', role: 'Architecture, code generation, debugging, content', icon: 'brain' },
      { name: 'Cursor', role: 'AI-powered IDE for rapid iteration', icon: 'code' },
      { name: 'Vercel', role: 'Deploy on push, edge functions, analytics', icon: 'deploy' },
      { name: 'React + TypeScript', role: 'Type-safe frontend with Vite + Tailwind', icon: 'stack' },
    ],
    philosophy: 'AI collapses the break-even point by 10-50x, but low build cost isn\'t a business model. It buys time to prove three hard things: that the graph stays fresh, that users pay for it, and that it escapes feature-hood. One person can now operate what used to require a team — that\'s survival runway, not victory.',
    revenue: 'Near-term: prosumer subscription ($5-8/mo) for freelancers and remote workers — live density estimates, workspace alerts, priority freshness on saved spots. Later: data licensing to commercial real estate, coworking operators, and hospitality platforms.',
  },
  buildVelocity: {
    title: 'Where it stands',
    metrics: [
      { value: '40+', label: 'Behavioral attributes', description: 'Across work, dating, photo, comfort, access, vibe, food, and seasonal clusters' },
      { value: '14', label: 'Places mapped', description: 'NYC-dense behavioral data, expanding neighborhood by neighborhood' },
      { value: '< 2s', label: 'Query-to-answer', description: 'Structured graph retrieval with full provenance — not LLM inference' },
      { value: '1', label: 'Headcount', description: 'AI-native operations — solo founder' },
    ],
  },
  cta: {
    headline: 'Starting with one neighborhood. Growing from there.',
    sub: 'Looking for early users and design partners in NYC.',
    email: 'kaizhi.j.wu@gmail.com',
    twitter: 'https://x.com/kaizhi_wu',
    substack: 'https://substack.com/@kaizhiwu',
    points: [
      'NYC-first, density-first',
      'Looking for design partners — freelancers & remote workers',
      'Prosumer subscription, not ad revenue',
    ],
  },
} as const
