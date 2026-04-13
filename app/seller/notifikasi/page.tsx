'use client';
import { notifData } from '@/lib/seller';

export default function NotifikasiPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Notifikasi</h1>
        <button style={{ fontSize: 12, color: '#BFA370', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
          Tandai semua sudah dibaca
        </button>
      </div>

      <div className="shadow-soft" style={{ background: 'white', borderRadius: 16, border: '1px solid #EEE', padding: '8px 24px', maxWidth: 768 }}>
        {notifData.map((grup, gi) => (
          <div key={gi} style={{ marginBottom: 8 }}>
            <h3 style={{ fontWeight: 600, color: '#374151', fontSize: 14, padding: '12px 0' }}>{grup.grup}</h3>
            {grup.items.map((item, ii) => (
              <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 0', borderBottom: '1px solid #F5F0EA' }}>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  <i className={item.icon}></i>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, color: '#1F2937', fontSize: 14 }}>{item.judul}</p>
                  <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{item.sub}</p>
                </div>
                <span style={{ fontSize: 12, color: '#9CA3AF', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.waktu}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}