"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function BuyerHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [jarakFilter, setJarakFilter] = useState<"terdekat" | "terjauh" | null>(null);
  const [showJarakDropdown, setShowJarakDropdown] = useState(false);
  const [showHargaDropdown, setShowHargaDropdown] = useState(false);
  const [hargaMin, setHargaMin] = useState("");
  const [hargaMax, setHargaMax] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false); setShowJarakDropdown(false); setShowHargaDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/buyer/search?q=${encodeURIComponent(searchQuery)}`);
      setShowFilter(false);
    }
  };

  const formatRupiahInput = (val: string) => {
    const num = val.replace(/\D/g, "");
    if (!num) return "";
    return "Rp. " + parseInt(num).toLocaleString("id-ID");
  };

  const jarakActive = jarakFilter !== null;
  const hargaActive = hargaMin !== "" || hargaMax !== "";

  // Nama tampilan dari auth context
  const displayName = user?.storeName || user?.name || user?.firstName || "Pengguna";
  const initials = displayName.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <header className="bg-emas-main w-full sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-10 h-[100px] flex items-center">

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", border: "3px solid #5D4037", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", backgroundColor: "white", flexShrink: 0 }}>
            <img src="/assets/images/logo.png" alt="logo" style={{ width: "107%", height: "107%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
        </Link>

        {/* Search */}
        <div ref={filterRef} style={{ width: 749, marginLeft: 70, position: "relative", flexShrink: 0 }}>
          <div style={{ width: "100%", height: 50, background: "white", borderRadius: showFilter ? "12px 12px 0 0" : 12, display: "flex", alignItems: "center", boxShadow: "inset 0 2px 6px rgba(0,0,0,0.08)", overflow: "hidden" }}>
            <i className="ri-search-line" style={{ fontSize: 16, color: "#9ca3af", marginLeft: 20, flexShrink: 0 }} />
            <input
              type="text" placeholder="Mau makan apa hari ini?" value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} onKeyPress={handleSearch} onFocus={() => setShowFilter(true)}
              style={{ flex: 1, height: "100%", border: "none", outline: "none", padding: "0 12px", fontSize: 12, background: "transparent", fontFamily: "Poppins, sans-serif", color: "#333" }}
            />
            <button onClick={() => { setShowFilter(f => !f); setShowJarakDropdown(false); setShowHargaDropdown(false); }}
              style={{ background: "none", border: "none", marginRight: 16, cursor: "pointer", display: "flex", flexDirection: "column", gap: 3.5, alignItems: "flex-end", padding: 4, flexShrink: 0 }}>
              <span style={{ display: "block", width: 14, height: 1.5, background: (jarakActive || hargaActive) ? "#BFA370" : "#aaa", borderRadius: 2 }} />
              <span style={{ display: "block", width: 10, height: 1.5, background: (jarakActive || hargaActive) ? "#BFA370" : "#aaa", borderRadius: 2 }} />
              <span style={{ display: "block", width: 14, height: 1.5, background: (jarakActive || hargaActive) ? "#BFA370" : "#aaa", borderRadius: 2 }} />
            </button>
          </div>

          {showFilter && (
            <div style={{ position: "absolute", top: 50, left: 0, width: "94.6%", background: "white", borderRadius: "0 0 14px 14px", boxShadow: "0 14px 14px -10px rgba(0,0,0,0.15)", borderTop: "1px solid #f3f4f6", padding: "14px 20px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative" }}>
                  <button onClick={() => { setShowJarakDropdown(d => !d); setShowHargaDropdown(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 13px", borderRadius: 6, fontSize: 12, border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "Poppins, sans-serif", background: "linear-gradient(90deg,#BFA370 39%,#8E754A 82%)", color: "white" }}>
                    {jarakFilter === "terjauh" ? "Terjauh" : "Terdekat"}
                    <i className="ri-arrow-down-s-fill" style={{ fontSize: 13 }} />
                  </button>
                  {showJarakDropdown && (
                    <div style={{ position: "absolute", top: "calc(100% + 5px)", left: 0, background: "white", border: "1px solid #ede9e0", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.10)", zIndex: 1000, overflow: "hidden", minWidth: 110 }}>
                      {["terdekat", "terjauh"].map(opt => (
                        <button key={opt} onClick={() => { setJarakFilter(opt as any); setShowJarakDropdown(false); }}
                          style={{ width: "100%", textAlign: "left", padding: "9px 16px", fontSize: 12, fontWeight: 700, color: "#78450E", background: jarakFilter === opt ? "#F3EDE3" : "white", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif", display: "flex", alignItems: "center", gap: 8 }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#F3EDE3")}
                          onMouseLeave={e => (e.currentTarget.style.background = jarakFilter === opt ? "#F3EDE3" : "white")}>
                          {jarakFilter === opt && <i className="ri-check-line" style={{ color: "#BFA370", fontSize: 12 }} />}
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ position: "relative" }}>
                  <button onClick={() => { setShowHargaDropdown(d => !d); setShowJarakDropdown(false); }}
                    style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 13px", borderRadius: 6, fontSize: 12, border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "Poppins, sans-serif", background: hargaActive ? "linear-gradient(90deg,#BFA370 39%,#8E754A 82%)" : "#e9dfc8", color: hargaActive ? "white" : "#78450E" }}>
                    Harga <i className="ri-arrow-down-s-fill" style={{ fontSize: 13 }} />
                  </button>
                  {showHargaDropdown && (
                    <div style={{ position: "absolute", top: "calc(100% + 5px)", left: 0, background: "white", border: "1px solid #ede9e0", borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.10)", zIndex: 1000, padding: "14px 16px", minWidth: 200 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "#888", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Batas Harga</p>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {[{ val: hargaMin, set: setHargaMin, ph: "MIN" }, { val: hargaMax, set: setHargaMax, ph: "MAX" }].map((f, i) => (
                          <input key={i} type="text" placeholder={f.ph} value={f.val} onChange={e => f.set(formatRupiahInput(e.target.value))}
                            style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 10px", fontSize: 12, outline: "none", textAlign: "center", fontFamily: "Poppins, sans-serif", color: "#333" }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {jarakActive && (
                  <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#F3EDE3", borderRadius: 20, padding: "3px 10px 3px 12px", fontSize: 11, color: "#78450E", fontWeight: 600 }}>
                    <i className="ri-map-pin-2-line" style={{ fontSize: 11 }} />
                    {jarakFilter === "terdekat" ? "Terdekat" : "Terjauh"}
                    <button onClick={() => setJarakFilter(null)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#78450E", fontSize: 14 }}>×</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right icons */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <Link href="/buyer/chatbot" style={{ textDecoration: "none" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(to bottom,#E9D09D,#D7BE74)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 4px 10px rgba(120,69,14,0.5)", cursor: "pointer", flexShrink: 0 }}>
              <i className="ri-robot-2-fill" style={{ color: "#78450E", fontSize: 22 }} />
            </div>
          </Link>
          <Link href="/buyer/explore" style={{ textDecoration: "none", marginLeft: 35 }}>
            <i className="ri-map-pin-2-fill" style={{ color: "white", fontSize: 20, cursor: "pointer", display: "block" }} />
          </Link>
          <Link href="/buyer/notifikasi" style={{ textDecoration: "none", marginLeft: 35 }}>
            <i className="ri-heart-3-line" style={{ color: "white", fontSize: 20, cursor: "pointer", display: "block" }} />
          </Link>
          <Link href="/buyer/keranjang" style={{ textDecoration: "none", marginLeft: 35, position: "relative", display: "block" }}>
            <i className="ri-shopping-cart-2-line" style={{ color: "white", fontSize: 20, cursor: "pointer", display: "block" }} />
            <span style={{ position: "absolute", top: -6, right: -8, background: "#F2D18D", color: "#78450E", fontSize: 9, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>5</span>
          </Link>

          {/* User section */}
          <div ref={userMenuRef} style={{ marginLeft: 70, position: "relative" }}>
            {user ? (
              // Sudah login — tampil nama + avatar
              <button onClick={() => setShowUserMenu(v => !v)}
                style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 12 }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.5)", overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {user.avatar
                    ? <img src={user.avatar} alt={displayName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ color: "white", fontSize: 15, fontWeight: 700 }}>{initials}</span>
                  }
                </div>
                <span style={{ color: "white", fontSize: 14, fontWeight: 500, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{displayName}</span>
                <i className="ri-arrow-down-s-line" style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }} />
              </button>
            ) : (
              // Belum login — klik ke pilih-peran
              <button onClick={() => router.push("/auth/pilih-peran")}
                style={{ display: "flex", alignItems: "center", gap: 12, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 12 }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                <div style={{ width: 45, height: 45, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <i className="ri-user-3-line" style={{ color: "white", fontSize: 22 }} />
                </div>
                <span style={{ color: "white", fontSize: 14, letterSpacing: 0.3, fontWeight: 500, whiteSpace: "nowrap" }}>Masuk</span>
              </button>
            )}

            {/* Dropdown menu saat login */}
            {showUserMenu && user && (
              <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, background: "white", borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.15)", overflow: "hidden", minWidth: 200, zIndex: 100 }}>
                <div style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{displayName}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
                </div>
                {[
                  { icon: "ri-user-line", label: "Profil Saya", href: "/buyer/profil" },
                  { icon: "ri-shopping-bag-line", label: "Pesanan Saya", href: "/buyer/pesanan" },
                  { icon: "ri-heart-3-line", label: "Favorit", href: "/buyer/favorit" },
                  { icon: "ri-settings-3-line", label: "Pengaturan", href: "/buyer/pengaturan" },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{ textDecoration: "none" }} onClick={() => setShowUserMenu(false)}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
                      onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                      <i className={item.icon} style={{ fontSize: 16, color: "#78450E" }} />
                      <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{item.label}</span>
                    </div>
                  </Link>
                ))}
                <div style={{ borderTop: "1px solid #f3f4f6" }}>
                  <button onClick={() => { logout(); router.push("/auth/pilih-peran"); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "none", border: "none", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")}
                    onMouseLeave={e => (e.currentTarget.style.background = "none")}>
                    <i className="ri-logout-box-line" style={{ fontSize: 16, color: "#EF4444" }} />
                    <span style={{ fontSize: 13, color: "#EF4444", fontWeight: 500 }}>Keluar</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
