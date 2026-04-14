import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface SectionWithMockupProps {
  label: string
  title: string
  description: string
  detail?: string
  reversed?: boolean
  mockupContent?: React.ReactNode
}

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

export function SectionWithMockup({
  label,
  title,
  description,
  detail,
  reversed = false,
  mockupContent,
}: SectionWithMockupProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const mockupY = useTransform(scrollYProgress, [0, 1], [40, -40])
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4])

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-12 ${
        reversed ? 'md:[direction:rtl]' : ''
      }`}
    >
      {/* Text column */}
      <div className={reversed ? 'md:[direction:ltr]' : ''}>
        <motion.p
          {...fade}
          className="mono-label mb-4 !text-[var(--color-accent-indigo)]"
        >
          {label}
        </motion.p>
        <motion.h3
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="font-semibold text-2xl md:text-3xl text-[var(--color-ink)] leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </motion.h3>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.12 }}
          className="text-[var(--color-ink-secondary)] mt-4 leading-relaxed"
        >
          {description}
        </motion.p>
        {detail && (
          <motion.p
            {...fade}
            transition={{ ...fade.transition, delay: 0.18 }}
            className="text-sm text-[var(--color-ink-tertiary)] mt-3 italic"
          >
            {detail}
          </motion.p>
        )}
      </div>

      {/* Mockup column */}
      <motion.div
        className={`${reversed ? 'md:[direction:ltr]' : ''}`}
        style={{ y: mockupY, opacity: mockupOpacity }}
      >
        {mockupContent || <MockupPlaceholder title={title} />}
      </motion.div>
    </div>
  )
}

function MockupPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-2xl bg-[var(--color-bone-warm)] border border-[var(--color-border-subtle)] p-8 md:p-10 aspect-[4/3] flex flex-col justify-between">
      {/* Simulated UI elements */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-ink-faint)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-ink-faint)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-ink-faint)]" />
        </div>
        <div className="h-3 w-3/4 rounded bg-[var(--color-taupe)] mb-3" />
        <div className="h-3 w-1/2 rounded bg-[var(--color-taupe)]" />
      </div>

      <div className="space-y-2.5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-taupe)] shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 rounded bg-[var(--color-taupe)]" style={{ width: `${70 - i * 15}%` }} />
              <div className="h-2 rounded bg-[var(--color-taupe-cool)]" style={{ width: `${90 - i * 10}%` }} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-[var(--color-ink-faint)] tracking-wider uppercase mt-4">{title}</p>
    </div>
  )
}
