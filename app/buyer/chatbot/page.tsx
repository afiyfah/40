"use client";
import BuyerHeader from "@/components/buyer/Header";
import { PRODUK_LIST, TOKO_LIST, formatRupiah } from "@/lib/dummyData";
import { useCartStore } from "@/lib/useCartStore";
import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface BotMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  waktu: string;
  products?: typeof PRODUK_LIST;
  stores?: typeof TOKO_LIST;
}

const QUICK_TAGS = ["terdekat", "rekomendasi", "rating", "viral", "murah", "terlaris", "promo", "baru"];

const getTime = () => {
  const d = new Date();
  return `${d.getHours().toString().padStart(2,"0")}.${d.getMinutes().toString().padStart(2,"0")}`;
};

// Simple keyword-based AI logic
function getBotReply(msg: string): { text: string; products?: typeof PRODUK_LIST; stores?: typeof TOKO_LIST } {
  const lower = msg.toLowerCase();

  if (lower.includes("terdekat") || lower.includes("dekat")) {
    const sorted = [...PRODUK_LIST].sort(() => 0.5 - Math.random()).slice(0, 3);
    return { text: "Ini menu dari toko-toko terdekat dari lokasimu saat ini 📍", products: sorted };
  }
  if (lower.includes("rekomen") || lower.includes("saran") || lower.includes("seger") || lower.includes("suggest")) {
    const reko = PRODUK_LIST.filter(p => p.type === "rekomendasi").slice(0, 3);
    return { text: "Tentu, coba kamu cek menu-menu seger ini :\naku merekomendasikan ini karena rating tinggi dan banyak disukai pelanggan! 🌟", products: reko };
  }
  if (lower.includes("murah") || lower.includes("hemat") || lower.includes("terjangkau")) {
    const murah = [...PRODUK_LIST].sort((a, b) => a.harga - b.harga).slice(0, 3);
    return { text: "Ini pilihan menu paling terjangkau buat kamu 💰", products: murah };
  }
  if (lower.includes("terlaris") || lower.includes("viral") || lower.includes("populer")) {
    const laris = PRODUK_LIST.filter(p => p.type === "terlaris").slice(0, 3);
    return { text: "Ini menu-menu yang lagi viral dan paling banyak dipesan! 🔥", products: laris };
  }
  if (lower.includes("rating") || lower.includes("terbaik") || lower.includes("best")) {
    const top = [...PRODUK_LIST].sort((a, b) => b.rating - a.rating).slice(0, 3);
    return { text: "Menu dengan rating tertinggi yang bisa kamu coba ⭐", products: top };
  }
  if (lower.includes("baru") || lower.includes("new") || lower.includes("terbaru")) {
    const baru = PRODUK_LIST.filter(p => p.badge === "new").slice(0, 3);
    return { text: "Menu-menu baru yang baru saja hadir! ✨", products: baru };
  }
  if (lower.includes("toko") || lower.includes("warung") || lower.includes("restoran")) {
    const stores = TOKO_LIST.slice(0, 3);
    return { text: "Ini beberapa toko pilihan yang bisa kamu kunjungi 🏪", stores };
  }
  if (lower.includes("promo") || lower.includes("diskon") || lower.includes("flash")) {
    return { text: "Ada Flash Sale keren sekarang! Klik di bawah untuk lihat semua promo 👉\n\n🔗 /buyer/flashsale" };
  }
  if (lower.includes("ayam") || lower.includes("chicken")) {
    const ayam = PRODUK_LIST.filter(p => p.nama.toLowerCase().includes("ayam")).slice(0, 3);
    return { text: "Nemu beberapa menu ayam yang enak buat kamu 🍗", products: ayam.length ? ayam : PRODUK_LIST.slice(0, 2) };
  }
  if (lower.includes("minuman") || lower.includes("minum") || lower.includes("drink") || lower.includes("es")) {
    const drinks = PRODUK_LIST.filter(p => p.kategori === "minuman").slice(0, 3);
    return { text: "Ini pilihan minuman segar buat kamu 🥤", products: drinks };
  }
  if (lower.includes("halo") || lower.includes("hai") || lower.includes("hi") || lower.includes("hello")) {
    return { text: "Halo juga! Aku asisten AI Market Kita 🤖\n\nAku bisa bantu kamu:\n• Rekomendasi menu\n• Cari toko terdekat\n• Info promo & flash sale\n• Menu termurah atau terlaris\n\nMau cari apa hari ini? 😊" };
  }
  if (lower.includes("terima kasih") || lower.includes("makasih") || lower.includes("thanks")) {
    return { text: "Sama-sama! Semoga makannya enak ya 😋 Jangan ragu untuk tanya lagi kalau butuh rekomendasi lain!" };
  }

  // Default fallback
  const random = PRODUK_LIST.sort(() => 0.5 - Math.random()).slice(0, 2);
  return {
    text: "Hmm, aku belum ngerti maksudnya 🤔 Tapi ini ada beberapa menu yang mungkin kamu suka! Coba tanya dengan kata kunci seperti: rekomendasi, terdekat, murah, terlaris, atau nama makanan spesifik ya!",
    products: random,
  };
}

const INITIAL_MESSAGES: BotMessage[] = [
  {
    id: "init",
    sender: "bot",
    text: "Halo! Aku asisten AI Market Kita 🤖\n\nAku bisa bantu kamu cari menu rekomendasi, toko terdekat, promo terkini, atau menu terlaris. Mau makan apa hari ini?",
    waktu: "12.24",
    products: PRODUK_LIST.filter(p => p.badge === "best-seller").slice(0, 2),
  },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<BotMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem, setToast } = useCartStore();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback((text?: string) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    const userMsg: BotMessage = { id: "u" + Date.now(), sender: "user", text: msg, waktu: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const { text: replyText, products, stores } = getBotReply(msg);
      const botMsg: BotMessage = {
        id: "b" + Date.now(), sender: "bot",
        text: replyText, waktu: getTime(),
        products, stores,
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  }, [input, isTyping]);

  return (
    <div style={{ background: "#F5F4F0", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <BuyerHeader />

      {/* Title bar */}
      <div style={{ background: "white", padding: "20px 32px 16px", borderBottom: "1px solid #f1f0ee", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#1a1a1a" }}>ChatBot</h1>
        <div style={{ width: 64, height: 64, background: "linear-gradient(135deg,#E9D09D,#D7BE74)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(191,163,112,0.4)" }}>
          <i className="ri-robot-2-fill" style={{ color: "#78450E", fontSize: 32 }} />
        </div>
      </div>

      {/* Messages area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: 6 }} className="no-scrollbar">
        {/* Date */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <span style={{ background: "#e5e7eb", color: "#6b7280", fontSize: 12, fontWeight: 600, padding: "4px 16px", borderRadius: 999 }}>Kemarin</span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div key={msg.id} style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: 12 }}>
              {!isUser && (
                <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#E9D09D,#D7BE74)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 10, marginTop: 2, boxShadow: "0 2px 8px rgba(191,163,112,0.3)" }}>
                  <i className="ri-robot-2-fill" style={{ color: "#78450E", fontSize: 18 }} />
                </div>
              )}

              <div style={{ maxWidth: isUser ? "62%" : "72%", display: "flex", flexDirection: "column", alignItems: isUser ? "flex-end" : "flex-start" }}>
                <div style={{
                  padding: "14px 18px",
                  background: isUser ? "#d1cbc2" : "#d9d4cc",
                  borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                  {/* Text */}
                  {msg.text.split("\n").map((line, i) => (
                    <p key={i} style={{ fontSize: 14, color: "#1a1a1a", fontWeight: isUser ? 500 : 700, lineHeight: 1.6, marginBottom: line === "" ? 6 : 0 }}>
                      {line.startsWith("🔗 ") ? (
                        <Link href={line.replace("🔗 ", "")} style={{ color: "#BFA370", textDecoration: "underline" }}>{line.replace("🔗 ", "Lihat Flash Sale →")}</Link>
                      ) : line}
                    </p>
                  ))}

                  {/* Product Cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                      {msg.products.map(p => (
                        <Link key={p.id} href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                          <div style={{ background: "white", borderRadius: 12, display: "flex", gap: 12, padding: "10px 12px", cursor: "pointer", transition: "all 0.2s", border: "1px solid #f1f0ee" }}
                            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)")}
                            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                          >
                            <div style={{ width: 64, height: 64, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                              <img src={p.img} alt={p.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontWeight: 800, fontSize: 14, color: "#1a1a1a", marginBottom: 2 }}>{p.nama}</p>
                              <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>🏪 {p.toko}</div>
                              <p style={{ color: "#16a34a", fontWeight: 800, fontSize: 15 }}>{formatRupiah(p.harga)}</p>
                              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{p.terjual} terjual | {p.jarak} | {p.waktu}</div>
                            </div>
                            <button
                              onClick={e => {
                                e.preventDefault(); e.stopPropagation();
                                addItem({ productId: p.id, nama: p.nama, harga: p.harga, img: p.img, toko: p.toko, tokoId: p.tokoId, varian: p.varian || "Original", qty: 1 });
                              }}
                              style={{ width: 32, height: 32, background: "linear-gradient(135deg,#BFA370,#8E754A)", border: "none", borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, alignSelf: "center" }}>
                              <i className="ri-add-line" style={{ color: "white", fontSize: 16 }} />
                            </button>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Store Cards */}
                  {msg.stores && msg.stores.length > 0 && (
                    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                      {msg.stores.map(s => (
                        <Link key={s.id} href={`/buyer/toko?id=${s.id}`} style={{ textDecoration: "none" }}>
                          <div style={{ background: "white", borderRadius: 12, display: "flex", gap: 12, padding: "10px 12px", cursor: "pointer", border: "1px solid #f1f0ee", transition: "all 0.2s" }}
                            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)")}
                            onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                          >
                            <div style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                              <img src={s.img} alt={s.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontWeight: 800, fontSize: 13, color: "#1a1a1a" }}>{s.nama}</p>
                              <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                                <i className="ri-star-fill" style={{ color: "#EAB308", fontSize: 11 }} />
                                <span style={{ fontSize: 11, fontWeight: 700, color: "#f97316" }}>{s.rating}</span>
                              </div>
                              <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>{s.terjual} terjual | {s.jarak} | {s.waktu}</div>
                            </div>
                            <i className="ri-arrow-right-s-line" style={{ color: "#BFA370", fontSize: 20, alignSelf: "center" }} />
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>{msg.waktu}</span>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#E9D09D,#D7BE74)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className="ri-robot-2-fill" style={{ color: "#78450E", fontSize: 18 }} />
            </div>
            <div style={{ padding: "14px 18px", background: "#d9d4cc", borderRadius: "4px 16px 16px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#8E754A", animation: `bounce ${1.2}s ${i * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Bottom section: quick tags + input */}
      <div style={{ background: "white", borderTop: "1px solid #f1f0ee", flexShrink: 0 }}>
        {/* Quick tag scroll */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "12px 24px 8px" }} className="no-scrollbar">
          {[...QUICK_TAGS, ...QUICK_TAGS].map((tag, i) => (
            <button key={i} onClick={() => sendMessage(tag)}
              style={{ flexShrink: 0, background: "#f1f0ee", border: "none", borderRadius: 999, padding: "7px 18px", fontSize: 13, fontWeight: 600, color: "#555", cursor: "pointer", transition: "all 0.2s", fontFamily: "Poppins,sans-serif" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#BFA370"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#f1f0ee"; (e.currentTarget as HTMLButtonElement).style.color = "#555"; }}
            >{tag}</button>
          ))}
        </div>

        {/* Input row */}
        <div style={{ display: "flex", gap: 12, padding: "10px 24px 18px", alignItems: "center" }}>
          <input
            ref={inputRef}
            type="text" placeholder="Tulis pesan..." value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            style={{ flex: 1, padding: "13px 20px", border: "1.5px solid #e9e7e3", borderRadius: 999, fontSize: 14, outline: "none", fontFamily: "Poppins,sans-serif", transition: "border-color 0.2s" }}
            onFocus={e => (e.target.style.borderColor = "#BFA370")}
            onBlur={e => (e.target.style.borderColor = "#e9e7e3")}
          />
          <button onClick={() => sendMessage()} disabled={!input.trim() || isTyping}
            style={{ width: 48, height: 48, borderRadius: "50%", background: input.trim() && !isTyping ? "linear-gradient(135deg,#BFA370,#8E754A)" : "#e5e7eb", border: "none", cursor: input.trim() && !isTyping ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s", boxShadow: input.trim() ? "0 4px 16px rgba(191,163,112,0.4)" : "none" }}>
            <i className="ri-send-plane-2-fill" style={{ fontSize: 20, color: input.trim() && !isTyping ? "white" : "#9ca3af" }} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-7px); }
        }
      `}</style>
    </div>
  );
}
