import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { Section, TextLockup } from '../../components/Section'
import { BoneResultCard } from '../../components/BoneResultCard'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } as const,
}

const ICONS: Record<string, React.ReactNode> = {
  laptop: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M2 20h20" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 2.5C12 2.5 5 10.5 5 14.5a7 7 0 0 0 14 0C19 10.5 12 2.5 12 2.5Z" />
    </>
  ),
  heart: (
    <>
      <path d="M20.5 8.6a4.5 4.5 0 0 0-7.6-3.2L12 6.3l-.9-.9A4.5 4.5 0 0 0 3.5 8.6c0 5 8.5 10.4 8.5 10.4s8.5-5.4 8.5-10.4Z" />
    </>
  ),
}

function Icon({ name }: { name: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICONS[name] ?? null}
    </svg>
  )
}

export function ProblemSection() {
  return (
    <Section id="problem" tone="tint-orange">
      <TextLockup
        eyebrow="The problem"
        title={PITCH.problem.title}
        size="lg"
        maxProse="max-w-2xl"
        accent="orange"
      />

      {/* Each row: left half = the broken story, right half = what Praxis would have answered.
          Resolves the problem visually rather than just telling. */}
      <ul className="mt-12 space-y-10 lg:space-y-14">
        {PITCH.problem.stories.map((story, i) => (
          <motion.li
            key={i}
            {...fade}
            transition={{ ...fade.transition, delay: i * 0.06 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
          >
            {/* Left: story (icon + query, then Maps says + reality) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-start gap-4">
                <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bone)] border border-[var(--color-border-subtle)] text-[var(--color-ink-secondary)]">
                  <Icon name={story.icon} />
                </span>
                <p
                  className="text-xl font-medium text-[var(--color-ink)] leading-snug"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;{story.query.replace(/^"|"$/g, '')}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pl-14">
                <div>
                  <p className="mono-label mb-1.5">What Maps says</p>
                  <p className="text-sm text-[var(--color-ink-tertiary)] line-through decoration-[var(--color-ink-faint)]">
                    {story.mapsResult}
                  </p>
                </div>
                <div>
                  <p className="mono-label mb-1.5">What actually happened</p>
                  <p className="text-sm text-[var(--color-ink)] leading-relaxed">
                    {story.reality}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Praxis answer card */}
            <div className="lg:col-span-5">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-indigo)] mb-3"
              >
                What Praxis would have shown
              </p>
              <BoneResultCard data={story.praxis} />
            </div>
          </motion.li>
        ))}
      </ul>

      {/* Insight */}
      <motion.blockquote
        {...fade}
        transition={{ ...fade.transition, delay: 0.24 }}
        className="border-l-2 border-[var(--color-accent-indigo)] pl-6 mt-16 max-w-3xl"
      >
        <p className="text-[var(--color-ink-secondary)] italic leading-relaxed" style={{ fontSize: 'var(--size-text-lg)' }}>
          {PITCH.problem.insight}
        </p>
      </motion.blockquote>
    </Section>
  )
}
