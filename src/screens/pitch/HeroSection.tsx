import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090B]">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[180px] bg-[#4F46E5] opacity-[0.05]"
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ top: '10%', left: '15%' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[160px] bg-[#E2614B] opacity-[0.04]"
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 60, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{ top: '30%', right: '10%' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-block mb-8 rounded-full border border-white/10 px-4 py-1.5"
        >
          <span className="text-xs uppercase tracking-widest text-[#9CA3AF]">
            {PITCH.hero.tagline}
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
        >
          What happens when one person{'\n'}
          <span
            className="text-[#4F46E5]"
            style={{
              textShadow: '0 0 40px rgba(79, 70, 229, 0.4), 0 0 80px rgba(79, 70, 229, 0.2)',
            }}
          >
            builds with AI
          </span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-lg text-[#9CA3AF] max-w-2xl mx-auto"
        >
          {PITCH.hero.sub}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[#4F46E5] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
          >
            Try the product &rarr;
          </a>
          <a
            href="#problem"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.04]"
          >
            Read the thesis &darr;
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4F46E5]/20 to-transparent" />
    </section>
  )
}
