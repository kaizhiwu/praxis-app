import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

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

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <motion.div
        className={[
          'glass rounded-2xl overflow-hidden transition-all duration-200',
          'shadow-[0_0_60px_-15px_rgba(91,154,154,0.08)]',
          'border',
          isFocused
            ? 'border-accent/30 ring-1 ring-accent/15'
            : 'border-surface-border',
        ].join(' ')}
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div className="relative flex items-center py-4.5 px-6 gap-3">
          {/* Search icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-text-secondary/40"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={autoFocus}
              className="w-full bg-transparent text-[17px] text-text-primary placeholder-transparent outline-none"
            />
            {!query && (
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <span className="text-text-secondary/50 text-[17px]">
                  {displayedPlaceholder}
                  <motion.span
                    className="inline-block w-[2px] h-[17px] bg-text-secondary/30 align-middle ml-px"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }}
                  />
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </form>
  )
}
