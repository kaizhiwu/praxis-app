import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const icons: Record<string, React.ReactNode> = {
  users: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="6" r="3" />
      <path d="M1 17v-1a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1" />
      <circle cx="14.5" cy="6.5" r="2.5" />
      <path d="M16 12.5a3.5 3.5 0 0 1 3 3.5v1" />
    </svg>
  ),
  graph: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="5" r="2" />
      <circle cx="15" cy="5" r="2" />
      <circle cx="10" cy="15" r="2" />
      <path d="M7 5h6M6.5 6.5L9 13.5M13.5 6.5L11 13.5" />
    </svg>
  ),
  target: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8" />
      <circle cx="10" cy="10" r="5" />
      <circle cx="10" cy="10" r="2" />
    </svg>
  ),
  shield: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 1L3 5v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V5l-7-4z" />
      <path d="M7 10l2 2 4-4" />
    </svg>
  ),
}

const nodeColors = ['#4F46E5', '#E2614B', '#D97706', '#4F46E5']

// Node positions for circular layout (top, right, bottom, left)
// Positions are based on a unit circle, scaled per viewport
const nodeAngles = [
  { angle: -90, labelX: 0, labelY: -42 },   // top
  { angle: 0, labelX: 42, labelY: 0 },       // right
  { angle: 90, labelX: 0, labelY: 42 },      // bottom
  { angle: 180, labelX: -42, labelY: 0 },    // left
]

function getNodePos(index: number, radius: number, cx: number, cy: number) {
  const rad = (nodeAngles[index].angle * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  }
}

function buildArcPath(
  fromIdx: number,
  toIdx: number,
  radius: number,
  cx: number,
  cy: number,
) {
  const from = getNodePos(fromIdx, radius, cx, cy)
  const to = getNodePos(toIdx, radius, cx, cy)
  // Use the circle radius for the arc
  return `M ${from.x} ${from.y} A ${radius} ${radius} 0 0 1 ${to.x} ${to.y}`
}

export function FlywheelSection() {
  const nodes = PITCH.flywheel.nodes
  // SVG viewBox is 480x480, CSS scales it
  const size = 480
  const cx = size / 2
  const cy = size / 2
  const orbitRadius = 170

  const arcs = [0, 1, 2, 3].map((i) => ({
    path: buildArcPath(i, (i + 1) % 4, orbitRadius, cx, cy),
    color: nodeColors[i],
    nextColor: nodeColors[(i + 1) % 4],
    idx: i,
  }))

  return (
    <section id="flywheel" className="bg-[#09090B] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-bold text-white text-center mb-16"
        >
          {PITCH.flywheel.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto w-[320px] h-[320px] md:w-[480px] md:h-[480px]"
        >
          {/* Radial glow */}
          <div
            className="absolute inset-0 rounded-full opacity-[0.07]"
            style={{
              background: 'radial-gradient(circle, #4F46E5 0%, transparent 70%)',
            }}
          />

          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-full"
            fill="none"
          >
            <defs>
              {arcs.map((arc) => (
                <linearGradient
                  key={`grad-${arc.idx}`}
                  id={`arc-grad-${arc.idx}`}
                  gradientUnits="userSpaceOnUse"
                  x1={getNodePos(arc.idx, orbitRadius, cx, cy).x}
                  y1={getNodePos(arc.idx, orbitRadius, cx, cy).y}
                  x2={getNodePos((arc.idx + 1) % 4, orbitRadius, cx, cy).x}
                  y2={getNodePos((arc.idx + 1) % 4, orbitRadius, cx, cy).y}
                >
                  <stop offset="0%" stopColor={arc.color} />
                  <stop offset="100%" stopColor={arc.nextColor} />
                </linearGradient>
              ))}
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <path d="M0 0L8 3L0 6" fill="#9CA3AF" fillOpacity="0.6" />
              </marker>
            </defs>

            {/* Arc paths with draw-in animation */}
            {arcs.map((arc) => (
              <motion.path
                key={`arc-${arc.idx}`}
                d={arc.path}
                stroke={`url(#arc-grad-${arc.idx})`}
                strokeWidth={1.5 + arc.idx * 0.4}
                strokeLinecap="round"
                fill="none"
                opacity={0.5 + arc.idx * 0.12}
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 + arc.idx * 0.12 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  pathLength: {
                    delay: 0.3 + arc.idx * 0.25,
                    duration: 0.8,
                    ease: 'easeOut',
                  },
                  opacity: {
                    delay: 0.3 + arc.idx * 0.25,
                    duration: 0.3,
                  },
                }}
              />
            ))}

            {/* Nodes */}
            {nodes.map((node, i) => {
              const pos = getNodePos(i, orbitRadius, cx, cy)
              const color = nodeColors[i]
              const labelPos = nodeAngles[i]

              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    delay: 0.5 + i * 0.25,
                    duration: 0.5,
                    ease: 'easeOut',
                  }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                >
                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="24"
                    fill="#141416"
                    stroke={color}
                    strokeWidth="1.5"
                  />

                  {/* Icon */}
                  <foreignObject
                    x={pos.x - 10}
                    y={pos.y - 10}
                    width="20"
                    height="20"
                  >
                    <div
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      {...({ xmlns: 'http://www.w3.org/1999/xhtml' } as any)}
                      className="w-5 h-5"
                      style={{ color }}
                    >
                      {icons[node.icon]}
                    </div>
                  </foreignObject>

                  {/* Label */}
                  {node.label.split('\n').map((line, li) => {
                    const isTop = labelPos.labelY < 0
                    const isBottom = labelPos.labelY > 0
                    const isLeft = labelPos.labelX < 0
                    const isRight = labelPos.labelX > 0

                    let tx = pos.x + labelPos.labelX
                    let ty = pos.y + labelPos.labelY + li * 16
                    let anchor: 'start' | 'middle' | 'end' = 'middle'

                    if (isTop) {
                      ty = pos.y - 36 + li * 16
                    } else if (isBottom) {
                      ty = pos.y + 42 + li * 16
                    } else if (isLeft) {
                      tx = pos.x - 36
                      ty = pos.y - 6 + li * 16
                      anchor = 'end'
                    } else if (isRight) {
                      tx = pos.x + 36
                      ty = pos.y - 6 + li * 16
                      anchor = 'start'
                    }

                    return (
                      <text
                        key={li}
                        x={tx}
                        y={ty}
                        textAnchor={anchor}
                        fill="#9CA3AF"
                        fontSize="12"
                        fontFamily="system-ui, sans-serif"
                      >
                        {line}
                      </text>
                    )
                  })}
                </motion.g>
              )
            })}
          </svg>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="text-[#9CA3AF] text-center max-w-lg mx-auto mt-8 leading-relaxed"
        >
          {PITCH.flywheel.sub}
        </motion.p>
      </div>
    </section>
  )
}
