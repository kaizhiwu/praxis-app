import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

export function WhoItsForSection({ onContact }: { onContact: () => void }) {
  const { whoItsFor } = PITCH

  return (
    <section className="bg-[var(--color-bone)] px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-rule mb-6" />
        <motion.p {...fade} className="mono-label mb-10">Who it&apos;s for</motion.p>

        {/* Split header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12">
          <motion.h2
            {...fade}
            className="font-light text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {whoItsFor.headline}
          </motion.h2>
          <motion.p
            {...fade}
            transition={{ ...fade.transition, delay: 0.06 }}
            className="text-base text-[var(--color-ink-secondary)] leading-relaxed self-end"
          >
            Searchers get structured answers. Contributors improve their own results by confirming what&apos;s true.
          </motion.p>
        </div>

        {/* Persona cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {whoItsFor.personas.map((persona, i) => (
            <motion.div
              key={persona.title}
              {...fade}
              transition={{ ...fade.transition, delay: 0.06 + i * 0.06 }}
              className="rounded-xl bg-[var(--color-bone-warm)] p-8"
            >
              <h3
                className="font-medium text-xl text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {persona.title}
              </h3>
              <p className="text-[var(--color-ink-secondary)] leading-relaxed mt-3">{persona.description}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {persona.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-ink-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.24 }} className="mt-10">
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-2.5 text-sm text-[var(--color-ink-secondary)] hover:border-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors duration-200 cursor-pointer"
          >
            Apply as design partner
          </button>
        </motion.div>
      </div>
    </section>
  )
}
