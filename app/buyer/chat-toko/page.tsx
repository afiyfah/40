"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useState } from "react";

interface Contact { id: number; nama: string; preview: string; waktu: string; unread: number; aktif: boolean; }
interface Message { tipe: "date"|"left"|"right"; label?: string; text?: string; waktu?: string; }

const CONTACTS: Contact[] = [
  { id: 1, nama: "Ayam Goreng 39", preview: "Bisa kak", waktu: "Kemarin", unread: 0, aktif: true },
  { id: 2, nama: "Ayam Goreng 39", preview: "Untuk pesanan ayam goreng...", waktu: "Kemarin", unread: 2, aktif: false },
  { id: 3, nama: "Ayam Goreng 39", preview: "Untuk pesanan ayam goreng...", waktu: "Kemarin", unread: 0, aktif: false },
];

const MESSAGES_DB: Record<number, Message[]> = {
  1: [
    { tipe: "date", label: "Kemarin" },
    { tipe: "left", text: "Untuk pesanan ayam goreng paha atas, Ayam sama nasinya bisa di pisah nggk ya?", waktu: "12.24" },
    { tipe: "right", text: "Bisa kak", waktu: "12.24" },
  ],
  2: [{ tipe: "date", label: "Kemarin" }, { tipe: "left", text: "Untuk pesanan ayam goreng paha atas, gimana pesanannya?", waktu: "11.30" }],
  3: [{ tipe: "date", label: "Kemarin" }, { tipe: "right", text: "Kak, pesanannya sudah siap belum?", waktu: "10.00" }, { tipe: "left", text: "Sebentar ya kak, masih dalam proses.", waktu: "10.05" }],
};

export default function ChatTokoPage() {
  const [contacts, setContacts] = useState(CONTACTS);
  const [messages, setMessages] = useState<Record<number, Message[]>>(MESSAGES_DB);
  const [activeId, setActiveId] = useState(1);
  const [inputMsg, setInputMsg] = useState("");
  const [search, setSearch] = useState("");

  const activeContact = contacts.find((c) => c.id === activeId);
  const currentMessages = messages[activeId] || [];

  const selectContact = (id: number) => {
    setContacts((prev) => prev.map((c) => ({ ...c, aktif: c.id === id, unread: c.id === id ? 0 : c.unread })));
    setActiveId(id);
  };

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2,"0")}.${now.getMinutes().toString().padStart(2,"0")}`;
    const newMsg: Message = { tipe: "right", text: inputMsg, waktu: time };
    setMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] || []), newMsg] }));
    setContacts((prev) => prev.map((c) => c.id === activeId ? { ...c, preview: inputMsg } : c));
    setInputMsg("");
    setTimeout(() => {
      const replies = ["Siap kak!","Oke kak, noted!","Baik kak, akan kami proses.","Sebentar ya kak."];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = `${new Date().getHours().toString().padStart(2,"0")}.${new Date().getMinutes().toString().padStart(2,"0")}`;
      setMessages((prev) => ({ ...prev, [activeId]: [...(prev[activeId] || []), { tipe: "left", text: reply, waktu: replyTime }] }));
    }, 1000);
  };

  const filtered = contacts.filter((c) => c.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-[#F5F5F5] h-screen flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-[#BFA370] to-[#8E754A] px-5 py-4 flex items-center gap-3 flex-shrink-0">
        <button onClick={() => history.back()} className="text-white hover:opacity-75">
          <i className="ri-arrow-left-line text-xl" />
        </button>
        <h1 className="text-white font-bold text-lg">Chat <span className="bg-white/25 text-white text-sm font-semibold px-2 py-0.5 rounded-full ml-1">{contacts.reduce((a, c) => a + c.unread, 0) || contacts.length}</span></h1>
      </div>

      <div className="flex flex-1 overflow-hidden bg-white">
        {/* Contact List */}
        <div className="w-72 flex-shrink-0 border-r border-[#F0EDE8] flex flex-col">
          <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-100">
            <div className="relative flex-1">
              <i className="ri-search-line absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input className="border border-[#E8E3DA] rounded-lg py-1.5 pl-8 pr-3 text-xs w-full focus:outline-none focus:border-[#BFA370]"
                placeholder="Cari nama" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
          <div className="overflow-y-auto flex-1 no-scrollbar">
            {filtered.map((c) => (
              <div key={c.id} onClick={() => selectContact(c.id)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-[#F8F5F1] transition ${c.aktif ? "bg-[#F3EDE3]" : "hover:bg-[#FAF7F3]"}`}>
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-[#BFA370]/20 border border-[#BFA370]/30 flex items-center justify-center text-[#BFA370] font-bold flex-shrink-0">
                    {c.nama[0]}
                  </div>
                  {c.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{c.unread}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800 text-sm truncate">{c.nama}</p>
                    <span className="text-[10px] text-gray-400">{c.waktu}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{c.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-[#FAFAF9]">
          <div className="px-5 py-3 bg-white border-b border-[#F0EDE8] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#BFA370]/20 flex items-center justify-center text-[#BFA370] font-bold">
              {activeContact?.nama[0]}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{activeContact?.nama}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                <span className="text-xs text-green-500 font-medium">Online</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-3">
            {currentMessages.map((msg, i) => {
              if (msg.tipe === "date") return (
                <div key={i} className="text-center"><span className="bg-[#E8E3DA] text-[#888] text-[11px] px-3 py-1 rounded-full">{msg.label}</span></div>
              );
              if (msg.tipe === "left") return (
                <div key={i} className="flex flex-col items-start max-w-[55%]">
                  <div className="bg-white rounded-[4px_14px_14px_14px] px-4 py-3 shadow-sm text-sm text-gray-800">{msg.text}</div>
                  <span className="text-[10px] text-gray-400 mt-1 pl-1">{msg.waktu}</span>
                </div>
              );
              return (
                <div key={i} className="flex flex-col items-end max-w-[55%] self-end">
                  <div className="bg-[#EDE4D6] rounded-[14px_4px_14px_14px] px-4 py-3 text-sm text-gray-800">{msg.text}</div>
                  <span className="text-[10px] text-gray-400 mt-1 pr-1">{msg.waktu}</span>
                </div>
              );
            })}
          </div>

          <div className="px-5 py-3 bg-white border-t border-[#F0EDE8] flex items-center gap-3">
            <input className="flex-1 border border-[#E8E3DA] rounded-2xl px-4 py-2.5 text-sm outline-none focus:border-[#BFA370] bg-[#FAFAF8]"
              placeholder="Tulis pesan..." value={inputMsg} onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }}} />
            <button onClick={sendMessage}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#BFA370,#8E754A)" }}>
              <i className="ri-send-plane-2-fill text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
