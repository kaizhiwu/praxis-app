import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Line =
  | { kind: 'prompt'; text: string }
  | { kind: 'user'; text: string }
  | { kind: 'work'; text: string }
  | { kind: 'ok'; text: string }
  | { kind: 'blank' }

const LINES: Line[] = [
  { kind: 'prompt', text: 'claude' },
  { kind: 'user', text: 'add point-of-visit confirmation flow for noise level' },
  { kind: 'work', text: 'Reading src/data/types.ts' },
  { kind: 'work', text: 'Writing src/components/ContributeSheet.tsx' },
  { kind: 'work', text: 'Migration: 04_confirmations.sql' },
  { kind: 'ok', text: '4 files modified · 138 lines · 23/23 tests passing' },
  { kind: 'blank' },
  { kind: 'prompt', text: 'vercel deploy --prod' },
  { kind: 'ok', text: 'Deployed in 18s · 247 KB' },
]

const TYPE_DELAY = 28
const PAUSE_AFTER_OK = 600
const PAUSE_AFTER_PROMPT = 220

function lineColorFor(kind: Line['kind']) {
  switch (kind) {
    case 'prompt': return 'var(--color-ink-tertiary)'
    case 'user': return 'var(--color-accent-indigo)'
    case 'work': return 'var(--color-ink-secondary)'
    case 'ok': return 'var(--color-ink)'
    default: return 'var(--color-ink-tertiary)'
  }
}

function prefixFor(kind: Line['kind']) {
  switch (kind) {
    case 'prompt': return '~/Praxis $'
    case 'user': return '>'
    case 'work': return '→'
    case 'ok': return '✓'
    default: return ''
  }
}

/**
 * BuildTerminal — stylized Claude Code session shown as the visual proof
 * of the AI-native build philosophy. Types itself out on viewport entry,
 * then loops with a long pause so the section doesn't feel busy.
 */
export function BuildTerminal() {
  const [renderedCount, setRenderedCount] = useState(0)
  const [partial, setPartial] = useState('')

  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | undefined

    function play() {
      let lineIdx = 0
      let charIdx = 0
      setRenderedCount(0)
      setPartial('')

      function tick() {
        if (cancelled) return
        if (lineIdx >= LINES.length) {
          // Loop after a long pause
          timer = setTimeout(play, 5500)
          return
        }
        const current = LINES[lineIdx]
        if (current.kind === 'blank') {
          setRenderedCount((c) => c + 1)
          lineIdx++
          charIdx = 0
          setPartial('')
          timer = setTimeout(tick, 200)
          return
        }
        if (charIdx < current.text.length) {
          charIdx++
          setPartial(current.text.slice(0, charIdx))
          timer = setTimeout(tick, TYPE_DELAY)
        } else {
          setRenderedCount((c) => c + 1)
          lineIdx++
          charIdx = 0
          setPartial('')
          const pause = current.kind === 'ok' ? PAUSE_AFTER_OK : PAUSE_AFTER_PROMPT
          timer = setTimeout(tick, pause)
        }
      }

      tick()
    }

    play()
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [])

  const inProgressLine = LINES[renderedCount]
  const showCursor = inProgressLine && inProgressLine.kind !== 'blank'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bone)] overflow-hidden"
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border-subtle)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-ink-faint)] opacity-50" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-ink-faint)] opacity-50" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-ink-faint)] opacity-50" />
        </div>
        <span
          className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-tertiary)]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          ~/Praxis · zsh
        </span>
        <span className="w-10" aria-hidden />
      </div>

      {/* Body */}
      <div
        className="px-5 py-4 text-[12.5px] leading-[1.7] min-h-[280px]"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {LINES.slice(0, renderedCount).map((line, i) => (
          <div key={i} style={{ color: lineColorFor(line.kind) }}>
            {line.kind === 'blank' ? (
              <span>&nbsp;</span>
            ) : (
              <>
                <span className="text-[var(--color-ink-faint)] mr-2 select-none">
                  {prefixFor(line.kind)}
                </span>
                {line.text}
              </>
            )}
          </div>
        ))}
        {showCursor && (
          <div style={{ color: lineColorFor(inProgressLine.kind) }}>
            <span className="text-[var(--color-ink-faint)] mr-2 select-none">
              {prefixFor(inProgressLine.kind)}
            </span>
            {partial}
            <motion.span
              className="inline-block w-[1px] h-[14px] align-middle ml-[1px]"
              style={{ backgroundColor: 'var(--color-accent-indigo)' }}
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.55,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  )
}
