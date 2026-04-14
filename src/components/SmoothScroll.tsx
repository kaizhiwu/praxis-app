import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Mounts Lenis on the root <html> element for inertial smooth scrolling.
 * Adds the `lenis` class to <html> so Tailwind / CSS can respond if needed.
 *
 * IntersectionObserver-based animations (Framer Motion whileInView, etc.)
 * continue to work — Lenis dispatches native scroll events.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
