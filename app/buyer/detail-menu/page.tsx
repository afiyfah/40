"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { MASTER_PRODUK, formatRupiah } from "@/lib/data";

function DetailMenuContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = Number(searchParams.get("id")) || 1;
  const produk = MASTER_PRODUK.find((p) => p.id === id) || MASTER_PRODUK[0];
  const [qty, setQty] = useState(3);
  const [liked, setLiked] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <button onClick={() => router.back()} className="text-black absolute top-24 left-6 z-10 w-10 h-10 text-gray-600">
        <i className="ri-arrow-left-line text-3xl" />
      </button>

      <div className="bg-[#F5F5F5] rounded-md max-w-4xl w-full overflow-hidden relative flex flex-col md:flex-row p-6 md:p-8 gap-8">
        <div className="w-full md:w-1/2 h-[300px] md:h-[450px] bg-orange-50 rounded-[1rem] flex items-center justify-center text-9xl">
          🍗
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-[#4A3933]">{produk.nama}</h1>
            <button onClick={() => setLiked(!liked)}
              className="flex items-center gap-1.5 text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 cursor-pointer hover:bg-white active:scale-95">
              <i className={`${liked ? "ri-heart-3-fill text-red-500" : "ri-heart-3-line text-gray-300"} transition-colors`} />
              <span className="text-xs font-medium">{produk.suka + (liked ? 1 : 0)}</span>
            </button>
          </div>

          <div className="flex items-center text-yellow-400 mt-1">
            {[...Array(5)].map((_, i) => <i key={i} className="ri-star-s-fill" />)}
            <span className="ml-2 w-4 h-3 bg-green-600 text-white text-[8px] rounded-full flex items-center justify-center">6</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="bg-gradient-to-r from-[#ECDB9D] to-[#FFC800] px-4 py-2 rounded-md shadow-sm">
              <span className="text-2xl font-black text-[#4A3933]">{formatRupiah(produk.harga)}</span>
              <span className="text-[#585858] line-through font-semibold text-[12px] ml-2">{formatRupiah(produk.harga + 5000)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-4 overflow-y-auto max-h-[200px] pr-2">
            <div>
              <h3 className="font-bold text-[#4A3933] text-lg">Deskripsi Rasa</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{produk.deskripsi}</p>
            </div>
            <div>
              <h3 className="font-bold text-[#4A3933] text-lg">Bahan Utama</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Makanan ini mengandung bahan berkualitas tinggi pilihan dari toko {produk.toko}.</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-[#4A3933] text-sm mb-2">Tambahkan Catatan</h3>
            <div className="relative">
              <i className="ri-file-list-3-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Tulis catatan di sini..."
                className="w-full bg-[#F9F9F9] border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none" />
            </div>
          </div>

          <div className="mt-auto pt-6 flex items-center justify-between gap-4">
            <div className="flex items-center bg-[#E5E5E5] rounded-lg p-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 font-bold text-xl text-gray-600">-</button>
              <span className="w-10 text-center font-bold text-[#4A3933]">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-8 h-8 font-bold text-xl text-gray-600">+</button>
            </div>
            <button onClick={() => showToast("Pesanan berhasil ditambahkan ke keranjang!")}
              className="flex-1 bg-[#633A07] text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition-transform">
              Tambahkan Pesanan
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[999] bg-[#633A07] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
          <i className="ri-checkbox-circle-fill text-green-400 text-xl" />
          <span className="text-sm font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}

export default function DetailMenuPage() {
  return (
    <div>
      <BuyerHeader />
      <Suspense fallback={<div className="flex items-center justify-center h-64 text-gray-400">Memuat...</div>}>
        <DetailMenuContent />
      </Suspense>
    </div>
  );
}
