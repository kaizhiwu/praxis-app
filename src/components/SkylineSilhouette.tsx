import { motion } from 'framer-motion'

/**
 * SkylineSilhouette — abstract NYC building silhouette.
 * Sits as an atmospheric anchor above headlines; soft, never literal,
 * a single warm gradient with two layers of building shapes.
 */
export function SkylineSilhouette() {
  return (
    <motion.svg
      viewBox="0 0 800 140"
      preserveAspectRatio="xMidYEnd meet"
      className="w-full max-w-[640px] mx-auto h-[80px] sm:h-[100px]"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      aria-hidden
    >
      <defs>
        <linearGradient id="sky-warm" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent-coral)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--color-accent-amber)" stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="sky-fade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-bone-warm)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--color-bone-warm)" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Soft warm wash backdrop */}
      <rect x="0" y="0" width="800" height="140" fill="url(#sky-warm)" />

      {/* Far buildings — pale, flat */}
      <path
        d="M 0 110 L 30 100 L 30 88 L 60 88 L 60 96 L 95 96 L 95 80 L 130 80 L 130 92 L 165 92 L 165 78 L 200 78 L 200 100 L 230 100 L 230 86 L 265 86 L 265 100 L 300 100 L 300 90 L 335 90 L 335 100 L 370 100 L 370 84 L 410 84 L 410 96 L 445 96 L 445 88 L 480 88 L 480 102 L 515 102 L 515 90 L 550 90 L 550 96 L 585 96 L 585 84 L 620 84 L 620 100 L 655 100 L 655 90 L 690 90 L 690 96 L 725 96 L 725 88 L 760 88 L 760 102 L 800 102 L 800 140 L 0 140 Z"
        fill="var(--color-ink-faint)"
        opacity="0.32"
      />

      {/* Near buildings — darker, sharper */}
      <path
        d="M 0 124 L 25 124 L 25 100 L 55 100 L 55 110 L 90 110 L 90 92 L 125 92 L 125 104 L 160 104 L 160 96 L 200 96 L 200 110 L 235 110 L 235 90 L 275 90 L 275 100 L 310 100 L 310 112 L 345 112 L 345 96 L 385 96 L 385 108 L 420 108 L 420 100 L 460 100 L 460 90 L 500 90 L 500 104 L 540 104 L 540 96 L 580 96 L 580 110 L 620 110 L 620 100 L 660 100 L 660 108 L 700 108 L 700 96 L 740 96 L 740 110 L 800 110 L 800 140 L 0 140 Z"
        fill="var(--color-ink-secondary)"
        opacity="0.55"
      />

      {/* Faded ground meld into bg */}
      <rect x="0" y="100" width="800" height="40" fill="url(#sky-fade)" />

      {/* Few subtle window lights */}
      {[
        [70, 102], [115, 96], [180, 100], [255, 96],
        [328, 102], [402, 100], [475, 96], [560, 100], [678, 102],
      ].map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x}
          y={y}
          width="1.6"
          height="1.6"
          fill="var(--color-accent-amber)"
          opacity="0.7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
        />
      ))}
    </motion.svg>
  )
}
