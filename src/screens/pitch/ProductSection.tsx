import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { useState } from 'react'

const colorMap: Record<string, { accent: string; bg: string; border: string }> = {
  indigo: { accent: '#4F46E5', bg: 'rgba(79,70,229,0.08)', border: 'rgba(79,70,229,0.2)' },
  coral: { accent: '#E2614B', bg: 'rgba(226,97,75,0.08)', border: 'rgba(226,97,75,0.2)' },
  amber: { accent: '#D97706', bg: 'rgba(217,119,6,0.08)', border: 'rgba(217,119,6,0.2)' },
}

const layerVisuals: Record<string, React.ReactNode> = {
  'Behavioral Place Graph': (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      <circle cx="100" cy="40" r="8" fill="#4F46E5" opacity="0.8" />
      <circle cx="50" cy="100" r="8" fill="#4F46E5" opacity="0.6" />
      <circle cx="150" cy="100" r="8" fill="#4F46E5" opacity="0.6" />
      <circle cx="70" cy="160" r="8" fill="#4F46E5" opacity="0.4" />
      <circle cx="130" cy="160" r="8" fill="#4F46E5" opacity="0.4" />
      <line x1="100" y1="40" x2="50" y2="100" stroke="#4F46E5" strokeWidth="1.5" opacity="0.3" />
      <line x1="100" y1="40" x2="150" y2="100" stroke="#4F46E5" strokeWidth="1.5" opacity="0.3" />
      <line x1="50" y1="100" x2="70" y2="160" stroke="#4F46E5" strokeWidth="1.5" opacity="0.3" />
      <line x1="150" y1="100" x2="130" y2="160" stroke="#4F46E5" strokeWidth="1.5" opacity="0.3" />
      <line x1="50" y1="100" x2="150" y2="100" stroke="#4F46E5" strokeWidth="1" opacity="0.15" />
      <line x1="70" y1="160" x2="130" y2="160" stroke="#4F46E5" strokeWidth="1" opacity="0.15" />
      <text x="100" y="24" textAnchor="middle" fill="#4F46E5" fontSize="9" fontFamily="system-ui">outlet_usability</text>
      <text x="30" y="96" textAnchor="middle" fill="#4F46E5" fontSize="9" fontFamily="system-ui">noise</text>
      <text x="170" y="96" textAnchor="middle" fill="#4F46E5" fontSize="9" fontFamily="system-ui">laptop</text>
      <text x="70" y="182" textAnchor="middle" fill="#4F46E5" fontSize="8" fontFamily="system-ui">restroom</text>
      <text x="130" y="182" textAnchor="middle" fill="#4F46E5" fontSize="8" fontFamily="system-ui">markdown</text>
    </svg>
  ),
  'Truth Engine': (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 30 + i * 35
        const width = 140 - i * 20
        const opacity = 1 - i * 0.18
        return (
          <g key={i}>
            <rect x="30" y={y} width={width} height="16" rx="4" fill="#E2614B" opacity={opacity * 0.7} />
            <rect x="30" y={y} width={width} height="16" rx="4" stroke="#E2614B" strokeWidth="0.5" opacity={0.3} fill="none" />
            <text x={34 + width} y={y + 12} fill="#86868B" fontSize="8" fontFamily="system-ui">{['98%', '85%', '72%', '54%', '31%'][i]}</text>
          </g>
        )
      })}
      <text x="100" y="196" textAnchor="middle" fill="#86868B" fontSize="8" fontFamily="system-ui">confidence decays over time</text>
    </svg>
  ),
  'Query Layer': (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      <text x="100" y="30" textAnchor="middle" fill="#D97706" fontSize="10" fontFamily="system-ui">"quiet cafe to work"</text>
      <line x1="100" y1="38" x2="60" y2="70" stroke="#D97706" strokeWidth="1" opacity="0.4" />
      <line x1="100" y1="38" x2="100" y2="70" stroke="#D97706" strokeWidth="1" opacity="0.4" />
      <line x1="100" y1="38" x2="140" y2="70" stroke="#D97706" strokeWidth="1" opacity="0.4" />
      <rect x="30" y="70" width="60" height="22" rx="6" fill="#D97706" fillOpacity="0.1" stroke="#D97706" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="60" y="85" textAnchor="middle" fill="#D97706" fontSize="8" fontFamily="system-ui">noise_level</text>
      <rect x="70" y="100" width="60" height="22" rx="6" fill="#D97706" fillOpacity="0.1" stroke="#D97706" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="100" y="115" textAnchor="middle" fill="#D97706" fontSize="8" fontFamily="system-ui">laptop_tolerance</text>
      <rect x="110" y="70" width="60" height="22" rx="6" fill="#D97706" fillOpacity="0.1" stroke="#D97706" strokeWidth="0.5" strokeOpacity="0.3" />
      <text x="140" y="85" textAnchor="middle" fill="#D97706" fontSize="8" fontFamily="system-ui">outlet_usability</text>
      <line x1="100" y1="130" x2="100" y2="165" stroke="#D97706" strokeWidth="1" opacity="0.3" />
      <polygon points="95,160 100,170 105,160" fill="#D97706" opacity="0.4" />
      <text x="100" y="188" textAnchor="middle" fill="#86868B" fontSize="8" fontFamily="system-ui">intent-matched results</text>
    </svg>
  ),
  'Answer Layer': (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      {[0, 1, 2].map((i) => {
        const y = 20 + i * 60
        const matchScore = [94, 87, 71][i]
        return (
          <g key={i}>
            <rect x="20" y={y} width="160" height="48" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <circle cx="44" cy={y + 24} r="14" fill="none" stroke="#4F46E5" strokeWidth="2" opacity={1 - i * 0.25} />
            <text x="44" y={y + 28} textAnchor="middle" fill="#E8E8ED" fontSize="9" fontWeight="bold" fontFamily="system-ui">{matchScore}</text>
            <rect x="66" y={y + 12} width={60 - i * 10} height="4" rx="2" fill="#E8E8ED" opacity="0.4" />
            <rect x="66" y={y + 22} width={80 - i * 15} height="3" rx="1.5" fill="#4F46E5" opacity={0.5 - i * 0.12} />
            <rect x="66" y={y + 30} width={70 - i * 12} height="3" rx="1.5" fill="#E2614B" opacity={0.4 - i * 0.1} />
          </g>
        )
      })}
    </svg>
  ),
}

export function ProductSection() {
  const layers = PITCH.product.layers
  const [activeLayer, setActiveLayer] = useState(0)

  return (
    <section id="product" className="bg-[#0F0F14] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-bold mb-4 text-[#E8E8ED]"
        >
          {PITCH.product.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#8E8E93] text-sm sm:text-base max-w-xl mb-10"
        >
          {PITCH.product.sub}
        </motion.p>

        {/* Layer tabs */}
        <div className="flex gap-2 mb-10">
          {layers.map((layer, i) => {
            const colors = colorMap[layer.color] ?? colorMap.indigo
            const isActive = i === activeLayer
            return (
              <button
                key={i}
                onClick={() => setActiveLayer(i)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: isActive ? colors.bg : 'transparent',
                  borderColor: isActive ? colors.border : 'rgba(255,255,255,0.1)',
                  color: isActive ? colors.accent : '#8E8E93',
                  border: '1px solid',
                }}
              >
                {layer.name}
              </button>
            )
          })}
        </div>

        {/* Active layer content */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Left: Text */}
          <div className="flex-1 min-h-[220px] relative">
            {layers.map((layer, i) => {
              const colors = colorMap[layer.color] ?? colorMap.indigo
              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: i === activeLayer ? 1 : 0,
                    y: i === activeLayer ? 0 : 12,
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-0"
                  style={{ pointerEvents: i === activeLayer ? 'auto' : 'none' }}
                >
                  <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-full border mb-4"
                    style={{
                      backgroundColor: colors.bg,
                      borderColor: colors.border,
                      color: colors.accent,
                    }}
                  >
                    Layer {i + 1}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#E8E8ED] mt-2">
                    {layer.name}
                  </h3>
                  <p className="text-[#8E8E93] mt-4 leading-relaxed max-w-md">
                    {layer.description}
                  </p>
                  <p className="text-[#8E8E93] text-sm mt-4 italic">
                    {layer.detail}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Right: Visual */}
          <div className="w-full md:w-[300px] h-[260px] md:h-[300px] shrink-0 relative">
            <div className="absolute inset-0 rounded-2xl overflow-hidden glass-dark">
              {layers.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    opacity: i === activeLayer ? 1 : 0,
                    scale: i === activeLayer ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="absolute inset-4"
                >
                  {layerVisuals[layer.name]}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-l-[3px] border-[#4F46E5] pl-6 mt-12"
        >
          <p className="text-[#E8E8ED] font-medium">Answers, not listings.</p>
        </motion.div>
      </div>
    </section>
  )
}
