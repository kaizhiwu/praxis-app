import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const toolIcons: Record<string, React.ReactNode> = {
  brain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
      <path d="M9 21h6M10 17v4M14 17v4" />
    </svg>
  ),
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  deploy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  stack: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M3 9h18" />
    </svg>
  ),
}

export function HowIBuildSection() {
  return (
    <section className="py-32 px-6 bg-[#FAFAFA]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4 text-[#1D1D1F]"
        >
          {PITCH.howIBuild.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#6E6E73] mb-16 max-w-xl"
        >
          {PITCH.howIBuild.sub}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Philosophy card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-2 rounded-2xl p-8 bg-white border border-[#E5E5EA]"
          >
            <p className="text-[#6E6E73] leading-relaxed text-lg italic">
              &ldquo;{PITCH.howIBuild.philosophy}&rdquo;
            </p>
          </motion.div>

          {/* 4 tool cards */}
          {PITCH.howIBuild.tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl p-6 bg-white border border-[#E5E5EA]"
            >
              <div className="text-[#86868B] mb-3">
                {toolIcons[tool.icon]}
              </div>
              <h3 className="text-[#1D1D1F] font-semibold text-sm">{tool.name}</h3>
              <p className="text-[#86868B] text-xs mt-2 leading-relaxed">{tool.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
