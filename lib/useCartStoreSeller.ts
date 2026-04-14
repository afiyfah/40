import { create } from "zustand";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface OrderItem {
  nama: string;
  qty: number;
  harga: number;
  varian?: string[];
  tambah?: string[];
}

export interface Order {
  id: string;
  col: "m" | "p";
  tipe: "makan" | "preorder" | "reservasi";
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

export interface MenuItem {
  id: number;
  nama: string;
  harga: number;
  kat: string;
  img: string;
  waktu?: string;
  terjual?: string;
  suka?: number;
  stok: number;
  status: "aktif" | "habis";
  deskripsi?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  time: string;
  self: boolean;
  date: string;
}

export interface Contact {
  id: number;
  nama: string;
  avatar: string;
  preview: string;
  waktu: string;
  unread: number;
  messages: ChatMessage[];
}

export interface SellerProfile {
  namaToko: string;
  deskripsi: string;
  kontak: string;
  email: string;
  alamat: string;
  avatar: string | null;
  rating: number;
  totalItem: number;
}

export interface CartItem {
  id: number;
  nama: string;
  harga: number;
  qty: number;
  diskon: number;
  catatan: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────
const initialOrders: Order[] = [
  {
    id: "172634", col: "m", tipe: "makan",
    customer: "Pak Cucik", phone: "0812-3378-6767", meja: "Meja 11",
    items: [
      { nama: "Nasgor goreng magel belang", qty: 1, harga: 50000, varian: ["Pedas Sedang"], tambah: ["Tambah Telur Dadar"] },
      { nama: "Ayam ayan spasial", qty: 2, harga: 40000, varian: ["Sambal Matah"], tambah: ["Nasi Uduk"] },
    ],
    total: 90000, biayaLayanan: 4500, metode: "QRIS", dibayar: true,
    catatan: "Mass jangan pakai sledri yaa sama minta acar makasihh",
    tanggal: "22/03/2026, 12:45 WIB", waktu: null,
  },
  {
    id: "167283", col: "m", tipe: "makan",
    customer: "Zammud Saprudin", phone: "0856-2211-4433", meja: "Meja 5",
    items: [
      { nama: "Nasgor goreng magel belang", qty: 1, harga: 50000, varian: [], tambah: [] },
      { nama: "Ayam ayan spasial", qty: 2, harga: 40000, varian: [], tambah: [] },
      { nama: "Bebek Julepotan", qty: 1, harga: 33000, varian: [], tambah: [] },
    ],
    total: 123000, biayaLayanan: 6150, metode: "QRIS", dibayar: true,
    catatan: "", tanggal: "22/03/2026, 12:20 WIB", waktu: null,
  },
  {
    id: "172634b", col: "p", tipe: "makan",
    customer: "Pak Cucik", phone: "0812-3378-6767", meja: "Meja 11",
    items: [
      { nama: "Nasgor goreng magel belang", qty: 1, harga: 50000, varian: [], tambah: [] },
      { nama: "Ayam ayan spasial", qty: 2, harga: 40000, varian: [], tambah: [] },
    ],
    total: 90000, biayaLayanan: 4500, metode: "Qris", dibayar: true,
    catatan: "Pedasnya dikurangin ya kak",
    tanggal: "22/03/2026, 12:10 WIB", waktu: 15 * 60,
  },
  {
    id: "167283b", col: "p", tipe: "makan",
    customer: "Zammud Saprudin", phone: "0856-2211-4433", meja: "Meja 5",
    items: [
      { nama: "Nasgor goreng magel belang", qty: 1, harga: 50000, varian: [], tambah: [] },
      { nama: "Bebek Julepotan", qty: 1, harga: 33000, varian: [], tambah: [] },
    ],
    total: 83000, biayaLayanan: 4150, metode: "Debit", dibayar: false,
    catatan: "", tanggal: "22/03/2026, 12:00 WIB", waktu: 20 * 60,
  },
];

const initialMenu: MenuItem[] = [
  { id: 1, nama: "Ayam Paha Atas", harga: 17000, kat: "ayam", img: "/images/mie-ayam.png", waktu: "15min", terjual: "10RB+", suka: 741, stok: 20, status: "aktif", deskripsi: "Ayam paha atas goreng renyah dengan bumbu spesial rumahan yang gurih." },
  { id: 2, nama: "Ayam Paha Bandung", harga: 18000, kat: "ayam", img: "/images/makanan2.png", waktu: "15min", terjual: "8RB+", suka: 600, stok: 0, status: "habis", deskripsi: "Ayam paha bandung dengan sambal khas pedas menggoda." },
  { id: 3, nama: "Rawon Daging", harga: 25000, kat: "makanan", img: "/images/rawon.png", waktu: "20min", terjual: "5RB+", suka: 420, stok: 15, status: "aktif", deskripsi: "Rawon daging sapi dengan kuah hitam pekat khas Jawa Timur." },
  { id: 4, nama: "Es Teh Manis", harga: 5000, kat: "minuman", img: "/images/promo-1.png", waktu: "5min", terjual: "20RB+", suka: 900, stok: 50, status: "aktif", deskripsi: "Es teh manis segar, perfect untuk menemani makan." },
];

const initialContacts: Contact[] = [
  {
    id: 0, nama: "Watanabe Haruto", avatar: "https://placehold.co/40x40/BFA370/fff?text=WH",
    preview: "Bisa kak", waktu: "Kemarin", unread: 2,
    messages: [
      { id: "1", text: "Untuk pesanan ayam goreng paha atas, Ayam sama nasinya bisa di pisah nggk ya?", time: "12.24", self: false, date: "Kemarin" },
      { id: "2", text: "Bisa kak, nanti kami pisahin ya 😊", time: "12.26", self: true, date: "Kemarin" },
    ],
  },
  {
    id: 1, nama: "Budi Santoso", avatar: "https://placehold.co/40x40/60A5FA/fff?text=BS",
    preview: "Ordernya sudah siap kak?", waktu: "Kemarin", unread: 0,
    messages: [
      { id: "1", text: "Halo kak, mau tanya stok ayam paha atas masih ada?", time: "10.15", self: false, date: "Kemarin" },
      { id: "2", text: "Masih ada kak, silahkan order!", time: "10.20", self: true, date: "Kemarin" },
      { id: "3", text: "Ordernya sudah siap kak?", time: "11.00", self: false, date: "Kemarin" },
    ],
  },
  {
    id: 2, nama: "Siti Nadia", avatar: "https://placehold.co/40x40/A855F7/fff?text=SN",
    preview: "Apakah ayamnya ready?", waktu: "Kemarin", unread: 1,
    messages: [
      { id: "1", text: "Selamat siang kak!", time: "08.50", self: false, date: "Kemarin" },
      { id: "2", text: "Apakah ayamnya ready?", time: "09.00", self: false, date: "Kemarin" },
    ],
  },
  {
    id: 3, nama: "Joko Widodo", avatar: "https://placehold.co/40x40/22C55E/fff?text=JW",
    preview: "Makasih kak, enak banget!", waktu: "2 hari lalu", unread: 0,
    messages: [
      { id: "1", text: "Makasih kak, enak banget!", time: "15.30", self: false, date: "2 hari lalu" },
      { id: "2", text: "Sama-sama kak, senang bisa membantu 🙏", time: "15.35", self: true, date: "2 hari lalu" },
    ],
  },
  {
    id: 4, nama: "Dewi Rahayu", avatar: "https://placehold.co/40x40/EF4444/fff?text=DR",
    preview: "Minta sambalnya dipisah ya", waktu: "3 hari lalu", unread: 0,
    messages: [
      { id: "1", text: "Minta sambalnya dipisah ya kak buat yang order tadi", time: "13.00", self: false, date: "3 hari lalu" },
      { id: "2", text: "Siap kak!", time: "13.02", self: true, date: "3 hari lalu" },
    ],
  },
];

export const initialProfile: SellerProfile = {
  namaToko: "Ayam Labubu",
  deskripsi: "Warung ayam goreng dengan cita rasa khas yang sudah melayani pelanggan sejak 2020. Tersedia berbagai pilihan menu ayam dengan tingkat kepedasan yang bisa disesuaikan.",
  kontak: "+62 884-1213-5533",
  email: "ayamlabubu@gmail.com",
  alamat: "Jl. Labubu No. 88, Banjarsari, Surakarta, Jawa Tengah 57134",
  avatar: null,
  rating: 4.8,
  totalItem: 46,
};

// ─── Store ────────────────────────────────────────────────────────────────────
interface AppStore {
  profile: SellerProfile;
  setProfile: (p: Partial<SellerProfile>) => void;

  tokoOpen: boolean;
  toggleToko: () => void;

  orders: Order[];
  orderTimers: Record<string, number>;
  terimaOrder: (id: string) => void;
  tolakOrder: (id: string) => void;
  selesaiOrder: (id: string) => void;
  tickTimers: () => void;

  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: number, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: number) => void;
  updateStok: (id: number, stok: number) => void;

  contacts: Contact[];
  activeContactId: number;
  setActiveContact: (id: number) => void;
  sendMessage: (text: string) => void;

  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  diskonKeranjang: number;
  setDiskonKeranjang: (v: number) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  profile: initialProfile,
  setProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),

  tokoOpen: true,
  toggleToko: () => set((s) => ({ tokoOpen: !s.tokoOpen })),

  orders: initialOrders,
  orderTimers: Object.fromEntries(
    initialOrders.filter((o) => o.col === "p" && o.waktu != null).map((o) => [o.id, o.waktu as number])
  ),

  terimaOrder: (id) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === id ? { ...o, col: "p" as const } : o)),
      orderTimers: { ...s.orderTimers, [id]: 15 * 60 },
    })),

  tolakOrder: (id) =>
    set((s) => {
      const timers = { ...s.orderTimers };
      delete timers[id];
      return { orders: s.orders.filter((o) => o.id !== id), orderTimers: timers };
    }),

  selesaiOrder: (id) =>
    set((s) => {
      const timers = { ...s.orderTimers };
      delete timers[id];
      return { orders: s.orders.filter((o) => o.id !== id), orderTimers: timers };
    }),

  tickTimers: () =>
    set((s) => {
      const next = { ...s.orderTimers };
      Object.keys(next).forEach((id) => { if (next[id] > 0) next[id]--; });
      return { orderTimers: next };
    }),

  menuItems: initialMenu,
  addMenuItem: (item) =>
    set((s) => ({
      menuItems: [...s.menuItems, { ...item, id: Date.now() }],
    })),
  updateMenuItem: (id, updates) =>
    set((s) => ({
      menuItems: s.menuItems.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),
  deleteMenuItem: (id) =>
    set((s) => ({ menuItems: s.menuItems.filter((m) => m.id !== id) })),
  updateStok: (id, stok) =>
    set((s) => ({
      menuItems: s.menuItems.map((m) =>
        m.id === id ? { ...m, stok, status: stok > 0 ? "aktif" : "habis" } : m
      ),
    })),

  contacts: initialContacts,
  activeContactId: 0,
  setActiveContact: (id) =>
    set((s) => ({
      activeContactId: id,
      contacts: s.contacts.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    })),
  sendMessage: (text) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}.${String(now.getMinutes()).padStart(2, "0")}`;
    const msg: ChatMessage = { id: Date.now().toString(), text, time, self: true, date: "Hari Ini" };
    set((s) => ({
      contacts: s.contacts.map((c) =>
        c.id === s.activeContactId
          ? { ...c, messages: [...c.messages, msg], preview: text, waktu: "Baru saja" }
          : c
      ),
    }));
  },

  cart: [],
  addToCart: (item) =>
    set((s) => {
      const idx = s.cart.findIndex((c) => c.id === item.id);
      if (idx >= 0) {
        const cart = [...s.cart];
        cart[idx] = item;
        return { cart };
      }
      return { cart: [...s.cart, item] };
    }),
  clearCart: () => set({ cart: [] }),
  diskonKeranjang: 0,
  setDiskonKeranjang: (v) => set({ diskonKeranjang: v }),
}));