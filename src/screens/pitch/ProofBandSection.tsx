import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { ProofBand, PlacesMappedGlyph } from '../../components/ProofBand'

const fade = {
  initial: { opacity: 0, y: 8 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } as const,
}

/**
 * ProofBandSection — the "where it stands" stat band, lifted out of
 * HowIBuildSection so each section carries one idea, not three.
 */
export function ProofBandSection() {
  // Inject the geographic glyph into the "Places mapped" cell so the number
  // has visual weight, not just a digit.
  const metrics = PITCH.buildVelocity.metrics.map((m) =>
    /places/i.test(m.label) ? { ...m, glyph: <PlacesMappedGlyph /> } : { ...m }
  )

  return (
    <section
      id="proof"
      className="bg-[var(--color-bone)] px-6 lg:px-10 pt-8 lg:pt-10 pb-20 lg:pb-28"
    >
      <div className="max-w-[1200px] mx-auto">
        <motion.p {...fade} className="mono-label mb-6">
          {PITCH.buildVelocity.title}
        </motion.p>
        <ProofBand metrics={metrics} />
      </div>
    </section>
  )
}
