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

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v
  })

  // Text fades out quickly as scroll begins
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.25], [0, -60])

  // City rises up as you scroll
  const cityY = useTransform(scrollYProgress, [0, 0.3], [0, -80])

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
      style={{ height: '250vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* ── Top: Headline text ── */}
        <motion.div
          className="relative z-20 pt-20 sm:pt-24 pb-4 px-6 text-center flex-shrink-0"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-block mb-4 rounded-full border border-white/10 px-4 py-1.5 backdrop-blur-sm bg-white/[0.03]"
          >
            <span className="text-xs uppercase tracking-widest text-[#9CA3AF]">
              {PITCH.hero.tagline}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]"
          >
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.5))' }}
            >
              Maps tell you where.
            </span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.5))' }}
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
              style={{ backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.5))' }}
            >
              .
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-4 text-sm sm:text-base text-[#9CA3AF] max-w-xl mx-auto leading-relaxed"
          >
            {PITCH.hero.sub}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-2 text-xs text-[#6B7280]"
          >
            {PITCH.hero.founderNote}
          </motion.p>
        </motion.div>

        {/* ── Center: 3D cityscape ── */}
        <motion.div className="relative flex-1 min-h-0" style={{ y: cityY }}>
          {/* The canvas fills the remaining space */}
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

          {/* Soft top fade so text blends into 3D — much lighter than before */}
          <div
            className="absolute inset-x-0 top-0 h-24 pointer-events-none z-[1]"
            style={{
              background: 'linear-gradient(to bottom, rgba(9,9,11,0.6), transparent)',
            }}
          />

          {/* Subtle edge vignette — don't darken the center */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(9,9,11,0.7) 100%)',
            }}
          />

          {/* Scroll indicator — overlaid on the 3D scene */}
          <motion.div
            className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-2"
            style={{ opacity: textOpacity }}
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
        </motion.div>

        {/* ── Bottom CTA — fades in after scroll ── */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-4"
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
