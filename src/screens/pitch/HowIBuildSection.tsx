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

const toolColors = ['#4F46E5', '#818CF8', '#E2614B', '#D97706']

export function HowIBuildSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-[#FAFAFA]">
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #1D1D1F 30%, rgba(29,29,31,0.5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
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

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Philosophy card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-2 md:col-span-2 relative group rounded-2xl p-8 overflow-hidden bg-white"
            style={{
              border: '1px solid rgba(79,70,229,0.12)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at 30% 80%, rgba(79,70,229,0.04), transparent 60%)' }}
            />
            <div className="relative z-10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-60">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
              </svg>
              <p className="text-[#6E6E73] leading-relaxed text-lg italic">
                &ldquo;{PITCH.howIBuild.philosophy}&rdquo;
              </p>
            </div>
          </motion.div>

          {/* 4 tool cards */}
          {PITCH.howIBuild.tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="relative group rounded-2xl p-6 overflow-hidden bg-white"
              style={{
                border: `1px solid ${toolColors[i]}18`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${toolColors[i]}, transparent)` }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${toolColors[i]}08, transparent 60%)` }}
              />

              <div className="relative z-10">
                <div style={{ color: toolColors[i] }} className="mb-3">
                  {toolIcons[tool.icon]}
                </div>
                <h3 className="text-[#1D1D1F] font-semibold text-sm">{tool.name}</h3>
                <p className="text-[#86868B] text-xs mt-2 leading-relaxed">{tool.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
