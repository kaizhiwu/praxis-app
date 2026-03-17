import { HeroSection } from './pitch/HeroSection'
import { ProblemSection } from './pitch/ProblemSection'
import { DemoSection } from './pitch/DemoSection'
import { ProductSection } from './pitch/ProductSection'
import { FlywheelSection } from './pitch/FlywheelSection'
import { MarketSection } from './pitch/MarketSection'
import { BusinessSection } from './pitch/BusinessSection'
import { MoatSection } from './pitch/MoatSection'
import { TractionSection } from './pitch/TractionSection'
import { RisksSection } from './pitch/RisksSection'
import { TeamSection } from './pitch/TeamSection'
import { CTASection } from './pitch/CTASection'

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/[0.06]" />
      <div className="w-1 h-1 rounded-full bg-white/[0.08] mx-3" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/[0.06]" />
    </div>
  )
}

export function PitchScreen() {
  return (
    <div className="bg-[#09090B] text-white min-h-screen">
      {/* Grain overlay */}
      <div className="grain" />

      {/* Floating nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#09090B]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>
            <svg width="10" height="10" viewBox="0 0 20 20" fill="white">
              <path d="M10 2L2 7l8 5 8-5-8-5zM2 13l8 5 8-5M2 10l8 5 8-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-white font-semibold tracking-tight">Praxis</span>
        </div>
        <a href="/" className="text-xs text-[#9CA3AF] hover:text-white transition-colors inline-flex items-center gap-1">
          See the product
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
      <MarketSection />
      <BusinessSection />

      <SectionDivider />
      <MoatSection />
      <TractionSection />

      <SectionDivider />
      <RisksSection />
      <TeamSection />
      <CTASection />

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-white/[0.04]">
        <p className="text-[#6B7280] text-xs">&copy; 2026 Praxis &middot; Behavioral Place Intelligence</p>
      </footer>
    </div>
  )
}
