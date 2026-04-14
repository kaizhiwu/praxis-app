import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { GraphMockup, TruthMockup, IntentMockup, AnswerMockup } from '../../components/ProductGraphics'

function useIsMdUp() {
  const [isMdUp, setIsMdUp] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 768px)').matches
      : true
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMdUp(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isMdUp
}

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } as const,
}

const layerGraphics = [<GraphMockup />, <TruthMockup />, <IntentMockup />, <AnswerMockup />]

function LayerPanel({
  index,
  total,
  scrollYProgress,
  label,
  title,
  description,
  detail,
  graphic,
}: {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  label: string
  title: string
  description: string
  detail: string
  graphic: React.ReactNode
}) {
  const step = 1 / total
  const start = index * step
  const end = start + step
  const fadeWindow = step * 0.22

  const isFirst = index === 0
  const isLast = index === total - 1

  // Function-form useTransform: computed per-frame in JS, never touches WAAPI
  // keyframe binding — so duplicate values and edge clamps are safe.
  const opacity = useTransform(scrollYProgress, (v) => {
    if (v < start) return isFirst ? 1 : 0
    if (v < start + fadeWindow) return isFirst ? 1 : (v - start) / fadeWindow
    if (v < end - fadeWindow) return 1
    if (v < end) return isLast ? 1 : 1 - (v - (end - fadeWindow)) / fadeWindow
    return isLast ? 1 : 0
  })

  const y = useTransform(scrollYProgress, (v) => {
    if (v < start) return isFirst ? 0 : 24
    if (v < start + fadeWindow) return isFirst ? 0 : 24 * (1 - (v - start) / fadeWindow)
    if (v < end - fadeWindow) return 0
    if (v < end) return isLast ? 0 : -24 * ((v - (end - fadeWindow)) / fadeWindow)
    return isLast ? 0 : -24
  })

  return (
    <motion.div
      className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
      style={{ opacity, y }}
    >
      {/* Text column */}
      <div>
        <p className="mono-label mb-4 !text-[var(--color-accent-indigo)]">{label}</p>
        <h3
          className="font-semibold text-2xl md:text-4xl text-[var(--color-ink)] leading-[1.12] tracking-[-0.01em]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h3>
        <p className="text-[var(--color-ink-secondary)] mt-5 leading-relaxed max-w-md">
          {description}
        </p>
        <p className="text-sm text-[var(--color-ink-tertiary)] mt-4 italic">{detail}</p>
      </div>

      {/* Graphic column */}
      <div className="w-full">{graphic}</div>
    </motion.div>
  )
}

function MobileLayerBlock({
  label,
  title,
  description,
  detail,
  graphic,
}: {
  label: string
  title: string
  description: string
  detail: string
  graphic: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="space-y-4"
    >
      <p className="mono-label !text-[var(--color-accent-indigo)]">{label}</p>
      <h3
        className="font-semibold text-2xl leading-[1.15] tracking-[-0.01em] text-[var(--color-ink)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h3>
      <p className="text-[var(--color-ink-secondary)] leading-relaxed">{description}</p>
      <p className="text-sm text-[var(--color-ink-tertiary)] italic">{detail}</p>
      <div className="pt-3">{graphic}</div>
    </motion.div>
  )
}

function ProgressDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const step = 1 / total
  const start = index * step
  const end = start + step
  const isLast = index === total - 1

  // Function-form transforms — binary active/inactive, computed per-frame.
  const isActive = (v: number) => v >= start && (isLast ? v <= end : v < end)
  const opacity = useTransform(scrollYProgress, (v) => (isActive(v) ? 1 : 0.25))
  const scale = useTransform(scrollYProgress, (v) => (isActive(v) ? 1.35 : 1))
  const labelOpacity = useTransform(scrollYProgress, (v) => (isActive(v) ? 1 : 0.4))

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="w-2 h-2 rounded-full bg-[var(--color-accent-indigo)]"
        style={{ opacity, scale }}
      />
      <motion.span
        className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-tertiary)]"
        style={{ opacity: labelOpacity }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>
    </div>
  )
}

export function ProductSection() {
  const layers = PITCH.product.layers
  const total = layers.length
  const labels = layers.map((_, i) => `Layer ${String(i + 1).padStart(2, '0')}`)
  const isMdUp = useIsMdUp()

  const pinRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="product" className="bg-[var(--color-bone)]">
      {/* Intro header (normal flow) */}
      <div className="px-6 lg:px-10 pt-20 max-w-[1200px] mx-auto">
        <div className="section-rule mb-6" />
        <motion.p {...fade} className="mono-label mb-10">
          The product
        </motion.p>
        <motion.h2
          {...fade}
          className="font-semibold text-3xl md:text-5xl tracking-[-0.02em] leading-[1.1] text-[var(--color-ink)] max-w-2xl mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {PITCH.product.title}
        </motion.h2>
        <motion.p
          {...fade}
          transition={{ ...fade.transition, delay: 0.06 }}
          className="text-base text-[var(--color-ink-secondary)] max-w-xl leading-relaxed"
        >
          {PITCH.product.sub}
        </motion.p>
      </div>

      {/* Desktop: pinned layer walkthrough. Mobile: sequential stack. */}
      {isMdUp ? (
        <div
          ref={pinRef}
          className="relative mt-20"
          style={{ minHeight: `${(total + 1) * 100}vh` }}
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
            <div className="w-full max-w-[1200px] mx-auto px-6 lg:px-10">
              <div className="flex items-center gap-8 md:gap-14">
                {/* Progress rail */}
                <div className="hidden md:flex flex-col gap-5 shrink-0 w-10">
                  {layers.map((_, i) => (
                    <ProgressDot
                      key={i}
                      index={i}
                      total={total}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>

                {/* Stacked layer panels */}
                <div className="relative flex-1 min-h-[70vh]">
                  {layers.map((layer, i) => (
                    <LayerPanel
                      key={layer.name}
                      index={i}
                      total={total}
                      scrollYProgress={scrollYProgress}
                      label={labels[i]}
                      title={layer.name}
                      description={layer.description}
                      detail={layer.detail}
                      graphic={layerGraphics[i]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-14 px-6 max-w-[1200px] mx-auto space-y-16">
          {layers.map((layer, i) => (
            <MobileLayerBlock
              key={layer.name}
              label={labels[i]}
              title={layer.name}
              description={layer.description}
              detail={layer.detail}
              graphic={layerGraphics[i]}
            />
          ))}
        </div>
      )}

      {/* Bottom callout (normal flow) */}
      <div className="px-6 lg:px-10 pb-20 max-w-[1200px] mx-auto">
        <motion.div
          {...fade}
          transition={{ ...fade.transition, delay: 0.2 }}
          className="border-l-2 border-[var(--color-accent-indigo)] pl-6"
        >
          <p className="text-[var(--color-ink)] font-medium">Answers, not listings.</p>
        </motion.div>
      </div>
    </section>
  )
}
