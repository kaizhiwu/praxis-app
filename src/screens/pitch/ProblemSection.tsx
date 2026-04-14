import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

const icons: Record<string, React.ReactNode> = {
  laptop: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 16h18" />
    </svg>
  ),
  droplet: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2C10 2 4 9 4 12.5a6 6 0 0 0 12 0C16 9 10 2 10 2z" />
    </svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.68 3.57a4.5 4.5 0 00-6.36 0L10 3.89l-.32-.32a4.5 4.5 0 00-6.36 6.36l.32.32L10 16.61l6.36-6.36.32-.32a4.5 4.5 0 000-6.36z" />
    </svg>
  ),
}

export function ProblemSection() {
  return (
    <section id="problem" className="bg-[var(--color-bone-warm)] px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-rule mb-6" />
        <motion.p {...fade} className="mono-label mb-10">The problem</motion.p>

        <motion.h2
          {...fade}
          className="font-semibold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)] max-w-2xl mb-16"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {PITCH.problem.title}
        </motion.h2>

        {/* Story cards */}
        <div className="space-y-4">
          {PITCH.problem.stories.map((story, i) => (
            <motion.div
              key={i}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.06 }}
              className="rounded-xl bg-[var(--color-bone)] border border-[var(--color-border-subtle)] p-8"
            >
              <div className="text-[var(--color-accent-coral)] mb-4">{icons[story.icon]}</div>

              <p className="text-xl font-medium text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
                &ldquo;{story.query.replace(/^"|"$/g, '')}&rdquo;
              </p>

              <div className="mt-6">
                <p className="mono-label mb-1">What Maps says</p>
                <p className="text-[var(--color-ink-tertiary)] line-through decoration-[var(--color-ink-faint)]">
                  {story.mapsResult}
                </p>
              </div>

              <div className="section-rule my-5" />

              <div>
                <p className="mono-label mb-1">What actually happened</p>
                <p className="text-[var(--color-ink)] font-medium">{story.reality}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insight */}
        <motion.blockquote
          {...fade}
          transition={{ ...fade.transition, delay: 0.24 }}
          className="border-l-2 border-[var(--color-accent-indigo)] pl-6 mt-16"
        >
          <p className="text-lg text-[var(--color-ink-secondary)] italic leading-relaxed">{PITCH.problem.insight}</p>
        </motion.blockquote>
      </div>
    </section>
  )
}
