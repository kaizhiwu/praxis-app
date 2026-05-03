import { useState, useEffect } from 'react'
import { HeroSection } from './pitch/HeroSection'
import { ScrollStorySection } from './pitch/ScrollStorySection'
import { ProblemSection } from './pitch/ProblemSection'
import { UseCaseSection } from './pitch/UseCaseSection'
import { DemoSection } from './pitch/DemoSection'
import { ProductSection } from './pitch/ProductSection'
import { FlywheelSection } from './pitch/FlywheelSection'
import { MoatSection } from './pitch/MoatSection'
import { HowIBuildSection } from './pitch/HowIBuildSection'
import { ProofBandSection } from './pitch/ProofBandSection'
import { CTASection } from './pitch/CTASection'
import { ContactModal } from '../components/ContactModal'
import { PITCH } from '../data/pitch'

export function PitchScreen() {
  const [scrolled, setScrolled] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => window.scrollTo(0, 0))
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
    <div className="bg-[var(--color-bone)] text-[var(--color-ink)] min-h-screen">
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center transition-all duration-200"
        style={{
          background: scrolled ? 'rgba(247,246,243,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-10 flex items-center justify-between">
          <span
            className="text-[var(--color-ink)] text-[17px] font-medium tracking-[-0.02em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Praxis
          </span>

          <div className="hidden md:flex items-center gap-6">
            <a href="#problem" className="text-[13px] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors">Problem</a>
            <a href="#demo" className="text-[13px] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors">Demo</a>
            <a href="#flywheel" className="text-[13px] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors">Flywheel</a>
          </div>

          <div className="flex items-center gap-3">
            <a href="/app" className="hidden sm:inline-flex text-[13px] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors items-center gap-1">
              Try the product
            </a>
            <button
              onClick={openContact}
              className="text-[13px] font-medium text-[var(--color-ink)] border border-[var(--color-border)] rounded-full px-5 py-1.5 hover:bg-[var(--color-bone-warm)] transition-colors cursor-pointer"
            >
              Get in touch
            </button>
          </div>
        </div>
      </nav>

      {/* Sections — Clearstreet narrative arc:
          hero → industry context (scroll story) → problem → product →
          why durable (flywheel + moat) → use cases → proof → close. */}
      <HeroSection onContact={openContact} />
      <ScrollStorySection />
      <ProblemSection />
      <ProductSection />
      <DemoSection />
      <FlywheelSection />
      <MoatSection />
      <UseCaseSection />
      <ProofBandSection />
      <HowIBuildSection />
      <CTASection onContact={openContact} />

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-bone)]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <span
                className="text-[17px] font-medium tracking-[-0.02em] text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Praxis
              </span>
              <p className="text-xs text-[var(--color-ink-tertiary)] leading-relaxed mt-3 max-w-[200px]">
                Behavioral place intelligence. Ground truth about how places actually function.
              </p>
            </div>

            {/* Product */}
            <div>
              <p className="mono-label mb-4">Product</p>
              <ul className="space-y-2.5">
                <li><a href="/app" className="text-sm text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors">Try Praxis</a></li>
                <li><a href="#demo" className="text-sm text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors">See the demo</a></li>
                <li><a href="#product" className="text-sm text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors">How it works</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <p className="mono-label mb-4">Company</p>
              <ul className="space-y-2.5">
                <li><a href={`mailto:${PITCH.cta.email}`} className="text-sm text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors">Email</a></li>
                <li><a href={PITCH.cta.twitter} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors">X / Twitter</a></li>
                <li><a href={PITCH.cta.substack} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-ink-tertiary)] hover:text-[var(--color-ink)] transition-colors">Substack</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[var(--color-ink-tertiary)] text-xs">&copy; 2026 Praxis</p>
            <p className="text-[var(--color-ink-tertiary)] text-xs">
              Built by{' '}
              <a href="https://kaizhiwu.com" className="hover:text-[var(--color-ink)] transition-colors" target="_blank" rel="noopener noreferrer">
                Kai Wu
              </a>
            </p>
          </div>
        </div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  )
}
