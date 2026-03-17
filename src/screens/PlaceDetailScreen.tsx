import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { AttributeBar } from '../components/AttributeBar'
import { ContributeSheet } from '../components/ContributeSheet'
import { getPlaceById } from '../data/mock'
import type { AttributeCluster, AttributeType } from '../data/types'

const CLUSTER_LABELS: Record<AttributeCluster, string> = {
  workability: 'Workability',
  relief: 'Relief & Convenience',
  savings: 'Savings',
}

const CLUSTER_ORDER: AttributeCluster[] = ['workability', 'relief', 'savings']

const CLUSTER_COLORS: Record<AttributeCluster, { dot: string; tint: string }> = {
  workability: { dot: 'bg-[#1A8A8A]', tint: 'text-[#1A8A8A]/70' },
  relief: { dot: 'bg-[#D97B2B]', tint: 'text-[#D97B2B]/70' },
  savings: { dot: 'bg-[#7C5AC7]', tint: 'text-[#7C5AC7]/70' },
}

function formatTimestamp(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  return `${days}d ago`
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-[#1A8A8A]/10 text-[#1A8A8A]',
    'bg-[#D97B2B]/10 text-[#D97B2B]',
    'bg-[#7C5AC7]/10 text-[#7C5AC7]',
    'bg-rose-500/10 text-rose-500',
    'bg-sky-500/10 text-sky-500',
    'bg-emerald-500/10 text-emerald-500',
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

function AttributeIcon({ type }: { type: AttributeType }) {
  const iconProps = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'shrink-0 text-text-secondary',
  }

  switch (type) {
    case 'outlet_usability':
      return (
        <svg {...iconProps}>
          <path d="M12 2v10" />
          <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
        </svg>
      )
    case 'laptop_tolerance':
      return (
        <svg {...iconProps}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M2 20h20" />
        </svg>
      )
    case 'noise_level':
      return (
        <svg {...iconProps}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )
    case 'restroom_access':
      return (
        <svg {...iconProps}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    case 'purchase_pressure':
      return (
        <svg {...iconProps}>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    case 'call_friendliness':
      return (
        <svg {...iconProps}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    case 'seating_reliability':
      return (
        <svg {...iconProps}>
          <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
          <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5H7V11a2 2 0 0 0-4 0z" />
          <path d="M5 18v2" />
          <path d="M19 18v2" />
        </svg>
      )
    case 'indoor_waiting':
      return (
        <svg {...iconProps}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M12 6h.01" />
          <path d="M12 10h.01" />
          <path d="M12 14h.01" />
          <path d="M16 10h.01" />
          <path d="M16 14h.01" />
          <path d="M8 10h.01" />
          <path d="M8 14h.01" />
        </svg>
      )
    case 'water_access':
      return (
        <svg {...iconProps}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      )
    case 'staff_strictness':
      return (
        <svg {...iconProps}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    case 'safety':
      return (
        <svg {...iconProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    case 'markdown_likelihood':
      return (
        <svg {...iconProps}>
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
      )
    case 'late_food':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    case 'budget_value':
      return (
        <svg {...iconProps}>
          <circle cx="8" cy="8" r="6" />
          <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
          <line x1="7" y1="6" x2="7" y2="10" />
          <line x1="5" y1="8" x2="9" y2="8" />
        </svg>
      )
    default:
      return null
  }
}

export function PlaceDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showContribute, setShowContribute] = useState(false)
  const [expandedAttr, setExpandedAttr] = useState<string | null>(null)

  const place = getPlaceById(id || '')

  if (!place) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <p className="text-text-secondary">Place not found</p>
      </div>
    )
  }

  const groupedAttributes = CLUSTER_ORDER
    .map(cluster => ({
      cluster,
      label: CLUSTER_LABELS[cluster],
      attributes: place.attributes.filter(a => a.cluster === cluster),
    }))
    .filter(g => g.attributes.length > 0)

  return (
    <>
      <div className="min-h-dvh pb-28">
        {/* Sticky header */}
        <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-surface-border/50">
          <div className="max-w-lg mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center -ml-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-text-primary font-medium text-sm truncate">{place.name}</h2>
          </div>
        </div>

        {/* Hero gradient band */}
        <div className="relative">
          <div
            className="absolute inset-x-0 top-0 h-48 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(26,138,138,0.04) 0%, rgba(26,138,138,0.01) 50%, transparent 100%)',
            }}
          />

          <div className="max-w-lg mx-auto px-4 sm:px-6 pt-8 relative">
            {/* Place hero */}
            <motion.div
              className="space-y-2 mb-10"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold tracking-tight text-text-primary">
                {place.name}
              </h1>
              <p className="text-text-secondary text-sm">{place.address}</p>
              <p className="text-text-tertiary text-xs tracking-wide">
                {place.neighborhood} &middot; {place.distance}
              </p>
            </motion.div>

            {/* Attribute groups */}
            <div className="space-y-10">
              {groupedAttributes.map((group, gi) => {
                const clusterColor = CLUSTER_COLORS[group.cluster]
                return (
                  <motion.div
                    key={group.cluster}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: gi * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`w-1.5 h-1.5 rounded-full ${clusterColor.dot}`} />
                      <h3 className={`text-xs uppercase tracking-widest font-medium whitespace-nowrap ${clusterColor.tint}`}>
                        {group.label}
                      </h3>
                      <hr className="flex-1 border-surface-border/40" />
                    </div>
                    <div className="space-y-3">
                      {group.attributes.map(attr => {
                        const isExpanded = expandedAttr === attr.type
                        const contributions = place.contributions.filter(c => c.attributeType === attr.type)

                        return (
                          <div key={attr.type}>
                            <button
                              className="w-full text-left cursor-pointer"
                              onClick={() => setExpandedAttr(isExpanded ? null : attr.type)}
                            >
                              <motion.div
                                className={`rounded-xl p-4 border transition-colors duration-200 ${
                                  isExpanded
                                    ? 'bg-white border-accent/25 shadow-sm'
                                    : 'bg-white border-surface-border hover:border-surface-border'
                                }`}
                                layout
                              >
                                <div className="flex items-start gap-2.5">
                                  <div className="pt-0.5">
                                    <AttributeIcon type={attr.type} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <AttributeBar attribute={attr} />
                                  </div>
                                </div>
                              </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  className="overflow-hidden"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25, ease: 'easeOut' }}
                                >
                                  <div className="flex gap-3 pl-4 pr-4 pb-3 pt-2">
                                    {/* Connecting line */}
                                    <div className="w-px bg-accent/30 shrink-0 ml-1.5 rounded-full" />

                                    <div className="flex-1 space-y-2">
                                      {contributions.map(c => {
                                        const avatarColor = getAvatarColor(c.userName)
                                        return (
                                          <div
                                            key={c.id}
                                            className="flex items-center gap-2.5 text-xs"
                                          >
                                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${avatarColor}`}>
                                              {c.userName.charAt(0).toUpperCase()}
                                            </span>
                                            <span className="text-text-secondary truncate">
                                              {c.userName}
                                            </span>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg font-medium shrink-0 ${
                                              c.value
                                                ? 'bg-accent/10 text-accent'
                                                : 'bg-red-400/10 text-red-400'
                                            }`}>
                                              {c.value ? 'Yes' : 'No'}
                                            </span>
                                            <span className="text-text-tertiary font-mono text-[10px] shrink-0 ml-auto">
                                              {formatTimestamp(c.timestamp)}
                                            </span>
                                          </div>
                                        )
                                      })}
                                      {contributions.length === 0 && (
                                        <p className="text-xs text-text-tertiary">No recent contributions</p>
                                      )}
                                      <p className="text-[10px] text-text-tertiary/60 pt-1">
                                        {attr.verificationCount} total verifications
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Recent contributions */}
            {place.contributions.length > 0 && (
              <motion.div
                className="mt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xs uppercase tracking-widest text-text-tertiary font-medium whitespace-nowrap">
                    What people confirm
                  </h3>
                  <hr className="flex-1 border-surface-border/40" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {place.contributions.map(c => {
                    const avatarColor = getAvatarColor(c.userName)
                    return (
                      <div
                        key={c.id}
                        className="bg-white border border-surface-border hover:border-accent/15 rounded-xl p-3 flex items-center justify-between transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 ${avatarColor}`}>
                            {c.userName.charAt(0).toUpperCase()}
                          </span>
                          <span className="text-text-secondary text-xs truncate">{c.userName}</span>
                          <span className="text-text-tertiary font-mono text-[10px] shrink-0">
                            {formatTimestamp(c.timestamp)}
                          </span>
                        </div>
                        <span className={`shrink-0 ml-3 text-xs font-medium px-2 py-0.5 rounded-lg ${
                          c.value
                            ? 'bg-accent/10 text-accent'
                            : 'bg-red-400/10 text-red-400'
                        }`}>
                          {c.value ? 'Yes' : 'No'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-xl border-t border-surface-border/50">
        <div className="max-w-lg mx-auto px-4 sm:px-6 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => setShowContribute(true)}
            className="relative w-full py-3.5 rounded-xl font-medium text-sm bg-accent text-white hover:bg-accent/90 transition-colors cursor-pointer shadow-[0_0_20px_-4px_rgba(26,138,138,0.3)] overflow-hidden"
          >
            <span className="relative z-10">Been here?</span>
            <span className="cta-shimmer absolute inset-0" />
          </button>
        </div>
      </div>

      <ContributeSheet
        place={place}
        isOpen={showContribute}
        onClose={() => setShowContribute(false)}
      />
    </>
  )
}
