import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QueryBarProps {
  onSearch: (query: string) => void
  autoFocus?: boolean
}

const PLACEHOLDER_INTENTS = [
  'Where can I work with outlets nearby?',
  'Reliable restroom near me',
  'Cheap food open late',
  'Quiet place for a phone call',
  'Where can I wait indoors?',
]

const CHAR_DELAY = 32
const PAUSE_BEFORE_CLEAR = 2200
const PAUSE_BEFORE_NEXT = 400

export function QueryBar({ onSearch, autoFocus }: QueryBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('')
  const placeholderIndexRef = useRef(0)
  const animFrameRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (animFrameRef.current) {
      clearTimeout(animFrameRef.current)
      animFrameRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isFocused) {
      clearTimers()
      return
    }

    let cancelled = false

    function typeText(text: string, charIndex: number, onDone: () => void) {
      if (cancelled) return
      if (charIndex > text.length) {
        onDone()
        return
      }
      setDisplayedPlaceholder(text.slice(0, charIndex))
      animFrameRef.current = setTimeout(() => {
        typeText(text, charIndex + 1, onDone)
      }, CHAR_DELAY)
    }

    function eraseText(text: string, charIndex: number, onDone: () => void) {
      if (cancelled) return
      if (charIndex < 0) {
        setDisplayedPlaceholder('')
        onDone()
        return
      }
      setDisplayedPlaceholder(text.slice(0, charIndex))
      animFrameRef.current = setTimeout(() => {
        eraseText(text, charIndex - 1, onDone)
      }, CHAR_DELAY / 2)
    }

    function runCycle() {
      if (cancelled) return
      const text = PLACEHOLDER_INTENTS[placeholderIndexRef.current]
      typeText(text, 0, () => {
        if (cancelled) return
        animFrameRef.current = setTimeout(() => {
          eraseText(text, text.length, () => {
            if (cancelled) return
            placeholderIndexRef.current =
              (placeholderIndexRef.current + 1) % PLACEHOLDER_INTENTS.length
            animFrameRef.current = setTimeout(runCycle, PAUSE_BEFORE_NEXT)
          })
        }, PAUSE_BEFORE_CLEAR)
      })
    }

    runCycle()

    return () => {
      cancelled = true
      clearTimers()
    }
  }, [isFocused, clearTimers])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  const hasQuery = query.trim().length > 0

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      {/* Indigo glow ring on focus */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isFocused
            ? '0 0 0 2px rgba(79,70,229,0.2), 0 0 20px rgba(79,70,229,0.08)'
            : '0 0 0 0px rgba(79,70,229,0), 0 0 0px rgba(79,70,229,0)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      <motion.div
        className="glass-elevated rounded-2xl overflow-hidden relative"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="relative flex items-center py-4.5 px-6 gap-3">
          {/* Search icon */}
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            animate={{
              color: isFocused ? '#4F46E5' : '#AEAEB2',
              y: isFocused ? [0, -2, 0] : 0,
            }}
            transition={{
              color: { duration: 0.2 },
              y: { duration: 0.4, ease: 'easeOut' },
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </motion.svg>

          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={autoFocus}
              className="w-full bg-transparent text-[17px] tracking-[-0.01em] outline-none"
              style={{ color: '#1D1D1F' }}
            />
            {!query && (
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <span className="text-[17px] tracking-[-0.01em]" style={{ color: '#AEAEB2' }}>
                  {displayedPlaceholder}
                  <motion.span
                    className="inline-block w-[1px] h-[18px] align-middle ml-[1px]"
                    style={{ backgroundColor: '#4F46E5' }}
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.55,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                  />
                </span>
              </div>
            )}
          </div>

          {/* Submit button — glass pill with indigo accent */}
          <AnimatePresence>
            {hasQuery && (
              <motion.button
                type="submit"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="shrink-0 h-8 px-3 rounded-full glass flex items-center justify-center cursor-pointer relative overflow-hidden"
                style={{
                  border: '1px solid rgba(79,70,229,0.25)',
                  boxShadow: '0 0 8px rgba(79,70,229,0.1)',
                }}
                aria-label="Search"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative z-10"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </form>
  )
}
