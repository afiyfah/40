"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store/useCartStoreSeller";

const navItems = [
  { href: "/seller/home", label: "Home", icon: "ri-home-5-line", page: "home" },
  { href: "/seller/dashboard", label: "Dashboard", icon: "ri-dashboard-line", page: "dashboard" },
  { href: "/seller/menu", label: "Menu", icon: "ri-restaurant-line", page: "menu" },
  { href: "/seller/pesanan", label: "Pesanan", icon: "ri-file-list-3-line", page: "pesanan" },
  { href: "/seller/penawaran", label: "Penawaran", icon: "ri-price-tag-3-line", page: "penawaran" },
  { href: "/seller/profil", label: "Profile", icon: "ri-user-line", page: "profil" },
];

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const profile = useAppStore((s) => s.profile);

  // Full-height layout: header fixed, below it sidebar + main both fill remaining height
  // sidebar sticky to viewport via position:sticky on the aside inside a flex container
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#F6F4F0", overflow: "hidden" }}>
      {/* ── Header ── */}
      <SellerHeader onToggleSidebar={() => setCollapsed((c) => !c)} profile={profile} />

      {/* ── Body row (sidebar + main) ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar: fixed height, never scrolls with main */}
        <aside
          className={`seller-sidebar${collapsed ? " collapsed" : ""}`}
          style={{
            /* Override globals.css position:sticky → use static in this layout */
            position: "relative",
            top: "unset",
            height: "90%",
            flexShrink: 0,
            overflowY: "auto",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`s-nav-item${pathname.includes(item.page) ? " active" : ""}`}
              >
                <i className={`${item.icon}`} style={{ fontSize: 18, flexShrink: 0 }} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: "auto", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.2)" }}>
            <button
              onClick={() => { if (confirm("Keluar dari akun?")) router.push("/"); }}
              className="s-nav-item"
              style={{ color: "rgba(255,255,255,0.75)", width: "100%", textAlign: "left" }}
            >
              <i className="ri-logout-box-line" style={{ fontSize: 18, flexShrink: 0 }} />
              {!collapsed && <span>Keluar</span>}
            </button>
          </div>
        </aside>

        {/* Main: scrollable independently */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function SellerHeader({
  onToggleSidebar,
  profile,
}: {
  onToggleSidebar: () => void;
  profile: { namaToko: string; avatar: string | null; email: string };
}) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const displayName = profile.namaToko || "Penjual";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header
      className="bg-emas-main"
      style={{
        display: "flex", alignItems: "center", height: 70,
        justifyContent: "space-between", padding: "0 20px",
        flexShrink: 0, zIndex: 40,
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onToggleSidebar}
          style={{ color: "white", fontSize: 20, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, border: "none", background: "none", cursor: "pointer" }}
        >
          <i className="ri-menu-line" />
        </button>
        <Link href="/seller/home" style={{ textDecoration: "none" }}>
          <span style={{ color: "white", fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" }}>
            Nyam<span style={{ fontWeight: 300 }}>Now</span>
          </span>
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Notif */}
        <button
          onClick={() => router.push("/seller/notifikasi")}
          style={{ position: "relative", color: "white", fontSize: 20, background: "none", border: "none", cursor: "pointer" }}
        >
          <i className="ri-notification-3-line" />
          <span style={{ position: "absolute", top: -4, right: -4, background: "#EF4444", color: "white", fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
        </button>

        {/* Chat */}
        <button
          onClick={() => router.push("/seller/chat")}
          style={{ position: "relative", color: "white", fontSize: 20, background: "none", border: "none", cursor: "pointer" }}
        >
          <i className="ri-chat-3-line" />
          <span style={{ position: "absolute", top: -4, right: -4, background: "#EF4444", color: "white", fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>2</span>
        </button>

        {/* Avatar dropdown */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu((v) => !v)}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "4px 8px", borderRadius: 10 }}
          >
            <div
              style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.5)", overflow: "hidden", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              {profile.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.avatar} alt={displayName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ color: "white", fontSize: 13, fontWeight: 700 }}>{initials}</span>
              )}
            </div>
            <span style={{ color: "white", fontSize: 14, fontWeight: 500, maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {displayName}
            </span>
            <i className="ri-arrow-down-s-line" style={{ color: "rgba(255,255,255,0.7)", fontSize: 15 }} />
          </button>

          {showMenu && (
            <>
              {/* backdrop */}
              <div onClick={() => setShowMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
              <div
                style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "white", borderRadius: 12, boxShadow: "0 10px 32px rgba(0,0,0,0.15)", overflow: "hidden", minWidth: 180, zIndex: 100 }}
              >
                <div style={{ padding: "12px 14px", borderBottom: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{displayName}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af" }}>{profile.email}</p>
                </div>
                {[
                  { icon: "ri-store-line", label: "Profil Toko", href: "/seller/profil" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} style={{ textDecoration: "none" }} onClick={() => setShowMenu(false)}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#f9fafb")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                    >
                      <i className={item.icon} style={{ fontSize: 15, color: "#BFA370" }} />
                      <span style={{ fontSize: 13, color: "#374151" }}>{item.label}</span>
                    </div>
                  </Link>
                ))}
                <div style={{ borderTop: "1px solid #f3f4f6" }}>
                  <button
                    onClick={() => { router.push("/"); setShowMenu(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "none", border: "none", cursor: "pointer" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#fef2f2")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <i className="ri-logout-box-line" style={{ fontSize: 15, color: "#EF4444" }} />
                    <span style={{ fontSize: 13, color: "#EF4444" }}>Keluar</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}