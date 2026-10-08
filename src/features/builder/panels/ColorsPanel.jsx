import { motion } from 'framer-motion'
import { COLOR_MODES, FONT_COLORS, LETTER_COLORS } from '../../../data/colors'

export default function ColorsPanel({ builder }) {
  const {
    letters,
    selected,
    setSelected,
    textMode,
    setTextColor,
    setAllTextColor,
    setKeyColor,
  } = builder
  const current = letters[selected]

  return (
    <div className="space-y-4">
      {/* Pilih keycap yang mau diedit */}
      <div>
        <p className="mb-2 text-center text-xs font-black uppercase">Klik keycap untuk edit warna</p>
        <div className="flex flex-wrap justify-center gap-2">
          {letters.map((l, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -4 }}
              whileTap={{ y: 4, boxShadow: '0 0 0 0 #1B1530' }}
              onClick={() => setSelected(i)}
              style={{ backgroundColor: l.keyColor, color: l.textColor, boxShadow: '0 4px 0 0 #1B1530' }}
              className={`grid h-12 w-12 place-items-center rounded-xl border-[3px] border-ink font-display text-2xl
                ${selected === i ? 'ring-4 ring-brand-pink' : ''}`}
            >
              {l.char || '?'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Warna HURUF di atas keycap (10 Warna) */}
      <div className="rounded-2xl border-2 border-ink/20 bg-ink/5 p-3 dark:bg-white/5">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-display text-xs uppercase">
            Warna huruf ({current?.char ? `Huruf "${current.char}"` : `#${selected + 1}`})
          </p>
          <button
            onClick={() => setAllTextColor('auto')}
            className={`rounded-lg border-2 border-ink px-2.5 py-0.5 text-[10px] font-black uppercase transition-all
              ${textMode === 'auto' ? 'bg-brand-pink text-white' : 'bg-white text-ink dark:bg-[#161233] dark:text-white'}`}
          >
            ✨ Auto
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {FONT_COLORS.map((fc) => (
            <motion.button
              key={fc.hex}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTextColor(fc.hex)}
              title={fc.name}
              style={{ backgroundColor: fc.hex }}
              className={`relative flex h-8 items-center justify-center rounded-lg border-2 border-ink shadow-sm
                ${current?.textColor?.toUpperCase() === fc.hex.toUpperCase() ? 'ring-2 ring-brand-pink ring-offset-1' : ''}`}
            >
              <span
                style={{ color: fc.hex === '#FFFFFF' ? '#1B1530' : '#FFFFFF' }}
                className="text-[10px] font-black"
              >
                A
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Palet: warna KEYCAP (keycap #n) */}
      <p className="text-center font-display text-sm uppercase">Warna keycap (keycap #{selected + 1})</p>
      <div className="grid grid-cols-4 gap-2.5">
        {LETTER_COLORS.map((hex, i) => (
          <motion.button
            key={hex}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.02, type: 'spring' }}
            whileHover={{ scale: 1.12, rotate: -4 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => setKeyColor(hex)}
            style={{ backgroundColor: hex }}
            className={`relative aspect-square rounded-xl border-[3px] border-ink shadow-sticker-sm
              ${current?.keyColor === hex ? 'ring-4 ring-brand-pink' : ''}`}
          >
            <span className="absolute left-1 top-0.5 text-[9px] font-black text-ink/70">{i + 1}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
