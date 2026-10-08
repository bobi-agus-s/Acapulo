import { STORE } from '../data/config'

export const formatPrice = (n) => `${STORE.currency} ${n.toLocaleString('id-ID')}`

// Bikin teks pesanan, contoh: 1. [KOKORO], ?-1 (REGULAR - Cotton)
export function formatOrderLine(item, index) {
  const text = item.text.trim() || '-'
  const hanger = item.hanger ? ` - ${item.hanger.name}` : ''
  const price = item.price ? ` - ${formatPrice(item.price)}` : ''
  return `${index + 1}. [${text.toUpperCase()}], ${item.letterCount} huruf (${item.caseType.toUpperCase()} - ${item.caseColor.name}${hanger})${price}`
}

export function formatOrderText(items) {
  return items.map(formatOrderLine).join('\n')
}

export function whatsappLink(items) {
  const msg = `Halo ${STORE.name}, aku mau pesan:\n${formatOrderText(items)}`
  return `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(msg)}`
}

// Pilih warna teks (hitam/putih) yang kontras dengan background
export function contrastColor(hex) {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? '#1E1E1E' : '#FFFFFF'
}
