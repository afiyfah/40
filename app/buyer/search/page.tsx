"use client";
import BuyerHeader from "@/components/buyer/Header";
import ProductCard from "@/components/shared/productCard";
import TokoCard from "@/components/shared/TokoCard";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUK_LIST, TOKO_LIST } from "@/lib/dummyData";
import Link from "next/link";

type ViewMode = "semua" | "toko" | "menu";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const q = searchParams.get("q") || "";
  const [viewMode, setViewMode] = useState<ViewMode>("semua");
  const [showAllToko, setShowAllToko] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);

  const filteredToko = TOKO_LIST.filter(t =>
    !q || t.nama.toLowerCase().includes(q.toLowerCase()) || t.alamat.toLowerCase().includes(q.toLowerCase())
  );
  const filteredMenu = PRODUK_LIST.filter(p =>
    !q || p.nama.toLowerCase().includes(q.toLowerCase()) || p.toko.toLowerCase().includes(q.toLowerCase())
  );

  const displayToko = showAllToko ? filteredToko : filteredToko.slice(0, 4);
  const displayMenu = showAllMenu ? filteredMenu : filteredMenu.slice(0, 8);

  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 32px 60px" }}>
      {/* Result info */}
      {q && (
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 15, color: "#9ca3af" }}>
            Hasil pencarian untuk: <strong style={{ color: "#1a1a1a" }}>&ldquo;{q}&rdquo;</strong>
            <span style={{ marginLeft: 12, color: "#BFA370", fontSize: 13 }}>
              ({filteredToko.length} toko, {filteredMenu.length} menu ditemukan)
            </span>
          </p>
        </div>
      )}

      {/* View mode tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, borderBottom: "2px solid #e9e7e3", paddingBottom: 0 }}>
        {[["semua","Semua"],["toko","Toko"],["menu","Menu"]].map(([id, label]) => (
          <button key={id} onClick={() => setViewMode(id as ViewMode)}
            style={{
              padding: "10px 24px", fontSize: 14,
              fontWeight: viewMode === id ? 700 : 400,
              color: viewMode === id ? "#1a1a1a" : "#9ca3af",
              background: "none", border: "none", cursor: "pointer",
              borderBottom: viewMode === id ? "2.5px solid #BFA370" : "2.5px solid transparent",
              marginBottom: -2, transition: "all 0.2s", fontFamily: "Poppins, sans-serif",
            }}>{label}
            {id === "toko" && <span style={{ marginLeft: 6, background: "#f3f4f6", color: "#6b7280", fontSize: 11, borderRadius: 999, padding: "1px 7px" }}>{filteredToko.length}</span>}
            {id === "menu" && <span style={{ marginLeft: 6, background: "#f3f4f6", color: "#6b7280", fontSize: 11, borderRadius: 999, padding: "1px 7px" }}>{filteredMenu.length}</span>}
          </button>
        ))}
      </div>

      {/* Toko Section */}
      {(viewMode === "semua" || viewMode === "toko") && (
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#BFA370" }}>Toko</h2>
            {filteredToko.length > 4 && !showAllToko && viewMode === "semua" && (
              <button onClick={() => setShowAllToko(true)}
                style={{ display: "flex", alignItems: "center", gap: 6, color: "#BFA370", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                Lihat Selengkapnya <i className="ri-arrow-right-s-line" style={{ fontSize: 16 }} />
              </button>
            )}
          </div>
          {filteredToko.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {displayToko.map(toko => <TokoCard key={toko.id} toko={toko} />)}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af", background: "white", borderRadius: 16 }}>
              <i className="ri-store-line" style={{ fontSize: 48, display: "block", marginBottom: 12 }} />
              <p>Tidak ada toko yang cocok</p>
            </div>
          )}
          {showAllToko && filteredToko.length > 4 && (
            <button onClick={() => setShowAllToko(false)}
              style={{ marginTop: 16, display: "block", marginLeft: "auto", marginRight: "auto", color: "#9ca3af", fontSize: 12, background: "none", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
              Sembunyikan ↑
            </button>
          )}
        </section>
      )}

      {/* Menu Section */}
      {(viewMode === "semua" || viewMode === "menu") && (
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#BFA370" }}>Menu</h2>
            {filteredMenu.length > 8 && !showAllMenu && viewMode === "semua" && (
              <button onClick={() => setShowAllMenu(true)}
                style={{ display: "flex", alignItems: "center", gap: 6, color: "#BFA370", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
                Lihat Selengkapnya <i className="ri-arrow-right-s-line" style={{ fontSize: 16 }} />
              </button>
            )}
          </div>
          {filteredMenu.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {displayMenu.map(p => <ProductCard key={p.id} product={p} showCartButton showFavoriteButton />)}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af", background: "white", borderRadius: 16 }}>
              <i className="ri-restaurant-line" style={{ fontSize: 48, display: "block", marginBottom: 12 }} />
              <p>Tidak ada menu yang cocok</p>
            </div>
          )}
          {showAllMenu && filteredMenu.length > 8 && (
            <button onClick={() => setShowAllMenu(false)}
              style={{ marginTop: 16, display: "block", marginLeft: "auto", marginRight: "auto", color: "#9ca3af", fontSize: 12, background: "none", border: "none", cursor: "pointer", fontFamily: "Poppins, sans-serif" }}>
              Sembunyikan ↑
            </button>
          )}
        </section>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh" }}>
      <BuyerHeader />
      <Suspense fallback={<div style={{ textAlign: "center", padding: 60, color: "#9ca3af" }}>Mencari...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
