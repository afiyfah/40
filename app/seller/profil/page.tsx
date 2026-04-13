'use client';
import { useState } from 'react';

const ratingData = [
  { bintang: 5, jumlah: 437 },
  { bintang: 4, jumlah: 115 },
  { bintang: 3, jumlah: 35 },
  { bintang: 2, jumlah: 10 },
  { bintang: 1, jumlah: 0 },
];
const maxRating = Math.max(...ratingData.map(r => r.jumlah));

export default function ProfilPage() {
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [form, setForm] = useState({
    namaToko: 'Ayam Labubu',
    deskripsi: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    kontak: '+62 884-1213-5533',
    email: 'ayamlabubu@gmail.com',
    alamat: 'Jl. Ayam No. 1, Surakarta, Jawa Tengah',
  });

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(f);
    }
  };

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: 24 }}>Profile</h1>

      <div className="shadow-soft" style={{ background: 'white', borderRadius: 16, border: '1px solid #EEE', padding: 24, position: 'relative', maxWidth: 768 }}>
        <button style={{ position: 'absolute', top: 20, right: 20, color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer', fontSize: 20 }}>
          <i className="ri-settings-3-line"></i>
        </button>

        <div style={{ display: 'flex', gap: 32 }}>
          {/* Left: Avatar + Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, flexShrink: 0, width: 144 }}>
            <div style={{ position: 'relative' }}>
              <img
                src={avatar || '/images/avatar.png'}
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/96x96/BFA370/fff?text=A'; }}
                style={{ width: 96, height: 96, borderRadius: '50%', objectFit: 'cover', border: '2px solid #BFA370' }}
                alt=""
              />
            </div>
            <label style={{ fontSize: 12, fontWeight: 500, color: 'white', padding: '6px 16px', borderRadius: 8, width: '100%', textAlign: 'center', cursor: 'pointer', background: 'linear-gradient(90deg,#BFA370,#8E754A)' }}>
              Ganti Foto Profile
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </label>

            <div style={{ width: '100%', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>Total Item</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#1F2937', marginTop: 2 }}>46 item</p>
            </div>

            <div style={{ width: '100%', background: '#F9FAFB', border: '1px solid #F3F4F6', borderRadius: 12, padding: '16px' }}>
              <p style={{ fontSize: 12, color: '#6B7280', fontWeight: 500, marginBottom: 8 }}>Rating Toko</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <i className="ri-star-fill" style={{ color: '#EAB308', fontSize: 20 }}></i>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#1F2937' }}>4.8</span>
              </div>
              <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 12 }}>(500+ Ulasan)</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {ratingData.map(r => (
                  <div key={r.bintang} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#6B7280', width: 12, textAlign: 'right', flexShrink: 0 }}>{r.bintang}</span>
                    <div style={{ flex: 1, background: '#E5E7EB', borderRadius: 99, height: 7, overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #BFA370, #8E754A)', width: `${maxRating > 0 ? (r.jumlah / maxRating * 100) : 0}%` }} />
                    </div>
                    <span style={{ fontSize: 11, color: '#6B7280', width: 24, textAlign: 'right', flexShrink: 0 }}>{r.jumlah}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#4B5563', display: 'block', marginBottom: 4 }}>Nama Toko</label>
              <input
                className="s-input"
                value={form.namaToko}
                onChange={e => setForm(p => ({ ...p, namaToko: e.target.value }))}
                readOnly={!editing}
                style={{ background: editing ? 'white' : '#FAFAFA' }}
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#4B5563', display: 'block', marginBottom: 4 }}>Deskripsi Toko</label>
              <textarea
                className="s-input"
                value={form.deskripsi}
                onChange={e => setForm(p => ({ ...p, deskripsi: e.target.value }))}
                rows={4}
                style={{ resize: 'none', background: editing ? 'white' : '#FAFAFA' }}
                readOnly={!editing}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: '#4B5563', display: 'block', marginBottom: 4 }}>Kontak</label>
                <input className="s-input" value={form.kontak} onChange={e => setForm(p => ({ ...p, kontak: e.target.value }))} readOnly={!editing} style={{ background: editing ? 'white' : '#FAFAFA' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: '#4B5563', display: 'block', marginBottom: 4 }}>Email</label>
                <input className="s-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} readOnly={!editing} style={{ background: editing ? 'white' : '#FAFAFA' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 500, color: '#4B5563', display: 'block', marginBottom: 4 }}>Alamat Toko</label>
              <textarea
                className="s-input"
                value={form.alamat}
                onChange={e => setForm(p => ({ ...p, alamat: e.target.value }))}
                rows={4}
                style={{ resize: 'none', background: editing ? 'white' : '#FAFAFA' }}
                readOnly={!editing}
              />
            </div>

            <div style={{ display: 'flex', gap: 12, paddingTop: 4 }}>
              <button
                onClick={() => setEditing(true)}
                style={{ border: '1px solid #BFA370', color: '#BFA370', background: 'white', borderRadius: 10, padding: '10px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                Edit Profil
              </button>
              <button
                onClick={() => { setEditing(false); showToast('Perubahan berhasil disimpan!'); }}
                style={{ background: 'linear-gradient(90deg,#BFA370,#8E754A)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 32px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: '#22C55E', color: 'white', fontSize: 14, fontWeight: 500, padding: '12px 20px', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.15)', zIndex: 50, display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="ri-check-line" style={{ fontSize: 18 }}></i> {toast}
        </div>
      )}
    </div>
  );
}