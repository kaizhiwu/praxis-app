import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Place, AttributeType } from '../data/types'

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
      return `${base} glass-subtle border border-surface-border text-text-secondary hover:text-text-primary hover:border-surface-border-hover`
    }

    switch (opt) {
      case 'yes':
        return `${base} bg-emerald-500/15 text-emerald-700 border border-emerald-400/30 backdrop-blur-sm`
      case 'no':
        return `${base} bg-red-500/15 text-red-600 border border-red-400/30 backdrop-blur-sm`
      case 'unsure':
        return `${base} bg-[rgba(0,0,0,0.06)] text-text-secondary border border-surface-border backdrop-blur-sm`
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
            className="fixed bottom-0 left-0 right-0 z-50 glass-elevated border-t border-surface-border rounded-t-[28px] p-6 max-w-lg mx-auto safe-bottom overflow-hidden"
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
                        background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, rgba(79,70,229,0.04) 50%, transparent 70%)',
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="glass w-16 h-16 rounded-full flex items-center justify-center relative border border-surface-border"
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
                  <p className="text-text-primary font-medium">Thanks for contributing</p>
                  <p className="text-text-secondary text-sm">Your data makes Praxis better</p>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-5 mt-2">
                  <div>
                    <h3 className="text-text-primary font-semibold text-xl">
                      Been to {place.name}?
                    </h3>
                    <p className="text-text-tertiary text-sm mt-1">Quick confirmations help everyone</p>
                  </div>

                  <div className="space-y-2.5">
                    {relevantQuestions.map(q => (
                      <div key={q.type} className="flex items-center justify-between glass-subtle rounded-xl px-4 py-3 border border-surface-border">
                        <span className="text-text-primary text-sm">{q.question}</span>
                        <div className="flex gap-1.5">
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
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!hasAnswers}
                    className="w-full py-3.5 rounded-2xl font-medium text-sm transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed text-white shadow-[0_0_16px_-4px_rgba(79,70,229,0.25)]"
                    style={{ background: hasAnswers ? 'linear-gradient(135deg, #4F46E5, #7C3AED)' : '#4F46E5' }}
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
