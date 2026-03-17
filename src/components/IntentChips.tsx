import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

type ChipColor = 'teal' | 'amber' | 'violet'

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
  teal: 'bg-[#1A8A8A]/5 border-[#1A8A8A]/30 text-[#1A8A8A] hover:bg-[#1A8A8A]/12 hover:border-[#1A8A8A]/45',
  amber: 'bg-[#D97B2B]/5 border-[#D97B2B]/30 text-[#D97B2B] hover:bg-[#D97B2B]/12 hover:border-[#D97B2B]/45',
  violet: 'bg-[#7C5AC7]/5 border-[#7C5AC7]/30 text-[#7C5AC7] hover:bg-[#7C5AC7]/12 hover:border-[#7C5AC7]/45',
}

const defaultColor = 'teal'

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
