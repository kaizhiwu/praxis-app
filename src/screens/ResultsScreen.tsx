import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { QueryBar } from '../components/QueryBar'
import { ResultCard } from '../components/ResultCard'
import { searchByIntent } from '../data/mock'

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

  return (
    <div className="min-h-dvh pb-8">
      {/* Sticky header — light glass */}
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-surface-border/60">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
            aria-label="Back to home"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 [&_.glass]:py-3 [&_.glass]:px-4 [&_input]:text-[15px] [&_.text-\[17px\]]:text-[15px]">
            <QueryBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-lg mx-auto px-4 sm:px-6 pt-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-tertiary text-xs">
            {results.length} {results.length === 1 ? 'answer' : 'answers'} for "{query}"
          </p>

          {/* Segmented control */}
          <div className="flex bg-surface-hover rounded-lg border border-surface-border p-0.5">
            <button
              onClick={() => setView('list')}
              className={[
                'cursor-pointer px-3 py-1 rounded-md text-xs font-medium transition-colors',
                view === 'list'
                  ? 'bg-white text-text-primary shadow-sm'
                  : 'text-text-tertiary hover:text-text-secondary',
              ].join(' ')}
            >
              List
            </button>
            <button
              onClick={() => setView('map')}
              className={[
                'cursor-pointer px-3 py-1 rounded-md text-xs font-medium transition-colors',
                view === 'map'
                  ? 'bg-white text-text-primary shadow-sm'
                  : 'text-text-tertiary hover:text-text-secondary',
              ].join(' ')}
            >
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
              {/* Light grid background */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" className="opacity-[0.15]">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-text-tertiary" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
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
                    const dotSize = 10 + avgConfidence * 6
                    const isHovered = hoveredDot === r.place.id

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
                        {/* Glow ring */}
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: dotSize + 16,
                            height: dotSize + 16,
                            left: -(16 / 2),
                            top: -(16 / 2),
                            background: `radial-gradient(circle, rgba(79,70,229,${0.08 + avgConfidence * 0.14}) 0%, transparent 70%)`,
                          }}
                        />
                        {/* Dot */}
                        <div
                          className="relative rounded-full bg-accent transition-transform duration-150"
                          style={{
                            width: dotSize,
                            height: dotSize,
                            opacity: 0.65 + avgConfidence * 0.35,
                            transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                          }}
                        />
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
                <ResultCard
                  key={result.place.id}
                  result={result}
                  index={i}
                  onClick={() => navigate(`/place/${result.place.id}`)}
                />
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
            {/* Empty state illustration */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              className="mx-auto text-text-tertiary/40"
            >
              <path
                d="M24 4C16.268 4 10 10.268 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.732-6.268-14-14-14z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="24"
                cy="18"
                r="5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>

            <p className="text-text-primary font-medium">
              Praxis doesn't know enough about this area yet.
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
