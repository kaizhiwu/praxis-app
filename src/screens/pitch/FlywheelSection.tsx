import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

export function FlywheelSection() {
  const nodes = PITCH.flywheel.nodes

  return (
    <section id="flywheel" className="bg-[var(--color-bone-warm)] px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-rule mb-6" style={{ background: 'var(--color-border)' }} />
        <motion.p {...fade} className="mono-label mb-10">The flywheel</motion.p>

        <motion.h2
          {...fade}
          className="font-light text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)] max-w-2xl mb-16"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {PITCH.flywheel.title}
        </motion.h2>

        {/* Numbered step list */}
        <div className="max-w-[800px]">
          {nodes.map((node, i) => (
            <motion.div key={i} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }}>
              <div className="flex items-baseline gap-6 py-6">
                <span
                  className="text-4xl font-light text-[var(--color-ink-faint)] shrink-0"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-lg text-[var(--color-ink)] leading-relaxed">
                  {node.label.replace(/\n/g, ' ')}
                </p>
              </div>
              {i < nodes.length - 1 && <div className="section-rule" />}
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.4 }}
          className="text-[var(--color-ink-secondary)] max-w-lg mt-12 leading-relaxed"
        >
          {PITCH.flywheel.sub}
        </motion.p>
      </div>
    </section>
  )
}
