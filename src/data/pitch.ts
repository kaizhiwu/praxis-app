export const PITCH = {
  hero: {
    tagline: 'Behavioral Place Intelligence',
    headline: 'Maps tell you where.\nWe tell you what you can actually do there.',
    sub: 'Praxis is building the system of record for how physical places actually function — queryable by intent, scored by trust, updated by the people who use them.',
    founderNote: 'Designed, engineered, and shipped by a solo founder with AI.',
  },
  problem: {
    title: 'The data gap nobody owns',
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
    insight: 'Places have two identities: what businesses say (merchant identity) and how they actually function for your specific need (behavioral utility). Maps digitized the first. Nobody has digitized the second.',
  },
  product: {
    title: 'Four layers of truth',
    layers: [
      {
        name: 'Behavioral Place Graph',
        description: 'Structured attributes describing what people can actually do in a place under real conditions. Not reviews. Not ratings. Structured, queryable behavioral data.',
        detail: '14+ attribute types across workability, relief, and savings clusters',
        color: 'indigo',
      },
      {
        name: 'Truth Engine',
        description: 'Recency decay, contributor weighting, confidence scoring, contradiction handling, fraud detection. Data expires. Truth is temporal.',
        detail: 'Confidence scores that literally fade as data gets stale',
        color: 'coral',
      },
      {
        name: 'Query Layer',
        description: 'Natural language intent matching. Not keyword search — behavioral intent understanding. "Where can I work quietly for 3 hours?" maps to outlet_usability + noise_level + laptop_tolerance.',
        detail: 'Intent-native, not keyword-native',
        color: 'amber',
      },
      {
        name: 'Answer Layer',
        description: 'Ranked options with tradeoff explanations, confidence indicators, and contribution prompts. Answers, not listings.',
        detail: 'Shows you why, not just what',
        color: 'indigo',
      },
    ],
  },
  flywheel: {
    title: 'The compounding loop',
    nodes: [
      { label: 'Users contribute\nbehavioral data', icon: 'users' },
      { label: 'Denser, more accurate\nplace graph', icon: 'graph' },
      { label: 'Better intent-matched\nanswers', icon: 'target' },
      { label: 'Higher trust\n& retention', icon: 'shield' },
    ],
    sub: 'Each contribution makes every future answer better. The graph compounds. Incumbents can\'t replicate years of structured behavioral data.',
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
    title: 'Three layers of defensibility',
    layers: [
      {
        name: 'Ontology Moat',
        description: 'Proprietary schema for place utility. 14+ behavioral attribute types that don\'t exist in any public dataset. We defined the language for how places function.',
        icon: 'schema',
      },
      {
        name: 'Data Moat',
        description: 'Structured, local, high-frequency utility data that\'s hard to rebuild. Not scraped — contributed by real users with real needs. Time-stamped, confidence-scored, geographically dense.',
        icon: 'database',
      },
      {
        name: 'Trust Moat',
        description: 'Learned contributor reliability and signal weighting. Our trust engine knows which contributors are accurate, which are stale, and how to weight conflicting signals. This takes years to build.',
        icon: 'shield',
      },
    ],
  },
  risks: {
    title: 'What could kill this',
    items: [
      { risk: 'Cold start density', mitigation: 'City-first, intent-first. Win one neighborhood before expanding.' },
      { risk: 'Data decay', mitigation: 'Aggressive recency scoring. Stale data is visually marked. Contribution prompts at point of need.' },
      { risk: 'Contribution fatigue', mitigation: 'Binary questions only. 2-tap confirmations. Zero friction.' },
      { risk: 'Incumbent copying', mitigation: 'Google can add outlet data. They can\'t build a trust-weighted behavioral graph with community verification overnight.' },
    ],
  },
  notList: {
    title: 'What this is not',
    items: [
      'Not "Google Maps but cooler"',
      'Not a review product',
      'Not a social network',
      'Not a creator-economy play',
      'Not a chatbot company',
    ],
  },
  howIBuild: {
    title: 'Why this is possible now',
    sub: 'AI-native development means one person can ship what used to take a team.',
    tools: [
      { name: 'Claude', role: 'Architecture, code generation, debugging, content', icon: 'brain' },
      { name: 'Cursor', role: 'AI-powered IDE for rapid iteration', icon: 'code' },
      { name: 'Vercel', role: 'Deploy on push, edge functions, analytics', icon: 'deploy' },
      { name: 'React + TypeScript', role: 'Type-safe frontend with Vite + Tailwind', icon: 'stack' },
    ],
    philosophy: 'Everything you see on this site — the product, the data model, the pitch — was built by one person using these tools. The constraint isn\'t headcount. It\'s clarity of vision.',
  },
  buildVelocity: {
    title: 'Where it stands',
    metrics: [
      { value: '14+', label: 'Behavioral attributes', description: 'Proprietary ontology for place utility' },
      { value: '3', label: 'Attribute clusters', description: 'Workability, Relief, Savings' },
      { value: '< 2s', label: 'Query-to-answer', description: 'Intent-matched results with confidence scoring' },
      { value: '1', label: 'Founder', description: 'Solo — design, engineering, product, strategy' },
    ],
  },
  cta: {
    headline: 'The behavioral utility layer for places starts with one city.',
    sub: 'Looking for early users and design partners in NYC.',
    email: 'kai@kaizhiwu.com',
    points: [
      'NYC-first, density-first',
      'Looking for design partners',
      'Built by one founder with AI',
    ],
  },
} as const
