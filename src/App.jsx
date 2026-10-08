import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BackgroundDecor from './components/layout/BackgroundDecor'
import ThemeToggle from './components/layout/ThemeToggle'
import IconButton from './components/ui/IconButton'
import { useCart } from './context/CartContext'
import LandingPage from './features/landing/LandingPage'
import BuilderPage from './features/builder/BuilderPage'
import CartDrawer from './features/cart/CartDrawer'

export default function App() {
  const [series, setSeries] = useState(null) // null = halaman landing
  const { count, openCart } = useCart()

  return (
    <>
      <BackgroundDecor />

      {/* Tombol mengambang: tema (hanya di landing), keranjang (hanya di builder) */}
      <div className="fixed bottom-6 right-4 z-30 flex flex-col gap-3">
        {!series && <ThemeToggle />}
        {series && (
          <IconButton color="#FFFFFF" badge={count} onClick={openCart} aria-label="Keranjang">🛒</IconButton>
        )}
      </div>

      <AnimatePresence mode="wait">
        {series ? (
          <BuilderPage
            key="builder"
            series={series}
            onBack={() => {
              window.scrollTo({ top: 0, behavior: 'instant' })
              setSeries(null)
            }}
          />
        ) : (
          <LandingPage key="landing" onSelectSeries={(s) => {
            window.scrollTo({ top: 0, behavior: 'instant' })
            setSeries(s)
          }} />
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  )
}
