"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/seller/home", icon: "ri-home-5-line", label: "Home", page: "home" },
  { href: "/seller/dashboard", icon: "ri-dashboard-line", label: "Dashboard", page: "dashboard" },
  { href: "/seller/menu", icon: "ri-restaurant-line", label: "Menu", page: "menu" },
  { href: "/seller/pesanan", icon: "ri-file-list-3-line", label: "Pesanan", page: "pesanan" },
  { href: "/seller/penawaran", icon: "ri-price-tag-3-line", label: "Penawaran", page: "penawaran" },
  { href: "/seller/profil", icon: "ri-user-line", label: "Profile", page: "profil" },
];

export default function SellerSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="seller-sidebar"
      style={{ width: collapsed ? 56 : 200 }}
    >
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname.includes(item.page);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`s-nav-item ${isActive ? "active" : ""}`}
            >
              <i className={`${item.icon} text-[18px] flex-shrink-0`} />
              {!collapsed && <span className="s-nav-label">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/20">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="s-nav-item w-full text-left mb-2"
          style={{ color: "rgba(255,255,255,0.75)" }}
        >
          <i className={`${collapsed ? "ri-menu-unfold-line" : "ri-menu-fold-line"} text-[18px]`} />
          {!collapsed && <span>Collapse</span>}
        </button>
        <Link href="/" className="s-nav-item" style={{ color: "rgba(255,255,255,0.75)" }}>
          <i className="ri-logout-box-line text-[18px]" />
          {!collapsed && <span>Keluar</span>}
        </Link>
      </div>
    </aside>
  );
}
