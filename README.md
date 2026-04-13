# 🛒 Market Kita — Next.js App

Konversi lengkap dari HTML/CSS/JS ke **React + Next.js 15 (App Router)** dengan TypeScript dan Tailwind CSS.

## 🚀 Cara Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## 📁 Struktur Halaman

### Buyer (Pembeli)
| URL | Deskripsi | HTML Asal |
|-----|-----------|-----------|
| `/` | Beranda (Promo, Flash Sale, Menu Tab) | `index.html` |
| `/buyer/chatbot` | ChatBot AI rekomendasi | `chatbot.html` |
| `/buyer/chat-toko` | Chat dengan penjual | `chat-toko.html` |
| `/buyer/detail-menu` | Detail produk + tambah ke keranjang | `detail-menu.html` |
| `/buyer/explore` | Explore lokasi peta interaktif | `explore-location.html` |
| `/buyer/flashsale` | Halaman Flash Sale + countdown | `flashsale.html` |
| `/buyer/keranjang` | Keranjang belanja (5 tab) | `keranjang.html` |
| `/buyer/keranjang/konfirmasi` | Konfirmasi & ubah pesanan | `konfirmasi-pembayaran.html` |
| `/buyer/keranjang/bayar` | Menunggu pembayaran QR + countdown | `menunggu-pembayaran.html` |
| `/buyer/notifikasi` | Notifikasi per grup waktu | `notifikasi.html` |
| `/buyer/profil` | Profil lengkap (sidebar + panel) | `edit-profil.html` |
| `/buyer/search` | Hasil pencarian toko & menu | `search-results.html` |
| `/buyer/toko` | Profil toko + rekomendasi menu | `profil-toko.html` |

### Auth
| URL | Deskripsi | HTML Asal |
|-----|-----------|-----------|
| `/auth/login` | Halaman masuk | `login.html` |
| `/auth/register` | Daftar (pilih peran → step 1 → step 2) | `pilih-peran.html` + `register-pembeli-*.html` |

### Seller (Penjual)
| URL | Deskripsi | HTML Asal |
|-----|-----------|-----------|
| `/seller/home` | Kanban pesanan cepat | `seller-home.html` |
| `/seller/dashboard` | Dashboard statistik + chart | `seller-dashboard.html` |
| `/seller/menu` | Kelola menu (filter, stok) | `seller-menu.html` |
| `/seller/menu/tambah` | Tambah/edit menu | `seller-tambah-menu.html` |
| `/seller/pesanan` | List pesanan + timer | `seller-pesanan.html` |
| `/seller/pesanan/detail` | Detail pesanan | `seller-detail-pesanan.html` |
| `/seller/penawaran` | Promo, Flash Sale, Event | `seller-penawaran.html` |
| `/seller/penawaran/tambah` | Tambah promo | `seller-tambah-promo.html` |
| `/seller/kasir` | Aplikasi kasir POS | `seller-kasir.html` |
| `/seller/chat` | Chat dengan pembeli | `seller-chat.html` |
| `/seller/notifikasi` | Notifikasi seller | `seller-notif.html` |
| `/seller/profil` | Profil toko + rating bars | `seller-profil.html` |

## 🏗️ Arsitektur

```
market-kita/
├── app/
│   ├── layout.tsx           # Root layout (Remixicon, Google Fonts)
│   ├── globals.css          # Global styles + seller shared CSS
│   ├── page.tsx             # Homepage
│   ├── auth/                # Login & Register
│   ├── buyer/               # Semua halaman pembeli
│   └── seller/              # Semua halaman penjual
│       └── layout.tsx       # Seller layout (header + sidebar)
├── components/
│   ├── buyer/Header.tsx     # Header navbar buyer
│   └── seller/
│       ├── Header.tsx       # Header navbar seller
│       └── Sidebar.tsx      # Sidebar navigasi seller
└── lib/
    └── data.ts              # Master data produk + formatRupiah
```

## 🛠️ Tech Stack

- **Next.js 15** — App Router
- **React 19** — Client Components (`"use client"`)
- **TypeScript** — Type-safe
- **Tailwind CSS** — Utility-first styling
- **Remixicon** — Icon library (CDN)

## ✅ Fitur yang Dikonversi

- ✅ Semua navigasi (Link antar halaman)
- ✅ State management (useState, useEffect)
- ✅ Timer countdown (Flash Sale, Pembayaran, Pesanan)
- ✅ Kanban board drag & accept/reject
- ✅ Chat real-time simulasi
- ✅ Kasir POS dengan modal pembayaran
- ✅ Filter & search menu
- ✅ Toggle like/favorit
- ✅ Toast notification
- ✅ Responsive layout
