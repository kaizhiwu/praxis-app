import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { QueryBar } from '../components/QueryBar'
import { IntentChips } from '../components/IntentChips'
import { getTimeContextChips } from '../data/mock'

const RECENT_SEARCHES = [
  'Coffee shop with fast wifi',
  'Quiet lunch spot near Union Square',
  'Late night food in East Village',
]

export function HomeScreen() {
  const navigate = useNavigate()
  const chips = getTimeContextChips()

  function handleSearch(query: string) {
    navigate(`/results?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="min-h-dvh flex flex-col items-center px-6 pb-32 pt-[28vh]">
      <div className="w-full max-w-md flex flex-col gap-10">
        {/* Title + Subtitle */}
        <div className="space-y-3 text-center">
          <motion.h1
            className="text-5xl font-bold tracking-[-0.03em] bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Praxis
          </motion.h1>
          <motion.p
            className="text-text-secondary text-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          >
            What do you need right now?
          </motion.p>
        </div>

        {/* Query bar with ambient glow */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 -inset-x-4 -inset-y-3 rounded-3xl bg-accent/[0.06] blur-2xl pointer-events-none" />
          <div className="relative">
            <QueryBar onSearch={handleSearch} autoFocus />
          </div>
        </motion.div>

        {/* Intent chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <IntentChips chips={chips} onSelect={handleSearch} />
        </motion.div>

        {/* Recent searches */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
        >
          <p className="text-text-tertiary text-xs uppercase tracking-widest px-1">
            Recent
          </p>
          <div className="flex flex-col gap-1">
            {RECENT_SEARCHES.map((query) => (
              <button
                key={query}
                onClick={() => handleSearch(query)}
                className="min-h-[44px] flex items-center px-3 py-2 rounded-xl text-text-secondary text-sm text-left hover:text-text-primary hover:bg-surface-hover/50 transition-colors cursor-pointer"
              >
                {query}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Location indicator */}
        <motion.div
          className="text-center flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent/60" />
          </span>
          <p className="text-text-tertiary text-xs">
            New York City
          </p>
        </motion.div>
      </div>
    </div>
  )
}
