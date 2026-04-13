"use client";
import BuyerHeader from "@/components/buyer/Header";
import ProductCard from "@/components/shared/productCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PRODUK_LIST } from "@/lib/dummyData";


const PROMO_LIST = [
  { bg: "linear-gradient(135deg,#FF7A3D,#FF9A6A)", judul: "Diskon 25%\nSemua\nMinuman", batas: "Hingga 24-02-2026", img: "/assets/images/promo-1.png", emoji: "🥤" },
  { bg: "linear-gradient(135deg,#B88214,#E1BF59)", judul: "Promo\nBulan\nRamadhan", batas: "Hingga 24-02-2026", img: "/assets/images/promo-2.png", emoji: "🌙" },
  { bg: "linear-gradient(135deg,#FF7A3D,#FF9A6A)", judul: "Diskon 25%\nSemua\nMinuman", batas: "Hingga 24-02-2026", img: "/assets/images/promo-1.png", emoji: "🥤" },
  { bg: "linear-gradient(135deg,#B88214,#E1BF59)", judul: "Promo\nBulan\nRamadhan", batas: "Hingga 24-02-2026", img: "/assets/images/promo-2.png", emoji: "🌙" },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("rekomendasi");
  const [timer, setTimer] = useState(4 * 3600 + 32 * 60 + 10);

  useEffect(() => {
    const iv = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(iv);
  }, []);

  const h = String(Math.floor(timer / 3600)).padStart(2, "0");
  const m = String(Math.floor((timer % 3600) / 60)).padStart(2, "0");
  const s = String(timer % 60).padStart(2, "0");

  const filteredProduk = PRODUK_LIST.filter(p =>
    activeTab === "rekomendasi" ? p.type === "rekomendasi" :
    activeTab === "terlaris" ? p.type === "terlaris" : p.type === "rating"
  );

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <BuyerHeader />

      <main style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 60}}>

        {/* ── Promo Spesial ── */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "linear-gradient(135deg,#BFA370,#8E754A)" }}>Promo Spesial</h2>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, color: "#BFA370", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
              Lihat Semua
              <div style={{ width: 26, height: 26, background: "linear-gradient(135deg,#BFA370,#8E754A)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className="ri-arrow-right-s-line" style={{ color: "white", fontSize: 14 }} />
              </div>
            </a>
          </div>

          <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 5, paddingTop: 5 }} className="no-scrollbar">
            {PROMO_LIST.map((p, i) => (
              <div key={i} style={{
                minWidth: 350, height: 150, flexShrink: 0,
                background: p.bg, borderRadius: 7,
                padding: "20px 24px", color: "white",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                boxShadow: "0 px 12px rgba(0,0,0,0.15)",
                position: "relative", overflow: "hidden", cursor: "pointer",
                transition: "transform 0.2s",
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = "none")}
              >
                <div>
                  <span style={{
                    background: "rgba(255,255,255,0.25)", fontSize: 16, padding: "0.5px 24px",
                    borderRadius: 999, fontWeight: 400, letterSpacing: 1, display: "inline-block", marginBottom: 5, marginTop:15
                  }}>TERBATAS</span>
                  <h3 style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.15, textTransform: "uppercase", whiteSpace: "pre-line", marginBottom: 5 , marginTop: 2}}>{p.judul}</h3>
                  <p style={{ fontSize: 10, opacity: 0.85 }}>{p.batas}</p>
                </div>
                <div style={{ 
          position: "absolute", 
          right: -5, 
          bottom: 10, 
          width: 180, 
          height: 180, 
          zIndex: 1,
          filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.3))"
        }}>
          <img 
            src={p.img} // Pastikan p.img berisi path ke file PNG transparan kamu
            alt={p.judul}
            style={{ width: "100%", height: "100%", objectFit: "contain" }} 
          />
        </div>
              </div>
            
            ))}
          </div>
        </section>

        {/* ── Flash Sale Banner ── */}
        <Link href="/buyer/flashsale" style={{ textDecoration: "none", display: "block" }}>
          <div style={{
            position: "relative", height: 200, borderRadius: 10, overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.25)", cursor: "pointer",
          }}>
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80"
              alt="flash sale"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)",
            }} />
            <div style={{ position: "absolute", inset: 0, padding: "28px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontSize: 48, filter: "drop-shadow(0 0 16px #FFC107)" }}>⚡</span>
                <h2 style={{ fontSize: 48, fontWeight: 900, fontStyle: "italic", color: "white", letterSpacing: -2, textShadow: "0 0 30px rgba(255,193,7,0.4)" }}>Flash Sale</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {[[h,"JAM"],[m,"MENIT"],[s,"DETIK"]].map(([val, label], i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      background: "#EE8F36", color: "white", width: 58, height: 58, borderRadius: 12,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, boxShadow: "0 4px 16px rgba(238,143,54,0.6)",
                    }}>
                      <span style={{ fontSize: 20, lineHeight: 1.2, fontVariantNumeric: "tabular-nums" }}>{val}</span>
                      <span style={{ fontSize: 8, opacity: 0.8, textTransform: "uppercase" }}>{label}</span>
                    </div>
                    {i < 2 && <span style={{ color: "white", fontSize: 24, fontWeight: 900, opacity: 0.7 }}>:</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>

        {/* ── Tab Menu ── */}
        <section>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32 }}>
            {[["rekomendasi","Rekomendasi"],["terlaris","Terlaris"],["rating","Top Rating"]].map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "10px 32px", borderRadius: 999,
                border: activeTab === tab ? "none" : "1.5px solid #e5e7eb",
                background: activeTab === tab ? "linear-gradient(135deg,#BFA370,#8E754A)" : "white",
                color: activeTab === tab ? "white" : "#6b7280",
                fontSize: 15, fontWeight: activeTab === tab ? 700 : 400,
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: activeTab === tab ? "0 6px 20px rgba(191,163,112,0.4)" : "0 1px 4px rgba(0,0,0,0.05)",
                fontFamily: "Poppins, sans-serif",
              }}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {filteredProduk.map(p => (
              <ProductCard key={p.id} product={p} showCartButton showFavoriteButton />
            ))}
          </div>

          <Link href="/buyer/search" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingTop: 40, paddingBottom: 30, cursor: "pointer" }}>
              <div style={{
                width: 26, height: 26, background: "linear-gradient(135deg,#BFA370,#8E754A)",
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(191,163,112,0.4)",
                transition: "transform 0.2s",
              }}>
                <i className="ri-arrow-down-s-line" style={{ color: "white", fontSize: 20 }} />
              </div>
              <span style={{ color: "#BFA370", fontSize: 13, fontWeight: 500}}>Lihat Semua</span>
            </div>
          </Link>
        </section>

      </main>
    </div>
  );
}
