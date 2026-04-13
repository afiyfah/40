"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatRupiah, VOUCHERS } from "@/lib/dummyData";

interface CartRow { nama: string; varian: string; harga: number; qty: number; }
const CART: CartRow[] = [
  { nama: "Ayam Paha Atas", varian: "Super Pedas", harga: 17000, qty: 1 },
  { nama: "Ayam Paha Bandung", varian: "Super Pedas Jeletot", harga: 18000, qty: 3 },
];

export default function KonfirmasiPage() {
  const router = useRouter();
  const [cart, setCart] = useState(CART);
  const [tab, setTab] = useState<"ambil"|"reservasi">("ambil");
  const [showVoucher, setShowVoucher] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<typeof VOUCHERS[0] | null>(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);

  const changeQty = (i: number, d: number) => setCart(prev => prev.map((item, idx) => idx === i ? { ...item, qty: Math.max(1, item.qty + d) } : item));
  const removeItem = (i: number) => setCart(prev => prev.filter((_, idx) => idx !== i));

  const subtotal = cart.reduce((a, c) => a + c.harga * c.qty, 0);
  const voucherDiskon = selectedVoucher?.diskon || 0;
  const reservasiBiaya = tab === "reservasi" ? 25000 : 0;
  const grandTotal = subtotal - voucherDiskon + reservasiBiaya;

  const handleBayar = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); router.push("/buyer/keranjang/bayar"); }, 1500);
  };

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <BuyerHeader />

      {/* Voucher Modal */}
      {showVoucher && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 80, overflowY: "auto" }}>
          <div style={{ background: "#F5F4F0", borderRadius: 20, width: "100%", maxWidth: 900, margin: "0 24px 40px", overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ background: "white", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid #f1f0ee" }}>
              <button onClick={() => setShowVoucher(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#555" }}>
                <i className="ri-arrow-left-line" style={{ fontSize: 22 }} />
              </button>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a" }}>Pilih atau Masukkan Voucher</h2>
            </div>

            {/* Code input */}
            <div style={{ display: "flex", gap: 12, padding: "24px 32px 16px", background: "white", borderBottom: "1px solid #f1f0ee" }}>
              <input value={voucherCode} onChange={e => setVoucherCode(e.target.value)} placeholder="Masukan Kode Voucher"
                style={{ flex: 1, border: "1.5px solid #e9e7e3", borderRadius: 12, padding: "14px 20px", fontSize: 15, outline: "none", fontFamily: "Poppins, sans-serif", color: "#333" }}
                onFocus={e => (e.target.style.borderColor = "#BFA370")}
                onBlur={e => (e.target.style.borderColor = "#e9e7e3")}
              />
              <button style={{ padding: "14px 40px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                Pakai
              </button>
            </div>

            {/* Voucher grid */}
            <div style={{ padding: "20px 32px", maxHeight: "50vh", overflowY: "auto" }} className="no-scrollbar">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {VOUCHERS.map(v => {
                  const isSelected = selectedVoucher?.id === v.id;
                  return (
                    <div key={v.id} onClick={() => setSelectedVoucher(isSelected ? null : v)}
                      style={{
                        background: "white", borderRadius: 14, overflow: "hidden",
                        border: `2px solid ${isSelected ? "#BFA370" : "#ede9e0"}`,
                        display: "flex", cursor: "pointer", transition: "all 0.2s",
                        boxShadow: isSelected ? "0 4px 16px rgba(191,163,112,0.3)" : "0 2px 8px rgba(0,0,0,0.06)",
                      }}>
                      {/* Left color strip */}
                      <div style={{ width: 6, background: isSelected ? "#BFA370" : "#ede9e0", flexShrink: 0, transition: "background 0.2s" }} />
                      {/* Image */}
                      <div style={{ width: 90, height: 90, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#fef9f0" }}>
                        <img src={v.img} alt={v.judul} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      {/* Divider */}
                      <div style={{ width: 1, background: "#ede9e0", flexShrink: 0, margin: "12px 0", borderLeft: "2px dashed #ede9e0", background: "none" }} />
                      {/* Content */}
                      <div style={{ flex: 1, padding: "12px 16px", borderLeft: "2px dashed #ede9e0" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          {/* Radio */}
                          <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${isSelected ? "#BFA370" : "#d1d5db"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                            {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#BFA370" }} />}
                          </div>
                          <div>
                            <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 4 }}>{v.judul}</p>
                            <p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.5, marginBottom: 6 }}>{v.desc}</p>
                            <p style={{ fontSize: 11, color: "#9ca3af" }}>{v.berlaku}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ padding: "16px 32px", background: "white", borderTop: "1px solid #f1f0ee" }}>
              <button onClick={() => setShowVoucher(false)}
                style={{ width: "100%", padding: "16px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                Selesai {selectedVoucher && `(Hemat ${formatRupiah(selectedVoucher.diskon)})`}
              </button>
            </div>
          </div>
        </div>
      )}

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <button onClick={() => router.back()} style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid #e9e7e3", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <i className="ri-arrow-left-line" style={{ fontSize: 18, color: "#555" }} />
          </button>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a" }}>Konfirmasi Pembayaran</h1>
        </div>

        {/* Order Summary Card */}
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.06)", marginBottom: 20, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 130px 120px 40px", padding: "16px 24px", borderBottom: "1px solid #f5f5f5", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#BFA370", fontWeight: 800, fontSize: 20 }}>Ringkasan Pesanan</span>
            <span style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: "#555" }}>Harga Satuan</span>
            <span style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: "#555" }}>Kuantitas</span>
            <span style={{ textAlign: "right", fontSize: 13, fontWeight: 500, color: "#555" }}>Total</span>
            <span style={{ textAlign: "center", fontSize: 13, fontWeight: 500, color: "#555" }}>Ubah</span>
          </div>

          {/* Store row */}
          <div style={{ padding: "12px 24px", background: "#fafaf9", borderBottom: "1px solid #f5f5f5", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>🏪</span>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>Ayam Goreng 39</span>
          </div>

          {/* Items */}
          {cart.map((item, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 130px 130px 120px 40px", padding: "20px 24px", borderBottom: "1px solid #f8f8f8", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 12, overflow: "hidden" }}>
                  <img src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=70" alt={item.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: "#1a1a1a", fontSize: 14, marginBottom: 4 }}>{item.nama}</p>
                  <span style={{ background: "#fef9f0", border: "1px solid #BFA370", color: "#BFA370", fontSize: 10, fontWeight: 600, padding: "2px 10px", borderRadius: 6, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <i className="ri-edit-2-line" style={{ fontSize: 10 }} /> {item.varian}
                  </span>
                </div>
              </div>
              <p style={{ color: "#BFA370", fontWeight: 700, textAlign: "center", fontSize: 14 }}>{formatRupiah(item.harga)}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                <button onClick={() => changeQty(i, -1)} style={{ width: 28, height: 28, borderRadius: 8, border: "1.5px solid #e5e7eb", background: "white", cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#BFA370"; el.style.color = "white"; el.style.borderColor = "#BFA370"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "white"; el.style.color = "#1a1a1a"; el.style.borderColor = "#e5e7eb"; }}
                >−</button>
                <span style={{ fontWeight: 700, fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => changeQty(i, 1)} style={{ width: 28, height: 28, borderRadius: 8, border: "1.5px solid #e5e7eb", background: "white", cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "#BFA370"; el.style.color = "white"; el.style.borderColor = "#BFA370"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "white"; el.style.color = "#1a1a1a"; el.style.borderColor = "#e5e7eb"; }}
                >+</button>
              </div>
              <p style={{ color: "#BFA370", fontWeight: 700, textAlign: "right", fontSize: 14 }}>{formatRupiah(item.harga * item.qty)}</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#d1d5db" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "#ef4444")}
                  onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "#d1d5db")}
                >
                  <i className="ri-close-line" style={{ fontSize: 20 }} />
                </button>
              </div>
            </div>
          ))}

          {/* Catatan */}
          <div style={{ margin: "0 24px 0", border: "1px solid #f1f0ee", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid #f5f5f5" }}>
              <i className="ri-survey-line" style={{ color: "#BFA370", fontSize: 18 }} />
              <span style={{ fontWeight: 600, fontSize: 14, color: "#1a1a1a" }}>Catatan untuk penjual</span>
            </div>
            <textarea placeholder="Tulis catatan di sini..."
              style={{ width: "100%", border: "none", outline: "none", padding: "12px 16px", fontSize: 13, color: "#9ca3af", fontFamily: "Poppins, sans-serif", resize: "none", height: 56, boxSizing: "border-box" }} />
          </div>

          {/* Voucher row */}
          <button onClick={() => setShowVoucher(true)}
            style={{ width: "100%", margin: "12px 0", padding: "0 24px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, borderTop: "1px solid #f5f5f5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <i className="ri-coupon-3-line" style={{ color: "#BFA370", fontSize: 18 }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>Voucher</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {selectedVoucher ? (
                <span style={{ color: "#ef4444", fontWeight: 700, fontSize: 14 }}>- {formatRupiah(selectedVoucher.diskon)}</span>
              ) : (
                <span style={{ color: "#9ca3af", fontSize: 13 }}>Pilih / Masukkan Kode &gt;</span>
              )}
            </div>
          </button>
        </div>

        {/* Ambil/Reservasi tabs */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 0 }}>
            {["ambil","reservasi"].map(t => (
              <button key={t} onClick={() => setTab(t as "ambil"|"reservasi")}
                style={{
                  padding: "10px 24px", borderRadius: t === "ambil" ? "12px 0 0 0" : "0 12px 0 0",
                  border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
                  background: tab === t ? "linear-gradient(135deg,#BFA370,#8E754A)" : "#e9dfc8",
                  color: tab === t ? "white" : "#78450E", fontFamily: "Poppins, sans-serif",
                }}>{t === "ambil" ? "Ambil Ditempat" : "Reservasi"}</button>
            ))}
          </div>

          {tab === "reservasi" && (
            <div style={{ background: "white", border: "1px solid #f1f0ee", borderRadius: "0 12px 12px 12px", padding: "24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a", marginBottom: 16 }}>Data Reservasi</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 16 }}>
                {[["Jumlah Orang","number","Masukkan jumlah orang"],["Tanggal Reservasi","date",""],["Pembayaran","select",""]].map(([label, type], i) => (
                  <div key={i}>
                    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase" }}>{label}</label>
                    {type === "select" ? (
                      <select style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e9e7e3", borderRadius: 10, fontSize: 12, outline: "none", background: "#fafaf9", fontFamily: "Poppins, sans-serif", color: "#333" }}>
                        <option>Bayar Penuh</option><option>DP 50%</option>
                      </select>
                    ) : (
                      <input type={type} placeholder={String(label)}
                        style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e9e7e3", borderRadius: 10, fontSize: 12, outline: "none", background: "#fafaf9", fontFamily: "Poppins, sans-serif", boxSizing: "border-box" }}
                        onFocus={e => (e.target.style.borderColor = "#BFA370")}
                        onBlur={e => (e.target.style.borderColor = "#e9e7e3")}
                      />
                    )}
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase" }}>Waktu Reservasi</label>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <input type="time" defaultValue="08:00" style={{ flex: 1, padding: "10px 8px", border: "1.5px solid #e9e7e3", borderRadius: 10, fontSize: 11, outline: "none", background: "#fafaf9" }}
                      onFocus={e => (e.target.style.borderColor = "#BFA370")}
                      onBlur={e => (e.target.style.borderColor = "#e9e7e3")}
                    />
                    <span style={{ color: "#9ca3af" }}>-</span>
                    <input type="time" defaultValue="20:00" style={{ flex: 1, padding: "10px 8px", border: "1.5px solid #e9e7e3", borderRadius: 10, fontSize: 11, outline: "none", background: "#fafaf9" }}
                      onFocus={e => (e.target.style.borderColor = "#BFA370")}
                      onBlur={e => (e.target.style.borderColor = "#e9e7e3")}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#9ca3af", marginBottom: 6, textTransform: "uppercase" }}>Keterangan</label>
                <textarea placeholder="Tuliskan keterangan tambahan pesanan anda"
                  style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #e9e7e3", borderRadius: 10, fontSize: 12, outline: "none", background: "#fafaf9", fontFamily: "Poppins, sans-serif", resize: "none", height: 80, boxSizing: "border-box" }}
                  onFocus={e => (e.target.style.borderColor = "#BFA370")}
                  onBlur={e => (e.target.style.borderColor = "#e9e7e3")}
                />
              </div>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div style={{ background: "white", borderRadius: 16, padding: "20px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>Pembayaran</span>
            <div style={{ background: "#1a1a1a", borderRadius: 6, padding: "4px 10px" }}>
              <span style={{ color: "white", fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>QRIS</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#555" }}>
              <span>Total Pesanan ({cart.length} Menu)</span>
              <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{formatRupiah(subtotal)}</span>
            </div>
            {tab === "reservasi" && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#555" }}>
                <span>Biaya Reservasi</span>
                <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{formatRupiah(reservasiBiaya)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#555" }}>
              <span>Voucher</span>
              <span style={{ fontWeight: 600, color: selectedVoucher ? "#ef4444" : "#1a1a1a" }}>
                {selectedVoucher ? `- ${formatRupiah(voucherDiskon)}` : "Rp 0"}
              </span>
            </div>
            <div style={{ borderTop: "1px solid #f1f0ee", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, color: "#1a1a1a" }}>
              <span>Total</span>
              <span>{formatRupiah(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button onClick={handleBayar} disabled={loading}
            style={{
              padding: "16px 56px", borderRadius: 14, border: "none",
              background: loading ? "#d1d5db" : "linear-gradient(135deg,#BFA370,#8E754A)",
              color: "white", fontSize: 16, fontWeight: 800,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 8px 24px rgba(191,163,112,0.4)",
              display: "flex", alignItems: "center", gap: 10,
              fontFamily: "Poppins, sans-serif", transition: "all 0.2s",
            }}>
            {loading ? <><i className="ri-loader-4-line" style={{ fontSize: 18, animation: "spin 1s linear infinite" }} /> Memproses...</> : <>Pesan &amp; Bayar <i className="ri-arrow-right-line" /></>}
          </button>
        </div>
      </main>
    </div>
  );
}