import { useState } from 'react'
import { motion } from 'framer-motion'
import IconButton from '../../components/ui/IconButton'
import { STORE, PRICE_PER_ITEM } from '../../data/config'
import { useCart } from '../../context/CartContext'
import { formatOrderLine, formatPrice, whatsappLink } from '../../utils/order'

// Bagian bawah panel: format order, harga, dan tombol aksi (cart / WA / Shopee)
export default function OrderBar({ builder, onAdded }) {
  const { addItem, count, openCart } = useCart()
  const [copied, setCopied] = useState(false)
  const item = builder.toCartItem()
  const line = formatOrderLine(item, 0)

  const copy = async () => {
    await navigator.clipboard.writeText(line)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const add = () => {
    addItem(item)
    onAdded?.()
  }

  return (
    <div className="space-y-3 border-t-[3px] border-ink p-4">
      <div className="flex items-center justify-between gap-2 rounded-xl border-2 border-ink bg-ink/10 px-3 py-2 dark:bg-white/10">
        <code className="truncate text-[11px] font-bold">{line}</code>
        <button onClick={copy} className="text-sm transition-transform hover:scale-125">{copied ? '✅' : '📋'}</button>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-black uppercase opacity-60">Estimasi Harga ({builder.letterCount} base {builder.hanger?.price ? `+ ${builder.hanger.name}` : ''})</p>
          <motion.p key={builder.price} className="font-display text-3xl">{formatPrice(builder.price)}</motion.p>
        </div>
        <div className="flex gap-2">
          <IconButton color="#FFFFFF" badge={count} onClick={add} aria-label="Tambah ke keranjang">🛒</IconButton>
          <IconButton color="#6BCB77" onClick={() => window.open(whatsappLink([item]), '_blank')} aria-label="WhatsApp">💬</IconButton>
          <IconButton color="#FF5722" onClick={() => window.open(STORE.shopeeUrl, '_blank')} aria-label="Shopee">🛍️</IconButton>
        </div>
      </div>
      {count > 0 && (
        <button onClick={openCart} className="w-full text-center text-xs font-black uppercase underline">
          Lihat keranjang ({count})
        </button>
      )}
    </div>
  )
}
