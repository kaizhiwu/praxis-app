import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { AttributeBar } from '../components/AttributeBar'
import { ContributeSheet } from '../components/ContributeSheet'
import { getPlaceByIdAsync } from '../data/mock'
import type { Place, AttributeCluster, AttributeType } from '../data/types'

const CLUSTER_LABELS: Record<AttributeCluster, string> = {
  workability: 'Workability',
  relief: 'Relief & Convenience',
  savings: 'Savings',
}

const CLUSTER_ORDER: AttributeCluster[] = ['workability', 'relief', 'savings']

const CLUSTER_COLORS: Record<AttributeCluster, { dot: string; tint: string; hex: string; border: string }> = {
  workability: { dot: 'bg-[#4F46E5]', tint: 'text-[#4F46E5]/70', hex: '#4F46E5', border: 'border-l-[#4F46E5]/30' },
  relief: { dot: 'bg-[#E2614B]', tint: 'text-[#E2614B]/70', hex: '#E2614B', border: 'border-l-[#E2614B]/30' },
  savings: { dot: 'bg-[#D97706]', tint: 'text-[#D97706]/70', hex: '#D97706', border: 'border-l-[#D97706]/30' },
}

function isRecentContribution(timestamp: string): boolean {
  const diff = Date.now() - new Date(timestamp).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  return days < 30
}

function ClusterIcon({ cluster }: { cluster: AttributeCluster }) {
  const iconProps = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (cluster) {
    case 'workability':
      return (
        <svg {...iconProps}>
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M2 20h20" />
        </svg>
      )
    case 'relief':
      return (
        <svg {...iconProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    case 'savings':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <path d="M15 10H10.5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4H9" />
        </svg>
      )
  }
}

function VerifiedBadge() {
  return (
    <svg width={10} height={10} viewBox="0 0 24 24" fill="currentColor" className="text-accent shrink-0">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 12c0 4.97 3.042 9.226 7.365 11.024a.75.75 0 0 0 .508.012C15.015 21.187 21 16.948 21 12c0-1.39-.236-2.728-.67-3.972l-.712-.044z" />
    </svg>
  )
}

function formatTimestamp(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  return `${days}d ago`
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
    case 'wifi_reliability':
      return (
        <svg {...iconProps}>
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z" />
          <path d="M5 13l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          <path d="M9 17l3 3 3-3a4.237 4.237 0 0 0-6 0z" />
        </svg>
      )
    case 'meeting_friendly':
      return (
        <svg {...iconProps}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    case 'pet_friendly':
      return (
        <svg {...iconProps}>
          <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
          <path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
          <path d="M8 14v.5" />
          <path d="M16 14v.5" />
          <path d="M11.25 16.25h1.5L12 17l-.75-.75z" />
          <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
        </svg>
      )
    case 'stroller_access':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      )
    case 'phone_charging':
      return (
        <svg {...iconProps}>
          <rect x="6" y="2" width="12" height="20" rx="2" />
          <path d="M12 18h.01" />
          <path d="M11 8l2 4h-2l2 4" />
        </svg>
      )
    case 'happy_hour':
      return (
        <svg {...iconProps}>
          <path d="M8 2h8l-1 9H9z" />
          <path d="M12 11v7" />
          <path d="M8 22h8" />
          <path d="M7 11h10" />
        </svg>
      )
    case 'free_samples':
      return (
        <svg {...iconProps}>
          <path d="M20 12v10H4V12" />
          <path d="M2 7h20v5H2z" />
          <path d="M12 22V7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      )
    case 'byob_allowed':
      return (
        <svg {...iconProps}>
          <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
          <path d="M9 12a4 4 0 0 1 8 0v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a4 4 0 0 1 4-4z" />
          <line x1="9" y1="2" x2="9" y2="7" />
          <line x1="13" y1="2" x2="13" y2="7" />
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
  const [place, setPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showHours, setShowHours] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getPlaceByIdAsync(id || '').then(p => {
      if (!cancelled) {
        setPlace(p)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [id])

  function handleShare() {
    const placeId = place?.googlePlaceId || place?.id || id
    const url = `${window.location.origin}/place/${placeId}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

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

        {/* Hero gradient band — mesh-style with overlapping radials */}
        <div className="relative">
          <div
            className="absolute inset-x-0 top-0 h-56 pointer-events-none"
            style={{
              background: [
                'radial-gradient(ellipse 80% 60% at 20% 10%, rgba(79,70,229,0.04) 0%, transparent 70%)',
                'radial-gradient(ellipse 60% 50% at 70% 20%, rgba(226,97,75,0.03) 0%, transparent 70%)',
                'radial-gradient(ellipse 70% 40% at 50% 40%, rgba(217,119,6,0.02) 0%, transparent 70%)',
              ].join(', '),
            }}
          />

          <div className="max-w-lg mx-auto px-4 sm:px-6 pt-8 relative">
            {/* Place hero */}
            <motion.div
              className="space-y-2 mb-4 relative"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Topographic decorative lines */}
              <div className="absolute -top-4 -left-6 w-[calc(100%+3rem)] h-[calc(100%+2rem)] pointer-events-none overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="10" width="360" height="100" rx="40" stroke="currentColor" strokeWidth="0.5" className="text-text-primary/[0.04]" />
                  <rect x="40" y="20" width="320" height="80" rx="32" stroke="currentColor" strokeWidth="0.5" className="text-text-primary/[0.04]" />
                  <rect x="60" y="30" width="280" height="60" rx="24" stroke="currentColor" strokeWidth="0.5" className="text-text-primary/[0.04]" />
                  <rect x="80" y="40" width="240" height="40" rx="16" stroke="currentColor" strokeWidth="0.5" className="text-text-primary/[0.03]" />
                </svg>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-text-primary relative">
                {place.name}
              </h1>
              <p className="text-text-secondary text-sm relative">{place.address}</p>
              <div className="flex items-center gap-3 relative">
                <p className="text-text-tertiary text-xs tracking-wide">
                  {place.neighborhood} &middot; {place.distance}
                </p>
              </div>
            </motion.div>

            {/* Google base info */}
            {place.google && (
              <motion.div
                className="mb-6 space-y-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {/* Photo */}
                {place.google.photoUri && (
                  <img
                    src={place.google.photoUri}
                    alt={place.name}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Open/Closed badge */}
                  {place.google.openNow !== undefined && (
                    <span className={`inline-flex items-center gap-1 text-[11px] font-medium rounded-full px-2.5 py-1 ${
                      place.google.openNow
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${place.google.openNow ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      {place.google.openNow ? 'Open now' : 'Closed'}
                    </span>
                  )}

                  {/* Google rating */}
                  {place.google.rating && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-text-secondary">
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="#FBBF24" stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      {place.google.rating}
                      {place.google.userRatingCount && (
                        <span className="text-text-tertiary">({place.google.userRatingCount})</span>
                      )}
                    </span>
                  )}

                  {/* Google Maps link */}
                  {place.google.googleMapsUri && (
                    <a
                      href={place.google.googleMapsUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-accent hover:underline"
                    >
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Google Maps
                    </a>
                  )}

                  {/* Share button */}
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1 text-[11px] text-text-tertiary hover:text-accent transition-colors cursor-pointer ml-auto"
                  >
                    <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    {copied ? 'Copied!' : 'Share'}
                  </button>
                </div>

                {/* Hours (collapsible) */}
                {place.google.weekdayHours && place.google.weekdayHours.length > 0 && (
                  <div>
                    <button
                      onClick={() => setShowHours(!showHours)}
                      className="text-[11px] text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {showHours ? 'Hide hours' : 'Show hours'}
                      <svg
                        width={8} height={8} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                        className={`transition-transform ${showHours ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {showHours && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 space-y-0.5">
                            {place.google.weekdayHours.map((h, i) => (
                              <p key={i} className="text-[11px] text-text-tertiary">{h}</p>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* Share button (when no Google data) */}
            {!place.google && (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1 text-[11px] text-text-tertiary hover:text-accent transition-colors cursor-pointer"
                >
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  {copied ? 'Copied!' : 'Share this place'}
                </button>
              </motion.div>
            )}

            {/* Empty behavioral state for unmapped places */}
            {place.attributes.length === 0 && (
              <motion.div
                className="mb-10 rounded-xl border border-dashed border-accent/20 bg-accent/[0.03] p-6 text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="text-sm text-text-secondary">No one has mapped this place yet.</p>
                <p className="text-xs text-text-tertiary mt-1">Tap "Been here?" to be the first to contribute.</p>
              </motion.div>
            )}

            {/* Verified by X people badge */}
            {(() => {
              const uniqueContributors = new Set(place.contributions.map(c => c.userId)).size
              if (uniqueContributors === 0) return null
              return (
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-accent bg-accent/[0.06] border border-accent/10 rounded-full px-3 py-1">
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Verified by {uniqueContributors} {uniqueContributors === 1 ? 'person' : 'people'}
                  </span>
                </motion.div>
              )
            })()}

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
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${clusterColor.dot}`} />
                        <span style={{ color: clusterColor.hex }} className="opacity-60">
                          <ClusterIcon cluster={group.cluster} />
                        </span>
                        <div className="flex flex-col">
                          <h3 className={`text-[11px] uppercase tracking-widest font-semibold whitespace-nowrap ${clusterColor.tint}`}>
                            {group.label}
                          </h3>
                          <div
                            className="h-[1.5px] mt-1 rounded-full"
                            style={{
                              background: `linear-gradient(to right, ${clusterColor.hex}33, transparent)`,
                              width: '100%',
                            }}
                          />
                        </div>
                      </div>
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
                                className={`rounded-xl p-4 border border-l-2 transition-colors duration-200 ${clusterColor.border} ${
                                  isExpanded
                                    ? 'bg-white border-accent/25 shadow-sm'
                                    : 'bg-white border-surface-border hover:border-surface-border'
                                }`}
                                layout="position"
                                transition={{ layout: { duration: 0.25, ease: 'easeOut' } }}
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
                                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                  <div className="flex gap-3 pl-4 pr-4 pb-3 pt-2">
                                    {/* Connecting line */}
                                    <div className="w-px bg-accent/30 shrink-0 ml-1.5 rounded-full" />

                                    <div className="flex-1 space-y-2">
                                      {contributions.map(c => {
                                        return (
                                          <div
                                            key={c.id}
                                            className="flex items-center gap-2.5 text-xs"
                                          >
                                            <span
                                              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 text-white"
                                              style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
                                            >
                                              {c.userName.charAt(0).toUpperCase()}
                                            </span>
                                            <span className="text-text-secondary truncate flex items-center gap-1">
                                              {c.userName}
                                              {isRecentContribution(c.timestamp) && <VerifiedBadge />}
                                            </span>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-lg font-semibold shrink-0 text-[11px] ${
                                              c.value
                                                ? 'bg-accent text-white'
                                                : 'bg-red-400 text-white'
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
                    return (
                      <div
                        key={c.id}
                        className="bg-white border border-surface-border hover:border-accent/15 rounded-xl p-3 flex items-center justify-between transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 text-white"
                            style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)' }}
                          >
                            {c.userName.charAt(0).toUpperCase()}
                          </span>
                          <span className="text-text-secondary text-xs truncate flex items-center gap-1">
                            {c.userName}
                            {isRecentContribution(c.timestamp) && <VerifiedBadge />}
                          </span>
                          <span className="text-text-tertiary font-mono text-[10px] shrink-0">
                            {formatTimestamp(c.timestamp)}
                          </span>
                        </div>
                        <span className={`shrink-0 ml-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg ${
                          c.value
                            ? 'bg-accent text-white'
                            : 'bg-red-400 text-white'
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
            className="relative w-full py-3.5 rounded-xl font-medium text-sm text-white hover:opacity-95 transition-opacity cursor-pointer shadow-[0_0_24px_-4px_rgba(79,70,229,0.4)] overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              <svg width={14} height={14} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z" fill="white" fillOpacity="0.9" />
              </svg>
              Been here?
            </span>
            <span className="cta-shimmer absolute inset-0" style={{ opacity: 0.25 }} />
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
