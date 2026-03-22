import { useState, useEffect } from 'react'
import { HeroSection } from './pitch/HeroSection'
import { ProblemSection } from './pitch/ProblemSection'
import { QueryShowcaseSection } from './pitch/QueryShowcaseSection'
import { DemoSection } from './pitch/DemoSection'
import { ProductSection } from './pitch/ProductSection'
import { FlywheelSection } from './pitch/FlywheelSection'
import { MoatSection } from './pitch/MoatSection'
import { HowIBuildSection } from './pitch/HowIBuildSection'
import { BuildVelocitySection } from './pitch/BuildVelocitySection'
import { RisksSection } from './pitch/RisksSection'
import { CTASection } from './pitch/CTASection'

export function PitchScreen() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-[#FAFAFA] text-[#1D1D1F] min-h-screen">
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(250,250,250,0.95)' : 'rgba(250,250,250,0.6)',
          borderBottom: scrolled
            ? '1px solid rgba(0,0,0,0.06)'
            : '1px solid transparent',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center bg-[#4F46E5]"
          >
            <svg width="10" height="10" viewBox="0 0 20 20" fill="white">
              <path d="M10 2L2 7l8 5 8-5-8-5zM2 13l8 5 8-5M2 10l8 5 8-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[#1D1D1F] font-semibold tracking-tight">Praxis</span>
        </div>
        <a href="/app" className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors inline-flex items-center gap-1">
          Try the product
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </nav>

      <HeroSection />
      <ProblemSection />
      <QueryShowcaseSection />
      <DemoSection />
      <ProductSection />
      <FlywheelSection />
      <MoatSection />
      <RisksSection />
      <HowIBuildSection />
      <BuildVelocitySection />
      <CTASection />

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-[#E5E5EA]">
        <p className="text-[#86868B] text-xs">
          &copy; 2026 Praxis &middot; Built by{' '}
          <a href="https://kaizhiwu.com" className="hover:text-[#1D1D1F] transition-colors" target="_blank" rel="noopener noreferrer">
            Kai Wu
          </a>
        </p>
      </footer>
    </div>
  )
}
