'use client';
import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/useCartStoreSeller';
import { Order } from '@/lib/seller';

function fmtTime(sec: number | null): string {
  if (sec == null || sec < 0) return '00 : 00';
  const m = Math.floor(sec / 60), s = sec % 60;
  return String(m).padStart(2, '0') + ' : ' + String(s).padStart(2, '0');
}

function fmt(n: number): string {
  return 'Rp ' + n.toLocaleString('id-ID');
}

export default function SellerHomePage() {
  const { orders, terimaOrder, tolakOrder, tokoOpen, toggleToko } = useAppStore();
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);
  const [colTab, setColTab] = useState<{ m: string; p: string }>({ m: 'makan', p: 'makan' });
  const [timers, setTimers] = useState<Record<string, number>>({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize timers from orders
  useEffect(() => {
    const initial: Record<string, number> = {};
    orders.forEach(o => { if (o.col === 'p' && o.waktu != null) initial[o.id] = o.waktu; });
    setTimers(initial);
  }, [orders]);

  // Countdown tick
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimers(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(id => { if (next[id] > 0) next[id]--; });
        return next;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const menunggu = orders.filter(o => o.col === 'm' && o.tipe === colTab.m);
  const proses = orders.filter(o => o.col === 'p' && o.tipe === colTab.p);
  const activeOrder = activeDetailId ? orders.find(o => o.id === activeDetailId) : null;

  const handleTerima = (id: string) => {
    terimaOrder(id);
    setTimers(prev => ({ ...prev, [id]: 15 * 60 }));
  };

  const handleTolak = (id: string) => {
    if (!confirm('Tolak pesanan ini?')) return;
    tolakOrder(id);
    if (activeDetailId === id) setActiveDetailId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 70px)', position: 'relative', overflow: 'hidden', padding: '24px 28px' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexShrink: 0 }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Pesanan Cepat</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: tokoOpen ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${tokoOpen ? '#BBF7D0' : '#FECACA'}`, borderRadius: 12, padding: '8px 16px' }}>
          <button
            onClick={toggleToko}
            style={{
              width: 38, height: 20, borderRadius: 99, background: tokoOpen ? '#22C55E' : '#ccc',
              position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.2s'
            }}
          >
            <span style={{
              position: 'absolute', width: 14, height: 14, borderRadius: '50%',
              background: 'white', top: 3, left: tokoOpen ? 21 : 3, transition: 'left 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }} />
          </button>
          <i className={`ri-check-line`} style={{ color: tokoOpen ? '#22C55E' : '#ccc', fontSize: 14 }}></i>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{tokoOpen ? 'Buka' : 'Tutup'}</span>
        </div>
      </div>

      {/* Kanban */}
      <div style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>
        {/* Column Menunggu */}
        <KanbanCol
          col="m"
          title="Menunggu Disetujui"
          badgeColor={{ bg: '#FCD34D', text: '#78350F' }}
          borderColor="#FCD34D"
          bg="#FFFBEB"
          count={menunggu.length}
          activeTab={colTab.m}
          onTabChange={(t) => setColTab(prev => ({ ...prev, m: t }))}
          orders={menunggu}
          timers={timers}
          activeDetailId={activeDetailId}
          onCardClick={setActiveDetailId}
          onTerima={handleTerima}
          onTolak={handleTolak}
          isProses={false}
        />

        {/* Column Proses */}
        <KanbanCol
          col="p"
          title="Sedang Diproses"
          badgeColor={{ bg: '#60A5FA', text: 'white' }}
          borderColor="#93C5FD"
          bg="#EFF6FF"
          count={proses.length}
          activeTab={colTab.p}
          onTabChange={(t) => setColTab(prev => ({ ...prev, p: t }))}
          orders={proses}
          timers={timers}
          activeDetailId={activeDetailId}
          onCardClick={setActiveDetailId}
          onTerima={handleTerima}
          onTolak={handleTolak}
          isProses={true}
        />
      </div>

      {/* Detail Panel */}
      {activeOrder && (
        <DetailPanel
          order={activeOrder}
          timers={timers}
          onClose={() => setActiveDetailId(null)}
        />
      )}
    </div>
  );
}

interface KanbanColProps {
  col: string;
  title: string;
  badgeColor: { bg: string; text: string };
  borderColor: string;
  bg: string;
  count: number;
  activeTab: string;
  onTabChange: (t: string) => void;
  orders: Order[];
  timers: Record<string, number>;
  activeDetailId: string | null;
  onCardClick: (id: string) => void;
  onTerima: (id: string) => void;
  onTolak: (id: string) => void;
  isProses: boolean;
}

function KanbanCol({ col, title, badgeColor, borderColor, bg, count, activeTab, onTabChange, orders, timers, activeDetailId, onCardClick, onTerima, onTolak, isProses }: KanbanColProps) {
  const tabs = ['makan', 'preorder', 'reservasi'];
  const tabLabels = ['Makan Ditempat', 'Pre-Order', 'Reservasi'];

  return (
    <div style={{ flex: 1, borderRadius: 16, border: `1.5px solid ${borderColor}`, background: bg, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0, overflow: 'hidden' }}>
      {/* Top sticky */}
      <div style={{ padding: '14px 14px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: badgeColor.bg, color: badgeColor.text, fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {count}
          </div>
          <p style={{ fontWeight: 600, color: '#374151', fontSize: 14 }}>{title}</p>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: '#6B7280', border: `1px solid ${borderColor}`, background: 'white', padding: '2px 8px', borderRadius: 8 }}>22/03/2026</span>
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1.5px solid rgba(0,0,0,0.08)' }}>
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => onTabChange(t)}
              style={{
                flex: 1, textAlign: 'center', fontSize: 11, fontWeight: 600,
                color: activeTab === t ? '#333' : '#999', padding: '8px 4px', cursor: 'pointer',
                borderBottom: `2px solid ${activeTab === t ? '#333' : 'transparent'}`,
                marginBottom: -1.5, background: 'none', border: 'none',
                borderBottomWidth: 2, borderBottomStyle: 'solid',
                borderBottomColor: activeTab === t ? '#333' : 'transparent',
                transition: 'color 0.18s',
              }}
            >
              {tabLabels[i]}
            </button>
          ))}
        </div>
      </div>

      {/* Card list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px 14px' }} className="no-scrollbar">
        {activeTab === 'makan' && orders.length === 0 && (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: '#CCC', fontSize: 12 }}>
            <i className="ri-shopping-bag-line" style={{ fontSize: 36, display: 'block', marginBottom: 6 }}></i>
            Tidak ada pesanan
          </div>
        )}
        {activeTab === 'makan' && orders.map(o => (
          <OrderCard
            key={o.id}
            order={o}
            timer={timers[o.id] ?? o.waktu ?? 0}
            isActive={activeDetailId === o.id}
            isProses={isProses}
            onClick={() => onCardClick(o.id)}
            onTerima={() => onTerima(o.id)}
            onTolak={() => onTolak(o.id)}
          />
        ))}
        {activeTab !== 'makan' && (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: '#CCC', fontSize: 12 }}>
            <i className={`ri-${activeTab === 'preorder' ? 'time' : 'calendar'}-line`} style={{ fontSize: 36, display: 'block', marginBottom: 6 }}></i>
            Tidak ada {activeTab === 'preorder' ? 'pre-order' : 'reservasi'}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderCard({ order, timer, isActive, isProses, onClick, onTerima, onTolak }: {
  order: Order; timer: number; isActive: boolean; isProses: boolean;
  onClick: () => void; onTerima: () => void; onTolak: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'white', borderRadius: 10,
        border: `${isActive ? 2 : 1}px solid ${isActive ? '#BFA370' : '#EEE'}`,
        marginBottom: 10, cursor: 'pointer', overflow: 'hidden',
        boxShadow: isActive ? '0 0 0 2px rgba(191,163,112,0.25)' : undefined,
        transition: 'box-shadow 0.18s, border-color 0.18s',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, padding: '10px 12px', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          {order.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, color: '#333' }}>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.nama}</span>
              <span style={{ whiteSpace: 'nowrap', color: '#777', fontSize: 11 }}>{item.qty}x</span>
              <span style={{ whiteSpace: 'nowrap', color: '#777', fontSize: 11, textAlign: 'right', minWidth: 70 }}>
                Rp {item.harga.toLocaleString('id-ID')}
              </span>
            </div>
          ))}
          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, paddingTop: 6, borderTop: '1px solid #F0EDE8' }}>
            <img
              src={`https://placehold.co/16x16/BFA370/fff?text=${order.customer[0]}`}
              style={{ width: 16, height: 16, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
              alt=""
            />
            <span style={{ fontSize: 10, color: '#888' }}>{order.customer}</span>
            <span style={{ fontSize: 10, color: '#AAA', marginLeft: 'auto' }}>Order ID : {order.id}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#333', whiteSpace: 'nowrap' }}>
            Rp {order.total.toLocaleString('id-ID')}
          </span>
          {isProses ? (
            <div>
              <div style={{ background: '#EF4444', color: 'white', borderRadius: '6px 6px 0 0', fontSize: 10, fontWeight: 700, textAlign: 'center', padding: '2px 0', width: 70 }}>Waktu</div>
              <div style={{ background: '#EF4444', color: 'white', borderRadius: '0 0 6px 6px', fontSize: 15, fontWeight: 800, textAlign: 'center', padding: '3px 0', width: 70, fontVariantNumeric: 'tabular-nums' }}>
                {fmtTime(timer)}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 60 }}>
              <button
                onClick={(e) => { e.stopPropagation(); onTerima(); }}
                style={{ background: '#22C55E', color: 'white', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', width: '100%' }}
              >Terima</button>
              <button
                onClick={(e) => { e.stopPropagation(); onTolak(); }}
                style={{ background: '#EF4444', color: 'white', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', width: '100%' }}
              >Tolak</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ order, timers, onClose }: { order: Order; timers: Record<string, number>; onClose: () => void }) {
  const subtotal = order.items.reduce((a, i) => a + i.harga * i.qty, 0);
  const layanan = Math.round(subtotal * 0.05);
  const total = subtotal + layanan;

  return (
    <div style={{
      position: 'absolute', top: 56, left: 0, right: 0,
      background: 'white', borderRadius: 16, border: '1px solid #EEE',
      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
      padding: '22px 24px', zIndex: 30,
      maxHeight: 'calc(100vh - 120px)', overflowY: 'auto'
    }} className="no-scrollbar">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: 22, color: '#1F2937' }}>Detail Pesanan #{order.id}</p>
          <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>Dipesan: {order.tanggal}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 16 }}>
          <span style={{
            background: order.col === 'm' ? '#FEF08A' : '#60A5FA',
            color: order.col === 'm' ? '#78350F' : 'white',
            borderRadius: 99, padding: '4px 16px', fontSize: 12, fontWeight: 700
          }}>
            {order.col === 'm' ? 'Menunggu Persetujuan' : 'Sedang Diproses'}
          </span>
          <button
            onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6B7280', border: '1px solid #E5E7EB', borderRadius: 8, padding: '6px 12px', background: 'none', cursor: 'pointer' }}
          >
            <i className="ri-close-line"></i> Tutup
          </button>
        </div>
      </div>

      {/* Customer row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 20, fontSize: 14, color: '#4B5563', background: '#F9FAFB', borderRadius: 12, padding: '12px 16px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <i className="ri-user-line" style={{ color: '#BFA370' }}></i>
          <span>Nama Pelanggan: {order.customer}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <i className="ri-phone-line" style={{ color: '#BFA370' }}></i>
          <span>{order.phone}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <i className="ri-table-alt-line" style={{ color: '#BFA370' }}></i>
          <span>Meja: {order.meja}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Rincian Menu</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {order.items.map((item, i) => (
              <div key={i}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1F2937' }}>
                  {i + 1}. {item.nama} ({item.qty}x) – Rp {item.harga.toLocaleString('id-ID')}
                </p>
                {item.varian?.filter(Boolean).map(v => (
                  <p key={v} style={{ fontSize: 12, color: '#6B7280', marginLeft: 12, marginTop: 2 }}>• Varian: {v}</p>
                ))}
                {item.tambah?.filter(Boolean).map(t => (
                  <p key={t} style={{ fontSize: 12, color: '#6B7280', marginLeft: 12, marginTop: 2 }}>• Tambah {t}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Rincian Pembayaran</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Subtotal Harga Menu:</span>
              <span style={{ fontWeight: 600 }}>Rp{subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6B7280' }}>Biaya Layanan (5%):</span>
              <span style={{ fontWeight: 600 }}>Rp{layanan.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px solid #F3F4F6', paddingTop: 8, marginTop: 4 }}>
              <span>Total Pendapatan</span>
              <span>Rp{total.toLocaleString('id-ID')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: '#9CA3AF' }}>Metode Pembayaran:</span>
              <span style={{ fontWeight: 500, color: '#374151' }}>{order.metode}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <span style={{ color: '#9CA3AF' }}>Status:</span>
              <span style={{ fontWeight: 600, color: order.dibayar ? '#22C55E' : '#EF4444' }}>
                ● {order.dibayar ? 'Sudah Dibayar' : 'Belum Dibayar'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {order.catatan && (
        <div style={{ marginTop: 16, background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 12, padding: '12px 16px' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: '#92400E', marginBottom: 4 }}>Catatan Pembeli:</p>
          <p style={{ fontSize: 14, color: '#374151', fontStyle: 'italic' }}>{order.catatan}</p>
        </div>
      )}
    </div>
  );
}