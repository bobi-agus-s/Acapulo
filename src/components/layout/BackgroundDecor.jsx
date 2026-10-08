import { motion } from 'framer-motion'

const ITEMS = ['🍒', '⭐', '🍇', '💖', '🍌', '✨', '🫐', '🌸', '🍉', '🥑', '🔑', '🍓']

// Emoji melayang di background (dekorasi). Posisi dibuat deterministik supaya tidak loncat saat re-render.
export default function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      {ITEMS.map((e, i) => (
        <motion.span
          key={i}
          className="absolute select-none opacity-30"
          style={{
            left: `${(i * 83) % 100}%`,
            top: `${(i * 47) % 100}%`,
            fontSize: 24 + ((i * 13) % 28),
          }}
          animate={{ y: [0, -30, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 5 + (i % 5), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        >
          {e}
        </motion.span>
      ))}
    </div>
  )
}
