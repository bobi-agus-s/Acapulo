// Versi kecil gantungan kunci untuk thumbnail (keranjang, dll)
export default function MiniKeychain({ item }) {
  return (
    <div
      style={{ backgroundColor: item.caseColor.bg }}
      className="flex h-16 w-16 flex-wrap content-center items-center justify-center gap-0.5 rounded-2xl border-[3px] border-ink p-1"
    >
      {item.letters.map((l, i) => (
        <span
          key={i}
          style={{ backgroundColor: l.keyColor, color: l.textColor }}
          className="grid h-4 w-4 place-items-center rounded border border-ink font-display text-[10px] leading-none"
        >
          {l.char || '·'}
        </span>
      ))}
    </div>
  )
}
