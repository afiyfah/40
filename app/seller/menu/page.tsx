"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useCartStoreSeller";

export default function MenuPage() {
  const router = useRouter();
  const { menuItems, updateStok, deleteMenuItem } = useAppStore();
  const [filter, setFilter] = useState("semua");
  const [search, setSearch] = useState("");
  const [openDots, setOpenDots] = useState<number | null>(null);
  const [pendingStok, setPendingStok] = useState<Record<number, number>>({});
  const [toast, setToast] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const getStok = (id: number) => pendingStok[id] ?? menuItems.find((m) => m.id === id)?.stok ?? 0;
  const changeStok = (id: number, delta: number) => {
    const cur = getStok(id);
    setPendingStok((p) => ({ ...p, [id]: Math.max(0, cur + delta) }));
  };

  const simpan = (id: number) => {
    const stok = getStok(id);
    updateStok(id, stok);
    setPendingStok((p) => { const n = { ...p }; delete n[id]; return n; });
    showToast(`Stok berhasil diperbarui menjadi ${stok} porsi`);
    setOpenDots(null);
  };

  const hapus = (id: number) => {
    if (confirm("Hapus menu ini?")) { deleteMenuItem(id); setOpenDots(null); showToast("Menu dihapus"); }
  };

  const aktif = menuItems.filter((m) => m.status === "aktif").length;
  const habis = menuItems.filter((m) => m.status === "habis").length;

  const filtered = menuItems.filter((m) => {
    const matchF = filter === "semua" || m.status === filter;
    const matchQ = m.nama.toLowerCase().includes(search.toLowerCase());
    return matchF && matchQ;
  });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Menu Toko</h1>
          <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>Kelola seluruh menu di toko anda</p>
        </div>
        <button
          onClick={() => router.push("/seller/menu/tambah")}
          style={{ background: "linear-gradient(90deg,#BFA370,#8E754A)", color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 4px 12px rgba(191,163,112,0.4)", transition: "opacity 0.15s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        >
          <i className="ri-add-line" /> + Tambah Menu
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #E5E7EB" }}>
          {[
            { key: "semua", label: "Semua" },
            { key: "aktif", label: "Aktif", badge: <span className="badge-aktif">{aktif}</span> },
            { key: "habis", label: "Habis", badge: <span className="badge-habis">{habis}</span> },
          ].map((f, i) => (
            <span key={f.key} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && <span style={{ color: "#D1D5DB", paddingBottom: 6, margin: "0 8px" }}>|</span>}
              <button
                onClick={() => setFilter(f.key)}
                className={`filter-tab${filter === f.key ? " active" : ""}`}
              >
                {f.label} {f.badge}
              </button>
            </span>
          ))}
          <span style={{ color: "#D1D5DB", paddingBottom: 6, margin: "0 8px" }}>|</span>
          <button onClick={() => router.push("/seller/penawaran")} className="filter-tab">Promo/Flash Sale</button>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <i className="ri-search-line" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", fontSize: 14 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="s-input"
              style={{ paddingLeft: 32, width: 176, fontSize: 14 }}
              placeholder="Cari menu..."
            />
          </div>
          <button style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #BFA370", color: "#BFA370", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="ri-filter-line" />
          </button>
        </div>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 && (
          <div style={{ background: "white", borderRadius: 12, border: "1px solid #EEE", padding: "40px", textAlign: "center", color: "#D1D5DB" }}>
            <i className="ri-restaurant-line" style={{ fontSize: 48, display: "block", marginBottom: 8 }} />
            <p>Tidak ada menu ditemukan</p>
          </div>
        )}
        {filtered.map((m) => {
          const isHabis = m.status === "habis";
          const curStok = getStok(m.id);
          const isDirty = pendingStok[m.id] !== undefined;
          const isExpanded = expandedId === m.id;

          return (
            <div
              key={m.id}
              className="shadow-soft"
              style={{ background: isHabis ? "#F3F4F6" : "white", borderRadius: 14, border: `1px solid ${isHabis ? "#D1D5DB" : "#EEE"}`, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, transition: "all 0.25s", cursor: "pointer" }}
              onClick={() => setExpandedId(isExpanded ? null : m.id)}
            >
              {/* Image */}
              <div style={{ width: 64, height: 64, borderRadius: 12, background: "#F3F4F6", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, filter: isHabis ? "grayscale(1) opacity(0.5)" : "none", transition: "filter 0.3s" }}>
                🍗
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <p style={{ fontWeight: 600, color: isHabis ? "#9CA3AF" : "#1F2937" }}>{m.nama}</p>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99, background: isHabis ? "#FEE2E2" : "#DCFCE7", color: isHabis ? "#DC2626" : "#16A34A" }}>
                    {isHabis ? "Habis" : "Aktif"}
                  </span>
                </div>
                <p style={{ color: "#BFA370", fontWeight: 700, fontSize: 14 }}>Rp{m.harga.toLocaleString("id-ID")}</p>
                <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{m.waktu} · {m.terjual} terjual · ❤️ {m.suka}</p>
                {isExpanded && m.deskripsi && (
                  <p style={{ fontSize: 12, color: "#6B7280", marginTop: 6, lineHeight: 1.5 }}>{m.deskripsi}</p>
                )}
              </div>

              {/* Qty control */}
              <div
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => changeStok(m.id, -1)}
                    style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${curStok === 0 ? "#FECACA" : "#DDD"}`, background: curStok === 0 ? "#FEF2F2" : "white", fontWeight: 700, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                  >−</button>
                  <span
                    style={{ width: 36, textAlign: "center", fontWeight: 700, color: curStok === 0 ? "#EF4444" : "#374151", fontSize: 14 }}
                  >
                    {curStok}
                  </span>
                  <button
                    onClick={() => changeStok(m.id, 1)}
                    style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #DDD", background: "white", fontWeight: 700, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                  >+</button>
                </div>
                <p style={{ fontSize: 10, color: "#9CA3AF" }}>Stok hari ini</p>
              </div>

              {/* Actions */}
              <div
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0, position: "relative" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => simpan(m.id)}
                  style={{ background: isDirty ? "linear-gradient(90deg,#22C55E,#16A34A)" : "linear-gradient(90deg,#BFA370,#8E754A)", color: "white", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "background 0.3s", boxShadow: isDirty ? "0 2px 8px rgba(34,197,94,0.3)" : "none" }}
                >
                  {isDirty ? "✓ Simpan Perubahan" : "Simpan Perubahan"}
                </button>

                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => setOpenDots(openDots === m.id ? null : m.id)}
                    style={{ color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", padding: "2px 6px", fontSize: 18, letterSpacing: 2, borderRadius: 6, transition: "background 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F3F4F6")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    •••
                  </button>
                  {openDots === m.id && (
                    <>
                      <div onClick={() => setOpenDots(null)} style={{ position: "fixed", inset: 0, zIndex: 9 }} />
                      <div style={{ position: "absolute", right: 0, top: 28, background: "white", border: "1px solid #EEE", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", zIndex: 10, minWidth: 110 }}>
                        <button
                          onClick={() => { router.push(`/seller/menu/tambah?edit=${m.id}`); setOpenDots(null); }}
                          style={{ width: "100%", padding: "10px 14px", textAlign: "left", fontSize: 13, display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#F9FAFB")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        >
                          <i className="ri-pencil-line" style={{ color: "#9CA3AF" }} /> Edit
                        </button>
                        <button
                          onClick={() => hapus(m.id)}
                          style={{ width: "100%", padding: "10px 14px", textAlign: "left", fontSize: 13, display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#FEF2F2")}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                        >
                          <i className="ri-delete-bin-line" /> Hapus
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "#22C55E", color: "white", fontSize: 14, fontWeight: 500, padding: "12px 20px", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", zIndex: 50, display: "flex", alignItems: "center", gap: 8 }}>
          <i className="ri-check-line" style={{ fontSize: 18 }} /> {toast}
        </div>
      )}
    </div>
  );
}