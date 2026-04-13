"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useCartStore } from "@/lib/useCartStore";
import { formatRupiah } from "@/lib/dummyData";
import Link from "next/link";
import { useState, useEffect } from "react";

const TABS = [
  { id: "semua", label: "Semua Pesanan" },
  { id: "keranjang", label: "Keranjang Saya" },
  { id: "konfirmasi", label: "Menunggu Konfirmasi" },
  { id: "berlangsung", label: "Sedang Berlangsung" },
  { id: "histori", label: "Histori Pesanan" },
];

// ── DUMMY orders for non-cart tabs ──
const DUMMY_KONFIRMASI = [
  { tokoId: 5, toko: "Ayam Goreng 39", items: [{nama:"Ayam Paha Atas",varian:"Super Pedas",harga:17000,qty:1},{nama:"Ayam Paha Bandung",varian:"Super Pedas Jeletot",harga:18000,qty:3}] },
  { tokoId: 6, toko: "Burjo Ambucuy", items: [{nama:"Ayam Paha Atas",varian:"Super Pedas",harga:17000,qty:1}] },
];
const DUMMY_BERLANGSUNG = [
  { tokoId: 5, toko: "Ayam Goreng 39", items: [{nama:"Ayam Paha Atas",varian:"Super Pedas",harga:17000,qty:1},{nama:"Ayam Paha Bandung",varian:"Super Pedas Jeletot",harga:18000,qty:3}], timer: 179, label: "Estimasi Selesai", menit: "25 menit", expanded: false },
  { tokoId: 6, toko: "Burjo Ambucuy", items: [{nama:"Ayam Paha Atas",varian:"Super Pedas",harga:17000,qty:1}], timer: 299, label: null, menit: null, expanded: false },
];
const DUMMY_HISTORI = [
  { tokoId: 5, toko: "Ayam Goreng 39", status: "Selesai", items: [{nama:"Ayam Paha Atas",varian:"Super Pedas",harga:17000,qty:1},{nama:"Ayam Paha Bandung",varian:"Super Pedas Jeletot",harga:18000,qty:3}] },
  { tokoId: 6, toko: "Burjo Ambucuy", status: "Selesai", items: [{nama:"Ayam Paha Atas",varian:"Super Pedas",harga:17000,qty:1}] },
];
const DUMMY_SEMUA = [
  { tokoId: 5, toko: "Ayam Goreng 39", status: "Selesai", items: [{nama:"Ayam Paha Atas",varian:"Super Pedas",harga:17000,qty:1},{nama:"Ayam Paha Bandung",varian:"Super Pedas Jeletot",harga:18000,qty:3}] },
  { tokoId: 6, toko: "Burjo Ambucuy", status: "Dibatalkan", items: [{nama:"Ayam Paha Atas",varian:"Super Pedas",harga:17000,qty:1}] },
];

function OrderTimer({ initialSecs }: { initialSecs: number }) {
  const [secs, setSecs] = useState(initialSecs);
  useEffect(() => {
    const iv = setInterval(() => setSecs(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(iv);
  }, []);
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return <span style={{ color: "#BFA370", fontWeight: 800, fontSize: 18, fontVariantNumeric: "tabular-nums" }}>{m}.{s}</span>;
}

function ItemRow({ item }: { item: { nama: string; varian: string; harga: number; qty: number } }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 140px 100px 120px", alignItems: "center", padding: "18px 24px", borderBottom: "1px solid #f5f5f5", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 64, height: 64, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: "#f5f0ea" }}>
          <img src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=70" alt={item.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div>
          <p style={{ fontWeight: 600, color: "#1a1a1a", fontSize: 14, marginBottom: 4 }}>{item.nama}</p>
          <span style={{ background: "#fef9f0", border: "1px solid #BFA370", color: "#BFA370", fontSize: 10, fontWeight: 600, padding: "2px 10px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <i className="ri-edit-2-line" style={{ fontSize: 10 }} /> {item.varian}
          </span>
        </div>
      </div>
      <p style={{ color: "#BFA370", fontWeight: 700, fontSize: 14, textAlign: "center" }}>{formatRupiah(item.harga)}</p>
      <p style={{ textAlign: "center", color: "#555", fontSize: 14 }}>x{item.qty}</p>
      <p style={{ color: "#BFA370", fontWeight: 700, fontSize: 14, textAlign: "right" }}>{formatRupiah(item.harga * item.qty)}</p>
    </div>
  );
}

export default function KeranjangPage() {
  const [activeTab, setActiveTab] = useState("keranjang");
  const { items, removeItem, changeQty, toggleItemCheck, toggleStoreCheck, selectedTotal, selectedCount, selectedStore, cartCount } = useCartStore();
  const [expandedOrders, setExpandedOrders] = useState<Record<number, boolean>>({});

  // Group cart items by store
  const groupedByStore: Record<string, typeof items> = {};
  items.forEach(item => {
    const key = `${item.tokoId}-${item.toko}`;
    if (!groupedByStore[key]) groupedByStore[key] = [];
    groupedByStore[key].push(item);
  });

  const isMultiStore = selectedStore() === -1;

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <BuyerHeader />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* Tab Nav */}
        <div style={{ display: "flex", borderBottom: "2px solid #e9e7e3", marginBottom: 28, overflowX: "auto", gap: 0 }} className="no-scrollbar">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{
                padding: "14px 24px", whiteSpace: "nowrap", fontSize: 14,
                fontWeight: activeTab === t.id ? 600 : 400,
                color: activeTab === t.id ? "#1a1a1a" : "#9ca3af",
                background: "none", border: "none", cursor: "pointer",
                borderBottom: activeTab === t.id ? "2.5px solid #BFA370" : "2.5px solid transparent",
                marginBottom: -2, transition: "all 0.2s",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {t.label}
              {t.id === "keranjang" && cartCount() > 0 && (
                <span style={{
                  marginLeft: 6, background: "#BFA370", color: "white",
                  fontSize: 10, borderRadius: 999, padding: "1px 7px", fontWeight: 700,
                }}>{cartCount()}</span>
              )}
            </button>
          ))}
        </div>

        {/* ══ KERANJANG SAYA ══ */}
        {activeTab === "keranjang" && (
          <div>
            {/* Multi-store warning */}
            {isMultiStore && (
              <div style={{
                background: "#fef3cd", border: "1px solid #fbbf24", borderRadius: 12,
                padding: "14px 20px", marginBottom: 16,
                display: "flex", alignItems: "center", gap: 12,
              }}>
                <i className="ri-error-warning-line" style={{ color: "#d97706", fontSize: 20, flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 700, color: "#d97706", fontSize: 14 }}>Pesanan dari beberapa toko dipilih</p>
                  <p style={{ fontSize: 12, color: "#92400e" }}>Hanya bisa checkout dari 1 toko dalam satu waktu. Silakan pilih dari toko yang sama.</p>
                </div>
              </div>
            )}

            {/* Column Headers */}
            <div style={{ background: "white", borderRadius: 12, padding: "12px 24px", marginBottom: 12, display: "grid", gridTemplateColumns: "1fr 140px 100px 120px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <span style={{ color: "#BFA370", fontWeight: 800, fontSize: 22 }}>Produk</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Harga Satuan</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Kuantitas</span>
              <span style={{ textAlign: "right", color: "#555", fontSize: 13, fontWeight: 500 }}>Total</span>
            </div>

            {/* Stores */}
            {Object.entries(groupedByStore).map(([key, storeItems]) => {
              const tokoId = storeItems[0].tokoId;
              const tokoNama = storeItems[0].toko;
              const allChecked = storeItems.every(i => i.checked);
              const someChecked = storeItems.some(i => i.checked);
              const storeTotal = storeItems.reduce((a, i) => a + i.harga * i.qty, 0);
              const expanded = expandedOrders[tokoId] !== false; // default expanded

              return (
                <div key={key} style={{ background: "white", borderRadius: 16, marginBottom: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  {/* Store Header */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 24px", borderBottom: "1px solid #f5f5f5" }}>
                    {/* Store checkbox */}
                    <button onClick={() => toggleStoreCheck(tokoId, !allChecked)}
                      style={{
                        width: 20, height: 20, borderRadius: 6,
                        border: `2px solid ${allChecked ? "#BFA370" : someChecked ? "#BFA370" : "#d1d5db"}`,
                        background: allChecked ? "#BFA370" : "white",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, transition: "all 0.15s",
                        position: "relative",
                      }}>
                      {allChecked && <i className="ri-check-line" style={{ color: "white", fontSize: 12 }} />}
                      {!allChecked && someChecked && <div style={{ width: 8, height: 2, background: "#BFA370", borderRadius: 2 }} />}
                    </button>
                    <i className="ri-store-2-line" style={{ color: "#BFA370", fontSize: 18 }} />
                    <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15 }}>{tokoNama}</span>
                  </div>

                  {/* Items */}
                  {storeItems.map(item => (
                    <div key={item.id} style={{ display: "grid", gridTemplateColumns: "1fr 140px 130px 120px 40px", alignItems: "center", padding: "18px 24px", borderBottom: "1px solid #f8f8f8", gap: 16 }}>
                      {/* Product info */}
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button onClick={() => toggleItemCheck(item.id)}
                          style={{
                            width: 18, height: 18, borderRadius: 4,
                            border: `2px solid ${item.checked ? "#BFA370" : "#d1d5db"}`,
                            background: item.checked ? "#BFA370" : "white",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0, transition: "all 0.15s",
                          }}>
                          {item.checked && <i className="ri-check-line" style={{ color: "white", fontSize: 11 }} />}
                        </button>
                        <div style={{ width: 64, height: 64, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                          <img src={item.img} alt={item.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div>
                          <p style={{ fontWeight: 600, color: "#1a1a1a", fontSize: 14, marginBottom: 4 }}>{item.nama}</p>
                          <span style={{ background: "#fef9f0", border: "1px solid #BFA370", color: "#BFA370", fontSize: 10, fontWeight: 600, padding: "2px 10px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <i className="ri-edit-2-line" style={{ fontSize: 10 }} /> {item.varian}
                          </span>
                        </div>
                      </div>
                      {/* Price */}
                      <p style={{ color: "#BFA370", fontWeight: 700, fontSize: 14, textAlign: "center" }}>{formatRupiah(item.harga)}</p>
                      {/* Qty control */}
                      <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                        <button onClick={() => changeQty(item.id, -1)}
                          style={{ width: 28, height: 28, borderRadius: 8, border: "1.5px solid #e5e7eb", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#555", transition: "all 0.15s" }}
                          onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#BFA370"; el.style.color = "white"; el.style.borderColor = "#BFA370"; }}
                          onMouseLeave={e => { const el = e.currentTarget; el.style.background = "white"; el.style.color = "#555"; el.style.borderColor = "#e5e7eb"; }}
                        >−</button>
                        <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)}
                          style={{ width: 28, height: 28, borderRadius: 8, border: "1.5px solid #e5e7eb", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#555", transition: "all 0.15s" }}
                          onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#BFA370"; el.style.color = "white"; el.style.borderColor = "#BFA370"; }}
                          onMouseLeave={e => { const el = e.currentTarget; el.style.background = "white"; el.style.color = "#555"; el.style.borderColor = "#e5e7eb"; }}
                        >+</button>
                      </div>
                      {/* Total */}
                      <p style={{ color: "#BFA370", fontWeight: 700, fontSize: 14, textAlign: "right" }}>{formatRupiah(item.harga * item.qty)}</p>
                      {/* Remove */}
                      <button onClick={() => removeItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#d1d5db", transition: "color 0.15s" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "#ef4444")}
                        onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "#d1d5db")}
                      >
                        <i className="ri-close-line" style={{ fontSize: 20 }} />
                      </button>
                    </div>
                  ))}

                  {/* Store Footer */}
                  <div>
                    <button onClick={() => setExpandedOrders(prev => ({ ...prev, [tokoId]: !expanded }))}
                      style={{ width: "100%", background: "#fafaf9", border: "none", borderTop: "1px solid #f5f5f5", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                        <i className="ri-shopping-bag-line" style={{ color: "#BFA370" }} />
                        <span>{storeItems.length} item</span>
                        <span style={{ color: "#d1d5db" }}>•</span>
                        <span>Total <strong style={{ color: "#BFA370" }}>{formatRupiah(storeTotal)}</strong></span>
                      </div>
                      <i className={expanded ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} style={{ color: "#9ca3af", fontSize: 18 }} />
                    </button>

                    {expanded && (
                      <div style={{ padding: "12px 24px 16px", display: "flex", gap: 10 }}>
                        <button style={{
                          flex: 1, padding: "10px 0", borderRadius: 10, border: "1.5px solid #e5e7eb",
                          background: "white", color: "#555", fontSize: 13, fontWeight: 500, cursor: "pointer",
                          fontFamily: "Poppins, sans-serif", transition: "all 0.15s",
                        }}
                          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#f9f5f0")}
                          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "white")}
                        >Pesan Lagi</button>
                        <Link href="/buyer/keranjang/konfirmasi" style={{ flex: 2, textDecoration: "none" }}>
                          <button
                            disabled={isMultiStore || !storeItems.some(i => i.checked)}
                            style={{
                              width: "100%", padding: "10px 0", borderRadius: 10, border: "none",
                              background: isMultiStore || !storeItems.some(i => i.checked) ? "#d1d5db" : "#22C55E",
                              color: "white", fontSize: 13, fontWeight: 700, cursor: isMultiStore || !storeItems.some(i => i.checked) ? "not-allowed" : "pointer",
                              fontFamily: "Poppins, sans-serif", transition: "all 0.15s",
                            }}>Pesan Sekarang</button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {items.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
                <i className="ri-shopping-bag-line" style={{ fontSize: 64, display: "block", marginBottom: 16 }} />
                <p style={{ fontSize: 16, fontWeight: 500 }}>Keranjang kosong</p>
                <Link href="/" style={{ color: "#BFA370", fontSize: 13, fontWeight: 600, marginTop: 12, display: "inline-block", textDecoration: "none" }}>← Belanja sekarang</Link>
              </div>
            )}

            {/* Sticky bottom bar */}
            {selectedCount() > 0 && (
              <div style={{
                position: "fixed", bottom: 0, left: 0, right: 0,
                background: "white", borderTop: "1px solid #e9e7e3",
                padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                boxShadow: "0 -8px 32px rgba(0,0,0,0.1)", zIndex: 40,
              }}>
                <div>
                  <p style={{ fontSize: 13, color: "#9ca3af" }}>{selectedCount()} item dipilih</p>
                  <p style={{ fontSize: 22, fontWeight: 800, color: "#BFA370" }}>{formatRupiah(selectedTotal())}</p>
                </div>
                <Link href="/buyer/keranjang/konfirmasi" style={{ textDecoration: "none" }}>
                  <button
                    disabled={isMultiStore}
                    style={{
                      padding: "14px 48px", borderRadius: 14, border: "none",
                      background: isMultiStore ? "#d1d5db" : "linear-gradient(135deg,#BFA370,#8E754A)",
                      color: "white", fontSize: 16, fontWeight: 700, cursor: isMultiStore ? "not-allowed" : "pointer",
                      boxShadow: isMultiStore ? "none" : "0 6px 20px rgba(191,163,112,0.4)",
                      fontFamily: "Poppins, sans-serif",
                    }}>
                    {isMultiStore ? "Pilih 1 Toko Saja" : "Pesan & Bayar"}
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* ══ MENUNGGU KONFIRMASI ══ */}
        {activeTab === "konfirmasi" && (
          <div>
            <div style={{ background: "#fef9ec", border: "1px solid #f5dfa0", borderRadius: 14, padding: "16px 24px", marginBottom: 20, display: "flex", gap: 14, alignItems: "center" }}>
              <i className="ri-time-line" style={{ color: "#BFA370", fontSize: 28, flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 700, color: "#BFA370", fontSize: 14 }}>Menunggu konfirmasi penjual</p>
                <p style={{ fontSize: 12, color: "#92400e" }}>Setelah dikonfirmasi, pesanan dialihkan ke halaman &quot;Sedang Berlangsung&quot; untuk pembayaran.</p>
              </div>
            </div>
            <div style={{ background: "white", borderRadius: 12, padding: "12px 24px", marginBottom: 12, display: "grid", gridTemplateColumns: "1fr 140px 100px 120px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <span style={{ color: "#BFA370", fontWeight: 800, fontSize: 22 }}>Produk</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Harga Satuan</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Kuantitas</span>
              <span style={{ textAlign: "right", color: "#555", fontSize: 13, fontWeight: 500 }}>Total</span>
            </div>
            {DUMMY_KONFIRMASI.map((order, i) => {
              const total = order.items.reduce((a, item) => a + item.harga * item.qty, 0);
              const itemCount = order.items.reduce((a, item) => a + item.qty, 0);
              return (
                <div key={i} style={{ background: "white", borderRadius: 16, marginBottom: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "14px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", alignItems: "center", gap: 10 }}>
                    <i className="ri-store-2-line" style={{ color: "#BFA370" }} />
                    <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15 }}>{order.toko}</span>
                  </div>
                  {order.items.map((item, j) => <ItemRow key={j} item={item} />)}
                  <div style={{ padding: "12px 24px", borderTop: "1px solid #f5f5f5", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, background: "#fafaf9", border: "1px solid #e9e7e3", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#555" }}>
                      <i className="ri-shopping-bag-line" style={{ color: "#BFA370" }} />
                      <span>{itemCount} item</span>
                      <span style={{ color: "#d1d5db" }}>•</span>
                      <span>Total <strong style={{ color: "#BFA370" }}>{formatRupiah(total)}</strong></span>
                    </div>
                    <button style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: "#ef4444", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                      Batalkan Pesanan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══ SEDANG BERLANGSUNG ══ */}
        {activeTab === "berlangsung" && (
          <div>
            <div style={{ background: "white", borderRadius: 12, padding: "12px 24px", marginBottom: 12, display: "grid", gridTemplateColumns: "1fr 140px 100px 120px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <span style={{ color: "#BFA370", fontWeight: 800, fontSize: 22 }}>Produk</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Harga Satuan</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Kuantitas</span>
              <span style={{ textAlign: "right", color: "#555", fontSize: 13, fontWeight: 500 }}>Total</span>
            </div>
            {DUMMY_BERLANGSUNG.map((order, i) => {
              const total = order.items.reduce((a, item) => a + item.harga * item.qty, 0);
              const itemCount = order.items.reduce((a, item) => a + item.qty, 0);
              const exp = expandedOrders[`bl-${i}`] !== undefined ? expandedOrders[`bl-${i}`] : false;
              return (
                <div key={i} style={{ background: "white", borderRadius: 16, marginBottom: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "14px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", alignItems: "center", gap: 10 }}>
                    <i className="ri-store-2-line" style={{ color: "#BFA370" }} />
                    <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15, flex: 1 }}>{order.toko}</span>
                    {order.label ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "#BFA370", fontSize: 13, fontWeight: 600 }}>Estimasi Selesai</span>
                        <span style={{ color: "#BFA370", fontWeight: 800, fontSize: 16 }}>{order.menit}</span>
                      </div>
                    ) : (
                      <OrderTimer initialSecs={order.timer} />
                    )}
                  </div>
                  {order.items.map((item, j) => <ItemRow key={j} item={item} />)}
                  <div style={{ padding: "12px 24px", borderTop: "1px solid #f5f5f5", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ flex: 1, background: "#fafaf9", border: "1px solid #e9e7e3", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#555", display: "flex", gap: 8, alignItems: "center" }}>
                      <i className="ri-shopping-bag-line" style={{ color: "#BFA370" }} />
                      <span>{itemCount} item</span>
                      <span style={{ color: "#d1d5db" }}>•</span>
                      <span>Total <strong style={{ color: "#BFA370" }}>{formatRupiah(total)}</strong></span>
                    </div>
                    <Link href="/buyer/keranjang/bayar">
                      <button style={{ padding: "10px 28px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                        Bayar Pesanan
                      </button>
                    </Link>
                  </div>
                  {/* Accordion */}
                  <button onClick={() => setExpandedOrders(prev => ({ ...prev, [`bl-${i}`]: !exp }))}
                    style={{ width: "100%", background: "#fafaf9", border: "none", borderTop: "1px solid #f5f5f5", padding: "10px", display: "flex", justifyContent: "center", cursor: "pointer" }}>
                    <i className={exp ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} style={{ color: "#9ca3af", fontSize: 20 }} />
                  </button>
                  {exp && (
                    <div style={{ padding: "16px 24px", borderTop: "1px solid #f5f5f5", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <i className="ri-check-line" style={{ color: "#22C55E", fontWeight: 700 }} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, color: "#1a1a1a", fontSize: 13 }}>Pesanan Dibuat</p>
                        <p style={{ fontSize: 11, color: "#9ca3af" }}>Pesanan berhasil dibuat</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══ HISTORI PESANAN ══ */}
        {activeTab === "histori" && (
          <div>
            <div style={{ background: "white", borderRadius: 12, padding: "12px 24px", marginBottom: 12, display: "grid", gridTemplateColumns: "1fr 140px 100px 120px 80px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <span style={{ color: "#BFA370", fontWeight: 800, fontSize: 22 }}>Produk</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Harga Satuan</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Kuantitas</span>
              <span style={{ textAlign: "right", color: "#555", fontSize: 13, fontWeight: 500 }}>Total</span>
              <span style={{ textAlign: "right", color: "#555", fontSize: 13, fontWeight: 500 }}>Ubah</span>
            </div>
            {DUMMY_HISTORI.map((order, i) => {
              const total = order.items.reduce((a, item) => a + item.harga * item.qty, 0);
              const itemCount = order.items.reduce((a, item) => a + item.qty, 0);
              const exp = expandedOrders[`h-${i}`] !== false;
              return (
                <div key={i} style={{ background: "white", borderRadius: 16, marginBottom: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "14px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", alignItems: "center", gap: 10 }}>
                    <i className="ri-store-2-line" style={{ color: "#BFA370" }} />
                    <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15, flex: 1 }}>{order.toko}</span>
                    <span style={{ color: "#BFA370", fontWeight: 700, fontSize: 14 }}>Selesai</span>
                  </div>
                  {order.items.map((item, j) => <ItemRow key={j} item={item} />)}
                  <button onClick={() => setExpandedOrders(prev => ({ ...prev, [`h-${i}`]: !exp }))}
                    style={{ width: "100%", background: "#fafaf9", border: "none", borderTop: "1px solid #f5f5f5", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#555" }}>
                      <i className="ri-shopping-bag-line" style={{ color: "#BFA370" }} />
                      <span>{itemCount} item</span>
                      <span style={{ color: "#d1d5db" }}>•</span>
                      <span>Total <strong style={{ color: "#BFA370" }}>{formatRupiah(total)}</strong></span>
                    </div>
                    <i className={exp ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} style={{ color: "#9ca3af", fontSize: 18 }} />
                  </button>
                  {exp && (
                    <div style={{ padding: "12px 24px 16px", display: "flex", gap: 10 }}>
                      <button style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "white", color: "#555", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Pesan Lagi</button>
                      <button style={{ flex: 2, padding: "10px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Beri Ulasan</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ══ SEMUA PESANAN ══ */}
        {activeTab === "semua" && (
          <div>
            <div style={{ background: "white", borderRadius: 12, padding: "12px 24px", marginBottom: 12, display: "grid", gridTemplateColumns: "1fr 140px 100px 120px 80px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <span style={{ color: "#BFA370", fontWeight: 800, fontSize: 22 }}>Produk</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Harga Satuan</span>
              <span style={{ textAlign: "center", color: "#555", fontSize: 13, fontWeight: 500 }}>Kuantitas</span>
              <span style={{ textAlign: "right", color: "#555", fontSize: 13, fontWeight: 500 }}>Total</span>
              <span style={{ textAlign: "right", color: "#555", fontSize: 13, fontWeight: 500 }}>Ubah</span>
            </div>
            {DUMMY_SEMUA.map((order, i) => {
              const total = order.items.reduce((a, item) => a + item.harga * item.qty, 0);
              const itemCount = order.items.reduce((a, item) => a + item.qty, 0);
              const exp = expandedOrders[`s-${i}`] !== false;
              const isSelesai = order.status === "Selesai";
              return (
                <div key={i} style={{ background: "white", borderRadius: 16, marginBottom: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ padding: "14px 24px", borderBottom: "1px solid #f5f5f5", display: "flex", alignItems: "center", gap: 10 }}>
                    <i className="ri-store-2-line" style={{ color: "#BFA370" }} />
                    <span style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15, flex: 1 }}>{order.toko}</span>
                    <span style={{ color: isSelesai ? "#BFA370" : "#ef4444", fontWeight: 700, fontSize: 14 }}>{order.status}</span>
                  </div>
                  {order.items.map((item, j) => (
                    <div key={j} style={{ opacity: isSelesai ? 1 : 0.5 }}>
                      <ItemRow item={item} />
                    </div>
                  ))}
                  <button onClick={() => setExpandedOrders(prev => ({ ...prev, [`s-${i}`]: !exp }))}
                    style={{ width: "100%", background: "#fafaf9", border: "none", borderTop: "1px solid #f5f5f5", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: isSelesai ? "#555" : "#9ca3af" }}>
                      <i className="ri-shopping-bag-line" style={{ color: isSelesai ? "#BFA370" : "#9ca3af" }} />
                      <span>{itemCount} item</span>
                      <span style={{ color: "#d1d5db" }}>•</span>
                      <span>Total <strong style={{ color: isSelesai ? "#BFA370" : "#9ca3af" }}>{formatRupiah(total)}</strong></span>
                    </div>
                    <i className={exp ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} style={{ color: "#9ca3af", fontSize: 18 }} />
                  </button>
                  {exp && (
                    <div style={{ padding: "12px 24px 16px", display: "flex", gap: 10 }}>
                      <button style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1.5px solid #e5e7eb", background: "white", color: "#555", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Pesan Lagi</button>
                      {isSelesai && <button style={{ flex: 2, padding: "10px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>Beri Ulasan</button>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}