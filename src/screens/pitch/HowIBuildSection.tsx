import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { Section, TextLockup } from '../../components/Section'
import { BuildTerminal } from '../../components/BuildTerminal'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } as const,
}

const toolIcons: Record<string, React.ReactNode> = {
  brain: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
      <path d="M9 21h6M10 17v4M14 17v4" />
    </svg>
  ),
  code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  deploy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  stack: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M3 9h18" />
    </svg>
  ),
}

export function HowIBuildSection() {
  return (
    <Section id="how-i-build" tone="bone-warm">
      <TextLockup
        eyebrow="How I build"
        title={PITCH.howIBuild.title}
        sub={PITCH.howIBuild.sub}
        size="lg"
        maxProse="max-w-2xl"
      />

      {/* Two-column: tools list left, live build terminal right */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <ul className="lg:col-span-5 space-y-2">
          {PITCH.howIBuild.tools.map((tool, i) => (
            <motion.li
              key={tool.name}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.06 }}
              className="flex items-start gap-4 rounded-xl p-4 bg-[var(--color-bone)] border border-[var(--color-border-subtle)]"
            >
              <span className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-bone-warm)] text-[var(--color-ink-tertiary)]">
                {toolIcons[tool.icon]}
              </span>
              <div>
                <p className="text-[var(--color-ink)] font-medium text-sm">{tool.name}</p>
                <p className="text-[var(--color-ink-tertiary)] text-xs mt-1 leading-relaxed">
                  {tool.role}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="lg:col-span-7">
          <BuildTerminal />
        </div>
      </div>

      {/* Philosophy — single italic line */}
      <motion.blockquote
        {...fade}
        transition={{ ...fade.transition, delay: 0.3 }}
        className="border-l-2 border-[var(--color-accent-indigo)] pl-6 mt-12 max-w-3xl"
      >
        <p className="text-[var(--color-ink-secondary)] leading-relaxed text-lg italic">
          {PITCH.howIBuild.philosophy}
        </p>
      </motion.blockquote>
    </Section>
  )
}
