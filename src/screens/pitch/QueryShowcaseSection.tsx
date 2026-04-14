import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

export function QueryShowcaseSection() {
  const { categories } = PITCH.queryShowcase
  const [activeCategory, setActiveCategory] = useState(0)
  const active = categories[activeCategory]

  return (
    <section className="bg-[var(--color-taupe)] px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-rule mb-6" style={{ background: 'var(--color-taupe-cool)' }} />
        <motion.p {...fade} className="mono-label mb-10">The queries</motion.p>

        {/* Split header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12">
          <motion.h2
            {...fade}
            className="font-semibold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {PITCH.queryShowcase.title}
          </motion.h2>
          <motion.p
            {...fade}
            transition={{ ...fade.transition, delay: 0.06 }}
            className="text-base text-[var(--color-ink-secondary)] leading-relaxed self-end"
          >
            {PITCH.queryShowcase.sub}
          </motion.p>
        </div>

        {/* Category tabs — all monochrome */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className="px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: i === activeCategory ? 'var(--color-bone)' : 'transparent',
                border: `1px solid ${i === activeCategory ? 'var(--color-border)' : 'var(--color-taupe-cool)'}`,
                color: i === activeCategory ? 'var(--color-ink)' : 'var(--color-ink-secondary)',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Query list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-2xl"
          >
            <div className="space-y-3">
              {active.queries.map((query, i) => (
                <motion.div
                  key={query}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-lg bg-[var(--color-bone)] border border-[var(--color-border-subtle)]"
                >
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="var(--color-ink-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="shrink-0"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span className="text-sm text-[var(--color-ink-secondary)]">{query}</span>
                </motion.div>
              ))}
            </div>

            <p className="mono-label mt-8">
              {categories.length} categories &middot; {categories.reduce((sum, c) => sum + c.queries.length, 0)} queries &middot; all answerable with structured observation
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
