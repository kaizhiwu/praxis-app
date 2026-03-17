import { motion } from 'framer-motion'
import { cn } from '../lib/cn'
import type { PlaceAttribute } from '../data/types'

interface AttributeBarProps {
  attribute: PlaceAttribute
  compact?: boolean
}

function formatRecency(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return '1d ago'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

function isRecent(iso: string): boolean {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return days <= 1
}

function NeedsVerificationIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-label="Needs verification"
    >
      <circle cx="6" cy="6" r="5" stroke="#A3A29C" strokeWidth="1" />
      <text
        x="6"
        y="8.5"
        textAnchor="middle"
        fontSize="7"
        fill="#A3A29C"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="500"
      >
        ?
      </text>
    </svg>
  )
}

export function AttributeBar({ attribute, compact }: AttributeBarProps) {
  const confidence = attribute.confidence
  const isStale = confidence < 0.5
  const isLowConfidence = confidence < 0.3
  const isHighConfidence = confidence >= 0.7
  const recencyText = formatRecency(attribute.lastVerified)
  const recent = isRecent(attribute.lastVerified)
  const confidencePct = `${Math.round(confidence * 100)}%`

  return (
    <div className={cn('space-y-1.5', compact && 'space-y-1')}>
      {/* Top row: label + recency + confidence % */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'uppercase font-mono text-text-secondary tracking-[0.15em]',
              compact ? 'text-[11px]' : 'text-xs'
            )}
          >
            {attribute.label}
          </span>
          {isLowConfidence && <NeedsVerificationIcon />}
        </div>

        <div className="flex items-center gap-2">
          {/* Recency badge */}
          {recent ? (
            <span className="text-[10px] font-medium text-accent bg-accent/10 px-1.5 py-0.5 rounded-full">
              {recencyText}
            </span>
          ) : (
            <span className="text-[10px] text-text-tertiary">
              {recencyText}
            </span>
          )}

          {/* Confidence percentage */}
          <span className="text-[10px] font-mono text-text-tertiary tabular-nums">
            {confidencePct}
          </span>
        </div>
      </div>

      {/* Bar track */}
      <div
        className={cn(
          'relative rounded-full overflow-hidden',
          compact ? 'h-1' : 'h-2',
          isStale
            ? 'bg-[#ECEAE5] border border-dashed border-text-tertiary/20'
            : 'bg-[#ECEAE5]'
        )}
      >
        {/* Glow layer for high-confidence bars */}
        {isHighConfidence && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: '0 2px 8px -2px rgba(26, 138, 138, 0.2)',
            }}
          />
        )}

        {/* Bar fill */}
        <motion.div
          className={cn(
            'h-full rounded-full',
            isStale && 'pulse-stale'
          )}
          style={{
            background: confidence >= 0.6
              ? 'linear-gradient(90deg, #1A8A8A, #3DB8B8)'
              : '#C8C6C0',
            opacity: confidence >= 0.8 ? 1 : confidence >= 0.5 ? 0.65 : 0.4,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${attribute.value * 100}%` }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            delay: 0.1,
          }}
        />
      </div>
    </div>
  )
}
