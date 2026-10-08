import { motion } from 'framer-motion'

// Tombol bulat kecil untuk ikon/emoji (tema, cart, download, dll)
export default function IconButton({ children, color = '#FFD93D', className = '', badge, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.15, rotate: 12 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      style={{ backgroundColor: color }}
      className={`relative grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink text-lg shadow-sticker-sm ${className}`}
      {...props}
    >
      {children}
      {badge > 0 && (
        <motion.span
          key={badge}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full border-2 border-ink bg-brand-pink text-[10px] font-black text-white"
        >
          {badge}
        </motion.span>
      )}
    </motion.button>
  )
}
