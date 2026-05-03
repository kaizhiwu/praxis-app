import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

type Tone =
  | 'bone'
  | 'bone-warm'
  | 'taupe'
  | 'tint-cobalt'
  | 'tint-orange'
  | 'tint-amber'
  | 'tint-violet'
  | 'tint-magenta'
  | 'tint-emerald'

const TONE_BG: Record<Tone, string> = {
  'bone': 'var(--color-bone)',
  'bone-warm': 'var(--color-bone-warm)',
  'taupe': 'var(--color-taupe)',
  'tint-cobalt':  'var(--tint-cobalt)',
  'tint-orange':  'var(--tint-orange)',
  'tint-amber':   'var(--tint-amber)',
  'tint-violet':  'var(--tint-violet)',
  'tint-magenta': 'var(--tint-magenta)',
  'tint-emerald': 'var(--tint-emerald)',
}

const TONE_RULE: Record<Tone, string> = {
  'bone': 'var(--color-border)',
  'bone-warm': 'var(--color-border)',
  'taupe': 'var(--color-taupe-cool)',
  'tint-cobalt':  'var(--color-accent-cobalt)',
  'tint-orange':  'var(--color-accent-coral)',
  'tint-amber':   'var(--color-accent-amber)',
  'tint-violet':  'var(--color-accent-violet)',
  'tint-magenta': 'var(--color-accent-magenta)',
  'tint-emerald': 'var(--color-accent-emerald)',
}

type SectionProps = {
  id?: string
  tone?: Tone
  children: ReactNode
  className?: string
  /** Skip the top hairline rule (e.g. for the first section under hero). */
  noRule?: boolean
  /** Vertical padding override; defaults to "py-24 lg:py-32".
      Clearstreet rhythm: ~96px mobile, ~128px desktop. */
  pad?: string
}

/**
 * Section — universal section primitive.
 * Handles tone (bg + rule color), max-width container, padding, and the top
 * hairline rule that anchors every Praxis section.
 */
export function Section({
  id,
  tone = 'bone',
  children,
  className = '',
  noRule = false,
  pad = 'py-24 lg:py-32',
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-6 lg:px-10 ${pad} ${className}`}
      style={{ background: TONE_BG[tone] }}
    >
      <div className="max-w-[1200px] mx-auto">
        {!noRule && (
          <div
            className="h-px mb-6"
            style={{ background: TONE_RULE[tone] }}
            aria-hidden
          />
        )}
        {children}
      </div>
    </section>
  )
}

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } as const,
}

type TextLockupProps = {
  eyebrow?: string
  /** Display heading. */
  title: string
  /** Optional sub-line directly under the title. */
  sub?: string
  /** Optional body paragraph(s). */
  body?: ReactNode
  /** Optional CTA / footer node (buttons, links, footnote). */
  cta?: ReactNode
  /** Visual scale of the title. */
  size?: 'lg' | 'md'
  /** Max-width for prose blocks. */
  maxProse?: string
  className?: string
  align?: 'left' | 'center'
  /** Accent color for the headline. Pairs with section tint backgrounds. */
  accent?: 'cobalt' | 'orange' | 'amber' | 'violet' | 'magenta' | 'emerald'
}

const HEADING_ACCENT: Record<NonNullable<TextLockupProps['accent']>, string> = {
  cobalt:  'var(--deep-cobalt)',
  orange:  'var(--deep-orange)',
  amber:   'var(--deep-amber)',
  violet:  'var(--deep-violet)',
  magenta: 'var(--deep-magenta)',
  emerald: 'var(--deep-emerald)',
}

/**
 * TextLockup — the universal eyebrow + display + sub + body + cta atom.
 * Every pitch section's text column composes from this. Hebbia's `.textLockUp`
 * primitive applied to the warm-bone palette.
 */
export function TextLockup({
  eyebrow,
  title,
  sub,
  body,
  cta,
  size = 'lg',
  maxProse = 'max-w-xl',
  className = '',
  align = 'left',
  accent,
}: TextLockupProps) {
  const headingClass = size === 'lg' ? 'display-lg' : 'display-md'
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''
  const headingColor = accent ? HEADING_ACCENT[accent] : 'var(--color-ink)'

  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow && (
        <motion.p
          {...fade}
          className={`mono-label mb-8 ${align === 'center' ? 'mx-auto' : ''}`}
          style={accent ? { color: headingColor, opacity: 0.75 } : undefined}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        {...fade}
        className={`${headingClass} ${maxProse}`}
        style={{ color: headingColor }}
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className={`mt-5 text-[var(--color-ink-secondary)] leading-relaxed ${maxProse}`}
          style={{ fontSize: 'var(--size-text-lg)' }}
        >
          {sub}
        </motion.p>
      )}
      {body && (
        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.1 }}
          className={`mt-5 text-[var(--color-ink-secondary)] leading-relaxed ${maxProse}`}
        >
          {body}
        </motion.div>
      )}
      {cta && (
        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.15 }}
          className="mt-8"
        >
          {cta}
        </motion.div>
      )}
    </div>
  )
}
