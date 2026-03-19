import { motion, useScroll, useTransform } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { useState, useEffect, useRef } from 'react'

export function DemoSection() {
  const [activeQuery, setActiveQuery] = useState(0)
  const queries = PITCH.demo.queries
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // 3D perspective transforms — phone starts tilted, rotates flat as user scrolls
  const rotateX = useTransform(scrollYProgress, [0, 0.4], [isMobile ? 12 : 20, 0])
  const scale = useTransform(scrollYProgress, [0, 0.4], [isMobile ? 0.85 : 0.9, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.4], [60, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 1])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuery((prev) => (prev + 1) % queries.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [queries.length])

  return (
    <section
      ref={containerRef}
      className="bg-[#FAFAFA] py-24 md:py-40 px-6 relative overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4F46E5]/[0.02] via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#1D1D1F]">{PITCH.demo.title}</h2>
          <p className="text-[#6E6E73] mt-4 max-w-xl mx-auto">{PITCH.demo.sub}</p>
        </motion.div>

        {/* 3D Container Scroll — phone rotates from tilted to flat */}
        <div style={{ perspective: '1200px' }}>
          <motion.div
            style={{
              rotateX,
              scale,
              translateY,
              opacity,
            }}
            className="flex justify-center"
          >
            {/* Phone frame */}
            <div className="relative">
              {/* Glow behind phone — softer on light */}
              <div
                className="absolute -inset-8 rounded-[3rem] blur-[60px] opacity-10"
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #E2614B, #D97706)',
                }}
              />

              {/* Phone body — stays dark */}
              <div
                className="relative w-[320px] md:w-[375px] h-[640px] md:h-[720px] rounded-[2.5rem] border-[3px] border-[#1D1D1F]/10 bg-[#1D1D1F] overflow-hidden"
                style={{
                  boxShadow:
                    '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)',
                }}
              >
                {/* Status bar */}
                <div className="h-11 bg-[#F8F7F4] flex items-center justify-between px-6">
                  <span className="text-[10px] text-[#6B7280] font-medium">9:41</span>
                  <div className="w-[80px] h-[24px] bg-black rounded-full mx-auto" />
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#6B7280">
                      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                    </svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#6B7280">
                      <rect x="2" y="6" width="18" height="12" rx="2" stroke="#6B7280" strokeWidth="2" fill="none" />
                      <rect x="4" y="8" width="12" height="8" rx="1" fill="#6B7280" />
                      <path d="M22 10v4" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* App content — iframe */}
                <iframe
                  src="/"
                  className="w-full border-0"
                  style={{ height: 'calc(100% - 44px)' }}
                  title="Praxis App Demo"
                />
              </div>

              {/* Reflection/shine */}
              <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Query chips cycling below */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {queries.map((q, i) => (
            <motion.button
              key={q.text}
              onClick={() => setActiveQuery(i)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 cursor-pointer ${
                i === activeQuery
                  ? 'bg-[#4F46E5]/10 border border-[#4F46E5]/25 text-[#4F46E5]'
                  : 'bg-white border border-[#E5E5EA] text-[#86868B] hover:text-[#6E6E73]'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              &ldquo;{q.text}&rdquo;
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
