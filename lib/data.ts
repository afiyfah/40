// lib/data.ts — Master data untuk seluruh aplikasi

export interface Product {
  id: number;
  nama: string;
  harga: number;
  rating: number;
  ulasan: number;
  img: string;
  toko: string;
  suka: number;
  badge?: string | null;
  type: string;
  deskripsi: string;
}

export const MASTER_PRODUK: Product[] = [
  { id: 1, nama: "Mie Ayam Bakso", harga: 25000, rating: 4.8, ulasan: 125, img: "/assets/images/makanan2.png", toko: "Ayam Goreng 39", suka: 1341, badge: "/assets/images/badge-best-seller.png", type: "rekomendasi", deskripsi: "Mie ayam lembut dengan bakso sapi pilihan, kuah gurih khas." },
  { id: 2, nama: "Nasi Campur Bali", harga: 35000, rating: 4.9, ulasan: 80, img: "/assets/images/makanan2.png", toko: "Ayam Goreng 39", suka: 892, badge: "/assets/images/badge-new.png", type: "rekomendasi", deskripsi: "Nasi campur khas Bali dengan lawar, sate lilit, dan sambal matah segar." },
  { id: 3, nama: "Rawon Daging", harga: 40000, rating: 4.7, ulasan: 210, img: "/assets/images/rawon.png", toko: "Dapur Nusantara", suka: 2140, badge: null, type: "terlaris", deskripsi: "Rawon hitam pekat dari kluwek asli dengan daging sapi empuk." },
  { id: 4, nama: "Soto Lamongan", harga: 20000, rating: 4.8, ulasan: 150, img: "/assets/images/daging.png", toko: "Warung Soto Pak Min", suka: 765, badge: null, type: "rating", deskripsi: "Soto bening khas Lamongan dengan ayam suwir, telur, dan koya gurih." },
  { id: 5, nama: "Sate Ayam Madura", harga: 25000, rating: 4.6, ulasan: 95, img: "/assets/images/makanan2.png", toko: "Sate H. Mamat", suka: 430, badge: null, type: "rekomendasi", deskripsi: "Sate ayam dengan bumbu kacang khas Madura, manis dan gurih." },
  { id: 6, nama: "Gado-Gado", harga: 18000, rating: 4.9, ulasan: 110, img: "/assets/images/mie-ayam.png", toko: "Bu Sari Kitchen", suka: 1200, badge: "/assets/images/badge-best-seller.png", type: "terlaris", deskripsi: "Gado-gado segar dengan bumbu kacang homemade dan lontong." },
  { id: 7, nama: "Ayam Paha Atas", harga: 15000, rating: 5.0, ulasan: 341, img: "/assets/images/makanan2.png", toko: "Ayam Goreng 39", suka: 1341, badge: null, type: "terlaris", deskripsi: "Ayam paha atas goreng renyah dengan bumbu rempah spesial." },
  { id: 8, nama: "Nasi Goreng Spesial", harga: 22000, rating: 4.8, ulasan: 178, img: "/images/daging.png", toko: "Ayam Goreng 39", suka: 980, badge: null, type: "rating", deskripsi: "Nasi goreng dengan telur mata sapi, ayam, dan sambal terasi." },
];

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
}
