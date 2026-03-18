import { type ReactNode, useState } from 'react'
import { motion } from 'framer-motion'

interface ChipData {
  label: string
  query: string
  icon?: ReactNode
}

interface IntentChipsProps {
  chips: ChipData[]
  onSelect: (query: string) => void
}

export function IntentChips({ chips, onSelect }: IntentChipsProps) {
  const [activeQuery, setActiveQuery] = useState<string | null>(null)

  const handleSelect = (query: string) => {
    setActiveQuery(query)
    onSelect(query)
  }

  return (
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
      {chips.map((chip, i) => {
        const isActive = activeQuery === chip.query
        return (
          <motion.button
            key={chip.label}
            onClick={() => handleSelect(chip.query)}
            className={`shrink-0 px-4 py-2 rounded-full text-[13px] tracking-wide cursor-pointer transition-all duration-150 flex items-center gap-2 ${
              isActive
                ? 'bg-[#4F46E5] text-white shadow-[0_2px_8px_-2px_rgba(79,70,229,0.4)]'
                : 'glass-subtle text-[#1D1D1F] hover:glass'
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, delay: i * 0.06, ease: 'easeOut' }}
          >
            {chip.icon && (
              <span className={`shrink-0 text-[18px] leading-none ${isActive ? 'opacity-90' : 'opacity-60'}`}>
                {chip.icon}
              </span>
            )}
            {chip.label}
          </motion.button>
        )
      })}
    </div>
  )
}
