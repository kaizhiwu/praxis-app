import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { useEffect, useRef } from 'react'

const colors = ['#4F46E5', '#E2614B', '#D97706', '#818CF8']

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
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-16"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #ffffff 30%, rgba(255,255,255,0.5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
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
              className="relative group rounded-2xl p-6 overflow-hidden"
              style={{
                background: '#141416',
                border: `1px solid ${colors[i]}20`,
                boxShadow: `inset 0 -20px 60px -20px ${colors[i]}08, inset 0 1px 0 rgba(255,255,255,0.04)`,
              }}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${colors[i]}, transparent)` }}
              />
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${colors[i]}15, transparent 60%)` }}
              />

              <div className="relative z-10">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
