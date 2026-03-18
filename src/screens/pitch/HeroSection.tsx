import { useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const VIDEO_SRC = '/models/city-flyover.mp4'

// Data labels that appear at specific scroll thresholds over the video
const DATA_LABELS: { label: string; x: string; y: string; threshold: number }[] = [
  { label: 'outlets ✓', x: '58%', y: '32%', threshold: 0.20 },
  { label: 'quiet zone', x: '38%', y: '40%', threshold: 0.28 },
  { label: 'open now', x: '68%', y: '48%', threshold: 0.36 },
  { label: 'fast wifi', x: '50%', y: '26%', threshold: 0.44 },
  { label: '$$ deals', x: '30%', y: '55%', threshold: 0.52 },
  { label: 'pet friendly', x: '75%', y: '60%', threshold: 0.60 },
]

export function HeroSection() {
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

  // Video overlay darkens less as you scroll (city reveals)
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.75, 0.3])

  // Scroll CTA fades in mid-scroll
  const ctaOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.65, 0.85], [20, 0])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#09090B]"
      style={{ height: '280vh' }}
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
            style={{ filter: 'brightness(0.4) saturate(0.12) contrast(1.15)' }}
          />

          {/* Indigo color wash */}
          <div
            className="absolute inset-0 mix-blend-color"
            style={{ background: 'rgba(99, 102, 241, 0.12)' }}
          />

          {/* Dynamic overlay — darker at start (text readable), lighter on scroll (city reveals) */}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: overlayOpacity, background: '#09090B' }}
          />

          {/* Constant edge vignette for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(9,9,11,0.6) 100%)',
            }}
          />

          {/* Bottom fade to next section */}
          <div
            className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #09090B, transparent)' }}
          />
        </div>

        {/* ── Phase 1: Centered text — the thesis ── */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="text-center px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="inline-flex mb-6 rounded-full border border-white/[0.08] px-4 py-1.5 backdrop-blur-md bg-white/[0.03]"
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                {PITCH.hero.tagline}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.05]"
            >
              <span className="text-white">Maps tell you where.</span>
              <br />
              <span className="text-white/90">We tell you </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #A5B4FC 0%, #818CF8 40%, #6366F1 100%)',
                }}
              >
                what you can
              </span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #4F46E5 100%)',
                }}
              >
                actually do there.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-6 text-base sm:text-lg text-white/50 max-w-lg mx-auto leading-relaxed font-light"
            >
              {PITCH.hero.sub}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="mt-3 text-xs text-white/25 tracking-wide"
            >
              {PITCH.hero.founderNote}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="mt-8 flex items-center justify-center gap-3"
            >
              <a
                href="/"
                className="group inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                  boxShadow: '0 0 30px -8px rgba(99,102,241,0.4)',
                }}
              >
                Try the product
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#problem"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-6 py-2.5 text-sm font-medium text-white/60 transition-all duration-300 hover:text-white/80 hover:border-white/15 hover:bg-white/[0.03]"
              >
                Read the thesis
                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-14 flex flex-col items-center gap-2"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/20">Scroll</span>
              <motion.div
                className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
                animate={{ scaleY: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Phase 2: Data labels materialize over the city ── */}
        {DATA_LABELS.map((d, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none z-10 hidden md:block"
            style={{
              left: d.x,
              top: d.y,
              opacity: useTransform(
                scrollYProgress,
                [d.threshold, d.threshold + 0.05],
                [0, 1],
              ),
              scale: useTransform(
                scrollYProgress,
                [d.threshold, d.threshold + 0.05],
                [0.7, 1],
              ),
            }}
          >
            {/* Connector dot + glass label */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[#818CF8]" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#818CF8] animate-ping opacity-30" />
              </div>
              <div
                className="px-2.5 py-1 rounded-md backdrop-blur-md text-[11px] font-mono tracking-wide"
                style={{
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.15)',
                  color: '#A5B4FC',
                  textShadow: '0 0 12px rgba(99,102,241,0.4)',
                }}
              >
                {d.label}
              </div>
            </div>
          </motion.div>
        ))}

        {/* ── Phase 2 bottom CTA ── */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <a
            href="/"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] backdrop-blur-md"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
              boxShadow: '0 0 30px -6px rgba(99,102,241,0.5)',
            }}
          >
            Try the product
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#problem"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:text-white hover:border-white/15 hover:bg-white/[0.04] backdrop-blur-md"
          >
            Read the thesis
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Section transition line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/15 to-transparent z-10" />
    </section>
  )
}
