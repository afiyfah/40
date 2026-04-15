"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useCartStore } from "@/store/useCartStore";
import { TOKO_LIST, PRODUK_LIST, TOKO_MENU_DATA, formatRupiah, type Product } from "@/lib/dummyData";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const MENU_TABS = ["Semua Menu", "Terlaris", "Top Rating"] as const;

// Small inline menu card that matches the screenshot design
function MenuCard({ p }: { p: Product }) {
  const { addItem, toggleFavorite, isFavorite } = useCartStore();
  const fav = isFavorite(p.id);

  return (
    <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "white", borderRadius: 16,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          border: "1px solid #f1f0ee",
          overflow: "hidden", cursor: "pointer",
          transition: "all 0.22s",
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-3px)"; el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.13)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
      >
        {/* Badge */}
        {p.badge === "best-seller" && (
          <div style={{ position: "absolute", top: 0, left: 0, zIndex: 10, background: "linear-gradient(135deg,#EE8F36,#ff6b00)", color: "white", fontSize: 9, fontWeight: 800, padding: "4px 12px 4px 8px", clipPath: "polygon(0 0,100% 0,88% 100%,0 100%)", borderRadius: "12px 0 0 0" }}>
            ⭐ BEST SELLER
          </div>
        )}
        {p.badge === "new" && (
          <div style={{ position: "absolute", top: 0, left: 0, zIndex: 10, background: "linear-gradient(135deg,#22C55E,#16a34a)", color: "white", fontSize: 9, fontWeight: 800, padding: "4px 12px 4px 8px", clipPath: "polygon(0 0,100% 0,88% 100%,0 100%)", borderRadius: "12px 0 0 0" }}>
            ✨ NEW
          </div>
        )}
        {/* Image */}
        <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
          <img src={p.img} alt={p.nama} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
            onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.06)")}
            onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")} />
          {/* Fav overlay */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(p.id); }}
            style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(4px)", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.13)", transition: "transform 0.15s" }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.15)")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
          >
            <i className={fav ? "ri-heart-3-fill" : "ri-heart-3-line"} style={{ fontSize: 17, color: fav ? "#ef4444" : "#9ca3af" }} />
          </button>
        </div>
        {/* Info */}
        <div style={{ padding: "12px 14px 14px" }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.nama}</p>
          <p style={{ color: "#16a34a", fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{formatRupiah(p.harga)}</p>
          <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 6 }}>{p.terjual} terjual | {p.jarak} | {p.waktu}</div>
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleFavorite(p.id); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}
          >
            <i className={fav ? "ri-heart-3-fill" : "ri-heart-3-line"} style={{ fontSize: 13, color: fav ? "#ef4444" : "#d1d5db" }} />
            <span style={{ fontSize: 10, color: "#9ca3af" }}>Disukai oleh {p.suka + (fav ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}

function ProfilTokoContent() {
  const params = useSearchParams();
  const router = useRouter();
  const tokoId = Number(params.get("id")) || 5;
  const toko = TOKO_LIST.find(t => t.id === tokoId) || TOKO_LIST[4]; // default Ayam Goreng 39

  const { toggleFavorite, isFavorite } = useCartStore();
  const favToko = isFavorite(-toko.id);

  const [activeTab, setActiveTab] = useState<"Home" | "All Menu">("Home");
  const [menuTab, setMenuTab] = useState<typeof MENU_TABS[number]>("Semua Menu");

  // Get products for this toko — use TOKO_MENU_DATA if available, else fallback to PRODUK_LIST
  const tokoMenuData = TOKO_MENU_DATA.find(d => d.tokoId === tokoId);
  const allTokoProducts: Product[] = tokoMenuData
    ? tokoMenuData.produk
    : PRODUK_LIST.filter(p => p.tokoId === tokoId);

  // Rekomendasi = terlaris or just first batch
  const rekomendasiProduk = allTokoProducts
    .filter(p => p.type === "terlaris" || p.badge === "best-seller")
    .slice(0, 8)
    .concat(allTokoProducts.slice(0, 8))
    .filter((p, i, arr) => arr.findIndex(x => x.id === p.id) === i)
    .slice(0, 8);

  // All Menu filtered by tab
  const filteredMenu = allTokoProducts.filter(p => {
    if (menuTab === "Terlaris") return p.type === "terlaris";
    if (menuTab === "Top Rating") return p.rating >= 4.8;
    return true; // Semua Menu
  });

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <BuyerHeader />

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px 80px" }}>

        {/* ── Store Profile Card (double-card design) ── */}
        <div style={{ marginBottom: 32, borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          {/* Background card */}
          <div style={{ background: "#F1F3E9", padding: "28px 32px 0", position: "relative" }}>

            {/* Reservasi badge top-right */}
            <div style={{ position: "absolute", top: 24, right: 28 }}>
              <div style={{ background: "white", border: "1.5px solid #d1fae5", borderRadius: 999, padding: "7px 18px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#22C55E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <i className="ri-check-line" style={{ color: "white", fontSize: 12 }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#16a34a" }}>Reservasi</span>
              </div>
            </div>

            {/* Profile row */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, paddingBottom: 24 }}>
              {/* Avatar */}
              <div style={{ width: 110, height: 110, borderRadius: "50%", overflow: "hidden", border: "4px solid white", boxShadow: "0 4px 20px rgba(0,0,0,0.14)", flexShrink: 0 }}>
                <img
                  src={toko.avatar || toko.img}
                  alt={toko.nama}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    (el.parentElement as HTMLDivElement).style.background = "#BFA370";
                    (el.parentElement as HTMLDivElement).innerHTML = `<span style="color:white;font-size:36px;font-weight:900;display:flex;align-items:center;justify-content:center;width:100%;height:100%">${toko.nama[0]}</span>`;
                  }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <h1 style={{ fontSize: 30, fontWeight: 900, color: "#1a1a1a", marginBottom: 8 }}>{toko.nama}</h1>
                {/* Stars */}
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 18 }}>
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-s-fill" style={{ fontSize: 24, color: i < Math.floor(toko.rating) ? "#EAB308" : "#e5e7eb" }} />
                  ))}
                  <span style={{ background: "#6b7280", color: "white", fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 999, marginLeft: 4 }}>{toko.rating}</span>
                </div>
                {/* Action buttons */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 20px", background: "#BFA370", color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#8E754A")}
                    onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#BFA370")}>
                    <i className="ri-navigation-fill" style={{ fontSize: 14 }} /> Menuju Lokasi
                  </button>
                  <Link href="/buyer/chat-toko" style={{ textDecoration: "none" }}>
                    <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 20px", background: "white", color: "#555", border: "1.5px solid #ddd", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                      onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#f9f5f0")}
                      onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "white")}>
                      <i className="ri-chat-3-line" style={{ color: "#BFA370" }} /> Hubungi Penjual
                    </button>
                  </Link>
                  {/* Love button */}
                  <button
                    onClick={() => toggleFavorite(-toko.id)}
                    style={{ padding: "8px 14px", background: "white", border: `1.5px solid ${favToko ? "#fecaca" : "#ddd"}`, borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s", fontSize: 13, fontWeight: 600, color: favToko ? "#ef4444" : "#9ca3af" }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = "#fecaca"; el.style.color = "#ef4444"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = favToko ? "#fecaca" : "#ddd"; el.style.color = favToko ? "#ef4444" : "#9ca3af"; }}
                  >
                    <i className={favToko ? "ri-heart-3-fill" : "ri-heart-3-line"} style={{ fontSize: 18 }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tab nav inside the card */}
            <div style={{ display: "flex", borderTop: "1.5px solid #ddd9ce", marginTop: 0 }}>
              {(["Home", "All Menu"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  style={{ padding: "14px 28px", fontSize: 15, fontWeight: activeTab === tab ? 700 : 400, color: activeTab === tab ? "#1a1a1a" : "#6b7280", background: "none", border: "none", cursor: "pointer", borderBottom: activeTab === tab ? "2.5px solid #1a1a1a" : "2.5px solid transparent", marginBottom: -1, transition: "all 0.2s", fontFamily: "Poppins,sans-serif" }}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── HOME TAB ── */}
        {activeTab === "Home" && (
          <>
            {/* Description */}
            <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.8, marginBottom: 40, textAlign: "justify", maxWidth: 900 }}>
              {toko.deskripsi || "Selamat datang! Kami menyajikan menu-menu pilihan terbaik dengan bahan segar berkualitas tinggi. Pesan sekarang dan nikmati cita rasa autentik kami!"}
            </p>

            {/* Rekomendasi – horizontal scroll */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#BFA370" }}>Rekomendasi</h2>
                <button onClick={() => setActiveTab("All Menu")}
                  style={{ display: "flex", alignItems: "center", gap: 4, color: "#BFA370", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>
                  Lihat Selengkapnya <i className="ri-arrow-right-s-line" style={{ fontSize: 16 }} />
                </button>
              </div>
              <div style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 12 }} className="no-scrollbar">
                {(rekomendasiProduk.length > 0 ? rekomendasiProduk : allTokoProducts.slice(0, 6)).map(p => (
                  <div key={p.id} style={{ minWidth: 260, flexShrink: 0, position: "relative" }}>
                    <MenuCard p={p} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── ALL MENU TAB ── */}
        {activeTab === "All Menu" && (
          <>
            {/* Tab filter row */}
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32 }}>
              {MENU_TABS.map(tab => (
                <button key={tab} onClick={() => setMenuTab(tab)}
                  style={{ padding: "10px 28px", borderRadius: 999, border: menuTab === tab ? "none" : "1.5px solid #e5e7eb", background: menuTab === tab ? "linear-gradient(135deg,#BFA370,#8E754A)" : "white", color: menuTab === tab ? "white" : "#6b7280", fontSize: 14, fontWeight: menuTab === tab ? 700 : 400, cursor: "pointer", fontFamily: "Poppins,sans-serif", transition: "all 0.2s", boxShadow: menuTab === tab ? "0 4px 16px rgba(191,163,112,0.4)" : "none" }}>
                  {tab}
                </button>
              ))}
            </div>

            {/* Product grid */}
            {filteredMenu.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, position: "relative" }}>
                {filteredMenu.map(p => (
                  <div key={p.id} style={{ position: "relative" }}>
                    <MenuCard p={p} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "64px 0", color: "#9ca3af" }}>
                <i className="ri-restaurant-line" style={{ fontSize: 52, display: "block", marginBottom: 12 }} />
                <p style={{ fontSize: 15 }}>Belum ada menu di kategori ini</p>
                <button onClick={() => setMenuTab("Semua Menu")} style={{ marginTop: 16, padding: "8px 24px", borderRadius: 10, border: "1.5px solid #BFA370", background: "none", color: "#BFA370", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>
                  Lihat Semua Menu
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function ProfilTokoPage() {
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#F5F4F0" }}>
        <div style={{ textAlign: "center", color: "#BFA370" }}>
          <i className="ri-loader-4-line" style={{ fontSize: 40, display: "block", marginBottom: 12, animation: "spin 1s linear infinite" }} />
          <p style={{ fontSize: 14 }}>Memuat profil toko...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    }>
      <ProfilTokoContent />
    </Suspense>
  );
}