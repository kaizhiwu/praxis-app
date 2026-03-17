import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

const { businessModel } = PITCH
const { stages, unitEconomics } = businessModel

const stageColors = ['#4F46E5', '#7C4DE0', '#B84A96', '#E2614B', '#D97706']

const metrics = [
  { label: 'CAC', value: unitEconomics.cac, note: unitEconomics.cacNote, color: '#4F46E5' },
  { label: 'LTV', value: unitEconomics.ltv, note: unitEconomics.ltvNote, color: '#E2614B' },
  { label: 'LTV / CAC', value: unitEconomics.ratio, note: unitEconomics.ratioNote, color: '#D97706' },
  { label: 'Payback', value: unitEconomics.payback, note: unitEconomics.paybackNote, color: 'white' },
] as const

export function BusinessSection() {
  return (
    <section className="bg-[#09090B] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-white mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          {businessModel.title}
        </motion.h2>

        {/* ── Desktop horizontal timeline ── */}
        <div className="hidden md:block mb-24">
          {/* Timeline line */}
          <div className="relative mx-auto" style={{ maxWidth: '100%' }}>
            <motion.div
              className="h-px w-full rounded-full"
              style={{
                background: 'linear-gradient(to right, #4F46E5, #E2614B, #D97706)',
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              {...{ style: { ...{ transformOrigin: 'left', background: 'linear-gradient(to right, #4F46E5, #E2614B, #D97706)' } } }}
            />

            {/* Nodes */}
            <div className="flex justify-between -mt-1.5">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.phase}
                  className="flex flex-col items-center text-center"
                  style={{ width: `${100 / stages.length}%` }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                >
                  {/* Dot */}
                  <div
                    className="h-3 w-3 rounded-full ring-4 ring-[#09090B]"
                    style={{ backgroundColor: stageColors[i] }}
                  />

                  {/* Phase */}
                  <p className="text-xs text-[#6B7280] mt-3">{stage.phase}</p>

                  {/* Name */}
                  <p className="text-sm font-medium text-white mt-1">{stage.name}</p>

                  {/* Revenue pill */}
                  <span
                    className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${stageColors[i]}18`,
                      color: stageColors[i],
                      border: `1px solid ${stageColors[i]}30`,
                    }}
                  >
                    {stage.revenue}
                  </span>

                  {/* Timeline */}
                  <p className="text-xs text-[#6B7280] mt-2">{stage.timeline}</p>

                  {/* Description */}
                  <p className="text-xs text-[#9CA3AF] mt-1 max-w-[160px]">{stage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile vertical timeline ── */}
        <div className="md:hidden mb-24">
          <div className="relative pl-8">
            {/* Vertical line */}
            <motion.div
              className="absolute left-[5px] top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(to bottom, #4F46E5, #E2614B, #D97706)',
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              {...{ style: { ...{ transformOrigin: 'top', background: 'linear-gradient(to bottom, #4F46E5, #E2614B, #D97706)' } } }}
            />

            <div className="flex flex-col gap-10">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.phase}
                  className="relative"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-8 top-1 h-2.5 w-2.5 rounded-full ring-4 ring-[#09090B]"
                    style={{ backgroundColor: stageColors[i] }}
                  />

                  <p className="text-xs text-[#6B7280]">{stage.phase} &middot; {stage.timeline}</p>
                  <p className="text-sm font-medium text-white mt-1">{stage.name}</p>

                  <span
                    className="mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{
                      backgroundColor: `${stageColors[i]}18`,
                      color: stageColors[i],
                      border: `1px solid ${stageColors[i]}30`,
                    }}
                  >
                    {stage.revenue}
                  </span>

                  <p className="text-xs text-[#9CA3AF] mt-1.5">{stage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Unit Economics grid ── */}
        <motion.h3
          className="text-lg font-semibold text-white mb-6"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          Unit economics
        </motion.h3>

        <div className="grid grid-cols-2 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="rounded-xl bg-[#141416] border border-white/[0.06] p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              <p className="text-xs text-[#6B7280] uppercase tracking-wider mb-2">{m.label}</p>
              <p className="text-3xl font-bold" style={{ color: m.color }}>
                {m.value}
              </p>
              <p className="text-xs text-[#6B7280] mt-2">{m.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
