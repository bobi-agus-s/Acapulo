import { AnimatePresence, motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import Drawer from '../../components/ui/Drawer'
import { useCart } from '../../context/CartContext'
import { formatPrice, whatsappLink } from '../../utils/order'
import { PRICE_PER_ITEM } from '../../data/config'
import MiniKeychain from '../builder/MiniKeychain'

export default function CartDrawer() {
  const { open, closeCart, items, removeItem, total, clear } = useCart()

  return (
    <Drawer open={open} onClose={closeCart} title="🛒 Keranjang">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {items.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-20 text-center font-display text-xl opacity-60">
            Keranjang masih kosong 🫥
          </motion.p>
        )}
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80, scale: 0.8 }}
              className="sticker flex items-center gap-3 p-3 !shadow-sticker"
            >
              <MiniKeychain item={item} />
              <div className="flex-1">
                <p className="font-display text-lg leading-tight">{item.text || '(kosong)'}</p>
                <p className="text-xs font-bold opacity-70">
                  {item.caseType} · {item.caseColor.name} · {item.letterCount} huruf
                </p>
                <p className="text-sm font-black">{formatPrice(item.price || PRICE_PER_ITEM)}</p>
              </div>
              <button onClick={() => removeItem(item.id)} className="text-xl transition-transform hover:scale-125 hover:rotate-12">🗑️</button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length > 0 && (
        <footer className="space-y-3 border-t-[3px] border-ink p-4">
          <div className="flex items-center justify-between font-display text-2xl">
            <span>TOTAL</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="white" size="sm" onClick={clear}>Kosongkan</Button>
            <a href={whatsappLink(items)} target="_blank" rel="noreferrer" className="flex-1">
              <Button variant="green" className="w-full">Checkout WhatsApp</Button>
            </a>
          </div>
        </footer>
      )}
    </Drawer>
  )
}
