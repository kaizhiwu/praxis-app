import { type ReactNode } from 'react'
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
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
      {chips.map((chip, i) => (
        <motion.button
          key={chip.label}
          onClick={() => onSelect(chip.query)}
          className="shrink-0 px-4 py-2.5 min-h-[44px] rounded-full bg-accent/5 border border-accent/20 text-accent text-[13px] tracking-wide cursor-pointer hover:bg-accent/12 hover:border-accent/35 hover:shadow-[0_0_12px_rgba(var(--accent-rgb,255,255,255),0.08)] transition-all duration-150 flex items-center gap-2"
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
      ))}
    </div>
  )
}
