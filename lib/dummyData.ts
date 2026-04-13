export interface Product {
  id: number;
  nama: string;
  harga: number;
  hargaAsli?: number;
  rating: number;
  ulasan: number;
  img: string;
  toko: string;
  tokoId: number;
  suka: number;
  badge?: "best-seller" | "new" | null;
  type: "rekomendasi" | "terlaris" | "rating";
  deskripsi: string;
  varian?: string;
  terjual: string;
  jarak: string;
  waktu: string;
}

export interface Toko {
  id: number;
  nama: string;
  alamat: string;
  img: string;
  rating: number;
  terjual: string;
  jarak: string;
  waktu: string;
  suka: number;
}

// Flash sale data
export interface FlashSaleItem {
  id: number;
  nama: string;
  harga: number;
  hargaAsli: number;
  rating: number;
  ulasan: number;
  img: string;
  toko: string;
  tokoId: number;
  jarak: string;
  terjual: string;
  type: "rekomendasi" | "terlaris" | "sekitarmu";
  isBestSeller?: boolean;
}

export const FLASH_SALE_ITEMS: FlashSaleItem[] = [
  { id: 101, nama: "Nasi Campur", harga: 12000, hargaAsli: 18000, rating: 4.8, ulasan: 125, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", toko: "Dapur Mommy", tokoId: 2, jarak: "4km", terjual: "5RB+", type: "rekomendasi" },
  { id: 102, nama: "Nasi Sayur", harga: 20000, hargaAsli: 18000, rating: 4.8, ulasan: 125, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", toko: "Dapur Mommy", tokoId: 2, jarak: "200m", terjual: "8RB+", type: "rekomendasi" },
  { id: 103, nama: "Nama Ayam Telur", harga: 25000, hargaAsli: 18000, rating: 4.8, ulasan: 125, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, jarak: "2km", terjual: "10RB+", type: "rekomendasi" },
  { id: 104, nama: "Nama Ayam Telur", harga: 25000, hargaAsli: 18000, rating: 4.8, ulasan: 125, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", toko: "Harum Manis", tokoId: 4, jarak: "2km", terjual: "3RB+", type: "rekomendasi" },
  { id: 105, nama: "Seblak Bandung", harga: 15000, hargaAsli: 18000, rating: 4.8, ulasan: 125, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", toko: "Gulay Wowok", tokoId: 7, jarak: "2km", terjual: "12RB+", type: "terlaris", isBestSeller: true },
  { id: 106, nama: "Rendang", harga: 25000, hargaAsli: 18000, rating: 4.8, ulasan: 125, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", toko: "Harum Manis", tokoId: 4, jarak: "2km", terjual: "20RB+", type: "terlaris", isBestSeller: true },
  { id: 107, nama: "Gudeg", harga: 18000, hargaAsli: 18000, rating: 4.8, ulasan: 125, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", toko: "Dapur Mommy", tokoId: 2, jarak: "2km", terjual: "7RB+", type: "terlaris" },
  { id: 108, nama: "Makgon", harga: 250000, hargaAsli: 18000, rating: 4.8, ulasan: 125, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", toko: "Harum Manis", tokoId: 4, jarak: "2km", terjual: "2RB+", type: "terlaris" },
  { id: 109, nama: "Ayam Goreng Spesial", harga: 22000, hargaAsli: 28000, rating: 4.7, ulasan: 89, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, jarak: "1km", terjual: "15RB+", type: "sekitarmu", isBestSeller: true },
  { id: 110, nama: "Bakso Kuah", harga: 17000, hargaAsli: 22000, rating: 4.6, ulasan: 67, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", toko: "Gulay Wowok", tokoId: 7, jarak: "500m", terjual: "9RB+", type: "sekitarmu" },
  { id: 111, nama: "Mie Goreng Jawa", harga: 15000, hargaAsli: 20000, rating: 4.9, ulasan: 203, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", toko: "Gulay Wowok", tokoId: 7, jarak: "800m", terjual: "11RB+", type: "sekitarmu" },
];

// Toko menu categories
export interface TokoMenuCategory {
  id: string;
  label: string;
}

export interface TokoMenu {
  tokoId: number;
  categories: TokoMenuCategory[];
  produk: Product[];
}

export const TOKO_MENU_DATA: TokoMenu[] = [
  {
    tokoId: 5,
    categories: [
      { id: "semua", label: "Semua Menu" },
      { id: "makanan", label: "Makanan" },
      { id: "minuman", label: "Minuman" },
      { id: "paket", label: "Paket Hemat" },
    ],
    produk: [
      { id: 201, nama: "Ayam Paha Atas", harga: 17000, hargaAsli: 22000, rating: 5.0, ulasan: 341, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 1341, badge: null, type: "terlaris", deskripsi: "Ayam paha atas goreng renyah dengan bumbu rempah spesial.", varian: "Super Pedas", terjual: "25RB+", jarak: "320m", waktu: "12min" },
      { id: 202, nama: "Ayam Paha Bawah", harga: 15000, rating: 4.8, ulasan: 210, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 980, badge: null, type: "terlaris", deskripsi: "Ayam paha bawah goreng krispi dengan bumbu rahasia.", varian: "Original", terjual: "18RB+", jarak: "320m", waktu: "12min" },
      { id: 203, nama: "Ayam Dada Crispy", harga: 19000, rating: 4.7, ulasan: 156, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 765, badge: "best-seller", type: "rekomendasi", deskripsi: "Ayam dada crispy dengan saus spesial pilihan.", varian: "Super Pedas", terjual: "12RB+", jarak: "320m", waktu: "12min" },
      { id: 204, nama: "Ayam Sayap Goreng", harga: 13000, rating: 4.6, ulasan: 98, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 543, badge: null, type: "rekomendasi", deskripsi: "Sayap ayam goreng crispy cocok untuk camilan.", varian: "Original", terjual: "8RB+", jarak: "320m", waktu: "12min" },
      { id: 205, nama: "Es Teh Manis", harga: 5000, rating: 4.8, ulasan: 450, img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 2100, badge: null, type: "terlaris", deskripsi: "Es teh manis segar, cocok diminum bersama ayam goreng.", terjual: "50RB+", jarak: "320m", waktu: "5min" },
      { id: 206, nama: "Es Jeruk Segar", harga: 7000, rating: 4.7, ulasan: 320, img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 1450, badge: null, type: "rekomendasi", deskripsi: "Jeruk peras segar tanpa pengawet.", terjual: "30RB+", jarak: "320m", waktu: "5min" },
      { id: 207, nama: "Paket Hemat 1", harga: 30000, hargaAsli: 39000, rating: 4.9, ulasan: 178, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 890, badge: "best-seller", type: "rekomendasi", deskripsi: "1 Ayam Paha + Nasi + Es Teh. Hemat 23%!", varian: "Pilihan Rasa", terjual: "15RB+", jarak: "320m", waktu: "12min" },
      { id: 208, nama: "Paket Hemat 2", harga: 50000, hargaAsli: 65000, rating: 4.8, ulasan: 134, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 670, badge: null, type: "rekomendasi", deskripsi: "2 Ayam Paha + 2 Nasi + 2 Es Teh. Hemat 23%!", varian: "Pilihan Rasa", terjual: "9RB+", jarak: "320m", waktu: "15min" },
    ],
  },
];

export const TOKO_LIST: Toko[] = [
  { id: 1, nama: "Rajanya Bakpao", alamat: "Jl.Limau Tenggara no.45", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", rating: 5, terjual: "10RB+", jarak: "240m", waktu: "15min", suka: 1341 },
  { id: 2, nama: "Dapur Mommy", alamat: "Jl.Kopral Sayom no.80", img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80", rating: 5, terjual: "11RB+", jarak: "140m", waktu: "10min", suka: 1567 },
  { id: 3, nama: "Sate Ayam Pak Lurah", alamat: "Jl.Ahmad Yani no.47", img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80", rating: 5, terjual: "10RB+", jarak: "240m", waktu: "15min", suka: 1341 },
  { id: 4, nama: "Harum Manis", alamat: "Jl.Limau Tenggara no.45", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", rating: 5, terjual: "10RB+", jarak: "240m", waktu: "15min", suka: 1341 },
  { id: 5, nama: "Ayam Goreng 39", alamat: "Jl.Merdeka no.39", img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", rating: 5, terjual: "15RB+", jarak: "320m", waktu: "12min", suka: 2140 },
  { id: 6, nama: "Burjo Oneway 69", alamat: "Jl.Diponegoro no.69", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", rating: 4, terjual: "8RB+", jarak: "500m", waktu: "20min", suka: 890 },
  { id: 7, nama: "Gulay Wowok", alamat: "Jl.Sudirman no.12", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", rating: 5, terjual: "6RB+", jarak: "180m", waktu: "8min", suka: 675 },
];

export const PRODUK_LIST: Product[] = [
  { id: 1, nama: "Mie Ayam Bakso", harga: 25000, rating: 4.8, ulasan: 125, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 1341, badge: "best-seller", type: "rekomendasi", deskripsi: "Mie ayam lembut dengan bakso sapi pilihan, kuah gurih khas.", varian: "Super Pedas", terjual: "10RB+", jarak: "240m", waktu: "15min" },
  { id: 2, nama: "Nasi Campur Bali", harga: 35000, rating: 4.9, ulasan: 80, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", toko: "Dapur Mommy", tokoId: 2, suka: 892, badge: "new", type: "rekomendasi", deskripsi: "Nasi campur khas Bali dengan lawar, sate lilit, dan sambal matah segar.", terjual: "5RB+", jarak: "140m", waktu: "10min" },
  { id: 3, nama: "Rawon Daging", harga: 40000, rating: 4.7, ulasan: 210, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", toko: "Harum Manis", tokoId: 4, suka: 2140, badge: null, type: "terlaris", deskripsi: "Rawon hitam pekat dari kluwek asli dengan daging sapi empuk.", terjual: "20RB+", jarak: "240m", waktu: "15min" },
  { id: 4, nama: "Soto Lamongan", harga: 20000, rating: 4.8, ulasan: 150, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", toko: "Dapur Mommy", tokoId: 2, suka: 765, badge: null, type: "rating", deskripsi: "Soto bening khas Lamongan dengan ayam suwir, telur, dan koya gurih.", terjual: "12RB+", jarak: "140m", waktu: "10min" },
  { id: 5, nama: "Sate Ayam Madura", harga: 25000, rating: 4.6, ulasan: 95, img: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80", toko: "Sate Ayam Pak Lurah", tokoId: 3, suka: 430, badge: null, type: "rekomendasi", deskripsi: "Sate ayam dengan bumbu kacang khas Madura, manis dan gurih.", terjual: "8RB+", jarak: "240m", waktu: "15min" },
  { id: 6, nama: "Gado-Gado Spesial", harga: 18000, rating: 4.9, ulasan: 110, img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80", toko: "Dapur Mommy", tokoId: 2, suka: 1200, badge: "best-seller", type: "terlaris", deskripsi: "Gado-gado segar dengan bumbu kacang homemade dan lontong.", terjual: "15RB+", jarak: "140m", waktu: "10min" },
  { id: 7, nama: "Ayam Paha Atas", harga: 17000, hargaAsli: 22000, rating: 5.0, ulasan: 341, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80", toko: "Ayam Goreng 39", tokoId: 5, suka: 1341, badge: null, type: "terlaris", deskripsi: "Ayam paha atas goreng renyah dengan bumbu rempah spesial.", varian: "Super Pedas", terjual: "25RB+", jarak: "320m", waktu: "12min" },
  { id: 8, nama: "Nasi Goreng Spesial", harga: 22000, rating: 4.8, ulasan: 178, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", toko: "Burjo Oneway 69", tokoId: 6, suka: 980, badge: null, type: "rating", deskripsi: "Nasi goreng dengan telur mata sapi, ayam, dan sambal terasi.", terjual: "9RB+", jarak: "500m", waktu: "20min" },
  { id: 9, nama: "Bakpao Coklat", harga: 15000, rating: 4.7, ulasan: 88, img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", toko: "Rajanya Bakpao", tokoId: 1, suka: 543, badge: "new", type: "rekomendasi", deskripsi: "Bakpao lembut isi coklat premium, hanget dan gurih.", terjual: "7RB+", jarak: "240m", waktu: "15min" },
  { id: 10, nama: "Dimsum Mentai", harga: 15000, rating: 4.8, ulasan: 92, img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&q=80", toko: "Rajanya Bakpao", tokoId: 1, suka: 765, badge: "best-seller", type: "terlaris", deskripsi: "Dimsum dengan saus mentai creamy, maknyus!", terjual: "12RB+", jarak: "240m", waktu: "15min" },
  { id: 11, nama: "Martabak Coklat Keju", harga: 45000, rating: 4.9, ulasan: 203, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80", toko: "Harum Manis", tokoId: 4, suka: 1890, badge: "best-seller", type: "rating", deskripsi: "Martabak tebal lembut isi coklat dan keju mozzarella.", terjual: "18RB+", jarak: "240m", waktu: "15min" },
  { id: 12, nama: "Bakso Spesial", harga: 20000, rating: 4.6, ulasan: 145, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400&q=80", toko: "Gulay Wowok", tokoId: 7, suka: 543, badge: null, type: "terlaris", deskripsi: "Bakso kenyal dengan kuah kaldu sapi yang segar.", terjual: "11RB+", jarak: "180m", waktu: "8min" },
];

// Dummy cart items for keranjang page
export interface CartItemData {
  id: string;
  productId: number;
  nama: string;
  harga: number;
  img: string;
  toko: string;
  tokoId: number;
  varian: string;
  qty: number;
  checked: boolean;
}

export const DUMMY_CART_ITEMS: CartItemData[] = [
  { id: "c1", productId: 7, nama: "Ayam Paha Atas", harga: 17000, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=80", toko: "Ayam Goreng 39", tokoId: 5, varian: "Super Pedas", qty: 1, checked: false },
  { id: "c2", productId: 7, nama: "Ayam Paha Bandung", harga: 18000, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=80", toko: "Ayam Goreng 39", tokoId: 5, varian: "Super Pedas Jeletot", qty: 3, checked: false },
  { id: "c3", productId: 8, nama: "Nasgor Goreng", harga: 17000, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&q=80", toko: "Burjo Oneway 69", tokoId: 6, varian: "Super Pedas", qty: 1, checked: false },
  { id: "c4", productId: 12, nama: "Roti Jala Maklimak Biadap", harga: 17000, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80", toko: "Gulay Wowok", tokoId: 7, varian: "Super Pedas", qty: 1, checked: false },
];

export const VOUCHERS = [
  { id: "v1", judul: "Potongan Biaya Menu", desc: "Nikmati diskon 20% untuk seluruh menu! Maksimal diskon Rp15.000 dengan minimal belanja Rp50.000.", berlaku: "Berlaku hingga 19.00", diskon: 10000, img: "assets/images/promo-1", tipe: "menu" },
  { id: "v2", judul: "Potongan Biaya Menu", desc: "Nikmati diskon 20% untuk seluruh menu! Maksimal diskon Rp15.000 dengan minimal belanja Rp50.000.", berlaku: "Berlaku hingga 19.00", diskon: 10000, img: "assets/images/promo-2", tipe: "menu" },
  { id: "v3", judul: "Potongan Biaya Minuman", desc: "Nikmati diskon 20% untuk seluruh minuman! Maksimal diskon Rp15.000 dengan minimal belanja Rp50.000.", berlaku: "Hingga 25-05-2027", diskon: 15000, img: "assets/images/promo-1", tipe: "minuman" },
  { id: "v4", judul: "Potongan Biaya Minuman", desc: "Nikmati diskon 20% untuk seluruh minuman! Maksimal diskon Rp15.000 dengan minimal belanja Rp50.000.", berlaku: "Hingga 25-05-2027", diskon: 15000, img: "assets/images/promo-2", tipe: "minuman" },
  { id: "v5", judul: "Potongan Biaya Menu", desc: "Nikmati diskon 20% untuk seluruh menu! Maksimal diskon Rp15.000 dengan minimal belanja Rp50.000.", berlaku: "Berlaku hingga 19.00", diskon: 10000, img: "assets/images/promo-1", tipe: "menu" },
  { id: "v6", judul: "Potongan Biaya Menu", desc: "Nikmati diskon 20% untuk seluruh menu! Maksimal diskon Rp15.000 dengan minimal belanja Rp50.000.", berlaku: "Berlaku hingga 19.00", diskon: 10000, img: "assets/images/promo-2", tipe: "menu" },
  { id: "v7", judul: "Potongan Biaya Menu", desc: "Nikmati diskon 20% untuk seluruh menu! Maksimal diskon Rp15.000 dengan minimal belanja Rp50.000.", berlaku: "Berlaku hingga 19.00", diskon: 10000, img: "assets/images/promo-1", tipe: "menu" },
  { id: "v8", judul: "Potongan Biaya Menu", desc: "Nikmati diskon 20% untuk seluruh menu! Maksimal diskon Rp15.000 dengan minimal belanja Rp50.000.", berlaku: "Berlaku hingga 19.00", diskon: 10000, img: "assets/images/promo-2", tipe: "menu" },
];

// Ganti baris terakhir kamu dengan ini agar lebih aman
export function formatRupiah(n: number): string {
  if (typeof n !== 'number') return "Rp0";
  return "Rp" + n.toLocaleString("id-ID");
}