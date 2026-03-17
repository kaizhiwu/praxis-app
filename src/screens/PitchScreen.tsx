import { HeroSection } from './pitch/HeroSection'
import { ProblemSection } from './pitch/ProblemSection'
import { ProductSection } from './pitch/ProductSection'
import { FlywheelSection } from './pitch/FlywheelSection'
import { MarketSection } from './pitch/MarketSection'
import { BusinessSection } from './pitch/BusinessSection'
import { MoatSection } from './pitch/MoatSection'
import { RisksSection } from './pitch/RisksSection'
import { TeamSection } from './pitch/TeamSection'
import { CTASection } from './pitch/CTASection'

export function PitchScreen() {
  return (
    <div className="bg-[#09090B] text-white min-h-screen">
      {/* Grain overlay */}
      <div className="grain" />

      {/* Subtle nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#09090B]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <span className="text-white font-semibold tracking-tight">Praxis</span>
        <a href="/" className="text-xs text-[#9CA3AF] hover:text-white transition-colors">
          See the product &rarr;
        </a>
      </nav>

      <HeroSection />
      <ProblemSection />
      <ProductSection />
      <FlywheelSection />
      <MarketSection />
      <BusinessSection />
      <MoatSection />
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
