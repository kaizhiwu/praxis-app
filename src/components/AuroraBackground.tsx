interface AuroraBackgroundProps {
  children?: React.ReactNode
  className?: string
}

export function AuroraBackground({ children, className = '' }: AuroraBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Aurora layer — CSS-only for smooth GPU-accelerated animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79, 70, 229, 0.4), transparent),
              radial-gradient(ellipse 60% 40% at 70% 50%, rgba(226, 97, 75, 0.3), transparent),
              radial-gradient(ellipse 50% 60% at 30% 80%, rgba(217, 119, 6, 0.35), transparent)
            `,
            animation: 'auroraShift 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 80% 20%, rgba(124, 58, 237, 0.3), transparent),
              radial-gradient(ellipse 60% 40% at 20% 60%, rgba(236, 72, 153, 0.25), transparent)
            `,
            animation: 'auroraShift 28s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style>{`
        @keyframes auroraShift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          50% { transform: translate(-20px, 15px) scale(0.97); }
          75% { transform: translate(15px, 25px) scale(1.03); }
        }
      `}</style>
    </div>
  )
}
