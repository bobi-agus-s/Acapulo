import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import Tabs from '../../components/ui/Tabs'
import { useCart } from '../../context/CartContext'
import { useBuilder } from './useBuilder'
import KeychainPreview from './KeychainPreview'
import OrderBar from './OrderBar'
import TextPanel from './panels/TextPanel'
import CasePanel from './panels/CasePanel'
import ColorsPanel from './panels/ColorsPanel'

const TABS = [
  { id: 'text', label: 'Text' },
  { id: 'case', label: 'Case' },
  { id: 'colors', label: 'Colors' },
]

export default function BuilderPage({ series, onBack }) {
  const builder = useBuilder()
  const { count } = useCart()
  const [tab, setTab] = useState('text')
  const [toast, setToast] = useState(false)

  const showToast = () => {
    setToast(true)
    setTimeout(() => setToast(false), 1600)
  }

  // Mau tambah panel baru? Tambah di TABS lalu tambahkan case di sini.
  const panels = {
    text: <TextPanel builder={builder} />,
    case: <CasePanel builder={builder} showTypeChoice={series.hasCaseChoice} />,
    colors: <ColorsPanel builder={builder} />,
  }

  return (
    <motion.main
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      className="relative z-10 mx-auto min-h-screen max-w-5xl px-4 py-6"
    >
      <Button variant="white" size="sm" onClick={onBack}>← Pilih produk</Button>

      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex">
          <KeychainPreview builder={builder} series={series} itemNumber={count + 1} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="sticker flex flex-col overflow-hidden">
          <div className="p-4"><Tabs tabs={TABS} active={tab} onChange={setTab} /></div>
          <div className="min-h-[340px] flex-1 px-4 pb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {panels[tab]}
              </motion.div>
            </AnimatePresence>
          </div>
          <OrderBar builder={builder} onAdded={showToast} />
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border-[3px] border-ink bg-brand-green px-5 py-2 font-display text-ink shadow-sticker"
          >
            ✅ Masuk keranjang!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  )
}
