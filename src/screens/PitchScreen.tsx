import { useState, useEffect, useMemo } from 'react'
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

// Nav chips — each maps to a section + its accent color
const NAV_CHIPS = [
  { id: 'problem',  label: 'Problem',  fg: 'var(--deep-orange)',  bg: 'var(--chip-orange)' },
  { id: 'product',  label: 'Product',  fg: 'var(--deep-cobalt)',  bg: 'var(--chip-cobalt)' },
  { id: 'flywheel', label: 'Flywheel', fg: 'var(--deep-emerald)', bg: 'var(--chip-emerald)' },
  { id: 'moat',     label: 'Moat',     fg: 'var(--deep-cobalt)',  bg: 'var(--chip-cobalt)' },
  { id: 'proof',    label: 'Proof',    fg: 'var(--deep-amber)',   bg: 'var(--chip-amber)' },
] as const

export function PitchScreen() {
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
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

  // Section-spy: detect the section currently centered in viewport
  useEffect(() => {
    const ids = NAV_CHIPS.map((c) => c.id)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.3, 0.5] }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const activeChip = useMemo(
    () => NAV_CHIPS.find((c) => c.id === activeId),
    [activeId]
  )

  const openContact = () => setContactOpen(true)

  return (
    <div className="bg-[var(--color-bone)] text-[var(--color-ink)] min-h-screen">
      {/* Floating pill nav — section-aware. Active section's chip lights
          up in its accent color; the rest of the nav stays neutral. */}
      <nav className="fixed top-3 lg:top-5 left-0 right-0 z-50 px-3 sm:px-6 flex justify-center pointer-events-none">
        <div
          className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 rounded-full pl-2 pr-2 py-1.5 transition-all duration-300"
          style={{
            background: scrolled
              ? 'rgba(248, 247, 244, 0.85)'
              : 'rgba(248, 247, 244, 0.6)',
            border: '1px solid var(--color-border)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: scrolled
              ? '0 4px 24px -8px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.04)'
              : '0 1px 2px rgba(0,0,0,0.03)',
          }}
        >
          {/* Logo chip — pulsing dot in active section's color */}
          <a
            href="#"
            className="flex items-center gap-2 pl-3 pr-3.5 py-1.5 rounded-full hover:bg-[var(--color-bone)]/40 transition-colors"
            aria-label="Praxis home"
          >
            <span
              className="relative inline-flex w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{
                background: activeChip?.fg ?? 'var(--color-accent-cobalt)',
              }}
            >
              <span
                className="absolute inline-flex w-full h-full rounded-full animate-ping opacity-50"
                style={{ background: activeChip?.fg ?? 'var(--color-accent-cobalt)' }}
              />
            </span>
            <span
              className="text-[14px] font-semibold tracking-[-0.02em] text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Praxis
            </span>
          </a>

          {/* Section chips — each lights up in its accent when active */}
          <div className="hidden md:flex items-center gap-0.5 px-1">
            {NAV_CHIPS.map((chip) => {
              const isActive = chip.id === activeId
              return (
                <a
                  key={chip.id}
                  href={`#${chip.id}`}
                  className="relative px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-all duration-200"
                  style={{
                    color: isActive ? chip.fg : 'var(--color-ink-tertiary)',
                    background: isActive ? chip.bg : 'transparent',
                  }}
                >
                  {chip.label}
                </a>
              )
            })}
          </div>

          {/* Right cluster — try + contact */}
          <div className="flex items-center gap-1 pl-1">
            <a
              href="/app"
              className="hidden sm:inline-flex text-[12.5px] font-medium text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors px-3 py-1.5 rounded-full hover:bg-[var(--color-bone)]/40"
            >
              Try
            </a>
            <button
              onClick={openContact}
              className="text-[12.5px] font-semibold text-white rounded-full px-4 py-1.5 transition-all hover:opacity-90 cursor-pointer"
              style={{ background: 'var(--color-ink)' }}
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
