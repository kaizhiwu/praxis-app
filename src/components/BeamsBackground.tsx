import { motion } from 'framer-motion'

interface BeamsBackgroundProps {
  children?: React.ReactNode
  className?: string
}

const beams = [
  {
    width: 280,
    left: '10%',
    delay: 0,
    duration: 12,
    rotate: -12,
    gradient: 'from-[#4F46E5]/20 via-[#4F46E5]/5 to-transparent',
  },
  {
    width: 200,
    left: '35%',
    delay: 2,
    duration: 16,
    rotate: -8,
    gradient: 'from-[#D97706]/15 via-[#D97706]/5 to-transparent',
  },
  {
    width: 320,
    left: '55%',
    delay: 4,
    duration: 14,
    rotate: -15,
    gradient: 'from-[#E2614B]/12 via-[#E2614B]/3 to-transparent',
  },
  {
    width: 180,
    left: '75%',
    delay: 6,
    duration: 18,
    rotate: -10,
    gradient: 'from-[#4F46E5]/10 via-[#7C3AED]/5 to-transparent',
  },
  {
    width: 240,
    left: '20%',
    delay: 8,
    duration: 20,
    rotate: -18,
    gradient: 'from-[#D97706]/8 via-[#E2614B]/3 to-transparent',
  },
]

export function BeamsBackground({ children, className = '' }: BeamsBackgroundProps) {
  return (
    <div className={`relative overflow-hidden bg-[var(--color-dark-surface)] ${className}`}>
      {/* Beams layer */}
      <div className="absolute inset-0 overflow-hidden">
        {beams.map((beam, i) => (
          <motion.div
            key={i}
            className={`absolute -top-1/2 h-[200%] bg-gradient-to-b ${beam.gradient}`}
            style={{
              width: beam.width,
              left: beam.left,
              rotate: `${beam.rotate}deg`,
              filter: 'blur(40px)',
            }}
            initial={{ opacity: 0, y: -200 }}
            animate={{
              opacity: [0, 0.6, 0.3, 0.6, 0],
              y: [-200, 100, -100, 200, -200],
            }}
            transition={{
              duration: beam.duration,
              delay: beam.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Subtle radial glow at center bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(ellipse at center, #4F46E5, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
