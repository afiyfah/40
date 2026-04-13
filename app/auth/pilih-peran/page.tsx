"use client";
import { useRouter } from "next/navigation";

export default function PilihPeranPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", fontFamily: "'Poppins', sans-serif", backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(54,131,223,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(244,114,30,0.08) 0%, transparent 55%)" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1a1a1a", marginBottom: 6 }}>Pilih Peran Anda</h1>
      <p style={{ fontSize: 13, color: "#888", fontStyle: "italic", marginBottom: 56 }}>silahkan pilih sebagai apa anda ingin bergabung</p>

      <div style={{ display: "flex", gap: 40, justifyContent: "center", flexWrap: "wrap" }}>
        {/* Pembeli */}
        <div
          onClick={() => router.push("/auth/login?role=pembeli")}
          style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.10)", overflow: "hidden", width: 280, display: "flex", flexDirection: "column", cursor: "pointer", border: "2px solid #e0ecfa", transition: "transform 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-6px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "none")}
        >
          <div style={{ height: 240, background: "linear-gradient(160deg,#D6E9FC 0%,#3683DF 100%)", display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.18)", top: -20, left: -30 }} />
            <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.12)", bottom: 10, right: -10 }} />
            <svg viewBox="0 0 200 200" width="190" height="190" style={{ position: "relative", zIndex: 1 }}>
              <circle cx="100" cy="80" r="28" fill="#fff" opacity="0.9"/>
              <circle cx="100" cy="67" r="13" fill="#4A90D9" opacity="0.8"/>
              <path d="M72 93 Q100 106 128 93" fill="#fff" opacity="0.7"/>
              <rect x="30" y="90" width="140" height="80" rx="10" fill="#fff" opacity="0.25"/>
              <rect x="50" y="105" width="100" height="50" rx="8" fill="#2D7DD2" opacity="0.5"/>
              <rect x="60" y="115" width="30" height="30" rx="4" fill="#F5A623" opacity="0.9"/>
              <rect x="100" y="120" width="40" height="22" rx="3" fill="#fff" opacity="0.3"/>
            </svg>
          </div>
          <div style={{ padding: "20px 20px 24px", flexGrow: 1 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "#3683DF", marginBottom: 12 }}>Datang & Belanja</h2>
            <div style={{ borderTop: "1px solid #eee", paddingTop: 12 }}>
              <p style={{ fontSize: 12, color: "#555", fontWeight: 500 }}>Daftar sebagai <span style={{ fontWeight: 800, textDecoration: "underline", color: "#3683DF" }}>Pembeli</span></p>
              <p style={{ fontSize: 10, color: "#aaa", fontStyle: "italic", marginTop: 4 }}>Cari dan beli produk favoritmu</p>
            </div>
          </div>
        </div>

        {/* Penjual */}
        <div
          onClick={() => router.push("/auth/login?role=penjual")}
          style={{ background: "#fff", borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.10)", overflow: "hidden", width: 280, display: "flex", flexDirection: "column", cursor: "pointer", border: "2px solid #fde8d4", transition: "transform 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-6px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "none")}
        >
          <div style={{ height: 240, background: "linear-gradient(160deg,#FFCF98 0%,#F4721E 100%)", display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.18)", top: -20, left: -30 }} />
            <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.12)", bottom: 10, right: -10 }} />
            <svg viewBox="0 0 200 200" width="190" height="190" style={{ position: "relative", zIndex: 1 }}>
              <rect x="30" y="60" width="140" height="100" rx="8" fill="#fff" opacity="0.2"/>
              <path d="M15 70 Q100 35 185 70 L185 80 Q100 45 15 80 Z" fill="#fff" opacity="0.5"/>
              <circle cx="100" cy="105" r="22" fill="#fff" opacity="0.9"/>
              <circle cx="100" cy="93" r="10" fill="#F4721E" opacity="0.8"/>
              <path d="M80 113 Q100 122 120 113" fill="#F4721E" opacity="0.5"/>
              <rect x="60" y="130" width="20" height="28" rx="3" fill="#fff" opacity="0.3"/>
              <rect x="90" y="125" width="20" height="33" rx="3" fill="#fff" opacity="0.3"/>
              <rect x="120" y="130" width="20" height="28" rx="3" fill="#fff" opacity="0.3"/>
            </svg>
          </div>
          <div style={{ padding: "20px 20px 0", flexGrow: 1, background: "linear-gradient(160deg,#FFCF98,#F4721E)", margin: "-1px", marginTop: 0 }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 12 }}>Buka Booth & Jualan</h2>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.3)", paddingTop: 12, paddingBottom: 20 }}>
              <p style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>Daftar sebagai <span style={{ fontWeight: 800, textDecoration: "underline" }}>Penjual</span></p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.8)", fontStyle: "italic", marginTop: 4 }}>Cari dan beli produk favoritmu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
