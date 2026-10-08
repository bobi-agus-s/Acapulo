import { motion } from 'framer-motion'

const VARIANTS = {
  pink: 'bg-brand-pink text-white',
  yellow: 'bg-brand-yellow text-ink',
  blue: 'bg-brand-blue text-ink',
  purple: 'bg-brand-purple text-white',
  green: 'bg-brand-green text-ink',
  orange: 'bg-brand-orange text-ink',
  white: 'bg-white text-ink',
  dark: 'bg-ink text-white',
}

// Tombol sticker dengan efek "ditekan" dan hover membal.
// Pakai: <Button variant="pink" size="sm" onClick={...}>Teks</Button>
export default function Button({ variant = 'white', size = 'md', className = '', children, ...props }) {
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-5 py-2.5 text-sm', lg: 'px-8 py-4 text-xl' }
  return (
    <motion.button
      whileHover={{ y: -3, rotate: -1.5, boxShadow: '5px 7px 0 0 #1B1530' }}
      whileTap={{ y: 3, x: 3, boxShadow: '0px 0px 0 0 #1B1530' }}
      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
      className={`font-display uppercase tracking-wide rounded-2xl border-[3px] border-ink shadow-sticker
        disabled:opacity-40 disabled:pointer-events-none ${VARIANTS[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
