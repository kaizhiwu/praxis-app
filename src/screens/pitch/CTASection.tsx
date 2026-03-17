import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

export function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Gradient glow orbs */}
      <div
        className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[180px] bg-[#4F46E5] opacity-[0.08] pointer-events-none"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[160px] bg-[#E2614B] opacity-[0.05] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Decorative gradient lines */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#4F46E5]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]/60" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#4F46E5]/40" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-white text-center max-w-3xl mx-auto leading-tight"
        >
          {PITCH.cta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-[#9CA3AF] mt-6"
        >
          {PITCH.cta.sub}
        </motion.p>

        {/* Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {PITCH.cta.points.map((point) => (
            <span
              key={point}
              className="text-xs text-[#9CA3AF] bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-1.5"
            >
              {point}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`mailto:${PITCH.cta.email}`}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-white font-medium transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#4F46E5]/20"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            {PITCH.cta.email}
          </a>

          <a
            href="https://x.com/kaizhi_wu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-[#9CA3AF] font-medium border border-white/[0.08] hover:bg-white/[0.04] transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            DM on Twitter
          </a>
        </motion.div>

        {/* Decorative gradient lines below */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#4F46E5]/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]/60" />
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#4F46E5]/40" />
        </div>
      </div>
    </section>
  )
}
