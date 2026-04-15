"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@/store/useCartStoreSeller";

export default function TambahMenuPage() {
  const router = useRouter();
  const params = useSearchParams();
  const editId = params.get("edit") ? Number(params.get("edit")) : null;
  const { menuItems, addMenuItem, updateMenuItem } = useAppStore();

  const existing = editId ? menuItems.find((m) => m.id === editId) : null;

  const [form, setForm] = useState({
    nama: existing?.nama ?? "",
    deskripsi: existing?.deskripsi ?? "",
    kategori: existing?.kat ?? "Daging Ayam",
    harga: existing ? `Rp ${existing.harga.toLocaleString("id-ID")}` : "",
    waktuVal: "20",
    stok: existing?.stok?.toString() ?? "20",
    status: existing?.status === "habis" ? "Nonaktif" : "Aktif",
  });
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [rasa, setRasa] = useState<string[]>(["Pedas"]);
  const [kandungan, setKandungan] = useState<string[]>(["Ayam", "Susu"]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewImg(ev.target?.result as string);
      reader.readAsDataURL(f);
    }
  };

  const parseHarga = () => {
    const raw = form.harga.replace(/[^0-9]/g, "");
    return parseInt(raw) || 0;
  };

  const handleSimpan = () => {
    if (!form.nama.trim()) { showToast("Nama produk wajib diisi!"); return; }
    const harga = parseHarga();
    if (harga === 0) { showToast("Harga tidak valid!"); return; }
    const stok = parseInt(form.stok) || 0;

    if (editId && existing) {
      updateMenuItem(editId, {
        nama: form.nama,
        deskripsi: form.deskripsi,
        harga,
        kat: form.kategori.toLowerCase(),
        stok,
        status: stok > 0 ? "aktif" : "habis",
        waktu: `${form.waktuVal}min`,
      });
      showToast("Menu berhasil diperbarui!");
    } else {
      addMenuItem({
        nama: form.nama,
        deskripsi: form.deskripsi,
        harga,
        kat: form.kategori.toLowerCase(),
        img: previewImg ?? "/images/makanan2.png",
        waktu: `${form.waktuVal}min`,
        terjual: "0",
        suka: 0,
        stok,
        status: stok > 0 ? "aktif" : "habis",
      });
      showToast("Menu berhasil ditambahkan!");
    }
    setTimeout(() => router.push("/seller/menu"), 1000);
  };

  const toggleArr = (arr: string[], val: string, set: (v: string[]) => void) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const hargaNum = parseHarga();

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: 24 }}>{editId ? "Edit Menu" : "Tambah Menu"}</h1>

      <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
        {/* Left: Form */}
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, color: "#374151", marginBottom: 12 }}>Edit Menu</p>
          <div className="shadow-soft" style={{ background: "white", borderRadius: 16, border: "1px solid #EEE", padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Upload + Name + Desc */}
            <div style={{ display: "flex", gap: 20 }}>
              <label
                style={{ width: 120, height: 110, border: "2px dashed #DDD", borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "#FAF8F5", overflow: "hidden", flexShrink: 0, transition: "border-color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#BFA370")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#DDD")}
              >
                {previewImg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewImg} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                ) : (
                  <>
                    <i className="ri-image-add-line" style={{ fontSize: 24, color: "#D1D5DB", marginBottom: 4 }} />
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>Unggah Foto</span>
                  </>
                )}
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
              </label>

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Nama Produk</label>
                  <input className="s-input" value={form.nama} onChange={(e) => setForm((p) => ({ ...p, nama: e.target.value }))} placeholder="Ayam Bakar Pedas" />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Deskripsi Produk</label>
                  <textarea className="s-input" value={form.deskripsi} onChange={(e) => setForm((p) => ({ ...p, deskripsi: e.target.value }))} rows={3} style={{ resize: "none" }} placeholder="Deskripsi menu..." />
                </div>
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Kategori</label>
              <select className="s-input" value={form.kategori} onChange={(e) => setForm((p) => ({ ...p, kategori: e.target.value }))} style={{ cursor: "pointer" }}>
                <option>Daging Ayam</option><option>Seafood</option><option>Vegetarian</option><option>Minuman</option>
              </select>
            </div>

            {/* Harga & Produksi */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#BFA370", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Informasi harga &amp; Produksi</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Harga</label>
                  <input className="s-input" value={form.harga} onChange={(e) => setForm((p) => ({ ...p, harga: e.target.value }))} onBlur={() => { if (parseHarga() > 0) setForm((p) => ({ ...p, harga: `Rp ${parseHarga().toLocaleString("id-ID")}` })); }} placeholder="Rp 20.000" />
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Estimasi Waktu Masak</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      <select className="s-input" value={form.waktuVal} onChange={(e) => setForm((p) => ({ ...p, waktuVal: e.target.value }))} style={{ cursor: "pointer" }}>
                        <option>10</option><option>15</option><option>20</option><option>30</option>
                      </select>
                      <select className="s-input" style={{ cursor: "pointer" }}><option>Menit</option><option>Jam</option></select>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4B5563", display: "block", marginBottom: 4 }}>Stok Default</label>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <input type="number" className="s-input" style={{ width: 80 }} value={form.stok} onChange={(e) => setForm((p) => ({ ...p, stok: e.target.value }))} />
                      <span style={{ fontSize: 14, color: "#6B7280" }}>Porsi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rasa + Kandungan */}
            <div style={{ display: "flex", gap: 32 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", marginBottom: 8 }}>Rasa</p>
                {["Pedas", "Gurih", "Manis", "Asam"].map((r) => (
                  <label key={r} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#374151", cursor: "pointer", marginBottom: 6 }}>
                    <input type="checkbox" checked={rasa.includes(r)} onChange={() => toggleArr(rasa, r, setRasa)} style={{ accentColor: "#BFA370", width: 15, height: 15 }} /> {r}
                  </label>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", textTransform: "uppercase", marginBottom: 8 }}>Kandungan</p>
                {["Ayam", "Telur", "Seafood", "Susu", "Kacang"].map((k) => (
                  <label key={k} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#374151", cursor: "pointer", marginBottom: 6 }}>
                    <input type="checkbox" checked={kandungan.includes(k)} onChange={() => toggleArr(kandungan, k, setKandungan)} style={{ accentColor: "#BFA370", width: 15, height: 15 }} /> {k}
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, color: "#4B5563", fontWeight: 500 }}>Status Menu :</span>
              <select className="s-input" style={{ width: "auto", cursor: "pointer" }} value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}>
                <option>Aktif</option><option>Nonaktif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ width: 240, flexShrink: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#4B5563", marginBottom: 12 }}>Preview</p>
          <div style={{ background: "white", borderRadius: 16, overflow: "hidden", border: "1px solid #EEE", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewImg || "https://placehold.co/240x150/f3f3f3/BFA370?text=Foto+Menu"} style={{ width: "100%", height: 144, objectFit: "cover" }} alt="" />
            <div style={{ padding: 16 }}>
              <p style={{ fontWeight: 700, color: "#1F2937" }}>{form.nama || "Nama Menu"}</p>
              <p style={{ color: "#22C55E", fontWeight: 700, fontSize: 16 }}>
                {hargaNum > 0 ? `Rp ${hargaNum.toLocaleString("id-ID")}` : "Rp 0"}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                <button style={{ width: 24, height: 24, border: "1px solid #E5E7EB", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", background: "white" }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 14 }}>{form.stok || "0"}</span>
                <button style={{ width: 24, height: 24, border: "1px solid #E5E7EB", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", background: "white" }}>+</button>
              </div>
              <p style={{ fontSize: 12, color: "#22C55E", marginTop: 8 }}>✔ Terjual · {form.waktuVal}min</p>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4, lineHeight: 1.4 }}>
                {form.deskripsi || "Deskripsi produk..."}
              </p>
              <button style={{ marginTop: 12, width: "100%", padding: "8px 0", borderRadius: 12, fontSize: 12, fontWeight: 600, color: "white", background: "linear-gradient(90deg,#BFA370,#8E754A)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <i className="ri-magic-line" /> Generate Deskripsi dengan AI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
        <button
          onClick={() => router.push("/seller/menu")}
          style={{ border: "1px solid #BFA370", color: "#BFA370", background: "white", borderRadius: 10, padding: "10px 32px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
        >
          Batal
        </button>
        <button
          onClick={handleSimpan}
          style={{ background: "linear-gradient(90deg,#BFA370,#8E754A)", color: "white", border: "none", borderRadius: 10, padding: "10px 40px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 12px rgba(191,163,112,0.4)" }}
        >
          {editId ? "Simpan Perubahan" : "Simpan Menu"}
        </button>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, background: toast.includes("!") && !toast.includes("berhasil") ? "#EF4444" : "#22C55E", color: "white", fontSize: 14, fontWeight: 500, padding: "12px 20px", borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", zIndex: 50, display: "flex", alignItems: "center", gap: 8 }}>
          <i className="ri-check-line" style={{ fontSize: 18 }} /> {toast}
        </div>
      )}
    </div>
  );
}