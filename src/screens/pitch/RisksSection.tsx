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
            className="text-4xl font-bold mb-8 text-[#1D1D1F]"
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
                className="p-4 rounded-xl bg-white border border-[#E5E5EA]"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E2614B] shrink-0" />
                  <span className="text-[#1D1D1F] font-medium">{item.risk}</span>
                </div>
                <p className="text-[#6E6E73] text-sm mt-2 ml-4">
                  {item.mitigation}
                </p>
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
            className="text-4xl font-bold mb-8 text-[#1D1D1F]"
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
                <span className="text-[#AEAEB2] select-none">—</span>
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
