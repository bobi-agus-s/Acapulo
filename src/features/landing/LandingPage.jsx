import { motion } from 'framer-motion'
import Logo from '../../components/ui/Logo'
import { SERIES } from '../../data/series'
import SeriesCard from './SeriesCard'

const TITLE = 'MULAI CUSTOM!'

export default function LandingPage({ onSelectSeries }) {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16"
    >
      <motion.div initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', bounce: 0.6, duration: 1.2 }}>
        <Logo size={110} />
      </motion.div>

      {/* Judul muncul huruf per huruf */}
      <h1 className="mt-6 flex font-display text-4xl sm:text-5xl">
        {TITLE.split('').map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: 40, opacity: 0, rotate: -20 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.5 + i * 0.05, type: 'spring', stiffness: 300 }}
            whileHover={{ y: -10, color: '#FF2E93', scale: 1.3 }}
            className="inline-block cursor-default"
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.1 } } }}
        className="mt-14 flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-10"
      >
        {SERIES.map((s, i) => (
          <SeriesCard key={s.id} series={s} index={i} onSelect={onSelectSeries} />
        ))}
      </motion.div>
    </motion.main>
  )
}
