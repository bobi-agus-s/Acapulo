import { motion } from 'framer-motion'
import Logo from '../../components/ui/Logo'
import IconButton from '../../components/ui/IconButton'
import Button from '../../components/ui/Button'
import ThemeToggle from '../../components/layout/ThemeToggle'
import { downloadKeychain } from '../../utils/download'
import Hanger from './Hanger'
import ClickerBaseCase from './ClickerBaseCase'

// Preview CLICKER REALISTIS: menggunakan aset 3D render base clicker
export default function KeychainPreview({ builder, series, itemNumber }) {
  const { letters, hanger, feelingLucky } = builder

  // Kalau huruf banyak (> 5), rampingkan sedikit agar muat di layar
  const baseWidth = letters.length > 5 ? 135 : 155

  return (
    <div className="sticker relative flex min-h-[440px] flex-1 flex-col overflow-hidden p-4">
      <div className="flex items-start justify-between">
        <Logo size={56} />
        <ThemeToggle />
      </div>
      <span className="mt-1 w-fit rounded-full border-2 border-ink bg-brand-green px-3 py-0.5 text-[10px] font-black uppercase text-ink">
        ● Editing item #{itemNumber} · {series.name}
      </span>

      <div className="grid flex-1 place-items-center py-6">
        {/* Seluruh gantungan bergoyang pelan terus-menerus */}
        <motion.div
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top center' }}
          className="flex flex-col items-center"
        >
          {/* Gantungan (Ring, Chain, Strap) */}
          <motion.div
            key={hanger.id}
            initial={{ y: -20, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 16 }}
          >
            <Hanger type={hanger.id} />
          </motion.div>

          {/* Base Clicker Realistis (menggunakan gambar render kamu) */}
          <ClickerBaseCase builder={builder} renderedWidth={baseWidth} />
        </motion.div>
      </div>

      <div className="flex items-end justify-between">
        <IconButton
          color="#FFFFFF"
          onClick={() => downloadKeychain(builder, 'clicker-custom.png')}
          aria-label="Download"
        >
          ⬇️
        </IconButton>
        <Button variant="blue" size="sm" onClick={feelingLucky}>
          🎲 Feeling Lucky
        </Button>
      </div>
    </div>
  )
}
