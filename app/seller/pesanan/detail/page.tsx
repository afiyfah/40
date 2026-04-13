'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function useTimer(initial: number) {
  const [time, setTime] = useState(initial);
  useEffect(() => {
    const interval = setInterval(() => setTime(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(interval);
  }, []);
  const m = Math.floor(time / 60), s = time % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function DetailPesananPage() {
  const router = useRouter();
  const [tokoOn, setTokoOn] = useState(true);
  const timer = useTimer(295);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <button
          onClick={() => router.back()}
          style={{ border: '1px solid #E5E7EB', background: 'white', color: '#6B7280', borderRadius: 8, padding: '6px 12px', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
        >
          <i className="ri-arrow-left-line"></i> Kembali
        </button>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Detail Pesanan</h1>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontWeight: 600, color: '#374151', marginBottom: 12 }}>Menunggu Konfirmasi</h2>
          <div className="order-card shadow-soft">
            <div className="order-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img src="https://placehold.co/28x28/BFA370/fff?text=J" style={{ width: 28, height: 28, borderRadius: '50%' }} alt="" />
                <span style={{ fontWeight: 600, color: '#1F2937', fontSize: 14 }}>John Wayne</span>
              </div>
              <span className="order-timer">{timer}</span>
            </div>

            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <style>{`.detail-grid { display: grid; grid-template-columns: 52px 1fr 70px 28px 70px; align-items: center; gap: 8px; }`}</style>
              {[
                { nama: 'Ayam Paha Atas', varian: 'Super Pedas', harga: 'Rp17.000', qty: 'x1', total: 'Rp17.000', varBg: '#FFF7ED', varColor: '#FB923C' },
                { nama: 'Ayam Paha Bandung', varian: 'Super Pedas Jeletot', harga: 'Rp18.000', qty: 'x3', total: 'Rp54.000', varBg: '#FEF2F2', varColor: '#F87171' },
              ].map((item, i) => (
                <div key={i} className="detail-grid">
                  <img src={`/images/makanan${i + 1}.png`} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/52x52/f3f3f3/BFA370?text=🍗'; }} style={{ width: 52, height: 52, borderRadius: 12, objectFit: 'cover' }} alt="" />
                  <div>
                    <p style={{ fontWeight: 500, color: '#1F2937', fontSize: 14 }}>{item.nama}</p>
                    <span style={{ fontSize: 11, background: item.varBg, color: item.varColor, padding: '2px 8px', borderRadius: 99 }}>{item.varian}</span>
                  </div>
                  <p style={{ color: '#BFA370', textAlign: 'center', fontSize: 12 }}>{item.harga}</p>
                  <p style={{ color: '#6B7280', textAlign: 'center', fontSize: 12 }}>{item.qty}</p>
                  <p style={{ color: '#BFA370', fontWeight: 600, textAlign: 'right', fontSize: 12 }}>{item.total}</p>
                </div>
              ))}
            </div>

            <div style={{ padding: '12px 16px', borderTop: '1px solid #F3F4F6' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '6px 12px' }}>
                  <i className="ri-shopping-bag-line" style={{ color: '#BFA370' }}></i>
                  4 item · Total <strong style={{ color: '#BFA370', marginLeft: 4 }}>Rp71.000</strong>
                </div>
                <span style={{ fontSize: 12, color: '#6B7280' }}>Order ID: 987654</span>
              </div>
              <p style={{ fontSize: 12, color: '#6B7280', textAlign: 'right', marginBottom: 12 }}>Metode Pemesanan: Ambil Ditempat</p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button style={{ background: '#EF4444', color: 'white', border: 'none', borderRadius: 8, padding: '6px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <i className="ri-close-line"></i> Tolak
                </button>
                <button style={{ background: '#22C55E', color: 'white', border: 'none', borderRadius: 8, padding: '6px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <i className="ri-check-line"></i> Terima
                </button>
              </div>
            </div>
          </div>

          <div className="shadow-soft" style={{ background: 'white', borderRadius: 12, border: '1px solid #EEE', marginTop: 12, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <i className="ri-file-list-3-line" style={{ color: '#BFA370', fontSize: 16, flexShrink: 0, marginTop: 2 }}></i>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Keterangan Catatan Dari Pembeli</p>
              <p style={{ fontSize: 12, color: '#6B7280' }}>Pedas level 5, sambalnya di pisan ya</p>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: 208, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="shadow-soft" style={{ background: 'white', borderRadius: 12, border: '1px solid #EEE', padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Status Toko</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
              <button onClick={() => setTokoOn(!tokoOn)} className={`store-toggle-btn${tokoOn ? ' on' : ''}`} />
              <i className="ri-check-line" style={{ color: '#22C55E', fontSize: 18 }}></i>
            </div>
            <p style={{ textAlign: 'center', fontSize: 14, fontWeight: 600, color: tokoOn ? '#22C55E' : '#EF4444' }}>
              {tokoOn ? 'Toko Dibuka' : 'Toko Ditutup'}
            </p>
          </div>
          <div className="shadow-soft" style={{ background: 'linear-gradient(135deg,#C9A227,#8E754A)', borderRadius: 12, padding: '16px 20px', textAlign: 'center', color: 'white' }}>
            <i className="ri-time-line" style={{ fontSize: 24, display: 'block', marginBottom: 4 }}></i>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Menunggu Konfirmasi</p>
            <p style={{ fontSize: 36, fontWeight: 800, margin: '4px 0' }}>20</p>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Pesanan</p>
          </div>
          <div className="shadow-soft" style={{ background: 'linear-gradient(135deg,#22C55E,#16A34A)', borderRadius: 12, padding: '16px 20px', textAlign: 'center', color: 'white' }}>
            <i className="ri-calendar-check-line" style={{ fontSize: 24, display: 'block', marginBottom: 4 }}></i>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Hari ini</p>
            <p style={{ fontSize: 36, fontWeight: 800, margin: '4px 0' }}>37</p>
            <p style={{ fontSize: 12, opacity: 0.9 }}>Pesanan Terselesaikan</p>
          </div>
        </div>
      </div>
    </div>
  );
}