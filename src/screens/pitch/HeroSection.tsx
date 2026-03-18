import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const CitySceneCanvas = lazy(() =>
  import('../../components/CityScene').then((m) => ({ default: m.CitySceneCanvas })),
)

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v
  })

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
        {/* ── Split layout: text left, city right ── */}
        <div className="h-full flex flex-col md:flex-row">
          {/* Left: Text */}
          <motion.div
            className="relative z-10 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-20 pt-20 md:pt-0 md:w-[45%] lg:w-[42%] flex-shrink-0"
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
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-left"
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
              className="mt-5 text-sm sm:text-base text-[#9CA3AF] max-w-md leading-relaxed text-left"
            >
              {PITCH.hero.sub}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-3 text-xs text-[#6B7280] text-left"
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
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-white/80 transition-all hover:bg-white/[0.04] hover:border-white/20"
              >
                Read the thesis &darr;
              </a>
            </motion.div>

            {/* Scroll hint — mobile only */}
            <motion.div
              className="mt-8 flex items-center gap-2 md:hidden"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <span className="text-[10px] uppercase tracking-widest text-[#6B7280]">Scroll to explore</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2L6 10M6 10L3 7M6 10L9 7" stroke="#6B7280" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Right: 3D City — fills remaining space */}
          <div className="relative flex-1 min-h-[50vh] md:min-h-0">
            <div className="absolute inset-0">
              <Suspense
                fallback={
                  <div className="w-full h-full bg-[#09090B] flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-[#4F46E5]/30 border-t-[#4F46E5] rounded-full animate-spin" />
                  </div>
                }
              >
                <CitySceneCanvas scrollRef={scrollRef} />
              </Suspense>
            </div>

            {/* Soft left edge fade so city blends into text area */}
            <div
              className="absolute inset-y-0 left-0 w-24 pointer-events-none z-[1] hidden md:block"
              style={{ background: 'linear-gradient(to right, rgba(9,9,11,0.8), transparent)' }}
            />

            {/* Bottom fade */}
            <div
              className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-[1]"
              style={{ background: 'linear-gradient(to top, rgba(9,9,11,0.6), transparent)' }}
            />

            {/* Desktop scroll hint — bottom right of city */}
            <motion.div
              className="absolute bottom-6 right-8 z-10 hidden md:flex flex-col items-center gap-1.5"
              style={{ opacity: contentOpacity }}
            >
              <span className="text-[10px] uppercase tracking-widest text-[#6B7280]">Scroll</span>
              <motion.svg
                width="14" height="20" viewBox="0 0 14 20" fill="none"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
              >
                <rect x="2" y="1" width="10" height="14" rx="5" stroke="#6B7280" strokeWidth="1" />
                <circle cx="7" cy="6" r="1.5" fill="#6366F1" />
                <path d="M7 17L4.5 14.5M7 17L9.5 14.5" stroke="#6B7280" strokeWidth="1" strokeLinecap="round" />
              </motion.svg>
            </motion.div>
          </div>
        </div>

        {/* ── CTA overlay on scroll ── */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02]"
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
