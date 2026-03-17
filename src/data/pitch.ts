export const PITCH = {
  hero: {
    tagline: 'Behavioral Place Intelligence',
    headline: 'Maps tell you what a place is.\nWe tell you what it will actually let you do.',
    sub: 'A trust-weighted graph of how physical places actually function — restroom access, outlet usability, laptop tolerance, noise levels, markdown windows — queryable by intent.',
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
  market: {
    title: 'Market opportunity',
    tam: { value: '$48B', label: 'Global location intelligence & local search', description: 'Location-based services, local advertising, place data APIs' },
    sam: { value: '$12B', label: 'Urban place discovery & intent-based local search', description: 'Dense-city users making utility-driven place decisions' },
    som: { value: '$800M', label: 'US top-10 metro behavioral utility queries', description: 'Freelancers, students, commuters, travelers in NYC, SF, LA, Chicago...' },
    wedge: 'Start with one city. One use case. Win density before breadth.',
  },
  businessModel: {
    title: 'Staged monetization',
    stages: [
      { phase: 'Phase 1', name: 'Build trust & density', revenue: 'Free', timeline: 'Year 1', description: 'Win one city. Establish contribution loops. No aggressive monetization.' },
      { phase: 'Phase 2', name: 'Premium consumer', revenue: '$4.99/mo', timeline: 'Year 2', description: 'Saved intents, advanced filters, priority results, offline access.' },
      { phase: 'Phase 3', name: 'Merchant tools', revenue: 'SaaS', timeline: 'Year 2-3', description: 'Verified utility profiles, analytics dashboard, attribute management.' },
      { phase: 'Phase 4', name: 'Sponsored discovery', revenue: 'CPC/CPM', timeline: 'Year 3+', description: 'After trust is established. Native, non-intrusive placement.' },
      { phase: 'Phase 5', name: 'Data & API', revenue: 'Enterprise', timeline: 'Year 3+', description: 'Travel, hospitality, urban tech, mobility, real estate verticals.' },
    ],
    unitEconomics: {
      cac: '$3.20',
      cacNote: 'Ambassador-driven, campus/neighborhood seeding',
      ltv: '$47',
      ltvNote: 'Blended: free users (ad-supported) + premium subscribers',
      ratio: '14.7x',
      ratioNote: 'LTV/CAC — healthy even at conservative assumptions',
      payback: '< 3 months',
      paybackNote: 'Premium conversion within first 90 days of active use',
    },
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
    title: 'What could kill us',
    items: [
      { risk: 'Cold start density', mitigation: 'City-first, intent-first. Win one neighborhood before expanding.' },
      { risk: 'Data decay', mitigation: 'Aggressive recency scoring. Stale data is visually marked. Contribution prompts at point of need.' },
      { risk: 'Contribution fatigue', mitigation: 'Binary questions only. 2-tap confirmations. Zero friction.' },
      { risk: 'Incumbent copying', mitigation: 'Google can add outlet data. They can\'t build a trust-weighted behavioral graph with community verification overnight.' },
    ],
  },
  notList: {
    title: 'What we are not',
    items: [
      'Not "Google Maps but cooler"',
      'Not a review product',
      'Not a social network',
      'Not a creator-economy play',
      'Not a chatbot company',
    ],
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
  team: {
    title: 'Team',
    members: [
      {
        name: 'Kai Wu',
        role: 'Founder',
        bio: 'Building the behavioral utility layer for physical places.',
        url: 'https://kaizhiwu.com',
        twitter: 'https://x.com/kaizhi_wu',
        highlights: ['Cornell University', 'Full-stack engineer', 'NYC-based'],
      },
    ],
  },
  traction: {
    title: 'Early signals',
    metrics: [
      { value: '14+', label: 'Behavioral attribute types', description: 'Proprietary ontology defining place utility' },
      { value: '6', label: 'NYC places mapped', description: 'High-fidelity prototype with real behavioral data' },
      { value: '3', label: 'Attribute clusters', description: 'Workability, Relief, Savings — structured for intent matching' },
      { value: '< 2s', label: 'Query-to-answer', description: 'Intent-matched results with confidence scoring' },
    ],
  },
  cta: {
    headline: "We're building the system of record for how places actually function.",
    sub: 'Raising pre-seed. Let\'s talk.',
    email: 'kai@kaizhiwu.com',
    points: [
      'Pre-seed round open',
      'Solo founder, full-stack',
      'NYC-first, density-first',
    ],
  },
} as const
