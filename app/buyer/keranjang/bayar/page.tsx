"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatRupiah } from "@/lib/dummyData";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export default function BayarPage() {
  const router = useRouter();
  const { items: cartItems, selectedStore } = useCartStore();
  const [seconds, setSeconds] = useState(298);
  const [paid, setPaid] = useState(false);

  // Derive merchant name and total from cart
  const storeId = selectedStore();
  const checkedItems = cartItems.filter(i => i.checked);
  const storeItems = storeId && storeId !== -1
    ? checkedItems.filter(i => i.tokoId === storeId)
    : checkedItems;
  const merchantName = storeItems[0]?.toko || "Merchant";
  const grandTotal = storeItems.reduce((a, i) => a + i.harga * i.qty, 0);

  useEffect(() => {
    if (paid) return;
    const iv = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(iv);
  }, [paid]);

  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");

  if (paid) {
    return (
      <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
        <BuyerHeader />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "80vh", gap: 28 }}>
          <div style={{ width: 160, height: 160, background: "#22C55E", borderRadius: 44, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 60px rgba(34,197,94,0.3)" }}>
            <i className="ri-check-line" style={{ fontSize: 80, color: "white" }} />
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 900, color: "#1a1a1a" }}>Pembayaran Berhasil</h2>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/buyer/keranjang">
              <button style={{ padding: "14px 36px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                Lihat Pesanan Kamu
              </button>
            </Link>
            <Link href="/">
              <button style={{ padding: "14px 36px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                Kembali ke Halaman Utama
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <BuyerHeader />

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
          <button onClick={() => router.back()} style={{ width: 40, height: 40, borderRadius: "50%", border: "1.5px solid #e9e7e3", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="ri-arrow-left-line" style={{ fontSize: 18, color: "#555" }} />
          </button>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a" }}>Menunggu Pembayaran</h1>
        </div>

        <div style={{ background: "white", borderRadius: 20, padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            {/* QR Code */}
            <div style={{ border: "1.5px solid #f1f0ee", borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 36, height: 20, background: "#1a1a1a", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "white", fontSize: 8, fontWeight: 900 }}>QRIS</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#555" }}>QRIS</span>
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 12, padding: 16, marginBottom: 20, border: "1.5px dashed #e9e7e3" }}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
                  <rect width="200" height="200" fill="white" />
                  <rect x="10" y="10" width="60" height="60" rx="4" fill="#1a1a1a" />
                  <rect x="18" y="18" width="44" height="44" rx="2" fill="white" />
                  <rect x="26" y="26" width="28" height="28" rx="1" fill="#1a1a1a" />
                  <rect x="130" y="10" width="60" height="60" rx="4" fill="#1a1a1a" />
                  <rect x="138" y="18" width="44" height="44" rx="2" fill="white" />
                  <rect x="146" y="26" width="28" height="28" rx="1" fill="#1a1a1a" />
                  <rect x="10" y="130" width="60" height="60" rx="4" fill="#1a1a1a" />
                  <rect x="18" y="138" width="44" height="44" rx="2" fill="white" />
                  <rect x="26" y="146" width="28" height="28" rx="1" fill="#1a1a1a" />
                  {[...Array(8)].map((_, r) =>
                    [...Array(8)].map((_, c) =>
                      (r + c) % 2 === 0 && r > 0 && c > 0 && !(r < 4 && c < 4) && !(r < 4 && c > 4) && !(r > 4 && c < 4) ? (
                        <rect key={`${r}-${c}`} x={80 + c * 10} y={80 + r * 10} width={8} height={8} fill="#1a1a1a" rx="1" />
                      ) : null
                    )
                  )}
                </svg>
              </div>

              <button style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", background: "#0081FF", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "Poppins, sans-serif" }}>
                <i className="ri-download-2-line" style={{ fontSize: 16 }} /> Simpan Kode QR
              </button>
              <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 12, textDecoration: "underline", cursor: "pointer" }}>Payment Guide</p>
            </div>

            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 16, columnGap: 0 }}>
                {[["Merchant Name", merchantName], ["Invoice", "REG - " + Date.now().toString().slice(-12)]].map(([label, val]) => (
                  <>
                    <span key={label + "-label"} style={{ fontSize: 14, color: "#9ca3af" }}>{label}</span>
                    <span key={label + "-val"} style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", textAlign: "right" }}>{val}</span>
                  </>
                ))}
                <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginTop: 8 }}>Total Payment</span>
                <span style={{ fontSize: 20, fontWeight: 900, color: "#1a1a1a", textAlign: "right", marginTop: 8 }}>{formatRupiah(grandTotal || 71000)}</span>
              </div>

              <div style={{ background: "#fafaf9", borderRadius: 16, padding: 20, border: "1px solid #f1f0ee" }}>
                <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.7 }}>
                  Note: Transaksi yang telah dibayarkan{" "}
                  <strong style={{ color: "#1a1a1a" }}>Tidak Dapat Dibatalkan Dengan Alasan Apapun</strong>.
                  Dengan melakukan pembayaran berarti anda telah mengerti dan menyetujui segala prosedur registrasi.
                </p>
              </div>

              {/* Countdown */}
              <div style={{
                background: "linear-gradient(135deg,#BFA370,#8E754A)",
                borderRadius: 20, padding: "24px", textAlign: "center",
                color: "white", boxShadow: "0 8px 24px rgba(191,163,112,0.35)",
              }}>
                <p style={{ fontSize: 13, marginBottom: 6, opacity: 0.9 }}>Segera lakukan pembayaran sebelum</p>
                <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Senin, 28 Februari 2025 12.00</p>
                <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: 4, fontVariantNumeric: "tabular-nums" }}>
                  {min}.{sec}
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <button onClick={() => setPaid(true)}
                  style={{ padding: "12px 32px", borderRadius: 12, border: "none", background: "#22C55E", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins, sans-serif", marginBottom: 8 }}>
                  ✓ Simulasi Bayar (Demo)
                </button>
                <br />
                <button onClick={() => router.push("/buyer/keranjang")} style={{ color: "#9ca3af", fontSize: 12, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "Poppins, sans-serif" }}>
                  Lihat Pesanan
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}