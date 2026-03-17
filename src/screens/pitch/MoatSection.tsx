import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const icons: Record<string, (color: string) => JSX.Element> = {
  schema: (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="4" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="6" cy="24" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="24" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M14 7V14M14 14L6 21M14 14L22 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  database: (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="14" cy="7" rx="9" ry="3.5" stroke={color} strokeWidth="1.5" />
      <path d="M5 7V14C5 15.933 9.029 17.5 14 17.5C18.971 17.5 23 15.933 23 14V7" stroke={color} strokeWidth="1.5" />
      <path d="M5 14V21C5 22.933 9.029 24.5 14 24.5C18.971 24.5 23 22.933 23 21V14" stroke={color} strokeWidth="1.5" />
    </svg>
  ),
  shield: (color) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3L4 7.5V13.5C4 19.5 8.4 25.1 14 26.5C19.6 25.1 24 19.5 24 13.5V7.5L14 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 14L13 17L19 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const iconColors: Record<string, string> = {
  schema: '#4F46E5',
  database: '#E2614B',
  shield: '#D97706',
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
}

export function MoatSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-12"
        >
          {PITCH.moat.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PITCH.moat.layers.map((layer, i) => {
            const color = iconColors[layer.icon] ?? '#4F46E5'
            const renderIcon = icons[layer.icon]

            return (
              <motion.div
                key={layer.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative bg-[#141416] rounded-2xl p-8 border border-white/[0.06] overflow-hidden"
              >
                {/* Gradient top border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                  }}
                />

                {renderIcon?.(color)}

                <h3 className="text-xl font-semibold text-white mt-4">
                  {layer.name}
                </h3>
                <p className="text-sm text-[#9CA3AF] mt-3 leading-relaxed">
                  {layer.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
