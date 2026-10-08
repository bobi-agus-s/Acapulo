import { motion } from 'framer-motion'

// Satu kartu series berupa TUMPUKAN 2 kartu (depan + belakang).
// Animasi: masuk (parent stagger) -> melayang terus -> kartu belakang bergoyang
//          -> emoji berdenyut -> kilau lewat -> hover: kartu belakang terbuka seperti kipas.
export default function SeriesCard({ series, index, onSelect }) {
  const tilt = [-6, 4, -3, 6, -5, 3, -4][index % 7]
  const size = 'h-28 w-28 sm:h-32 sm:w-32'

  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, y: 60, scale: 0.6, rotate: tilt * 3 },
        show: { opacity: 1, y: 0, scale: 1, rotate: tilt, transition: { type: 'spring', stiffness: 220, damping: 14 } },
      }}
      whileHover={{ y: -14, scale: 1.12, rotate: 0 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => onSelect(series)}
      className="group w-28 sm:w-32"
    >
      {/* Layer 1: seluruh tumpukan melayang naik-turun terus-menerus */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3 + (index % 3) * 0.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}
        className="flex flex-col items-center gap-3"
      >
        <div className={`relative ${size}`}>
          {/* KARTU BELAKANG: bergoyang pelan; saat hover terbuka lebih lebar (CSS group-hover) */}
          <motion.div
            animate={{ rotate: [10, 16, 10], x: [6, 10, 6] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
            className="absolute inset-0"
          >
            <div className="h-full w-full transition-transform duration-300 group-hover:translate-x-3 group-hover:rotate-[14deg]">
              <div
                style={{ backgroundColor: series.color }}
                className="relative grid h-full w-full place-items-center overflow-hidden rounded-3xl border-[3px] border-ink shadow-sticker"
              >
                <span className="absolute inset-0 bg-white/50" />
                <span className="relative text-3xl opacity-60">✨</span>
              </div>
            </div>
          </motion.div>

          {/* KARTU DEPAN */}
          <div
            style={{ backgroundColor: series.color }}
            className="relative z-10 grid h-full w-full place-items-center overflow-hidden rounded-3xl border-[3px] border-ink shadow-sticker transition-shadow group-hover:shadow-sticker-lg"
          >
            {/* Emoji berdenyut + goyang */}
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [-8, 8, -8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
              className="text-5xl"
            >
              {series.emoji}
            </motion.span>

            {/* Kilau cahaya lewat berkala */}
            <motion.span
              initial={{ left: '-60%' }}
              animate={{ left: '160%' }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 + index * 0.4, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-white/40"
            />
          </div>
        </div>

        <span className="text-center font-display text-sm uppercase leading-tight">{series.name}</span>
      </motion.div>
    </motion.button>
  )
}
