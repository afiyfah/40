"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useState } from "react";

const MENU_ITEMS = [
  { nama: "Nasgor Goreng", harga: "Rp 17.000", terjual: "10RB+", users: 741 },
  { nama: "Ayam Goreng", harga: "Rp 27.000", terjual: "8RB+", users: 520 },
  { nama: "Salad Sehat", harga: "Rp 22.000", terjual: "1RB+", users: 310 },
  { nama: "Pizza Slice", harga: "Rp 15.000", terjual: "15RB+", users: 980 },
];

export default function ExplorePage() {
  const [cardVisible, setCardVisible] = useState(false);
  const [cardExpanded, setCardExpanded] = useState(false);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedItems((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  return (
    <div className="bg-white overflow-hidden h-screen flex flex-col">
      <BuyerHeader />

      {/* Map Placeholder */}
      <div className="relative flex-1 bg-[#e8f0e8]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #d4e6d4 0%, #c8ddc8 40%, #b8d4b8 100%)" }}>
        {/* Simulated map content */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="absolute bg-gray-400 opacity-20 rounded"
              style={{ left: `${Math.random()*90}%`, top: `${Math.random()*90}%`, width: `${50+Math.random()*200}px`, height: "2px", transform: `rotate(${Math.random()*180}deg)` }} />
          ))}
        </div>

        {/* User location marker */}
        <div className="absolute" style={{ left: "35%", top: "55%" }}>
          <div className="relative flex items-center justify-center">
            <div className="absolute w-10 h-10 bg-blue-400 opacity-20 rounded-full animate-ping" />
            <div className="w-5 h-5 bg-blue-600 border-2 border-white rounded-full shadow-lg z-10" />
          </div>
        </div>

        {/* Store pin */}
        <button onClick={() => { setCardVisible(true); setCardExpanded(false); }}
          className="absolute" style={{ left: "50%", top: "40%" }}>
          <i className="ri-map-pin-2-fill text-[#8E754A] text-5xl drop-shadow-lg" />
        </button>

        {/* Location button */}
        <button onClick={() => setCardVisible(false)}
          className="absolute bottom-10 right-6 z-40 w-14 h-14 bg-white text-[#BFA370] rounded-full shadow-xl flex items-center justify-center border border-gray-100 hover:bg-gray-50">
          <i className="ri-focus-3-line text-2xl" />
        </button>

        {/* Store Card Bottom Sheet */}
        {cardVisible && (
          <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[3rem] shadow-2xl overflow-y-auto no-scrollbar transition-all duration-500 ${cardExpanded ? "h-[90vh]" : "h-[340px]"}`}>
            <div className="pt-4 px-6 md:px-12">
              <div className="w-[204px] h-4 bg-gray-200 rounded-full mx-auto mb-6 cursor-pointer" onClick={() => setCardExpanded(!cardExpanded)} />
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-[300px] shrink-0">
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm z-10">
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-[11px] font-bold text-gray-700 uppercase tracking-wider">Buka</span>
                  </div>
                  <div className="w-full aspect-square md:h-[200px] rounded-xl bg-orange-50 flex items-center justify-center text-8xl">🍗</div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-800 uppercase">SOP AYAM PAK MIN</h2>
                  <div className="flex items-center text-yellow-400 text-xl mt-1">
                    {[...Array(5)].map((_, i) => <i key={i} className="ri-star-fill" />)}
                    <span className="ml-2 w-7 h-7 bg-green-500 text-white text-xs flex items-center justify-center rounded-full font-bold">5</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mt-3">Lorem ipsum dolor sit amet consectetur adipiscing elit. Tempore tenetur iusto.</p>
                  <button className="mt-6 bg-[#D4B982] hover:bg-[#BFA370] text-white px-12 py-2 rounded-md text-md flex items-center gap-2 shadow-lg active:scale-95 transition-all">
                    <i className="ri-map-pin-line" /> Menuju Lokasi
                  </button>
                </div>
              </div>

              {cardExpanded && (
                <div className="mt-8 pb-16">
                  <h3 className="font-black text-2xl text-gray-800 mb-4">Menu Populer</h3>
                  <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
                    {MENU_ITEMS.map((item, i) => (
                      <div key={i} className="min-w-[280px] bg-white p-3 rounded-md border border-gray-100 shadow-sm flex items-center gap-4 flex-shrink-0">
                        <div className="w-20 h-20 rounded-md bg-orange-50 flex items-center justify-center text-4xl flex-shrink-0">🍗</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-sm">{item.nama}</h4>
                          <p className="text-green-600 font-bold text-sm">{item.harga}</p>
                          <p className="text-[9px] text-gray-400 mt-1 font-medium">{item.terjual} terjual | {item.users} <i className="ri-user-3-fill" /></p>
                        </div>
                        <button onClick={() => toggleLike(`menu-${i}`)} className="p-2 text-gray-300 transition-colors focus:outline-none">
                          <i className={`${likedItems.has(`menu-${i}`) ? "ri-heart-3-fill text-red-500" : "ri-heart-3-line"} text-xl`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
