import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { useState } from 'react'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

export function ProductSection() {
  const layers = PITCH.product.layers
  const [activeLayer, setActiveLayer] = useState(0)

  return (
    <section id="product" className="bg-[var(--color-bone)] px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-rule mb-6" />
        <motion.p {...fade} className="mono-label mb-10">The product</motion.p>

        <motion.h2
          {...fade}
          className="font-light text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)] max-w-2xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {PITCH.product.title}
        </motion.h2>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="text-base text-[var(--color-ink-secondary)] max-w-xl mb-12 leading-relaxed"
        >
          {PITCH.product.sub}
        </motion.p>

        {/* Layer tabs — underline style */}
        <div className="flex gap-6 mb-10 border-b border-[var(--color-border)]">
          {layers.map((layer, i) => (
            <button
              key={i}
              onClick={() => setActiveLayer(i)}
              className="pb-3 text-sm transition-colors duration-200 cursor-pointer"
              style={{
                color: i === activeLayer ? 'var(--color-ink)' : 'var(--color-ink-tertiary)',
                borderBottom: i === activeLayer ? '2px solid var(--color-ink)' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {layer.name}
            </button>
          ))}
        </div>

        {/* Active layer content — text only */}
        <div className="min-h-[200px] relative">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={false}
              animate={{
                opacity: i === activeLayer ? 1 : 0,
                y: i === activeLayer ? 0 : 8,
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0"
              style={{ pointerEvents: i === activeLayer ? 'auto' : 'none' }}
            >
              <h3
                className="font-medium text-2xl text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {layer.name}
              </h3>
              <p className="text-[var(--color-ink-secondary)] mt-4 leading-relaxed max-w-lg">
                {layer.description}
              </p>
              <p className="text-sm text-[var(--color-ink-tertiary)] mt-4 italic">
                {layer.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.2 }}
          className="border-l-2 border-[var(--color-ink-faint)] pl-6 mt-16"
        >
          <p className="text-[var(--color-ink)] font-medium">Answers, not listings.</p>
        </motion.div>
      </div>
    </section>
  )
}
