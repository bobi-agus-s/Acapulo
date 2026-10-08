// Gambar bagian gantungan di atas bingkai clicker, sesuai jenis yang dipilih.
export default function Hanger({ type }) {
  if (type === 'chain') {
    return (
      <div className="flex flex-col items-center -mb-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-7 rounded-full border-[4px] border-ink bg-white/40 shadow-sticker-sm ${
              i ? '-mt-2' : ''
            } ${i % 2 ? 'w-3.5' : 'w-5'}`}
          />
        ))}
      </div>
    )
  }

  if (type === 'strap') {
    return (
      <div className="flex flex-col items-center -mb-2">
        <div className="h-12 w-7 rounded-t-full border-[6px] border-b-0 border-brand-pink drop-shadow-[2px_2px_0_#1B1530]" />
        <div className="h-2.5 w-10 rounded-md border-[2.5px] border-ink bg-brand-yellow" />
      </div>
    )
  }

  // default: ring (cincin klasik)
  return (
    <div className="flex flex-col items-center -mb-3 z-20">
      <div className="h-10 w-10 rounded-full border-[5px] border-ink bg-transparent shadow-sticker-sm" />
    </div>
  )
}
