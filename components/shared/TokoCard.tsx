"use client";
import { Toko } from "@/lib/dummyData";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

interface TokoCardProps { toko: Toko; }

export default function TokoCard({ toko }: TokoCardProps) {
  const { toggleFavorite, isFavorite } = useCartStore();
  const fav = isFavorite(-toko.id); // negative id for stores

  return (
    <Link href={`/buyer/toko?id=${toko.id}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "white", borderRadius: 20, overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
        border: "1px solid #f1f0ee",
        cursor: "pointer", transition: "all 0.25s",
      }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.14)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "none"; el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"; }}
      >
        <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
          <img src={toko.img} alt={toko.nama}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
            onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.06)")}
            onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
          />
        </div>
        <div style={{ padding: "14px 16px 16px" }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1a1a1a", marginBottom: 2 }}>{toko.nama}</h3>
          <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>{toko.alamat}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`ri-star-${i < Math.floor(toko.rating) ? "fill" : "line"}`}
                style={{ fontSize: 13, color: i < Math.floor(toko.rating) ? "#EAB308" : "#d1d5db" }} />
            ))}
            <span style={{
              background: "#22C55E", color: "white", fontSize: 10, fontWeight: 700,
              padding: "1px 7px", borderRadius: 999, marginLeft: 4,
            }}>{toko.rating}</span>
          </div>
          <div style={{ borderTop: "1px solid #f1f0ee", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 10, color: "#9ca3af" }}>
              <span>{toko.terjual} terjual</span>
              <span style={{ margin: "0 6px" }}>|</span>
              <span>{toko.jarak}</span>
              <span style={{ margin: "0 6px" }}>|</span>
              <span>{toko.waktu}</span>
            </div>
          </div>
          <button onClick={e => { e.preventDefault(); toggleFavorite(-toko.id); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 0 0", display: "flex", alignItems: "center", gap: 5 }}>
            <i className={fav ? "ri-heart-3-fill" : "ri-heart-3-line"}
              style={{ fontSize: 14, color: fav ? "#ef4444" : "#d1d5db" }} />
            <span style={{ fontSize: 10, color: "#9ca3af" }}>Disukai oleh {toko.suka + (fav ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </Link>
  );
}