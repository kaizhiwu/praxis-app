import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

export function CTASection({ onContact }: { onContact: () => void }) {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-[#0F0F14] via-[#0F0F14] to-[#080810]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto leading-tight text-[#E8E8ED]"
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          {PITCH.cta.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-[#8E8E93] mt-6"
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
              className="text-xs text-[#8E8E93] glass-dark rounded-full px-4 py-1.5"
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
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-white font-medium bg-[#4F46E5] hover:bg-[#4338CA] transition-colors duration-200 cursor-pointer"
          >
            Apply as design partner
          </button>

          <a
            href="/app"
            className="inline-flex items-center gap-2 rounded-full px-6 py-4 text-[#E8E8ED] font-medium glass-dark hover:bg-[rgba(255,255,255,0.1)] transition-colors duration-200"
          >
            Try the product
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h10M10 4l4 4-4 4" />
            </svg>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xs text-[#8E8E93] mt-6"
        >
          We reply within 24 hours.
        </motion.p>
      </div>
    </section>
  )
}
