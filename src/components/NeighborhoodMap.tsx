import { motion } from 'framer-motion'

export type MapPin = {
  /** Category icon name */
  icon: string
  /** Short label, e.g. "Work" */
  label: string
  /** 0–100 viewport-relative position */
  x: number
  y: number
  /** Pin color — matches the use-case category */
  color?: 'cobalt' | 'orange' | 'amber' | 'violet' | 'magenta' | 'emerald'
}

const PIN_COLOR: Record<NonNullable<MapPin['color']>, { fg: string; bg: string }> = {
  cobalt:  { fg: 'var(--color-accent-cobalt)',  bg: 'var(--chip-cobalt)' },
  orange:  { fg: 'var(--color-accent-coral)',   bg: 'var(--chip-orange)' },
  amber:   { fg: 'var(--color-accent-amber)',   bg: 'var(--chip-amber)' },
  violet:  { fg: 'var(--color-accent-violet)',  bg: 'var(--chip-violet)' },
  magenta: { fg: 'var(--color-accent-magenta)', bg: 'var(--chip-magenta)' },
  emerald: { fg: 'var(--color-accent-emerald)', bg: 'var(--chip-emerald)' },
}

const ICONS: Record<string, React.ReactNode> = {
  laptop: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M2 20h20" />
    </>
  ),
  camera: (
    <>
      <path d="M3 7h3l2-2h8l2 2h3a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  heart: (
    <>
      <path d="M20.5 8.6a4.5 4.5 0 00-7.6-3.2L12 6.3l-.9-.9A4.5 4.5 0 003.5 8.6c0 5 8.5 10.4 8.5 10.4s8.5-5.4 8.5-10.4z" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </>
  ),
  accessible: (
    <>
      <circle cx="12" cy="4" r="1.5" />
      <path d="M9 10h6l-1 4 3 6" />
      <path d="M9 10v6a4 4 0 004 4" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
      <path d="M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3" />
    </>
  ),
  utensils: (
    <>
      <path d="M5 3v8a2 2 0 002 2v8M9 3v8a2 2 0 01-2 2" />
      <path d="M7 3v8" />
      <path d="M19 3a3 3 0 00-3 3v6h2v9" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
}

function PinIcon({ name }: { name: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICONS[name] ?? null}
    </svg>
  )
}

/**
 * NeighborhoodMap — abstract horizontal map band.
 * A stylized street grid with category pins distributed across it.
 * Acts as a visual anchor for sections that would otherwise read as
 * pure text rows.
 */
export function NeighborhoodMap({ pins }: { pins: MapPin[] }) {
  // Generate a sparse street grid — a few horizontal + vertical lines
  const HORIZONTAL_STREETS = [22, 40, 58, 76]
  const VERTICAL_STREETS = [12, 28, 44, 60, 76, 92]

  return (
    <div className="relative w-full aspect-[1200/280] rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bone)] overflow-hidden">
      <svg
        viewBox="0 0 1200 280"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="map-fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-bone)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--color-bone-warm)" stopOpacity="0.5" />
          </linearGradient>
          <pattern id="map-dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="var(--color-ink-faint)" opacity="0.25" />
          </pattern>
        </defs>

        {/* Subtle dot pattern background */}
        <rect x="0" y="0" width="1200" height="280" fill="url(#map-dots)" />

        {/* Horizontal streets */}
        {HORIZONTAL_STREETS.map((y, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={(y / 100) * 280}
            x2="1200"
            y2={(y / 100) * 280}
            stroke="var(--color-border)"
            strokeWidth="0.6"
            opacity="0.5"
          />
        ))}

        {/* Vertical streets */}
        {VERTICAL_STREETS.map((x, i) => (
          <line
            key={`v-${i}`}
            x1={(x / 100) * 1200}
            y1="0"
            x2={(x / 100) * 1200}
            y2="280"
            stroke="var(--color-border)"
            strokeWidth="0.6"
            opacity="0.5"
          />
        ))}

        {/* River suggestion — a soft curve along the bottom */}
        <path
          d="M -20 250 Q 200 230, 400 245 T 800 240 T 1220 248 L 1220 290 L -20 290 Z"
          fill="var(--color-bone-warm)"
          opacity="0.6"
        />
        <path
          d="M -20 250 Q 200 230, 400 245 T 800 240 T 1220 248"
          stroke="var(--color-border)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />

        {/* Soft fade at the bottom */}
        <rect x="0" y="0" width="1200" height="280" fill="url(#map-fade)" />
      </svg>

      {/* Pins — absolute-positioned over the SVG, colored per category */}
      {pins.map((pin, i) => {
        const tokens = pin.color
          ? PIN_COLOR[pin.color]
          : { fg: 'var(--color-ink-secondary)', bg: 'var(--color-bone)' }
        return (
        <motion.div
          key={`${pin.label}-${i}`}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          initial={{ opacity: 0, y: -6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
        >
          <span
            className="inline-flex items-center justify-center w-7 h-7 rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.06)]"
            style={{ background: tokens.bg, color: tokens.fg, border: `1px solid ${tokens.fg}` }}
          >
            <PinIcon name={pin.icon} />
          </span>
          <span
            className="hidden md:inline-block text-[9px] uppercase tracking-[0.14em] bg-[var(--color-bone)]/80 px-1.5 py-0.5 rounded"
            style={{ fontFamily: 'var(--font-mono)', color: tokens.fg }}
          >
            {pin.label}
          </span>
        </motion.div>
        )
      })}
    </div>
  )
}
