import { motion } from 'framer-motion'

interface SpotlightBackgroundProps {
  children?: React.ReactNode
  className?: string
  color?: string
}

export function SpotlightBackground({
  children,
  className = '',
  color = 'rgba(217, 119, 6, 0.06)',
}: SpotlightBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Spotlight orb */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: 'blur(60px)',
          top: '10%',
          left: '30%',
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary smaller spotlight */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(79, 70, 229, 0.04) 0%, transparent 70%)`,
          filter: 'blur(50px)',
          bottom: '5%',
          right: '10%',
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 20, -15, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
