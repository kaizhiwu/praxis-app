import { motion } from 'framer-motion'

export type ProofMetric = {
  value: string
  label: string
  description?: string
  /** Optional inline glyph rendered above the number — for cells that
      benefit from a tiny visualization (e.g., a place-density map). */
  glyph?: React.ReactNode
}

const VALUE_ACCENTS = [
  'var(--deep-cobalt)',
  'var(--deep-magenta)',
  'var(--deep-emerald)',
  'var(--deep-amber)',
]

// 14 dots scattered across an abstract NYC silhouette — pairs with the
// "Places mapped" stat to give it geographic grounding.
const NYC_DOTS = [
  { x: 24, y: 26 }, { x: 30, y: 18 }, { x: 36, y: 30 },
  { x: 42, y: 22 }, { x: 38, y: 38 }, { x: 50, y: 30 },
  { x: 56, y: 22 }, { x: 62, y: 32 }, { x: 70, y: 26 },
  { x: 32, y: 50 }, { x: 44, y: 52 }, { x: 60, y: 48 },
  { x: 28, y: 62 }, { x: 50, y: 64 },
]

export function PlacesMappedGlyph() {
  return (
    <svg
      viewBox="0 0 100 80"
      className="w-[80px] h-[64px]"
      aria-hidden
    >
      {/* NYC outline — abstract, no real shape */}
      <path
        d="M 14 18 Q 22 12 32 16 L 48 12 Q 60 14 70 22 L 78 32 Q 82 42 78 52 L 70 64 Q 60 70 48 68 L 32 66 Q 22 64 16 56 L 12 44 Q 10 30 14 18 Z"
        fill="var(--color-bone-warm)"
        stroke="var(--color-border)"
        strokeWidth="0.6"
      />
      {NYC_DOTS.map((d, i) => (
        <motion.circle
          key={i}
          cx={d.x}
          cy={d.y}
          r="1.4"
          fill="var(--color-accent-indigo)"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, delay: 0.3 + i * 0.04, ease: 'easeOut' }}
          style={{ transformOrigin: `${d.x}px ${d.y}px` }}
        />
      ))}
    </svg>
  )
}

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
}

/**
 * ProofBand — Hebbia's "scale stats" archetype.
 * 3–4 oversized numbers in a row, tabular figures, hairline dividers
 * between cells. Lives between sections as a punctuation mark.
 */
export function ProofBand({ metrics }: { metrics: ProofMetric[] }) {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] border-y border-[var(--color-border)]">
      {metrics.map((m, i) => (
        <motion.li
          key={m.label}
          {...fade}
          transition={{ duration: 0.35, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
          className="bg-[var(--color-bone)] p-6 lg:p-8 relative"
        >
          {m.glyph && (
            <div className="absolute top-4 right-4 opacity-90 pointer-events-none">
              {m.glyph}
            </div>
          )}
          <p
            className="display-md tabular-nums"
            style={{ fontWeight: 500, color: VALUE_ACCENTS[i % VALUE_ACCENTS.length] }}
          >
            {m.value}
          </p>
          <p className="mt-2 text-sm font-medium text-[var(--color-ink)]">
            {m.label}
          </p>
          {m.description && (
            <p className="mt-1.5 text-[12px] text-[var(--color-ink-tertiary)] leading-relaxed">
              {m.description}
            </p>
          )}
        </motion.li>
      ))}
    </ul>
  )
}
