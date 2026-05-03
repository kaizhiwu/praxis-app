import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

export type TabbedFeatureTab = {
  id: string
  /** Short tab label — e.g. "Graph" */
  label: string
  /** Display heading for the panel */
  title: string
  /** Supporting paragraph */
  description: string
  /** Single-line caption (italic, faint) */
  detail?: string
  /** Right-side media — typically a product mockup or screenshot */
  media: ReactNode
}

type Props = {
  tabs: TabbedFeatureTab[]
  /** Layout: image-right is default; flip with mediaFirst for alt rows */
  mediaSide?: 'right' | 'left'
}

/**
 * TabbedFeature — Hebbia's "Purpose-built for Finance" archetype.
 * One headline section, N tabs, each tab swaps the right-side media + the
 * text panel beneath. Replaces the old pin-and-scrub for ProductSection.
 *
 * Hebbia rules applied:
 * - No carousel autoplay (decisions, not entertainment).
 * - State change is discrete (fade), not cinematic.
 * - Persistent tab strip is the navigation surface.
 */
export function TabbedFeature({ tabs, mediaSide = 'right' }: Props) {
  const [activeId, setActiveId] = useState(tabs[0].id)
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0]
  const activeIndex = tabs.findIndex((t) => t.id === activeId)

  return (
    <div className="mt-12">
      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Product capabilities"
        className="relative flex flex-wrap gap-1 border-b border-[var(--color-border)]"
      >
        {tabs.map((tab, i) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className="relative px-4 sm:px-5 py-3 text-sm transition-colors duration-200 cursor-pointer outline-none focus-visible:text-[var(--color-ink)]"
              style={{
                color: isActive ? 'var(--color-ink)' : 'var(--color-ink-tertiary)',
                fontWeight: isActive ? 500 : 400,
              }}
            >
              <span className="font-mono text-[10px] tracking-wider mr-2 opacity-60">
                {String(i + 1).padStart(2, '0')}
              </span>
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute left-0 right-0 -bottom-px h-px bg-[var(--color-ink)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Panel — keyed by active.id so React remounts on swap.
          Animate uses `key` for reset; initial=false skips first-mount fade so
          headless capture and SSR don't strand at opacity 0. */}
      <div className="pt-12 lg:pt-16">
        <motion.div
          key={active.id}
          id={`panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${active.id}`}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
            mediaSide === 'left' ? 'lg:[&>div:first-child]:order-2' : ''
          }`}
        >
            {/* Text column — 5 of 12 cols on desktop */}
            <div className="lg:col-span-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-indigo)] mb-4">
                {String(activeIndex + 1).padStart(2, '0')} / {String(tabs.length).padStart(2, '0')}
              </p>
              <h3 className="display-md text-[var(--color-ink)]">
                {active.title}
              </h3>
              <p
                className="mt-5 text-[var(--color-ink-secondary)] leading-relaxed max-w-md"
                style={{ fontSize: 'var(--size-text-lg)' }}
              >
                {active.description}
              </p>
              {active.detail && (
                <p className="mt-4 text-sm text-[var(--color-ink-tertiary)] italic">
                  {active.detail}
                </p>
              )}
            </div>

            {/* Media column — 7 of 12 cols on desktop.
                Media components are responsible for their own framing. */}
            <div className="lg:col-span-7">
              {active.media}
            </div>
        </motion.div>
      </div>
    </div>
  )
}
