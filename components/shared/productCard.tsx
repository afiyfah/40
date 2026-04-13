"use client";
import { Product, formatRupiah } from "@/lib/dummyData";
import { useCartStore } from "@/lib/useCartStore";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  showCartButton?: boolean;
  showFavoriteButton?: boolean;
  variant?: "grid" | "list" | "search";
}

export default function ProductCard({
  product,
  showCartButton = true,
  showFavoriteButton = true,
  variant = "grid",
}: ProductCardProps) {
  const { addItem, toggleFavorite, isFavorite, setToast } = useCartStore();
  const fav = isFavorite(product.id);

  const handleAddCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      nama: product.nama,
      harga: product.harga,
      img: product.img,
      toko: product.toko,
      tokoId: product.tokoId,
      varian: product.varian || "Original",
      qty: 1,
    });
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
    if (!fav) setToast(product.nama + " ditambahkan ke favorit!");
  };

  if (variant === "list") {
    return (
      <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <div style={{
          display: "flex", gap: 16, padding: 16,
          background: "white", borderRadius: 16,
          border: "1px solid #f1f0ee",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          cursor: "pointer", transition: "all 0.2s",
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
        >
          <div style={{ width: 112, height: 112, borderRadius: 12, overflow: "hidden", flexShrink: 0, position: "relative" }}>
            <img src={product.img} alt={product.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
            <div>
              <p style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15, marginBottom: 2 }}>{product.nama}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>
                <i className="ri-store-2-line" /> {product.toko}
              </div>
              <p style={{ color: "#16a34a", fontWeight: 700, fontSize: 18 }}>{formatRupiah(product.harga)}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 10, color: "#9ca3af", display: "flex", gap: 8 }}>
                <span>{product.terjual} terjual</span>
                <span>|</span>
                <span>{product.jarak}</span>
                <span>|</span>
                <span>{product.waktu}</span>
              </div>
              {showFavoriteButton && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <button onClick={handleFav} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                    <i className={`${fav ? "ri-heart-3-fill" : "ri-heart-3-line"}`}
                      style={{ fontSize: 22, color: fav ? "#ef4444" : "#d1d5db", transition: "all 0.2s" }} />
                  </button>
                  <span style={{ fontSize: 9, color: "#9ca3af" }}>{product.suka + (fav ? 1 : 0)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid variant (default)
  return (
    <Link href={`/product/${product.id}`} style={{ textDecoration: "none" }}>
      <div style={{
        background: "white", borderRadius: 20, overflow: "hidden",
        boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
        border: "1px solid #f1f0ee",
        cursor: "pointer", transition: "all 0.25s",
        position: "relative",
      }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.14)"; }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "none"; el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"; }}
      >
        {/* Badge */}
        {product.badge === "best-seller" && (
          <div style={{
            position: "absolute", top: -4, left: -4, zIndex: 10,
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <div style={{
              background: "linear-gradient(135deg,#EE8F36,#ff6b00)",
              color: "white", fontSize: 9, fontWeight: 800,
              padding: "5px 12px 5px 8px",
              clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
              display: "flex", alignItems: "center", gap: 4,
              borderRadius: "12px 0 0 0",
              boxShadow: "0 2px 8px rgba(238,143,54,0.5)",
            }}>
              ⭐ BEST SELLER
            </div>
          </div>
        )}
        {product.badge === "new" && (
          <div style={{
            position: "absolute", top: -4, left: -4, zIndex: 10,
            background: "linear-gradient(135deg,#22C55E,#16a34a)",
            color: "white", fontSize: 9, fontWeight: 800,
            padding: "5px 12px 5px 8px",
            clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
            display: "flex", alignItems: "center", gap: 4,
            borderRadius: "12px 0 0 0",
            boxShadow: "0 2px 8px rgba(34,197,94,0.5)",
          }}>
            ✨ NEW
          </div>
        )}

        {/* Image */}
        <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
          <img src={product.img} alt={product.nama}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
            onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = "scale(1.06)")}
            onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
          />
          {/* Favorite button overlay */}
          {showFavoriteButton && (
            <button onClick={handleFav}
              style={{
                position: "absolute", top: 10, right: 10,
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(4px)",
                border: "none", borderRadius: "50%",
                width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                transition: "transform 0.15s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1.15)")}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.transform = "scale(1)")}
            >
              <i className={fav ? "ri-heart-3-fill" : "ri-heart-3-line"}
                style={{ fontSize: 18, color: fav ? "#ef4444" : "#9ca3af" }} />
            </button>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px 16px" }}>
          <p style={{ fontWeight: 700, color: "#1a1a1a", fontSize: 15, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {product.nama}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
            <i className="ri-star-fill" style={{ color: "#EAB308", fontSize: 13 }} />
            <span style={{ color: "#f97316", fontWeight: 700, fontSize: 13 }}>{product.rating}</span>
            <span style={{ color: "#9ca3af", fontSize: 12 }}>({product.ulasan})</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ color: "#16a34a", fontWeight: 800, fontSize: 18 }}>{formatRupiah(product.harga)}</p>
              {product.hargaAsli && (
                <p style={{ color: "#9ca3af", fontSize: 11, textDecoration: "line-through" }}>{formatRupiah(product.hargaAsli)}</p>
              )}
            </div>
            {showCartButton && (
              <button onClick={handleAddCart}
                style={{
                  width: 36, height: 36,
                  background: "linear-gradient(135deg,#BFA370,#8E754A)",
                  color: "white", borderRadius: 10, border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(191,163,112,0.4)",
                  transition: "all 0.2s",
                  fontSize: 18,
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "scale(1.1)"; el.style.boxShadow = "0 6px 16px rgba(191,163,112,0.6)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLButtonElement; el.style.transform = "scale(1)"; el.style.boxShadow = "0 4px 12px rgba(191,163,112,0.4)"; }}
              >
                <i className="ri-add-line" />
              </button>
            )}
          </div>
          <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 8, display: "flex", gap: 8 }}>
            <span>{product.terjual} terjual</span>
            <span>|</span><span>{product.jarak}</span>
            <span>|</span><span>{product.waktu}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
            <button onClick={handleFav}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
              <i className={fav ? "ri-heart-3-fill" : "ri-heart-3-line"}
                style={{ fontSize: 14, color: fav ? "#ef4444" : "#d1d5db" }} />
              <span style={{ fontSize: 10, color: "#9ca3af" }}>Disukai oleh {product.suka + (fav ? 1 : 0)}</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}