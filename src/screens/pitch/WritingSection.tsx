import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

export function WritingSection() {
  const { writing } = PITCH

  return (
    <section id="writing" className="bg-[#FAFAFA] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex rounded-full border border-[#E5E5EA] px-4 py-1.5 bg-white">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#86868B]">
              {writing.eyebrow}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#1D1D1F] mt-6 mb-4">
            {writing.headline}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {writing.articles.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group rounded-2xl p-6 bg-white border border-[#E5E5EA] hover:border-[#AEAEB2] transition-colors cursor-pointer"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
            >
              <p className="text-xs text-[#86868B]">
                {article.date} &middot; {article.readTime}
              </p>
              <h3 className="text-lg font-semibold text-[#1D1D1F] mt-2 group-hover:text-[#4F46E5] transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-sm text-[#6E6E73] italic mt-3 border-l-2 border-[#4F46E5] pl-3 leading-relaxed">
                {article.pullQuote}
              </p>
              <span className="text-xs text-[#4F46E5] mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read on Substack
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M10 4l4 4-4 4" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
