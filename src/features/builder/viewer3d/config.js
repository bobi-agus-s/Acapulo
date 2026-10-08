// Pengaturan preview 3D. Kalau STL kamu tampil terbalik / miring / ukurannya aneh, ubah di sini.

// Lokasi file STL base clicker (taruh file di folder public/models/)
export const BASE_MODEL_URL = '/models/clicker-base.stl'

// Tinggi base di dunia 3D (satuan bebas, hanya untuk skala tampilan)
export const BASE_HEIGHT = 4

// true  = otomatis memutar model supaya sisi terpanjang jadi tinggi (vertikal)
// false = pakai orientasi asli dari file STL
export const AUTO_ORIENT = true

// Putaran tambahan (radian) setelah auto-orient. Contoh:
//   Base terbalik (atas di bawah)   -> [0, 0, Math.PI]
//   Depan & belakang tertukar       -> [0, Math.PI, 0]
//   Model rebah ke samping          -> [Math.PI / 2, 0, 0]
export const EXTRA_ROTATION = [0, 0, 0]

// Area keycap di muka base
export const KEY_AREA_RATIO = 0.8 // berapa % tinggi base yang dipakai keycap (0-1)
export const KEY_AREA_OFFSET_Y = 0 // geser area keycap naik(+)/turun(-)
export const KEY_WIDTH_RATIO = 0.7 // lebar keycap maksimal dibanding lebar base
export const KEY_SINK = 0.3 // seberapa dalam keycap "tenggelam" ke muka base (0-1)

// Tinggi gantungan di atas base
export const HANGER_HEIGHT = { ring: 1.1, chain: 1.6, strap: 1.1 }
// Geser gantungan turun(-)/naik(+) kalau base punya lubang pengait sendiri
export const HANGER_OFFSET_Y = 0

// Base contoh kalau file STL belum ada (lebar, tinggi, tebal)
export const FALLBACK_DIMS = { w: 1.7, h: BASE_HEIGHT, d: 0.5 }
