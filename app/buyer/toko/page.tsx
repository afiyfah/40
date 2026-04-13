"use client";
import BuyerHeader from "@/components/buyer/Header";
import Link from "next/link";
import { useState } from "react";
import { MASTER_PRODUK, formatRupiah } from "@/lib/data";

export default function ProfilTokoPage() {
  const [favShop, setFavShop] = useState(false);
  const [likedMenus, setLikedMenus] = useState<Set<number>>(new Set());

  const toggleMenuHeart = (id: number, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setLikedMenus((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  return (
    <div className="bg-gray-50">
      <BuyerHeader />
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Store Profile Card */}
        <div className="bg-[#F1F3E9] rounded-2xl p-6 mb-6 shadow-sm border border-gray-100 relative">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-orange-50 flex items-center justify-center text-5xl">
              🍗
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Ayam Goreng 39</h1>
              <div className="flex items-center justify-center md:justify-start gap-1 mb-4 text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => <i key={i} className="ri-star-s-fill" />)}
                <span className="ml-2 bg-gray-600 text-white text-xs px-1.5 py-0.5 rounded-full">5</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <button className="bg-[#B59D74] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#a38c65]">
                  <i className="ri-map-pin-line" /> Menuju Lokasi
                </button>
                <Link href="/buyer/chat-toko" className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
                  <i className="ri-chat-3-line" /> Hubungi Penjual
                </Link>
                <button onClick={() => setFavShop(!favShop)}
                  className={`bg-white border border-gray-300 p-2 rounded-lg transition ${favShop ? "text-red-500 border-red-200" : "text-gray-400 hover:text-red-500"}`}>
                  <i className={`${favShop ? "ri-heart-3-fill" : "ri-heart-3-line"} text-xl`} />
                </button>
              </div>
            </div>
            <div className="absolute top-6 right-6">
              <span className="bg-white border border-yellow-200 text-green-600 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block" />
                Reservasi
              </span>
            </div>
          </div>

          <div className="flex gap-8 mt-10 border-b border-gray-300">
            <button className="pb-2 px-4 border-b-2 border-gray-800 font-bold text-gray-800">Home</button>
            <Link href="/buyer/toko/menu" className="pb-2 px-4 text-gray-500 hover:text-gray-800 transition">All Menu</Link>
          </div>
        </div>

        {/* Description */}
        <div className="mb-10 text-gray-500 text-justify">
          <p>Selamat datang di Ayam Goreng 39! Kami menyajikan ayam goreng dengan bumbu rempah khas yang telah melayani pelanggan setia selama lebih dari 10 tahun. Nikmati cita rasa autentik dengan bahan-bahan segar setiap harinya.</p>
        </div>

        {/* Rekomendasi Menu */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#88601B]">Rekomendasi</h2>
            <Link href="/buyer/toko/menu" className="text-[#88601B] text-sm font-semibold flex items-center gap-1 hover:underline">
              Lihat Selengkapnya <i className="ri-chevron-right-line text-xs" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {MASTER_PRODUK.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/buyer/detail-menu?id=${p.id}`}
                className="block rounded-2xl overflow-hidden shadow-sm p-3 active:scale-95 transition"
                style={{ background: "#f3f3f3", boxShadow: "0px 10px 0px #e9e9e9" }}>
                <div className="w-full h-32 md:h-40 rounded-xl mb-3 bg-orange-50 flex items-center justify-center text-5xl">🍗</div>
                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1">{p.nama}</h3>
                <p className="text-green-600 font-bold text-base mb-3">{formatRupiah(p.harga)}</p>
                <div className="flex items-center justify-between text-[10px] text-gray-400 border-t pt-3">
                  <span>10RB+ terjual</span>
                  <span>240m | 15min</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-500">
                  <button onClick={(e) => toggleMenuHeart(p.id, e)}>
                    <i className={`${likedMenus.has(p.id) ? "ri-heart-3-fill text-red-500" : "ri-heart-3-line"} text-sm cursor-pointer transition-all`} />
                  </button>
                  <span>Disukai oleh {p.suka + (likedMenus.has(p.id) ? 1 : 0)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
