"use client";
import BuyerHeader from "@/components/buyer/Header";
import { PRODUK_LIST, TOKO_MENU_DATA, formatRupiah } from "@/lib/dummyData";
import { useCartStore } from "@/store/useCartStore";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Find in PRODUK_LIST first, then in TOKO_MENU_DATA, then fallback
  const allMenuItems = TOKO_MENU_DATA.flatMap(t => t.produk);
  const product =
    PRODUK_LIST.find(p => p.id === Number(id)) ||
    allMenuItems.find(p => p.id === Number(id)) ||
    PRODUK_LIST[0];

  const { addItem, toggleFavorite, isFavorite, setToast } = useCartStore();
  const fav = isFavorite(product.id);
  const [qty, setQty] = useState(1);
  const [catatan, setCatatan] = useState("");

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        productId: product.id,
        nama: product.nama,
        harga: product.harga,
        img: product.img,
        toko: product.toko,
        tokoId: product.tokoId,
        varian: product.varian || "Original",
        qty: 1,
      });
    }
    // toast is triggered inside addItem
  };

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <BuyerHeader />

      {/* Back button — positioned outside card */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 32px 0" }}>
        <button onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: 15, fontWeight: 500, fontFamily: "Poppins,sans-serif", padding: 0, marginBottom: 20 }}>
          <i className="ri-arrow-left-line" style={{ fontSize: 22 }} />
        </button>
      </div>

      {/* Main detail card */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px 60px" }}>
        <div style={{ background: "white", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.08)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>

          {/* ── Left: Image ── */}
          <div style={{ position: "relative", minHeight: 500, overflow: "hidden" }}>
            <img
              src={product.img}
              alt={product.nama}
              style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 500 }}
            />
          </div>

          {/* ── Right: Info ── */}
          <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", overflowY: "auto", maxHeight: 680 }}>

            {/* Title + Heart */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", lineHeight: 1.25, flex: 1 }}>
                {product.nama}
              </h1>
              <button
                onClick={() => {
                  toggleFavorite(product.id);
                  if (!fav) setToast(product.nama + " ditambahkan ke favorit! ❤️");
                }}
                style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", marginLeft: 16, flexShrink: 0, padding: "4px 0" }}
              >
                <i className={fav ? "ri-heart-3-fill" : "ri-heart-3-line"}
                  style={{ fontSize: 20, color: fav ? "#ef4444" : "#9ca3af", transition: "color 0.2s" }} />
                <span style={{ fontSize: 13, color: "#9ca3af", fontWeight: 600 }}>
                  {product.suka + (fav ? 1 : 0)}
                </span>
              </button>
            </div>

            {/* Stars */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 18 }}>
              {[...Array(5)].map((_, i) => (
                <i key={i} className="ri-star-s-fill"
                  style={{ fontSize: 22, color: i < Math.floor(product.rating) ? "#EAB308" : "#e5e7eb" }} />
              ))}
              <span style={{ background: "#22C55E", color: "white", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999, marginLeft: 6 }}>
                {product.ulasan}
              </span>
            </div>

            {/* Price badge */}
            <div style={{ background: "linear-gradient(135deg,#ECDB9D,#FFC800)", borderRadius: 14, padding: "14px 22px", display: "inline-flex", alignItems: "baseline", gap: 12, marginBottom: 20, width: "fit-content" }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#3A2106" }}>
                {formatRupiah(product.harga)}
              </span>
              {product.hargaAsli && (
                <span style={{ color: "#7a5c1e", textDecoration: "line-through", fontSize: 15, fontWeight: 500 }}>
                  {formatRupiah(product.hargaAsli)}
                </span>
              )}
            </div>

            {/* Short description */}
            <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.75, marginBottom: 20, textAlign: "justify" }}>
              {product.deskripsi}
            </p>

            {/* Deskripsi Rasa */}
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ fontWeight: 800, color: "#1a1a1a", fontSize: 17, marginBottom: 8 }}>Deskripsi Rasa</h3>
              <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.75, textAlign: "justify" }}>
                {product.deskripsi}
              </p>
            </div>

            {/* Bahan Utama */}
            <div style={{ marginBottom: 22 }}>
              <h3 style={{ fontWeight: 800, color: "#1a1a1a", fontSize: 17, marginBottom: 8 }}>Bahan Utama</h3>
              <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.75, textAlign: "justify" }}>
                {product.bahan
                  ? `Makanan ini mengandung: ${product.bahan}.`
                  : `Makanan ini mengandung bahan-bahan segar berkualitas tinggi dari ${product.toko}.`}
              </p>
            </div>

            {/* Tambahkan Catatan */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", display: "block", marginBottom: 10 }}>
                Tambahkan Catatan
              </label>
              <div style={{ position: "relative" }}>
                <i className="ri-file-list-3-line" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 16, pointerEvents: "none" }} />
                <input
                  type="text"
                  placeholder="Tulis catatan di sini..."
                  value={catatan}
                  onChange={e => setCatatan(e.target.value)}
                  style={{ width: "100%", padding: "11px 16px 11px 42px", border: "1.5px solid #e9e7e3", borderRadius: 999, fontSize: 13, outline: "none", fontFamily: "Poppins,sans-serif", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={e => (e.target.style.borderColor = "#BFA370")}
                  onBlur={e => (e.target.style.borderColor = "#e9e7e3")}
                />
              </div>
            </div>

            {/* Qty + Add to cart */}
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: "auto" }}>
              {/* Qty stepper */}
              <div style={{ display: "flex", alignItems: "center", background: "#f1f0ee", borderRadius: 12, padding: "3px", flexShrink: 0 }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: 40, height: 40, borderRadius: 10, border: "none", background: "none", cursor: "pointer", fontWeight: 700, fontSize: 22, color: "#555", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(191,163,112,0.2)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "none")}
                >−</button>
                <span style={{ width: 44, textAlign: "center", fontWeight: 800, color: "#1a1a1a", fontSize: 18 }}>{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  style={{ width: 40, height: 40, borderRadius: 10, border: "none", background: "none", cursor: "pointer", fontWeight: 700, fontSize: 22, color: "#555", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(191,163,112,0.2)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "none")}
                >+</button>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAdd}
                style={{ flex: 1, padding: "14px 0", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins,sans-serif", boxShadow: "0 8px 24px rgba(58,33,6,0.3)", transition: "all 0.2s" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 12px 32px rgba(58,33,6,0.4)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = ""; el.style.boxShadow = "0 8px 24px rgba(58,33,6,0.3)"; }}
              >
                Tambahkan Pesanan
              </button>
            </div>

          </div>
        </div>

        {/* Meta info below card */}
        <div style={{ marginTop: 16, display: "flex", gap: 20, fontSize: 12, color: "#9ca3af", padding: "0 4px" }}>
          <span><i className="ri-store-2-line" style={{ marginRight: 4 }} />{product.toko}</span>
          <span>•</span>
          <span>{product.terjual} terjual</span>
          <span>•</span>
          <span>{product.jarak} | {product.waktu}</span>
          {product.varian && <><span>•</span><span>Varian: {product.varian}</span></>}
        </div>
      </main>
    </div>
  );
}