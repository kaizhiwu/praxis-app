export const PITCH = {
  hero: {
    tagline: 'Behavioral Place Intelligence',
    headline: 'Maps tell you where.\nWe tell you what you can actually do there.',
    sub: 'Places are experience goods — you can\'t know if the outlets work or the restrooms are open until you\'re already there. Praxis converts that tacit knowledge into structured, queryable data.',
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
    insight: 'Google Maps is a merchant-serving platform. Their revenue comes from local ads and business listings. Behavioral truth — "outlets don\'t work," "restrooms require purchase" — undermines the merchants who pay them. This isn\'t a gap they haven\'t noticed. It\'s one they\'re structurally incentivized to maintain.',
  },
  product: {
    title: 'Tacit knowledge, made explicit',
    layers: [
      {
        name: 'Behavioral Place Graph',
        description: 'Structured attributes describing what people can actually do in a place. Not reviews. Not ratings. Externalized tacit knowledge — the things you only learn after visiting.',
        detail: '22 attribute types across workability, relief, and savings clusters',
        color: 'indigo',
      },
      {
        name: 'Truth Engine',
        description: 'Recency decay, contributor weighting, confidence scoring, contradiction handling. Data expires. Truth is temporal. Stale knowledge is worse than no knowledge.',
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
        description: 'Ranked options with tradeoff explanations, confidence indicators, and contribution prompts. Turns experience goods into search goods.',
        detail: 'You know before you go, not after',
        color: 'indigo',
      },
    ],
  },
  flywheel: {
    title: 'Commons-based peer production',
    nodes: [
      { label: 'Users contribute\nbehavioral data', icon: 'users' },
      { label: 'Denser, more accurate\nplace graph', icon: 'graph' },
      { label: 'Better intent-matched\nanswers', icon: 'target' },
      { label: 'Higher trust\n& retention', icon: 'shield' },
    ],
    sub: 'Same production model as Wikipedia and OpenStreetMap. Each contribution makes every future answer better. The graph compounds. This is knowledge infrastructure, not a feature.',
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
        name: 'Structural Conflict',
        description: 'Google Maps monetizes merchants. Behavioral truth often undermines merchant narratives. The incumbent\'s rational response is to do nothing — classic counter-positioning. This gap is permanent, not temporary.',
        icon: 'schema',
      },
      {
        name: 'Knowledge Moat',
        description: 'Structured behavioral data contributed by real users with real needs. Not scraped, not inferred — externalized from lived experience. Time-stamped, confidence-scored, geographically dense. This takes years to rebuild.',
        icon: 'database',
      },
      {
        name: 'Trust Moat',
        description: 'Learned contributor reliability and signal weighting. The system knows which contributors are accurate, which are stale, and how to weight conflicting signals. Trust compounds; it can\'t be shortcut.',
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
      { risk: 'Google copies it', mitigation: 'Counter-positioning: adding behavioral truth would undermine their merchant ad revenue. The rational incumbent response is inaction.' },
    ],
  },
  notList: {
    title: 'What this is not',
    items: [
      'Not "Google Maps but cooler"',
      'Not a review product',
      'Not a social network',
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
    philosophy: 'AI-native cost structure collapses the break-even point by 10-50x. A knowledge commons that once required 50 people to operate can now run with one. This product is default alive — profitable before needing outside capital.',
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
    email: 'kai@kaizhiwu.com',
    points: [
      'NYC-first, density-first',
      'Looking for design partners',
      'Default alive — profitable before outside capital',
    ],
  },
} as const
