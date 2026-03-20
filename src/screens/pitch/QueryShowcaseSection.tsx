import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  laptop: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M2 20h20" />
    </svg>
  ),
  camera: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  heart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
  user: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  accessible: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="1.5" />
      <path d="M7 21l3-7h4l3 7M9 14l-2-4h10l-2 4" />
    </svg>
  ),
  sparkle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
    </svg>
  ),
  utensils: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2M7 2v20M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  laptop:     { bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.2)',   text: '#4F46E5', glow: 'rgba(99,102,241,0.15)' },
  camera:     { bg: 'rgba(236,72,153,0.08)',   border: 'rgba(236,72,153,0.2)',   text: '#DB2777', glow: 'rgba(236,72,153,0.15)' },
  heart:      { bg: 'rgba(244,63,94,0.08)',    border: 'rgba(244,63,94,0.2)',    text: '#E11D48', glow: 'rgba(244,63,94,0.15)' },
  user:       { bg: 'rgba(139,92,246,0.08)',   border: 'rgba(139,92,246,0.2)',   text: '#7C3AED', glow: 'rgba(139,92,246,0.15)' },
  accessible: { bg: 'rgba(6,182,212,0.08)',    border: 'rgba(6,182,212,0.2)',    text: '#0891B2', glow: 'rgba(6,182,212,0.15)' },
  sparkle:    { bg: 'rgba(217,119,6,0.08)',    border: 'rgba(217,119,6,0.2)',    text: '#D97706', glow: 'rgba(217,119,6,0.15)' },
  utensils:   { bg: 'rgba(239,68,68,0.08)',    border: 'rgba(239,68,68,0.2)',    text: '#DC2626', glow: 'rgba(239,68,68,0.15)' },
  clock:      { bg: 'rgba(16,185,129,0.08)',   border: 'rgba(16,185,129,0.2)',   text: '#059669', glow: 'rgba(16,185,129,0.15)' },
}

export function QueryShowcaseSection() {
  const { categories } = PITCH.queryShowcase
  const [activeCategory, setActiveCategory] = useState(0)
  const active = categories[activeCategory]
  const colors = CATEGORY_COLORS[active.icon] || CATEGORY_COLORS.laptop

  return (
    <section className="bg-[#F5F5F7] py-24 md:py-40 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F]">
            {PITCH.queryShowcase.title}
          </h2>
          <p className="text-[#6E6E73] mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {PITCH.queryShowcase.sub}
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, i) => {
            const catColors = CATEGORY_COLORS[cat.icon] || CATEGORY_COLORS.laptop
            const isActive = i === activeCategory
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer"
                style={{
                  background: isActive ? catColors.bg : 'white',
                  border: `1px solid ${isActive ? catColors.border : '#E5E5EA'}`,
                  color: isActive ? catColors.text : '#86868B',
                }}
              >
                <span style={{ color: isActive ? catColors.text : '#86868B' }}>
                  {CATEGORY_ICONS[cat.icon]}
                </span>
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* Query list for active category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="space-y-3">
              {active.queries.map((query, i) => (
                <motion.div
                  key={query}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="group flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-200 bg-white border border-[#E5E5EA]"
                  style={{
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                >
                  {/* Search icon */}
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke={colors.text} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    className="shrink-0 opacity-40 group-hover:opacity-70 transition-opacity"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span className="text-sm text-[#1D1D1F]/70 group-hover:text-[#1D1D1F] transition-colors">
                    {query}
                  </span>
                  {/* "no results on Maps" indicator */}
                  <span className="ml-auto text-[10px] text-[#AEAEB2] group-hover:text-[#86868B] transition-colors shrink-0 hidden sm:block">
                    0 results on Maps
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Bottom note */}
            <p className="text-center mt-8 text-xs text-[#86868B]">
              {categories.length} categories &middot; {categories.reduce((sum, c) => sum + c.queries.length, 0)} example queries &middot; all unanswerable by current maps
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
