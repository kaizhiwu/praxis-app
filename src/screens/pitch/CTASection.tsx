import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

export function CTASection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute inset-[-50%]"
          style={{
            background: `repeating-linear-gradient(100deg, #4F46E5 10%, #6366F1 15%, #E2614B 20%, #4F46E5 25%, #D97706 30%)`,
            backgroundSize: '300% 100%',
            filter: 'blur(120px)',
            opacity: 0.05,
          }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(9,9,11,0.8) 70%)',
          }}
        />
      </div>

      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Decorative gradient lines */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#4F46E5]/40" />
          <div className="w-2 h-2 rounded-full bg-[#4F46E5]/40" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#4F46E5]/40" />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto leading-tight"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.4))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
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
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {PITCH.cta.points.map((point) => (
            <span
              key={point}
              className="text-xs text-[#9CA3AF] bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-sm"
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
            className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-white font-medium transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
              boxShadow: '0 0 32px -4px rgba(79,70,229,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.15) 50%, transparent 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite',
              }}
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            <span className="relative z-10">{PITCH.cta.email}</span>
          </a>

          <a
            href="https://x.com/kaizhi_wu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-[#9CA3AF] font-medium border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.15] transition-all backdrop-blur-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            DM on Twitter
          </a>
        </motion.div>

        {/* Bottom decorative */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#4F46E5]/40" />
          <div className="w-2 h-2 rounded-full bg-[#4F46E5]/40" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#4F46E5]/40" />
        </div>
      </div>

      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </section>
  )
}
