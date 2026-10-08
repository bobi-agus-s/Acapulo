import { useMemo, useState } from 'react'
import { CASE_COLORS, CASE_TYPES } from '../../data/cases'
import { HANGERS } from '../../data/hangers'
import { LUCKY_WORDS, LETTER_COLORS } from '../../data/colors'
import { MAX_LETTERS } from '../../data/config'
import { contrastColor } from '../../utils/order'

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const DEFAULT_KEY = LETTER_COLORS[0] // warna keycap awal (krem)

// Semua state & logika builder ada di sini, jadi komponen UI tinggal "menampilkan".
// Tiap slot = satu KEYCAP: { char, keyColor (warna keycap), textColor (warna huruf) }
export function useBuilder() {
  const [text, setTextState] = useState('')
  const [letterCount, setLetterCount] = useState(4)
  const [caseType, setCaseType] = useState(CASE_TYPES[0].id)
  const [caseColor, setCaseColor] = useState(CASE_COLORS[0])
  const [hanger, setHanger] = useState(HANGERS[0]) // jenis gantungan
  const [textMode, setTextMode] = useState('auto') // 'auto' atau hex
  const [textColors, setTextColors] = useState({}) // warna HURUF per slot: { index: '#hex' }
  const [keyColors, setKeyColors] = useState({}) // warna KEYCAP per slot: { index: '#hex' }
  const [selected, setSelected] = useState(0)

  // Hitung harga total simulasi: 1 base = Rp 10.000 + biaya gantungan
  const price = useMemo(
    () => letterCount * 10000 + (hanger?.price || 0),
    [letterCount, hanger],
  )

  const setText = (raw) => {
    const clean = raw.toUpperCase().slice(0, MAX_LETTERS)
    setTextState(clean)
    setLetterCount(Math.max(1, clean.length))
  }

  const changeCount = (n) => {
    setLetterCount(n)
    setTextState((t) => t.slice(0, n))
    setSelected((s) => Math.min(s, n - 1))
  }

  // Data final tiap keycap
  const letters = useMemo(
    () =>
      Array.from({ length: letterCount }, (_, i) => {
        const keyColor = keyColors[i] || DEFAULT_KEY
        let textColor
        if (textColors[i]) {
          textColor = textColors[i]
        } else if (textMode !== 'auto') {
          textColor = textMode
        } else {
          textColor = contrastColor(keyColor)
        }
        return { char: text[i] || '', keyColor, textColor }
      }),
    [letterCount, text, keyColors, textColors, textMode],
  )

  // Ubah warna keycap yang sedang dipilih
  const setKeyColor = (hex) => setKeyColors((c) => ({ ...c, [selected]: hex }))

  // Ubah warna huruf untuk slot yang sedang dipilih
  const setTextColor = (hex) => setTextColors((c) => ({ ...c, [selected]: hex }))

  // Ubah mode warna huruf (misal: 'auto')
  const setAllTextColor = (hexOrMode) => {
    setTextMode(hexOrMode)
    setTextColors({})
  }

  const feelingLucky = () => {
    const word = pick(LUCKY_WORDS).slice(0, MAX_LETTERS)
    setText(word)
    setCaseColor(pick(CASE_COLORS))
    setCaseType(pick(CASE_TYPES).id)
    setHanger(pick(HANGERS))
    const nextKeys = {}
    for (let i = 0; i < word.length; i++) nextKeys[i] = pick(LETTER_COLORS)
    setKeyColors(nextKeys)
    setTextColors({})
    setTextMode('auto')
  }

  const reset = () => {
    setTextState('')
    setLetterCount(4)
    setKeyColors({})
    setTextColors({})
    setHanger(HANGERS[0])
    setTextMode('auto')
    setSelected(0)
  }

  // Data siap masuk keranjang
  const toCartItem = () => ({ text, letterCount, caseType, caseColor, hanger, letters, price })

  return {
    text, setText, letterCount, changeCount,
    caseType, setCaseType, caseColor, setCaseColor,
    hanger, setHanger,
    textMode, setTextMode, textColors, setTextColor, setAllTextColor,
    letters, selected, setSelected,
    setKeyColor, feelingLucky, reset, toCartItem,
    price,
  }
}
