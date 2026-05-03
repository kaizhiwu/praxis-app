import { useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { BoneResultCard } from '../../components/BoneResultCard'

// Sample data shown floating beside the hero — same shape as a real
// Praxis result card so the visitor sees the product immediately.
const HERO_CARD = {
  name: 'Cafe Luna',
  neighborhood: 'NoHo, NYC',
  distance: '0.3 mi',
  matchScore: 0.92,
  attributes: [
    { label: 'Outlet usability', value: 0.95, confidence: 0.91, recency: '2d ago' },
    { label: 'Noise level (low)', value: 0.82, confidence: 0.88, recency: '4d ago' },
    { label: 'Laptop tolerance', value: 0.94, confidence: 0.86, recency: '1w ago' },
  ],
}

const VIDEO_SRC = '/models/city-flyover.mp4'

// Three labels max — anchored to real product attributes, not decorative.
const DATA_LABELS: { label: string; x: string; y: string; threshold: number }[] = [
  { label: 'outlets working', x: '58%', y: '32%', threshold: 0.30 },
  { label: 'noise low · 2d ago', x: '36%', y: '50%', threshold: 0.42 },
  { label: 'laptop tolerant 3hr+', x: '64%', y: '64%', threshold: 0.54 },
]

function DataLabel({ data, scrollYProgress }: { data: typeof DATA_LABELS[number]; scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [data.threshold, data.threshold + 0.06], [0, 1])
  const scale = useTransform(scrollYProgress, [data.threshold, data.threshold + 0.06], [0.9, 1])

  return (
    <motion.div
      className="absolute pointer-events-none z-10 hidden md:block"
      style={{ left: data.x, top: data.y, opacity, scale }}
    >
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ink)]" />
        <div
          className="px-2.5 py-1 rounded-md text-[11px] tracking-wide bg-[var(--color-bone)] border border-[var(--color-border)] text-[var(--color-ink)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
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

  // Text fades as you scroll into the video reveal.
  const textOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.18], [0, -24])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.35], [0.85, 0.25])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--color-bone)]"
      style={{ height: '120vh' }}
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
          <motion.div
            className="absolute inset-0"
            style={{ opacity: overlayOpacity, background: 'var(--color-bone)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{ background: 'linear-gradient(to top, var(--color-bone), transparent)' }}
          />
        </div>

        {/* Content lockup — asymmetric: text left, floating live card right */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left — text column (7 of 12) */}
            <div className="lg:col-span-7">
              <p className="mono-label mb-6">Behavioral Place Intelligence</p>

              <h1 className="display-xl text-[var(--color-ink)]">
                The behavioral layer
                <br />
                maps won&apos;t build.
              </h1>

              <p
                className="mt-6 max-w-lg text-[var(--color-ink-secondary)] leading-relaxed"
                style={{ fontSize: 'var(--size-text-lg)' }}
              >
                {PITCH.hero.sub}
              </p>

              <div className="mt-8 flex items-center gap-5">
                <a
                  href="/app"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-[var(--color-accent-indigo)] hover:bg-[#1D4ED8] transition-colors duration-200"
                >
                  Try the product
                </a>
                <button
                  onClick={onContact}
                  className="text-sm text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors duration-200 cursor-pointer inline-flex items-center gap-1.5"
                >
                  Get in touch
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>

            {/* Right — floating live card (5 of 12, hidden on mobile) */}
            <div className="hidden lg:block lg:col-span-5">
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-1.5, -2, -1.5] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.10)) drop-shadow(0 4px 12px rgba(0,0,0,0.06))',
                  transformOrigin: 'center center',
                }}
              >
                {/* Tiny status pill above the card */}
                <div className="flex items-center justify-end mb-3 gap-2 pr-2">
                  <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[var(--color-accent-emerald)]">
                    <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--color-accent-emerald)] animate-ping opacity-60" />
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-tertiary)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Live · NYC · 14 places
                  </span>
                </div>
                <BoneResultCard data={HERO_CARD} />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 3 attribute labels reveal as the video unwashes */}
        {DATA_LABELS.map((d, i) => (
          <DataLabel key={i} data={d} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
