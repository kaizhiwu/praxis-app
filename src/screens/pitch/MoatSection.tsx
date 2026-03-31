import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const icons: Record<string, (color: string) => React.ReactNode> = {
  schema: (color) => (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="4" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="6" cy="24" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="24" r="3" stroke={color} strokeWidth="1.5" />
      <path d="M14 7V14M14 14L6 21M14 14L22 21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  database: (color) => (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
      <ellipse cx="14" cy="7" rx="9" ry="3.5" stroke={color} strokeWidth="1.5" />
      <path d="M5 7V14C5 15.933 9.029 17.5 14 17.5C18.971 17.5 23 15.933 23 14V7" stroke={color} strokeWidth="1.5" />
      <path d="M5 14V21C5 22.933 9.029 24.5 14 24.5C18.971 24.5 23 22.933 23 21V14" stroke={color} strokeWidth="1.5" />
    </svg>
  ),
  shield: (color) => (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
      <path d="M14 3L4 7.5V13.5C4 19.5 8.4 25.1 14 26.5C19.6 25.1 24 19.5 24 13.5V7.5L14 3Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 14L13 17L19 11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

export function MoatSection() {
  const layers = PITCH.moat.layers

  return (
    <section className="py-20 px-6 bg-[#FAF8F5]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4 text-[#1D1D1F]"
        >
          {PITCH.moat.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#6E6E73] text-sm mb-8 max-w-lg"
        >
          The incumbent&apos;s rational response is to do nothing.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Large featured card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:row-span-2 rounded-2xl p-8 md:p-10 bg-white border border-[#E5E5EA]"
          >
            {icons[layers[0].icon]?.('#86868B')}
            <h3 className="text-2xl font-bold text-[#1D1D1F] mt-6 mb-4">{layers[0].name}</h3>
            <p className="text-[#6E6E73] leading-relaxed">{layers[0].description}</p>
          </motion.div>

          {/* Two smaller cards */}
          {layers.slice(1).map((layer, i) => {
            const renderIcon = icons[layer.icon]
            return (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="rounded-2xl p-8 bg-white border border-[#E5E5EA]"
              >
                {renderIcon?.('#86868B')}
                <h3 className="text-xl font-semibold text-[#1D1D1F] mt-4 mb-3">{layer.name}</h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">{layer.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* "What this is not" pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#86868B] mb-4">
            {PITCH.notList.title}
          </h3>
          <div className="flex flex-wrap gap-3">
            {PITCH.notList.items.map((item) => (
              <span
                key={item}
                className="text-xs text-[#6E6E73] bg-white border border-[#E5E5EA] rounded-full px-4 py-1.5"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
