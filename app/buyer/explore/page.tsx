"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useState, useRef, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatRupiah } from "@/lib/dummyData";
import Link from "next/link";

// ── Dummy toko data with lat/lng offsets ──────────────────────────────────────
const TOKO_DATA = [
  {
    id: 1, nama: "Sop Ayam Pak Min", buka: true, rating: 5, ulasan: 203,
    jarak: 240, alamat: "Jl. Limau Tenggara no.45",
    deskripsi: "Sop ayam segar khas Solo dengan kuah bening gurih, cocok untuk sarapan maupun makan siang.",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80",
    x: 38, y: 42,   // % position on map
    menu: [
      { kat: "Menu Populer", items: [
        { id: 101, nama: "Nasgor Goreng", harga: 17000, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&q=80", terjual: "10RB+", suka: 741 },
        { id: 102, nama: "Ayam Goreng", harga: 27000, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=80", terjual: "10RB+", suka: 741 },
        { id: 103, nama: "Mie Goreng", harga: 17000, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=80", terjual: "8RB+", suka: 520 },
        { id: 104, nama: "Sop Ayam", harga: 22000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "15RB+", suka: 890 },
      ]},
      { kat: "Menu Makanan", items: [
        { id: 105, nama: "Nasgor Goreng", harga: 17000, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&q=80", terjual: "10RB+", suka: 741 },
        { id: 106, nama: "Ayam Goreng", harga: 27000, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=80", terjual: "10RB+", suka: 741 },
        { id: 107, nama: "Mie Goreng", harga: 17000, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=80", terjual: "8RB+", suka: 520 },
        { id: 108, nama: "Rawon", harga: 30000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "5RB+", suka: 310 },
      ]},
      { kat: "Menu Minuman", items: [
        { id: 109, nama: "Es Teh", harga: 5000, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80", terjual: "20RB+", suka: 900 },
        { id: 110, nama: "Es Buah", harga: 10000, img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&q=80", terjual: "7RB+", suka: 430 },
        { id: 111, nama: "Es Teler", harga: 10000, img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&q=80", terjual: "5RB+", suka: 280 },
        { id: 112, nama: "Jus Jeruk", harga: 8000, img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200&q=80", terjual: "9RB+", suka: 560 },
      ]},
    ],
  },
  {
    id: 2, nama: "Ayam Goreng 39", buka: true, rating: 5, ulasan: 341,
    jarak: 320, alamat: "Jl. Merdeka no.39",
    deskripsi: "Ayam goreng renyah dengan bumbu rempah spesial turun-temurun, sudah berdiri sejak 1990.",
    img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80",
    x: 52, y: 58,
    menu: [
      { kat: "Menu Populer", items: [
        { id: 201, nama: "Ayam Paha Atas", harga: 17000, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=80", terjual: "25RB+", suka: 1341 },
        { id: 202, nama: "Ayam Paha Bawah", harga: 15000, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=80", terjual: "18RB+", suka: 980 },
        { id: 203, nama: "Ayam Dada Crispy", harga: 19000, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=80", terjual: "12RB+", suka: 765 },
        { id: 204, nama: "Paket Hemat 1", harga: 30000, img: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&q=80", terjual: "15RB+", suka: 890 },
      ]},
      { kat: "Menu Makanan", items: [
        { id: 205, nama: "Nasi Putih", harga: 4000, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&q=80", terjual: "30RB+", suka: 600 },
        { id: 206, nama: "Nasi Goreng", harga: 22000, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&q=80", terjual: "8RB+", suka: 430 },
        { id: 207, nama: "Tempe Goreng", harga: 5000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "20RB+", suka: 320 },
        { id: 208, nama: "Tahu Goreng", harga: 5000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "18RB+", suka: 290 },
      ]},
      { kat: "Menu Minuman", items: [
        { id: 209, nama: "Es Teh Manis", harga: 5000, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80", terjual: "50RB+", suka: 2100 },
        { id: 210, nama: "Es Jeruk", harga: 7000, img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=200&q=80", terjual: "30RB+", suka: 1450 },
        { id: 211, nama: "Air Mineral", harga: 3000, img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&q=80", terjual: "40RB+", suka: 500 },
        { id: 212, nama: "Teh Hangat", harga: 4000, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80", terjual: "15RB+", suka: 340 },
      ]},
    ],
  },
  {
    id: 3, nama: "Dapur Mommy", buka: false, rating: 5, ulasan: 180,
    jarak: 890, alamat: "Jl. Kopral Sayom no.80",
    deskripsi: "Masakan rumahan lezat dengan cita rasa ibu, menu berganti setiap hari.",
    img: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80",
    x: 15, y: 70,
    menu: [
      { kat: "Menu Populer", items: [
        { id: 301, nama: "Nasi Campur", harga: 18000, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&q=80", terjual: "5RB+", suka: 340 },
        { id: 302, nama: "Sayur Asem", harga: 12000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "3RB+", suka: 210 },
        { id: 303, nama: "Ikan Goreng", harga: 25000, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80", terjual: "4RB+", suka: 280 },
        { id: 304, nama: "Sambal Terasi", harga: 5000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "8RB+", suka: 450 },
      ]},
      { kat: "Menu Minuman", items: [
        { id: 305, nama: "Es Teh", harga: 4000, img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&q=80", terjual: "10RB+", suka: 500 },
        { id: 306, nama: "Jus Alpukat", harga: 12000, img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&q=80", terjual: "3RB+", suka: 180 },
        { id: 307, nama: "Es Cendol", harga: 8000, img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&q=80", terjual: "4RB+", suka: 220 },
        { id: 308, nama: "Air Mineral", harga: 3000, img: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&q=80", terjual: "12RB+", suka: 300 },
      ]},
    ],
  },
  {
    id: 4, nama: "Gulay Wowok", buka: true, rating: 5, ulasan: 120,
    jarak: 1200, alamat: "Jl. Sudirman no.12",
    deskripsi: "Sayur dan lauk pauk segar pilihan setiap hari, cocok untuk keluarga.",
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=80",
    x: 82, y: 75,
    menu: [
      { kat: "Menu Populer", items: [
        { id: 401, nama: "Seblak Bandung", harga: 15000, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=80", terjual: "12RB+", suka: 780 },
        { id: 402, nama: "Bakso Kuah", harga: 17000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "9RB+", suka: 520 },
        { id: 403, nama: "Mie Goreng Jawa", harga: 15000, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=80", terjual: "11RB+", suka: 640 },
        { id: 404, nama: "Gudeg", harga: 18000, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80", terjual: "7RB+", suka: 390 },
      ]},
      { kat: "Menu Makanan", items: [
        { id: 405, nama: "Sayur Lodeh", harga: 10000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "6RB+", suka: 280 },
        { id: 406, nama: "Tempe Orek", harga: 8000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "8RB+", suka: 320 },
        { id: 407, nama: "Rendang", harga: 35000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "5RB+", suka: 410 },
        { id: 408, nama: "Soto Betawi", harga: 22000, img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&q=80", terjual: "4RB+", suka: 230 },
      ]},
    ],
  },
];

const NEARBY_RADIUS = 600; // meters

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <i key={i} className={`ri-star-${i <= rating ? "fill" : "line"}`}
          style={{ color: "#EAB308", fontSize: 16 }} />
      ))}
      <span style={{
        background: "#22C55E", color: "white", fontSize: 11,
        fontWeight: 700, padding: "1px 7px", borderRadius: 999, marginLeft: 6,
      }}>{rating}</span>
    </div>
  );
}

export default function ExplorePage() {
  const { toggleFavorite, isFavorite } = useCartStore();
  const [selectedToko, setSelectedToko] = useState<typeof TOKO_DATA[0] | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // full menu drawer
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const startH = useRef(0);

  const isNearby = (jarak: number) => jarak <= NEARBY_RADIUS;

  const handlePinClick = (toko: typeof TOKO_DATA[0]) => {
    setSelectedToko(toko);
    setPopupVisible(true);
    setDrawerOpen(false);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setDrawerOpen(false);
    setTimeout(() => setSelectedToko(null), 300);
  };

  // Drag-to-expand sheet
  const onDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startY.current = clientY;
    startH.current = sheetRef.current?.offsetHeight || 0;
  };

  const onDrag = (e: React.TouchEvent | React.MouseEvent) => {
    if (!sheetRef.current) return;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const dy = startY.current - clientY;
    if (dy > 40 && !drawerOpen) setDrawerOpen(true);
    if (dy < -40 && drawerOpen) setDrawerOpen(false);
  };

  return (
    <div style={{ background: "#F5F4F0", minHeight: "100vh", overflow: "hidden" }}>
      <BuyerHeader />

      {/* ── MAP AREA ────────────────────────────────────────────── */}
      <div style={{ position: "relative", width: "100%", height: "calc(100vh - 100px)", overflow: "hidden" }}>

        {/* Map background (OpenStreetMap static-style tile simulation) */}
        <div style={{
          position: "absolute", inset: 0,
          background: "#e8e0d5",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(rgba(200,195,185,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,195,185,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px, 80px 80px, 20px 20px, 20px 20px",
        }}>
          {/* Road network overlay */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }} viewBox="0 0 1300 900" preserveAspectRatio="xMidYMid slice">
            {/* Main roads */}
            <line x1="0" y1="300" x2="1300" y2="300" stroke="#f5f0e8" strokeWidth="16" />
            <line x1="0" y1="550" x2="1300" y2="550" stroke="#f5f0e8" strokeWidth="16" />
            <line x1="0" y1="720" x2="1300" y2="720" stroke="#f5f0e8" strokeWidth="10" />
            <line x1="260" y1="0" x2="260" y2="900" stroke="#f5f0e8" strokeWidth="16" />
            <line x1="520" y1="0" x2="520" y2="900" stroke="#f5f0e8" strokeWidth="16" />
            <line x1="780" y1="0" x2="780" y2="900" stroke="#f5f0e8" strokeWidth="16" />
            <line x1="1040" y1="0" x2="1040" y2="900" stroke="#f5f0e8" strokeWidth="10" />
            {/* Secondary roads */}
            <line x1="0" y1="160" x2="1300" y2="160" stroke="#ede7dc" strokeWidth="7" />
            <line x1="0" y1="430" x2="1300" y2="430" stroke="#ede7dc" strokeWidth="7" />
            <line x1="0" y1="650" x2="1300" y2="650" stroke="#ede7dc" strokeWidth="7" />
            <line x1="130" y1="0" x2="130" y2="900" stroke="#ede7dc" strokeWidth="7" />
            <line x1="390" y1="0" x2="390" y2="900" stroke="#ede7dc" strokeWidth="7" />
            <line x1="650" y1="0" x2="650" y2="900" stroke="#ede7dc" strokeWidth="7" />
            <line x1="910" y1="0" x2="910" y2="900" stroke="#ede7dc" strokeWidth="7" />
            {/* Park/green area */}
            <rect x="560" y="360" width="160" height="120" rx="8" fill="#c8d8a8" opacity="0.6" />
            <rect x="900" y="160" width="100" height="80" rx="6" fill="#c8d8a8" opacity="0.5" />
            {/* Water */}
            <rect x="1150" y="0" width="150" height="400" rx="0" fill="#b8d4e8" opacity="0.7" />
            {/* Buildings */}
            {[
              [20, 20, 80, 60], [130, 20, 80, 60], [290, 20, 80, 60],
              [20, 200, 80, 60], [130, 200, 80, 60],
              [550, 20, 80, 60], [680, 20, 80, 60],
              [810, 20, 80, 60], [950, 20, 80, 60],
              [20, 450, 80, 60], [130, 450, 80, 60], [290, 450, 80, 60],
              [420, 450, 80, 60], [550, 470, 80, 60],
              [780, 450, 80, 60], [910, 450, 80, 60],
              [20, 650, 80, 50], [130, 650, 80, 50], [290, 650, 80, 50],
              [420, 650, 80, 50], [680, 650, 80, 50], [810, 650, 80, 50],
            ].map(([x, y, w, h], i) => (
              <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#ddd5c8" opacity="0.8" />
            ))}
          </svg>
        </div>

        {/* User location with pulse rings */}
        <div style={{ position: "absolute", left: "50%", top: "48%", transform: "translate(-50%,-50%)", zIndex: 10 }}>
          {/* Pulse rings */}
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              position: "absolute",
              borderRadius: "50%",
              border: "1.5px solid rgba(80,80,80,0.25)",
              animation: `pulse-ring ${1.5 + i * 0.4}s ease-out infinite`,
              animationDelay: `${i * 0.3}s`,
              top: "50%", left: "50%",
              width: `${i * 100}px`, height: `${i * 100}px`,
              transform: "translate(-50%, -50%)",
            }} />
          ))}
          {/* User icon */}
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "white", border: "2px solid #aaa",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            position: "relative", zIndex: 2,
          }}>
            <i className="ri-user-3-fill" style={{ fontSize: 22, color: "#555" }} />
          </div>
        </div>

        {/* Store pins */}
        {TOKO_DATA.map(toko => {
          const nearby = isNearby(toko.jarak);
          const isSelected = selectedToko?.id === toko.id;
          return (
            <button key={toko.id}
              onClick={() => handlePinClick(toko)}
              style={{
                position: "absolute",
                left: `${toko.x}%`,
                top: `${toko.y}%`,
                transform: "translate(-50%, -100%)",
                background: "none", border: "none", cursor: "pointer",
                zIndex: isSelected ? 20 : 15,
                transition: "transform 0.2s",
                filter: isSelected ? "drop-shadow(0 8px 16px rgba(0,0,0,0.3))" : "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translate(-50%, -100%) scale(1.2)")}
              onMouseLeave={e => (e.currentTarget.style.transform = isSelected ? "translate(-50%, -100%) scale(1.1)" : "translate(-50%, -100%) scale(1)")}
            >
              <svg width="36" height="48" viewBox="0 0 36 48">
                <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 30 18 30S36 31.5 36 18C36 8.06 27.94 0 18 0z"
                  fill={nearby ? "#ef4444" : "#9ca3af"}
                  stroke="white" strokeWidth="2.5"
                />
                <circle cx="18" cy="18" r="8" fill="white" opacity="0.9" />
              </svg>
            </button>
          );
        })}

        {/* ── BOTTOM SHEET POPUP ─────────────────────────────────── */}
        {popupVisible && selectedToko && (
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "white",
              borderRadius: "24px 24px 0 0",
              boxShadow: "0 -12px 48px rgba(0,0,0,0.18)",
              zIndex: 30,
              maxHeight: drawerOpen ? "80vh" : "auto",
              overflowY: drawerOpen ? "auto" : "hidden",
              transition: "max-height 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
            }}
            ref={sheetRef}
          >
            {/* Drag handle */}
            <div
              style={{ padding: "12px 0 4px", display: "flex", justifyContent: "center", cursor: "grab" }}
              onMouseDown={onDragStart}
              onMouseMove={onDrag}
              onTouchStart={onDragStart}
              onTouchMove={onDrag}
            >
              <div style={{ width: 48, height: 5, borderRadius: 999, background: "#d1d5db" }} />
            </div>

            {/* Close button */}
            <button onClick={closePopup}
              style={{
                position: "absolute", top: 16, right: 20,
                width: 32, height: 32, borderRadius: "50%",
                background: "#f3f4f6", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
              <i className="ri-close-line" style={{ fontSize: 18, color: "#555" }} />
            </button>

            {/* ── TOKO INFO SECTION ── */}
            <div style={{ padding: "8px 24px 20px" }}>
              {/* Status badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: selectedToko.buka ? "#22C55E" : "#9ca3af",
                  }} />
                  <span style={{
                    fontSize: 13, fontWeight: 700,
                    color: selectedToko.buka ? "#22C55E" : "#9ca3af",
                  }}>{selectedToko.buka ? "Buka" : "Tutup"}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                {/* Toko image */}
                <div style={{ width: 220, height: 160, borderRadius: 16, overflow: "hidden", flexShrink: 0 }}>
                  <img src={selectedToko.img} alt={selectedToko.nama}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <h2 style={{ fontSize: 28, fontWeight: 900, color: "#1a1a1a", letterSpacing: -0.5, lineHeight: 1.1, textTransform: "uppercase", marginBottom: 8 }}>
                      {selectedToko.nama}
                    </h2>
                    <StarRating rating={selectedToko.rating} />
                  </div>

                  <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: 16, maxWidth: 600 }}>
                    {selectedToko.deskripsi}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button style={{
                      flex: 1, maxWidth: 280,
                      padding: "12px 24px", borderRadius: 10, border: "none",
                      background: "linear-gradient(135deg,#BFA370,#8E754A)",
                      color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      fontFamily: "Poppins, sans-serif",
                    }}>
                      <i className="ri-navigation-fill" style={{ fontSize: 16 }} />
                      Menuju Lokasi
                    </button>

                    <div style={{ fontSize: 12, color: "#9ca3af", display: "flex", alignItems: "center", gap: 4 }}>
                      <i className="ri-map-pin-2-line" style={{ color: "#BFA370" }} />
                      {selectedToko.jarak < 1000
                        ? `${selectedToko.jarak}m`
                        : `${(selectedToko.jarak / 1000).toFixed(1)}km`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll hint */}
              {!drawerOpen && (
                <button
                  onClick={() => setDrawerOpen(true)}
                  style={{
                    width: "100%", marginTop: 16, background: "none", border: "none",
                    cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 0",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ height: 1, width: 60, background: "#e5e7eb" }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 2 }}>MENU</span>
                    <div style={{ height: 1, width: 60, background: "#e5e7eb" }} />
                  </div>
                  <i className="ri-arrow-up-s-line" style={{ color: "#9ca3af", fontSize: 20 }} />
                </button>
              )}
            </div>

            {/* ── MENU SECTION (visible when expanded) ── */}
            {drawerOpen && (
              <div style={{ borderTop: "1px solid #f1f0ee", paddingBottom: 40 }}>
                {/* MENU header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 24px 4px" }}>
                  <div style={{ height: 1, flex: 1, background: "#e5e7eb" }} />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <i className="ri-arrow-up-s-line" style={{ color: "#9ca3af", fontSize: 16, marginBottom: -4 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 2 }}>MENU</span>
                  </div>
                  <div style={{ height: 1, flex: 1, background: "#e5e7eb" }} />
                </div>

                {selectedToko.menu.map((section, si) => (
                  <div key={si} style={{ padding: "16px 24px 0" }}>
                    <h3 style={{ fontSize: 22, fontWeight: 900, color: "#1a1a1a", marginBottom: 16 }}>{section.kat}</h3>

                    {/* Horizontal scroll of 4 menu items */}
                    <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 8 }} className="no-scrollbar">
                      {section.items.map(item => {
                        const fav = isFavorite(item.id);
                        return (
                          <div key={item.id}
                            style={{
                              display: "flex", alignItems: "center", gap: 12,
                              padding: "12px 16px",
                              minWidth: 0, flex: "0 0 calc(25% - 8px)",
                              marginRight: 12,
                              background: "white",
                              borderBottom: "1px solid #f1f0ee",
                              cursor: "pointer",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#fafaf9")}
                            onMouseLeave={e => (e.currentTarget.style.background = "white")}
                          >
                            {/* Image */}
                            <div style={{ width: 88, height: 72, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: "#f5f0ea" }}>
                              <img src={item.img} alt={item.nama}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {item.nama}
                              </p>
                              <p style={{ fontWeight: 800, fontSize: 15, color: "#22C55E", marginBottom: 4 }}>
                                {formatRupiah(item.harga)}
                              </p>
                              <p style={{ fontSize: 10, color: "#9ca3af" }}>
                                {item.terjual} terjual &nbsp;|&nbsp; Disukai oleh {item.suka.toLocaleString("id-ID")}
                              </p>
                            </div>
                            {/* Love button */}
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                toggleFavorite(item.id);
                              }}
                              style={{ background: "none", border: "none", cursor: "pointer", padding: 6, flexShrink: 0 }}>
                              <i className={fav ? "ri-heart-3-fill" : "ri-heart-3-line"}
                                style={{ fontSize: 20, color: fav ? "#ef4444" : "#d1d5db", transition: "color 0.15s" }} />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {si < selectedToko.menu.length - 1 && (
                      <div style={{ height: 1, background: "#f1f0ee", margin: "16px 0 0" }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Backdrop to close popup */}
        {popupVisible && (
          <div
            onClick={closePopup}
            style={{
              position: "absolute", inset: 0,
              background: "transparent",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: translate(-50%, -50%) scale(0.4); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}