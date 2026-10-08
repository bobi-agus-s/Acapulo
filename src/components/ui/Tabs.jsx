import { motion } from 'framer-motion'

// Tab dengan indikator pill yang bergeser mulus (layoutId).
// tabs = [{ id, label }]
export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl border-[3px] border-ink bg-ink/10 p-1.5 dark:bg-white/10">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="relative rounded-xl py-2 font-display text-sm uppercase tracking-wide"
        >
          {active === t.id && (
            <motion.span
              layoutId="tab-pill"
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="absolute inset-0 rounded-xl border-[3px] border-ink bg-brand-pink shadow-sticker-sm"
            />
          )}
          <span className={`relative ${active === t.id ? 'text-white' : ''}`}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}
