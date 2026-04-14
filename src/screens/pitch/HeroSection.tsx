import { useRef, useEffect, useCallback, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const VIDEO_SRC = '/models/city-flyover.mp4'

const DATA_LABELS: { label: string; x: string; y: string; threshold: number }[] = [
  { label: 'outlets work', x: '58%', y: '32%', threshold: 0.20 },
  { label: 'good date lighting', x: '38%', y: '40%', threshold: 0.26 },
  { label: 'photo wall', x: '68%', y: '48%', threshold: 0.32 },
  { label: 'laptop tolerant 3hr+', x: '50%', y: '26%', threshold: 0.38 },
  { label: 'restroom no purchase', x: '25%', y: '55%', threshold: 0.44 },
  { label: 'feels local, not touristy', x: '72%', y: '35%', threshold: 0.50 },
  { label: 'stroller accessible', x: '35%', y: '60%', threshold: 0.56 },
  { label: 'quiet enough for calls', x: '60%', y: '58%', threshold: 0.62 },
]

function DataLabel({ data, scrollYProgress }: { data: typeof DATA_LABELS[number]; scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [data.threshold, data.threshold + 0.05], [0, 1])
  const scale = useTransform(scrollYProgress, [data.threshold, data.threshold + 0.05], [0.85, 1])

  return (
    <motion.div
      className="absolute pointer-events-none z-10 hidden md:block"
      style={{ left: data.x, top: data.y, opacity, scale }}
    >
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)]" />
        <div className="px-2.5 py-1 rounded-md text-[11px] tracking-wide bg-[var(--color-bone)] border border-[var(--color-border)] text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-mono)' }}>
          {data.label}
        </div>
      </div>
    </motion.div>
  )
}

export function HeroSection({ onContact }: { onContact: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrollVal = useRef(0)
  const [activePersona, setActivePersona] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const syncVideo = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration || isNaN(video.duration)) return
    const target = scrollVal.current * video.duration
    if (Math.abs(video.currentTime - target) > 0.05) {
      video.currentTime = target
    }
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollVal.current = v
    syncVideo()
  })

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    const onLoaded = () => { video.pause(); video.currentTime = 0 }
    video.addEventListener('loadedmetadata', onLoaded)
    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  // Phase 1: Text visible over washed-out video
  // Phase 2: Text fades, video reveals, data labels appear
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, -30])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.85, 0.25])

  // Phase 2 CTA at bottom
  const ctaOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.65, 0.85], [20, 0])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-bone)]"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(1.1) saturate(0.12) contrast(0.9) sepia(0.08)' }}
          />

          {/* Warm overlay that lifts as you scroll */}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: overlayOpacity, background: 'var(--color-bone)' }}
          />

          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{ background: 'linear-gradient(to top, var(--color-bone), transparent)' }}
          />
        </div>

        {/* Phase 1: Left-aligned text */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-10">
            <p className="mono-label mb-6">Behavioral Place Intelligence</p>

            <h1
              className="font-semibold tracking-[-0.03em] leading-[1.08] text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
            >
              The behavioral layer
              <br />
              maps won&apos;t build.
            </h1>

            {/* Stacked sub-copy: default + one per persona, swapped on pill hover */}
            <div className="relative mt-6 max-w-lg" style={{ minHeight: '5.25rem' }}>
              <p
                className={`absolute inset-0 text-base text-[var(--color-ink-secondary)] leading-relaxed transition-opacity duration-300 ease-out ${
                  activePersona === null ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {PITCH.hero.sub}
              </p>
              {PITCH.hero.personas.map((persona, i) => (
                <p
                  key={persona.key}
                  className={`absolute inset-0 text-base text-[var(--color-ink-secondary)] leading-relaxed transition-opacity duration-300 ease-out ${
                    activePersona === i ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {persona.sub}
                </p>
              ))}
            </div>

            <p className="mt-3 text-xs text-[var(--color-ink-tertiary)]">
              {PITCH.hero.founderNote}
            </p>

            {/* Persona pill row */}
            <div
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg"
              onMouseLeave={() => setActivePersona(null)}
            >
              {PITCH.hero.personas.map((persona, i) => {
                const active = activePersona === i
                return (
                  <button
                    key={persona.key}
                    onMouseEnter={() => setActivePersona(i)}
                    onClick={() =>
                      setActivePersona((prev) => (prev === i ? null : i))
                    }
                    className={`group pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border px-5 py-3 text-left text-sm transition-colors duration-200 cursor-pointer ${
                      active
                        ? 'border-[var(--color-accent-indigo)] bg-[rgba(79,70,229,0.04)] text-[var(--color-ink)]'
                        : 'border-[var(--color-border)] text-[var(--color-ink-secondary)] hover:border-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    <span className="font-medium">{persona.label}</span>
                    <span
                      className={`transition-all duration-200 ${
                        active
                          ? 'text-[var(--color-accent-indigo)] translate-x-0.5'
                          : 'text-[var(--color-ink-tertiary)] group-hover:translate-x-0.5'
                      }`}
                    >
                      →
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="/app"
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-[var(--color-accent-indigo)] hover:bg-[#4338CA] transition-colors duration-200"
              >
                Try the product
              </a>
              <button
                onClick={onContact}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-2.5 text-sm text-[var(--color-ink-secondary)] hover:border-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors duration-200 cursor-pointer"
              >
                Get in touch
              </button>
            </div>
          </div>
        </motion.div>

        {/* Phase 2: Data labels over revealed city */}
        {DATA_LABELS.map((d, i) => (
          <DataLabel key={i} data={d} scrollYProgress={scrollYProgress} />
        ))}

        {/* Phase 2: Bottom CTA */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <a
            href="/app"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-bone)] transition-colors duration-200 bg-[var(--color-bone)]/80"
          >
            Try the product
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors duration-200 bg-[var(--color-bone)]/80 cursor-pointer"
          >
            Read the thesis
          </button>
        </motion.div>
      </div>
    </section>
  )
}
