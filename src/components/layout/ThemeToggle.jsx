import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import IconButton from '../ui/IconButton'

export default function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return (
    <IconButton color="#FF8C42" onClick={toggle} aria-label="Ganti tema">
      <motion.span key={dark} initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }}>
        {dark ? '☀️' : '🌙'}
      </motion.span>
    </IconButton>
  )
}
