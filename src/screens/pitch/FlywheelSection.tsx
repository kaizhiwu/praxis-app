import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { Section, TextLockup } from '../../components/Section'
import { FlywheelDiagram } from '../../components/FlywheelDiagram'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } as const,
}

const STEP_CAPTIONS = ['Search', 'Arrive', 'Confirm', 'Improve']

export function FlywheelSection() {
  const nodes = PITCH.flywheel.nodes
  const steps = nodes.map((n, i) => ({
    label: n.label.replace(/\n/g, ' '),
    caption: STEP_CAPTIONS[i] ?? '',
  }))

  return (
    <Section id="flywheel" tone="tint-emerald">
      <TextLockup
        eyebrow="The flywheel"
        title={PITCH.flywheel.title}
        sub={PITCH.flywheel.sub}
        size="lg"
        maxProse="max-w-2xl"
        accent="emerald"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-12 items-center">
        {/* Diagram */}
        <div className="lg:col-span-6">
          <FlywheelDiagram steps={steps} />
        </div>

        {/* Numbered step list — supporting detail beside the moving diagram */}
        <ol className="lg:col-span-6">
          {nodes.map((node, i) => (
            <motion.li
              key={i}
              {...fade}
              transition={{ ...fade.transition, delay: 0.1 + i * 0.06 }}
              className="flex items-baseline gap-5 py-5 border-b border-[var(--color-border)] last:border-b-0"
            >
              <span
                className="font-mono text-xs tracking-[0.2em] text-[var(--color-accent-indigo)] tabular-nums shrink-0 w-8"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-base text-[var(--color-ink)] leading-relaxed">
                {node.label.replace(/\n/g, ' ')}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
