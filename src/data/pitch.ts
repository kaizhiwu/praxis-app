export const PITCH = {
  hero: {
    tagline: 'Behavioral Place Intelligence',
    headline: 'The behavioral layer\nmaps won\'t build.',
    sub: 'Structured ground truth about how places actually function. Confidence-scored. Recency-weighted. Created by users, not scraped from reviews.',
    founderNote: 'Designed, engineered, and shipped by a solo founder with AI.',
  },
  problem: {
    title: 'The information asymmetry nobody fixes',
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
        query: '"Cheap dinner East Village"',
        mapsResult: '$$ · "Affordable options!" · Menu photos',
        reality: 'The $6 dumpling deal ended last month. The late-night special is weekdays only.',
        icon: 'dollar',
      },
    ],
    insight: 'Tacit knowledge about places exists — buried in millions of reviews, threads, and posts. Incumbents could structure it, but won\'t prioritize it: behavioral truth is operationally messy, fast-decaying, and not central to ad-driven product architecture. LLMs can parse that ocean, but parsing isn\'t creating. Nobody is generating new ground truth — fresh, structured, confidence-scored behavioral observations confirmed at point of visit. That data asset doesn\'t exist. Praxis creates it.',
  },
  product: {
    title: 'Tacit knowledge, made explicit',
    sub: 'LLMs can parse reviews — but parsing stale data doesn\'t create new ground truth. Praxis provides decision-grade truth: fresh, first-party, confidence-scored behavioral observations confirmed at point of visit.',
    layers: [
      {
        name: 'Behavioral Place Graph',
        description: 'Structured attributes describing what people can actually do in a place. Not reviews. Not LLM inference. Observed ground truth — every claim has provenance: who reported it, when, how many confirmations.',
        detail: '22 attribute types across workability, relief, and savings clusters',
        color: 'indigo',
      },
      {
        name: 'Truth Engine',
        description: 'Confidence decay, contributor trust weighting, contradiction handling. An LLM treats a 2019 review and a 2025 report equally — Praxis doesn\'t. Truth is temporal. Stale knowledge is worse than no knowledge.',
        detail: 'Recency-weighted, trust-scored, provenance-chained',
        color: 'coral',
      },
      {
        name: 'Intent Resolution',
        description: '"Where can I work quietly for 3 hours?" maps to outlet_usability + noise_level + laptop_tolerance. This is a structured database query with precision guarantees, not fuzzy LLM inference that might drop a constraint or hallucinate a match.',
        detail: 'Composable AND/OR/NOT queries across behavioral attributes',
        color: 'amber',
      },
      {
        name: 'Answer Layer',
        description: 'Ranked results with confidence scores, recency indicators, and provenance chains. Same query always returns same results — deterministic, not temperature-dependent. Update latency in milliseconds, not hours.',
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
    sub: 'The Waze model for places. Contributing isn\'t charity — it\'s self-interest. The more you confirm, the better your own results get. Passive signals (time spent, Wi-Fi detection) fill gaps without any taps at all. The graph compounds from usage, not altruism.',
  },
  demo: {
    title: 'See it in action',
    sub: 'Intent-native place intelligence. Type what you need — get structured, trust-scored answers.',
    queries: [
      { text: 'quiet cafe to work from near NYU', delay: 0 },
      { text: 'open restroom near Times Square', delay: 2000 },
      { text: 'cheap late-night food East Village', delay: 4000 },
    ],
  },
  moat: {
    title: 'Counter-positioned by design',
    layers: [
      {
        name: 'Prioritization Gap',
        description: 'Google could add behavioral tags — but won\'t prioritize them. High-resolution, fast-changing, provenance-heavy behavioral truth is operationally messy, category-specific, and not central to their product architecture or monetization model. The rational incumbent response is deprioritization, not inability.',
        icon: 'schema',
      },
      {
        name: 'Fresh First-Party Data',
        description: 'LLMs can parse reviews into structured data — but they can\'t create new observations. The moat isn\'t the query engine. It\'s the only live stream of first-party behavioral ground truth, confirmed by users at the point of visit, with provenance and recency that no training corpus contains.',
        icon: 'database',
      },
      {
        name: 'Trust Compounds',
        description: 'Learned contributor reliability and signal weighting — our PageRank for behavioral observations. The system knows which contributors are accurate, which are stale, and how to weight conflicting signals. Trust compounds; it can\'t be shortcut or scraped.',
        icon: 'shield',
      },
    ],
  },
  risks: {
    title: 'What could kill this',
    items: [
      { risk: 'The bad equilibrium', mitigation: 'Patchy density → low trust → low habit → low contribution → stale data → collapse. The entire bet is that density-first in one neighborhood breaks this cycle before it sets in.' },
      { risk: 'Perishable truth', mitigation: 'Unlike Wikipedia, behavioral claims decay in days. The contribution treadmill is harsher. Passive signals (dwell time, Wi-Fi) and self-interested contribution (Waze model) reduce active burden. But freshness maintenance is the hardest operational problem.' },
      { risk: 'Google adds behavioral tags', mitigation: 'Google could solve 70% of the use case with 10 structured tags. The bet: they won\'t prioritize it — operationally messy, fast-decaying, not central to their architecture. A prioritization gap, not impossibility.' },
      { risk: 'Feature, not company', mitigation: 'The data layer might be useful but too narrow to support an independent business. Prosumer subscription + data licensing are the paths to standalone viability. If not, the data layer has acquisition value.' },
      { risk: 'LLMs close the gap', mitigation: 'A sophisticated hybrid (extraction + temporal weighting + feedback loops) gets surprisingly close. The durable wedge is freshness and provenance from first-party observations, not query architecture.' },
    ],
  },
  notList: {
    title: 'What this is not',
    items: [
      'Not "Google Maps but cooler"',
      'Not a review product',
      'Not another LLM wrapper',
      'Not a venture-scale land grab',
      'Not dependent on a large team to operate',
    ],
  },
  howIBuild: {
    title: 'Why the economics work now',
    sub: 'The traditional VC objection: map and data businesses require large teams and don\'t scale profitably. That objection assumed human-heavy operations.',
    tools: [
      { name: 'Claude', role: 'Architecture, code generation, debugging, content', icon: 'brain' },
      { name: 'Cursor', role: 'AI-powered IDE for rapid iteration', icon: 'code' },
      { name: 'Vercel', role: 'Deploy on push, edge functions, analytics', icon: 'deploy' },
      { name: 'React + TypeScript', role: 'Type-safe frontend with Vite + Tailwind', icon: 'stack' },
    ],
    philosophy: 'AI-native cost structure collapses the break-even point by 10-50x, but low build cost is not a business model. It buys time to prove the three hard things: that the graph stays fresh, that users pay for it, and that it escapes feature-hood. One person can now operate what used to require fifty — that\'s survival runway, not victory.',
    revenue: 'Near-term: prosumer subscription ($5-8/mo) for freelancers and remote workers — live density estimates, workspace alerts, priority data freshness on saved spots. Later: data licensing to commercial real estate, coworking operators, and hospitality platforms.',
  },
  buildVelocity: {
    title: 'Where it stands',
    metrics: [
      { value: '22', label: 'Behavioral attributes', description: 'Proprietary ontology — the language for how places function' },
      { value: '14', label: 'Places mapped', description: 'NYC-dense behavioral data, ready for expansion' },
      { value: '< 2s', label: 'Query-to-answer', description: 'Intent-matched results with confidence scoring' },
      { value: '1', label: 'Headcount', description: 'AI-native cost structure — default alive' },
    ],
  },
  cta: {
    headline: 'The behavioral utility layer starts with one city.',
    sub: 'Looking for early users and design partners in NYC.',
    email: 'kaizhi.j.wu@gmail.com',
    points: [
      'NYC-first, density-first',
      'Looking for design partners — freelancers & remote workers',
      'Default alive — prosumer subscription, not ad revenue',
    ],
  },
} as const
