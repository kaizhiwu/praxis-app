import { useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const VIDEO_SRC = '/models/city-flyover.mp4'

// Data labels that appear at specific scroll thresholds over the video
const DATA_LABELS: { label: string; x: string; y: string; threshold: number }[] = [
  { label: 'outlets work ✓', x: '58%', y: '32%', threshold: 0.20 },
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
  const scale = useTransform(scrollYProgress, [data.threshold, data.threshold + 0.05], [0.7, 1])

  return (
    <motion.div
      className="absolute pointer-events-none z-10 hidden md:block"
      style={{ left: data.x, top: data.y, opacity, scale }}
    >
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
        <div
          className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wide bg-white border border-[#E5E5EA] text-[#1D1D1F]"
        >
          {data.label}
        </div>
      </div>
    </motion.div>
  )
}

function HeroMockupCard() {
  const { heroMockup: m } = PITCH
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateY: -5 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: 1.1, duration: 0.7, ease: 'easeOut' }}
      className="rounded-2xl bg-white border border-[#E5E5EA] p-5 w-full max-w-sm"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)', perspective: '800px' }}
    >
      {/* Search bar */}
      <div className="flex items-center gap-2 rounded-lg bg-[#F5F5F7] px-3 py-2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#AEAEB2" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span className="text-xs font-mono text-[#86868B]">{m.query}</span>
      </div>

      {/* Result */}
      <div className="mt-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-base font-semibold text-[#1D1D1F]">{m.place}</h4>
            <p className="text-xs text-[#86868B] mt-0.5">{m.neighborhood} · {m.distance}</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#EEF2FF] flex-shrink-0">
            <span className="text-sm font-bold text-[#4F46E5]">{m.matchScore}</span>
          </div>
        </div>

        {/* Attributes */}
        <div className="mt-4 space-y-3">
          {m.attributes.map((attr) => (
            <div key={attr.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase tracking-wide text-[#86868B] font-medium">{attr.label}</span>
                <span className="text-[11px] font-mono text-[#6E6E73]">{Math.round(attr.confidence * 100)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#F5F5F7] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[#4F46E5]"
                  initial={{ width: 0 }}
                  animate={{ width: `${attr.value * 100}%` }}
                  transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom tag */}
      <div className="mt-4 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span className="text-[10px] text-[#86868B]">Verified today · 12 contributors</span>
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

  // Sync video currentTime to scroll
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

  // Ensure video is ready and paused
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    const onLoaded = () => { video.pause(); video.currentTime = 0 }
    video.addEventListener('loadedmetadata', onLoaded)
    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  // Phase 1: Text visible, city is atmospheric backdrop
  // Phase 2: Text fades, city takes over, data labels appear
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, -30])

  // Video overlay lightens less as you scroll (city reveals)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 0.3])

  // Scroll CTA fades in mid-scroll
  const ctaOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.65, 0.85], [20, 0])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAFAFA]"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Video background ── */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(1.1) saturate(0.15) contrast(0.9)' }}
          />

          {/* Dynamic overlay — lighter at start (text readable), more transparent on scroll (city reveals) */}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: overlayOpacity, background: 'rgba(250,250,250,0.92)' }}
          />

          {/* Bottom fade to next section */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #FAFAFA, transparent)' }}
          />
        </div>

        {/* ── Phase 1: Two-column layout — text left, mockup right ── */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Left — text */}
            <div className="flex-1 text-center md:text-left max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F]"
              >
                The behavioral layer
                <br />
                maps won&apos;t build.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-6 text-base sm:text-lg text-[#3A3A3C] leading-relaxed"
              >
                {PITCH.hero.sub}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-3 text-xs text-[#AEAEB2] tracking-wide"
              >
                {PITCH.hero.founderNote}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="mt-8 flex items-center justify-center md:justify-start gap-3"
              >
                <a
                  href="/app"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors duration-200"
                >
                  Try the product
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <button
                  onClick={onContact}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E5E5EA] px-6 py-2.5 text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#AEAEB2] transition-colors duration-200 cursor-pointer"
                >
                  Explore with us
                </button>
              </motion.div>
            </div>

            {/* Right — product mockup (hidden on mobile) */}
            <div className="hidden md:block flex-shrink-0">
              <HeroMockupCard />
            </div>
          </div>
        </motion.div>

        {/* ── Phase 2: Data labels materialize over the city ── */}
        {DATA_LABELS.map((d, i) => (
          <DataLabel key={i} data={d} scrollYProgress={scrollYProgress} />
        ))}

        {/* ── Phase 2 bottom CTA ── */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <a
            href="/app"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors duration-200"
          >
            Try the product
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#problem"
            className="inline-flex items-center gap-2 rounded-full border border-[#E5E5EA] px-6 py-3 text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#AEAEB2] transition-colors duration-200"
          >
            Read the thesis
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E5E5EA] z-10" />
    </section>
  )
}
