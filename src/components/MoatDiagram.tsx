import { motion } from 'framer-motion'

const CONTRIB_DOTS = [
  { x: 30, y: 220, delay: 0 },
  { x: 70, y: 230, delay: 0.1 },
  { x: 110, y: 218, delay: 0.2 },
  { x: 150, y: 232, delay: 0.05 },
  { x: 190, y: 222, delay: 0.15 },
  { x: 230, y: 230, delay: 0.25 },
  { x: 270, y: 218, delay: 0.1 },
  { x: 310, y: 228, delay: 0.2 },
  { x: 350, y: 222, delay: 0.05 },
  { x: 390, y: 232, delay: 0.18 },
  { x: 430, y: 220, delay: 0.12 },
  { x: 470, y: 228, delay: 0.22 },
]

const GRAPH_NODES = [
  { x: 80, y: 130, r: 4, accent: false },
  { x: 130, y: 100, r: 5, accent: false },
  { x: 180, y: 140, r: 6, accent: false },
  { x: 240, y: 110, r: 8, accent: true },
  { x: 290, y: 150, r: 5, accent: false },
  { x: 340, y: 95, r: 4, accent: false },
  { x: 390, y: 130, r: 5, accent: false },
  { x: 440, y: 110, r: 4, accent: false },
]

const GRAPH_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [5, 6], [6, 7], [3, 1], [3, 5], [2, 4],
]

/**
 * MoatDiagram — three layers stacked top-to-bottom:
 *   bottom: many tiny contribution dots → 12 points feeding upward
 *   middle: graph network (8 nodes, 10 edges, 1 accented)
 *   top: answer card outline pulling from the graph
 *
 * Shows visually what compound moat the text describes.
 */
export function MoatDiagram() {
  return (
    <div className="relative w-full max-w-[640px] mx-auto">
      <svg viewBox="0 0 520 280" className="w-full h-auto">
        {/* TOP — answer card outline */}
        <motion.g
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <rect
            x="160"
            y="10"
            width="200"
            height="48"
            rx="8"
            fill="var(--color-bone)"
            stroke="var(--color-accent-indigo)"
            strokeWidth="1.2"
          />
          <text
            x="180"
            y="30"
            fontSize="11"
            fontFamily="var(--font-display)"
            fontWeight="500"
            fill="var(--color-ink)"
          >
            Cafe Luna · 92% match
          </text>
          <text
            x="180"
            y="46"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--color-ink-tertiary)"
            letterSpacing="0.5"
          >
            outlets · noise · laptop · 4× confirmed
          </text>
        </motion.g>

        {/* Down arrow from graph to answer */}
        <motion.path
          d="M 240 110 L 240 60"
          stroke="var(--color-accent-indigo)"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{ transform: 'scaleY(-1)', transformOrigin: '240px 85px' }}
        />

        {/* MIDDLE — graph network */}
        <g>
          {/* Edges first */}
          {GRAPH_EDGES.map(([a, b], i) => (
            <motion.line
              key={`e-${i}`}
              x1={GRAPH_NODES[a].x}
              y1={GRAPH_NODES[a].y}
              x2={GRAPH_NODES[b].x}
              y2={GRAPH_NODES[b].y}
              stroke="var(--color-border)"
              strokeWidth="0.8"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.04 }}
            />
          ))}
          {/* Nodes */}
          {GRAPH_NODES.map((n, i) => (
            <motion.circle
              key={`n-${i}`}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={n.accent ? 'var(--color-accent-indigo)' : 'var(--color-ink-tertiary)'}
              opacity={n.accent ? 1 : 0.6}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: n.accent ? 1 : 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
          ))}
          {/* Layer label */}
          <text
            x="20"
            y="116"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--color-ink-tertiary)"
            letterSpacing="2"
          >
            BEHAVIORAL GRAPH
          </text>
        </g>

        {/* Vertical arrows from contributions to graph (3 sample lines) */}
        {[110, 240, 370].map((x, i) => (
          <motion.path
            key={`arrow-${i}`}
            d={`M ${x} 220 L ${x} 165`}
            stroke="var(--color-ink-faint)"
            strokeWidth="0.8"
            strokeDasharray="2 3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
          />
        ))}

        {/* BOTTOM — contributions row */}
        <g>
          {CONTRIB_DOTS.map((d, i) => (
            <motion.circle
              key={`c-${i}`}
              cx={d.x}
              cy={d.y}
              r="3"
              fill="var(--color-ink-secondary)"
              opacity="0.5"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: d.delay }}
              style={{ transformOrigin: `${d.x}px ${d.y}px` }}
            />
          ))}
          <text
            x="20"
            y="265"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--color-ink-tertiary)"
            letterSpacing="2"
          >
            CONTRIBUTIONS · POINT-OF-VISIT
          </text>
        </g>
      </svg>
    </div>
  )
}
