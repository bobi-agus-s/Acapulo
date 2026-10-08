# Klug Klug – Panduan Edit Sendiri

Jalankan dulu (di PowerShell, folder projek):

```powershell
$env:NODE_OPTIONS="--use-system-ca"   # hanya kalau npm error SSL
npm.cmd install                        # sekali saja
npm.cmd run dev                        # buka http://localhost:5173
```

Setiap file disimpan, browser otomatis update. Tidak perlu restart.

## Mau ubah apa? Buka file mana?

| Mau ubah | File | Caranya |
|---|---|---|
| Nomor WA, link Shopee, nama toko, harga | `src/data/config.js` | Ganti nilai `whatsappNumber`, `shopeeUrl`, `PRICE_PER_ITEM` |
| Tambah / hapus series produk | `src/data/series.js` | Tambah/hapus satu objek `{ id, name, emoji, color }` |
| Tambah warna case | `src/data/cases.js` | Tambah objek di `CASE_COLORS` |
| Tambah warna huruf | `src/data/colors.js` | Tambah kode hex di `LETTER_COLORS` |
| Kata acak tombol Feeling Lucky | `src/data/colors.js` | Edit `LUCKY_WORDS` |
| Warna tema (pink, kuning, dll) | `tailwind.config.js` | Edit bagian `colors.brand` |
| Font | `index.html` + `tailwind.config.js` | Ganti link Google Fonts + `fontFamily` |
| Warna background | `src/index.css` | Edit `bg-[#FFF4E0]` (terang) / `bg-[#161233]` (gelap) |
| Teks judul landing | `src/features/landing/LandingPage.jsx` | Edit `TITLE` dan `MARQUEE` |
| Format pesan WhatsApp | `src/utils/order.js` | Edit `formatOrderLine` / `whatsappLink` |

## Resep umum

### 1. Ganti emoji series jadi foto produk asli
1. Taruh gambar di `public/series/` (misal `button.png`).
2. Di `src/data/series.js`, tambah `image: '/series/button.png'` ke objeknya.
3. Di `src/features/landing/SeriesCard.jsx`, ganti
   `<span ...>{series.emoji}</span>` jadi
   `<img src={series.image} className="h-full w-full rounded-2xl object-cover" />`

### 2. Harga beda tiap series
1. Di `series.js`, tambah `price: 40000` per series.
2. Di `OrderBar.jsx` dan `CartContext.jsx`, pakai `series.price` ganti `PRICE_PER_ITEM`.

### 3. Tambah tab baru di builder (misal "Charm")
1. Buat `src/features/builder/panels/CharmPanel.jsx` (contoh: tiru `TextPanel.jsx`).
2. Di `BuilderPage.jsx`:
   - tambah `{ id: 'charm', label: 'Charm' }` ke `TABS`
   - tambah `charm: <CharmPanel builder={builder} />` ke `panels`
3. Kalau butuh state baru, tambah di `useBuilder.js`.
4. Ubah `grid-cols-3` di `components/ui/Tabs.jsx` jadi `grid-cols-4`.

### 4. Bikin komponen reusable sendiri
Pakai komponen di `components/ui/`:
```jsx
<Button variant="pink" size="lg" onClick={...}>Teks</Button>
<IconButton color="#FFD93D">⭐</IconButton>
<Drawer open={open} onClose={...} title="Judul">...</Drawer>
```
Variant `Button`: pink, yellow, blue, purple, green, orange, white, dark.

### 5. Atur kecepatan / gaya animasi
- Hover/klik: lihat `whileHover` dan `whileTap` di komponen.
- Pegas: `stiffness` lebih besar = lebih cepat, `damping` lebih kecil = lebih membal.
- Animasi looping CSS (float, marquee, dll): `tailwind.config.js` bagian `keyframes`.

## Deploy
`npm.cmd run build` lalu upload folder `dist/` ke Netlify, Vercel, atau GitHub Pages.
