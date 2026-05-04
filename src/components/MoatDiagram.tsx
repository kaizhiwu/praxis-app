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
const CARD_Y_TOP = 50    // result-card top edge
const TRUNK_TOP_Y = 160   // where branches converge into trunk
const TRUNK_BASE_Y = 250  // where streams converge into trunk base
const STREAM_BASE_Y = 340 // contribution dots

const STREAMS = STREAM_COLORS.map((color, i) => {
  const total = STREAM_COLORS.length
  const baseX = 70 + (i / (total - 1)) * (VBW - 140)
  const ctrlX = baseX + (TRUNK_X - baseX) * 0.7
  const ctrlY = TRUNK_BASE_Y + 12
  return {
    color,
    baseX,
    path: `M ${baseX} ${STREAM_BASE_Y} Q ${ctrlX} ${ctrlY} ${TRUNK_X} ${TRUNK_BASE_Y}`,
    delay: 0.05 + i * 0.06,
  }
})

const CARD_W = 156
const CARD_H = 48
const BRANCHES = [
  { x: 130, y: CARD_Y_TOP, label: 'Cafe Luna',    meta: '92% · outlets · noise', color: 'var(--color-accent-cobalt)' },
  { x: 320, y: CARD_Y_TOP, label: 'Sunken Diner', meta: '89% · restroom · open', color: 'var(--color-accent-magenta)' },
  { x: 510, y: CARD_Y_TOP, label: 'Bar Bella',    meta: '94% · dim light',       color: 'var(--color-accent-emerald)' },
]

/**
 * MoatDiagram — organic root-to-canopy flow.
 * Bottom: 6 colored contribution streams curve up into a central trunk.
 * Trunk: pill-bordered "BEHAVIORAL GRAPH" label sits on the column.
 * Top: trunk branches into 3 result-card "leaves".
 *
 * Design rule: TEXT renders at full opacity from first paint; only the
 * stroke paths animate (pathLength). This guarantees text is never
 * temporarily missing if IntersectionObserver / scroll timing wobbles.
 */
export function MoatDiagram() {
  return (
    <div className="relative w-full max-w-[680px] mx-auto">
      <svg viewBox={`0 0 ${VBW} ${VBH}`} className="w-full h-auto">
        <defs>
          <linearGradient id="moat-trunk" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent-cobalt)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--color-ink-tertiary)" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="moat-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-cobalt)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--color-accent-cobalt)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft glow behind trunk */}
        <ellipse cx={TRUNK_X} cy={(TRUNK_TOP_Y + TRUNK_BASE_Y) / 2} rx={120} ry={80} fill="url(#moat-glow)" />

        {/* Contribution streams — paths animate via pathLength only */}
        {STREAMS.map((s, i) => (
          <motion.path
            key={i}
            d={s.path}
            fill="none"
            stroke={s.color}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.85"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: s.delay, ease: 'easeOut' }}
          />
        ))}

        {/* Stream endpoints — visible from first paint */}
        {STREAMS.map((s, i) => (
          <circle
            key={`base-${i}`}
            cx={s.baseX}
            cy={STREAM_BASE_Y}
            r={3.5}
            fill={s.color}
          />
        ))}

        {/* Trunk — full opacity from first paint, scale animation only */}
        <motion.rect
          x={TRUNK_X - 8}
          y={TRUNK_TOP_Y}
          width={16}
          height={TRUNK_BASE_Y - TRUNK_TOP_Y}
          rx={3}
          fill="url(#moat-trunk)"
          initial={{ scaleY: 0.2 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          style={{ transformOrigin: `${TRUNK_X}px ${TRUNK_BASE_Y}px` }}
        />

        {/* Trunk label — rendered immediately, no animation */}
        <g>
          <rect
            x={TRUNK_X - 90}
            y={(TRUNK_TOP_Y + TRUNK_BASE_Y) / 2 - 11}
            width={180}
            height={22}
            rx={11}
            fill="var(--color-bone)"
            stroke="var(--color-accent-cobalt)"
            strokeWidth="1.2"
          />
          <text
            x={TRUNK_X}
            y={(TRUNK_TOP_Y + TRUNK_BASE_Y) / 2 + 4}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--color-accent-cobalt)"
            letterSpacing="1.6"
            fontWeight="700"
          >
            BEHAVIORAL GRAPH
          </text>
        </g>

        {/* Branches — paths animate via pathLength */}
        {BRANCHES.map((b, i) => {
          const ctrlX = TRUNK_X + (b.x - TRUNK_X) * 0.5
          const ctrlY = TRUNK_TOP_Y - 30
          const cardBottomY = b.y + CARD_H
          return (
            <motion.path
              key={`branch-${i}`}
              d={`M ${TRUNK_X} ${TRUNK_TOP_Y} Q ${ctrlX} ${ctrlY} ${b.x} ${cardBottomY}`}
              fill="none"
              stroke={b.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.85"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: 'easeOut' }}
            />
          )
        })}

        {/* Result-card "leaves" — RENDERED IMMEDIATELY at full opacity.
            Text is never invisible at any scroll/timing state. */}
        {BRANCHES.map((b, i) => (
          <g key={`leaf-${i}`}>
            <rect
              x={b.x - CARD_W / 2}
              y={b.y}
              width={CARD_W}
              height={CARD_H}
              rx={10}
              fill="var(--color-bone)"
              stroke={b.color}
              strokeWidth="1.6"
            />
            <text
              x={b.x}
              y={b.y + 20}
              textAnchor="middle"
              fontSize="12"
              fontFamily="var(--font-display)"
              fontWeight="600"
              fill="var(--color-ink)"
            >
              {b.label}
            </text>
            <text
              x={b.x}
              y={b.y + 36}
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="var(--font-mono)"
              fill="var(--color-ink-secondary)"
              letterSpacing="0.4"
              fontWeight="500"
            >
              {b.meta}
            </text>
            {/* Slot index marker — small mono label so cards still read as
                "01/02/03" of an enumerated set */}
            <text
              x={b.x - CARD_W / 2 + 8}
              y={b.y + 12}
              fontSize="8"
              fontFamily="var(--font-mono)"
              fill={b.color}
              letterSpacing="0.5"
              fontWeight="700"
              opacity="0.85"
            >
              {String(i + 1).padStart(2, '0')}
            </text>
          </g>
        ))}

        {/* Bottom layer label — stronger contrast for readability against
            the section's tinted background */}
        <text
          x={24}
          y={365}
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill="var(--color-ink-secondary)"
          letterSpacing="2"
          fontWeight="700"
        >
          CONTRIBUTIONS · POINT-OF-VISIT
        </text>
      </svg>
    </div>
  )
}
