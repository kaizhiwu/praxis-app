import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const icons: Record<string, React.ReactNode> = {
  laptop: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 16h18" />
    </svg>
  ),
  droplet: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2C10 2 4 9 4 12.5a6 6 0 0 0 12 0C16 9 10 2 10 2z" />
    </svg>
  ),
  dollar: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 1v18M14 5H8a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6H6" />
    </svg>
  ),
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export function ProblemSection() {
  return (
    <section id="problem" className="bg-[#09090B] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-bold text-white mb-12"
        >
          {PITCH.problem.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PITCH.problem.stories.map((story, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-[#141416] rounded-2xl p-6 border border-white/[0.06] flex flex-col gap-4"
            >
              <div className="text-[#6B7280]">
                {icons[story.icon]}
              </div>

              <p className="text-white font-medium">&ldquo;{story.query.replace(/^"|"$/g, '')}&rdquo;</p>

              <div>
                <p className="text-[#6B7280] text-xs uppercase tracking-wide mb-1">
                  What Maps says:
                </p>
                <p className="text-[#9CA3AF] text-sm">{story.mapsResult}</p>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <div>
                <p className="text-[#6B7280] text-xs uppercase tracking-wide mb-1">
                  What actually happened:
                </p>
                <p className="text-[#E2614B] text-sm">{story.reality}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 border-l-[3px] border-[#4F46E5] pl-6"
        >
          <p className="text-lg text-[#9CA3AF] italic">{PITCH.problem.insight}</p>
        </motion.blockquote>
      </div>
    </section>
  )
}
