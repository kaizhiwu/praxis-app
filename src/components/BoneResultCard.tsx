import { motion } from 'framer-motion'

export type BoneAttribute = {
  /** Display label, e.g. "Outlet usability" */
  label: string
  /** 0–1 normalized value (drives bar fill width) */
  value: number
  /** 0–1 confidence score */
  confidence: number
  /** Short recency string, e.g. "2d ago" */
  recency: string
}

export type BoneResultData = {
  name: string
  neighborhood: string
  distance: string
  matchScore: number // 0–1
  summary?: string
  attributes: readonly BoneAttribute[]
  /** Optional provenance trail — shown as a footer */
  provenance?: readonly { who: string; when: string; confirmations: number }[]
}

function MatchRing({ score }: { score: number }) {
  const size = 40
  const stroke = 2.5
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - score)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-accent-indigo)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[11px] font-medium tabular-nums text-[var(--color-ink)]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {Math.round(score * 100)}
      </span>
    </div>
  )
}

function AttrRow({ attr, index }: { attr: BoneAttribute; index: number }) {
  const conf = Math.round(attr.confidence * 100)
  const isHigh = attr.confidence >= 0.85
  const isLow = attr.confidence < 0.5

  return (
    <motion.div
      className="space-y-1.5"
      initial={{ opacity: 0, x: -6 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.15 + index * 0.07 }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span
          className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {attr.label}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--color-ink-faint)] tabular-nums">
            {attr.recency}
          </span>
          <span
            className="text-[11px] font-medium tabular-nums"
            style={{
              color: isLow
                ? 'var(--color-accent-coral)'
                : isHigh
                  ? 'var(--color-accent-indigo)'
                  : 'var(--color-ink-secondary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {conf}%
          </span>
        </span>
      </div>
      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--color-taupe)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: isLow
              ? 'var(--color-accent-coral)'
              : isHigh
                ? 'var(--color-accent-indigo)'
                : 'var(--color-ink-tertiary)',
            opacity: isHigh ? 1 : 0.7,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${attr.value * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 + index * 0.08, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

/**
 * BoneResultCard — calm-palette product result card.
 * The same conceptual surface as the /app ResultCard, restyled for the
 * warm bone pitch palette so it can be embedded in TabbedFeature panels
 * as "real product UI" without clashing with the section background.
 */
export function BoneResultCard({ data }: { data: BoneResultData }) {
  return (
    <article className="rounded-2xl bg-[var(--color-bone)] border border-[var(--color-border)] p-6 lg:p-7">
      {/* Header: name + neighborhood + match ring */}
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4
            className="text-xl font-medium text-[var(--color-ink)] tracking-[-0.01em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {data.name}
          </h4>
          <p className="mt-1 text-[12px] text-[var(--color-ink-tertiary)] flex items-center gap-2">
            <span>{data.neighborhood}</span>
            <span className="text-[var(--color-ink-faint)]">·</span>
            <span className="tabular-nums">{data.distance}</span>
          </p>
        </div>
        <div className="shrink-0">
          <MatchRing score={data.matchScore} />
        </div>
      </header>

      {data.summary && (
        <p className="mt-4 text-sm text-[var(--color-ink-secondary)] leading-relaxed">
          {data.summary}
        </p>
      )}

      {/* Attribute bars */}
      <div className="mt-5 space-y-3.5">
        {data.attributes.map((a, i) => (
          <AttrRow key={a.label} attr={a} index={i} />
        ))}
      </div>

      {/* Provenance footer */}
      {data.provenance && data.provenance.length > 0 && (
        <div className="mt-6 pt-5 border-t border-[var(--color-border-subtle)]">
          <p
            className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-tertiary)] mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Provenance · {data.provenance.length}{' '}
            confirmation{data.provenance.length === 1 ? '' : 's'}
          </p>
          <ul className="space-y-1.5">
            {data.provenance.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="flex items-center gap-2 text-[11px] tabular-nums"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="w-3 h-px bg-[var(--color-border)]" aria-hidden />
                <span className="text-[var(--color-ink-secondary)]">{p.who}</span>
                <span className="text-[var(--color-ink-faint)]">{p.when}</span>
                <span className="ml-auto text-[var(--color-ink-tertiary)]">
                  {p.confirmations}× confirmed
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
