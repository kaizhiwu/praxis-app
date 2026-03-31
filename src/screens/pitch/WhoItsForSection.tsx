import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

export function WhoItsForSection({ onContact }: { onContact: () => void }) {
  const { whoItsFor } = PITCH

  return (
    <section className="bg-[#0F0F14] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex rounded-full border border-[rgba(255,255,255,0.1)] px-4 py-1.5 bg-[rgba(255,255,255,0.06)]">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8E8E93]">
              {whoItsFor.eyebrow}
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#E8E8ED] mt-6 mb-4">
            {whoItsFor.headline}
          </h2>
          <p className="text-lg text-[#8E8E93] max-w-2xl">
            Praxis is the shared intelligence layer. Both sides contribute once — everyone gets smarter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {whoItsFor.personas.map((persona, i) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-dark-elevated rounded-2xl p-8"
              style={{ borderLeft: `3px solid ${persona.accent}` }}
            >
              <h3 className="text-2xl font-bold text-[#E8E8ED]">{persona.title}</h3>
              <p className="text-[#8E8E93] leading-relaxed mt-3">{persona.description}</p>

              <div className="flex flex-wrap gap-2 mt-6">
                {persona.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-3 py-1 rounded-full border"
                    style={{ color: persona.accent, borderColor: `${persona.accent}33`, backgroundColor: `${persona.accent}15` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <button
            onClick={onContact}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] transition-colors duration-200 cursor-pointer"
          >
            Apply as design partner
          </button>
        </motion.div>
      </div>
    </section>
  )
}
