"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useState, useEffect } from "react";
import { FLASH_SALE_ITEMS, FlashSaleItem, formatRupiah } from "@/lib/dummyData";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

const TIME_SLOTS = [
  { id: "18:00", label: "18:00", sub: "ongoing" },
  { id: "21:00", label: "21:00", sub: "Coming Soon" },
  { id: "00:00", label: "00:00", sub: "Tomorrow" },
];
const MENU_TABS = ["Rekomendasi", "Terlaris", "Sekitarmu"];

export default function FlashSalePage() {
  const [activeTime, setActiveTime] = useState("18:00");
  const [activeMenu, setActiveMenu] = useState("Rekomendasi");
  const [seconds, setSeconds] = useState(4 * 60 + 35);
  const { addItem, setToast } = useCartStore();

  useEffect(() => {
    const iv = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(iv);
  }, []);

  const isOngoing = activeTime === "18:00";
  const tabType = activeMenu === "Rekomendasi" ? "rekomendasi" : activeMenu === "Terlaris" ? "terlaris" : "sekitarmu";
  const filtered = FLASH_SALE_ITEMS.filter(i => i.type === tabType);

  // Timer digits split for display
  const totalMins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const d0 = Math.floor(totalMins / 10);
  const d1 = totalMins % 10;
  const d2 = Math.floor(secs / 10);
  const d3 = secs % 10;

  const handleBuy = (item: FlashSaleItem) => {
    addItem({
      productId: item.id,
      nama: item.nama,
      harga: item.harga,
      img: item.img,
      toko: item.toko,
      tokoId: item.tokoId,
      varian: "Original",
      qty: 1,
    });
  };

  const DigitBox = ({ n }: { n: number }) => (
    <div style={{
      width: 70, height: 80, background: "#EE8F36", borderRadius: 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 44, fontWeight: 900, color: "white",
      boxShadow: "0 4px 16px rgba(238,143,54,0.5)",
      fontVariantNumeric: "tabular-nums",
    }}>{n}</div>
  );

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <BuyerHeader />

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 32px 60px" }}>

        {/* ── Flash Sale Header Banner ── */}
        <div style={{
          background: "white", borderRadius: 20, padding: "32px 0 0",
          marginBottom: 0, overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={{ fontSize: 36, fontWeight: 700, color: "#555", marginBottom: 6 }}>Flash Sale</h1>
            <p style={{ fontSize: 13, color: "#9ca3af", letterSpacing: 1, textTransform: "lowercase" }}>ends in</p>
          </div>

          {/* Countdown digits */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 28 }}>
            <DigitBox n={d0} />
            <DigitBox n={d1} />
            <span style={{ fontSize: 40, fontWeight: 900, color: "#EE8F36", margin: "0 4px" }}>:</span>
            <DigitBox n={d2} />
            <DigitBox n={d3} />
          </div>

          {/* Time slot tabs */}
          <div style={{ display: "flex" }}>
            {TIME_SLOTS.map((slot) => {
              const isActive = activeTime === slot.id;
              return (
                <button key={slot.id} onClick={() => setActiveTime(slot.id)}
                  style={{
                    flex: 1, padding: "18px 0", border: "none", cursor: "pointer",
                    background: isActive ? "linear-gradient(135deg, #BFA370, #8E754A)" : "#aaa",
                    transition: "background 0.2s",
                    fontFamily: "Poppins, sans-serif",
                  }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "white" }}>{slot.label}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>{slot.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Menu Tabs ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 28, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 0 }}>
            {MENU_TABS.map(tab => {
              const isActive = activeMenu === tab;
              return (
                <button key={tab} onClick={() => setActiveMenu(tab)}
                  style={{
                    padding: "10px 32px", border: "none", background: "none", cursor: "pointer",
                    fontSize: 15, fontWeight: isActive ? 700 : 400,
                    color: isActive ? "#1a1a1a" : "#9ca3af",
                    borderBottom: isActive ? "3px solid #BFA370" : "3px solid #e9e7e3",
                    transition: "all 0.2s", fontFamily: "Poppins, sans-serif",
                  }}
                >{tab}</button>
              );
            })}
          </div>
          <Link href="/buyer/search" style={{ color: "#BFA370", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            Lihat Selengkapnya <i className="ri-arrow-right-s-line" style={{ fontSize: 16 }} />
          </Link>
        </div>

        {/* ── Product Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {filtered.map(item => (
            <div key={item.id} style={{
              background: "white", borderRadius: 16, overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid #f1f0ee",
              transition: "all 0.25s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "none"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                <img src={item.img} alt={item.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {/* Best Seller badge */}
                {item.isBestSeller && isOngoing && (
                  <div style={{
                    position: "absolute", top: 0, right: 0,
                    background: "linear-gradient(135deg, #EE8F36, #ff6b00)",
                    color: "white", fontSize: 10, fontWeight: 800,
                    padding: "6px 14px",
                    clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)",
                    display: "flex", alignItems: "center", gap: 4,
                  }}>
                    <i className="ri-fire-fill" style={{ fontSize: 11 }} /> 5RB+ Terjual
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "14px 14px 0" }}>
                <p style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15, marginBottom: 6 }}>{item.nama}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
                  <i className="ri-star-fill" style={{ color: "#EAB308", fontSize: 13 }} />
                  <span style={{ color: "#f97316", fontWeight: 700, fontSize: 13 }}>{item.rating}</span>
                  <span style={{ color: "#9ca3af", fontSize: 12 }}>({item.ulasan})</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: "#BFA370", fontWeight: 800, fontSize: 18 }}>{formatRupiah(item.harga)}</span>
                  <span style={{ color: "#9ca3af", fontSize: 12, textDecoration: "line-through" }}>{formatRupiah(item.hargaAsli)}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12, fontSize: 12, color: "#9ca3af" }}>
                  <i className="ri-map-pin-2-line" style={{ fontSize: 13 }} />
                  <span>{item.jarak}</span>
                </div>
              </div>

              {/* CTA button */}
              {isOngoing ? (
                <button onClick={() => handleBuy(item)}
                  style={{
                    width: "100%", padding: "14px 0", border: "none",
                    background: "linear-gradient(135deg, #BFA370, #8E754A)",
                    color: "white", fontSize: 14, fontWeight: 700,
                    cursor: "pointer", fontFamily: "Poppins, sans-serif",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
                >
                  Beli Sekarang
                </button>
              ) : (
                <button disabled style={{
                  width: "100%", padding: "14px 0", border: "none",
                  background: "#9ca3af", color: "white", fontSize: 14, fontWeight: 700,
                  cursor: "not-allowed", fontFamily: "Poppins, sans-serif",
                }}>
                  Belum Tersedia
                </button>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
            <i className="ri-shopping-bag-line" style={{ fontSize: 56, display: "block", marginBottom: 12 }} />
            <p style={{ fontSize: 15 }}>Tidak ada produk untuk tab ini</p>
          </div>
        )}
      </main>
    </div>
  );
}