import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export type FlywheelStep = {
  label: string
  caption?: string
}

const RADIUS = 145
const NODE_R = 30
const VIEWBOX = 380

const STEP_ICONS = [
  // 0 — search
  <g key="search" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="0" cy="-2" r="6" />
    <path d="M4.5 2.5L9 7" />
  </g>,
  // 1 — pin (arrival)
  <g key="pin" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0 -8c-3.5 0-6 2.5-6 6 0 4.5 6 11 6 11s6-6.5 6-11c0-3.5-2.5-6-6-6Z" />
    <circle cx="0" cy="-2" r="2" fill="currentColor" />
  </g>,
  // 2 — check (confirm)
  <g key="check" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M-6 0L-2 4L7 -5" />
  </g>,
  // 3 — sparkle (improved result)
  <g key="sparkle" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0 -8v6M0 2v6M-8 0h6M2 0h6" />
    <path d="M-5 -5l3 3M2 2l3 3M-5 5l3 -3M2 -2l3 -3" />
  </g>,
]

function nodePos(i: number, total: number) {
  // Start at top (12 o'clock), go clockwise
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2
  return {
    x: VIEWBOX / 2 + RADIUS * Math.cos(angle),
    y: VIEWBOX / 2 + RADIUS * Math.sin(angle),
  }
}

/**
 * FlywheelDiagram — animated SVG cycle showing the 4 contribution loop steps.
 * The active node pulses; the connecting arc highlights from previous to active.
 * Uses currentColor so it inherits the text color of its container.
 */
export function FlywheelDiagram({ steps }: { steps: FlywheelStep[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % steps.length)
    }, 2200)
    return () => clearInterval(id)
  }, [steps.length])

  const positions = steps.map((_, i) => nodePos(i, steps.length))

  return (
    <div className="relative w-full max-w-[460px] mx-auto aspect-square">
      <svg viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} className="w-full h-full text-[var(--color-ink-secondary)]">
        <defs>
          <radialGradient id="fw-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent-indigo)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--color-accent-indigo)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Center glow */}
        <circle cx={VIEWBOX / 2} cy={VIEWBOX / 2} r={RADIUS - 10} fill="url(#fw-center)" />

        {/* Outer cycle ring (faint guide) */}
        <circle
          cx={VIEWBOX / 2}
          cy={VIEWBOX / 2}
          r={RADIUS}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* Active arc — sweeps from previous node to current */}
        {(() => {
          const prev = (active - 1 + steps.length) % steps.length
          const startAngle = (prev / steps.length) * 360 - 90
          const endAngle = (active / steps.length) * 360 - 90
          const largeArc = endAngle - startAngle > 180 ? 1 : 0
          const x1 = VIEWBOX / 2 + RADIUS * Math.cos((startAngle * Math.PI) / 180)
          const y1 = VIEWBOX / 2 + RADIUS * Math.sin((startAngle * Math.PI) / 180)
          const x2 = VIEWBOX / 2 + RADIUS * Math.cos((endAngle * Math.PI) / 180)
          const y2 = VIEWBOX / 2 + RADIUS * Math.sin((endAngle * Math.PI) / 180)
          return (
            <motion.path
              key={active}
              d={`M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`}
              fill="none"
              stroke="var(--color-accent-indigo)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.7 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          )
        })()}

        {/* Center label — current step */}
        <motion.text
          key={`center-${active}`}
          x={VIEWBOX / 2}
          y={VIEWBOX / 2 - 6}
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill="var(--color-ink-tertiary)"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          STEP {String(active + 1).padStart(2, '0')}
        </motion.text>
        <motion.text
          key={`label-${active}`}
          x={VIEWBOX / 2}
          y={VIEWBOX / 2 + 18}
          textAnchor="middle"
          fontSize="13"
          fontFamily="var(--font-display)"
          fontWeight="500"
          fill="var(--color-ink)"
          initial={{ opacity: 0, y: VIEWBOX / 2 + 22 }}
          animate={{ opacity: 1, y: VIEWBOX / 2 + 18 }}
          transition={{ duration: 0.4 }}
        >
          {steps[active].label.split('\n')[0]}
        </motion.text>

        {/* Nodes */}
        {steps.map((step, i) => {
          const { x, y } = positions[i]
          const isActive = i === active
          return (
            <g key={i}>
              {/* Static node circle */}
              <circle
                cx={x}
                cy={y}
                r={NODE_R}
                fill="var(--color-bone)"
                stroke={isActive ? 'var(--color-accent-indigo)' : 'var(--color-border)'}
                strokeWidth={isActive ? 2 : 1}
              />

              {/* Active pulse halo */}
              {isActive && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={NODE_R}
                  fill="none"
                  stroke="var(--color-accent-indigo)"
                  strokeWidth="1"
                  initial={{ r: NODE_R, opacity: 0.6 }}
                  animate={{ r: NODE_R + 14, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              {/* Icon */}
              <g
                transform={`translate(${x} ${y})`}
                style={{
                  color: isActive
                    ? 'var(--color-accent-indigo)'
                    : 'var(--color-ink-tertiary)',
                }}
              >
                {STEP_ICONS[i % STEP_ICONS.length]}
              </g>

              {/* Outside label */}
              {step.caption && (
                <text
                  x={x}
                  y={y + NODE_R + 18}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill={isActive ? 'var(--color-ink)' : 'var(--color-ink-tertiary)'}
                  letterSpacing="1.4"
                >
                  {step.caption}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
