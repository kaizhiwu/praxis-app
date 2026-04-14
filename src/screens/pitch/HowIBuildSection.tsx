import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { SpotlightBackground } from '../../components/SpotlightBackground'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
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
    <SpotlightBackground className="bg-[var(--color-bone)] px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-rule mb-6" />
        <motion.p {...fade} className="mono-label mb-10">How I build</motion.p>

        <motion.h2
          {...fade}
          className="font-semibold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)] max-w-2xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {PITCH.howIBuild.title}
        </motion.h2>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="text-[var(--color-ink-secondary)] mb-10 max-w-xl leading-relaxed"
        >
          {PITCH.howIBuild.sub}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Philosophy card */}
          <motion.div
            {...fade}
            transition={{ ...fade.transition, delay: 0.1 }}
            className="col-span-2 rounded-xl p-8 bg-[var(--color-taupe)] backdrop-blur-sm"
          >
            <p className="text-[var(--color-ink-secondary)] leading-relaxed text-lg italic">
              &ldquo;{PITCH.howIBuild.philosophy}&rdquo;
            </p>
          </motion.div>

          {/* Tool cards with hover effects */}
          {PITCH.howIBuild.tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              {...fade}
              transition={{ ...fade.transition, delay: 0.16 + i * 0.06 }}
              className="group rounded-xl p-6 bg-[var(--color-bone-warm)] border border-[var(--color-border-subtle)] transition-all duration-300 hover:border-[var(--color-ink-faint)] hover:shadow-sm"
            >
              <div className="text-[var(--color-ink-tertiary)] mb-3 transition-colors duration-300 group-hover:text-[var(--color-accent-indigo)]">
                {toolIcons[tool.icon]}
              </div>
              <h3 className="text-[var(--color-ink)] font-medium text-sm">{tool.name}</h3>
              <p className="text-[var(--color-ink-tertiary)] text-xs mt-2 leading-relaxed">{tool.role}</p>
            </motion.div>
          ))}
        </div>

        {/* Metrics */}
        <div className="section-rule my-16" />

        <motion.h3
          {...fade}
          className="font-medium text-2xl text-[var(--color-ink)] mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {PITCH.buildVelocity.title}
        </motion.h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PITCH.buildVelocity.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              {...fade}
              transition={{ ...fade.transition, delay: i * 0.06 }}
              className="group rounded-xl overflow-hidden bg-[var(--color-bone-warm)] border border-[var(--color-border-subtle)] transition-all duration-300 hover:border-[var(--color-ink-faint)] hover:shadow-sm"
            >
              {/* Accent line */}
              <div className="h-0.5 bg-gradient-to-r from-[#4F46E5]/30 via-[#D97706]/20 to-transparent" />
              <div className="p-6">
                <p
                  className="text-4xl md:text-5xl font-medium tracking-tight text-[var(--color-ink)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {metric.value}
                </p>
                <p className="text-[var(--color-ink)] font-medium mt-3 text-sm">{metric.label}</p>
                <p className="text-[var(--color-ink-tertiary)] text-xs mt-1.5 leading-relaxed">{metric.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SpotlightBackground>
  )
}
