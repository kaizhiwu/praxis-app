import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { BeamsBackground } from '../../components/BeamsBackground'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

export function MoatSection() {
  const layers = PITCH.moat.layers

  return (
    <BeamsBackground className="px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="h-px bg-[rgba(255,255,255,0.08)] mb-6" />
        <motion.p {...fade} className="mono-label mb-10 !text-[var(--color-dark-muted)]">Defensibility</motion.p>

        <motion.h2
          {...fade}
          className="font-semibold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-dark-text)] max-w-2xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {PITCH.moat.title}
        </motion.h2>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="text-[var(--color-dark-muted)] text-sm mb-12 max-w-lg"
        >
          Three structural advantages that get stronger with scale.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Featured card */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
            className="md:row-span-2 rounded-xl p-8 md:p-10 bg-[rgba(255,255,255,0.04)] border border-[var(--color-accent-indigo)]/20 backdrop-blur-sm"
          >
            <h3 className="font-medium text-2xl text-[var(--color-dark-text)] mt-2 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {layers[0].name}
            </h3>
            <p className="text-[var(--color-dark-muted)] leading-relaxed">{layers[0].description}</p>
          </motion.div>

          {/* Smaller cards */}
          {layers.slice(1).map((layer, i) => (
            <motion.div
              key={layer.name}
              {...fade}
              transition={{ ...fade.transition, delay: 0.16 + i * 0.06 }}
              className="rounded-xl p-8 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] backdrop-blur-sm"
            >
              <h3 className="font-medium text-xl text-[var(--color-dark-text)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                {layer.name}
              </h3>
              <p className="text-sm text-[var(--color-dark-muted)] leading-relaxed">{layer.description}</p>
            </motion.div>
          ))}
        </div>

        {/* What this is not */}
        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.3 }} className="mt-16">
          <p className="mono-label mb-4 !text-[var(--color-dark-muted)]">{PITCH.notList.title}</p>
          <div className="flex flex-wrap gap-3">
            {PITCH.notList.items.map((item) => (
              <span
                key={item}
                className="text-xs text-[var(--color-dark-muted)] border border-[rgba(255,255,255,0.1)] rounded-full px-4 py-1.5"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </BeamsBackground>
  )
}
