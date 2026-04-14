"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/useCartStoreSeller";

const ratingData = [
  { bintang: 5, jumlah: 437 },
  { bintang: 4, jumlah: 115 },
  { bintang: 3, jumlah: 35 },
  { bintang: 2, jumlah: 10 },
  { bintang: 1, jumlah: 0 },
];
const maxRating = Math.max(...ratingData.map((r) => r.jumlah));

export default function ProfilPage() {
  const { profile, setProfile } = useAppStore();
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState("");

  // local draft
  const [draft, setDraft] = useState({ ...profile });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        setDraft((p) => ({ ...p, avatar: src }));
        // Also update store so header avatar updates immediately
        setProfile({ avatar: src });
      };
      reader.readAsDataURL(f);
    }
  };

  const handleEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
  };

  const handleSimpan = () => {
    setProfile(draft);
    setEditing(false);
    showToast("Perubahan berhasil disimpan!");
  };

  const handleBatal = () => {
    setDraft({ ...profile });
    setEditing(false);
  };

  const displayProfile = editing ? draft : profile;

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: 24 }}>Profile</h1>

      <div
        className="shadow-soft"
        style={{ background: "white", borderRadius: 16, border: "1px solid #EEE", padding: 24, position: "relative", maxWidth: 800 }}
      >
        {/* Settings icon */}
        <button style={{ position: "absolute", top: 20, right: 20, color: "#9CA3AF", background: "none", border: "none", cursor: "pointer", fontSize: 20, transition: "color 0.15s" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#374151")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
        >
          <i className="ri-settings-3-line" />
        </button>

        <div style={{ display: "flex", gap: 32 }}>
          {/* Left: Avatar + Stats */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, flexShrink: 0, width: 152 }}>
            {/* Avatar */}
            <div style={{ position: "relative" }}>
              <div style={{ width: 96, height: 96, borderRadius: "50%", border: "3px solid #BFA370", overflow: "hidden", background: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {displayProfile.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayProfile.avatar} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                ) : (
                  <span style={{ fontSize: 32, fontWeight: 700, color: "#BFA370" }}>
                    {displayProfile.namaToko.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {editing && (
                <label
                  style={{ position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: "50%", background: "#BFA370", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "2px solid white" }}
                >
                  <i className="ri-camera-line" style={{ color: "white", fontSize: 14 }} />
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
                </label>
              )}
            </div>

            {!editing && (
              <label
                style={{ fontSize: 12, fontWeight: 500, color: "white", padding: "6px 12px", borderRadius: 8, width: "100%", textAlign: "center", cursor: "pointer", background: "linear-gradient(90deg,#BFA370,#8E754A)" }}
              >
                Ganti Foto Profile
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
              </label>
            )}

            {/* Total Item */}
            <div style={{ width: "100%", background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>Total Item</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: "#1F2937", marginTop: 2 }}>{profile.totalItem} item</p>
            </div>

            {/* Rating */}
            <div style={{ width: "100%", background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 12, padding: 16 }}>
              <p style={{ fontSize: 12, color: "#6B7280", fontWeight: 500, marginBottom: 8 }}>Rating Toko</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <i className="ri-star-fill" style={{ color: "#EAB308", fontSize: 20 }} />
                <span style={{ fontSize: 22, fontWeight: 800, color: "#1F2937" }}>{profile.rating}</span>
              </div>
              <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 12 }}>(500+ Ulasan)</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {ratingData.map((r) => (
                  <div key={r.bintang} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "#6B7280", width: 12, textAlign: "right", flexShrink: 0 }}>{r.bintang}</span>
                    <div style={{ flex: 1, background: "#E5E7EB", borderRadius: 99, height: 7, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#BFA370,#8E754A)", width: `${maxRating > 0 ? (r.jumlah / maxRating) * 100 : 0}%`, transition: "width 0.5s ease" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "#6B7280", width: 24, textAlign: "right", flexShrink: 0 }}>{r.jumlah}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Nama Toko */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Nama Toko</label>
              <input
                className="s-input"
                value={displayProfile.namaToko}
                onChange={(e) => editing && setDraft((p) => ({ ...p, namaToko: e.target.value }))}
                readOnly={!editing}
                style={{ background: editing ? "white" : "#FAFAFA", border: editing ? "1px solid #BFA370" : "1px solid #E0D9CF", cursor: editing ? "text" : "default" }}
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Deskripsi Toko</label>
              <textarea
                className="s-input"
                value={displayProfile.deskripsi}
                onChange={(e) => editing && setDraft((p) => ({ ...p, deskripsi: e.target.value }))}
                rows={4}
                style={{ resize: "none", background: editing ? "white" : "#FAFAFA", border: editing ? "1px solid #BFA370" : "1px solid #E0D9CF", cursor: editing ? "text" : "default" }}
                readOnly={!editing}
              />
            </div>

            {/* Kontak + Email */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Kontak</label>
                <input
                  className="s-input"
                  value={displayProfile.kontak}
                  onChange={(e) => editing && setDraft((p) => ({ ...p, kontak: e.target.value }))}
                  readOnly={!editing}
                  style={{ background: editing ? "white" : "#FAFAFA", border: editing ? "1px solid #BFA370" : "1px solid #E0D9CF" }}
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Email</label>
                <input
                  className="s-input"
                  type="email"
                  value={displayProfile.email}
                  onChange={(e) => editing && setDraft((p) => ({ ...p, email: e.target.value }))}
                  readOnly={!editing}
                  style={{ background: editing ? "white" : "#FAFAFA", border: editing ? "1px solid #BFA370" : "1px solid #E0D9CF" }}
                />
              </div>
            </div>

            {/* Alamat */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Alamat Toko</label>
              <textarea
                className="s-input"
                value={displayProfile.alamat}
                onChange={(e) => editing && setDraft((p) => ({ ...p, alamat: e.target.value }))}
                rows={3}
                style={{ resize: "none", background: editing ? "white" : "#FAFAFA", border: editing ? "1px solid #BFA370" : "1px solid #E0D9CF", cursor: editing ? "text" : "default" }}
                readOnly={!editing}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
              {!editing ? (
                <button
                  onClick={handleEdit}
                  style={{ border: "1px solid #BFA370", color: "#BFA370", background: "white", borderRadius: 10, padding: "10px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FAF8F5"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "white"; }}
                >
                  Edit Profil
                </button>
              ) : (
                <>
                  <button
                    onClick={handleBatal}
                    style={{ border: "1px solid #E5E7EB", color: "#6B7280", background: "white", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSimpan}
                    style={{ background: "linear-gradient(90deg,#BFA370,#8E754A)", color: "white", border: "none", borderRadius: 10, padding: "10px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(191,163,112,0.4)" }}
                  >
                    Simpan Perubahan
                  </button>
                </>
              )}
            </div>

            {/* Edit indicator */}
            {editing && (
              <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#92400E", display: "flex", alignItems: "center", gap: 6 }}>
                <i className="ri-edit-line" />
                Mode edit aktif — perubahan belum tersimpan
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: "#22C55E", color: "white", fontSize: 14, fontWeight: 500, padding: "12px 20px", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", zIndex: 50, display: "flex", alignItems: "center", gap: 8 }}>
          <i className="ri-check-line" style={{ fontSize: 18 }} /> {toast}
        </div>
      )}
    </div>
  );
}