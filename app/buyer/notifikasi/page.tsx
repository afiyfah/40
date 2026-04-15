"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useNotifStore, Notif } from "@/store/useNotifStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TIPE_ICON: Record<string, { bg: string; emoji: string }> = {
  toko:    { bg: "#fef9f0", emoji: "🏪" },
  flash:   { bg: "#fffbeb", emoji: "⚡" },
  voucher: { bg: "#f5f3ff", emoji: "🎫" },
  pesanan: { bg: "#f0fdf4", emoji: "✅" },
  rating:  { bg: "#fef9f0", emoji: "⭐" },
};

export default function NotifikasiPage() {
  const router = useRouter();
  const { notifs, hapus, hapusSemua, baca, bacaSemua } = useNotifStore();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmHapusSemua, setConfirmHapusSemua] = useState(false);

  const grups = ["Hari Ini", "Kemarin", "Minggu Ini"] as const;

  const handleOpen = (n: Notif) => {
    baca(n.id);
    if (n.link) router.push(n.link);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    setTimeout(() => {
      hapus(id);
      setDeletingId(null);
    }, 300);
  };

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <BuyerHeader />

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 36 }}>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#1a1a1a" }}>Notifikasi</h1>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={bacaSemua}
              style={{ padding: "8px 18px", borderRadius: 10, border: "1.5px solid #e9e7e3", background: "white", fontSize: 13, fontWeight: 600, color: "#BFA370", cursor: "pointer", fontFamily: "Poppins,sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fef9f0")}
              onMouseLeave={e => (e.currentTarget.style.background = "white")}
            >
              <i className="ri-check-double-line" style={{ marginRight: 6 }} />Tandai Semua Dibaca
            </button>
            <button onClick={() => setConfirmHapusSemua(true)}
              style={{ padding: "8px 18px", borderRadius: 10, border: "1.5px solid #fecaca", background: "white", fontSize: 13, fontWeight: 600, color: "#ef4444", cursor: "pointer", fontFamily: "Poppins,sans-serif", transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")}
              onMouseLeave={e => (e.currentTarget.style.background = "white")}
            >
              <i className="ri-delete-bin-line" style={{ marginRight: 6 }} />Hapus Semua
            </button>
          </div>
        </div>

        {notifs.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: 72, marginBottom: 16 }}>🔔</div>
            <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Tidak ada notifikasi</p>
            <p style={{ fontSize: 14 }}>Semua notifikasi sudah dihapus</p>
          </div>
        )}

        {grups.map(grup => {
          const items = notifs.filter(n => n.grup === grup);
          if (!items.length) return null;
          return (
            <section key={grup} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 16 }}>{grup}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map((n) => {
                  const iconInfo = TIPE_ICON[n.tipe] || TIPE_ICON.toko;
                  const isDeleting = deletingId === n.id;
                  return (
                    <div
                      key={n.id}
                      onClick={() => handleOpen(n)}
                      style={{
                        display: "flex", alignItems: "center", gap: 16,
                        padding: "16px 20px",
                        background: n.dibaca ? "white" : "#fef9f0",
                        borderLeft: n.dibaca ? "4px solid transparent" : "4px solid #BFA370",
                        borderBottom: "1px solid #f1f0ee",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        opacity: isDeleting ? 0 : 1,
                        transform: isDeleting ? "translateX(40px)" : "none",
                        position: "relative",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = n.dibaca ? "#fafaf9" : "#fef5e4"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = n.dibaca ? "white" : "#fef9f0"; }}
                    >
                      {/* Icon */}
                      <div style={{ width: 64, height: 64, background: iconInfo.bg, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                        {n.emoji || iconInfo.emoji}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <p style={{ fontWeight: n.dibaca ? 600 : 800, color: "#1a1a1a", fontSize: 15, marginBottom: 4 }}>
                            {!n.dibaca && (
                              <span style={{ display: "inline-block", width: 8, height: 8, background: "#BFA370", borderRadius: "50%", marginRight: 8, verticalAlign: "middle" }} />
                            )}
                            {n.judul}
                          </p>
                          <span style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap", marginLeft: 16, flexShrink: 0 }}>{n.waktu}</span>
                        </div>
                        <p style={{ fontSize: 13, color: "#6b7280" }}>{n.sub}</p>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={(e) => handleDelete(e, n.id)}
                        style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, borderRadius: "50%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s", color: "#9ca3af" }}
                        onMouseEnter={e => { e.stopPropagation(); (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; (e.currentTarget as HTMLButtonElement).style.background = "#fef2f2"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af"; (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
                        className="delete-btn"
                      >
                        <i className="ri-close-line" style={{ fontSize: 18 }} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      {/* Confirm delete all modal */}
      {confirmHapusSemua && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "white", borderRadius: 20, padding: "36px 40px", width: 380, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", marginBottom: 8 }}>Hapus Semua Notifikasi?</h3>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>Semua notifikasi akan dihapus permanen dan tidak bisa dikembalikan.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setConfirmHapusSemua(false)}
                style={{ flex: 1, padding: "12px", borderRadius: 12, border: "1.5px solid #e9e7e3", background: "white", fontSize: 14, fontWeight: 600, color: "#555", cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>
                Batal
              </button>
              <button onClick={() => { hapusSemua(); setConfirmHapusSemua(false); }}
                style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", background: "#ef4444", fontSize: 14, fontWeight: 700, color: "white", cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>
                Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        div:hover .delete-btn { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
