import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { playClick } from '../../utils/sound'

// Dimensi potong aset asli (284 x 374 px)
const SRC_W = 284
const BASE_H = 374
const BODY_START = 96
const BODY_H = BASE_H - BODY_START // 278
const PITCH = 275 // Jarak antar slot pod modular
const FIRST_SHIFT = 370 // Posisi slot 1 di bawah slot 0 (memberikan overlap 4px rapat tanpa celah)

export function getSlotDstY(s) {
  if (s === 0) return 0
  return FIRST_SHIFT + (s - 1) * PITCH
}

export function getTotalSrcH(slotCount) {
  if (slotCount <= 1) return BASE_H
  return getSlotDstY(slotCount - 1) + BODY_H
}

export function getSlotCenterY(i) {
  if (i === 0) return 236
  return FIRST_SHIFT + (i - 1) * PITCH + (236 - BODY_START)
}

// Gambar base modular bertingkat dan warnai dengan manipulasi piksel langsung
export function renderBaseCanvas(canvas, img, slotCount, hexColor) {
  const totalSrcH = getTotalSrcH(slotCount)
  canvas.width = SRC_W
  canvas.height = totalSrcH
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, SRC_W, totalSrcH)

  // 1. Gambar modular dari slot terbawah ke slot teratas (agar sambungan rapi)
  for (let s = slotCount - 1; s >= 0; s--) {
    const dstY = getSlotDstY(s)
    const srcY = s === 0 ? 0 : BODY_START
    const curH = s === 0 ? BASE_H : BODY_H
    ctx.drawImage(img, 0, srcY, SRC_W, curH, 0, dstY, SRC_W, curH)
  }

  // 2. Pewarnaan 3D langsung ke data piksel (Multiply blend)
  const imgData = ctx.getImageData(0, 0, SRC_W, totalSrcH)
  const d = imgData.data
  const cleanHex = (hexColor || '#F1EDE4').replace('#', '')
  const tr = parseInt(cleanHex.slice(0, 2), 16) / 255
  const tg = parseInt(cleanHex.slice(2, 4), 16) / 255
  const tb = parseInt(cleanHex.slice(4, 6), 16) / 255

  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] > 0) {
      d[i] = Math.round(d[i] * tr)
      d[i + 1] = Math.round(d[i + 1] * tg)
      d[i + 2] = Math.round(d[i + 2] * tb)
    }
  }
  ctx.putImageData(imgData, 0, 0)
}

// Cache canvas keycap berwarna untuk efisiensi
const keycapCache = new Map()

export function getColoredKeycap(img, hexColor) {
  const key = hexColor || '#FFFFFF'
  if (keycapCache.has(key)) return keycapCache.get(key)

  const c = document.createElement('canvas')
  c.width = img.width
  c.height = img.height
  const ctx = c.getContext('2d')
  ctx.drawImage(img, 0, 0)

  const imgData = ctx.getImageData(0, 0, c.width, c.height)
  const d = imgData.data
  const cleanHex = key.replace('#', '')
  const tr = parseInt(cleanHex.slice(0, 2), 16) / 255
  const tg = parseInt(cleanHex.slice(2, 4), 16) / 255
  const tb = parseInt(cleanHex.slice(4, 6), 16) / 255

  for (let i = 0; i < d.length; i += 4) {
    if (d[i + 3] > 0) {
      d[i] = Math.round(d[i] * tr)
      d[i + 1] = Math.round(d[i + 1] * tg)
      d[i + 2] = Math.round(d[i + 2] * tb)
    }
  }
  ctx.putImageData(imgData, 0, 0)
  const dataUrl = c.toDataURL()
  keycapCache.set(key, dataUrl)
  return dataUrl
}

export default function ClickerBaseCase({ builder, renderedWidth = 160 }) {
  const { letters, caseColor, selected, setSelected } = builder
  const canvasRef = useRef(null)
  const [baseImg, setBaseImg] = useState(null)
  const [keycapImg, setKeycapImg] = useState(null)

  // Load aset gambar base dan keycap 3D
  useEffect(() => {
    const bImg = new Image()
    bImg.src = '/assets/clicker-base.png'
    bImg.onload = () => setBaseImg(bImg)

    const kImg = new Image()
    kImg.src = '/assets/keycap-base.png'
    kImg.onload = () => setKeycapImg(kImg)
  }, [])

  // Render ulang setiap jumlah huruf atau warna case berubah
  useEffect(() => {
    if (!baseImg || !canvasRef.current) return
    renderBaseCanvas(canvasRef.current, baseImg, letters.length, caseColor?.bg || '#F1EDE4')
  }, [baseImg, letters.length, caseColor])

  const totalSrcH = getTotalSrcH(letters.length)
  const scale = renderedWidth / SRC_W
  const renderedHeight = totalSrcH * scale

  // Ukuran keycap di layar: 0.64 agar hampir memenuhi seluruh lubang rongga base (sesuai barang fisik asli)
  const keySize = renderedWidth * 0.64

  const press = (i) => {
    setSelected(i)
    playClick()
  }

  return (
    <div
      className="relative select-none drop-shadow-[0_12px_16px_rgba(27,21,48,0.28)]"
      style={{ width: renderedWidth, height: renderedHeight }}
    >
      {/* Canvas Base 3D */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full object-contain"
      />

      {/* Tombol Keycap 3D realistis ditempatkan pas di tengah lubang masing-masing pod */}
      <AnimatePresence mode="popLayout">
        {letters.map((l, i) => {
          const slotCenterY = getSlotCenterY(i)
          const topPercent = (slotCenterY / totalSrcH) * 100
          const keycapSrc = keycapImg ? getColoredKeycap(keycapImg, l.keyColor) : null

          return (
            <div
              key={i}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{
                top: `${topPercent}%`,
                left: '50%',
                width: keySize,
                height: keySize,
              }}
            >
              <motion.button
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ y: 3, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                onClick={() => press(i)}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                className="group relative grid h-full w-full place-items-center rounded-2xl outline-none"
              >
                {/* Visual Keycap 3D asli yang diwarnai dinamis */}
                {keycapSrc ? (
                  <img
                    src={keycapSrc}
                    alt="keycap"
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.22)]"
                  />
                ) : (
                  <div
                    className="absolute inset-0 rounded-2xl border-[3px] border-ink"
                    style={{ backgroundColor: l.keyColor }}
                  />
                )}

                {/* Highlight outline jika tombol sedang dipilih untuk diedit */}
                {selected === i && (
                  <div className="pointer-events-none absolute -inset-1 rounded-2xl border-[3px] border-[#FF2E93] animate-pulse" />
                )}

                {/* Huruf Abjad Timbul (Embossed 3D) di atas piringan keycap */}
                <motion.span
                  key={l.char}
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  style={{
                    color: l.textColor,
                    fontSize: keySize * 0.52,
                    textShadow:
                      l.textColor === '#FFFFFF' || l.textColor === '#ffffff'
                        ? '0 2px 3px rgba(0,0,0,0.45), 0 1px 0 rgba(0,0,0,0.6)'
                        : '0 1px 2px rgba(255,255,255,0.7), 0 2px 3px rgba(0,0,0,0.3)',
                  }}
                  className="relative z-10 font-display font-black leading-none drop-shadow-sm"
                >
                  {l.char || <span className="opacity-30">·</span>}
                </motion.span>
              </motion.button>
            </div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
