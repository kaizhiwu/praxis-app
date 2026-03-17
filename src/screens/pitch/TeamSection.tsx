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
              className="border-l-2 border-[#4F46E5] pl-8 py-2"
            >
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <p className="text-[#9CA3AF] mt-1">{member.role}</p>
              <p className="text-[#9CA3AF] mt-3">{member.bio}</p>

              <div className="flex items-center gap-3 mt-4">
                {member.url && (
                  <a
                    href={member.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B7280] hover:text-white transition-colors"
                    aria-label="Website"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6B7280] hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
