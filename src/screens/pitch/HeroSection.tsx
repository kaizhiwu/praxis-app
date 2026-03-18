import { useRef, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const VIDEO_SRC = '/models/city-flyover.mp4'

// Data labels that appear at specific scroll thresholds over the video
const DATA_LABELS: { label: string; x: string; y: string; threshold: number }[] = [
  { label: 'outlets ✓', x: '62%', y: '28%', threshold: 0.15 },
  { label: 'quiet ✓', x: '35%', y: '35%', threshold: 0.22 },
  { label: 'open now', x: '72%', y: '45%', threshold: 0.30 },
  { label: 'wifi fast', x: '48%', y: '22%', threshold: 0.38 },
  { label: '$$ deals', x: '28%', y: '52%', threshold: 0.46 },
  { label: 'pet ok', x: '78%', y: '58%', threshold: 0.54 },
  { label: 'late hrs', x: '55%', y: '62%', threshold: 0.62 },
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
    // Only seek if difference is noticeable (avoids jitter)
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
    const onLoaded = () => {
      video.pause()
      video.currentTime = 0
    }
    video.addEventListener('loadedmetadata', onLoaded)
    return () => video.removeEventListener('loadedmetadata', onLoaded)
  }, [])

  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.25], [0, -40])
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.6, 0.85], [20, 0])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#09090B]"
      style={{ height: '250vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Full-bleed video background ── */}
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) saturate(0.15) contrast(1.1)' }}
          />

          {/* Indigo color wash — tints the desaturated city to match brand */}
          <div
            className="absolute inset-0 mix-blend-color"
            style={{ background: 'rgba(79, 70, 229, 0.15)' }}
          />

          {/* Dark overlay so text is readable */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(9,9,11,0.8) 0%, rgba(9,9,11,0.45) 40%, rgba(9,9,11,0.1) 65%, rgba(9,9,11,0.25) 100%)',
            }}
          />

          {/* Bottom fade to next section */}
          <div
            className="absolute inset-x-0 bottom-0 h-32"
            style={{ background: 'linear-gradient(to top, #09090B, transparent)' }}
          />

          {/* Floating data labels over the city */}
          {DATA_LABELS.map((d, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none hidden md:block"
              style={{
                left: d.x,
                top: d.y,
                opacity: useTransform(
                  scrollYProgress,
                  [d.threshold, d.threshold + 0.06],
                  [0, 0.9],
                ),
                scale: useTransform(
                  scrollYProgress,
                  [d.threshold, d.threshold + 0.06],
                  [0.8, 1],
                ),
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#818CF8] shadow-[0_0_6px_rgba(99,102,241,0.6)]" />
                <span
                  className="text-[11px] font-mono text-[#A5B4FC] whitespace-nowrap"
                  style={{ textShadow: '0 0 10px rgba(99,102,241,0.5), 0 1px 3px rgba(0,0,0,0.8)' }}
                >
                  {d.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Text content — left-aligned over video ── */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 max-w-2xl"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex self-start mb-5 rounded-full border border-white/10 px-3.5 py-1 backdrop-blur-md bg-white/[0.04]"
          >
            <span className="text-[11px] uppercase tracking-widest text-[#9CA3AF]">
              {PITCH.hero.tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            <span className="text-white">Maps tell you where.</span>
            <br />
            <span className="text-white">We tell you </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #A78BFA 100%)',
              }}
            >
              what you can actually do there.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-5 text-sm sm:text-base text-[#C9CDD3] max-w-md leading-relaxed"
          >
            {PITCH.hero.sub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="mt-3 text-xs text-[#6B7280]"
          >
            {PITCH.hero.founderNote}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-8 flex items-center gap-3"
          >
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                boxShadow: '0 0 20px -4px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              Try the product &rarr;
            </a>
            <a
              href="#problem"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/80 transition-all hover:bg-white/[0.04] hover:border-white/20 backdrop-blur-sm"
            >
              Read the thesis &darr;
            </a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="mt-10 flex items-center gap-2"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span className="text-[10px] uppercase tracking-widest text-[#6B7280]">Scroll to explore</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2L6 10M6 10L3 7M6 10L9 7" stroke="#6B7280" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── CTA overlay that appears on scroll ── */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02] backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
              boxShadow: '0 0 24px -4px rgba(79,70,229,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            Try the product &rarr;
          </a>
          <a
            href="#problem"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/[0.04] hover:border-white/20 backdrop-blur-sm"
          >
            Read the thesis &darr;
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4F46E5]/20 to-transparent z-10" />
    </section>
  )
}
