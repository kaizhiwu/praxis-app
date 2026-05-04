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
    if (isFocused) { clearTimers(); return }
    let cancelled = false

    function typeText(text: string, charIndex: number, onDone: () => void) {
      if (cancelled) return
      if (charIndex > text.length) { onDone(); return }
      setDisplayedPlaceholder(text.slice(0, charIndex))
      animFrameRef.current = setTimeout(() => typeText(text, charIndex + 1, onDone), CHAR_DELAY)
    }
    function eraseText(text: string, charIndex: number, onDone: () => void) {
      if (cancelled) return
      if (charIndex < 0) { setDisplayedPlaceholder(''); onDone(); return }
      setDisplayedPlaceholder(text.slice(0, charIndex))
      animFrameRef.current = setTimeout(() => eraseText(text, charIndex - 1, onDone), CHAR_DELAY / 2)
    }
    function runCycle() {
      if (cancelled) return
      const text = PLACEHOLDER_INTENTS[placeholderIndexRef.current]
      typeText(text, 0, () => {
        if (cancelled) return
        animFrameRef.current = setTimeout(() => {
          eraseText(text, text.length, () => {
            if (cancelled) return
            placeholderIndexRef.current = (placeholderIndexRef.current + 1) % PLACEHOLDER_INTENTS.length
            animFrameRef.current = setTimeout(runCycle, PAUSE_BEFORE_NEXT)
          })
        }, PAUSE_BEFORE_CLEAR)
      })
    }
    runCycle()
    return () => { cancelled = true; clearTimers() }
  }, [isFocused, clearTimers])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  const hasQuery = query.trim().length > 0

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <motion.div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: 'var(--color-bone-warm)',
          border: `1px solid ${isFocused ? 'var(--color-accent-cobalt)' : 'var(--color-border)'}`,
          boxShadow: isFocused
            ? '0 0 0 3px rgba(37,99,235,0.10), 0 1px 2px rgba(0,0,0,0.03)'
            : '0 1px 2px rgba(0,0,0,0.02)',
          transition: 'border-color 200ms, box-shadow 200ms',
        }}
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <div className="relative flex items-center py-3.5 px-5 gap-3">
          {/* Search icon */}
          <motion.svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="shrink-0"
            animate={{ color: isFocused ? 'var(--color-accent-cobalt)' : 'var(--color-ink-tertiary)' }}
            transition={{ duration: 0.2 }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </motion.svg>

          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={autoFocus}
              className="w-full bg-transparent text-[16px] tracking-[-0.005em] outline-none text-[var(--color-ink)]"
            />
            {!query && (
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <span className="text-[16px] text-[var(--color-ink-tertiary)] tracking-[-0.005em]">
                  {displayedPlaceholder}
                  <motion.span
                    className="inline-block w-[1px] h-[16px] align-middle ml-[1px]"
                    style={{ backgroundColor: 'var(--color-accent-cobalt)' }}
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.55, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut',
                    }}
                  />
                </span>
              </div>
            )}
          </div>

          {/* Submit button — solid pill in cobalt */}
          <AnimatePresence>
            {hasQuery && (
              <motion.button
                type="submit"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: 'var(--color-accent-cobalt)' }}
                aria-label="Search"
              >
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
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
