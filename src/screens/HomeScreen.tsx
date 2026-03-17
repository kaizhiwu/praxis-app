import { type ReactNode, useMemo } from 'react'
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

type ChipColor = 'indigo' | 'coral' | 'amber'

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
  // Work-related: indigo
  'Quiet work spot': 'indigo',
  'Coffee with outlets': 'indigo',
  'Recharge spot': 'indigo',
  'Quiet call spot': 'indigo',
  // Relief: coral
  'Restroom nearby': 'coral',
  'Open restroom': 'coral',
  'Indoor waiting': 'coral',
  'Safe place to wait': 'coral',
  // Food/savings: amber
  'Cheap lunch': 'amber',
  'Late food deals': 'amber',
  'Late food': 'amber',
}

// ---------------------------------------------------------------------------
// Brand Mark (geometric compass / pin)
// ---------------------------------------------------------------------------

function BrandMark() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Larger radial glow behind the mark */}
      <div className="absolute w-24 h-24 rounded-full blur-2xl" style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(226,97,75,0.08) 50%, transparent 80%)' }} />
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="relative"
      >
        <defs>
          <linearGradient id="brand-ring-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#E2614B" />
          </linearGradient>
          <linearGradient id="brand-fill-grad" x1="16" y1="10" x2="32" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#E2614B" />
          </linearGradient>
        </defs>
        {/* Outer ring with gradient stroke */}
        <circle cx="24" cy="24" r="22" stroke="url(#brand-ring-grad)" strokeWidth="1.5" fill="none" opacity="0.7" />
        {/* Inner geometric compass / waypoint shape */}
        <path
          d="M24 6L34 24L24 42L14 24Z"
          fill="url(#brand-fill-grad)"
          opacity="0.12"
        />
        <path
          d="M24 6L34 24L24 42L14 24Z"
          stroke="url(#brand-fill-grad)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner circle */}
        <circle
          cx="24"
          cy="24"
          r="7"
          stroke="url(#brand-fill-grad)"
          strokeWidth="1.5"
          fill="rgba(79,70,229,0.06)"
        />
        {/* Center dot */}
        <circle cx="24" cy="24" r="2" fill="url(#brand-fill-grad)" />
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
      {/* Subtle mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(at 20% 30%, rgba(79,70,229,0.8) 0%, transparent 50%), radial-gradient(at 80% 70%, rgba(226,97,75,0.8) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(124,58,237,0.6) 0%, transparent 60%)',
        }}
      />
      {/* Indigo orb */}
      <motion.div
        className="absolute w-[720px] h-[720px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)',
          top: '-10%',
          left: '-10%',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, 80, 30, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Coral orb */}
      <motion.div
        className="absolute w-[620px] h-[620px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(226,97,75,0.06) 0%, transparent 70%)',
          bottom: '-5%',
          right: '-15%',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -60, -20, 0],
          y: [0, -50, 40, 0],
        }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Amber orb */}
      <motion.div
        className="absolute w-[550px] h-[550px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)',
          top: '40%',
          left: '50%',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 50, -20, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Rose / pink orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)',
          top: '10%',
          right: '20%',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Dot grid pattern behind brand area
// ---------------------------------------------------------------------------

function DotGrid() {
  const dots = useMemo(() => {
    const result: { x: number; y: number; color: string }[] = []
    const cols = 20
    const rows = 10
    const spacing = 14
    const offsetX = -(cols * spacing) / 2
    const offsetY = -(rows * spacing) / 2
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result.push({
          x: offsetX + c * spacing,
          y: offsetY + r * spacing,
          color: (r + c) % 3 === 0 ? '#E2614B' : '#4F46E5',
        })
      }
    }
    return result
  }, [])

  return (
    <svg
      className="absolute pointer-events-none"
      width="280"
      height="140"
      viewBox="-140 -70 280 140"
      style={{ top: '-20px', left: '50%', transform: 'translateX(-50%)' }}
      aria-hidden
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="1" fill={d.color} opacity="0.06" />
      ))}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Decorative divider with diamond
// ---------------------------------------------------------------------------

function DiamondDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-1">
      <span className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-indigo-500/10" />
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
        <rect x="4" y="0" width="5.66" height="5.66" rx="1" transform="rotate(45 4 0)" fill="#4F46E5" opacity="0.15" />
      </svg>
      <span className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-indigo-500/10" />
    </div>
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

// ---------------------------------------------------------------------------
// Map pin icon (inline SVG)
// ---------------------------------------------------------------------------

const MapPinIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 text-text-tertiary"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

// ---------------------------------------------------------------------------
// Arrow right icon for recent search hover
// ---------------------------------------------------------------------------

const ArrowRightIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0 opacity-0 group-hover/recent:opacity-60 transition-opacity ml-auto text-text-tertiary"
  >
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
)

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
  const greeting = useGreeting()
  const rawChips = getTimeContextChips()
  const chips = rawChips.map((c) => ({
    ...c,
    icon: CHIP_ICONS[c.label],
    color: CHIP_COLORS[c.label] as 'indigo' | 'coral' | 'amber' | undefined,
  }))

  function handleSearch(query: string) {
    navigate(`/results?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="relative min-h-dvh flex flex-col items-center px-6 pb-32 pt-[24vh]">
      <AuroraBackground />

      <div className="relative w-full max-w-md flex flex-col gap-10">
        {/* Brand + Title */}
        <div className="relative flex flex-col items-center gap-4">
          {/* Decorative dot grid behind brand */}
          <DotGrid />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <BrandMark />
          </motion.div>

          <div className="space-y-3 text-center">
            <motion.h1
              className="text-5xl font-bold tracking-[-0.03em] bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, #4F46E5, #7C3AED, #E2614B)',
                textShadow: '0 0 30px rgba(79,70,229,0.15), 0 0 60px rgba(226,97,75,0.08)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Praxis
            </motion.h1>

            {/* Greeting */}
            <motion.p
              className="text-base font-medium"
              style={{ color: '#92784A' }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              {greeting}
            </motion.p>

            <motion.p
              className="text-text-secondary text-sm"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: 'easeOut' }}
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

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.28, ease: 'easeOut' }}
        >
          <DiamondDivider />
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
                className="group/recent min-h-[44px] flex items-center gap-3 px-3 py-2.5 rounded-xl text-text-secondary text-sm text-left hover:text-text-primary hover:bg-surface-hover/50 transition-all cursor-pointer border-l-2 border-transparent hover:border-indigo-500/15"
              >
                {SearchIcon}
                <span className="flex-1">{query}</span>
                {ArrowRightIcon}
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
          {MapPinIcon}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500/60" />
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
