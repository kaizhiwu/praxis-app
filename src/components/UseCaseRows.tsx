import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

export type UseCaseRowItem = {
  /** Stable key */
  id: string
  /** Lucide-style icon name (mapped below) */
  icon: string
  /** Use-case title — e.g. "Work & Productivity" */
  name: string
  /** One-line summary, sentence case, no period optional */
  description: string
  /** Up to 3 representative example items shown right-aligned. */
  examples: string[]
}

const ICONS: Record<string, ReactNode> = {
  laptop: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M2 20h20" />
    </>
  ),
  camera: (
    <>
      <path d="M3 7h3l2-2h8l2 2h3a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  heart: (
    <>
      <path d="M20.5 8.6a4.5 4.5 0 00-7.6-3.2L12 6.3l-.9-.9A4.5 4.5 0 003.5 8.6c0 5 8.5 10.4 8.5 10.4s8.5-5.4 8.5-10.4z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  accessible: (
    <>
      <circle cx="12" cy="4" r="1.5" />
      <path d="M9 10h6l-1 4 3 6" />
      <path d="M9 10v6a4 4 0 004 4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      <path d="M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" />
    </>
  ),
  utensils: (
    <>
      <path d="M5 3v8a2 2 0 002 2v8M9 3v8a2 2 0 01-2 2" />
      <path d="M7 3v8" />
      <path d="M19 3a3 3 0 00-3 3v6h2v9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
}

function Icon({ name }: { name: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICONS[name] ?? null}
    </svg>
  )
}

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
}

/**
 * UseCaseRows — Hebbia's "use case" archetype adapted for Praxis.
 * One headline section, N tight rows. Each row: icon + name+description on
 * the left, two representative examples on the right (mono, faint).
 *
 * Tabular rhythm: every row identical, the repetition is the proof.
 */
export function UseCaseRows({ items }: { items: UseCaseRowItem[] }) {
  return (
    <ul className="mt-12 border-t border-[var(--color-border)]">
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          {...fade}
          transition={{
            duration: 0.35,
            delay: Math.min(i * 0.04, 0.32),
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start py-6 lg:py-7 border-b border-[var(--color-border)]"
        >
          {/* Icon — col 1 */}
          <div className="lg:col-span-1 flex items-start">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bone-warm)] border border-[var(--color-border-subtle)] text-[var(--color-ink-secondary)]">
              <Icon name={item.icon} />
            </span>
          </div>

          {/* Name + description — col 5 */}
          <div className="lg:col-span-5">
            <h3 className="text-lg font-medium text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              {item.name}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-ink-tertiary)] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Examples — col 6, right-aligned mono list */}
          <div className="lg:col-span-6">
            <ul className="space-y-1.5">
              {item.examples.map((ex, j) => (
                <li
                  key={j}
                  className="text-[13px] text-[var(--color-ink-secondary)] leading-snug font-mono"
                >
                  <span className="text-[var(--color-ink-faint)] mr-2">›</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}
