import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { AttributeBar } from '../components/AttributeBar'
import { ContributeSheet } from '../components/ContributeSheet'
import { getPlaceById } from '../data/mock'
import type { AttributeCluster } from '../data/types'

const CLUSTER_LABELS: Record<AttributeCluster, string> = {
  workability: 'Workability',
  relief: 'Relief & Convenience',
  savings: 'Savings',
}

const CLUSTER_ORDER: AttributeCluster[] = ['workability', 'relief', 'savings']

function formatTimestamp(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  return `${days}d ago`
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
        <div className="sticky top-0 z-30 glass-subtle border-b border-surface-border/30">
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

        <div className="max-w-lg mx-auto px-4 sm:px-6 pt-6">
          {/* Place hero */}
          <motion.div
            className="space-y-1.5 mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              {place.name}
            </h1>
            <p className="text-text-secondary text-sm">{place.address}</p>
            <p className="text-text-tertiary text-xs tracking-wide">
              {place.neighborhood} &middot; {place.distance}
            </p>
          </motion.div>

          {/* Attribute groups */}
          <div className="space-y-8">
            {groupedAttributes.map((group, gi) => (
              <motion.div
                key={group.cluster}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: gi * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xs uppercase tracking-widest text-accent/60 font-medium whitespace-nowrap">
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
                            className={`rounded-xl p-4 transition-colors ${
                              isExpanded ? 'bg-surface' : 'bg-surface/50'
                            }`}
                            layout
                          >
                            <AttributeBar attribute={attr} />
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
                              <div className="px-4 pb-3 pt-2 space-y-2">
                                {contributions.map(c => (
                                  <div
                                    key={c.id}
                                    className="flex items-center gap-2 text-xs"
                                  >
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg font-medium ${
                                      c.value
                                        ? 'bg-accent/10 text-accent'
                                        : 'bg-red-400/10 text-red-400'
                                    }`}>
                                      {c.value ? 'Yes' : 'No'}
                                    </span>
                                    <span className="bg-surface-hover rounded-lg px-2 py-0.5 text-text-secondary">
                                      {c.userName}
                                    </span>
                                    <span className="text-text-tertiary font-mono text-[10px]">
                                      {formatTimestamp(c.timestamp)}
                                    </span>
                                  </div>
                                ))}
                                {contributions.length === 0 && (
                                  <p className="text-xs text-text-tertiary">No recent contributions</p>
                                )}
                                <p className="text-[10px] text-text-tertiary/60 pt-1">
                                  {attr.verificationCount} total verifications
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent contributions */}
          {place.contributions.length > 0 && (
            <motion.div
              className="mt-10"
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
                {place.contributions.map(c => (
                  <div
                    key={c.id}
                    className="bg-surface rounded-xl p-3 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 min-w-0">
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
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 glass-subtle border-t border-surface-border/30">
        <div className="max-w-lg mx-auto px-4 sm:px-6 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            onClick={() => setShowContribute(true)}
            className="w-full py-3.5 rounded-xl font-medium text-sm bg-accent text-bg-primary hover:bg-accent/90 transition-colors cursor-pointer shadow-[0_0_20px_-4px_rgba(91,154,154,0.3)]"
          >
            Been here?
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
