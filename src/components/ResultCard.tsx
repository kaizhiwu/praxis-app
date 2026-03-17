import { motion } from 'framer-motion'
import { AttributeBar } from './AttributeBar'
import type { SearchResult } from '../data/types'

interface ResultCardProps {
  result: SearchResult
  index: number
  onClick: () => void
}

export function ResultCard({ result, index, onClick }: ResultCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full text-left bg-surface border border-surface-border rounded-2xl p-5 sm:p-6 space-y-4 hover:border-surface-border-hover hover:shadow-[0_2px_20px_-4px_rgba(91,154,154,0.06)] transition-all duration-200 cursor-pointer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeOut' }}
    >
      {/* Match score indicator */}
      <div
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-accent"
        style={{ opacity: result.matchScore }}
      />

      <div>
        <div className="flex items-baseline justify-between gap-3 pr-4">
          <h3 className="text-text-primary font-semibold text-lg tracking-tight">
            {result.place.name}
          </h3>
          <span className="bg-surface-hover rounded-full px-2 py-0.5 text-text-secondary text-[11px] shrink-0">
            {result.place.distance}
          </span>
        </div>
        <p className="text-text-tertiary text-[11px] tracking-wide mt-0.5">
          {result.place.neighborhood}
        </p>
      </div>

      <p className="text-text-secondary text-[13px] leading-relaxed">
        {result.summary}
      </p>

      <div className="space-y-3">
        {result.topAttributes.slice(0, 3).map(attr => (
          <AttributeBar key={attr.type} attribute={attr} compact />
        ))}
      </div>
    </motion.button>
  )
}
