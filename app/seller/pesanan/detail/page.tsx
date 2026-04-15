"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/store/useCartStoreSeller";

function fmtTimer(sec: number) {
  if (sec <= 0) return "WAKTU HABIS";
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function DetailPesananPage() {
  const router = useRouter();
  const { orders, orderTimers, terimaOrder, tolakOrder, tickTimers, tokoOpen, toggleToko } = useAppStore();
  const menunggu = orders.filter((o) => o.col === "m");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => tickTimers(), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [tickTimers]);

  // Show first menunggu order as detail, or first order overall
  const order = menunggu[0] ?? orders[0];

  if (!order) {
    return (
      <div>
        <button onClick={() => router.back()} style={{ border: "1px solid #E5E7EB", background: "white", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, marginBottom: 24 }}>
          <i className="ri-arrow-left-line" /> Kembali
        </button>
        <div style={{ textAlign: "center", padding: 64, color: "#D1D5DB" }}>
          <i className="ri-inbox-line" style={{ fontSize: 60, display: "block", marginBottom: 12 }} />
          <p>Tidak ada pesanan</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <button onClick={() => router.back()} style={{ border: "1px solid #E5E7EB", background: "white", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
          <i className="ri-arrow-left-line" /> Kembali
        </button>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Detail Pesanan</h1>
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontWeight: 600, color: "#374151", marginBottom: 12 }}>
            {order.col === "m" ? "Menunggu Konfirmasi" : "Sedang Diproses"}
          </h2>
          <div className="order-card shadow-soft">
            <div className="order-card-header">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#BFA370,#8E754A)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                  {order.customer[0]}
                </div>
                <span style={{ fontWeight: 600, color: "#1F2937", fontSize: 14 }}>{order.customer}</span>
              </div>
              <span className="order-timer">{fmtTimer(orderTimers[order.id] ?? 0)}</span>
            </div>

            <style>{`.dp-grid { display: grid; grid-template-columns: 52px 1fr 70px 28px 70px; align-items: center; gap: 8px; }`}</style>
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              {order.items.map((item, i) => (
                <div key={i} className="dp-grid">
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🍗</div>
                  <div>
                    <p style={{ fontWeight: 500, color: "#1F2937", fontSize: 14 }}>{item.nama}</p>
                    {item.varian?.filter(Boolean).map((v) => (
                      <span key={v} style={{ fontSize: 11, background: "#FFF7ED", color: "#FB923C", padding: "2px 8px", borderRadius: 99 }}>{v}</span>
                    ))}
                  </div>
                  <p style={{ color: "#BFA370", textAlign: "center", fontSize: 12 }}>Rp{item.harga.toLocaleString("id-ID")}</p>
                  <p style={{ color: "#6B7280", textAlign: "center", fontSize: 12 }}>x{item.qty}</p>
                  <p style={{ color: "#BFA370", fontWeight: 600, textAlign: "right", fontSize: 12 }}>Rp{(item.harga * item.qty).toLocaleString("id-ID")}</p>
                </div>
              ))}
            </div>

            <div style={{ padding: "12px 16px", borderTop: "1px solid #F3F4F6" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6B7280", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 8, padding: "5px 10px" }}>
                  <i className="ri-shopping-bag-line" style={{ color: "#BFA370" }} />
                  {order.items.reduce((a, i) => a + i.qty, 0)} item · Total
                  <strong style={{ color: "#BFA370", marginLeft: 4 }}>Rp{order.total.toLocaleString("id-ID")}</strong>
                </div>
                <span style={{ fontSize: 12, color: "#6B7280" }}>Order ID: {order.id}</span>
              </div>
              <p style={{ fontSize: 12, color: "#6B7280", textAlign: "right", marginBottom: 12 }}>
                Metode Pemesanan: {order.metode} · {order.meja}
              </p>
              {order.col === "m" && (
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button onClick={() => { tolakOrder(order.id); router.back(); }} style={{ background: "#EF4444", color: "white", border: "none", borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <i className="ri-close-line" /> Tolak
                  </button>
                  <button onClick={() => terimaOrder(order.id)} style={{ background: "#22C55E", color: "white", border: "none", borderRadius: 8, padding: "6px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                    <i className="ri-check-line" /> Terima
                  </button>
                </div>
              )}
            </div>
          </div>

          {order.catatan && (
            <div className="shadow-soft" style={{ background: "white", borderRadius: 12, border: "1px solid #FDE68A", marginTop: 12, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <i className="ri-file-list-3-line" style={{ color: "#BFA370", fontSize: 16, flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Keterangan Catatan Dari Pembeli</p>
                <p style={{ fontSize: 12, color: "#6B7280" }}>{order.catatan}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ width: 208, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="shadow-soft" style={{ background: "white", borderRadius: 12, border: "1px solid #EEE", padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Status Toko</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}>
              <button onClick={toggleToko} style={{ width: 44, height: 24, borderRadius: 99, background: tokoOpen ? "#22C55E" : "#D1D5DB", position: "relative", border: "none", cursor: "pointer", transition: "background 0.25s" }}>
                <span style={{ position: "absolute", width: 18, height: 18, borderRadius: "50%", background: "white", top: 3, left: tokoOpen ? 23 : 3, transition: "left 0.25s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
              </button>
              <i className={tokoOpen ? "ri-check-line" : "ri-close-line"} style={{ color: tokoOpen ? "#22C55E" : "#EF4444", fontSize: 18 }} />
            </div>
            <p style={{ textAlign: "center", fontSize: 14, fontWeight: 600, color: tokoOpen ? "#22C55E" : "#EF4444" }}>
              {tokoOpen ? "Toko Dibuka" : "Toko Ditutup"}
            </p>
          </div>

          <div className="shadow-soft" style={{ background: "linear-gradient(135deg,#C9A227,#8E754A)", borderRadius: 12, padding: "16px 20px", textAlign: "center", color: "white" }}>
            <i className="ri-time-line" style={{ fontSize: 24, display: "block", marginBottom: 4 }} />
            <p style={{ fontSize: 12, opacity: 0.9 }}>Menunggu Konfirmasi</p>
            <p style={{ fontSize: 40, fontWeight: 800, margin: "4px 0" }}>{menunggu.length}</p>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Pesanan</p>
          </div>

          <div className="shadow-soft" style={{ background: "linear-gradient(135deg,#22C55E,#16A34A)", borderRadius: 12, padding: "16px 20px", textAlign: "center", color: "white" }}>
            <i className="ri-calendar-check-line" style={{ fontSize: 24, display: "block", marginBottom: 4 }} />
            <p style={{ fontSize: 12, opacity: 0.9 }}>Hari ini</p>
            <p style={{ fontSize: 40, fontWeight: 800, margin: "4px 0" }}>37</p>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Pesanan Terselesaikan</p>
          </div>
        </div>
      </div>
    </div>
  );
}