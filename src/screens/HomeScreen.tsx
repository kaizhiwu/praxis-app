import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { QueryBar } from '../components/QueryBar'
import { IntentChips } from '../components/IntentChips'
import { getTimeContextChips } from '../data/mock'

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

const BoltIcon = (
  <Icon>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </Icon>
)

const DropletIcon = (
  <Icon>
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </Icon>
)

const BatteryIcon = (
  <Icon>
    <rect x="2" y="7" width="16" height="10" rx="2" />
    <path d="M22 11v2" />
    <path d="M6 11v2" />
    <path d="M10 11v2" />
  </Icon>
)

const UtensilsIcon = (
  <Icon>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </Icon>
)

const ClockIcon = (
  <Icon>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </Icon>
)

const BuildingIcon = (
  <Icon>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22V12h6v10" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01" />
  </Icon>
)

const ShieldIcon = (
  <Icon>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </Icon>
)

const MoonIcon = (
  <Icon>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </Icon>
)

const SearchIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-text-tertiary"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
)

// ---------------------------------------------------------------------------
// Chip icon + color mapping
// ---------------------------------------------------------------------------

type ChipColor = 'teal' | 'amber' | 'violet'

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

const CHIP_COLORS: Record<string, ChipColor> = {
  // Work-related: teal
  'Quiet work spot': 'teal',
  'Coffee with outlets': 'teal',
  'Recharge spot': 'teal',
  'Quiet call spot': 'teal',
  // Relief: amber
  'Restroom nearby': 'amber',
  'Open restroom': 'amber',
  'Indoor waiting': 'amber',
  'Safe place to wait': 'amber',
  // Food/savings: violet
  'Cheap lunch': 'violet',
  'Late food deals': 'violet',
  'Late food': 'violet',
}

// ---------------------------------------------------------------------------
// Brand Mark (geometric compass / pin)
// ---------------------------------------------------------------------------

function BrandMark() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow behind the mark */}
      <div className="absolute w-10 h-10 rounded-full bg-accent/10 blur-xl" />
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="relative"
      >
        {/* Outer diamond / compass shape */}
        <path
          d="M16 2L26 16L16 30L6 16Z"
          stroke="#1A8A8A"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner circle */}
        <circle
          cx="16"
          cy="16"
          r="5"
          stroke="#1A8A8A"
          strokeWidth="1.5"
          fill="rgba(26,138,138,0.08)"
        />
        {/* Center dot */}
        <circle cx="16" cy="16" r="1.5" fill="#1A8A8A" />
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Aurora background orbs (light theme — softer, more colorful tints)
// ---------------------------------------------------------------------------

function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Teal orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(26,138,138,0.07) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 80, 30, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Warm coral orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(217,123,43,0.06) 0%, transparent 70%)',
          bottom: '-5%',
          right: '-15%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -60, -20, 0],
          y: [0, -50, 40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Violet orb */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(124,90,199,0.06) 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

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
  const rawChips = getTimeContextChips()
  const chips = rawChips.map((c) => ({
    ...c,
    icon: CHIP_ICONS[c.label],
    color: CHIP_COLORS[c.label] as 'teal' | 'amber' | 'violet' | undefined,
  }))

  function handleSearch(query: string) {
    navigate(`/results?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="relative min-h-dvh flex flex-col items-center px-6 pb-32 pt-[24vh]">
      <AuroraBackground />

      <div className="relative w-full max-w-md flex flex-col gap-10">
        {/* Brand + Title */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <BrandMark />
          </motion.div>

          <div className="space-y-3 text-center">
            <motion.h1
              className="text-5xl font-bold tracking-[-0.03em] bg-gradient-to-r from-[#1A1917] to-[#6E6D68] bg-clip-text text-transparent"
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
        </div>

        {/* Query bar with ambient glow */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 -inset-x-4 -inset-y-3 rounded-3xl bg-accent/[0.04] blur-2xl pointer-events-none" />
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
                className="min-h-[44px] flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary text-sm text-left hover:text-text-primary hover:bg-surface-hover/50 transition-colors cursor-pointer"
              >
                {SearchIcon}
                {query}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Location indicator with decorative lines */}
        <motion.div
          className="text-center flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        >
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-surface-border" />
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent/60" />
          </span>
          <p className="text-text-tertiary text-xs">
            New York City
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-surface-border" />
        </motion.div>
      </div>
    </div>
  )
}
