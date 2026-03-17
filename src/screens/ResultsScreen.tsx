import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { QueryBar } from '../components/QueryBar'
import { ResultCard } from '../components/ResultCard'
import { searchByIntent } from '../data/mock'
import type { AttributeCluster } from '../data/types'

const CLUSTER_COLORS: Record<AttributeCluster, string> = {
  workability: 'rgb(79, 70, 229)',   // indigo
  relief: 'rgb(248, 113, 113)',      // coral
  savings: 'rgb(245, 158, 11)',      // amber
}

export function ResultsScreen() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || ''
  const [view, setView] = useState<'list' | 'map'>('list')
  const [hoveredDot, setHoveredDot] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const results = useMemo(() => searchByIntent(query), [query])

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.25 }

  function handleSearch(newQuery: string) {
    navigate(`/results?q=${encodeURIComponent(newQuery)}`, { replace: true })
  }

  function getPrimaryCluster(attrs: { cluster: AttributeCluster }[]): AttributeCluster {
    const counts: Record<string, number> = {}
    attrs.forEach(a => { counts[a.cluster] = (counts[a.cluster] || 0) + 1 })
    return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'workability') as AttributeCluster
  }

  return (
    <div className="min-h-dvh pb-8">
      {/* Sticky header — light glass */}
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer relative p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-hover/80 transition-all"
            aria-label="Back to home"
          >
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 [&_.glass]:py-3 [&_.glass]:px-4 [&_input]:text-[15px] [&_.text-\[17px\]]:text-[15px]">
            <QueryBar onSearch={handleSearch} />
          </div>
        </div>
        {/* Subtle gradient line */}
        <div
          className="h-px w-full"
          style={{
            background: 'linear-gradient(to right, rgba(79,70,229,0.15), rgba(248,113,113,0.15), rgba(245,158,11,0.15))',
          }}
        />
      </div>

      {/* Results */}
      <div className="max-w-lg mx-auto px-4 sm:px-6 pt-4">
        {/* Result count badge */}
        {results.length > 0 && (
          <motion.div
            className="mb-3"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-accent/[0.08] text-accent">
              {results.length} {results.length === 1 ? 'place' : 'places'} found
            </span>
          </motion.div>
        )}

        <div className="flex items-center justify-between mb-4">
          <p className="text-text-tertiary text-xs">
            {results.length} {results.length === 1 ? 'answer' : 'answers'} for &ldquo;{query}&rdquo;
          </p>

          {/* Segmented control */}
          <div className="relative flex bg-surface-hover rounded-lg border border-surface-border p-0.5">
            {/* Sliding indicator */}
            <motion.div
              className="absolute top-0.5 bottom-0.5 rounded-md bg-accent shadow-sm"
              initial={false}
              animate={{
                left: view === 'list' ? '2px' : '50%',
                right: view === 'map' ? '2px' : '50%',
              }}
              transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => setView('list')}
              className={[
                'cursor-pointer relative z-10 flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors',
                view === 'list'
                  ? 'text-white'
                  : 'text-text-tertiary hover:text-text-secondary',
              ].join(' ')}
            >
              {/* List icon */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1.5 3h9M1.5 6h9M1.5 9h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              List
            </button>
            <button
              onClick={() => setView('map')}
              className={[
                'cursor-pointer relative z-10 flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium transition-colors',
                view === 'map'
                  ? 'text-white'
                  : 'text-text-tertiary hover:text-text-secondary',
              ].join(' ')}
            >
              {/* Map icon */}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 2.5l3.5-1 3 1L11 1.5v8l-3.5 1-3-1L1 10.5z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.5 1.5v8M7.5 3.5v8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              Map
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'map' ? (
            <motion.div
              key="map"
              className="rounded-2xl bg-surface-hover border border-surface-border h-[60vh] relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              {/* Topographic contour background */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" className="opacity-100">
                  <defs>
                    {/* Grid pattern */}
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-text-tertiary" opacity="0.1" />
                    </pattern>
                    {/* Contour lines - indigo */}
                    <pattern id="contour-indigo" width="120" height="120" patternUnits="userSpaceOnUse">
                      <circle cx="60" cy="60" r="20" fill="none" stroke="rgb(79,70,229)" strokeWidth="0.5" opacity="0.04" />
                      <circle cx="60" cy="60" r="35" fill="none" stroke="rgb(79,70,229)" strokeWidth="0.5" opacity="0.03" />
                      <circle cx="60" cy="60" r="50" fill="none" stroke="rgb(79,70,229)" strokeWidth="0.5" opacity="0.02" />
                    </pattern>
                    {/* Contour lines - coral */}
                    <pattern id="contour-coral" width="180" height="180" patternUnits="userSpaceOnUse" patternTransform="translate(40, 30)">
                      <circle cx="90" cy="90" r="30" fill="none" stroke="rgb(248,113,113)" strokeWidth="0.5" opacity="0.03" />
                      <circle cx="90" cy="90" r="50" fill="none" stroke="rgb(248,113,113)" strokeWidth="0.5" opacity="0.025" />
                      <circle cx="90" cy="90" r="70" fill="none" stroke="rgb(248,113,113)" strokeWidth="0.5" opacity="0.02" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <rect width="100%" height="100%" fill="url(#contour-indigo)" />
                  <rect width="100%" height="100%" fill="url(#contour-coral)" />
                </svg>
              </div>

              {/* Place dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72">
                  {results.map((r, i) => {
                    const angle = (i / results.length) * Math.PI * 2 - Math.PI / 2
                    const radius = 80 + (i % 2) * 24
                    const cx = 144 + Math.cos(angle) * radius
                    const cy = 144 + Math.sin(angle) * radius
                    const avgConfidence =
                      r.topAttributes.reduce((sum, a) => sum + a.confidence, 0) /
                      r.topAttributes.length
                    const dotSize = 10 + avgConfidence * 8
                    const isHovered = hoveredDot === r.place.id
                    const cluster = getPrimaryCluster(r.topAttributes)
                    const dotColor = CLUSTER_COLORS[cluster]

                    return (
                      <motion.button
                        key={r.place.id}
                        className="absolute cursor-pointer group"
                        style={{
                          left: cx - dotSize / 2,
                          top: cy - dotSize / 2,
                        }}
                        initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { delay: i * 0.08, type: 'spring', stiffness: 300, damping: 20 }
                        }
                        onClick={() => navigate(`/place/${r.place.id}`)}
                        onMouseEnter={() => setHoveredDot(r.place.id)}
                        onMouseLeave={() => setHoveredDot(null)}
                        onTouchStart={() => setHoveredDot(r.place.id)}
                        onTouchEnd={() => setHoveredDot(null)}
                        aria-label={r.place.name}
                      >
                        {/* Concentric ripple rings */}
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: dotSize + 28,
                            height: dotSize + 28,
                            left: -(28 / 2),
                            top: -(28 / 2),
                            border: `1px solid ${dotColor}`,
                            opacity: 0.06,
                          }}
                        />
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: dotSize + 18,
                            height: dotSize + 18,
                            left: -(18 / 2),
                            top: -(18 / 2),
                            border: `1px solid ${dotColor}`,
                            opacity: 0.1,
                          }}
                        />
                        {/* Glow ring */}
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: dotSize + 16,
                            height: dotSize + 16,
                            left: -(16 / 2),
                            top: -(16 / 2),
                            background: `radial-gradient(circle, ${dotColor.replace('rgb', 'rgba').replace(')', `,${0.1 + avgConfidence * 0.14})`)} 0%, transparent 70%)`,
                          }}
                        />
                        {/* Dot */}
                        <div
                          className="relative rounded-full transition-transform duration-150"
                          style={{
                            width: dotSize,
                            height: dotSize,
                            backgroundColor: dotColor,
                            opacity: 0.65 + avgConfidence * 0.35,
                            transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                          }}
                        />
                        {/* Place name label (always visible, small) */}
                        <div
                          className="absolute left-full ml-1.5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[9px] text-text-tertiary/60 font-medium pointer-events-none select-none"
                          style={{ display: isHovered ? 'none' : 'block' }}
                        >
                          {r.place.name}
                        </div>
                        {/* Label on hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap px-2.5 py-1 rounded-lg bg-white border border-surface-border text-text-primary text-[11px] font-medium shadow-lg pointer-events-none"
                              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
                              transition={{ duration: 0.15 }}
                            >
                              {r.place.name}
                              <span className="block text-text-tertiary text-[10px] font-normal">
                                {r.place.distance}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    )
                  })}

                  {/* Center crosshair */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-[1px] bg-text-tertiary/30" />
                    <div className="w-[1px] h-4 bg-text-tertiary/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Hint */}
              <p className="absolute bottom-4 left-0 right-0 text-center text-text-tertiary/60 text-[11px]">
                Tap a dot to view details
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
            >
              {results.map((result, i) => (
                <motion.div
                  key={result.place.id}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { delay: i * 0.06, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
                  }
                >
                  <ResultCard
                    result={result}
                    index={i}
                    onClick={() => navigate(`/place/${result.place.id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {results.length === 0 && (
          <motion.div
            className="text-center py-20 space-y-4"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition}
          >
            {/* Empty state illustration with gradient + decorative elements */}
            <div className="relative inline-block mx-auto">
              {/* Decorative circles */}
              <div className="absolute -top-2 -right-3 w-2 h-2 rounded-full bg-accent/20" />
              <div className="absolute -bottom-1 -left-4 w-1.5 h-1.5 rounded-full bg-coral/20" />
              <div className="absolute top-1/2 -right-5 w-1 h-1 rounded-full bg-amber-400/25" />
              <div className="absolute -top-3 left-1/3 w-1 h-1 rounded-full bg-accent/15" />

              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                className="mx-auto"
              >
                <defs>
                  <linearGradient id="pin-gradient" x1="10" y1="4" x2="38" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="rgb(79, 70, 229)" />
                    <stop offset="100%" stopColor="rgb(248, 113, 113)" />
                  </linearGradient>
                </defs>
                <path
                  d="M24 4C16.268 4 10 10.268 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z"
                  stroke="url(#pin-gradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
                <circle
                  cx="24"
                  cy="18"
                  r="5"
                  stroke="url(#pin-gradient)"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
              </svg>
            </div>

            <p
              className="font-medium text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-text-secondary) 100%)',
              }}
            >
              Praxis doesn&apos;t know enough about this area yet.
            </p>
            <p className="text-text-secondary text-sm">
              Be the first to add a place.
            </p>
            <button
              disabled
              className="mt-2 px-5 py-2 rounded-full border border-surface-border text-text-tertiary text-sm cursor-not-allowed"
            >
              Add a place (coming soon)
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
