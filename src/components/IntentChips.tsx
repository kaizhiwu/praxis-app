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

const colorStyles: Record<ChipColor, { className: string; gradient: string; dotColor: string }> = {
  indigo: {
    className: 'border-[#4F46E5]/30 text-[#4F46E5] hover:border-[#4F46E5]/45 hover:shadow-[0_2px_8px_-2px_rgba(79,70,229,0.2)]',
    gradient: 'linear-gradient(135deg, rgba(79,70,229,0.06), rgba(129,140,248,0.1))',
    dotColor: '#818CF8',
  },
  coral: {
    className: 'border-[#E2614B]/30 text-[#E2614B] hover:border-[#E2614B]/45 hover:shadow-[0_2px_8px_-2px_rgba(226,97,75,0.2)]',
    gradient: 'linear-gradient(135deg, rgba(226,97,75,0.06), rgba(248,113,113,0.1))',
    dotColor: '#F87171',
  },
  amber: {
    className: 'border-[#D97706]/30 text-[#D97706] hover:border-[#D97706]/45 hover:shadow-[0_2px_8px_-2px_rgba(217,119,6,0.2)]',
    gradient: 'linear-gradient(135deg, rgba(217,119,6,0.06), rgba(251,191,36,0.1))',
    dotColor: '#FBBF24',
  },
}

const defaultColor = 'indigo'

export function IntentChips({ chips, onSelect }: IntentChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
      {chips.map((chip, i) => {
        const color = chip.color ?? defaultColor
        const style = colorStyles[color]
        return (
          <motion.button
            key={chip.label}
            onClick={() => onSelect(chip.query)}
            className={`shrink-0 px-4 py-2.5 min-h-[44px] rounded-full border text-[13px] tracking-wide cursor-pointer transition-all duration-150 flex items-center gap-2 relative overflow-hidden ${style.className}`}
            style={{ background: style.gradient }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, delay: i * 0.06, ease: 'easeOut' }}
          >
            {/* Decorative corner dot */}
            <span
              className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full opacity-40"
              style={{ backgroundColor: style.dotColor }}
            />
            {chip.icon && (
              <span className="shrink-0 opacity-60 text-[18px] leading-none">{chip.icon}</span>
            )}
            {chip.label}
          </motion.button>
        )
      })}
    </div>
  )
}
