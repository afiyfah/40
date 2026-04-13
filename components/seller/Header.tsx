"use client";
import Link from "next/link";

export default function SellerHeader() {
  return (
    <header
      className="flex items-center h-[70px] justify-between px-5 py-3 sticky top-0 z-40 shadow-md"
      style={{ background: "linear-gradient(90deg,#BFA370 0%,#8E754A 100%)" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/30 border-2 border-white/40 flex items-center justify-center font-bold text-white text-sm">
            MK
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Nyam<span className="font-light">Now</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/seller/notifikasi" className="relative text-white text-xl hover:text-white/80 transition">
          <i className="ri-notification-3-line" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
        </Link>
        <Link href="/seller/chat" className="relative text-white text-xl hover:text-white/80 transition">
          <i className="ri-chat-3-line" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
        </Link>
        <button className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-white/50 flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <span className="text-white text-sm font-medium hidden sm:block">Ayam Labubu</span>
        </button>
      </div>
    </header>
  );
}
