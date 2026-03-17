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

function ConfettiDot({ delay, angle }: { delay: number; angle: number }) {
  const rad = (angle * Math.PI) / 180
  const dist = 28 + Math.random() * 12
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-accent"
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
      return `${base} bg-transparent border border-surface-border text-text-tertiary hover:text-text-secondary`
    }

    switch (opt) {
      case 'yes':
        return `${base} bg-accent/20 text-accent border border-accent/30`
      case 'no':
        return `${base} bg-negative-dim text-negative border border-negative/20`
      case 'unsure':
        return `${base} bg-surface-hover text-text-secondary border border-surface-border`
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-surface-border/40 rounded-t-[28px] p-6 max-w-lg mx-auto safe-bottom"
            style={{ backdropFilter: 'blur(32px) saturate(1.4)', WebkitBackdropFilter: 'blur(32px) saturate(1.4)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 350 }}
          >
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
                    <motion.div
                      className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center"
                      initial={{ scale: 0.4 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 10, stiffness: 300 }}
                    >
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    {/* Confetti burst */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ConfettiDot delay={0} angle={45} />
                      <ConfettiDot delay={0.05} angle={135} />
                      <ConfettiDot delay={0.1} angle={225} />
                      <ConfettiDot delay={0.07} angle={315} />
                    </div>
                  </div>
                  <p className="text-text-primary font-medium">Thanks for contributing</p>
                  <p className="text-text-secondary text-sm">Your data makes Praxis better</p>
                </motion.div>
              ) : (
                <motion.div key="form" className="space-y-5">
                  <div>
                    <h3 className="text-text-primary font-semibold text-xl">
                      Been to {place.name}?
                    </h3>
                    <p className="text-text-tertiary text-sm mt-1">Quick confirmations help everyone</p>
                  </div>

                  <div className="space-y-2.5">
                    {relevantQuestions.map(q => (
                      <div key={q.type} className="flex items-center justify-between bg-surface/40 rounded-xl px-4 py-3">
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
                    className="w-full py-3.5 rounded-2xl font-medium text-sm transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed bg-accent text-bg-primary hover:bg-accent/90 shadow-[0_0_20px_-4px_rgba(91,154,154,0.3)]"
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
