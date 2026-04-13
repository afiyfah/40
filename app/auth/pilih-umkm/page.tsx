"use client";
import { useRouter } from "next/navigation";

export default function PilihUMKMPage() {
  const router = useRouter();

  const cards = [
    {
      title: "UMKM Mikro",
      desc: "sederhana tanpa kasir dan reservasi.",
      gradient: "linear-gradient(160deg,#D6E9FC 0%,#3683DF 100%)",
      accent: "#3683DF",
      solidBtn: "#1E3A6E",
      borderColor: "#e0ecfa",
      href: "/auth/register/umkm/mikro",
      svg: (
        <svg viewBox="0 0 200 200" width="185" height="185" style={{ position: "relative", zIndex: 1 }}>
          <rect x="30" y="100" width="140" height="70" rx="8" fill="#fff" opacity="0.25"/>
          <rect x="50" y="115" width="100" height="50" rx="6" fill="#2D7DD2" opacity="0.5"/>
          <circle cx="100" cy="105" r="18" fill="#fff" opacity="0.85"/>
          <circle cx="100" cy="95" r="8" fill="#3683DF" opacity="0.8"/>
          <path d="M82 113 Q100 120 118 113" fill="#3683DF" opacity="0.5"/>
          <ellipse cx="60" cy="100" rx="18" ry="14" fill="#1E56A0" opacity="0.6"/>
          <ellipse cx="140" cy="100" rx="18" ry="14" fill="#1E56A0" opacity="0.6"/>
          <rect x="35" y="85" width="130" height="20" rx="6" fill="#fff" opacity="0.5"/>
        </svg>
      ),
    },
    {
      title: "UMKM Berkembang",
      desc: "Untuk usaha yang membutuhkan sistem kasir dan manajemen reservasi.",
      gradient: "linear-gradient(160deg,#FFCF98 0%,#F4721E 100%)",
      accent: "#F4721E",
      solidBtn: "rgba(0,0,0,0.25)",
      borderColor: "#fde8d4",
      href: "/auth/register/umkm/berkembang",
      svg: (
        <svg viewBox="0 0 200 200" width="185" height="185" style={{ position: "relative", zIndex: 1 }}>
          <rect x="25" y="80" width="150" height="90" rx="8" fill="#fff" opacity="0.2"/>
          <path d="M10 80 Q100 40 190 80 L190 92 Q100 52 10 92 Z" fill="#fff" opacity="0.45"/>
          <rect x="40" y="100" width="50" height="65" rx="4" fill="#fff" opacity="0.3"/>
          <rect x="110" y="115" width="55" height="50" rx="4" fill="#fff" opacity="0.3"/>
          <rect x="50" y="110" width="30" height="14" rx="3" fill="#F4721E" opacity="0.7"/>
          <circle cx="90" cy="88" r="10" fill="#fff" opacity="0.8"/>
          <circle cx="90" cy="82" r="5" fill="#F4721E" opacity="0.7"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", fontFamily: "'Poppins', sans-serif", backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(54,131,223,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(244,114,30,0.08) 0%, transparent 55%)" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", marginBottom: 6 }}>Pilih Jenis Usaha Anda</h1>
      <p style={{ fontSize: 13, color: "#888", fontStyle: "italic", marginBottom: 56 }}>silahkan pilih sebagai apa anda ingin bergabung</p>

      <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
        {cards.map(card => (
          <div key={card.title} style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.10)", overflow: "hidden", width: 280, display: "flex", flexDirection: "column", border: `2px solid ${card.borderColor}`, transition: "transform 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "none")}
          >
            <div style={{ height: 240, background: card.gradient, display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.18)", top: -20, left: -30 }} />
              <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.12)", bottom: 10, right: -10 }} />
              {card.svg}
            </div>
            <div style={{ padding: "20px 20px 24px", flexGrow: 1, background: card.title === "UMKM Berkembang" ? card.gradient : "#fff", margin: card.title === "UMKM Berkembang" ? "-1px" : 0, marginTop: 0 }}>
              <h2 style={{ fontSize: 17, fontWeight: 800, color: card.title === "UMKM Berkembang" ? "#fff" : card.accent, marginBottom: 8 }}>{card.title}</h2>
              <p style={{ fontSize: 11, color: card.title === "UMKM Berkembang" ? "rgba(255,255,255,0.85)" : "#777", marginBottom: 16 }}>{card.desc}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ flex: 1, padding: 8, borderRadius: 20, border: `1.5px solid ${card.title === "UMKM Berkembang" ? "#fff" : card.accent}`, color: card.title === "UMKM Berkembang" ? "#fff" : card.accent, background: "transparent", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}>
                  Selengkapnya &gt;
                </button>
                <button
                  onClick={() => router.push(card.href)}
                  style={{ flex: 1, padding: 8, borderRadius: 20, border: "none", background: card.solidBtn, color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "'Poppins', sans-serif" }}
                >
                  Daftar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => router.push("/auth/pilih-peran")} style={{ marginTop: 40, fontSize: 12, color: "#aaa", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}>
        ← Kembali ke Pilih Peran
      </button>
    </div>
  );
}
