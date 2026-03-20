import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

export function CTASection() {
  return (
    <section className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto leading-tight text-[#1D1D1F]"
        >
          {PITCH.cta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-[#6E6E73] mt-6"
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
              className="text-xs text-[#6E6E73] bg-white border border-[#E5E5EA] rounded-full px-4 py-1.5"
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
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-white font-medium bg-[#4F46E5] hover:bg-[#4338CA] transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
            <span>{PITCH.cta.email}</span>
          </a>

          <a
            href="https://x.com/kaizhi_wu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-[#6E6E73] font-medium border border-[#E5E5EA] hover:border-[#AEAEB2] hover:text-[#1D1D1F] transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            DM on Twitter
          </a>
        </motion.div>
      </div>
    </section>
  )
}
