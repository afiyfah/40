"use client";
import { useState } from "react";
import { formatRupiah } from "@/lib/data";

const ALL_MENU = [
  { id:1, nama:"Nasi Gudeg", harga:20000, kat:"makanan" }, { id:2, nama:"Nasi Goreng", harga:15000, kat:"makanan" },
  { id:3, nama:"Rawon Daging", harga:25000, kat:"makanan" }, { id:4, nama:"Es Teh", harga:3000, kat:"minuman" },
  { id:5, nama:"Es Jeruk", harga:5000, kat:"minuman" }, { id:6, nama:"Jus Alpukat", harga:8000, kat:"minuman" },
  { id:7, nama:"Kopi Susu", harga:7000, kat:"minuman" }, { id:8, nama:"Air Mineral", harga:3000, kat:"minuman" },
  { id:9, nama:"Keripik Singkong", harga:5000, kat:"snack" }, { id:10, nama:"Bakwan Jagung", harga:3000, kat:"snack" },
  { id:11, nama:"Tahu Crispy", harga:4000, kat:"snack" },
];

interface CartItem { id: number; nama: string; harga: number; qty: number; }

export default function KasirPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [kat, setKat] = useState("semua");
  const [search, setSearch] = useState("");
  const [showBayar, setShowBayar] = useState(false);
  const [payMethod, setPayMethod] = useState("");

  const filtered = ALL_MENU.filter((m) => {
    const matchKat = kat === "semua" || m.kat === kat;
    const matchQ = m.nama.toLowerCase().includes(search.toLowerCase());
    return matchKat && matchQ;
  });

  const addToCart = (item: typeof ALL_MENU[0]) => {
    setCart((prev) => {
      const idx = prev.findIndex((c) => c.id === item.id);
      if (idx >= 0) return prev.map((c, i) => i === idx ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c).filter((c) => c.qty > 0));
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id));

  const totalQty = cart.reduce((a, c) => a + c.qty, 0);
  const grandTotal = cart.reduce((a, c) => a + c.harga * c.qty, 0);

  const selesai = () => {
    if (!payMethod) { alert("Pilih metode pembayaran!"); return; }
    setCart([]);
    setShowBayar(false);
    setPayMethod("");
  };

  return (
    <div className="flex h-[calc(100vh-70px)] -m-7">
      {/* Left: Cart */}
      <div className="w-56 flex-shrink-0 bg-white border-r border-[#F0EDE8] flex flex-col">
        <div className="flex flex-col items-center py-5 border-b border-gray-100">
          <div className="w-14 h-14 rounded-full bg-[#BFA370]/20 border-2 border-[#BFA370] flex items-center justify-center text-3xl mb-2">🍗</div>
          <p className="font-bold text-gray-800">NyamNow Kasir</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 no-scrollbar space-y-2">
          {cart.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-8">Klik menu untuk menambah pesanan</p>
          ) : cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm py-1 border-b border-gray-50">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 text-xs truncate">{item.qty}x {item.nama}</p>
                <p className="text-[10px] text-[#BFA370]">{formatRupiah(item.harga * item.qty)}</p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button onClick={() => changeQty(item.id, -1)} className="w-5 h-5 rounded border border-gray-200 text-xs flex items-center justify-center hover:bg-red-50 hover:text-red-500">−</button>
                <button onClick={() => changeQty(item.id, 1)} className="w-5 h-5 rounded border border-gray-200 text-xs flex items-center justify-center hover:bg-green-50 hover:text-green-500">+</button>
                <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-400 text-xs ml-1">✕</button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-gray-100 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 font-medium">Subtotal({totalQty} item)</span>
            <span className="text-gray-800 font-semibold">{formatRupiah(grandTotal)}</span>
          </div>
        </div>
        <div className="flex border-t border-gray-100">
          {[["ri-delete-bin-6-line","text-red-500","Hapus",() => setCart([])],
            ["ri-printer-line","text-orange-500","Cetak",() => {}],
            ["ri-save-line","text-green-500","Simpan",() => {}]].map(([icon, color, label, fn]) => (
            <button key={String(label)} onClick={fn as () => void} className={`flex-1 flex flex-col items-center py-2.5 gap-1 text-[10px] font-semibold ${String(color)} hover:bg-gray-50`}>
              <i className={`${String(icon)} text-lg`} />
              {String(label)}
            </button>
          ))}
        </div>
        <button onClick={() => cart.length > 0 && setShowBayar(true)}
          className="flex items-center justify-between px-5 py-4 bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition">
          <span>Bayar</span>
          <span>{formatRupiah(grandTotal)}</span>
        </button>
      </div>

      {/* Right: Menu */}
      <div className="flex-1 flex flex-col bg-[#F6F4F0]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#BFA370] to-[#8E754A] px-5 py-3 flex items-center gap-4">
          <span className="text-white font-bold text-lg">Kasir</span>
          <div className="flex-1 max-w-md mx-4 relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input className="w-full pl-9 pr-4 py-2 rounded-2xl text-sm outline-none bg-white"
              placeholder="Cari menu" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 px-4 py-3 bg-white border-b border-gray-100 overflow-x-auto no-scrollbar">
          {[["semua","✓ Semua"],["makanan","Makanan"],["minuman","Minuman"],["snack","Snack"]].map(([id, label]) => (
            <button key={id} onClick={() => setKat(String(id))}
              className={`px-4 py-1.5 rounded-full border text-xs font-medium flex-shrink-0 transition ${kat === id ? "bg-[#BFA370] text-white border-[#BFA370]" : "bg-white text-gray-600 border-gray-200 hover:border-[#BFA370]"}`}>
              {String(label)}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 gap-3">
          {filtered.map((item) => {
            const inCart = cart.find((c) => c.id === item.id);
            return (
              <div key={item.id} onClick={() => addToCart(item)}
                className={`bg-white rounded-xl overflow-hidden border-2 cursor-pointer hover:-translate-y-1 transition shadow-sm ${inCart ? "border-[#BFA370]" : "border-transparent"}`}>
                <div className="h-20 bg-orange-50 flex items-center justify-center text-4xl">🍗</div>
                <div className="p-2.5">
                  <p className="font-semibold text-gray-800 text-xs leading-tight mb-1">{item.nama}</p>
                  <p className="text-[#BFA370] font-bold text-xs">{formatRupiah(item.harga)}</p>
                  {inCart && <span className="text-[10px] bg-[#BFA370] text-white px-1.5 py-0.5 rounded-full mt-1 inline-block">{inCart.qty}x</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bayar Modal */}
      {showBayar && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[480px] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <button onClick={() => setShowBayar(false)} className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">Tutup</button>
              <p className="font-bold text-gray-800">Pembayaran</p>
              <span />
            </div>
            <div className="px-6 pb-6 pt-4 space-y-4">
              <div className="space-y-2 text-sm border-b border-gray-100 pb-4">
                <div className="flex justify-between"><span className="text-gray-500">Sub Total ({totalQty} item)</span><span>{formatRupiah(grandTotal)}</span></div>
                <div className="flex justify-between font-bold text-gray-800"><span>Grand Total</span><span>{formatRupiah(grandTotal)}</span></div>
              </div>
              <p className="text-sm font-semibold text-gray-600">Metode Pembayaran</p>
              <div className="flex gap-3">
                {[["tunai","💵","Tunai"],["qris","🏷","QRIS"],["debit","💳","Debit"],["credit","🏦","Credit"]].map(([id, icon, label]) => (
                  <button key={id} onClick={() => setPayMethod(String(id))}
                    className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-semibold transition ${payMethod === id ? "border-yellow-400 bg-yellow-50" : "border-gray-200 hover:border-[#BFA370]"}`}>
                    <span className="text-2xl">{String(icon)}</span>
                    {String(label)}
                  </button>
                ))}
              </div>
              <button onClick={selesai} className="w-full py-3 rounded-xl text-white font-bold text-sm btn-gold">Selesai</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
