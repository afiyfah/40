'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  time: string;
  self: boolean;
}

interface Contact {
  id: number;
  nama: string;
  avatar: string;
  preview: string;
  waktu: string;
  active: boolean;
}

const initialContacts: Contact[] = Array(10).fill(0).map((_, i) => ({
  id: i,
  nama: 'Watanabe Haruto',
  avatar: 'https://placehold.co/36x36/BFA370/fff?text=W',
  preview: 'Bisa kak',
  waktu: 'Kemarin',
  active: i === 0,
}));

const initialMessages: Message[] = [
  { text: 'Untuk pesanan ayam goreng paha atas, Ayam sama nasinya bisa di pisah nggk ya?', time: '12.24', self: false },
  { text: 'Bisa kak', time: '12.24', self: true },
];

export default function ChatPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const activeContact = contacts.find(c => c.active);

  const sendMsg = () => {
    const msg = input.trim();
    if (!msg) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages(prev => [...prev, { text: msg, time, self: true }]);
    setInput('');
  };

  const selectContact = (id: number) => {
    setContacts(prev => prev.map(c => ({ ...c, active: c.id === id })));
  };

  const filteredContacts = contacts.filter(c => c.nama.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)', overflow: 'hidden', margin: '-24px -28px' }}>
      {/* Contact List */}
      <div style={{ width: 280, flexShrink: 0, background: 'white', borderRight: '1px solid #F0EDE8', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 12, borderBottom: '1px solid #F3F4F6', display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <i className="ri-search-line" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: 14 }}></i>
            <input
              className="s-input"
              style={{ paddingLeft: 32, fontSize: 14 }}
              placeholder="Cari nama"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="s-input" style={{ width: 96, fontSize: 12, cursor: 'pointer' }}>
            <option>Semua</option>
            <option>Belum Baca</option>
            <option>Sudah Baca</option>
          </select>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }} className="no-scrollbar">
          {filteredContacts.map(c => (
            <div
              key={c.id}
              onClick={() => selectContact(c.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                cursor: 'pointer', borderBottom: '1px solid #F5F5F5',
                background: c.active ? '#F9F6F1' : 'transparent',
                transition: 'background 0.15s'
              }}
            >
              <img src={c.avatar} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} alt="" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: 600, color: '#1F2937', fontSize: 14 }}>{c.nama}</p>
                  <span style={{ fontSize: 10, color: '#9CA3AF' }}>{c.waktu}</span>
                </div>
                <p style={{ fontSize: 12, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#FAFAFA' }}>
        {/* Header */}
        <div style={{ padding: '12px 24px', borderBottom: '1px solid #E5E7EB', background: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={activeContact?.avatar || 'https://placehold.co/36x36/BFA370/fff?text=W'} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} alt="" />
          <div>
            <p style={{ fontWeight: 600, color: '#1F2937', fontSize: 14 }}>{activeContact?.nama || 'Watanabe Haruto'}</p>
            <p style={{ fontSize: 12, color: '#9CA3AF' }}>Pembeli</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }} className="no-scrollbar">
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: '#9CA3AF', background: '#F3F4F6', padding: '4px 12px', borderRadius: 99 }}>Kemarin</span>
          </div>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.self ? 'flex-end' : 'flex-start' }}>
              <div style={{
                background: msg.self ? '#E8E0D0' : 'white',
                borderRadius: msg.self ? '14px 0 14px 14px' : '0 14px 14px 14px',
                padding: '12px 16px',
                maxWidth: '60%',
                boxShadow: msg.self ? undefined : '0 2px 8px rgba(0,0,0,0.06)'
              }}>
                <p style={{ fontSize: 14, color: msg.self ? '#374151' : '#1F2937' }}>{msg.text}</p>
                <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4, textAlign: 'right' }}>{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: '12px 24px', background: 'white', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 12 }}>
          <input
            className="s-input"
            style={{ flex: 1, fontSize: 14 }}
            placeholder="Tulis pesan..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMsg(); }}
          />
          <button
            onClick={sendMsg}
            style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(90deg,#BFA370,#8E754A)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 18 }}
          >
            <i className="ri-send-plane-2-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
}