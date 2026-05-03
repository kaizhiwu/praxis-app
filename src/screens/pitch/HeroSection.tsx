import { useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { PITCH } from '../../data/pitch'

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

        {/* Content lockup — eyebrow + h1 + sub + primary CTA + secondary link */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-10">
            <p className="mono-label mb-6">Behavioral Place Intelligence</p>

            <h1
              className="display-xl text-[var(--color-ink)]"
              style={{ fontWeight: 500 }}
            >
              The behavioral layer
              <br />
              maps won&apos;t build.
            </h1>

            <p className="mt-6 max-w-lg text-[var(--color-ink-secondary)] leading-relaxed" style={{ fontSize: 'var(--size-text-lg)' }}>
              {PITCH.hero.sub}
            </p>

            <div className="mt-8 flex items-center gap-5">
              <a
                href="/app"
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-[var(--color-accent-indigo)] hover:bg-[#0F766E] transition-colors duration-200"
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
        </motion.div>

        {/* 3 attribute labels reveal as the video unwashes */}
        {DATA_LABELS.map((d, i) => (
          <DataLabel key={i} data={d} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}
