import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export type FlywheelStep = {
  label: string
  caption?: string
}

const VBW = 480
const VBH = 360
const NODE_R = 30
const CX = VBW / 2
const CY = VBH / 2
const RX = 170 // horizontal radius
const RY = 110 // vertical radius (less than RX → wider-than-tall ellipse)

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
  <g key="search" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="0" cy="-2" r="6" />
    <path d="M4.5 2.5L9 7" />
  </g>,
  // 1 — pin (arrival)
  <g key="pin" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0 -8c-3.5 0-6 2.5-6 6 0 4.5 6 11 6 11s6-6.5 6-11c0-3.5-2.5-6-6-6Z" />
    <circle cx="0" cy="-2" r="2" fill="currentColor" />
  </g>,
  // 2 — check (confirm)
  <g key="check" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M-6 0L-2 4L7 -5" />
  </g>,
  // 3 — sparkle (improved result)
  <g key="sparkle" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0 -8v6M0 2v6M-8 0h6M2 0h6" />
    <path d="M-5 -5l3 3M2 2l3 3M-5 5l3 -3M2 -2l3 -3" />
  </g>,
]

// 4 nodes at compass points around an ellipse — clear cardinal layout,
// each with its own caption position that won't collide with the center.
const NODES = [
  { x: CX,         y: CY - RY,    side: 'top' as const },   // 0 — top
  { x: CX + RX,    y: CY,         side: 'right' as const }, // 1 — right
  { x: CX,         y: CY + RY,    side: 'bottom' as const },// 2 — bottom
  { x: CX - RX,    y: CY,         side: 'left' as const },  // 3 — left
]

// Build elliptical guide path between adjacent nodes (clockwise).
function arcBetween(from: number, to: number): string {
  const a = NODES[from]
  const b = NODES[to]
  // Use SVG arc with the ellipse's RX/RY so the line traces the ellipse
  return `M ${a.x} ${a.y} A ${RX} ${RY} 0 0 1 ${b.x} ${b.y}`
}

const ARCS = [
  arcBetween(0, 1),
  arcBetween(1, 2),
  arcBetween(2, 3),
  arcBetween(3, 0),
]

// Caption position offsets so each node's caption sits OUTSIDE the ellipse
function captionPos(node: typeof NODES[number]) {
  switch (node.side) {
    case 'top':    return { x: node.x, y: node.y - NODE_R - 14, anchor: 'middle' as const }
    case 'right':  return { x: node.x + NODE_R + 12, y: node.y + 4, anchor: 'start' as const }
    case 'bottom': return { x: node.x, y: node.y + NODE_R + 22, anchor: 'middle' as const }
    case 'left':   return { x: node.x - NODE_R - 12, y: node.y + 4, anchor: 'end' as const }
  }
}

/**
 * FlywheelDiagram — compass cycle.
 * 4 nodes at N/E/S/W on a wide ellipse, connected by arc segments.
 * Each node's caption sits outside the ellipse (no center collisions).
 * Active arc + active node pulse in the step's accent color.
 */
export function FlywheelDiagram({ steps }: { steps: FlywheelStep[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((v) => (v + 1) % steps.length)
    }, 2400)
    return () => clearInterval(id)
  }, [steps.length])

  const activeColor = STEP_COLORS[active % STEP_COLORS.length]

  return (
    <div className="relative w-full max-w-[520px] mx-auto" style={{ aspectRatio: `${VBW} / ${VBH}` }}>
      <svg viewBox={`0 0 ${VBW} ${VBH}`} className="w-full h-full">
        <defs>
          {STEP_COLORS.map((c, i) => (
            <radialGradient key={`g-${i}`} id={`fw-glow-${i}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={c} stopOpacity="0.16" />
              <stop offset="100%" stopColor={c} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        {/* Center glow */}
        <ellipse cx={CX} cy={CY} rx={RX - 30} ry={RY - 20} fill={`url(#fw-glow-${active % STEP_COLORS.length})`} />

        {/* Faint full-ellipse guide */}
        <ellipse
          cx={CX}
          cy={CY}
          rx={RX}
          ry={RY}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1"
          strokeDasharray="3 5"
          opacity="0.7"
        />

        {/* Active arc — colored segment from the previous node to the current */}
        {(() => {
          const prevIdx = (active - 1 + NODES.length) % NODES.length
          return (
            <motion.path
              key={`arc-${active}`}
              d={ARCS[prevIdx]}
              fill="none"
              stroke={activeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.6 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          )
        })()}

        {/* Center step indicator — fixed position, never collides with captions */}
        <motion.text
          key={`center-num-${active}`}
          x={CX}
          y={CY - 6}
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-mono)"
          fill={activeColor}
          letterSpacing="2"
          fontWeight="600"
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
          fontSize="14"
          fontFamily="var(--font-display)"
          fontWeight="500"
          fill="var(--color-ink)"
          initial={{ opacity: 0, y: CY + 18 }}
          animate={{ opacity: 1, y: CY + 14 }}
          transition={{ duration: 0.4 }}
        >
          {steps[active].label.split('\n')[0]}
        </motion.text>

        {/* Nodes — 4 colored compass points */}
        {steps.map((step, i) => {
          const node = NODES[i]
          if (!node) return null
          const isActive = i === active
          const stepColor = STEP_COLORS[i % STEP_COLORS.length]
          const stepTint = STEP_TINTS[i % STEP_TINTS.length]
          const cap = captionPos(node)
          return (
            <g key={i}>
              {/* Pulse halo on active */}
              {isActive && (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={NODE_R}
                  fill="none"
                  stroke={stepColor}
                  strokeWidth="1"
                  initial={{ r: NODE_R, opacity: 0.6 }}
                  animate={{ r: NODE_R + 14, opacity: 0 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              {/* Node disc */}
              <circle
                cx={node.x}
                cy={node.y}
                r={NODE_R}
                fill={isActive ? stepTint : 'var(--color-bone)'}
                stroke={isActive ? stepColor : 'var(--color-border)'}
                strokeWidth={isActive ? 2 : 1}
              />

              {/* Icon */}
              <g
                transform={`translate(${node.x} ${node.y})`}
                style={{ color: isActive ? stepColor : 'var(--color-ink-tertiary)' }}
              >
                {STEP_ICONS[i % STEP_ICONS.length]}
              </g>

              {/* Caption — positioned OUTSIDE the ellipse per node's compass side */}
              {step.caption && (
                <text
                  x={cap.x}
                  y={cap.y}
                  textAnchor={cap.anchor}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill={isActive ? stepColor : 'var(--color-ink-tertiary)'}
                  letterSpacing="1.4"
                  fontWeight="600"
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
