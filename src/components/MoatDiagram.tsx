import { motion } from 'framer-motion'

const VBW = 640
const VBH = 380

const STREAM_COLORS = [
  'var(--color-accent-cobalt)',
  'var(--color-accent-magenta)',
  'var(--color-accent-emerald)',
  'var(--color-accent-amber)',
  'var(--color-accent-violet)',
  'var(--color-accent-coral)',
]

// Layout — top to bottom: result-cards, branches, trunk, streams, base.
const TRUNK_X = VBW / 2
const CARD_Y_CENTER = 70   // result-card row top center
const TRUNK_TOP_Y = 160    // where branches converge into trunk
const TRUNK_BASE_Y = 250   // where streams converge into trunk base
const STREAM_BASE_Y = 340  // contribution dots

const STREAMS = STREAM_COLORS.map((color, i) => {
  const total = STREAM_COLORS.length
  const baseX = 70 + (i / (total - 1)) * (VBW - 140)
  const ctrlX = baseX + (TRUNK_X - baseX) * 0.7
  const ctrlY = TRUNK_BASE_Y + 12
  return {
    color,
    path: `M ${baseX} ${STREAM_BASE_Y} Q ${ctrlX} ${ctrlY} ${TRUNK_X} ${TRUNK_BASE_Y}`,
    delay: 0.05 + i * 0.06,
  }
})

// 3 result cards — wider spacing, all at same y for clean alignment.
const CARD_W = 156
const BRANCHES = [
  { x: 130, y: CARD_Y_CENTER, label: 'Cafe Luna',     meta: '92% · outlets · noise',  color: 'var(--color-accent-cobalt)' },
  { x: 320, y: CARD_Y_CENTER, label: 'Sunken Diner',  meta: '89% · restroom · open',  color: 'var(--color-accent-magenta)' },
  { x: 510, y: CARD_Y_CENTER, label: 'Bar Bella',     meta: '94% · dim light',        color: 'var(--color-accent-emerald)' },
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
          const baseX = 70 + (i / (STREAMS.length - 1)) * (VBW - 140)
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

        {/* Trunk label — sits ON the trunk column, vertically centered */}
        <motion.g
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <rect
            x={TRUNK_X - 90}
            y={(TRUNK_TOP_Y + TRUNK_BASE_Y) / 2 - 11}
            width={180}
            height={22}
            rx={11}
            fill="var(--color-bone)"
            stroke="var(--color-accent-cobalt)"
            strokeWidth="1"
          />
          <text
            x={TRUNK_X}
            y={(TRUNK_TOP_Y + TRUNK_BASE_Y) / 2 + 4}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--color-accent-cobalt)"
            letterSpacing="1.6"
            fontWeight="600"
          >
            BEHAVIORAL GRAPH
          </text>
        </motion.g>

        {/* Branches connecting trunk top to bottom of each card */}
        {BRANCHES.map((b, i) => {
          const ctrlX = TRUNK_X + (b.x - TRUNK_X) * 0.5
          const ctrlY = TRUNK_TOP_Y - 30
          const cardBottomY = b.y + 48 // card height = 48
          return (
            <motion.path
              key={`branch-${i}`}
              d={`M ${TRUNK_X} ${TRUNK_TOP_Y} Q ${ctrlX} ${ctrlY} ${b.x} ${cardBottomY}`}
              fill="none"
              stroke={b.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.75"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.75 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.1, ease: 'easeOut' }}
            />
          )
        })}

        {/* Result-card "leaves" — wider, properly aligned text */}
        {BRANCHES.map((b, i) => (
          <motion.g
            key={`leaf-${i}`}
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.2 + i * 0.1 }}
          >
            <rect
              x={b.x - CARD_W / 2}
              y={b.y}
              width={CARD_W}
              height={48}
              rx={10}
              fill="var(--color-bone)"
              stroke={b.color}
              strokeWidth="1.4"
            />
            <text
              x={b.x}
              y={b.y + 19}
              textAnchor="middle"
              fontSize="11.5"
              fontFamily="var(--font-display)"
              fontWeight="500"
              fill="var(--color-ink)"
            >
              {b.label}
            </text>
            <text
              x={b.x}
              y={b.y + 35}
              textAnchor="middle"
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
          x={24}
          y={365}
          fontSize="9"
          fontFamily="var(--font-mono)"
          fill="var(--color-ink-tertiary)"
          letterSpacing="2"
          fontWeight="600"
        >
          CONTRIBUTIONS · POINT-OF-VISIT
        </text>
      </svg>
    </div>
  )
}
