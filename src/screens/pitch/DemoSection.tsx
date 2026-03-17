import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { useState, useEffect } from 'react'

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
    <section className="bg-[#09090B] py-32 px-6 relative overflow-hidden">
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
          <h2 className="text-4xl font-bold text-white">{PITCH.demo.title}</h2>
          <p className="text-[#9CA3AF] mt-4 max-w-xl mx-auto">{PITCH.demo.sub}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center"
        >
          {/* Phone frame */}
          <div className="relative">
            {/* Glow behind phone */}
            <div
              className="absolute -inset-8 rounded-[3rem] blur-[60px] opacity-20"
              style={{
                background: 'linear-gradient(135deg, #4F46E5, #E2614B, #D97706)',
              }}
            />

            {/* Phone body */}
            <div className="relative w-[320px] md:w-[375px] h-[640px] md:h-[720px] rounded-[2.5rem] border-[3px] border-white/[0.08] bg-[#141416] overflow-hidden shadow-2xl">
              {/* Status bar */}
              <div className="h-11 bg-[#F8F7F4] flex items-center justify-between px-6">
                <span className="text-[10px] text-[#6B7280] font-medium">9:41</span>
                <div className="w-[80px] h-[24px] bg-black rounded-full mx-auto" />
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#6B7280"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#6B7280"><rect x="2" y="6" width="18" height="12" rx="2" stroke="#6B7280" strokeWidth="2" fill="none"/><rect x="4" y="8" width="12" height="8" rx="1" fill="#6B7280"/><path d="M22 10v4" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </div>

              {/* App content — iframe pointing to / */}
              <iframe
                src="/"
                className="w-full border-0"
                style={{ height: 'calc(100% - 44px)' }}
                title="Praxis App Demo"
              />
            </div>

            {/* Reflection/shine */}
            <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Query chips cycling below */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          {queries.map((q, i) => (
            <motion.button
              key={q.text}
              onClick={() => setActiveQuery(i)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 cursor-pointer ${
                i === activeQuery
                  ? 'bg-[#4F46E5]/15 border border-[#4F46E5]/30 text-white'
                  : 'bg-[#141416] border border-white/[0.06] text-[#6B7280] hover:text-[#9CA3AF]'
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
