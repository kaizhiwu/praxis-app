import { motion } from 'framer-motion'
import { AttributeBar } from './AttributeBar'
import type { SearchResult, AttributeType, AttributeCluster } from '../data/types'

interface ResultCardProps {
  result: SearchResult
  index: number
  onClick: () => void
}

const CLUSTER_COLORS: Record<AttributeCluster, { hex: string; label: string }> = {
  workability: { hex: '#4F46E5', label: 'Workability' },
  relief: { hex: '#E2614B', label: 'Relief' },
  savings: { hex: '#D97706', label: 'Savings' },
}

function getPrimaryCluster(attributes: { cluster: AttributeCluster }[]): AttributeCluster {
  const counts: Record<string, number> = {}
  for (const attr of attributes) {
    counts[attr.cluster] = (counts[attr.cluster] || 0) + 1
  }
  let max: AttributeCluster = 'workability'
  let maxCount = 0
  for (const [cluster, count] of Object.entries(counts)) {
    if (count > maxCount) {
      max = cluster as AttributeCluster
      maxCount = count
    }
  }
  return max
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
    className: 'shrink-0 text-[#86868B]',
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
  const hasGlow = displayScore > 80

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
        filter: hasGlow ? 'drop-shadow(0 0 6px rgba(79,70,229,0.25))' : undefined,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Score arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />
      </svg>
      {/* Score text */}
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold font-mono text-[#1D1D1F] tabular-nums">
        {displayScore}
      </span>
    </div>
  )
}

export function ResultCard({ result, index, onClick }: ResultCardProps) {
  const primaryCluster = getPrimaryCluster(result.topAttributes)
  const clusterColor = CLUSTER_COLORS[primaryCluster]

  return (
    <motion.button
      onClick={onClick}
      className="group relative w-full text-left glass rounded-2xl border border-white/20 p-5 sm:p-6 space-y-4 cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:bg-white/35 hover:backdrop-blur-[24px] hover:shadow-[inset_2px_2px_1px_0_rgba(255,255,255,0.55),inset_-1px_-1px_1px_1px_rgba(255,255,255,0.45),0_8px_32px_rgba(0,0,0,0.06)]"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={{
        duration: 0.3,
        delay: index * 0.08,
        ease: 'easeOut',
        scale: { type: 'spring', stiffness: 300, damping: 20 },
      }}
    >
      {/* Rank watermark */}
      <span className="absolute top-2 left-4 text-[48px] font-bold leading-none text-black/[0.04] select-none pointer-events-none">
        {index + 1}
      </span>

      {/* Match score ring */}
      <div className="absolute top-4 right-4 z-10">
        <MatchScoreRing score={result.matchScore} />
      </div>

      {/* Category pill */}
      <div className="relative z-10 flex items-center gap-2">
        <span className="inline-flex items-center glass-subtle rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide border border-white/20">
          <span
            className="mr-1.5 inline-block w-1 h-1 rounded-full shrink-0"
            style={{ backgroundColor: clusterColor.hex }}
          />
          <span style={{ color: clusterColor.hex }}>{clusterColor.label}</span>
        </span>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-baseline justify-between gap-3 pr-12">
          <h3 className="text-[#1D1D1F] font-semibold text-lg tracking-tight">
            {result.place.name}
          </h3>
          <span className="glass-subtle rounded-full px-2 py-0.5 text-[#86868B] text-[11px] shrink-0 border border-white/15">
            {result.place.distance}
          </span>
        </div>
        <p className="text-[#86868B] text-[11px] tracking-wide mt-0.5">
          {result.place.neighborhood}
        </p>
      </div>

      {/* Summary */}
      <div className="relative z-10">
        <p className="text-[#86868B] text-[13px] leading-relaxed">
          {result.summary}
        </p>
      </div>

      {/* Attribute bars with glass pill treatment */}
      <div className="relative z-10 space-y-3">
        {result.topAttributes.slice(0, 3).map(attr => {
          return (
            <div key={attr.type} className="flex items-start gap-2">
              <div className="mt-[3px] flex items-center gap-1.5">
                <span
                  className="inline-block w-1 h-1 rounded-full shrink-0"
                  style={{ backgroundColor: CLUSTER_COLORS[attr.cluster].hex }}
                />
                {getAttributeIcon(attr.type)}
              </div>
              <div className="flex-1 min-w-0 glass-subtle rounded-lg px-2 py-1 -mx-1 -my-0.5 border border-white/10">
                <AttributeBar attribute={attr} compact />
              </div>
            </div>
          )
        })}
      </div>

      {/* Hover arrow */}
      <span className="absolute bottom-4 right-4 text-[#86868B] text-sm pointer-events-none opacity-0 translate-x-[-6px] transition-all duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-0">
        &rarr;
      </span>
    </motion.button>
  )
}
