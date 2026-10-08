import { motion } from 'framer-motion'

const NAME = 'ACAPULO'

// Logo teks "ACAPULO": badge pill yang melayang, tiap huruf naik-turun bergelombang.
export default function Logo({ size = 90 }) {
  return (
    <motion.div
      animate={{ rotate: [-3, 3, -3], y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.12, rotate: 0 }}
      whileTap={{ scale: 0.92 }}
      className="relative inline-flex overflow-hidden rounded-2xl border-[3px] border-ink bg-brand-pink shadow-sticker"
      style={{ fontSize: size * 0.4, padding: `${size * 0.08}px ${size * 0.16}px` }}
    >
      {NAME.split('').map((ch, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -size * 0.1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
          className="font-display leading-none tracking-wider text-white [text-shadow:2px_2px_0_#1B1530]"
        >
          {ch}
        </motion.span>
      ))}

      {/* Kilau cahaya yang lewat berkala */}
      <motion.span
        initial={{ left: '-60%' }}
        animate={{ left: '160%' }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-white/40"
      />
    </motion.div>
  )
}
