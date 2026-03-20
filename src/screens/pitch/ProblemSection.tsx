import { motion, useScroll, useTransform } from 'framer-motion'
import { PITCH } from '../../data/pitch'
import { useRef } from 'react'

const icons: Record<string, React.ReactNode> = {
  laptop: (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="14" height="10" rx="1.5" />
      <path d="M1 16h18" />
    </svg>
  ),
  droplet: (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2C10 2 4 9 4 12.5a6 6 0 0 0 12 0C16 9 10 2 10 2z" />
    </svg>
  ),
  heart: (
    <svg width="32" height="32" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.68 3.57a4.5 4.5 0 00-6.36 0L10 3.89l-.32-.32a4.5 4.5 0 00-6.36 6.36l.32.32L10 16.61l6.36-6.36.32-.32a4.5 4.5 0 000-6.36z" />
    </svg>
  ),
}

function StoryCard({
  story,
  index,
}: {
  story: (typeof PITCH.problem.stories)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.7], [60, 0])
  // Image reveal — clip path wipes in from left
  const clipPath = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
  )
  const reverse = index % 2 !== 0

  return (
    <div
      ref={ref}
      className={`min-h-[80vh] md:min-h-screen flex items-center py-16 ${
        index > 0 ? '' : ''
      }`}
    >
      <div
        className={`max-w-5xl mx-auto px-6 w-full flex flex-col ${
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-center gap-10 md:gap-20`}
      >
        {/* Text side */}
        <motion.div style={{ opacity, y: translateY }} className="flex-1 max-w-md">
          <div className="text-[#86868B] mb-4">{icons[story.icon]}</div>

          <p className="text-[#1D1D1F] text-xl md:text-2xl font-semibold">
            &ldquo;{story.query.replace(/^"|"$/g, '')}&rdquo;
          </p>

          <div className="mt-6">
            <p className="text-[#86868B] text-xs uppercase tracking-wide mb-1">
              What Maps says:
            </p>
            <p className="text-[#6E6E73] relative">
              <span className="relative">
                {story.mapsResult}
                <motion.span
                  className="absolute left-0 top-1/2 h-[1.5px] bg-[#E2614B]/60"
                  style={{ width: '100%' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                />
              </span>
            </p>
          </div>

          <div className="h-px bg-[#E5E5EA] my-5" />

          <div>
            <p className="text-[#86868B] text-xs uppercase tracking-wide mb-1">
              What actually happened:
            </p>
            <p className="text-[#E2614B] font-medium">{story.reality}</p>
          </div>
        </motion.div>

        {/* Visual side — parallax clip-path reveal */}
        <motion.div
          style={{ clipPath }}
          className="flex-1 max-w-sm w-full"
        >
          <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E5E5EA] aspect-[4/3]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            {/* Abstract visual per story type */}
            <div className="absolute inset-0 flex items-center justify-center">
              {story.icon === 'laptop' && (
                <svg viewBox="0 0 200 150" className="w-full h-full p-6" fill="none">
                  {/* Cafe scene — tables with X marks */}
                  <rect x="20" y="60" width="50" height="35" rx="4" stroke="#4F46E5" strokeWidth="1" opacity="0.4" />
                  <line x1="30" y1="70" x2="60" y2="85" stroke="#E2614B" strokeWidth="1.5" opacity="0.7" />
                  <line x1="60" y1="70" x2="30" y2="85" stroke="#E2614B" strokeWidth="1.5" opacity="0.7" />
                  <rect x="80" y="40" width="50" height="35" rx="4" stroke="#4F46E5" strokeWidth="1" opacity="0.4" />
                  <circle cx="105" cy="57" r="8" stroke="#4F46E5" strokeWidth="1" opacity="0.3" />
                  <path d="M101 57l3 3 5-6" stroke="#4F46E5" strokeWidth="1.5" opacity="0.6" />
                  <rect x="140" y="70" width="45" height="30" rx="4" stroke="#4F46E5" strokeWidth="1" opacity="0.4" />
                  <line x1="148" y1="78" x2="177" y2="92" stroke="#E2614B" strokeWidth="1.5" opacity="0.7" />
                  <line x1="177" y1="78" x2="148" y2="92" stroke="#E2614B" strokeWidth="1.5" opacity="0.7" />
                  <text x="100" y="130" textAnchor="middle" fill="#86868B" fontSize="9" fontFamily="system-ui">2 of 3 spots unusable</text>
                </svg>
              )}
              {story.icon === 'droplet' && (
                <svg viewBox="0 0 200 150" className="w-full h-full p-6" fill="none">
                  {/* Locked doors */}
                  <rect x="20" y="30" width="40" height="60" rx="3" stroke="#E2614B" strokeWidth="1" opacity="0.5" />
                  <circle cx="50" cy="60" r="3" fill="#E2614B" opacity="0.6" />
                  <text x="40" y="105" textAnchor="middle" fill="#E2614B" fontSize="7" fontFamily="system-ui">CLOSED</text>
                  <rect x="80" y="30" width="40" height="60" rx="3" stroke="#D97706" strokeWidth="1" opacity="0.5" />
                  <text x="100" y="65" textAnchor="middle" fill="#D97706" fontSize="7" fontFamily="system-ui">$$$</text>
                  <text x="100" y="105" textAnchor="middle" fill="#D97706" fontSize="7" fontFamily="system-ui">PURCHASE</text>
                  <rect x="140" y="30" width="40" height="60" rx="3" stroke="#4F46E5" strokeWidth="1" opacity="0.5" />
                  <path d="M155 55h10M160 50v10" stroke="#86868B" strokeWidth="1" opacity="0.4" />
                  <text x="160" y="105" textAnchor="middle" fill="#86868B" fontSize="7" fontFamily="system-ui">LOCKED 6PM</text>
                  <text x="100" y="135" textAnchor="middle" fill="#86868B" fontSize="9" fontFamily="system-ui">0 of 3 actually available</text>
                </svg>
              )}
              {story.icon === 'heart' && (
                <svg viewBox="0 0 200 150" className="w-full h-full p-6" fill="none">
                  {/* Date spot disappointment */}
                  <circle cx="100" cy="50" r="25" stroke="#E2614B" strokeWidth="0.5" opacity="0.3" />
                  <rect x="70" y="30" width="60" height="40" rx="3" stroke="#E2614B" strokeWidth="1" opacity="0.4" />
                  <line x1="85" y1="42" x2="115" y2="42" stroke="#D97706" strokeWidth="3" opacity="0.5" />
                  <line x1="85" y1="50" x2="115" y2="50" stroke="#D97706" strokeWidth="3" opacity="0.5" />
                  <line x1="85" y1="58" x2="115" y2="58" stroke="#D97706" strokeWidth="3" opacity="0.5" />
                  <text x="100" y="95" textAnchor="middle" fill="#E2614B" fontSize="8" fontFamily="system-ui">blinding overhead lights</text>
                  <text x="100" y="110" textAnchor="middle" fill="#86868B" fontSize="7" fontFamily="system-ui">entrance through unmarked alley</text>
                  <text x="100" y="135" textAnchor="middle" fill="#86868B" fontSize="9" fontFamily="system-ui">10 min standing outside</text>
                </svg>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export function ProblemSection() {
  return (
    <section id="problem" className="bg-[#FAFAFA] relative">
      <div className="max-w-5xl mx-auto px-6 pt-32">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl font-bold mb-4 text-[#1D1D1F]"
        >
          {PITCH.problem.title}
        </motion.h2>
      </div>

      {/* Full-viewport parallax story cards */}
      {PITCH.problem.stories.map((story, i) => (
        <StoryCard key={i} story={story} index={i} />
      ))}

      {/* Insight blockquote */}
      <div className="max-w-5xl mx-auto px-6 pb-32">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="border-l-[3px] border-[#4F46E5] pl-6"
        >
          <p className="text-lg text-[#6E6E73] italic">{PITCH.problem.insight}</p>
        </motion.blockquote>
      </div>
    </section>
  )
}
