import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const { market } = PITCH

const tiers = [
  { data: market.tam, color: '#4F46E5', r: 140, strokeOpacity: 0.15, fillOpacity: 0.03, labelY: -130 },
  { data: market.sam, color: '#E2614B', r: 90, strokeOpacity: 0.2, fillOpacity: 0.04, labelY: 0 },
  { data: market.som, color: '#D97706', r: 50, strokeOpacity: 0.3, fillOpacity: 0.06, labelY: 0 },
] as const

const descRows = [
  { data: market.tam, color: '#4F46E5', label: 'TAM' },
  { data: market.sam, color: '#E2614B', label: 'SAM' },
  { data: market.som, color: '#D97706', label: 'SOM' },
] as const

export function MarketSection() {
  return (
    <section className="bg-[#09090B] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-white mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {market.title}
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          {/* Concentric circles SVG */}
          <motion.div
            className="shrink-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <svg
              viewBox="-160 -160 320 320"
              className="w-72 h-72 sm:w-80 sm:h-80"
              overflow="visible"
            >
              {/* TAM — outermost */}
              <motion.circle
                cx={0}
                cy={0}
                r={tiers[0].r}
                stroke={tiers[0].color}
                strokeOpacity={tiers[0].strokeOpacity}
                strokeWidth={1.5}
                fill={tiers[0].color}
                fillOpacity={tiers[0].fillOpacity}
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { scale: 1, opacity: 1 },
                }}
                transition={{ duration: 0.6, delay: 0, ease: 'easeOut' }}
                style={{ originX: '0px', originY: '0px' }}
              />
              {/* TAM label — top */}
              <motion.g
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <text x={0} y={-148} textAnchor="middle" fill="white" fontSize={16} fontWeight={700}>
                  {market.tam.value}
                </text>
                <text x={0} y={-132} textAnchor="middle" fill="#9CA3AF" fontSize={10}>
                  TAM
                </text>
              </motion.g>

              {/* SAM — middle */}
              <motion.circle
                cx={0}
                cy={0}
                r={tiers[1].r}
                stroke={tiers[1].color}
                strokeOpacity={tiers[1].strokeOpacity}
                strokeWidth={1.5}
                fill={tiers[1].color}
                fillOpacity={tiers[1].fillOpacity}
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { scale: 1, opacity: 1 },
                }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                style={{ originX: '0px', originY: '0px' }}
              />
              {/* SAM label — right */}
              <motion.g
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.4, delay: 0.65 }}
              >
                <text x={100} y={-4} textAnchor="start" fill="white" fontSize={16} fontWeight={700}>
                  {market.sam.value}
                </text>
                <text x={100} y={12} textAnchor="start" fill="#9CA3AF" fontSize={10}>
                  SAM
                </text>
              </motion.g>

              {/* SOM — innermost */}
              <motion.circle
                cx={0}
                cy={0}
                r={tiers[2].r}
                stroke={tiers[2].color}
                strokeOpacity={tiers[2].strokeOpacity}
                strokeWidth={1.5}
                fill={tiers[2].color}
                fillOpacity={tiers[2].fillOpacity}
                variants={{
                  hidden: { scale: 0, opacity: 0 },
                  visible: { scale: 1, opacity: 1 },
                }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                style={{ originX: '0px', originY: '0px' }}
              />
              {/* SOM label — center */}
              <motion.g
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <text x={0} y={-4} textAnchor="middle" fill="white" fontSize={14} fontWeight={700}>
                  {market.som.value}
                </text>
                <text x={0} y={12} textAnchor="middle" fill="#9CA3AF" fontSize={10}>
                  SOM
                </text>
              </motion.g>
            </svg>
          </motion.div>

          {/* Description rows */}
          <div className="flex flex-col gap-8 flex-1">
            {descRows.map((row, i) => (
              <motion.div
                key={row.label}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              >
                <span
                  className="mt-2 block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: row.color }}
                />
                <div>
                  <p className="text-xl font-bold text-white">
                    {row.data.value}{' '}
                    <span className="text-sm font-medium text-[#9CA3AF]">{row.label}</span>
                  </p>
                  <p className="text-sm text-[#9CA3AF] mt-0.5">{row.data.label}</p>
                  <p className="text-xs text-[#6B7280] mt-1">{row.data.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Wedge callout */}
        <motion.blockquote
          className="mt-20 border-l-2 border-[#4F46E5] pl-6 text-[#9CA3AF] text-lg italic"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {market.wedge}
        </motion.blockquote>
      </div>
    </section>
  )
}
