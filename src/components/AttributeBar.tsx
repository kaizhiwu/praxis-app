import { motion } from 'framer-motion'
import { cn } from '../lib/cn'
import type { PlaceAttribute } from '../data/types'

function SparkleIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
        fill="url(#sparkle-grad)"
      />
      <defs>
        <linearGradient id="sparkle-grad" x1="0" y1="0" x2="16" y2="16">
          <stop stopColor="#4F46E5" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4V8L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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
      <circle cx="6" cy="6" r="5" stroke="#AEAEB2" strokeWidth="1" />
      <text
        x="6"
        y="8.5"
        textAnchor="middle"
        fontSize="7"
        fill="#AEAEB2"
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
  const showSparkle = confidence > 0.8
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
          {showSparkle && <SparkleIcon />}
        </div>

        <div className="flex items-center gap-2">
          {/* Recency badge — glass-subtle pill */}
          {recent ? (
            <span className="glass-subtle text-[10px] font-medium text-text-primary px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-surface-border">
              <ClockIcon />
              {recencyText}
            </span>
          ) : (
            <span className="text-[10px] text-text-tertiary">
              {recencyText}
            </span>
          )}

          {/* Confidence percentage with colored dot */}
          <span className="flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: isHighConfidence
                  ? '#1D1D1F'
                  : isLowConfidence
                    ? '#DC2626'
                    : '#86868B',
              }}
            />
            <span className="text-[10px] font-mono text-text-tertiary tabular-nums">
              {confidencePct}
            </span>
          </span>
        </div>
      </div>

      {/* Bar track */}
      <div
        className={cn(
          'relative rounded-full overflow-hidden',
          compact ? 'h-1' : 'h-2',
        )}
        style={{
          background: 'rgba(0, 0, 0, 0.04)',
          ...(isStale ? { border: '1px dashed rgba(0, 0, 0, 0.08)' } : {}),
        }}
      >
        {/* Subtle inner shadow for depth on high-confidence bars */}
        {isHighConfidence && (
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
            }}
          />
        )}

        {/* Bar fill — indigo gradient, opacity encodes confidence */}
        <motion.div
          className={cn(
            'h-full rounded-full',
            isStale && 'pulse-stale'
          )}
          style={{
            background: isHighConfidence
              ? 'linear-gradient(90deg, #4F46E5, #7C3AED, #818CF8)'
              : confidence >= 0.6
                ? 'linear-gradient(90deg, #4F46E5, #818CF8)'
                : '#D1D1D6',
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
