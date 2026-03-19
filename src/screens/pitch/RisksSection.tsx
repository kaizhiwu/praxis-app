import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
}

export function RisksSection() {
  return (
    <section className="py-32 px-6 bg-[#F5F5F7]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left: Risks */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-8"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #1D1D1F 30%, rgba(29,29,31,0.5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {PITCH.risks.title}
          </motion.h2>

          <div className="space-y-4">
            {PITCH.risks.items.map((item, i) => (
              <motion.div
                key={item.risk}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group p-4 rounded-xl overflow-hidden relative bg-white"
                style={{
                  border: '1px solid rgba(226,97,75,0.12)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(226,97,75,0.04), transparent 60%)' }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E2614B] shrink-0" />
                    <span className="text-[#1D1D1F] font-medium">{item.risk}</span>
                  </div>
                  <p className="text-[#6E6E73] text-sm mt-2 ml-4">
                    {item.mitigation}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: What we are not */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-8"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #1D1D1F 30%, rgba(29,29,31,0.5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {PITCH.notList.title}
          </motion.h2>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            {PITCH.notList.items.map((item) => (
              <li key={item} className="text-[#6E6E73] flex items-start gap-3">
                <span className="text-[#4F46E5]/40 select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
