import { lazy, Suspense, useRef, useEffect } from 'react'
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

  // Pipe Framer Motion scroll value into a plain ref for R3F useFrame
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v
  })

  // Text fades out as you scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -40])

  // CTA fades in at end
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])
  const ctaY = useTransform(scrollYProgress, [0.6, 0.85], [30, 0])

  // Check if device is low-power (mobile) to skip 3D
  const isMobileRef = useRef(false)
  useEffect(() => {
    isMobileRef.current = window.innerWidth <= 768
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#09090B]"
      style={{ height: '200vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Canvas */}
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

        {/* Vignette for text readability */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(9,9,11,0.1) 0%, rgba(9,9,11,0.35) 50%, rgba(9,9,11,0.85) 100%)',
          }}
        />

        {/* Top text — fades out on scroll */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block mb-6 rounded-full border border-white/10 px-4 py-1.5 backdrop-blur-sm bg-white/[0.03]"
            >
              <span className="text-xs uppercase tracking-widest text-[#9CA3AF]">
                {PITCH.hero.tagline}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.08]"
            >
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.4))' }}
              >
                Maps tell you where.
              </span>
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.4))' }}
              >
                We tell you{' '}
              </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #818CF8, #4F46E5, #6366F1)',
                }}
              >
                what you can actually do there
              </span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.4))' }}
              >
                .
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-6 text-base sm:text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed"
            >
              {PITCH.hero.sub}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-3 text-sm text-[#6B7280]"
            >
              {PITCH.hero.founderNote}
            </motion.p>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="mt-10 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-widest text-[#6B7280]">Scroll to explore</span>
              <motion.svg
                width="16" height="24" viewBox="0 0 16 24" fill="none"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <rect x="3" y="1" width="10" height="16" rx="5" stroke="#6B7280" strokeWidth="1" />
                <circle cx="8" cy="7" r="1.5" fill="#4F46E5" />
                <path d="M8 20L5 17M8 20L11 17" stroke="#6B7280" strokeWidth="1" strokeLinecap="round" />
              </motion.svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom CTA — fades in */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 z-10 flex flex-col items-center gap-4"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <div className="flex items-center justify-center gap-4">
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
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4F46E5]/20 to-transparent z-10" />
    </section>
  )
}
