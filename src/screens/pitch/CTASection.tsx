import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

export function CTASection({ onContact }: { onContact: () => void }) {
  return (
    <section className="bg-[var(--color-dark-surface)] px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto text-center">
        <motion.h2
          {...fade}
          className="text-3xl md:text-5xl text-center max-w-3xl mx-auto leading-tight text-[var(--color-dark-text)] italic"
          style={{ fontFamily: 'var(--font-wordmark)' }}
        >
          {PITCH.cta.headline}
        </motion.h2>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="text-lg text-[var(--color-dark-muted)] mt-6"
        >
          {PITCH.cta.sub}
        </motion.p>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.12 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {PITCH.cta.points.map((point) => (
            <span
              key={point}
              className="text-xs text-[var(--color-dark-muted)] border border-[rgba(255,255,255,0.12)] rounded-full px-4 py-1.5"
            >
              {point}
            </span>
          ))}
        </motion.div>

        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.18 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-dark-text)] px-8 py-3.5 text-[var(--color-dark-text)] font-medium hover:bg-[var(--color-dark-text)] hover:text-[var(--color-dark-surface)] transition-colors duration-200 cursor-pointer"
          >
            Apply as design partner
          </button>

          <a
            href="/app"
            className="inline-flex items-center gap-2 text-[var(--color-dark-muted)] hover:text-[var(--color-dark-text)] transition-colors duration-200"
          >
            Try the product
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M10 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.24 }}
          className="text-xs text-[var(--color-dark-muted)] mt-6"
        >
          I reply within 24 hours.
        </motion.p>
      </div>
    </section>
  )
}
