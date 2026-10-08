import { createContext, useContext, useEffect, useState } from 'react'
import { PRICE_PER_ITEM } from '../data/config'

const CartContext = createContext(null)

// Keranjang belanja, disimpan di localStorage
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || []
    } catch {
      return []
    }
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (item) => setItems((prev) => [...prev, { ...item, id: crypto.randomUUID() }])
  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clear = () => setItems([])

  const value = {
    items,
    count: items.length,
    total: items.reduce((sum, item) => sum + (item.price || PRICE_PER_ITEM), 0),
    addItem,
    removeItem,
    clear,
    open,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
