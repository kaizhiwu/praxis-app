import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PITCH } from '../data/pitch'

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(PITCH.cta.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-[var(--color-ink)]/40"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md rounded-xl bg-[var(--color-bone)] border border-[var(--color-border)] p-8"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-bone-warm)] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--color-ink-tertiary)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>

            <h3 className="text-xl font-medium text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              Get in touch
            </h3>
            <p className="text-sm text-[var(--color-ink-secondary)] mt-1">Looking for design partners in NYC.</p>

            <div className="mt-6 flex items-center gap-2 rounded-lg bg-[var(--color-bone-warm)] px-4 py-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              <span className="flex-1 text-sm text-[var(--color-ink)] font-mono">{PITCH.cta.email}</span>
              <button
                onClick={handleCopy}
                className="text-xs font-medium text-[var(--color-ink)] hover:text-[var(--color-ink-secondary)] transition-colors cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href={`mailto:${PITCH.cta.email}`}
                className="flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[var(--color-bone)] bg-[var(--color-ink)] hover:bg-[var(--color-ink-secondary)] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
                Send an email
              </a>
              <a
                href={PITCH.cta.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[var(--color-ink-secondary)] border border-[var(--color-border)] hover:border-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                DM on X
              </a>
            </div>

            <p className="text-xs text-[var(--color-ink-tertiary)] text-center mt-5">
              I reply within 24 hours.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
