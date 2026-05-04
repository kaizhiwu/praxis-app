import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { useState, useEffect } from 'react'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

export function DemoSection() {
  const [activeQuery, setActiveQuery] = useState(0)
  const queries = PITCH.demo.queries

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuery((prev) => (prev + 1) % queries.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [queries.length])

  return (
    <section id="demo" className="bg-[var(--color-bone)] px-6 lg:px-10 py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="section-rule mb-6" />
        <motion.p {...fade} className="mono-label mb-10">The demo</motion.p>

        <motion.h2
          {...fade}
          className="font-semibold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)] max-w-2xl mb-16"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {PITCH.demo.title}
        </motion.h2>

        {/* Phone frame — simple, static */}
        <motion.div {...fade} transition={{ ...fade.transition, delay: 0.1 }} className="flex justify-center">
          <div
            className="w-[320px] md:w-[360px] h-[680px] md:h-[760px] rounded-[2.25rem] border border-[var(--color-border)] bg-[var(--color-ink)] overflow-hidden p-2"
            style={{ boxShadow: '0 16px 48px rgba(0,0,0,0.14)' }}
          >
            <div className="w-full h-full rounded-[1.65rem] bg-[var(--color-bone)] overflow-hidden flex flex-col">
              {/* Minimal status bar */}
              <div className="h-9 shrink-0 flex items-center justify-center">
                <span
                  className="text-[10px] text-[var(--color-ink-tertiary)] tabular-nums"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  9:41
                </span>
              </div>
              <iframe
                src="/app"
                className="w-full flex-1 border-0"
                title="Praxis App Demo"
              />
            </div>
          </div>
        </motion.div>

        {/* Query chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {queries.map((q, i) => (
            <motion.button
              key={q.text}
              onClick={() => setActiveQuery(i)}
              {...fade}
              transition={{ ...fade.transition, delay: 0.2 + i * 0.04 }}
              className="px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer"
              style={{
                background: i === activeQuery ? 'var(--color-bone-warm)' : 'transparent',
                border: `1px solid ${i === activeQuery ? 'var(--color-ink-tertiary)' : 'var(--color-border)'}`,
                color: i === activeQuery ? 'var(--color-ink)' : 'var(--color-ink-secondary)',
              }}
            >
              &ldquo;{q.text}&rdquo;
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
