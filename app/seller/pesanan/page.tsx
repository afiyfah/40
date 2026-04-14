"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/useCartStoreSeller";

function fmtTimer(sec: number) {
  if (sec <= 0) return "WAKTU HABIS";
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PesananPage() {
  const { orders, orderTimers, terimaOrder, tolakOrder, selesaiOrder, tickTimers, tokoOpen, toggleToko } = useAppStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => tickTimers(), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [tickTimers]);

  const menunggu = orders.filter((o) => o.col === "m");
  const proses = orders.filter((o) => o.col === "p");

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: 24 }}>Pesanan</h1>
      <style>{`
        .item-grid { display: grid; grid-template-columns: 52px 1fr 70px 28px 70px; align-items: center; gap: 8px; }
        .btn-action { border: none; border-radius: 8px; padding: 6px 16px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: opacity 0.15s; }
        .btn-action:hover { opacity: 0.85; }
      `}</style>

      <div style={{ display: "flex", gap: 24 }}>
        {/* Left column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 32 }}>

          {/* Menunggu Konfirmasi */}
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h2 style={{ fontWeight: 600, color: "#374151" }}>Menunggu Konfirmasi</h2>
              <span style={{ background: "#FEF9C3", color: "#78350F", borderRadius: 99, padding: "2px 12px", fontSize: 12, fontWeight: 600 }}>
                {menunggu.length} pesanan
              </span>
            </div>
            {menunggu.length === 0 ? (
              <div style={{ background: "white", borderRadius: 12, border: "1px solid #EEE", padding: "32px", textAlign: "center", color: "#D1D5DB" }}>
                <i className="ri-inbox-line" style={{ fontSize: 40, display: "block", marginBottom: 8 }} />
                <p style={{ fontSize: 13 }}>Tidak ada pesanan menunggu konfirmasi</p>
              </div>
            ) : (
              menunggu.map((order) => (
                <div key={order.id} style={{ marginBottom: 12 }}>
                  <div className="order-card shadow-soft">
                    {/* Header */}
                    <div className="order-card-header">
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#BFA370,#8E754A)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700 }}>
                          {order.customer[0]}
                        </div>
                        <span style={{ fontWeight: 600, color: "#1F2937", fontSize: 14 }}>{order.customer}</span>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>· {order.meja}</span>
                      </div>
                      <span className="order-timer">{fmtTimer(orderTimers[order.id] ?? 0)}</span>
                      <Link href="/seller/pesanan/detail" style={{ color: "#BFA370", fontSize: 12, fontWeight: 500, textDecoration: "none" }}>
                        Detail Pesanan →
                      </Link>
                    </div>

                    {/* Items */}
                    <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                      {order.items.map((item, i) => (
                        <div key={i} className="item-grid">
                          <div style={{ width: 52, height: 52, borderRadius: 12, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🍗</div>
                          <div>
                            <p style={{ fontWeight: 500, color: "#1F2937", fontSize: 14 }}>{item.nama}</p>
                            {item.varian?.filter(Boolean).map((v) => (
                              <span key={v} style={{ fontSize: 11, background: "#FFF7ED", color: "#FB923C", border: "1px solid #FED7AA", padding: "2px 8px", borderRadius: 99 }}>{v}</span>
                            ))}
                          </div>
                          <p style={{ color: "#BFA370", textAlign: "center", fontSize: 12 }}>Rp{item.harga.toLocaleString("id-ID")}</p>
                          <p style={{ color: "#6B7280", textAlign: "center", fontSize: 12 }}>x{item.qty}</p>
                          <p style={{ color: "#BFA370", fontWeight: 600, textAlign: "right", fontSize: 12 }}>Rp{(item.harga * item.qty).toLocaleString("id-ID")}</p>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div style={{ background: "#F9FAFB", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F3F4F6" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6B7280", background: "white", border: "1px solid #E5E7EB", borderRadius: 8, padding: "5px 10px" }}>
                          <i className="ri-shopping-bag-line" style={{ color: "#BFA370" }} />
                          {order.items.reduce((a, i) => a + i.qty, 0)} item · Total{" "}
                          <strong style={{ color: "#BFA370", marginLeft: 4 }}>Rp{order.total.toLocaleString("id-ID")}</strong>
                        </div>
                        <span style={{ fontSize: 12, color: "#6B7280" }}>{order.metode}</span>
                        <span style={{ fontSize: 11, color: "#9CA3AF" }}>Order ID: {order.id}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => tolakOrder(order.id)}
                          className="btn-action"
                          style={{ background: "#EF4444", color: "white" }}
                        >
                          <i className="ri-close-line" /> Tolak
                        </button>
                        <button
                          onClick={() => terimaOrder(order.id)}
                          className="btn-action"
                          style={{ background: "#22C55E", color: "white" }}
                        >
                          <i className="ri-check-line" /> Terima
                        </button>
                      </div>
                    </div>
                  </div>
                  {order.catatan && <CatatanCard text={order.catatan} />}
                </div>
              ))
            )}
          </section>

          {/* Proses */}
          <section>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <h2 style={{ fontWeight: 600, color: "#374151" }}>Proses</h2>
              <span style={{ background: "#DBEAFE", color: "#1D4ED8", borderRadius: 99, padding: "2px 12px", fontSize: 12, fontWeight: 600 }}>
                {proses.length} pesanan
              </span>
            </div>
            {proses.length === 0 ? (
              <div style={{ background: "white", borderRadius: 12, border: "1px solid #EEE", padding: "32px", textAlign: "center", color: "#D1D5DB" }}>
                <i className="ri-loader-line" style={{ fontSize: 40, display: "block", marginBottom: 8 }} />
                <p style={{ fontSize: 13 }}>Tidak ada pesanan yang sedang diproses</p>
              </div>
            ) : (
              proses.map((order) => {
                const t = orderTimers[order.id] ?? 0;
                const isUrgent = t < 120 && t > 0;
                return (
                  <div key={order.id} style={{ marginBottom: 12 }}>
                    <div className="order-card shadow-soft" style={{ borderColor: isUrgent ? "#FCA5A5" : "#EEE" }}>
                      <div className="order-card-header">
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#60A5FA,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700 }}>
                            {order.customer[0]}
                          </div>
                          <span style={{ fontWeight: 600, color: "#1F2937", fontSize: 14 }}>{order.customer}</span>
                          <span style={{ fontSize: 11, color: "#9CA3AF" }}>· {order.meja}</span>
                        </div>
                        <span className="order-timer" style={{ color: isUrgent ? "#DC2626" : "#EF4444" }}>
                          {fmtTimer(t)}
                        </span>
                        <Link href="/seller/pesanan/detail" style={{ color: "#BFA370", fontSize: 12, fontWeight: 500, textDecoration: "none" }}>
                          Detail Pesanan →
                        </Link>
                      </div>

                      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
                        {order.items.map((item, i) => (
                          <div key={i} className="item-grid">
                            <div style={{ width: 52, height: 52, borderRadius: 12, background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🍗</div>
                            <div>
                              <p style={{ fontWeight: 500, color: "#1F2937", fontSize: 14 }}>{item.nama}</p>
                            </div>
                            <p style={{ color: "#BFA370", textAlign: "center", fontSize: 12 }}>Rp{item.harga.toLocaleString("id-ID")}</p>
                            <p style={{ color: "#6B7280", textAlign: "center", fontSize: 12 }}>x{item.qty}</p>
                            <p style={{ color: "#BFA370", fontWeight: 600, textAlign: "right", fontSize: 12 }}>Rp{(item.harga * item.qty).toLocaleString("id-ID")}</p>
                          </div>
                        ))}
                      </div>

                      <div style={{ background: "#F9FAFB", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F3F4F6" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6B7280", background: "white", border: "1px solid #E5E7EB", borderRadius: 8, padding: "5px 10px" }}>
                          <i className="ri-shopping-bag-line" style={{ color: "#BFA370" }} />
                          {order.items.reduce((a, i) => a + i.qty, 0)} item · Total{" "}
                          <strong style={{ color: "#BFA370", marginLeft: 4 }}>Rp{order.total.toLocaleString("id-ID")}</strong>
                        </div>
                        <button
                          onClick={() => selesaiOrder(order.id)}
                          className="btn-action"
                          style={{ background: "#22C55E", color: "white" }}
                        >
                          <i className="ri-check-line" /> Selesai
                        </button>
                      </div>
                    </div>
                    {order.catatan && <CatatanCard text={order.catatan} />}
                  </div>
                );
              })
            )}
          </section>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 208, flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Status Toko */}
          <div className="shadow-soft" style={{ background: "white", borderRadius: 12, border: "1px solid #EEE", padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Status Toko</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 8 }}>
              <button
                onClick={toggleToko}
                style={{ width: 44, height: 24, borderRadius: 99, background: tokoOpen ? "#22C55E" : "#D1D5DB", position: "relative", border: "none", cursor: "pointer", transition: "background 0.25s" }}
              >
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
            <p style={{ fontSize: 12, fontWeight: 500, opacity: 0.9 }}>Menunggu Konfirmasi</p>
            <p style={{ fontSize: 40, fontWeight: 800, margin: "4px 0" }}>{menunggu.length}</p>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Pesanan</p>
          </div>

          <div className="shadow-soft" style={{ background: "linear-gradient(135deg,#22C55E,#16A34A)", borderRadius: 12, padding: "16px 20px", textAlign: "center", color: "white" }}>
            <i className="ri-calendar-check-line" style={{ fontSize: 24, display: "block", marginBottom: 4 }} />
            <p style={{ fontSize: 12, fontWeight: 500, opacity: 0.9 }}>Hari ini</p>
            <p style={{ fontSize: 40, fontWeight: 800, margin: "4px 0" }}>37</p>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Pesanan Terselesaikan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CatatanCard({ text }: { text: string }) {
  return (
    <div className="shadow-soft" style={{ background: "white", borderRadius: 10, border: "1px solid #FDE68A", marginTop: 8, padding: "10px 14px", display: "flex", alignItems: "flex-start", gap: 8 }}>
      <i className="ri-file-list-3-line" style={{ color: "#BFA370", fontSize: 16, flexShrink: 0, marginTop: 2 }} />
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Keterangan Catatan Dari Pembeli</p>
        <p style={{ fontSize: 12, color: "#6B7280" }}>{text}</p>
      </div>
    </div>
  );
}