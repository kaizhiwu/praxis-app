import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { SectionWithMockup } from '../../components/SectionWithMockup'
import { GraphMockup, TruthMockup, IntentMockup, AnswerMockup } from '../../components/ProductGraphics'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

const layerLabels = ['Layer 01', 'Layer 02', 'Layer 03', 'Layer 04']
const layerGraphics = [<GraphMockup />, <TruthMockup />, <IntentMockup />, <AnswerMockup />]

export function ProductSection() {
  const layers = PITCH.product.layers

  return (
    <section id="product" className="bg-[var(--color-bone)] px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-rule mb-6" />
        <motion.p {...fade} className="mono-label mb-10">The product</motion.p>

        <motion.h2
          {...fade}
          className="font-semibold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)] max-w-2xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {PITCH.product.title}
        </motion.h2>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="text-base text-[var(--color-ink-secondary)] max-w-xl mb-6 leading-relaxed"
        >
          {PITCH.product.sub}
        </motion.p>

        {/* Layer blocks with alternating layout and graphics */}
        <div className="divide-y divide-[var(--color-border)]">
          {layers.map((layer, i) => (
            <SectionWithMockup
              key={layer.name}
              label={layerLabels[i]}
              title={layer.name}
              description={layer.description}
              detail={layer.detail}
              reversed={i % 2 === 1}
              mockupContent={layerGraphics[i]}
            />
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.2 }}
          className="border-l-2 border-[var(--color-accent-indigo)] pl-6 mt-16"
        >
          <p className="text-[var(--color-ink)] font-medium">Answers, not listings.</p>
        </motion.div>
      </div>
    </section>
  )
}
