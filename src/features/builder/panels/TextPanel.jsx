import { motion } from 'framer-motion'
import { MAX_LETTERS } from '../../../data/config'

export default function TextPanel({ builder }) {
  const { text, setText, letterCount, changeCount } = builder
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-black uppercase">
          <span>✏️ Masukkan teks</span>
          <span className="rounded-full border-2 border-ink bg-brand-yellow px-2 text-ink">{text.length}/{MAX_LETTERS}</span>
        </div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={MAX_LETTERS}
          placeholder="NAMA"
          className="w-full rounded-2xl border-[3px] border-ink bg-white px-4 py-3 text-center font-display text-3xl uppercase text-ink shadow-sticker-sm outline-none transition focus:-translate-y-1 focus:shadow-sticker dark:bg-[#161233] dark:text-white"
        />
      </div>

      <div>
        <p className="mb-3 text-center font-display text-lg uppercase">Jumlah huruf</p>
        <div className="grid grid-cols-8 gap-1.5">
          {Array.from({ length: MAX_LETTERS }, (_, i) => i + 1).map((n) => (
            <motion.button
              key={n}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => changeCount(n)}
              className={`aspect-square rounded-xl border-[3px] border-ink font-display text-lg shadow-sticker-sm
                ${letterCount === n ? 'bg-brand-pink text-white' : 'bg-white text-ink dark:bg-[#161233] dark:text-white'}`}
            >
              {n}
            </motion.button>
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] italic opacity-60">*Slot otomatis menyesuaikan teks, tapi bisa diubah manual.</p>
      </div>
    </div>
  )
}
