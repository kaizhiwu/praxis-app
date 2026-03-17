import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { useEffect, useRef } from 'react'

const colors = ['#4F46E5', '#E2614B', '#D97706', '#818CF8']

function AnimatedValue({ value }: { value: string }) {
  // For numeric values, animate the number
  const numMatch = value.match(/^([<>]?\s*)(\d+)(\+?)$/)
  if (!numMatch) {
    return <span>{value}</span>
  }

  const prefix = numMatch[1]
  const num = parseInt(numMatch[2])
  const suffix = numMatch[3]
  const motionVal = useMotionValue(0)
  const rounded = useTransform(motionVal, (v) => Math.round(v))
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const controls = animate(motionVal, num, {
      duration: 1.5,
      ease: 'easeOut',
    })
    const unsub = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${v}${suffix}`
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [motionVal, rounded, num, prefix, suffix])

  return <span ref={ref}>{prefix}0{suffix}</span>
}

export function TractionSection() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-16"
        >
          {PITCH.traction.title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PITCH.traction.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Top accent line */}
              <div
                className="h-[2px] w-12 rounded-full mb-6"
                style={{ backgroundColor: colors[i] }}
              />

              <p
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ color: colors[i] }}
              >
                <AnimatedValue value={metric.value} />
              </p>

              <p className="text-white font-medium mt-3 text-sm">
                {metric.label}
              </p>

              <p className="text-[#6B7280] text-xs mt-1.5 leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
