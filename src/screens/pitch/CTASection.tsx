import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

export function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Gradient glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px] bg-[#4F46E5] opacity-[0.08] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Decorative gradient lines */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#4F46E5]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#4F46E5]/40" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white text-center max-w-3xl mx-auto"
        >
          {PITCH.cta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-[#9CA3AF] mt-4"
        >
          {PITCH.cta.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href={`mailto:${PITCH.cta.email}`}
            className="inline-block rounded-full px-8 py-4 text-white font-medium transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            }}
          >
            {PITCH.cta.email}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 text-sm text-[#6B7280]"
        >
          Or reach out on{' '}
          <a
            href="https://x.com/kaizhi_wu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9CA3AF] hover:text-white transition-colors underline underline-offset-2"
          >
            Twitter
          </a>
        </motion.p>

        {/* Decorative gradient lines below */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#4F46E5]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#4F46E5]/40" />
        </div>
      </div>
    </section>
  )
}
