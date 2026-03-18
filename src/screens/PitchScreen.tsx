import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HeroSection } from './pitch/HeroSection'
import { ProblemSection } from './pitch/ProblemSection'
import { DemoSection } from './pitch/DemoSection'
import { ProductSection } from './pitch/ProductSection'
import { FlywheelSection } from './pitch/FlywheelSection'
import { MoatSection } from './pitch/MoatSection'
import { HowIBuildSection } from './pitch/HowIBuildSection'
import { BuildVelocitySection } from './pitch/BuildVelocitySection'
import { RisksSection } from './pitch/RisksSection'
import { CTASection } from './pitch/CTASection'

function SectionDivider() {
  return (
    <motion.div
      className="flex items-center justify-center py-2"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#4F46E5]/15" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]/20 mx-3" />
      <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#4F46E5]/15" />
    </motion.div>
  )
}

function MouseGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const handleLeave = () => setVisible(false)
    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      className="fixed pointer-events-none z-40 w-[500px] h-[500px] rounded-full transition-opacity duration-300"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(79,70,229,0.04) 0%, transparent 70%)',
        opacity: visible ? 1 : 0,
      }}
    />
  )
}

export function PitchScreen() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-[#09090B] text-white min-h-screen">
      {/* Grain overlay */}
      <div className="grain" />

      {/* Mouse-following gradient */}
      <MouseGlow />

      {/* Floating nav with animated gradient border on scroll */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-xl transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(9,9,11,0.85)' : 'rgba(9,9,11,0.4)',
          borderBottom: scrolled
            ? '1px solid rgba(79,70,229,0.1)'
            : '1px solid rgba(255,255,255,0.02)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
              boxShadow: '0 0 12px rgba(79,70,229,0.3)',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 20 20" fill="white">
              <path d="M10 2L2 7l8 5 8-5-8-5zM2 13l8 5 8-5M2 10l8 5 8-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight">Praxis</span>
        </div>
        <a href="/" className="text-xs text-[#9CA3AF] hover:text-white transition-colors inline-flex items-center gap-1">
          Try the product
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </nav>

      <HeroSection />
      <ProblemSection />

      <SectionDivider />
      <DemoSection />

      <SectionDivider />
      <ProductSection />
      <FlywheelSection />

      <SectionDivider />
      <MoatSection />
      <RisksSection />

      <SectionDivider />
      <HowIBuildSection />
      <BuildVelocitySection />
      <CTASection />

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/[0.04]">
        <p className="text-[#6B7280] text-xs">
          &copy; 2026 Praxis &middot; Built by{' '}
          <a href="https://kaizhiwu.com" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            Kai Wu
          </a>
        </p>
      </footer>
    </div>
  )
}
