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

const cardColors = [
  { accent: '#4F46E5', glow: 'rgba(79,70,229,0.15)', border: 'rgba(79,70,229,0.2)' },
  { accent: '#E2614B', glow: 'rgba(226,97,75,0.12)', border: 'rgba(226,97,75,0.2)' },
  { accent: '#D97706', glow: 'rgba(217,119,6,0.12)', border: 'rgba(217,119,6,0.2)' },
]

export function MoatSection() {
  const layers = PITCH.moat.layers

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Grid dot texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {PITCH.moat.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#6B7280] text-sm mb-12 max-w-lg"
        >
          The incumbent&apos;s rational response is to do nothing.
        </motion.p>

        {/* Bento grid: large card + 2 smaller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Large featured card — Structural Conflict */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:row-span-2 relative group rounded-2xl p-8 md:p-10 overflow-hidden"
            style={{
              background: '#141416',
              border: `1px solid ${cardColors[0].border}`,
              boxShadow: `0 0 60px -12px ${cardColors[0].glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
            }}
          >
            {/* Animated gradient top border */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${cardColors[0].accent}, transparent)`,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Inner glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(ellipse at 30% 20%, ${cardColors[0].glow} 0%, transparent 60%)`,
              }}
            />

            <div className="relative z-10">
              {icons[layers[0].icon]?.(cardColors[0].accent)}
              <h3 className="text-2xl font-bold text-white mt-6 mb-4">{layers[0].name}</h3>
              <p className="text-[#9CA3AF] leading-relaxed">{layers[0].description}</p>
            </div>
          </motion.div>

          {/* Two smaller cards */}
          {layers.slice(1).map((layer, i) => {
            const colors = cardColors[i + 1]
            const renderIcon = icons[layer.icon]
            return (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="relative group rounded-2xl p-8 overflow-hidden"
                style={{
                  background: '#141416',
                  border: `1px solid ${colors.border}`,
                  boxShadow: `inset 0 -20px 80px -20px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                  }}
                />
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${colors.glow} 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  {renderIcon?.(colors.accent)}
                  <h3 className="text-xl font-semibold text-white mt-4 mb-3">{layer.name}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{layer.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
