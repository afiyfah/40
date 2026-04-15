"use client";
import { useEffect, useRef, useState } from "react";
import { useAppStore, ChatMessage } from "@/store/useCartStoreSeller";

export default function ChatPage() {
  const { contacts, activeContactId, setActiveContact, sendMessage } = useAppStore();
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeContact = contacts.find((c) => c.id === activeContactId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeContact?.messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage(text);
    setInput("");
  };

  const filteredContacts = contacts.filter((c) =>
    c.nama.toLowerCase().includes(search.toLowerCase())
  );

  // Group messages by date
  const groupedMessages = () => {
    if (!activeContact) return [];
    const groups: { date: string; messages: ChatMessage[] }[] = [];
    activeContact.messages.forEach((msg) => {
      const last = groups[groups.length - 1];
      if (last && last.date === msg.date) {
        last.messages.push(msg);
      } else {
        groups.push({ date: msg.date, messages: [msg] });
      }
    });
    return groups;
  };

  const totalUnread = contacts.reduce((a, c) => a + c.unread, 0);

  return (
    /* Full-height, no outer padding from layout — override with negative margin */
    <div
      style={{ display: "flex", height: "100%", margin: "-24px -28px", overflow: "hidden", background: "#F9F6F1" }}
    >
      {/* ── Contact List ── */}
      <div
        style={{ width: 290, flexShrink: 0, background: "white", borderRight: "1px solid #F0EDE8", display: "flex", flexDirection: "column" }}
      >
        {/* Header */}
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <p style={{ fontWeight: 700, color: "#1F2937", fontSize: 16 }}>Pesan</p>
            {totalUnread > 0 && (
              <span style={{ background: "#EF4444", color: "white", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>
                {totalUnread} baru
              </span>
            )}
          </div>
          <div style={{ position: "relative" }}>
            <i className="ri-search-line" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF", fontSize: 14 }} />
            <input
              className="s-input"
              style={{ paddingLeft: 32, fontSize: 13 }}
              placeholder="Cari nama pembeli..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Contact list */}
        <div style={{ overflowY: "auto", flex: 1 }} className="no-scrollbar">
          {filteredContacts.map((c) => {
            const isActive = c.id === activeContactId;
            return (
              <button
                key={c.id}
                onClick={() => setActiveContact(c.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer", background: isActive ? "#FDF7EE" : "transparent", borderBottom: "1px solid #F5F5F5", border: "none", textAlign: "left", transition: "background 0.15s", borderLeft: `3px solid ${isActive ? "#BFA370" : "transparent"}` }}
              >
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.avatar} style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: `2px solid ${isActive ? "#BFA370" : "transparent"}` }} alt="" />
                  {c.unread > 0 && (
                    <span style={{ position: "absolute", top: -2, right: -2, background: "#EF4444", color: "white", fontSize: 9, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {c.unread}
                    </span>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontWeight: c.unread > 0 ? 700 : 600, color: "#1F2937", fontSize: 14 }}>{c.nama}</p>
                    <span style={{ fontSize: 10, color: "#9CA3AF", whiteSpace: "nowrap" }}>{c.waktu}</span>
                  </div>
                  <p style={{ fontSize: 12, color: c.unread > 0 ? "#374151" : "#9CA3AF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: c.unread > 0 ? 500 : 400 }}>
                    {c.preview}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Chat Window ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#FAFAFA" }}>
        {activeContact ? (
          <>
            {/* Chat header */}
            <div style={{ padding: "14px 24px", borderBottom: "1px solid #E5E7EB", background: "white", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={activeContact.avatar} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid #BFA370" }} alt="" />
                <div>
                  <p style={{ fontWeight: 700, color: "#1F2937", fontSize: 15 }}>{activeContact.nama}</p>
                  <p style={{ fontSize: 12, color: "#9CA3AF" }}>Pembeli · Online</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 18, cursor: "pointer" }}><i className="ri-phone-line" /></button>
                <button style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 18, cursor: "pointer" }}><i className="ri-more-2-line" /></button>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px", display: "flex", flexDirection: "column", gap: 0 }} className="no-scrollbar">
              {groupedMessages().map((group) => (
                <div key={group.date}>
                  {/* Date separator */}
                  <div style={{ display: "flex", alignItems: "center", margin: "16px 0 12px", gap: 12 }}>
                    <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                    <span style={{ fontSize: 12, color: "#9CA3AF", background: "#F3F4F6", padding: "3px 12px", borderRadius: 99, whiteSpace: "nowrap" }}>{group.date}</span>
                    <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                  </div>

                  {group.messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{ display: "flex", justifyContent: msg.self ? "flex-end" : "flex-start", marginBottom: 8 }}
                    >
                      {!msg.self && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={activeContact.avatar} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }} alt="" />
                      )}
                      <div
                        style={{ background: msg.self ? "#BFA370" : "white", color: msg.self ? "white" : "#1F2937", borderRadius: msg.self ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "10px 14px", maxWidth: "62%", boxShadow: msg.self ? "0 2px 8px rgba(191,163,112,0.3)" : "0 2px 8px rgba(0,0,0,0.06)" }}
                      >
                        <p style={{ fontSize: 14, lineHeight: 1.5 }}>{msg.text}</p>
                        <p style={{ fontSize: 10, opacity: 0.7, marginTop: 4, textAlign: "right" }}>{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "12px 24px", background: "white", borderTop: "1px solid #E5E7EB", display: "flex", alignItems: "center", gap: 12 }}>
              <button style={{ background: "none", border: "none", color: "#9CA3AF", fontSize: 20, cursor: "pointer" }}><i className="ri-image-line" /></button>
              <input
                className="s-input"
                style={{ flex: 1, fontSize: 14, borderRadius: 24, padding: "10px 16px" }}
                placeholder="Tulis pesan..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <button
                onClick={handleSend}
                style={{ width: 42, height: 42, borderRadius: "50%", background: input.trim() ? "linear-gradient(135deg,#BFA370,#8E754A)" : "#E5E7EB", border: "none", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", color: input.trim() ? "white" : "#9CA3AF", fontSize: 18, transition: "all 0.2s", flexShrink: 0 }}
              >
                <i className="ri-send-plane-fill" />
              </button>
            </div>
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#D1D5DB" }}>
            <div style={{ textAlign: "center" }}>
              <i className="ri-chat-3-line" style={{ fontSize: 64, display: "block", marginBottom: 12 }} />
              <p>Pilih percakapan untuk memulai chat</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}