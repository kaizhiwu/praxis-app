import { type ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { QueryBar } from '../components/QueryBar'
import { IntentChips } from '../components/IntentChips'
import { getTimeContextChips } from '../data/mock'
import { extractPlaceId, isGoogleEnabled } from '../lib/google-places'

// ---------------------------------------------------------------------------
// Icon helpers (Lucide-style, 24 viewBox, stroke-based)
// ---------------------------------------------------------------------------

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

const LaptopIcon = (
  <Icon>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M2 17h20" />
  </Icon>
)
const BoltIcon = (<Icon><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></Icon>)
const DropletIcon = (<Icon><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" /></Icon>)
const BatteryIcon = (
  <Icon>
    <rect x="2" y="7" width="16" height="10" rx="2" />
    <path d="M22 11v2" /><path d="M6 11v2" /><path d="M10 11v2" />
  </Icon>
)
const UtensilsIcon = (
  <Icon>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </Icon>
)
const ClockIcon = (<Icon><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Icon>)
const BuildingIcon = (
  <Icon>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22V12h6v10" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01" />
  </Icon>
)
const ShieldIcon = (<Icon><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Icon>)
const MoonIcon = (<Icon><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></Icon>)

const SearchIcon = (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="shrink-0"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

const CHIP_ICONS: Record<string, ReactNode> = {
  'Quiet work spot': LaptopIcon,
  'Coffee with outlets': BoltIcon,
  'Restroom nearby': DropletIcon,
  'Recharge spot': BatteryIcon,
  'Cheap lunch': UtensilsIcon,
  'Late food deals': ClockIcon,
  'Indoor waiting': BuildingIcon,
  'Quiet call spot': LaptopIcon,
  'Open restroom': DropletIcon,
  'Safe place to wait': ShieldIcon,
  'Late food': MoonIcon,
}

// ---------------------------------------------------------------------------
// Brand Mark — minimal compass/waypoint, single accent gradient
// ---------------------------------------------------------------------------

function BrandMark() {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id="brand-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--color-accent-cobalt)" />
          <stop offset="100%" stopColor="var(--color-accent-magenta)" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke="url(#brand-grad)" strokeWidth="1.2" fill="none" opacity="0.4" />
      <path d="M24 6L34 24L24 42L14 24Z" stroke="url(#brand-grad)" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <circle cx="24" cy="24" r="3" fill="url(#brand-grad)" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Time-of-day greeting
// ---------------------------------------------------------------------------

function useGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

const MapPinIcon = (
  <svg
    width="12" height="12" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ArrowRightIcon = (
  <svg
    width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className="shrink-0 opacity-0 group-hover/recent:opacity-60 transition-opacity ml-auto"
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
)

const RECENT_SEARCHES = [
  'Coffee shop with fast wifi',
  'Quiet lunch spot near Union Square',
  'Late night food in East Village',
]

// ---------------------------------------------------------------------------
// HomeScreen
// ---------------------------------------------------------------------------

export function HomeScreen() {
  const navigate = useNavigate()
  const greeting = useGreeting()
  const rawChips = getTimeContextChips()
  const chips = rawChips.map((c) => ({ ...c, icon: CHIP_ICONS[c.label] }))

  const [linkInput, setLinkInput] = useState('')
  const [linkError, setLinkError] = useState('')

  function handleSearch(query: string) {
    navigate(`/results?q=${encodeURIComponent(query)}`)
  }

  function handlePasteLink() {
    if (!linkInput.trim()) return
    const placeId = extractPlaceId(linkInput.trim())
    if (placeId) {
      setLinkError('')
      navigate(`/place/${placeId}`)
    } else {
      setLinkError('Could not extract a place from that link')
    }
  }

  return (
    <div className="relative min-h-dvh bg-[var(--color-bone)] flex flex-col items-center px-6 pb-32 pt-[18vh]">
      {/* Subtle warm radial wash behind brand area — replaces aurora */}
      <div
        className="absolute top-0 inset-x-0 h-[55vh] pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 30%, var(--tint-cobalt) 0%, transparent 70%)',
          opacity: 0.5,
        }}
      />

      <div className="relative w-full max-w-md flex flex-col gap-9">
        {/* Brand + greeting */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <BrandMark />
          </motion.div>

          <div className="space-y-2 text-center">
            <motion.h1
              className="text-4xl tracking-[-0.025em] text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              Praxis
            </motion.h1>

            <motion.p
              className="text-[15px] text-[var(--color-ink-secondary)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            >
              {greeting}. What do you need right now?
            </motion.p>
          </div>
        </div>

        {/* Query bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: 'easeOut' }}
        >
          <QueryBar onSearch={handleSearch} autoFocus />
        </motion.div>

        {/* Intent chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease: 'easeOut' }}
        >
          <IntentChips chips={chips} onSelect={handleSearch} />
        </motion.div>

        {/* Paste Google Maps link */}
        {isGoogleEnabled() && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.28, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              <span
                className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-tertiary)]"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                or
              </span>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={linkInput}
                onChange={(e) => { setLinkInput(e.target.value); setLinkError('') }}
                onKeyDown={(e) => e.key === 'Enter' && handlePasteLink()}
                placeholder="Paste a Google Maps link"
                className="flex-1 min-w-0 text-sm text-[var(--color-ink)] bg-[var(--color-bone-warm)] border border-[var(--color-border)] rounded-xl px-3.5 py-2.5 placeholder:text-[var(--color-ink-tertiary)] focus:outline-none focus:border-[var(--color-accent-cobalt)] focus:ring-1 focus:ring-[var(--color-accent-cobalt)]/20 transition-colors"
              />
              <button
                onClick={handlePasteLink}
                className="shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium text-white cursor-pointer transition-opacity hover:opacity-90"
                style={{ background: 'var(--color-accent-cobalt)' }}
              >
                Go
              </button>
            </div>
            {linkError && (
              <p className="text-[11px] text-[var(--color-accent-coral)] mt-1.5 px-1">{linkError}</p>
            )}
          </motion.div>
        )}

        {/* Recent searches */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.34, ease: 'easeOut' }}
        >
          <p
            className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-tertiary)] px-1"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Recent
          </p>
          <div className="flex flex-col gap-1">
            {RECENT_SEARCHES.map((query) => (
              <button
                key={query}
                onClick={() => handleSearch(query)}
                className="group/recent min-h-[44px] flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--color-ink-secondary)] text-sm text-left hover:text-[var(--color-ink)] hover:bg-[var(--color-bone-warm)] transition-all cursor-pointer border-l-2 border-transparent hover:border-[var(--color-accent-cobalt)]"
              >
                <span className="text-[var(--color-ink-tertiary)]">{SearchIcon}</span>
                <span className="flex-1">{query}</span>
                <span className="text-[var(--color-ink-tertiary)]">{ArrowRightIcon}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Location indicator */}
        <motion.div
          className="text-center flex items-center justify-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
        >
          <span className="text-[var(--color-ink-tertiary)]">{MapPinIcon}</span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-cobalt)] opacity-50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent-cobalt)]" />
          </span>
          <p className="text-[var(--color-ink-tertiary)] text-xs">New York City</p>
        </motion.div>
      </div>
    </div>
  )
}
