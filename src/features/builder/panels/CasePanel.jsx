import { motion } from 'framer-motion'
import { CASE_COLORS, CASE_TYPES } from '../../../data/cases'
import { HANGERS } from '../../../data/hangers'

export default function CasePanel({ builder, showTypeChoice }) {
  const { caseType, setCaseType, caseColor, setCaseColor, hanger, setHanger } = builder
  return (
    <div className="space-y-5">
      {showTypeChoice && (
        <section className="space-y-2">
          <p className="text-center font-display text-lg uppercase">Pilih tipe case</p>
          <p className="rounded-xl border-2 border-red-500/60 bg-red-500/10 p-2 text-center text-[11px] font-bold text-red-500">
            Jangan salah checkout! Sesuaikan dengan gambar produk.
          </p>
          {CASE_TYPES.map((t) => (
            <motion.button
              key={t.id}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCaseType(t.id)}
              className={`flex w-full items-center gap-3 rounded-2xl border-[3px] border-ink p-3 text-left shadow-sticker-sm
                ${caseType === t.id ? 'bg-brand-blue text-ink' : 'bg-white text-ink dark:bg-[#161233] dark:text-white'}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-brand-yellow text-2xl">{t.emoji}</span>
              <span>
                <span className="block font-display text-lg uppercase">{t.name}</span>
                <span className="text-[11px] font-bold opacity-70">{t.desc}</span>
              </span>
            </motion.button>
          ))}
        </section>
      )}

      <section>
        <p className="mb-3 text-center font-display text-lg uppercase">Pilih warna case</p>
        <div className="grid grid-cols-4 gap-3">
          {CASE_COLORS.map((c) => (
            <motion.button
              key={c.id}
              whileHover={{ scale: 1.15, rotate: 8 }}
              whileTap={{ scale: 0.85 }}
              animate={caseColor.id === c.id ? { scale: [1, 1.2, 1.08] } : { scale: 1 }}
              onClick={() => setCaseColor(c)}
              style={{ backgroundColor: c.bg }}
              className={`aspect-square rounded-full border-[3px] border-ink text-3xl shadow-sticker-sm
                ${caseColor.id === c.id ? 'ring-4 ring-brand-pink ring-offset-2 ring-offset-transparent' : ''}`}
              title={c.name}
            >
              {c.emoji}
            </motion.button>
          ))}
        </div>
        <p className="mt-3 text-center">
          <span className="rounded-full border-2 border-ink bg-ink px-3 py-0.5 text-xs font-black text-white">{caseColor.name}</span>
        </p>
      </section>

      <section>
        <p className="mb-3 text-center font-display text-lg uppercase">Pilih gantungan</p>
        <div className="grid grid-cols-3 gap-3">
          {HANGERS.map((h) => (
            <motion.button
              key={h.id}
              whileHover={{ y: -4, rotate: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setHanger(h)}
              className={`flex flex-col items-center gap-1 rounded-2xl border-[3px] border-ink p-3 shadow-sticker-sm
                ${hanger.id === h.id ? 'bg-brand-blue text-ink' : 'bg-white text-ink dark:bg-[#161233] dark:text-white'}`}
            >
              <span className="text-3xl">{h.emoji}</span>
              <span className="font-display text-sm uppercase">{h.name}</span>
              <span className="text-center text-[10px] font-bold opacity-70">{h.desc}</span>
              <span className="mt-1 rounded-full border border-ink/40 bg-ink/10 px-2 py-0.5 text-[9px] font-black dark:bg-white/10">
                {h.price ? `+Rp ${(h.price / 1000).toFixed(0)}rb` : 'Gratis'}
              </span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>

  )
}
