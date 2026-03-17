import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const colorMap: Record<string, { dot: string; pill: string; pillText: string }> = {
  indigo: { dot: 'bg-[#4F46E5]', pill: 'bg-[#4F46E5]/10 border-[#4F46E5]/20', pillText: 'text-[#818CF8]' },
  coral: { dot: 'bg-[#E2614B]', pill: 'bg-[#E2614B]/10 border-[#E2614B]/20', pillText: 'text-[#E2614B]' },
  amber: { dot: 'bg-[#D97706]', pill: 'bg-[#D97706]/10 border-[#D97706]/20', pillText: 'text-[#FBBF24]' },
}

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.18, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export function ProductSection() {
  const layers = PITCH.product.layers

  return (
    <section id="product" className="bg-[#09090B] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-bold text-white mb-16"
        >
          {PITCH.product.title}
        </motion.h2>

        <div className="relative pl-10 md:pl-14">
          {/* Vertical gradient line */}
          <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-[2px]">
            <div className="h-full w-full bg-gradient-to-b from-[#4F46E5] via-[#E2614B] to-[#D97706]" />
          </div>

          <div className="flex flex-col gap-8">
            {layers.map((layer, i) => {
              const colors = colorMap[layer.color] ?? colorMap.indigo

              return (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="relative"
                >
                  {/* Dot on the line */}
                  <div
                    className={`absolute top-6 w-3 h-3 rounded-full ${colors.dot} ring-4 ring-[#09090B]`}
                    style={{ left: '-34px' }}
                  />

                  {/* Card */}
                  <div className="bg-[#141416] rounded-xl p-6 border border-white/[0.06]">
                    <h3 className="text-xl font-semibold text-white">{layer.name}</h3>
                    <p className="text-[#9CA3AF] text-sm mt-2 leading-relaxed">
                      {layer.description}
                    </p>
                    <span
                      className={`inline-block mt-4 text-xs font-medium px-3 py-1 rounded-full border ${colors.pill} ${colors.pillText}`}
                    >
                      {layer.detail}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-16 border-l-[3px] border-[#4F46E5] pl-6"
        >
          <p className="text-white font-medium">Answers, not listings.</p>
        </motion.div>
      </div>
    </section>
  )
}
