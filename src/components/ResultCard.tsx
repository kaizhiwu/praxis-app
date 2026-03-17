import { motion } from 'framer-motion'
import { AttributeBar } from './AttributeBar'
import type { SearchResult, AttributeType } from '../data/types'

interface ResultCardProps {
  result: SearchResult
  index: number
  onClick: () => void
}

function getAttributeIcon(type: AttributeType) {
  const props = {
    width: 12,
    height: 12,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'shrink-0 text-text-secondary',
  }

  switch (type) {
    case 'outlet_usability':
      return (
        <svg {...props}>
          <path d="M12 22v-5" />
          <path d="M9 8V2" />
          <path d="M15 8V2" />
          <path d="M18 8v4a6 6 0 0 1-12 0V8h12Z" />
        </svg>
      )
    case 'laptop_tolerance':
      return (
        <svg {...props}>
          <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9" />
          <path d="M2 17h20l-1 3H3l-1-3Z" />
        </svg>
      )
    case 'noise_level':
      return (
        <svg {...props}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )
    case 'restroom_access':
      return (
        <svg {...props}>
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7Z" />
        </svg>
      )
    case 'purchase_pressure':
      return (
        <svg {...props}>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    case 'call_friendliness':
      return (
        <svg {...props}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      )
    case 'seating_reliability':
      return (
        <svg {...props}>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <rect x="4" y="11" width="16" height="6" rx="2" />
          <path d="M6 17v4" />
          <path d="M18 17v4" />
        </svg>
      )
    case 'indoor_waiting':
      return (
        <svg {...props}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M8 10h.01" />
          <path d="M16 10h.01" />
          <path d="M8 14h.01" />
          <path d="M16 14h.01" />
        </svg>
      )
    case 'water_access':
      return (
        <svg {...props}>
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7Z" />
        </svg>
      )
    case 'staff_strictness':
      return (
        <svg {...props}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    case 'safety':
      return (
        <svg {...props}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        </svg>
      )
    case 'markdown_likelihood':
      return (
        <svg {...props}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      )
    case 'late_food':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case 'budget_value':
      return (
        <svg {...props}>
          <circle cx="8" cy="8" r="6" />
          <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
          <path d="M7 6h1v4" />
          <path d="m16.71 13.88.7.71-2.82 2.82" />
        </svg>
      )
  }
}

function MatchScoreRing({ score }: { score: number }) {
  const size = 36
  const strokeWidth = 2.5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - score)
  const displayScore = Math.round(score * 100)

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E4E2DC"
          strokeWidth={strokeWidth}
        />
        {/* Score arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1A8A8A"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />
      </svg>
      {/* Score text */}
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold font-mono text-text-primary tabular-nums">
        {displayScore}
      </span>
    </div>
  )
}

export function ResultCard({ result, index, onClick }: ResultCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative w-full text-left bg-white rounded-2xl border border-surface-border shadow-sm p-5 sm:p-6 space-y-4 cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-md hover:border-accent/20"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -2,
        boxShadow: '0 8px 24px -8px rgba(26,138,138,0.12)',
      }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeOut' }}
    >
      {/* Rank watermark */}
      <span className="absolute top-2 left-4 text-[48px] font-bold leading-none text-surface-border/60 select-none pointer-events-none">
        {index + 1}
      </span>

      {/* Match score ring */}
      <div className="absolute top-4 right-4 z-10">
        <MatchScoreRing score={result.matchScore} />
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-baseline justify-between gap-3 pr-12">
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

      {/* Summary with accent border */}
      <div className="relative z-10 flex gap-3">
        <div className="w-0.5 shrink-0 rounded-full bg-accent/50" />
        <p className="text-text-primary/70 text-[13px] leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Attribute bars with icons */}
      <div className="relative z-10 space-y-3">
        {result.topAttributes.slice(0, 3).map(attr => (
          <div key={attr.type} className="flex items-start gap-2">
            <div className="mt-[3px]">
              {getAttributeIcon(attr.type)}
            </div>
            <div className="flex-1 min-w-0">
              <AttributeBar attribute={attr} compact />
            </div>
          </div>
        ))}
      </div>
    </motion.button>
  )
}
