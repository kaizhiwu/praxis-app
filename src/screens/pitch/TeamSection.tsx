import { motion } from 'framer-motion'
import { PITCH } from '../../data/pitch'

export function TeamSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-12"
        >
          {PITCH.team.title}
        </motion.h2>

        <div className="space-y-8">
          {PITCH.team.members.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#141416] rounded-2xl border border-white/[0.06] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start"
            >
              {/* Avatar / monogram */}
              <div className="shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #4F46E5, #6366F1)',
                  }}
                >
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20 text-[#818CF8]">
                    {member.role}
                  </span>
                </div>

                <p className="text-[#9CA3AF] mt-3 leading-relaxed">{member.bio}</p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {member.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-xs text-[#9CA3AF] bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 mt-5">
                  {member.url && (
                    <a
                      href={member.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-white transition-colors"
                      aria-label="Website"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                      </svg>
                      Website
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-white transition-colors"
                      aria-label="Twitter"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
