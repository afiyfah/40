'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: number;
  nama: string;
  harga: string;
  waktu: string;
  terjual: string;
  suka: number;
  stok: number;
  status: 'aktif' | 'habis';
}

const initialMenu: MenuItem[] = [
  { id: 1, nama: 'Nasgor Goreng', harga: 'Rp17.000', waktu: '15min', terjual: '10RB+', suka: 741, stok: 20, status: 'aktif' },
  { id: 2, nama: 'Nasgor Goreng', harga: 'Rp17.000', waktu: '15min', terjual: '10RB+', suka: 741, stok: 0, status: 'habis' },
  { id: 3, nama: 'Nasgor Goreng', harga: 'Rp17.000', waktu: '15min', terjual: '10RB+', suka: 741, stok: 20, status: 'aktif' },
  { id: 4, nama: 'Nasgor Goreng', harga: 'Rp17.000', waktu: '15min', terjual: '10RB+', suka: 741, stok: 20, status: 'aktif' },
];

export default function MenuPage() {
  const router = useRouter();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);
  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');
  const [openDots, setOpenDots] = useState<number | null>(null);
  const [savedToast, setSavedToast] = useState('');
  const [stokValues, setStokValues] = useState<Record<number, number>>(
    Object.fromEntries(initialMenu.map(m => [m.id, m.stok]))
  );

  const filtered = menuItems.filter(m => {
    const matchF = filter === 'semua' || m.status === filter;
    const matchQ = m.nama.toLowerCase().includes(search.toLowerCase());
    return matchF && matchQ;
  });

  const showToast = (msg: string) => {
    setSavedToast(msg);
    setTimeout(() => setSavedToast(''), 2500);
  };

  const hapusMenu = (id: number) => {
    if (confirm('Hapus menu ini?')) {
      setMenuItems(prev => prev.filter(m => m.id !== id));
      setOpenDots(null);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 className="page-title">Menu Toko</h1>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>Kelola seluruh menu di toko anda</p>
        </div>
        <button
          onClick={() => router.push('/seller/menu/tambah')}
          style={{ background: 'linear-gradient(90deg,#BFA370,#8E754A)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <i className="ri-add-line"></i> + Tambah Menu
        </button>
      </div>

      {/* Filter + Search */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #E5E7EB', paddingBottom: 0 }}>
          {[
            { key: 'semua', label: 'Semua' },
            { key: 'aktif', label: 'Aktif', badge: <span className="badge-aktif">3</span> },
            { key: 'habis', label: 'Habis', badge: <span className="badge-habis">1</span> },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`filter-tab${filter === f.key ? ' active' : ''}`}
            >
              {f.label} {f.badge}
            </button>
          ))}
          <span style={{ color: '#D1D5DB', alignSelf: 'flex-end', paddingBottom: 6 }}>|</span>
          <button
            onClick={() => router.push('/seller/penawaran')}
            className={`filter-tab`}
          >
            Promo/Flash Sale
          </button>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <i className="ri-search-line" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: 14 }}></i>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="s-input"
              style={{ paddingLeft: 32, width: 176, fontSize: 14 }}
              placeholder="Cari menu..."
            />
          </div>
          <button style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #BFA370', color: '#BFA370', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ri-filter-line"></i>
          </button>
        </div>
      </div>

      {/* Menu List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(m => (
          <div
            key={m.id}
            className="shadow-soft"
            style={{
              background: m.stok === 0 ? '#E5E5E5' : 'white',
              borderRadius: 14, border: '1px solid #EEE',
              padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16
            }}
          >
            <img
              src="/images/makanan2.png"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/72x72/f3f3f3/BFA370?text=🍗'; }}
              style={{ width: 64, height: 64, borderRadius: 12, objectFit: 'cover', flexShrink: 0, filter: m.stok === 0 ? 'grayscale(1) opacity(0.7)' : 'none' }}
              alt=""
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: '#1F2937' }}>{m.nama}</p>
              <p style={{ color: '#BFA370', fontWeight: 700, fontSize: 14 }}>{m.harga}</p>
              <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{m.waktu}</p>
              <p style={{ fontSize: 12, color: '#9CA3AF' }}>{m.terjual} terjual · Disukai oleh {m.suka}</p>
            </div>

            {/* Qty control */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={() => setStokValues(prev => ({ ...prev, [m.id]: Math.max(0, (prev[m.id] ?? m.stok) - 1) }))}
                  style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid #DDD', background: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >−</button>
                <span style={{ width: 32, textAlign: 'center', fontWeight: 700, color: '#374151', fontSize: 14 }}>
                  {stokValues[m.id] ?? m.stok}
                </span>
                <button
                  onClick={() => setStokValues(prev => ({ ...prev, [m.id]: (prev[m.id] ?? m.stok) + 1 }))}
                  style={{ width: 26, height: 26, borderRadius: 6, border: '1px solid #DDD', background: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >+</button>
              </div>
              <p style={{ fontSize: 10, color: '#9CA3AF' }}>Stok hari ini <i className="ri-question-line"></i></p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0, position: 'relative' }}>
              <button
                onClick={() => {
                  showToast(`Stok tersimpan: ${stokValues[m.id] ?? m.stok}`);
                  setOpenDots(null);
                }}
                style={{ background: 'linear-gradient(90deg,#BFA370,#8E754A)', color: 'white', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              >
                Simpan Perubahan
              </button>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setOpenDots(openDots === m.id ? null : m.id)}
                  style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', fontSize: 18, letterSpacing: 2 }}
                >
                  •••
                </button>
                {openDots === m.id && (
                  <div style={{ position: 'absolute', right: 0, top: 28, background: 'white', border: '1px solid #EEE', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', zIndex: 10, minWidth: 100 }}>
                    <button
                      onClick={() => { router.push(`/seller/menu/tambah?edit=${m.id}`); setOpenDots(null); }}
                      style={{ width: '100%', padding: '10px 14px', textAlign: 'left', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <i className="ri-pencil-line" style={{ color: '#9CA3AF' }}></i> Edit
                    </button>
                    <button
                      onClick={() => hapusMenu(m.id)}
                      style={{ width: '100%', padding: '10px 14px', textAlign: 'left', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
                    >
                      <i className="ri-delete-bin-line"></i> Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast */}
      {savedToast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#22C55E', color: 'white', fontSize: 14, fontWeight: 500, padding: '12px 20px', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 50, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="ri-check-line" style={{ fontSize: 18 }}></i> {savedToast}
        </div>
      )}
    </div>
  );
}