import { renderBaseCanvas, getSlotCenterY } from '../features/builder/ClickerBaseCase'

// Download PNG clicker kustom beresolusi tinggi dengan base realistis dan proporsional
export function downloadKeychain({ letters, caseColor, hanger }, filename = 'clicker-custom.png') {
  const baseImg = new Image()
  baseImg.src = '/assets/clicker-base.png'
  baseImg.onload = () => {
    const slotCount = letters.length
    const offscreen = document.createElement('canvas')
    renderBaseCanvas(offscreen, baseImg, slotCount, caseColor?.bg || '#F1EDE4')

    const W = 600
    const baseW = 320
    const scale = baseW / offscreen.width
    const baseH = offscreen.height * scale
    const hangerH = 140
    const H = baseH + hangerH + 80

    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')

    // Background
    ctx.fillStyle = '#FFF4E0'
    ctx.fillRect(0, 0, W, H)

    const cx = W / 2
    const baseY = hangerH

    // 1. Gambar Gantungan di atas
    ctx.strokeStyle = '#1B1530'
    ctx.lineCap = 'round'
    const type = hanger?.id || 'ring'
    if (type === 'chain') {
      ctx.lineWidth = 12
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.ellipse(cx, 40 + i * 36, i % 2 ? 10 : 22, 26, 0, 0, Math.PI * 2)
        ctx.stroke()
      }
    } else if (type === 'strap') {
      ctx.strokeStyle = '#FF2E93'
      ctx.lineWidth = 20
      ctx.beginPath()
      ctx.moveTo(cx - 36, baseY + 30)
      ctx.lineTo(cx - 36, 60)
      ctx.arc(cx, 60, 36, Math.PI, 0)
      ctx.lineTo(cx + 36, baseY + 30)
      ctx.stroke()

      ctx.fillStyle = '#FFD93D'
      ctx.strokeStyle = '#1B1530'
      ctx.lineWidth = 7
      ctx.beginPath()
      ctx.roundRect(cx - 44, baseY + 10, 88, 28, 8)
      ctx.fill()
      ctx.stroke()
    } else {
      // Ring
      ctx.lineWidth = 16
      ctx.beginPath()
      ctx.arc(cx, baseY + 20, 54, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 2. Gambar Base Clicker Realistis
    ctx.drawImage(offscreen, cx - baseW / 2, baseY, baseW, baseH)

    // 3. Gambar Keycap di tiap slot
    const totalSrcH = offscreen.height
    const keySize = baseW * 0.64

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${keySize * 0.58}px "Lilita One", sans-serif`

    letters.forEach((l, i) => {
      const slotCenterY = getSlotCenterY(i)
      const ky = baseY + (slotCenterY / totalSrcH) * baseH
      const kx = cx

      // Bayangan keycap
      ctx.fillStyle = '#1B1530'
      ctx.beginPath()
      ctx.roundRect(kx - keySize / 2, ky - keySize / 2 + 6, keySize, keySize, 18)
      ctx.fill()

      // Bodi keycap
      ctx.fillStyle = l.keyColor
      ctx.lineWidth = 6
      ctx.strokeStyle = '#1B1530'
      ctx.beginPath()
      ctx.roundRect(kx - keySize / 2, ky - keySize / 2, keySize, keySize, 18)
      ctx.fill()
      ctx.stroke()

      // Highlight kilau 3D
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)'
      ctx.beginPath()
      ctx.roundRect(kx - keySize / 2 + 6, ky - keySize / 2 + 4, keySize - 12, keySize * 0.25, 8)
      ctx.fill()

      // Huruf
      ctx.fillStyle = l.textColor
      ctx.fillText(l.char || '·', kx, ky + 2)
    })

    const a = document.createElement('a')
    a.download = filename
    a.href = canvas.toDataURL('image/png')
    a.click()
  }
}
