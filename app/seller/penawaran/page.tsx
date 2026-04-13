'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PenawaranPage() {
  const router = useRouter();
  const [filter, setFilter] = useState('event');
  const [eventTab, setEventTab] = useState('tersedia');

  const filters = [
    { key: 'semua', label: 'Semua' },
    { key: 'aktif', label: 'Aktif', badge: <span className="badge-aktif">2</span> },
    { key: 'habis', label: 'Habis', badge: <span className="badge-habis">1</span> },
    { key: 'flashsale', label: 'Flash Sale' },
    { key: 'promo', label: 'Promo' },
    { key: 'event', label: 'Promo Event' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Promo/Flash Sale Toko</h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>Kelola seluruh menu di toko anda</p>
        </div>
        <button
          onClick={() => router.push('/seller/penawaran/tambah')}
          style={{ background: 'linear-gradient(90deg,#BFA370,#8E754A)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <i className="ri-add-line"></i> + Tambah Promo
        </button>
      </div>

      {/* Filter tabs */}
      <div style={{ background: '#FEFCE8', borderRadius: 12, border: '1px solid #E5E7EB', padding: '8px 20px', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #E5E7EB', paddingBottom: 0 }}>
            {filters.map((f, i) => (
              <span key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {i > 0 && <span style={{ color: '#D1D5DB', paddingBottom: 6 }}>|</span>}
                <button
                  onClick={() => setFilter(f.key)}
                  className={`filter-tab${filter === f.key ? ' active' : ''}`}
                >
                  {f.label} {f.badge}
                </button>
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginLeft: 16 }}>
            <div style={{ position: 'relative' }}>
              <i className="ri-search-line" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: 14 }}></i>
              <input className="s-input" style={{ paddingLeft: 32, paddingTop: 6, paddingBottom: 6, width: 176, fontSize: 14 }} placeholder="Cari menu..." />
            </div>
            <button style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #BFA370', color: '#BFA370', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="ri-filter-line"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Promo List */}
      {(filter === 'promo' || filter === 'semua' || filter === 'aktif' || filter === 'habis') && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[1, 2].map(i => (
            <div key={i} className="shadow-soft" style={{ background: 'white', borderRadius: 14, border: '1px solid #EEE', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: 180, flexShrink: 0, height: 112 }}>
                <img src="/images/rawon.png" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/180x112/f3f3f3/BFA370?text=Promo'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                <div style={{ position: 'absolute', bottom: 12, left: 12, width: 68, height: 68, background: 'linear-gradient(135deg,#E1BF59,#BFA370)', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, color: 'white', textAlign: 'center', lineHeight: 1.2, border: '2px solid white' }}>
                  BELI 2<br />GRATIS 1
                </div>
              </div>
              <div style={{ flex: 1, padding: '16px 20px' }}>
                <p style={{ fontWeight: 700, color: '#1F2937' }}>Beli 2 Gratis Esteh</p>
                <p style={{ fontSize: 14, color: '#6B7280' }}>Beli 2 menu apa saja dan dapatkan gratis esteh</p>
                <p style={{ fontSize: 12, color: '#BFA370', marginTop: 8 }}>Promo terpakai 321x sejak 1 Januari 2026</p>
                <p style={{ fontSize: 12, color: '#9CA3AF' }}>Berakhir 5 Januari 2026</p>
              </div>
              <div style={{ paddingRight: 16, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <button
                  onClick={() => router.push('/seller/penawaran/tambah')}
                  style={{ background: 'linear-gradient(90deg,#BFA370,#8E754A)', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  Edit Promo
                </button>
                <button style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  <i className="ri-arrow-down-s-line"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Panel */}
      {filter === 'event' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Sub tabs */}
          <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid #E5E7EB' }}>
            {[{ key: 'tersedia', label: 'Event Tersedia' }, { key: 'diikuti', label: 'Event yang diikuti' }].map((t, i) => (
              <span key={t.key} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {i > 0 && <span style={{ color: '#D1D5DB', paddingBottom: 4 }}>|</span>}
                <button
                  onClick={() => setEventTab(t.key)}
                  style={{ fontSize: 13, color: eventTab === t.key ? '#333' : '#999', cursor: 'pointer', paddingBottom: 4, borderBottom: `2px solid ${eventTab === t.key ? '#333' : 'transparent'}`, marginBottom: -1, background: 'none', border: 'none', borderBottomWidth: 2, borderBottomStyle: 'solid', borderBottomColor: eventTab === t.key ? '#333' : 'transparent', fontWeight: eventTab === t.key ? 600 : 400 }}
                >
                  {t.label}
                </button>
              </span>
            ))}
          </div>

          {eventTab === 'tersedia' && (
            <div>
              <h3 style={{ fontWeight: 600, color: '#374151', marginBottom: 12 }}>Event Spesial</h3>
              <div style={{ borderRadius: 16, overflow: 'hidden', position: 'relative', height: 128, marginBottom: 24 }} className="shadow-soft">
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(120,53,15,0.6), rgba(142,117,74,0.4))' }}></div>
                <img src="/images/ramadhan-sale.png" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x128/C9A227/fff?text=Ramadhan+Sale'; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
                  <div style={{ color: 'white' }}>
                    <p style={{ fontWeight: 800, fontSize: 20 }}><span style={{ fontWeight: 300 }}>Event Promo</span> Ramadhan Sale</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 14, opacity: 0.9 }}>
                      <i className="ri-calendar-line"></i> 1 Mar – 30 Mar 2026
                    </div>
                  </div>
                  <button style={{ background: 'linear-gradient(90deg,#BFA370,#8E754A)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    Gabung Event
                  </button>
                </div>
              </div>

              <h3 style={{ fontWeight: 600, color: '#374151', marginBottom: 12 }}>Event Tersedia</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                  { img: '/images/ramadhan-sale2.png', title: 'Ramadhan Sale 2026' },
                  { img: '/images/mega-sale.png', title: 'Mega Sale 2026' },
                  { img: '/images/ramadhan-sale2.png', title: 'Food Festival 2026' },
                ].map((ev, i) => (
                  <div key={i} className="shadow-soft" style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid #EEE', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}>
                    <div style={{ position: 'relative', height: 160 }}>
                      <img src={ev.img} onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/300x160/1a3a1a/FFD700?text=${ev.title}`; }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}></div>
                    </div>
                    <div style={{ padding: 12 }}>
                      <p style={{ fontWeight: 700, color: '#1F2937', fontSize: 14 }}>{ev.title}</p>
                      <p style={{ fontSize: 12, color: '#BFA370' }}>Diskon besar besaran selama bulan Ramadhan</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, fontSize: 10, color: '#6B7280' }}>
                        <span><i className="ri-calendar-line"></i> 1 Mar – 30 Mar 2026</span>
                        <span><i className="ri-user-line"></i> 210K+ toko bergabung</span>
                      </div>
                      <button style={{ marginTop: 12, width: '100%', padding: '8px 0', borderRadius: 12, fontWeight: 700, fontSize: 12, color: 'white', background: '#22C55E', border: 'none', cursor: 'pointer' }}>
                        Gabung Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {eventTab === 'diikuti' && (
            <div style={{ textAlign: 'center', padding: '64px 0', color: '#D1D5DB' }}>
              <i className="ri-store-line" style={{ fontSize: 64, display: 'block', marginBottom: 12 }}></i>
              <p style={{ fontWeight: 500 }}>Belum mengikuti event apapun</p>
            </div>
          )}
        </div>
      )}

      {/* Flash Sale empty */}
      {filter === 'flashsale' && (
        <div style={{ textAlign: 'center', padding: '64px 0', color: '#D1D5DB' }}>
          <i className="ri-price-tag-3-line" style={{ fontSize: 64, display: 'block', marginBottom: 12 }}></i>
          <p style={{ fontWeight: 500 }}>Tidak ada data tersedia</p>
        </div>
      )}
    </div>
  );
}