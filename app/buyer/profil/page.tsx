"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/useCartStore";
import { useNotifStore } from "@/store/useNotifStore";
import { PRODUK_LIST, TOKO_LIST, VOUCHERS, formatRupiah } from "@/lib/dummyData";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ── Reusable Accordion item ──
function Accordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e9e7e3" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 15, color: "#1a1a1a", fontFamily: "Poppins,sans-serif" }}>
        {q}
        <i className={open ? "ri-subtract-line" : "ri-add-line"} style={{ fontSize: 18, color: "#666", flexShrink: 0, marginLeft: 16 }} />
      </button>
      {open && (
        <div style={{ background: "#f9f8f5", borderRadius: 8, padding: "14px 16px", marginBottom: 12, fontSize: 13, color: "#555", lineHeight: 1.7 }}>
          {a}
        </div>
      )}
    </div>
  );
}

// ── Input row ──
function InputRow({ label, value, onChange, type = "text", readOnly, rightEl }: {
  label: string; value: string; onChange?: (v: string) => void;
  type?: string; readOnly?: boolean; rightEl?: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "#1a1a1a", marginBottom: 8 }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input type={type === "password" ? (show ? "text" : "password") : type}
          value={value} readOnly={readOnly}
          onChange={e => onChange?.(e.target.value)}
          style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e9e7e3", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "Poppins,sans-serif", boxSizing: "border-box", background: readOnly ? "#f9f8f5" : "white", color: "#1a1a1a" }}
          onFocus={e => { if (!readOnly) e.target.style.borderColor = "#BFA370"; }}
          onBlur={e => e.target.style.borderColor = "#e9e7e3"}
        />
        {type === "password" && (
          <button onClick={() => setShow(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
            <i className={show ? "ri-eye-line" : "ri-eye-off-line"} style={{ fontSize: 18 }} />
          </button>
        )}
        {rightEl && <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>{rightEl}</div>}
      </div>
    </div>
  );
}

// ── Panel: Edit Profil ──
function PanelEditProfil({ setPanel }: { setPanel: (p: string) => void }) {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "Faiz Faadillah");
  const [email] = useState(user?.email || "faizfaadillah@gmail.com");
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");

  const handleSave = () => {
    updateProfile({ name });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 28 }}>Profil Saya</h2>
      {/* Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <div style={{ position: "relative" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", overflow: "hidden", border: "3px solid #f1f0ee", background: "#e9dfc8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {avatarPreview
              ? <img src={avatarPreview} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <i className="ri-user-fill" style={{ fontSize: 36, color: "#BFA370" }} />}
          </div>
        </div>
        <button onClick={() => fileRef.current?.click()}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#6b7280", color: "white", border: "none", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>
          <i className="ri-pencil-line" /> Edit Foto
        </button>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
          onChange={e => { const f = e.target.files?.[0]; if (f) { setAvatarPreview(URL.createObjectURL(f)); } }} />
      </div>

      <InputRow label="Username" value={name} onChange={setName} />
      <InputRow label="Email" value={email} readOnly />
      <InputRow label="Sandi" value="*****" type="password" readOnly
        rightEl={<button onClick={() => setPanel("ubah-sandi")} style={{ background: "none", border: "none", cursor: "pointer", color: "#3b82f6", fontSize: 13, fontWeight: 600, fontFamily: "Poppins,sans-serif", whiteSpace: "nowrap" }}>Ubah Sandi</button>} />

      <button onClick={handleSave}
        style={{ padding: "12px 40px", borderRadius: 10, border: "none", background: "#3b82f6", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins,sans-serif", marginTop: 12, transition: "all 0.2s" }}>
        {saved ? "✓ Tersimpan!" : "Simpan"}
      </button>
    </div>
  );
}

// ── Panel: Ubah Sandi ──
function PanelUbahSandi({ setPanel }: { setPanel: (p: string) => void }) {
  const [curr, setCurr] = useState(""); const [nw, setNw] = useState(""); const [confirm, setConfirm] = useState("");
  const [done, setDone] = useState(false);
  const handleSave = () => { if (nw === confirm && nw.length >= 8) { setDone(true); setTimeout(() => { setDone(false); setPanel("edit-profil"); }, 2000); } };
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 28 }}>Ubah Kata Sandi</h2>
      <InputRow label="Kata sandi saat ini" value={curr} onChange={setCurr} type="password" />
      <InputRow label="Kata sandi baru" value={nw} onChange={setNw} type="password" />
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.6 }}>
        Kata sandi Anda harus paling tidak 8 karakter dan harus menyertakan kombinasi angka, huruf, dan karakter khusus (! $@%)
      </p>
      <InputRow label="Tulis ulang kata sandi baru" value={confirm} onChange={setConfirm} type="password" />
      <p style={{ fontSize: 13, color: "#3b82f6", cursor: "pointer", marginBottom: 24 }}>Lupa kata sandi Anda?</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleSave}
          style={{ padding: "12px 32px", borderRadius: 20, border: "none", background: "#3b82f6", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>
          {done ? "✓ Berhasil!" : "Ubah kata sandi"}
        </button>
      </div>
    </div>
  );
}

// ── Panel: Jenis Member ──
function PanelJenisMember() {
  const MEMBERS = [
    { id: "silver", label: "MEMBER SILVER", bg: "#9ca3af", benefits: [
      { emoji: "💰", title: "CASHBACK 3%", desc: "Dapatkan kembali 3% uang dari setiap transaksi" },
      { emoji: "🎫", title: "VOUCHER EXCLUSIF RP 5.000", desc: "Kupon spesial hanya untuk member setiap bulan" },
      { emoji: "⚡", title: "FLASH SALE PRIORITAS", desc: "Akses 30 detik lebih cepat untuk FlashSale" },
    ]},
    { id: "gold", label: "MEMBER GOLD", bg: "linear-gradient(135deg,#BFA370,#8E754A)", benefits: [
      { emoji: "💰", title: "CASHBACK 5%", desc: "Dapatkan kembali 5% dari setiap transaksi" },
      { emoji: "🎫", title: "VOUCHER EXCLUSIF RP 25.000", desc: "Kupon spesial hanya untuk member setiap bulan" },
      { emoji: "💬", title: "LAYANAN CHAT VIP", desc: "Respon cepat dari tim support kami" },
      { emoji: "⚡", title: "FLASH SALE PRIORITAS", desc: "Akses 30 detik lebih cepat untuk FlashSale" },
      { emoji: "👤", title: "KUSTOMISASI PROFIL", desc: "Personalisasi profil dengan badge eksklusif" },
    ]},
  ];
  const [activeMember, setActiveMember] = useState("silver");
  const member = MEMBERS.find(m => m.id === activeMember)!;

  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 24 }}>Member Anda</h2>
      {/* Member card slider */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <div style={{ background: member.bg, borderRadius: 16, padding: "32px 28px", minHeight: 100, display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: "white", letterSpacing: 2 }}>{member.label}</span>
        </div>
        <button onClick={() => setActiveMember(m => m === "silver" ? "gold" : "silver")}
          style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.3)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className="ri-arrow-right-s-line" style={{ fontSize: 20, color: "white" }} />
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <Link href="/buyer/profil?panel=voucher" style={{ textDecoration: "none" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 16px", border: "1.5px solid #e9e7e3", borderRadius: 8, background: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins,sans-serif", color: "#555" }}>
            <i className="ri-coupon-3-line" style={{ color: "#BFA370" }} /> Lihat Voucher
          </button>
        </Link>
      </div>
      <h3 style={{ fontWeight: 800, fontSize: 18, color: "#1a1a1a", marginBottom: 16 }}>Keuntungan :</h3>
      <div style={{ border: "1px solid #e9e7e3", borderRadius: 12, overflow: "hidden" }}>
        {member.benefits.map((b, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", borderBottom: i < member.benefits.length - 1 ? "1px solid #e9e7e3" : "none" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fef9f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{b.emoji}</div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 14, color: "#1a1a1a" }}>{b.title}</p>
              <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: "#fef9f0", border: "1px solid #BFA370", borderRadius: 12, padding: "14px 18px", marginTop: 20, fontSize: 13, color: "#78450E" }}>
        <strong>Syarat upgrade ke Gold:</strong> Total transaksi &gt; Rp500.000 dan aktif minimal Rp50.000/bulan
      </div>
    </div>
  );
}

// ── Panel: Data & Privasi ──
function PanelDataPrivasi() {
  const ITEMS = [
    { q: "Informasi apa yang kami kumpulkan tentang Anda?", a: "Bagaimana kami menggunakan informasi Anda?\n\nKami dapat menggunakan informasi yang kami kumpulkan untuk tujuan berikut:\n• Untuk mendaftarkan Anda atau perangkat Anda untuk suatu Layanan\n• Untuk menyediakan Layanan atau fitur yang Anda minta\n• Untuk menyediakan konten yang disesuaikan dan memberikan rekomendasi berdasarkan aktivitas Anda\n• Untuk periklanan dan komunikasi promosi kepada Anda" },
    { q: "Informasi apa yang kami kumpulkan tentang Anda?", a: "Kami mengumpulkan data pribadi yang Anda berikan secara langsung, seperti nama, email, nomor telepon, dan informasi pembayaran." },
    { q: "Informasi apa yang kami kumpulkan tentang Anda?", a: "Data lokasi Anda mungkin dikumpulkan untuk membantu menemukan restoran dan toko terdekat." },
    { q: "Informasi apa yang kami kumpulkan tentang Anda?", a: "Kami menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna." },
    { q: "Informasi apa yang kami kumpulkan tentang Anda?", a: "Anda memiliki hak untuk mengakses, memperbarui, dan menghapus data pribadi Anda kapan saja." },
    { q: "Informasi apa yang kami kumpulkan tentang Anda?", a: "Kami tidak menjual data pribadi Anda kepada pihak ketiga tanpa persetujuan Anda." },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 12 }}>Data & Privasi</h2>
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, marginBottom: 28 }}>
        Kami ingin Anda memahami secara pasti bagaimana layanan NyamNow bekerja dan mengapa kami memerlukan detail Anda. Dengan meninjau kebijakan kami, Anda dapat terus menggunakan aplikasi ini dengan tenang.
      </p>
      {ITEMS.map((item, i) => <Accordion key={i} q={item.q} a={item.a} />)}
    </div>
  );
}

// ── Panel: Voucher ──
function PanelVoucher() {
  const [kode, setKode] = useState("");
  const myVouchers = VOUCHERS.slice(0, 4);
  const forYou = VOUCHERS.slice(4);

  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 24 }}>Voucher Saya</h2>
      {/* Input kode */}
      <div style={{ display: "flex", gap: 0, marginBottom: 28, border: "1.5px solid #e9e7e3", borderRadius: 10, overflow: "hidden" }}>
        <input type="text" placeholder="Masukan Kode Voucher" value={kode} onChange={e => setKode(e.target.value)}
          style={{ flex: 1, padding: "13px 18px", border: "none", outline: "none", fontSize: 14, fontFamily: "Poppins,sans-serif", color: "#1a1a1a" }} />
        <button style={{ padding: "13px 24px", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>Pakai</button>
      </div>

      {/* My vouchers */}
      <p style={{ fontWeight: 600, fontSize: 14, color: "#555", marginBottom: 14 }}>Voucher yang anda miliki</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
        {myVouchers.map((v, i) => (
          <div key={i} style={{ display: "flex", border: "1.5px solid #e9e7e3", borderRadius: 12, overflow: "hidden", background: "white" }}>
            <div style={{ width: 6, background: "#BFA370", flexShrink: 0 }} />
            <div style={{ width: 80, background: "#fef9f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 36 }}>🐱</span>
            </div>
            <div style={{ flex: 1, padding: "10px 12px", borderLeft: "2px dashed #e9e7e3" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #BFA370", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "#1a1a1a" }}>{v.judul}</p>
                  <p style={{ fontSize: 11, color: "#6b7280", margin: "3px 0 6px", lineHeight: 1.5 }}>{v.desc}</p>
                  <div style={{ borderTop: "1px dashed #e9e7e3", paddingTop: 6 }}>
                    <p style={{ fontSize: 10, color: "#9ca3af" }}>{v.berlaku}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Voucher for you */}
      <p style={{ fontWeight: 600, fontSize: 14, color: "#9ca3af", marginBottom: 14 }}>Voucher untuk anda</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {forYou.map((v, i) => (
          <div key={i} style={{ display: "flex", border: "1.5px solid #e9e7e3", borderRadius: 12, overflow: "hidden", background: "white" }}>
            <div style={{ width: 6, background: "#e9e7e3", flexShrink: 0 }} />
            <div style={{ width: 80, background: "#f9f5f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 32 }}>{v.tipe === "minuman" ? "🍽️" : "🐱"}</span>
            </div>
            <div style={{ flex: 1, padding: "10px 12px", borderLeft: "2px dashed #e9e7e3" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #e9e7e3", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, color: "#1a1a1a" }}>{v.judul}</p>
                  <p style={{ fontSize: 11, color: "#6b7280", margin: "3px 0 6px", lineHeight: 1.5 }}>{v.desc}</p>
                  <div style={{ borderTop: "1px dashed #e9e7e3", paddingTop: 6 }}>
                    <p style={{ fontSize: 10, color: "#9ca3af" }}>{v.berlaku}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Panel: Favorit ──
function PanelFavorit() {
  const { favorites, toggleFavorite } = useCartStore();
  const favProduk = PRODUK_LIST.filter(p => favorites.includes(p.id));
  const favToko = TOKO_LIST.filter(t => favorites.includes(-t.id));
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 24 }}>Favorit Kamu</h2>
      {favProduk.length === 0 && favToko.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
          <i className="ri-heart-3-line" style={{ fontSize: 56, display: "block", marginBottom: 12 }} />
          <p style={{ fontSize: 15, fontWeight: 600 }}>Belum ada favorit</p>
          <p style={{ fontSize: 13 }}>Tap ❤️ pada menu atau toko untuk menyimpan</p>
        </div>
      )}
      {favToko.length > 0 && (
        <>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#555", marginBottom: 12 }}>Toko Favorit ({favToko.length})</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
            {favToko.map(t => (
              <Link key={t.id} href={`/buyer/toko?id=${t.id}`} style={{ textDecoration: "none" }}>
                <div style={{ border: "1.5px solid #e9e7e3", borderRadius: 12, overflow: "hidden", display: "flex", gap: 12, padding: 12, cursor: "pointer", alignItems: "center" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#fafaf8")}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "white")}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                    <img src={t.img} alt={t.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 13 }}>{t.nama}</p>
                    <p style={{ fontSize: 11, color: "#9ca3af" }}>{t.jarak} • {t.terjual} terjual</p>
                  </div>
                  <button onClick={e => { e.preventDefault(); toggleFavorite(-t.id); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 18 }}>
                    <i className="ri-heart-3-fill" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
      {favProduk.length > 0 && (
        <>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#555", marginBottom: 12 }}>Menu Favorit ({favProduk.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {favProduk.map(p => (
              <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                <div style={{ border: "1.5px solid #e9e7e3", borderRadius: 12, display: "flex", gap: 14, padding: 14, alignItems: "center", cursor: "pointer" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#fafaf8")}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "white")}>
                  <div style={{ width: 64, height: 64, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                    <img src={p.img} alt={p.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a" }}>{p.nama}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 2 }}>{p.toko}</p>
                    <p style={{ fontWeight: 700, color: "#16a34a", fontSize: 15 }}>{formatRupiah(p.harga)}</p>
                  </div>
                  <button onClick={e => { e.preventDefault(); toggleFavorite(p.id); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 20 }}>
                    <i className="ri-heart-3-fill" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Panel: Notifikasi ──
function PanelNotifikasi() {
  const { notifs, hapus, baca } = useNotifStore();
  const TIPE_BG: Record<string, string> = { toko:"#fef9f0", flash:"#fffbeb", voucher:"#f5f3ff", pesanan:"#f0fdf4", rating:"#fef9f0" };
  const grups = ["Hari Ini","Kemarin","Minggu Ini"] as const;
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 24 }}>Notifikasi</h2>
      {grups.map(grup => {
        const items = notifs.filter(n => n.grup === grup);
        if (!items.length) return null;
        return (
          <div key={grup} style={{ marginBottom: 28 }}>
            <h3 style={{ fontWeight: 800, fontSize: 18, color: "#1a1a1a", marginBottom: 14 }}>{grup}</h3>
            {items.map(n => (
              <div key={n.id} onClick={() => baca(n.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: "1px solid #f1f0ee", cursor: "pointer", position: "relative" }}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = "#fafaf8")}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = "none")}>
                <div style={{ width: 60, height: 60, background: TIPE_BG[n.tipe] || "#fef9f0", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>
                  {n.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: n.dibaca ? 600 : 800, fontSize: 14, color: "#1a1a1a", marginBottom: 2 }}>
                    {!n.dibaca && <span style={{ display: "inline-block", width: 7, height: 7, background: "#BFA370", borderRadius: "50%", marginRight: 7, verticalAlign: "middle" }} />}
                    {n.judul}
                  </p>
                  <p style={{ fontSize: 12, color: "#6b7280" }}>{n.sub}</p>
                </div>
                <span style={{ fontSize: 11, color: "#9ca3af", flexShrink: 0 }}>{n.waktu}</span>
                <button onClick={e => { e.stopPropagation(); hapus(n.id); }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 16, opacity: 0, transition: "opacity 0.2s" }}
                  className="del-btn"
                ><i className="ri-close-line" /></button>
              </div>
            ))}
          </div>
        );
      })}
      {notifs.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
          <i className="ri-notification-3-line" style={{ fontSize: 52, display: "block", marginBottom: 12 }} />
          <p>Tidak ada notifikasi</p>
        </div>
      )}
      <style>{`div:hover .del-btn { opacity: 1 !important; }`}</style>
    </div>
  );
}

// ── Panel: Histori ──
function PanelHistori() {
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 20 }}>Histori Pesanan</h2>
      <div style={{ background: "#fef9f0", border: "1px solid #BFA370", borderRadius: 12, padding: "16px 20px", marginBottom: 16 }}>
        <p style={{ fontSize: 14, color: "#78450E" }}>
          <i className="ri-information-line" style={{ marginRight: 8 }} />
          Histori pesanan tersedia di halaman <strong>Keranjang → tab Histori</strong>
        </p>
        <Link href="/buyer/keranjang">
          <button style={{ marginTop: 12, padding: "10px 24px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#BFA370,#8E754A)", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>
            Lihat Histori →
          </button>
        </Link>
      </div>
    </div>
  );
}

// ── Panel: Langganan ──
function PanelLangganan() {
  const [tab, setTab] = useState<"1"| "3" | "6">("1");
  const [done, setDone] = useState(false);
  const PLANS: Record<string, { price: number; total: number; desc: string }> = {
    "1": { price: 150000, total: 150000,  desc: "Langganan Nyamber selama 1 bulan!" },
    "3": { price: 150000, total: 450000,  desc: "Langganan Nyamber selama 3 bulan!" },
    "6": { price: 150000, total: 900000,  desc: "Langganan Nyamber selama 6 bulan!" },
  };
  const plan = PLANS[tab];
  const FAQS = [
    { q:"Apa itu Nyamber?", a:"Nyamber adalah layanan berlangganan premium Market Kita yang memberikan akses eksklusif ke fitur-fitur terbaik." },
    { q:"Apakah semua pengguna dapat berlangganan Nyamber?", a:"Ya, semua pengguna yang sudah terdaftar dapat berlangganan Nyamber." },
    { q:"Apa saja syarat untuk berlangganan Nyamber?", a:"Syarat utamanya adalah memiliki akun aktif dan metode pembayaran yang valid." },
    { q:"Informasi apa yang kami kumpulkan tentang Anda?", a:"Kami mengumpulkan data yang diperlukan untuk proses pembayaran dan pengelolaan layanan." },
    { q:"Informasi apa yang kami kumpulkan tentang Anda?", a:"Data Anda dijaga kerahasiaannya sesuai kebijakan privasi kami." },
  ];

  if (done) return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div style={{ fontSize: 72, marginBottom: 16 }}>👑</div>
      <h3 style={{ fontSize: 24, fontWeight: 900, color: "#BFA370" }}>Selamat! Kamu sudah Nyamber!</h3>
      <p style={{ color: "#6b7280", marginTop: 8 }}>Langganan aktif hingga {new Date(Date.now() + Number(tab)*30*24*3600*1000).toLocaleDateString("id-ID", {day:"numeric",month:"long",year:"numeric"})}</p>
      <div style={{ marginTop: 24, background: "#fef9f0", border: "1px solid #BFA370", borderRadius: 12, padding: "16px 20px", textAlign: "left", maxWidth: 420, margin: "24px auto 0" }}>
        <p style={{ fontWeight: 700, fontSize: 14, color: "#78450E", marginBottom: 10 }}>Benefit kamu:</p>
        {["🤖 Akses AI ChatBot unlimited","🥇 Auto Member Gold","🏷️ Label Premium","🎫 Voucher mingguan eksklusif"].map((b,i) => (
          <p key={i} style={{ fontSize: 13, color: "#555", marginBottom: 4 }}>{b}</p>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
        <i className="ri-vip-crown-2-fill" style={{ color: "#BFA370" }} /> Nyamber
      </h2>
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 24 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
      </p>

      {/* Duration tabs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", marginBottom: 16, borderRadius: 10, overflow: "hidden", border: "1px solid #e9e7e3" }}>
        {(["1","3","6"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: "14px 0", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 16, fontFamily: "Poppins,sans-serif", transition: "all 0.2s",
              background: tab === t ? "linear-gradient(135deg,#BFA370,#8E754A)" : "#d1d1d1",
              color: tab === t ? "white" : "#555",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            {tab === t && <i className="ri-thumb-up-fill" style={{ fontSize: 14 }} />}
            {t} bulan
          </button>
        ))}
      </div>

      {/* Price card */}
      <div style={{ border: "1.5px solid #e9e7e3", borderRadius: 14, padding: "24px 28px", marginBottom: 28, background: "white" }}>
        <p style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 4 }}>
          {formatRupiah(plan.price)}{tab !== "1" ? "/bulan" : ""}
        </p>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 16 }}>
          {tab === "1" ? plan.desc : formatRupiah(plan.total)}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f9f8f5", borderRadius: 8, padding: "10px 14px", marginBottom: 20, border: "1px solid #e9e7e3" }}>
          <i className="ri-bank-card-line" style={{ color: "#6b7280", fontSize: 16 }} />
          <span style={{ fontSize: 13, color: "#6b7280" }}>Hemat mulai dari Rp250.000 tiap pembelian</span>
        </div>
        <button onClick={() => setDone(true)}
          style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#BFA370,#8E754A)", color: "white", fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "Poppins,sans-serif", boxShadow: "0 4px 16px rgba(191,163,112,0.4)" }}>
          Cobain Nyamber, yuk!
        </button>
      </div>

      {/* FAQs */}
      {FAQS.map((f,i) => <Accordion key={i} q={f.q} a={f.a} />)}
    </div>
  );
}

// ── Panel: Kontak Kami ──
function PanelKontak() {
  const [fname,setFname]=useState(""); const [lname,setLname]=useState("");
  const [email,setEmail]=useState(""); const [phone,setPhone]=useState("");
  const [pesan,setPesan]=useState(""); const [sent,setSent]=useState(false);
  const handle=()=>{ if(pesan.trim()) { setSent(true); setTimeout(()=>setSent(false),3000); }};
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 6 }}>Kontak Kami</h2>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 28 }}>Ada pertanyaan atau komentar? Cukup kirimkan pesan kepada kami!</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Left: info */}
        <div style={{ background: "#2d2d2d", borderRadius: 16, padding: "28px 24px", color: "white", display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Ucapkan sesuatu untuk memulai obrolan langsung!</p>
          <div style={{ flex: 1 }} />
          {[{icon:"ri-phone-line", text:"+123456789"},{icon:"ri-mail-line",text:"apaya@gmail.com"},{icon:"ri-map-pin-2-line",text:"Jl. Deket Rumah"}].map((item,i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <i className={item.icon} style={{ fontSize: 16, color: "white" }} />
              </div>
              <span style={{ fontSize: 14 }}>{item.text}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            {["ri-twitter-fill","ri-instagram-line","ri-discord-fill"].map((ic,i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <i className={ic} style={{ fontSize: 18, color: "white" }} />
              </div>
            ))}
          </div>
        </div>
        {/* Right: form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#555", display: "block", marginBottom: 8 }}>Nama Depan</label>
              <input value={fname} onChange={e=>setFname(e.target.value)} style={{ width:"100%", padding:"11px 0", border:"none", borderBottom:"1.5px solid #e9e7e3", outline:"none", fontSize:14, fontFamily:"Poppins,sans-serif", boxSizing:"border-box" }}
                onFocus={e=>(e.target.style.borderBottomColor="#BFA370")} onBlur={e=>(e.target.style.borderBottomColor="#e9e7e3")} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#555", display: "block", marginBottom: 8 }}>Nama Belakang</label>
              <input value={lname} onChange={e=>setLname(e.target.value)} style={{ width:"100%", padding:"11px 0", border:"none", borderBottom:"1.5px solid #e9e7e3", outline:"none", fontSize:14, fontFamily:"Poppins,sans-serif", boxSizing:"border-box" }}
                onFocus={e=>(e.target.style.borderBottomColor="#BFA370")} onBlur={e=>(e.target.style.borderBottomColor="#e9e7e3")} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#555", display: "block", marginBottom: 8 }}>Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} style={{ width:"100%", padding:"11px 0", border:"none", borderBottom:"1.5px solid #e9e7e3", outline:"none", fontSize:14, fontFamily:"Poppins,sans-serif", boxSizing:"border-box" }}
                onFocus={e=>(e.target.style.borderBottomColor="#BFA370")} onBlur={e=>(e.target.style.borderBottomColor="#e9e7e3")} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#555", display: "block", marginBottom: 8 }}>Nomor HP</label>
              <input value={phone} onChange={e=>setPhone(e.target.value)} style={{ width:"100%", padding:"11px 0", border:"none", borderBottom:"1.5px solid #e9e7e3", outline:"none", fontSize:14, fontFamily:"Poppins,sans-serif", boxSizing:"border-box" }}
                onFocus={e=>(e.target.style.borderBottomColor="#BFA370")} onBlur={e=>(e.target.style.borderBottomColor="#e9e7e3")} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#555", display: "block", marginBottom: 8 }}>Pesan</label>
            <input placeholder="Tulis pesanmu disini..." value={pesan} onChange={e=>setPesan(e.target.value)} style={{ width:"100%", padding:"11px 0", border:"none", borderBottom:"1.5px solid #e9e7e3", outline:"none", fontSize:14, fontFamily:"Poppins,sans-serif", boxSizing:"border-box" }}
              onFocus={e=>(e.target.style.borderBottomColor="#BFA370")} onBlur={e=>(e.target.style.borderBottomColor="#e9e7e3")} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handle} style={{ padding: "13px 36px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#3A2106,#5a3510)", color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>
              {sent ? "✓ Terkirim!" : "Kirim Pesanmu"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Panel: Kebijakan ──
function PanelKebijakan() {
  const sections = Array.from({length:8},(_,i)=>i+1);
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 16 }}>Kebijakan</h2>
      <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, marginBottom: 8 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 24 }}>1.024</p>
      {sections.map(n => (
        <div key={n} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>{n}. Perkenalan</h3>
          <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.75 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>1.024</p>
        </div>
      ))}
    </div>
  );
}

// ── Panel: Pusat Bantuan ──
function PanelBantuan() {
  const [search, setSearch] = useState("");
  const FAQS = Array.from({length:6}, () => "Berapa banyak waktu yang saya perlukan untuk mempelajari aplikasi ini?");
  const ANSWERS = Array.from({length:6}, () => "Biasanya hanya butuh 5–10 menit untuk memahami fitur utama aplikasi ini. Kami menyediakan tutorial interaktif dan panduan singkat yang bisa kamu ikuti langsung saat pertama kali masuk.");
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#1a1a1a", marginBottom: 6 }}>Bagaimana kami dapat membantu Anda?</h2>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>Punya pertanyaan? Cari di Pusat Bantuan kami.</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1.5px solid #e9e7e3", borderRadius: 10, padding: "12px 16px", marginBottom: 10 }}>
        <i className="ri-search-line" style={{ color: "#9ca3af", fontSize: 18 }} />
        <input type="text" placeholder="Masukkan pertanyaan, topik, atau kata kunci" value={search} onChange={e => setSearch(e.target.value)}
          style={{ border: "none", outline: "none", flex: 1, fontSize: 14, fontFamily: "Poppins,sans-serif", color: "#1a1a1a" }} />
      </div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 28 }}>... atau pilih kategori untuk menemukan bantuan yang Anda butuhkan dengan cepat.</p>
      {/* Category cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 40 }}>
        {[
          { icon:"ri-question-line", title:"FAQs", desc:"FAQ, singkatan dari frequently asked questions (pertanyaan yang sering diajukan), adalah daftar pertanyaan dan jawaban yang umum diajukan tentang topik tertentu.", link:"Lihat FAQ →" },
          { icon:"ri-file-list-line", title:"Panduan & Sumber Daya", desc:"Panduan Gaya UI adalah alat desain & pengembangan yang memberikan kohesi pada antarmuka & pengalaman pengguna produk digital.", link:"Jelajahi Panduan →" },
          { icon:"ri-customer-service-2-line", title:"Dukungan", desc:"Kabar baiknya adalah Anda tidak sendirian, dan Anda berada di tempat yang tepat. Hubungi kami untuk dukungan yang lebih detail.", link:"Ajukan Permintaan →" },
        ].map((c,i) => (
          <div key={i} style={{ border: "1.5px solid #e9e7e3", borderRadius: 14, padding: "20px 18px", cursor: "pointer" }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor="#BFA370")}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor="#e9e7e3")}>
            <i className={c.icon} style={{ fontSize: 28, color: "#555", display: "block", marginBottom: 10 }} />
            <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{c.title}</p>
            <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6, marginBottom: 14 }}>{c.desc}</p>
            <span style={{ fontSize: 12, color: "#BFA370", fontWeight: 600 }}>{c.link}</span>
          </div>
        ))}
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 900, color: "#1a1a1a", marginBottom: 6 }}>Pertanyaan yang Paling Sering Diajukan</h3>
      <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>Berikut adalah pertanyaan yang paling sering diajukan yang dapat Anda periksa sebelum memulai.</p>
      {FAQS.map((q,i) => <Accordion key={i} q={q} a={ANSWERS[i]} />)}
      {/* Not found */}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 22, fontWeight: 900, color: "#1a1a1a", marginBottom: 20 }}>Tidak Menemukan yang Anda Cari</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            { icon:"ri-phone-line", title:"Hubungi Kami", desc:"Geeks ada di sini buat bantu kamu. Kita bisa kasih dukungan yang kamu perluin. Hubungi kita aja, tim kita bakal balas secepatnya", btn:"Kontak Kami" },
            { icon:"ri-customer-service-2-line", title:"Support", desc:"Kabar baik, Anda tidak sendirian. Kami siap membantu. Hubungi kami untuk dukungan lebih mendalam", btn:"Ajukan Tiket" },
          ].map((c,i) => (
            <div key={i} style={{ border: "1.5px solid #e9e7e3", borderRadius: 14, padding: "24px 20px" }}>
              <i className={c.icon} style={{ fontSize: 24, color: "#555", display: "block", marginBottom: 10 }} />
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{c.title}</p>
              <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
              <button style={{ padding: "8px 20px", borderRadius: 8, border: "1.5px solid #e9e7e3", background: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins,sans-serif" }}>{c.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── NAV ITEMS ──
const NAV: { id: string; icon: string; label: string; section: string }[] = [
  { id:"edit-profil",   icon:"ri-pencil-line",          label:"Edit Profil",        section:"Akun Saya"  },
  { id:"jenis-member",  icon:"ri-shield-check-fill",    label:"Jenis Member",       section:"Akun Saya"  },
  { id:"data-privasi",  icon:"ri-shield-line",          label:"Data & Privasi",     section:"Akun Saya"  },
  { id:"voucher",       icon:"ri-coupon-line",          label:"Voucher Kamu",       section:"Akun Saya"  },
  { id:"favorit",       icon:"ri-heart-line",           label:"Favorit Kamu",       section:"Aktivitas"  },
  { id:"notifikasi",    icon:"ri-notification-3-line",  label:"Notifikasi",         section:"Aktivitas"  },
  { id:"histori",       icon:"ri-history-line",         label:"Histori Pesanan",    section:"Aktivitas"  },
  { id:"langganan",     icon:"ri-vip-crown-line",       label:"Langganan",          section:"Aktivitas"  },
  { id:"kontak",        icon:"ri-phone-line",           label:"Kontak Kami",        section:"Bantuan Pusat & Layanan" },
  { id:"kebijakan",     icon:"ri-file-text-line",       label:"Kebijakan",          section:"Bantuan Pusat & Layanan" },
  { id:"bantuan",       icon:"ri-question-line",        label:"Pusat Bantuan & SSD",section:"Bantuan Pusat & Layanan" },
];

// ── MAIN ──
export default function ProfilPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activePanel, setActivePanel] = useState("edit-profil");

  const displayName = user?.storeName || user?.name || user?.firstName || "Pengguna";
  const email = user?.email || "pengguna@gmail.com";
  const initials = displayName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();

  const sections = [...new Set(NAV.map(n => n.section))];

  const renderPanel = () => {
    switch(activePanel) {
      case "edit-profil":  return <PanelEditProfil setPanel={setActivePanel} />;
      case "ubah-sandi":   return <PanelUbahSandi setPanel={setActivePanel} />;
      case "jenis-member": return <PanelJenisMember />;
      case "data-privasi": return <PanelDataPrivasi />;
      case "voucher":      return <PanelVoucher />;
      case "favorit":      return <PanelFavorit />;
      case "notifikasi":   return <PanelNotifikasi />;
      case "histori":      return <PanelHistori />;
      case "langganan":    return <PanelLangganan />;
      case "kontak":       return <PanelKontak />;
      case "kebijakan":    return <PanelKebijakan />;
      case "bantuan":      return <PanelBantuan />;
      default: return null;
    }
  };

  return (
    <div style={{ background: "#f5f4f0", minHeight: "100vh" }}>
      <BuyerHeader />
      <div style={{ display: "flex", maxWidth: 1280, margin: "0 auto", padding: "0 0 60px", minHeight: "calc(100vh - 100px)" }}>

        {/* ── Sidebar ── */}
        <aside style={{ width: 300, flexShrink: 0, background: "#ebebeb", padding: "28px 0", position: "sticky", top: 100, alignSelf: "flex-start", minHeight: "calc(100vh - 100px)" }}>
          {/* User info */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "0 24px 24px" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#BFA370", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", border: "2px solid white" }}>
              {user?.avatar
                ? <img src={user.avatar} alt={displayName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ color: "white", fontSize: 18, fontWeight: 700 }}>{initials}</span>}
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{displayName}</p>
              <p style={{ fontSize: 11, color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</p>
            </div>
          </div>

          {/* Nav */}
          {sections.map(section => (
            <div key={section} style={{ marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1a", padding: "0 24px", marginBottom: 6 }}>{section}</p>
              {NAV.filter(n => n.section === section).map(item => {
                const isActive = activePanel === item.id;
                return (
                  <button key={item.id} onClick={() => setActivePanel(item.id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 24px", background: isActive ? "#c8b89a" : "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 14, color: "#1a1a1a", fontFamily: "Poppins,sans-serif", borderRadius: isActive ? "6px" : "0", fontWeight: isActive ? 600 : 400, transition: "all 0.15s" }}
                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.05)"; }}
                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "none"; }}>
                    <i className={item.icon} style={{ fontSize: 18, color: "#555", flexShrink: 0 }} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Logout */}
          <div style={{ padding: "0 16px", marginTop: 8 }}>
            <button onClick={() => { logout(); router.push("/"); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#dc2626", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700, color: "white", fontFamily: "Poppins,sans-serif" }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#b91c1c")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "#dc2626")}>
              <i className="ri-logout-box-line" style={{ fontSize: 18 }} />
              Keluar
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, padding: "36px 48px", overflowY: "auto", background: "white" }}>
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}
