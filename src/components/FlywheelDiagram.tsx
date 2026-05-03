import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export type FlywheelStep = {
  label: string
  caption?: string
}

const VIEWBOX_W = 480
const VIEWBOX_H = 320
const NODE_R = 28

const STEP_COLORS = [
  'var(--color-accent-cobalt)',
  'var(--color-accent-magenta)',
  'var(--color-accent-emerald)',
  'var(--color-accent-amber)',
]
const STEP_TINTS = [
  'var(--chip-cobalt)',
  'var(--chip-magenta)',
  'var(--chip-emerald)',
  'var(--chip-amber)',
]

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

// Lemniscate (figure-8 / infinity) path. Parametric form:
//   x = a * cos(t) / (1 + sin²(t))
//   y = a * sin(t) cos(t) / (1 + sin²(t))
// Centered at (cx, cy). a controls the loop size.
const A = 150
const CX = VIEWBOX_W / 2
const CY = VIEWBOX_H / 2

function lemniscatePoint(t: number): { x: number; y: number } {
  const denom = 1 + Math.sin(t) ** 2
  return {
    x: CX + (A * Math.cos(t)) / denom,
    y: CY + (A * Math.sin(t) * Math.cos(t)) / denom,
  }
}

// Node positions — 4 evenly distributed around the lemniscate.
// Picked t values that land on visually distinct lobes.
const NODE_TS = [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75]

// Build a smooth SVG path string tracing the full lemniscate.
function buildPath(): string {
  const STEPS = 120
  const pts: { x: number; y: number }[] = []
  for (let i = 0; i <= STEPS; i++) {
    pts.push(lemniscatePoint((i / STEPS) * Math.PI * 2))
  }
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ')
}

const FULL_PATH = buildPath()

/**
 * FlywheelDiagram — lemniscate (figure-8 / infinity) shaped flow.
 * 4 nodes positioned around the loop. The path traces from previous
 * node to current. Conveys "infinite cycle" more vividly than a circle.
 */
export function FlywheelDiagram({ steps }: { steps: FlywheelStep[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % steps.length)
    }, 2400)
    return () => clearInterval(id)
  }, [steps.length])

  const positions = NODE_TS.map(lemniscatePoint)

  return (
    <div className="relative w-full max-w-[520px] mx-auto" style={{ aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}` }}>
      <svg viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`} className="w-full h-full">
        <defs>
          {STEP_COLORS.map((c, i) => (
            <radialGradient key={`g-${i}`} id={`fw-glow-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={c} stopOpacity="0.18" />
              <stop offset="100%" stopColor={c} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Soft glow behind the active node */}
        <motion.circle
          key={`glow-${active}`}
          cx={positions[active].x}
          cy={positions[active].y}
          r={64}
          fill={`url(#fw-glow-${active % STEP_COLORS.length})`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Full lemniscate guide — faint dashed line */}
        <path
          d={FULL_PATH}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="3 5"
          opacity="0.7"
        />

        {/* Active sweep — re-draws the full path in the active color whenever
            the active step changes. Length ~50% so it reads as a head, not a fill. */}
        <motion.path
          key={`sweep-${active}`}
          d={FULL_PATH}
          fill="none"
          stroke={STEP_COLORS[active % STEP_COLORS.length]}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.5 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            // Position the head so it ends at the active node
            strokeDashoffset: 0,
          }}
        />

        {/* Nodes — each in its own color */}
        {steps.map((step, i) => {
          const { x, y } = positions[i]
          const isActive = i === active
          const stepColor = STEP_COLORS[i % STEP_COLORS.length]
          const stepTint = STEP_TINTS[i % STEP_TINTS.length]
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={NODE_R}
                fill={isActive ? stepTint : 'var(--color-bone)'}
                stroke={isActive ? stepColor : 'var(--color-border)'}
                strokeWidth={isActive ? 2 : 1}
              />

              {isActive && (
                <motion.circle
                  cx={x}
                  cy={y}
                  r={NODE_R}
                  fill="none"
                  stroke={stepColor}
                  strokeWidth="1"
                  initial={{ r: NODE_R, opacity: 0.6 }}
                  animate={{ r: NODE_R + 14, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              <g
                transform={`translate(${x} ${y})`}
                style={{
                  color: isActive ? stepColor : 'var(--color-ink-tertiary)',
                }}
              >
                {STEP_ICONS[i % STEP_ICONS.length]}
              </g>

              {step.caption && (
                <text
                  x={x}
                  y={y + NODE_R + 16}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill={isActive ? stepColor : 'var(--color-ink-tertiary)'}
                  letterSpacing="1.4"
                  fontWeight="500"
                >
                  {step.caption}
                </text>
              )}
            </g>
          )
        })}

        {/* Center label — current step name + step number */}
        <motion.text
          key={`center-num-${active}`}
          x={CX}
          y={CY - 6}
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill={STEP_COLORS[active % STEP_COLORS.length]}
          letterSpacing="2"
          fontWeight="500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          STEP {String(active + 1).padStart(2, '0')} / 04
        </motion.text>
        <motion.text
          key={`center-label-${active}`}
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          fontSize="13"
          fontFamily="var(--font-display)"
          fontWeight="500"
          fill="var(--color-ink)"
          initial={{ opacity: 0, y: CY + 18 }}
          animate={{ opacity: 1, y: CY + 14 }}
          transition={{ duration: 0.4 }}
        >
          {steps[active].label.split('\n')[0]}
        </motion.text>
      </svg>
    </div>
  )
}
