import { AnimatePresence, motion } from 'framer-motion'

// Panel geser dari kanan. Pakai untuk keranjang atau fitur lain nanti.
export default function Drawer({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l-[3px] border-ink bg-[#FFF4E0] dark:bg-[#1c1740]"
          >
            <header className="flex items-center justify-between border-b-[3px] border-ink p-4">
              <h2 className="font-display text-2xl uppercase">{title}</h2>
              <button onClick={onClose} className="font-display text-2xl hover:rotate-90 transition-transform">✕</button>
            </header>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
