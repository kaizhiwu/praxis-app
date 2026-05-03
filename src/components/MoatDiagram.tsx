import { motion } from 'framer-motion'

const VBW = 600
const VBH = 360

const STREAM_COLORS = [
  'var(--color-accent-cobalt)',
  'var(--color-accent-magenta)',
  'var(--color-accent-emerald)',
  'var(--color-accent-amber)',
  'var(--color-accent-violet)',
  'var(--color-accent-coral)',
]

// Six contribution streams curving up from base into central trunk.
// Each stream: starts at evenly-spaced x along bottom, curves into trunk top.
const TRUNK_X = VBW / 2
const TRUNK_TOP_Y = 130
const TRUNK_BASE_Y = 230
const STREAM_BASE_Y = 320

const STREAMS = STREAM_COLORS.map((color, i) => {
  const total = STREAM_COLORS.length
  // Evenly distribute base x positions across the bottom
  const baseX = 60 + (i / (total - 1)) * (VBW - 120)
  // Bezier control point — pulls curve toward center
  const ctrlX = baseX + (TRUNK_X - baseX) * 0.7
  const ctrlY = TRUNK_BASE_Y + 10
  return {
    color,
    path: `M ${baseX} ${STREAM_BASE_Y} Q ${ctrlX} ${ctrlY} ${TRUNK_X} ${TRUNK_BASE_Y}`,
    delay: 0.05 + i * 0.06,
  }
})

// Three result-card branches off the top of the trunk.
const BRANCHES = [
  { x: 130, y: 60, label: 'Cafe Luna', meta: '92% · outlets · noise', color: 'var(--color-accent-cobalt)' },
  { x: 300, y: 40, label: 'Sunken Diner', meta: '89% · restroom · open', color: 'var(--color-accent-magenta)' },
  { x: 470, y: 60, label: 'Bar Bella', meta: '94% · dim light', color: 'var(--color-accent-emerald)' },
]

/**
 * MoatDiagram — organic root-to-canopy flow.
 * Bottom: 6 colored contribution streams curve upward into a central trunk.
 * Top: trunk branches into 3 result cards (the "answers").
 * Replaces the stacked-rectangle layered metaphor with something living.
 */
export function MoatDiagram() {
  return (
    <div className="relative w-full max-w-[680px] mx-auto">
      <svg viewBox={`0 0 ${VBW} ${VBH}`} className="w-full h-auto">
        <defs>
          {/* Trunk gradient — picks up cobalt at top, fades down */}
          <linearGradient id="moat-trunk" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-cobalt)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-ink-tertiary)" stopOpacity="0.4" />
          </linearGradient>
          {/* Glow under trunk */}
          <radialGradient id="moat-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-cobalt)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--color-accent-cobalt)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft glow behind trunk */}
        <ellipse cx={TRUNK_X} cy={(TRUNK_TOP_Y + TRUNK_BASE_Y) / 2} rx={120} ry={80} fill="url(#moat-glow)" />

        {/* Contribution streams (roots) */}
        {STREAMS.map((s, i) => (
          <motion.path
            key={i}
            d={s.path}
            fill="none"
            stroke={s.color}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.85"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: s.delay, ease: 'easeOut' }}
          />
        ))}

        {/* Stream endpoints at base — colored dots */}
        {STREAMS.map((s, i) => {
          const baseX = 60 + (i / (STREAMS.length - 1)) * (VBW - 120)
          return (
            <motion.circle
              key={`base-${i}`}
              cx={baseX}
              cy={STREAM_BASE_Y}
              r={3.5}
              fill={s.color}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: s.delay, ease: 'easeOut' }}
              style={{ transformOrigin: `${baseX}px ${STREAM_BASE_Y}px` }}
            />
          )
        })}

        {/* Trunk — vertical column gathering the streams */}
        <motion.rect
          x={TRUNK_X - 8}
          y={TRUNK_TOP_Y}
          width={16}
          height={TRUNK_BASE_Y - TRUNK_TOP_Y}
          rx={3}
          fill="url(#moat-trunk)"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: `${TRUNK_X}px ${TRUNK_BASE_Y}px` }}
        />

        {/* Trunk label */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <rect
            x={TRUNK_X - 80}
            y={(TRUNK_TOP_Y + TRUNK_BASE_Y) / 2 - 10}
            width={160}
            height={20}
            rx={4}
            fill="var(--color-bone)"
            stroke="var(--color-border)"
          />
          <text
            x={TRUNK_X}
            y={(TRUNK_TOP_Y + TRUNK_BASE_Y) / 2 + 4}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--color-ink)"
            letterSpacing="1.5"
            fontWeight="500"
          >
            BEHAVIORAL GRAPH
          </text>
        </motion.g>

        {/* Branches connecting trunk top to result cards */}
        {BRANCHES.map((b, i) => {
          const ctrlX = TRUNK_X + (b.x - TRUNK_X) * 0.5
          const ctrlY = TRUNK_TOP_Y - 30
          return (
            <motion.path
              key={`branch-${i}`}
              d={`M ${TRUNK_X} ${TRUNK_TOP_Y} Q ${ctrlX} ${ctrlY} ${b.x} ${b.y + 22}`}
              fill="none"
              stroke={b.color}
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.7"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.1, ease: 'easeOut' }}
            />
          )
        })}

        {/* Result-card "leaves" at top */}
        {BRANCHES.map((b, i) => (
          <motion.g
            key={`leaf-${i}`}
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
          >
            <rect
              x={b.x - 75}
              y={b.y}
              width={150}
              height={44}
              rx={8}
              fill="var(--color-bone)"
              stroke={b.color}
              strokeWidth="1.2"
            />
            <text
              x={b.x - 64}
              y={b.y + 18}
              fontSize="11"
              fontFamily="var(--font-display)"
              fontWeight="500"
              fill="var(--color-ink)"
            >
              {b.label}
            </text>
            <text
              x={b.x - 64}
              y={b.y + 32}
              fontSize="9"
              fontFamily="var(--font-mono)"
              fill="var(--color-ink-tertiary)"
              letterSpacing="0.4"
            >
              {b.meta}
            </text>
          </motion.g>
        ))}

        {/* Bottom layer label */}
        <text
          x={20}
          y={345}
          fontSize="9"
          fontFamily="var(--font-mono)"
          fill="var(--color-ink-tertiary)"
          letterSpacing="2"
          fontWeight="500"
        >
          CONTRIBUTIONS · POINT-OF-VISIT
        </text>
      </svg>
    </div>
  )
}
