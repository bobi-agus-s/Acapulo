// Suara "klik" keycap, dibuat dengan WebAudio (tanpa file audio).
let ctx

export function playClick() {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(900, t)
    osc.frequency.exponentialRampToValueAtTime(180, t + 0.05)
    gain.gain.setValueAtTime(0.06, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.07)
  } catch {
    // browser tidak mendukung audio: abaikan saja
  }
}
