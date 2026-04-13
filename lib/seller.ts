export interface OrderItem {
  nama: string;
  qty: number;
  harga: number;
  varian?: string[];
  tambah?: string[];
}

export interface Order {
  id: string;
  col: 'm' | 'p';
  tipe: 'makan' | 'preorder' | 'reservasi';
  customer: string;
  phone: string;
  meja: string;
  items: OrderItem[];
  total: number;
  biayaLayanan: number;
  metode: string;
  dibayar: boolean;
  catatan: string;
  tanggal: string;
  waktu: number | null;
}

export const dummyOrders: Order[] = [
  {
    id: '172634', col: 'm', tipe: 'makan',
    customer: 'Pak Cucik', phone: '0812-3378-6767', meja: 'Meja 11',
    items: [
      { nama: 'Nasgor goreng magel belang', qty: 1, harga: 50000, varian: ['Pedas Sedang'], tambah: ['Tambah Telur Dadar'] },
      { nama: 'Ayam ayan spasial', qty: 2, harga: 40000, varian: ['Sambal Matah'], tambah: ['Nasi Uduk'] },
    ],
    total: 90000, biayaLayanan: 4500, metode: 'QRIS', dibayar: true,
    catatan: 'Mass jangan pakai sledri yaa sama minta acar makasihh',
    tanggal: '22/03/2026, 12:45 WIB', waktu: null,
  },
  {
    id: '167283', col: 'm', tipe: 'makan',
    customer: 'Zammud Saprudin', phone: '0856-2211-4433', meja: 'Meja 5',
    items: [
      { nama: 'Nasgor goreng magel belang', qty: 1, harga: 50000, varian: [], tambah: [] },
      { nama: 'Ayam ayan spasial', qty: 2, harga: 40000, varian: [], tambah: [] },
      { nama: 'Bebek Julepotan', qty: 1, harga: 33000, varian: [], tambah: [] },
    ],
    total: 123000, biayaLayanan: 6150, metode: 'QRIS', dibayar: true,
    catatan: '',
    tanggal: '22/03/2026, 12:20 WIB', waktu: null,
  },
  {
    id: '172634b', col: 'p', tipe: 'makan',
    customer: 'Pak Cucik', phone: '0812-3378-6767', meja: 'Meja 11',
    items: [
      { nama: 'Nasgor goreng magel belang', qty: 1, harga: 50000, varian: [], tambah: [] },
      { nama: 'Ayam ayan spasial', qty: 2, harga: 40000, varian: [], tambah: [] },
    ],
    total: 90000, biayaLayanan: 4500, metode: 'Qris', dibayar: true,
    catatan: 'Pedasnya dikurangin ya kak',
    tanggal: '22/03/2026, 12:10 WIB', waktu: 15 * 60,
  },
  {
    id: '167283b', col: 'p', tipe: 'makan',
    customer: 'Zammud Saprudin', phone: '0856-2211-4433', meja: 'Meja 5',
    items: [
      { nama: 'Nasgor goreng magel belang', qty: 1, harga: 50000, varian: [], tambah: [] },
      { nama: 'Ayam ayan spasial', qty: 2, harga: 40000, varian: [], tambah: [] },
      { nama: 'Bebek Julepotan', qty: 1, harga: 33000, varian: [], tambah: [] },
    ],
    total: 123000, biayaLayanan: 6150, metode: 'Debit', dibayar: false,
    catatan: '',
    tanggal: '22/03/2026, 12:00 WIB', waktu: 20 * 60,
  },
  {
    id: '172634c', col: 'p', tipe: 'makan',
    customer: 'Pak Cucik', phone: '0812-3378-6767', meja: 'Meja 3',
    items: [
      { nama: 'Nasgor goreng magel belang', qty: 1, harga: 50000, varian: [], tambah: [] },
      { nama: 'Ayam ayan spasial', qty: 2, harga: 40000, varian: [], tambah: [] },
    ],
    total: 90000, biayaLayanan: 4500, metode: 'Tunai', dibayar: true,
    catatan: '',
    tanggal: '22/03/2026, 11:55 WIB', waktu: 15 * 60,
  },
];

export interface MenuItem {
  id: number;
  nama: string;
  harga: number;
  kat: string;
  img: string;
  waktu?: string;
  terjual?: string;
  suka?: number;
  stok?: number;
  status?: 'aktif' | 'habis';
}

export const dummyMenu: MenuItem[] = [
  { id: 1, nama: 'Nasi Gudeg', harga: 20000, kat: 'makanan', img: '/images/mie-ayam.png', waktu: '15min', terjual: '10RB+', suka: 741, stok: 20, status: 'aktif' },
  { id: 2, nama: 'Nasi Goreng', harga: 15000, kat: 'makanan', img: '/images/makanan2.png', waktu: '15min', terjual: '10RB+', suka: 741, stok: 0, status: 'habis' },
  { id: 3, nama: 'Rawon Daging', harga: 25000, kat: 'makanan', img: '/images/rawon.png', waktu: '20min', terjual: '8RB+', suka: 520, stok: 20, status: 'aktif' },
  { id: 4, nama: 'Es Teh', harga: 3000, kat: 'minuman', img: '/images/promo-1.png', waktu: '5min', terjual: '20RB+', suka: 900, stok: 50, status: 'aktif' },
  { id: 5, nama: 'Es Jeruk', harga: 5000, kat: 'minuman', img: '/images/promo-2.png', waktu: '5min', terjual: '15RB+', suka: 750, stok: 40, status: 'aktif' },
];

export const notifData = [
  {
    grup: 'Hari Ini',
    items: [
      { icon: 'ri-shopping-cart-2-line', color: '#FB923C', bg: '#FFF7ED', judul: 'Pesan baru dari Watanabe', sub: '1x Ayam Paha Atas. Segera konfirmasi pesanan.', waktu: '5 menit yang lalu' },
      { icon: 'ri-calendar-check-line', color: '#22C55E', bg: '#F0FDF4', judul: 'Reservasi baru pukul 18.00', sub: 'Ada reservasi atas nama Juhoon untuk 2 orang pukul 18.00.', waktu: '5 menit yang lalu' },
    ]
  },
  {
    grup: 'Kemarin',
    items: [
      { icon: 'ri-chat-3-line', color: '#A855F7', bg: '#FAF5FF', judul: 'Pesan baru dari Nadia', sub: '"Apakah ayamnya ready?"', waktu: '5 menit yang lalu' },
    ]
  },
  {
    grup: 'Minggu Ini',
    items: [
      { icon: 'ri-star-line', color: '#EAB308', bg: '#FEFCE8', judul: 'Rating baru dari pelanggan', sub: 'Pelanggan memberi rating 5⭐ untuk menu Ayam Paha Atas.', waktu: '5 menit yang lalu' },
      { icon: 'ri-wallet-3-line', color: '#EE8F36', bg: '#FFF7ED', judul: 'Pembayaran Ditransfer', sub: 'Saldo penjualan minggu ini telah ditransfer ke akun Anda.', waktu: '5 menit yang lalu' },
    ]
  },
  {
    grup: 'Bulan Ini',
    items: [
      { icon: 'ri-percent-line', color: '#BFA370', bg: '#FAF8F5', judul: 'Promo diskon 20% Ayam Goreng telah aktif', sub: 'Promo berlaku hingga 30 April 2026. Jangan lupa tingkatkan penjualanmu!', waktu: '5 menit yang lalu' },
    ]
  },
];