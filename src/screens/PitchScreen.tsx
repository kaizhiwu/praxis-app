import { useState, useEffect } from 'react'
import { HeroSection } from './pitch/HeroSection'
import { WhoItsForSection } from './pitch/WhoItsForSection'
import { ProblemSection } from './pitch/ProblemSection'
import { QueryShowcaseSection } from './pitch/QueryShowcaseSection'
import { DemoSection } from './pitch/DemoSection'
import { ProductSection } from './pitch/ProductSection'
import { FlywheelSection } from './pitch/FlywheelSection'
import { MoatSection } from './pitch/MoatSection'
import { WritingSection } from './pitch/WritingSection'
import { HowIBuildSection } from './pitch/HowIBuildSection'
import { CTASection } from './pitch/CTASection'
import { ContactModal } from '../components/ContactModal'
import { PITCH } from '../data/pitch'

export function PitchScreen() {
  const [scrolled, setScrolled] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  // Force scroll to top on mount — double-tap to beat browser restoration + HMR
  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => window.scrollTo(0, 0))
    // Final fallback for slow layouts
    const t = setTimeout(() => window.scrollTo(0, 0), 50)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openContact = () => setContactOpen(true)

  return (
    <div className="bg-[#FAFAFA] text-[#1D1D1F] min-h-screen">
      {/* ── Floating Nav ── */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl px-5 py-3 flex items-center justify-between rounded-2xl transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(250,250,250,0.92)' : 'rgba(250,250,250,0.6)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderBottom: scrolled
            ? '1px solid rgba(0,0,0,0.06)'
            : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.04)' : 'none',
        }}
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center bg-[#4F46E5]">
            <svg width="10" height="10" viewBox="0 0 20 20" fill="white">
              <path d="M10 2L2 7l8 5 8-5-8-5zM2 13l8 5 8-5M2 10l8 5 8-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-[#1D1D1F] font-semibold tracking-tight">Praxis</span>
        </div>

        {/* Center: Section links (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#problem" className="text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors">How it works</a>
          <a href="#demo" className="text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors">Demo</a>
          <a href="#writing" className="text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors">Writing</a>
        </div>

        {/* Right: CTAs */}
        <div className="flex items-center gap-3">
          <a href="/app" className="hidden sm:inline-flex text-sm text-[#86868B] hover:text-[#1D1D1F] transition-colors items-center gap-1">
            Try the product
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <button
            onClick={openContact}
            className="text-sm text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-full px-4 py-1.5 transition-colors cursor-pointer"
          >
            Explore with us
          </button>
        </div>
      </nav>

      {/* ── Sections ── */}
      <HeroSection onContact={openContact} />
      <WhoItsForSection onContact={openContact} />
      <ProblemSection />
      <QueryShowcaseSection />
      <DemoSection />
      <ProductSection />
      <FlywheelSection />
      <MoatSection />
      <WritingSection />
      <HowIBuildSection />
      <CTASection onContact={openContact} />

      {/* ── Footer ── */}
      <footer className="bg-[#0A0A0E] py-16 px-6 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Col 1: Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-[#4F46E5]">
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="white">
                    <path d="M10 2L2 7l8 5 8-5-8-5zM2 13l8 5 8-5M2 10l8 5 8-5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[#E8E8ED] font-semibold tracking-tight">Praxis</span>
              </div>
              <p className="text-xs text-[#8E8E93] leading-relaxed max-w-[200px]">
                Behavioral place intelligence. Ground truth about how places actually function.
              </p>
            </div>

            {/* Col 2: Product */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#8E8E93] font-medium mb-4">Product</h4>
              <ul className="space-y-2.5">
                <li><a href="/app" className="text-sm text-[#8E8E93] hover:text-[#E8E8ED] transition-colors">Try Praxis</a></li>
                <li><a href="#demo" className="text-sm text-[#8E8E93] hover:text-[#E8E8ED] transition-colors">See the demo</a></li>
                <li><a href="#product" className="text-sm text-[#8E8E93] hover:text-[#E8E8ED] transition-colors">How it works</a></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#8E8E93] font-medium mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li><a href={`mailto:${PITCH.cta.email}`} className="text-sm text-[#8E8E93] hover:text-[#E8E8ED] transition-colors">Email</a></li>
                <li><a href={PITCH.cta.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-[#8E8E93] hover:text-[#E8E8ED] transition-colors">X / Twitter</a></li>
                <li><a href={PITCH.cta.substack} target="_blank" rel="noopener noreferrer" className="text-sm text-[#8E8E93] hover:text-[#E8E8ED] transition-colors">Substack</a></li>
              </ul>
            </div>

            {/* Col 4: Built with */}
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.15em] text-[#8E8E93] font-medium mb-4">Built with</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Vercel', 'PostgreSQL'].map((tech) => (
                  <span key={tech} className="text-[10px] text-[#8E8E93] px-2.5 py-1 rounded-full glass-dark">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[#8E8E93] text-xs">
              &copy; 2026 Praxis
            </p>
            <p className="text-[#8E8E93] text-xs">
              Built by{' '}
              <a href="https://kaizhiwu.com" className="hover:text-[#E8E8ED] transition-colors" target="_blank" rel="noopener noreferrer">
                Kai Wu
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* ── Contact Modal ── */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
