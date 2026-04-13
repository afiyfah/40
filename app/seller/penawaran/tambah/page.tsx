'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahPromoPage() {
  const router = useRouter();
  const [toast, setToast] = useState('');
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewImg(ev.target?.result as string);
      reader.readAsDataURL(f);
    }
  };

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: 24 }}>Tambah Promo</h1>

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        {/* Left: Form */}
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, color: '#374151', marginBottom: 12 }}>Tambah</p>
          <div className="shadow-soft" style={{ background: 'white', borderRadius: 16, border: '1px solid #EEE', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Upload + Judul + Jenis */}
            <div style={{ display: 'flex', gap: 20 }}>
              <label style={{ width: 110, height: 100, border: '2px dashed #DDD', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#FAF8F5' }}>
                {previewImg ? (
                  <img src={previewImg} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} alt="" />
                ) : (
                  <>
                    <i className="ri-image-add-line" style={{ fontSize: 22, color: '#D1D5DB', marginBottom: 4 }}></i>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>Unggah Foto</span>
                  </>
                )}
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
              </label>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#4B5563', display: 'block', marginBottom: 4 }}>Judul Promo</label>
                  <input className="s-input" defaultValue="Beli 2 Menu apapun GRATIS Es Teh!" />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#4B5563', display: 'block', marginBottom: 4 }}>Jenis Promo</label>
                  <select className="s-input" style={{ cursor: 'pointer' }}>
                    <option>Beli X dan dapatkan Y secara GRATIS!</option>
                    <option>Diskon %</option>
                    <option>Potongan Harga</option>
                    <option>Gratis Ongkir</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Informasi Event */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#BFA370', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Informasi Event &amp; Produksi</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <label style={{ fontSize: 14, color: '#4B5563', flexShrink: 0 }}>Jika membeli</label>
                  <select className="s-input" style={{ flex: 1, cursor: 'pointer', minWidth: 100 }}><option>Semua Menu</option><option>Menu Pilihan</option></select>
                  <label style={{ fontSize: 14, color: '#4B5563', flexShrink: 0 }}>Sebanyak</label>
                  <input className="s-input" style={{ width: 48, textAlign: 'center' }} type="number" defaultValue={2} />
                  <span style={{ fontSize: 14, color: '#6B7280' }}>Porsi</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <label style={{ fontSize: 14, color: '#4B5563', flexShrink: 0 }}>Mendapatkan</label>
                  <select className="s-input" style={{ flex: 1, cursor: 'pointer', minWidth: 80 }}><option>Es Teh</option><option>Es Jeruk</option></select>
                  <label style={{ fontSize: 14, color: '#4B5563', flexShrink: 0 }}>Sebanyak</label>
                  <input className="s-input" style={{ width: 48, textAlign: 'center' }} type="number" defaultValue={1} />
                  <span style={{ fontSize: 14, color: '#6B7280' }}>Porsi</span>
                </div>
              </div>
            </div>

            {/* Pilihan Jenis + Rasa */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: 8 }}>Pilihan Jenis</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {['Panas', 'Biasa', 'Dingin'].map(j => (
                    <label key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={['Biasa', 'Dingin'].includes(j)} style={{ accentColor: '#BFA370', width: 14, height: 14 }} /> {j}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginBottom: 8 }}>Rasa</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {['Manis', 'Normal', 'Less Sugar', 'No Sugar'].map(r => (
                    <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#BFA370', width: 14, height: 14 }} /> {r}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 14, color: '#4B5563', fontWeight: 500 }}>Status Promo :</span>
              <select className="s-input" style={{ width: 'auto', cursor: 'pointer' }}><option>Aktif</option><option>Nonaktif</option></select>
            </div>
          </div>
        </div>

        {/* Right: Detail Promo */}
        <div style={{ width: 256, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontWeight: 600, color: '#374151' }}>Detail Promo</p>

          {[
            { label: 'Durasi Promo', content: (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <i className="ri-calendar-line" style={{ color: '#9CA3AF' }}></i>
                  <input className="s-input" style={{ width: 72, textAlign: 'center', fontSize: 12 }} defaultValue="22 Mar" />
                  <span style={{ color: '#9CA3AF' }}>–</span>
                  <input className="s-input" style={{ width: 72, textAlign: 'center', fontSize: 12 }} defaultValue="30 Mar" />
                  <input className="s-input" style={{ width: 64, textAlign: 'center', fontSize: 12 }} defaultValue="2026" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className="ri-time-line" style={{ color: '#9CA3AF' }}></i>
                  <input className="s-input" style={{ width: 64, textAlign: 'center', fontSize: 12 }} defaultValue="12 : 00" />
                  <span style={{ color: '#9CA3AF' }}>–</span>
                  <input className="s-input" style={{ width: 64, textAlign: 'center', fontSize: 12 }} defaultValue="16 : 30" />
                  <select className="s-input" style={{ width: 64, fontSize: 12, cursor: 'pointer' }}><option>WIB</option><option>WITA</option><option>WIT</option></select>
                </div>
              </div>
            )},
            { label: 'Batasan Pengguna', content: (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <i className="ri-user-line" style={{ color: '#9CA3AF' }}></i>
                  <span style={{ fontSize: 12, color: '#4B5563' }}>Limit per Customer per Hari :</span>
                  <input className="s-input" style={{ width: 48, textAlign: 'center', fontSize: 12 }} type="number" defaultValue={1} />
                </div>
                <p style={{ fontSize: 10, color: '#9CA3AF', lineHeight: 1.4 }}>isi dengan porsi (Contoh: "1" untuk 1 porsi per hari untuk 1 customer)</p>
              </div>
            )},
            { label: 'Slot Promo', content: (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <i className="ri-box-3-line" style={{ color: '#9CA3AF' }}></i>
                  <span style={{ fontSize: 12, color: '#4B5563' }}>Tersedia</span>
                  <input className="s-input" style={{ width: 56, textAlign: 'center', fontSize: 12 }} type="number" defaultValue={20} />
                  <span style={{ fontSize: 12, color: '#4B5563' }}>Stok</span>
                </div>
                <p style={{ fontSize: 10, color: '#9CA3AF', lineHeight: 1.4 }}>Jumlah stok yang Anda masukkan adalah kuota maksimum produk yang tersedia khusus untuk program promo ini selama periode aktif yang telah ditentukan.</p>
              </div>
            )},
          ].map((section, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 14, border: '1px solid #EEE', padding: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: '#BFA370', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>{section.label}</p>
              {section.content}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
        <button
          onClick={() => router.push('/seller/penawaran')}
          style={{ border: '1px solid #BFA370', color: '#BFA370', background: 'white', borderRadius: 10, padding: '10px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          Batal
        </button>
        <button
          onClick={() => { showToast('Promo berhasil disimpan!'); setTimeout(() => router.push('/seller/penawaran'), 1200); }}
          style={{ background: 'linear-gradient(90deg,#BFA370,#8E754A)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 40px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
        >
          Simpan Promo
        </button>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#22C55E', color: 'white', fontSize: 14, fontWeight: 500, padding: '12px 20px', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 50, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="ri-check-line" style={{ fontSize: 18 }}></i> {toast}
        </div>
      )}
    </div>
  );
}