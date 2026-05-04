import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Place, AttributeType } from '../data/types'

// Tiny per-question icon set — pairs a glyph with each prompt
const QUESTION_ICONS: Record<AttributeType, React.ReactNode> = {
  outlet_usability: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 8V2M15 8V2" /><path d="M18 8v4a6 6 0 0 1-12 0V8z" /><path d="M12 22v-5" />
    </svg>
  ),
  restroom_access: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    </svg>
  ),
  noise_level: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
    </svg>
  ),
  laptop_tolerance: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M2 20h20" />
    </svg>
  ),
  seating_reliability: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <rect x="4" y="11" width="16" height="6" rx="2" /><path d="M6 17v4M18 17v4" />
    </svg>
  ),
} as Partial<Record<AttributeType, React.ReactNode>> as Record<AttributeType, React.ReactNode>

const QUESTION_COLORS: Partial<Record<AttributeType, string>> = {
  outlet_usability: 'var(--color-accent-amber)',
  restroom_access: 'var(--color-accent-emerald)',
  noise_level: 'var(--color-accent-violet)',
  laptop_tolerance: 'var(--color-accent-cobalt)',
  seating_reliability: 'var(--color-accent-coral)',
}

interface ContributeSheetProps {
  place: Place
  isOpen: boolean
  onClose: () => void
}

type Answer = 'yes' | 'no' | 'unsure' | null

const QUESTIONS: { type: AttributeType; question: string }[] = [
  { type: 'outlet_usability', question: 'Outlets working?' },
  { type: 'restroom_access', question: 'Restroom accessible?' },
  { type: 'noise_level', question: 'Quiet right now?' },
  { type: 'laptop_tolerance', question: 'Laptop-friendly?' },
  { type: 'seating_reliability', question: 'Seats available?' },
]

const CONFETTI_COLORS = [
  'bg-accent',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-purple-400',
  'bg-sky-400',
  'bg-teal-400',
  'bg-fuchsia-400',
  'bg-blue-400',
]

function ConfettiDot({ delay, angle, colorIndex }: { delay: number; angle: number; colorIndex: number }) {
  const rad = (angle * Math.PI) / 180
  const dist = 28 + Math.random() * 12
  return (
    <motion.div
      className={`absolute w-1.5 h-1.5 rounded-full ${CONFETTI_COLORS[colorIndex % CONFETTI_COLORS.length]}`}
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{
        opacity: 0,
        x: Math.cos(rad) * dist,
        y: Math.sin(rad) * dist,
        scale: 0.3,
      }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    />
  )
}

export function ContributeSheet({ place, isOpen, onClose }: ContributeSheetProps) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [submitted, setSubmitted] = useState(false)

  const relevantQuestions = QUESTIONS.filter(q =>
    place.attributes.some(a => a.type === q.type)
  ).slice(0, 4)

  function handleAnswer(type: string, answer: Answer) {
    setAnswers(prev => ({ ...prev, [type]: answer }))
  }

  function handleSubmit() {
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setAnswers({})
      onClose()
    }, 1200)
  }

  const hasAnswers = Object.values(answers).some(a => a !== null)

  function getButtonClasses(type: string, opt: 'yes' | 'no' | 'unsure') {
    const isSelected = answers[type] === opt
    const base = 'min-h-[40px] px-4 rounded-full text-xs font-medium transition-colors cursor-pointer'

    if (!isSelected) {
      return `${base} bg-[var(--color-bone-warm)] border border-[var(--color-border)] text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] hover:border-[var(--color-ink-faint)]`
    }

    switch (opt) {
      case 'yes':
        return `${base} bg-emerald-500/15 text-emerald-700 border border-emerald-400/30 backdrop-blur-sm`
      case 'no':
        return `${base} bg-red-500/15 text-red-600 border border-red-400/30 backdrop-blur-sm`
      case 'unsure':
        return `${base} bg-[rgba(0,0,0,0.06)] text-[var(--color-ink-secondary)] border border-[var(--color-border)] backdrop-blur-sm`
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bone)]/95 border-t border-[var(--color-border)] backdrop-blur-md rounded-t-[28px] p-6 max-w-lg mx-auto safe-bottom overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 350 }}
          >
            {/* Glass handle bar */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-9 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))' }} />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="thanks"
                  className="flex flex-col items-center justify-center py-8 gap-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Radial gradient glow behind checkmark */}
                    <motion.div
                      className="absolute w-24 h-24 rounded-full pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.04) 50%, transparent 70%)',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="glass w-16 h-16 rounded-full flex items-center justify-center relative border border-[var(--color-border)]"
                      initial={{ scale: 0.4 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 10, stiffness: 300 }}
                    >
                      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    {/* Confetti burst */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ConfettiDot delay={0} angle={30} colorIndex={0} />
                      <ConfettiDot delay={0.03} angle={75} colorIndex={1} />
                      <ConfettiDot delay={0.05} angle={120} colorIndex={2} />
                      <ConfettiDot delay={0.07} angle={165} colorIndex={3} />
                      <ConfettiDot delay={0.04} angle={210} colorIndex={4} />
                      <ConfettiDot delay={0.06} angle={255} colorIndex={5} />
                      <ConfettiDot delay={0.08} angle={300} colorIndex={6} />
                      <ConfettiDot delay={0.02} angle={345} colorIndex={7} />
                    </div>
                  </div>
                  <p className="text-[var(--color-ink)] font-medium">Thanks for contributing</p>
                  <p className="text-[var(--color-ink-secondary)] text-sm">Your data makes Praxis better</p>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-5 mt-2">
                  <div>
                    <h3 className="text-[var(--color-ink)] font-semibold text-xl">
                      Been to {place.name}?
                    </h3>
                    <p className="text-[var(--color-ink-tertiary)] text-sm mt-1">Quick confirmations help everyone</p>
                  </div>

                  <div className="space-y-2.5">
                    {relevantQuestions.map((q, i) => {
                      const icon = QUESTION_ICONS[q.type]
                      const color = QUESTION_COLORS[q.type] ?? 'var(--color-ink-tertiary)'
                      return (
                        <motion.div
                          key={q.type}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.05, ease: 'easeOut' }}
                          className="flex items-center justify-between gap-3 bg-[var(--color-bone-warm)] border border-[var(--color-border)] rounded-xl px-4 py-3"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg"
                              style={{ background: `${color}1A`, color }}
                            >
                              {icon}
                            </span>
                            <span className="text-[var(--color-ink)] text-sm">{q.question}</span>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            {(['yes', 'no', 'unsure'] as const).map(opt => (
                              <button
                                key={opt}
                                onClick={() => handleAnswer(q.type, opt)}
                                className={getButtonClasses(q.type, opt)}
                              >
                                {opt === 'unsure' ? 'Not sure' : opt.charAt(0).toUpperCase() + opt.slice(1)}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!hasAnswers}
                    className="w-full py-3.5 rounded-2xl font-medium text-sm transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-white shadow-[0_0_16px_-4px_rgba(37,99,235,0.25)]"
                    style={{ background: hasAnswers ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : '#2563EB' }}
                  >
                    Submit
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
