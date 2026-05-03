import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { Section } from '../../components/Section'
import { SkylineSilhouette } from '../../components/SkylineSilhouette'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } as const,
}

export function CTASection({ onContact }: { onContact: () => void }) {
  return (
    <Section id="cta" tone="bone-warm" noRule>
      <div className="text-center max-w-3xl mx-auto">
        <div className="mb-8">
          <SkylineSilhouette />
        </div>
        <motion.h2
          {...fade}
          className="display-lg text-[var(--color-ink)]"
        >
          {PITCH.cta.headline}
        </motion.h2>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="text-[var(--color-ink-secondary)] mt-6"
          style={{ fontSize: 'var(--size-text-lg)' }}
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
              className="text-xs text-[var(--color-ink-tertiary)] border border-[var(--color-border)] rounded-full px-4 py-1.5 bg-[var(--color-bone)]"
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
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-semibold text-white bg-[var(--color-accent-indigo)] hover:bg-[#0F766E] transition-colors duration-200 cursor-pointer"
          >
            Apply as design partner
          </button>

          <a
            href="/app"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors duration-200"
          >
            Try the product
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M10 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.24 }}
          className="text-xs text-[var(--color-ink-tertiary)] mt-6"
        >
          I reply within 24 hours.
        </motion.p>
      </div>
    </Section>
  )
}
