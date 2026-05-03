import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { Section, TextLockup } from '../../components/Section'
import { MoatDiagram } from '../../components/MoatDiagram'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } as const,
}

export function MoatSection() {
  const layers = PITCH.moat.layers

  return (
    <Section id="moat" tone="tint-cobalt">
      <TextLockup
        eyebrow="Defensibility"
        title={PITCH.moat.title}
        sub="Three structural advantages that get stronger with scale."
        size="lg"
        maxProse="max-w-2xl"
        accent="cobalt"
      />

      {/* Architectural diagram — contributions feed graph, graph answers query */}
      <div className="mt-14">
        <MoatDiagram />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-14">
        {layers.map((layer, i) => (
          <motion.article
            key={layer.name}
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 + i * 0.06 }}
            className="rounded-xl p-7 bg-[var(--color-bone)] border border-[var(--color-border-subtle)]"
          >
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--color-ink-tertiary)] mb-3 tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3
              className="font-medium text-xl text-[var(--color-ink)] mb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {layer.name}
            </h3>
            <p className="text-sm text-[var(--color-ink-secondary)] leading-relaxed">
              {layer.description}
            </p>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
