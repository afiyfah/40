"use client";
import { useEffect, useRef, useState } from "react";
import { useAppStore, Order } from "@/store/useCartStoreSeller";

function fmtTime(sec: number): string {
  if (sec <= 0) return "HABIS";
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
}

export default function SellerHomePage() {
  const { orders, orderTimers, terimaOrder, tolakOrder, selesaiOrder, tickTimers, tokoOpen, toggleToko } = useAppStore();
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);
  const [colTab, setColTab] = useState<{ m: string; p: string }>({ m: "makan", p: "makan" });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Global tick every second
  useEffect(() => {
    intervalRef.current = setInterval(() => tickTimers(), 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [tickTimers]);

  const menunggu = orders.filter((o) => o.col === "m" && o.tipe === colTab.m);
  const proses = orders.filter((o) => o.col === "p" && o.tipe === colTab.p);
  const activeOrder = activeDetailId ? orders.find((o) => o.id === activeDetailId) : null;

  return (
    /* Full-height within the scrollable main — use flex column filling parent */
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexShrink: 0 }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Pesanan Cepat</h1>
        <TokoToggle open={tokoOpen} onToggle={toggleToko} />
      </div>

      {/* Kanban — fills remaining space, does NOT let outer page scroll */}
      <div style={{ display: "flex", gap: 20, flex: 1, minHeight: 0, overflow: "hidden" }}>
        <KanbanCol
          title="Menunggu Disetujui" badgeColor="#FCD34D" badgeText="#78350F"
          borderColor="#FCD34D" bg="#FFFBEB" count={menunggu.length}
          activeTab={colTab.m} onTabChange={(t) => setColTab((p) => ({ ...p, m: t }))}
          orders={menunggu} timers={orderTimers}
          activeDetailId={activeDetailId} onCardClick={(id) => setActiveDetailId(activeDetailId === id ? null : id)}
          onTerima={(id) => { terimaOrder(id); }} onTolak={(id) => { tolakOrder(id); if (activeDetailId === id) setActiveDetailId(null); }}
          isProses={false}
        />
        <KanbanCol
          title="Sedang Diproses" badgeColor="#60A5FA" badgeText="white"
          borderColor="#93C5FD" bg="#EFF6FF" count={proses.length}
          activeTab={colTab.p} onTabChange={(t) => setColTab((p) => ({ ...p, p: t }))}
          orders={proses} timers={orderTimers}
          activeDetailId={activeDetailId} onCardClick={(id) => setActiveDetailId(activeDetailId === id ? null : id)}
          onTerima={(id) => { selesaiOrder(id); if (activeDetailId === id) setActiveDetailId(null); }}
          onTolak={(id) => { tolakOrder(id); if (activeDetailId === id) setActiveDetailId(null); }}
          isProses={true}
        />
      </div>

      {/* Detail overlay */}
      {activeOrder && (
        <div
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 20, pointerEvents: "none" }}
        >
          <div
            style={{ position: "absolute", top: 56, left: 0, right: 0, pointerEvents: "all" }}
          >
            <DetailPanel order={activeOrder} timers={orderTimers} onClose={() => setActiveDetailId(null)} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Toko Toggle ─────────────────────────────────────────────────────────────
function TokoToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, background: open ? "#F0FDF4" : "#FEF2F2", border: `1px solid ${open ? "#BBF7D0" : "#FECACA"}`, borderRadius: 12, padding: "8px 16px", transition: "all 0.25s" }}
    >
      <button
        onClick={onToggle}
        style={{ width: 38, height: 20, borderRadius: 99, background: open ? "#22C55E" : "#D1D5DB", position: "relative", border: "none", cursor: "pointer", transition: "background 0.25s", flexShrink: 0 }}
      >
        <span
          style={{ position: "absolute", width: 14, height: 14, borderRadius: "50%", background: "white", top: 3, left: open ? 21 : 3, transition: "left 0.25s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
        />
      </button>
      <i className={open ? "ri-check-line" : "ri-close-line"} style={{ color: open ? "#22C55E" : "#EF4444", fontSize: 14 }} />
      <span style={{ fontSize: 14, fontWeight: 600, color: open ? "#15803D" : "#DC2626", transition: "color 0.25s" }}>
        {open ? "Buka" : "Tutup"}
      </span>
    </div>
  );
}

// ─── Kanban Column ────────────────────────────────────────────────────────────
interface KanbanColProps {
  title: string; badgeColor: string; badgeText: string;
  borderColor: string; bg: string; count: number;
  activeTab: string; onTabChange: (t: string) => void;
  orders: Order[]; timers: Record<string, number>;
  activeDetailId: string | null; onCardClick: (id: string) => void;
  onTerima: (id: string) => void; onTolak: (id: string) => void;
  isProses: boolean;
}

const TABS = [
  { key: "makan", label: "Makan Ditempat" },
  { key: "preorder", label: "Pre-Order" },
  { key: "reservasi", label: "Reservasi" },
];

function KanbanCol({ title, badgeColor, badgeText, borderColor, bg, count, activeTab, onTabChange, orders, timers, activeDetailId, onCardClick, onTerima, onTolak, isProses }: KanbanColProps) {
  return (
    <div style={{ flex: 1, borderRadius: 16, border: `1.5px solid ${borderColor}`, background: bg, display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0, overflow: "hidden" }}>
      {/* Column header */}
      <div style={{ padding: "14px 14px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: badgeColor, color: badgeText, fontWeight: 800, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {count}
          </div>
          <p style={{ fontWeight: 600, color: "#374151", fontSize: 14 }}>{title}</p>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "#6B7280", border: `1px solid ${borderColor}`, background: "white", padding: "2px 8px", borderRadius: 8 }}>
            {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "/")}
          </span>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1.5px solid rgba(0,0,0,0.08)" }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => onTabChange(t.key)}
              style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: 600, color: activeTab === t.key ? "#333" : "#9CA3AF", padding: "8px 4px", cursor: "pointer", background: "none", border: "none", borderBottom: `2px solid ${activeTab === t.key ? "#333" : "transparent"}`, marginBottom: -1.5, transition: "color 0.18s" }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable card list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px 14px" }} className="no-scrollbar">
        {activeTab === "makan" ? (
          orders.length === 0 ? (
            <EmptyState icon="ri-shopping-bag-line" text="Tidak ada pesanan" />
          ) : (
            orders.map((o) => (
              <OrderCard
                key={o.id} order={o} timer={timers[o.id] ?? 0}
                isActive={activeDetailId === o.id} isProses={isProses}
                onClick={() => onCardClick(o.id)}
                onTerima={() => onTerima(o.id)} onTolak={() => onTolak(o.id)}
              />
            ))
          )
        ) : (
          <EmptyState icon={activeTab === "preorder" ? "ri-time-line" : "ri-calendar-line"} text={`Tidak ada ${activeTab === "preorder" ? "pre-order" : "reservasi"}`} />
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 10px", color: "#D1D5DB" }}>
      <i className={icon} style={{ fontSize: 40, display: "block", marginBottom: 8 }} />
      <p style={{ fontSize: 12 }}>{text}</p>
    </div>
  );
}

// ─── Order Card ───────────────────────────────────────────────────────────────
function OrderCard({ order, timer, isActive, isProses, onClick, onTerima, onTolak }: {
  order: Order; timer: number; isActive: boolean; isProses: boolean;
  onClick: () => void; onTerima: () => void; onTolak: () => void;
}) {
  const isUrgent = isProses && timer < 120;

  return (
    <div
      onClick={onClick}
      style={{ background: "white", borderRadius: 10, border: `${isActive ? 2 : 1}px solid ${isActive ? "#BFA370" : "#E5E7EB"}`, marginBottom: 10, cursor: "pointer", overflow: "hidden", boxShadow: isActive ? "0 0 0 3px rgba(191,163,112,0.2)" : "0 1px 4px rgba(0,0,0,0.05)", transition: "all 0.18s" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, padding: "10px 12px", alignItems: "stretch" }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
          {order.items.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 6, fontSize: 12, color: "#333" }}>
              <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.nama}</span>
              <span style={{ color: "#9CA3AF", fontSize: 11, whiteSpace: "nowrap" }}>{item.qty}x</span>
              <span style={{ color: "#9CA3AF", fontSize: 11, whiteSpace: "nowrap", minWidth: 70, textAlign: "right" }}>
                Rp {item.harga.toLocaleString("id-ID")}
              </span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, paddingTop: 6, borderTop: "1px solid #F0EDE8" }}>
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#BFA370", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "white", fontWeight: 700, flexShrink: 0 }}>
              {order.customer[0]}
            </div>
            <span style={{ fontSize: 10, color: "#9CA3AF" }}>{order.customer}</span>
            <span style={{ fontSize: 10, color: "#C4B99A", marginLeft: "auto" }}>#{order.id}</span>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1F2937", whiteSpace: "nowrap" }}>
            Rp {order.total.toLocaleString("id-ID")}
          </span>
          {isProses ? (
            <div>
              <div style={{ background: isUrgent ? "#EF4444" : "#F97316", color: "white", borderRadius: "6px 6px 0 0", fontSize: 10, fontWeight: 700, textAlign: "center", padding: "2px 0", width: 68 }}>Waktu</div>
              <div style={{ background: isUrgent ? "#EF4444" : "#F97316", color: "white", borderRadius: "0 0 6px 6px", fontSize: 14, fontWeight: 800, textAlign: "center", padding: "3px 0", width: 68, fontVariantNumeric: "tabular-nums", animation: isUrgent ? "pulse 1s infinite" : "none" }}>
                {fmtTime(timer)}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 64 }}>
              <button
                onClick={(e) => { e.stopPropagation(); onTerima(); }}
                style={{ background: "#22C55E", color: "white", border: "none", borderRadius: 6, padding: "5px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", width: "100%", transition: "opacity 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                ✓ Terima
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onTolak(); }}
                style={{ background: "#EF4444", color: "white", border: "none", borderRadius: 6, padding: "5px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", width: "100%", transition: "opacity 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                ✕ Tolak
              </button>
            </div>
          )}
          {isProses && (
            <button
              onClick={(e) => { e.stopPropagation(); onTerima(); }}
              style={{ background: "#22C55E", color: "white", border: "none", borderRadius: 6, padding: "4px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer", width: "100%" }}
            >
              Selesai ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ order, timers, onClose }: { order: Order; timers: Record<string, number>; onClose: () => void }) {
  const subtotal = order.items.reduce((a, i) => a + i.harga * i.qty, 0);
  const layanan = Math.round(subtotal * 0.05);
  const total = subtotal + layanan;

  return (
    <div
      style={{ background: "white", borderRadius: 16, border: "1px solid #E5E7EB", boxShadow: "0 12px 40px rgba(0,0,0,0.15)", padding: "22px 24px", maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}
      className="no-scrollbar"
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: 20, color: "#1F2937" }}>Detail Pesanan #{order.id}</p>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>Dipesan: {order.tanggal}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {order.col === "p" && timers[order.id] != null && (
            <span style={{ background: "#F97316", color: "white", borderRadius: 8, padding: "4px 12px", fontSize: 13, fontWeight: 700 }}>
              ⏱ {fmtTime(timers[order.id])}
            </span>
          )}
          <span style={{ background: order.col === "m" ? "#FEF08A" : "#60A5FA", color: order.col === "m" ? "#78350F" : "white", borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>
            {order.col === "m" ? "Menunggu Persetujuan" : "Sedang Diproses"}
          </span>
          <button
            onClick={onClose}
            style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6B7280", border: "1px solid #E5E7EB", borderRadius: 8, padding: "6px 12px", background: "none", cursor: "pointer" }}
          >
            <i className="ri-close-line" /> Tutup
          </button>
        </div>
      </div>

      {/* Customer info */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, background: "#F9FAFB", borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: 14, color: "#4B5563" }}>
        {[
          { icon: "ri-user-line", text: `Nama Pelanggan: ${order.customer}` },
          { icon: "ri-phone-line", text: `Kontak: ${order.phone}` },
          { icon: "ri-table-alt-line", text: `Meja: ${order.meja}` },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <i className={icon} style={{ color: "#BFA370" }} />
            <span>{text}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Menu */}
        <div>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Rincian Menu</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {order.items.map((item, i) => (
              <div key={i}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1F2937" }}>
                  {i + 1}. {item.nama} ({item.qty}x) – Rp {item.harga.toLocaleString("id-ID")}
                </p>
                {item.varian?.filter(Boolean).map((v) => (
                  <p key={v} style={{ fontSize: 12, color: "#6B7280", marginLeft: 12, marginTop: 2 }}>• Varian: {v}</p>
                ))}
                {item.tambah?.filter(Boolean).map((t) => (
                  <p key={t} style={{ fontSize: 12, color: "#6B7280", marginLeft: 12, marginTop: 2 }}>• Tambah {t}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Pembayaran */}
        <div>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Rincian Pembayaran</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
            {[
              { label: "Subtotal Harga Menu:", value: `Rp${subtotal.toLocaleString("id-ID")}` },
              { label: "Biaya Layanan (5%):", value: `Rp${layanan.toLocaleString("id-ID")}` },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#6B7280" }}>{label}</span>
                <span style={{ fontWeight: 600 }}>{value}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, borderTop: "1px solid #F3F4F6", paddingTop: 8, marginTop: 4 }}>
              <span>Total Pendapatan</span>
              <span>Rp{total.toLocaleString("id-ID")}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "#9CA3AF" }}>Metode:</span>
              <span style={{ fontWeight: 500 }}>{order.metode}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: "#9CA3AF" }}>Status:</span>
              <span style={{ fontWeight: 600, color: order.dibayar ? "#22C55E" : "#EF4444" }}>
                ● {order.dibayar ? "Sudah Dibayar" : "Belum Dibayar"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Catatan */}
      {order.catatan && (
        <div style={{ marginTop: 16, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: "12px 16px" }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#92400E", marginBottom: 4 }}>Catatan Pembeli:</p>
          <p style={{ fontSize: 14, color: "#374151", fontStyle: "italic" }}>{order.catatan}</p>
        </div>
      )}
    </div>
  );
}