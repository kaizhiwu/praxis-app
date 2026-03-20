import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { useEffect, useRef } from 'react'

function AnimatedValue({ value }: { value: string }) {
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
      type: 'spring',
      stiffness: 50,
      damping: 15,
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

export function BuildVelocitySection() {
  return (
    <section className="py-32 px-6 bg-[#F5F5F7]">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-16 text-[#1D1D1F]"
        >
          {PITCH.buildVelocity.title}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PITCH.buildVelocity.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 bg-white border border-[#E5E5EA]"
            >
              <p className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F]">
                <AnimatedValue value={metric.value} />
              </p>
              <p className="text-[#1D1D1F] font-medium mt-3 text-sm">
                {metric.label}
              </p>
              <p className="text-[#86868B] text-xs mt-1.5 leading-relaxed">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
