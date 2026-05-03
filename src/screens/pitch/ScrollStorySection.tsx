import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

type Frame = {
  eyebrow: string
  title: string
  description: string
}

const FRAMES: Frame[] = [
  {
    eyebrow: '01 / The map era',
    title: 'Maps tell you what’s there.',
    description:
      'Address, hours, star rating, distance. Useful for navigation. Useless for "will this place actually work for me right now?"',
  },
  {
    eyebrow: '02 / The AI overlay',
    title: 'Their AI summarizes reviews.',
    description:
      'A confident-sounding paragraph extracted from old, contradictory text. No provenance. No timestamp. Hallucinates under ambiguity.',
  },
  {
    eyebrow: '03 / The behavioral layer',
    title: 'Praxis confirms what’s true today.',
    description:
      'Structured behavioral attributes — outlets, noise, lighting, access — confirmed at point of visit. Recency-weighted. Inspectable. Decision-grade.',
  },
]

const TOTAL = FRAMES.length

/**
 * Sequential text frame — fades in and out based on scroll position.
 * The frame is "active" when scroll progress is within its window.
 */
function FrameText({
  frame,
  index,
  scrollYProgress,
}: {
  frame: Frame
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index / TOTAL
  const end = (index + 1) / TOTAL
  const fadeWindow = (end - start) * 0.18
  const isFirst = index === 0
  const isLast = index === TOTAL - 1

  const opacity = useTransform(scrollYProgress, (v) => {
    if (v < start) return isFirst ? 1 : 0
    if (v < start + fadeWindow) return isFirst ? 1 : (v - start) / fadeWindow
    if (v < end - fadeWindow) return 1
    if (v < end) return isLast ? 1 : 1 - (v - (end - fadeWindow)) / fadeWindow
    return isLast ? 1 : 0
  })

  const y = useTransform(scrollYProgress, (v) => {
    if (v < start) return isFirst ? 0 : 16
    if (v < start + fadeWindow) return isFirst ? 0 : 16 * (1 - (v - start) / fadeWindow)
    if (v < end - fadeWindow) return 0
    if (v < end) return isLast ? 0 : -16 * ((v - (end - fadeWindow)) / fadeWindow)
    return isLast ? 0 : -16
  })

  return (
    <motion.div
      className="absolute inset-0 flex items-center px-6 lg:px-10"
      style={{ opacity, y }}
    >
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-accent-indigo)] mb-6">
            {frame.eyebrow}
          </p>
          <h2 className="display-lg text-[var(--color-ink)]">{frame.title}</h2>
          <p
            className="mt-6 text-[var(--color-ink-secondary)] leading-relaxed max-w-xl"
            style={{ fontSize: 'var(--size-text-lg)' }}
          >
            {frame.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Background visual that morphs across the three frames.
 * Frame 1: faint map grid (the "map era").
 * Frame 2: distorted text fragments (the "AI overlay").
 * Frame 3: clean structured grid (the "behavioral layer").
 */
function BackgroundLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity1 = useTransform(scrollYProgress, [0, 0.28, 0.34], [1, 1, 0])
  const opacity2 = useTransform(scrollYProgress, [0.28, 0.34, 0.62, 0.68], [0, 1, 1, 0])
  const opacity3 = useTransform(scrollYProgress, [0.62, 0.68, 1], [0, 1, 1])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Frame 1: faint map grid */}
      <motion.svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: opacity1 }}
        aria-hidden
      >
        <defs>
          <pattern id="ssgrid" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="var(--color-border)" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="1200" height="800" fill="url(#ssgrid)" />
        <path
          d="M 0 600 Q 200 580, 400 595 T 800 590 T 1200 600"
          stroke="var(--color-border)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        {[180, 360, 540, 720, 900, 1080].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={300 + (i % 2 === 0 ? 0 : 40)}
            r="3"
            fill="var(--color-ink-faint)"
            opacity="0.4"
          />
        ))}
      </motion.svg>

      {/* Frame 2: distorted review fragments */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: opacity2 }}
        aria-hidden
      >
        <div className="absolute inset-0 flex flex-wrap gap-x-12 gap-y-6 px-12 py-16 opacity-50">
          {[
            '“great lattes”',
            '“romantic ambiance”',
            '“really cute spot”',
            '“I love this place”',
            '“charming”',
            '“best in town”',
            '“gorgeous”',
            '“amazing vibes”',
            '“highly recommend”',
            '“go here”',
            '“super cute”',
            '“hidden gem”',
            '“charming”',
            '“romantic ambiance”',
            '“great lattes”',
          ].map((text, i) => (
            <span
              key={i}
              className="text-[var(--color-ink-tertiary)] italic"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: `${14 + (i % 4) * 4}px`,
                transform: `rotate(${(i % 5) - 2}deg) translateY(${(i % 3) * 6}px)`,
                filter: i % 3 === 0 ? 'blur(1px)' : 'none',
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Frame 3: clean attribute grid */}
      <motion.svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: opacity3 }}
        aria-hidden
      >
        {/* Sparse, ordered attribute "rows" */}
        {Array.from({ length: 7 }, (_, row) =>
          Array.from({ length: 12 }, (_, col) => {
            const filled = (row * 7 + col * 3) % 5 < 3
            return (
              <rect
                key={`${row}-${col}`}
                x={120 + col * 80}
                y={120 + row * 80}
                width={filled ? 56 : 56}
                height="3"
                rx="1.5"
                fill={filled ? 'var(--color-accent-indigo)' : 'var(--color-border)'}
                opacity={filled ? 0.5 : 0.4}
              />
            )
          })
        )}
        {/* Bottom: a "match: 92%" anchor row */}
        <rect x="120" y="680" width="200" height="48" rx="6" fill="var(--color-bone)" stroke="var(--color-accent-indigo)" strokeWidth="1" />
        <text x="138" y="700" fontFamily="var(--font-display)" fontWeight="500" fontSize="13" fill="var(--color-ink)">
          Cafe Luna · 92%
        </text>
        <text x="138" y="720" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-ink-tertiary)" letterSpacing="0.5">
          outlets · noise · 4× confirmed
        </text>
      </motion.svg>
    </div>
  )
}

/** One progress dot — extracted so its hooks live at the top level. */
function Dot({
  index,
  scrollYProgress,
}: {
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index / TOTAL
  const end = (index + 1) / TOTAL
  const isLast = index === TOTAL - 1

  const isActive = (v: number) =>
    v >= start && (isLast ? v <= end : v < end)

  const opacity = useTransform(scrollYProgress, (v) => (isActive(v) ? 1 : 0.25))
  const scale = useTransform(scrollYProgress, (v) => (isActive(v) ? 1.4 : 1))

  return (
    <motion.span
      className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-indigo)]"
      style={{ opacity, scale }}
    />
  )
}

function ProgressDots({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3">
      {FRAMES.map((_, i) => (
        <Dot key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  )
}

/**
 * ScrollStorySection — Clearstreet's signature scroll-driven narrative
 * pattern. Sticky inner content stays put while the user scrolls a
 * 3-frame story (Map era → AI overlay → Behavioral layer). The
 * background visual morphs alongside the text.
 *
 * Section is 300vh tall so each frame gets a 100vh scroll commitment.
 */
export function ScrollStorySection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={ref}
      id="story"
      className="relative bg-[var(--color-bone)]"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <BackgroundLayer scrollYProgress={scrollYProgress} />

        {/* Soft fade at top + bottom so the section reads as a chapter, not a wall */}
        <div className="absolute inset-x-0 top-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--color-bone), transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--color-bone), transparent)' }} />

        {/* Frame text — absolutely positioned so frames stack & cross-fade.
            Each FrameText handles its own padding/container so absolute
            positioning doesn't escape the padding box. */}
        <div className="relative h-full">
          {FRAMES.map((frame, i) => (
            <FrameText
              key={frame.eyebrow}
              frame={frame}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <ProgressDots scrollYProgress={scrollYProgress} />
      </div>
    </section>
  )
}
