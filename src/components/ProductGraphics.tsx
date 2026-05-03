import { motion } from 'framer-motion'
import { BoneResultCard, type BoneResultData } from './BoneResultCard'

const cardBase = 'rounded-2xl bg-[var(--color-bone)] border border-[var(--color-border)] overflow-hidden'

/**
 * Real-feeling place data for the Answer tab — a complete BoneResultCard
 * showing a place, its top attributes, recency, confidence, and a
 * provenance trail. This is what the actual /app result looks like.
 */
const SAMPLE_RESULT: BoneResultData = {
  name: 'Cafe Luna',
  neighborhood: 'NoHo, NYC',
  distance: '0.3 mi',
  matchScore: 0.92,
  summary:
    'Outlets confirmed working at every seat. Noise level low through afternoon. Laptop-friendly past 3 hours.',
  attributes: [
    { label: 'Outlet usability', value: 0.95, confidence: 0.91, recency: '2d ago' },
    { label: 'Noise level (low)', value: 0.82, confidence: 0.88, recency: '4d ago' },
    { label: 'Laptop tolerance', value: 0.94, confidence: 0.86, recency: '1w ago' },
  ],
  provenance: [
    { who: 'user_47a', when: '2d ago', confirmations: 4 },
    { who: 'user_12f', when: '1w ago', confirmations: 2 },
    { who: 'user_93c', when: '3w ago', confirmations: 1 },
  ],
}

// Layer 01 — Behavioral Place Graph: nodes and edges visualization
export function GraphMockup() {
  const nodes = [
    { x: 50, y: 30, label: 'Cafe Luna', size: 10, accent: true },
    { x: 20, y: 55, label: 'outlets', size: 6 },
    { x: 45, y: 65, label: 'noise: low', size: 6 },
    { x: 75, y: 50, label: 'wifi: fast', size: 6 },
    { x: 30, y: 85, label: 'laptop-ok', size: 5 },
    { x: 65, y: 80, label: 'seating: 40', size: 5 },
    { x: 85, y: 25, label: 'hours', size: 5 },
    { x: 15, y: 25, label: 'vibe: calm', size: 5 },
  ]
  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  ]

  return (
    <div className={`${cardBase} p-6 md:p-8 aspect-[4/3] flex flex-col`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[var(--color-accent-indigo)]" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-tertiary)]">Knowledge Graph</span>
      </div>

      <div className="flex-1 relative">
        <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
          {edges.map(([from, to], i) => (
            <motion.line
              key={i}
              x1={`${nodes[from].x}`} y1={`${nodes[from].y}`}
              x2={`${nodes[to].x}`} y2={`${nodes[to].y}`}
              stroke="var(--color-border)"
              strokeWidth="0.3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            />
          ))}
          {nodes.map((node, i) => (
            <motion.g key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
            >
              <circle
                cx={node.x} cy={node.y} r={node.size / 2}
                fill={node.accent ? 'var(--color-accent-indigo)' : 'var(--color-taupe)'}
                stroke={node.accent ? 'var(--color-accent-indigo)' : 'var(--color-border)'}
                strokeWidth="0.4"
              />
              <text
                x={node.x} y={node.y + node.size / 2 + 4}
                textAnchor="middle"
                fill="var(--color-ink-secondary)"
                fontSize="2.8"
                fontFamily="var(--font-mono)"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>

      <p className="text-[10px] text-[var(--color-ink-faint)] tracking-wider uppercase mt-2">40+ attribute types</p>
    </div>
  )
}

// Layer 02 — Truth Engine: confidence decay over time
export function TruthMockup() {
  const bars = [
    { label: '2 days ago', confidence: 98, color: 'var(--color-accent-indigo)' },
    { label: '1 week', confidence: 91, color: 'var(--color-accent-indigo)' },
    { label: '1 month', confidence: 72, color: 'var(--color-accent-amber)' },
    { label: '3 months', confidence: 48, color: 'var(--color-accent-coral)' },
    { label: '6 months', confidence: 24, color: 'var(--color-accent-coral)' },
  ]

  return (
    <div className={`${cardBase} p-6 md:p-8 aspect-[4/3] flex flex-col`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[var(--color-accent-coral)]" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-tertiary)]">Confidence Decay</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-3">
        {bars.map((bar, i) => (
          <motion.div
            key={bar.label}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            <span className="text-[10px] text-[var(--color-ink-tertiary)] font-mono w-16 shrink-0 text-right">{bar.label}</span>
            <div className="flex-1 h-5 rounded-full bg-[var(--color-taupe)] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: bar.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${bar.confidence}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
              />
            </div>
            <span className="text-[11px] font-mono font-medium text-[var(--color-ink)] w-8 tabular-nums">{bar.confidence}%</span>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] text-[var(--color-ink-faint)] tracking-wider uppercase mt-2">Recency-weighted trust scores</p>
    </div>
  )
}

// Layer 03 — Intent Resolution: query decomposition
export function IntentMockup() {
  const query = '"quiet cafe to work for 3 hours"'
  const attributes = [
    { attr: 'noise_level', op: '=', val: 'low', color: 'var(--color-accent-indigo)' },
    { attr: 'laptop_tolerance', op: '≥', val: '3hr', color: 'var(--color-accent-amber)' },
    { attr: 'outlet_usability', op: '=', val: 'available', color: 'var(--color-accent-indigo)' },
  ]

  return (
    <div className={`${cardBase} p-6 md:p-8 aspect-[4/3] flex flex-col`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[var(--color-accent-amber)]" />
        <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-ink-tertiary)]">Intent Resolution</span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {/* Query */}
        <motion.div
          className="rounded-lg bg-[var(--color-taupe)] px-4 py-3 mb-6"
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-xs text-[var(--color-ink-secondary)] font-mono">{query}</p>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="1.5">
            <path d="M8 0v20M3 16l5 5 5-5" />
          </svg>
        </motion.div>

        {/* Resolved attributes */}
        <div className="space-y-2">
          {attributes.map((a, i) => (
            <motion.div
              key={a.attr}
              className="flex items-center gap-2 rounded-lg bg-white/60 border border-[var(--color-border-subtle)] px-3 py-2"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color }} />
              <span className="text-[11px] font-mono text-[var(--color-ink)]">{a.attr}</span>
              <span className="text-[11px] text-[var(--color-ink-faint)]">{a.op}</span>
              <span className="text-[11px] font-mono font-medium" style={{ color: a.color }}>{a.val}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-[var(--color-ink-faint)] tracking-wider uppercase mt-3">Composable AND/OR/NOT queries</p>
    </div>
  )
}

// Layer 04 — Answer Layer: real product result card with provenance.
// Embeds BoneResultCard, the same surface used elsewhere in the product.
export function AnswerMockup() {
  return <BoneResultCard data={SAMPLE_RESULT} />
}
