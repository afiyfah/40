import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Notif {
  id: string;
  judul: string;
  sub: string;
  waktu: string;
  grup: "Hari Ini" | "Kemarin" | "Minggu Ini";
  tipe: "toko" | "flash" | "voucher" | "pesanan" | "rating";
  emoji: string;
  dibaca: boolean;
  link?: string;
}

const DEFAULT_NOTIFS: Notif[] = [
  { id:"n1",  judul:"Ayam Goreng 39 Sudah Buka!",    sub:"Toko favoritmu sekarang sudah melayani pesanan",    waktu:"5 menit yang lalu",  grup:"Hari Ini",   tipe:"toko",    emoji:"🍗",  dibaca:false, link:"/buyer/toko?id=1" },
  { id:"n2",  judul:"Flash Sale Dimulai!",            sub:"Diskon besar-besaran mulai sekarang hingga 21.00",   waktu:"1 jam yang lalu",    grup:"Hari Ini",   tipe:"flash",   emoji:"⚡",  dibaca:false, link:"/buyer/flashsale" },
  { id:"n3",  judul:"Voucher Baru Untukmu!",          sub:"Dapatkan diskon Rp15.000 untuk pembelian pertama",   waktu:"3 jam yang lalu",    grup:"Hari Ini",   tipe:"voucher", emoji:"🎫",  dibaca:false, link:"/buyer/keranjang/konfirmasi" },
  { id:"n4",  judul:"Dapur Mommy Sudah Buka!",        sub:"Toko favoritmu sekarang sudah melayani pesanan",    waktu:"5 menit yang lalu",  grup:"Kemarin",    tipe:"toko",    emoji:"🍲",  dibaca:false, link:"/buyer/toko?id=2" },
  { id:"n5",  judul:"Pesanan Kamu Selesai!",          sub:"Pesanan dari Ayam Goreng 39 telah selesai. Beri ulasan yuk!",  waktu:"Kemarin, 19.00",    grup:"Kemarin",    tipe:"pesanan", emoji:"✅",  dibaca:true,  link:"/buyer/keranjang" },
  { id:"n6",  judul:"Flash Sale Besok Jam 18.00!",    sub:"Jangan sampai ketinggalan diskon hingga 70%",       waktu:"2 hari yang lalu",   grup:"Minggu Ini", tipe:"flash",   emoji:"⚡",  dibaca:false, link:"/buyer/flashsale" },
  { id:"n7",  judul:"Rating Baru dari Kamu!",         sub:"Terima kasih sudah memberi ulasan di Rajanya Bakpao",waktu:"3 hari yang lalu",   grup:"Minggu Ini", tipe:"rating",  emoji:"⭐",  dibaca:true,  link:"/buyer/toko?id=3" },
  { id:"n8",  jidul:"Gulay Wowok Sudah Buka!",       sub:"Toko favoritmu sekarang sudah melayani pesanan",    waktu:"4 hari yang lalu",   grup:"Minggu Ini", tipe:"toko",    emoji:"🥘",  dibaca:false, link:"/buyer/toko?id=7" } as unknown as Notif,
];
// fix typo
DEFAULT_NOTIFS[7].judul = "Gulay Wowok Sudah Buka!";

interface NotifStore {
  notifs: Notif[];
  hapus: (id: string) => void;
  hapusSemua: () => void;
  baca: (id: string) => void;
  bacaSemua: () => void;
  unreadCount: () => number;
}

export const useNotifStore = create<NotifStore>()(
  persist(
    (set, get) => ({
      notifs: DEFAULT_NOTIFS,
      hapus: (id) => set(s => ({ notifs: s.notifs.filter(n => n.id !== id) })),
      hapusSemua: () => set({ notifs: [] }),
      baca: (id) => set(s => ({ notifs: s.notifs.map(n => n.id === id ? { ...n, dibaca: true } : n) })),
      bacaSemua: () => set(s => ({ notifs: s.notifs.map(n => ({ ...n, dibaca: true })) })),
      unreadCount: () => get().notifs.filter(n => !n.dibaca).length,
    }),
    { name: "market-kita-notif" }
  )
);
