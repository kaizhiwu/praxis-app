import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

export function HeroSection() {
  const headline = PITCH.hero.headline
  const glowPhrase = 'what you can actually do there'
  const idx = headline.indexOf(glowPhrase)
  const beforeGlow = idx >= 0 ? headline.slice(0, idx) : headline

  // Split all text into words for staggered animation
  const allWords = headline.split(/(\s+|\n)/).filter(w => w.trim().length > 0)
  const glowStart = beforeGlow.split(/\s+/).filter(Boolean).length
  const glowWordCount = glowPhrase.split(/\s+/).filter(Boolean).length

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090B]">
      {/* Aurora animated gradient background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Layer 1: slow-moving aurora */}
        <motion.div
          className="absolute inset-[-100%]"
          style={{
            background: `repeating-linear-gradient(100deg, #4F46E5 10%, #6366F1 15%, #E2614B 20%, #4F46E5 25%, #D97706 30%)`,
            backgroundSize: '300% 100%',
            filter: 'blur(100px)',
            opacity: 0.06,
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        {/* Layer 2: interference pattern */}
        <motion.div
          className="absolute inset-[-10px]"
          style={{
            background: `repeating-linear-gradient(100deg, rgba(79,70,229,0.08) 0%, rgba(79,70,229,0.08) 7%, transparent 10%, transparent 12%, rgba(79,70,229,0.08) 16%), repeating-linear-gradient(100deg, #4F46E5 10%, #818CF8 15%, #E2614B 20%, #4F46E5 25%, #D97706 30%)`,
            backgroundSize: '200%, 100%',
            mixBlendMode: 'difference' as const,
            opacity: 0.04,
            filter: 'blur(60px)',
          }}
          animate={{
            backgroundPosition: ['50% 50%, 50% 50%', '100% 50%, 150% 50%', '50% 50%, 50% 50%'],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        {/* Vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(9,9,11,0.7) 70%, rgba(9,9,11,1) 100%)',
          }}
        />
      </div>

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-block mb-8 rounded-full border border-white/10 px-4 py-1.5 backdrop-blur-sm bg-white/[0.02]"
        >
          <span className="text-xs uppercase tracking-widest text-[#9CA3AF]">
            {PITCH.hero.tagline}
          </span>
        </motion.div>

        {/* Letter-by-letter headline with spring animation */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.08]">
          {allWords.map((word, wi) => {
            const isGlowWord = wi >= glowStart && wi < glowStart + glowWordCount
            return (
              <span key={wi} className="inline-block mr-[0.25em] last:mr-0 mb-1">
                {word === '\n' ? (
                  <br />
                ) : (
                  word.split('').map((letter, li) => (
                    <motion.span
                      key={`${wi}-${li}`}
                      initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      transition={{
                        delay: 0.4 + wi * 0.06 + li * 0.02,
                        type: 'spring',
                        stiffness: 120,
                        damping: 16,
                      }}
                      className={`inline-block ${
                        isGlowWord
                          ? 'bg-clip-text text-transparent'
                          : 'text-transparent bg-clip-text'
                      }`}
                      style={
                        isGlowWord
                          ? {
                              backgroundImage: 'linear-gradient(135deg, #818CF8, #4F46E5, #6366F1)',
                              textShadow: '0 0 40px rgba(79,70,229,0.5), 0 0 80px rgba(79,70,229,0.2)',
                            }
                          : {
                              backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.4))',
                            }
                      }
                    >
                      {letter}
                    </motion.span>
                  ))
                )}
              </span>
            )
          })}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-8 text-lg text-[#9CA3AF] max-w-2xl mx-auto leading-relaxed"
        >
          {PITCH.hero.sub}
        </motion.p>

        {/* Founder note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-3 text-sm text-[#6B7280]"
        >
          {PITCH.hero.founderNote}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="/"
            className="group relative inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
              boxShadow: '0 0 24px -4px rgba(79,70,229,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Shimmer */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
              }}
            />
            <span className="relative z-10">Try the product &rarr;</span>
          </a>
          <a
            href="#problem"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/[0.04] hover:border-white/20 backdrop-blur-sm"
          >
            Read the thesis &darr;
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4F46E5]/20 to-transparent" />

      {/* Shimmer keyframe */}
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </section>
  )
}
