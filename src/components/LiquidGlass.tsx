import { cn } from '../lib/cn'

/**
 * SVG filter for liquid glass distortion effect.
 * Render once at the app root — components reference it via CSS.
 */
export function LiquidGlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id="liquid-glass-filter"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.02"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="80"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}

/**
 * Liquid glass panel wrapper.
 * Use for cards, nav bars, sheets, and other elevated surfaces.
 */
export function GlassPanel({
  children,
  className,
  elevated = false,
  ...props
}: {
  children: React.ReactNode
  className?: string
  elevated?: boolean
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl',
        elevated ? 'glass-elevated' : 'glass',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
