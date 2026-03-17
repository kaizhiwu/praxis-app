import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

type ChipColor = 'indigo' | 'coral' | 'amber'

interface ChipData {
  label: string
  query: string
  icon?: ReactNode
  color?: ChipColor
}

interface IntentChipsProps {
  chips: ChipData[]
  onSelect: (query: string) => void
}

const colorStyles: Record<ChipColor, string> = {
  indigo: 'bg-[#4F46E5]/5 border-[#4F46E5]/30 text-[#4F46E5] hover:bg-[#4F46E5]/12 hover:border-[#4F46E5]/45',
  coral: 'bg-[#E2614B]/5 border-[#E2614B]/30 text-[#E2614B] hover:bg-[#E2614B]/12 hover:border-[#E2614B]/45',
  amber: 'bg-[#D97706]/5 border-[#D97706]/30 text-[#D97706] hover:bg-[#D97706]/12 hover:border-[#D97706]/45',
}

const defaultColor = 'indigo'

export function IntentChips({ chips, onSelect }: IntentChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
      {chips.map((chip, i) => {
        const color = chip.color ?? defaultColor
        return (
          <motion.button
            key={chip.label}
            onClick={() => onSelect(chip.query)}
            className={`shrink-0 px-4 py-2.5 min-h-[44px] rounded-full border text-[13px] tracking-wide cursor-pointer transition-all duration-150 flex items-center gap-2 ${colorStyles[color]}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, delay: i * 0.06, ease: 'easeOut' }}
          >
            {chip.icon && (
              <span className="shrink-0 opacity-60">{chip.icon}</span>
            )}
            {chip.label}
          </motion.button>
        )
      })}
    </div>
  )
}
