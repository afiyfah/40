'use client';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window { Chart: any; }
}

export default function DashboardPage() {
  const revenueRef = useRef<HTMLCanvasElement>(null);
  const menuRef = useRef<HTMLCanvasElement>(null);
  const [period, setPeriod] = useState('mingguan');

  const ranges: Record<string, string> = {
    mingguan: '1 Januari – 7 Januari',
    bulanan: 'Januari 2026',
    tahunan: 'Tahun 2026'
  };

  useEffect(() => {
    // Load Chart.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    script.onload = () => initCharts();
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const initCharts = () => {
    if (!revenueRef.current || !menuRef.current) return;
    const Chart = window.Chart;

    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    new Chart(revenueRef.current.getContext('2d'), {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          { label: 'Penjualan Online', data: [150, 100, 170, 80, 200, 130, 160], backgroundColor: '#60A5FA', borderRadius: 6, barPercentage: 0.4 },
          { label: 'Penjualan Offline', data: [120, 90, 140, 70, 160, 110, 130], backgroundColor: '#FB923C', borderRadius: 6, barPercentage: 0.4 },
        ]
      },
      options: { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { beginAtZero: true, grid: { color: '#F0EDE8' } } }, responsive: true }
    });

    new Chart(menuRef.current.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Ayam aseli', 'Ayam palsu'],
        datasets: [{ data: [60, 40], backgroundColor: ['#22C55E', '#FB923C'], borderWidth: 0 }]
      },
      options: { plugins: { legend: { display: false } }, cutout: '65%', responsive: true, maintainAspectRatio: false }
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Dashboard</h1>
        <select
          value={period}
          onChange={e => setPeriod(e.target.value)}
          style={{ border: '1px solid #E0D9CF', borderRadius: 8, padding: '8px 32px 8px 12px', fontSize: 14, fontWeight: 500, outline: 'none', background: 'white', cursor: 'pointer' }}
        >
          <option value="mingguan">Mingguan</option>
          <option value="bulanan">Bulanan</option>
          <option value="tahunan">Tahunan</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Left column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { icon: 'ri-wifi-line', iconBg: '#FFF7ED', iconColor: '#FB923C', label: 'Pendapatan Online', value: 'Rp. 1.270.000', change: '▲ 15%', changeColor: '#22C55E' },
              { icon: 'ri-store-line', iconBg: '#FDF2F8', iconColor: '#EC4899', label: 'Pendapatan Offline', value: 'Rp. 1.200.000', change: '▼ 5%', changeColor: '#EF4444' },
              { icon: 'ri-money-dollar-circle-line', iconBg: '#FEFCE8', iconColor: '#EAB308', label: 'Total Pendapatan', value: 'Rp. 2.470.000', change: '', changeColor: '' },
            ].map((card, i) => (
              <div key={i} className="shadow-soft" style={{ background: 'white', borderRadius: 12, border: '1px solid #EEE', padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={card.icon} style={{ color: card.iconColor, fontSize: 20 }}></i>
                </div>
                <div>
                  <p style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 2 }}>{card.label}</p>
                  <p style={{ fontWeight: 700, color: '#1F2937', fontSize: 15 }}>{card.value}</p>
                  {card.change && <p style={{ fontSize: 12, fontWeight: 500, color: card.changeColor }}>{card.change}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Revenue chart */}
          <div className="shadow-soft" style={{ background: 'white', borderRadius: 12, border: '1px solid #EEE', padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <p style={{ fontWeight: 600, color: '#374151' }}>Total Pendapatan</p>
              <p style={{ fontSize: 12, color: '#9CA3AF' }}>{ranges[period]}</p>
            </div>
            <canvas ref={revenueRef} height={100}></canvas>
            <div style={{ display: 'flex', gap: 20, marginTop: 16, justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6B7280' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#60A5FA', display: 'inline-block' }}></span> Penjualan Online
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#6B7280' }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#FB923C', display: 'inline-block' }}></span> Penjualan Offline
              </div>
            </div>
          </div>

          {/* Bottom 3 cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {/* Total Pesanan */}
            <div className="shadow-soft" style={{ background: 'white', borderRadius: 12, border: '1px solid #EEE', padding: 16 }}>
              <p style={{ fontWeight: 600, color: '#374151', fontSize: 14, marginBottom: 12 }}>Total Pesanan Minggu Ini</p>
              <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1, background: '#22C55E', borderRadius: 12, padding: '12px 0', textAlign: 'center', color: 'white' }}>
                  <p style={{ fontSize: 24, fontWeight: 800 }}>90</p>
                  <p style={{ fontSize: 12 }}>Diterima</p>
                </div>
                <div style={{ flex: 1, background: '#F87171', borderRadius: 12, padding: '12px 0', textAlign: 'center', color: 'white' }}>
                  <p style={{ fontSize: 24, fontWeight: 800 }}>4</p>
                  <p style={{ fontSize: 12 }}>Ditolak</p>
                </div>
              </div>
              <p style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>Total 94 pesanan</p>
            </div>

            {/* Informasi Menu */}
            <div className="shadow-soft" style={{ background: 'white', borderRadius: 12, border: '1px solid #EEE', padding: 16 }}>
              <p style={{ fontWeight: 600, color: '#374151', fontSize: 14, marginBottom: 12 }}>Informasi Menu</p>
              <div style={{ position: 'relative', height: 112, marginBottom: 8 }}>
                <canvas ref={menuRef}></canvas>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }}></span> Ayam aseli
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FB923C', display: 'inline-block' }}></span> Ayam palsu
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="shadow-soft" style={{ background: 'white', borderRadius: 12, border: '1px solid #EEE', padding: 16 }}>
              <p style={{ fontWeight: 600, color: '#374151', fontSize: 14, marginBottom: 12 }}>Rating Toko</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <p style={{ fontSize: 36, fontWeight: 800, color: '#1F2937' }}>5</p>
                <div>
                  <div style={{ display: 'flex', color: '#EAB308' }}>
                    {Array(5).fill(0).map((_, i) => <i key={i} className="ri-star-fill"></i>)}
                  </div>
                  <p style={{ fontSize: 12, color: '#9CA3AF' }}>dari 101 ulasan</p>
                </div>
              </div>
              <a href="#" style={{ fontSize: 12, color: '#BFA370' }}>Lihat selengkapnya ›</a>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ width: 192, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Favorit */}
          <div className="shadow-soft" style={{ background: 'white', borderRadius: 12, border: '1px solid #EEE', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <i className="ri-heart-fill" style={{ color: '#F87171' }}></i>
              <p style={{ fontWeight: 600, color: '#374151', fontSize: 14 }}>Favorit</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12, color: '#4B5563' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="ri-store-line" style={{ color: '#BFA370' }}></i>
                <span>Toko Difavoritkan<br /><strong>420 Pengguna</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="ri-restaurant-line" style={{ color: '#BFA370' }}></i>
                <span>Menu Difavoritkan<br /><strong>785 Pengguna</strong></span>
              </div>
            </div>
          </div>

          {/* Menu Teratas */}
          <div className="shadow-soft" style={{ background: 'white', borderRadius: 12, border: '1px solid #EEE', padding: 16 }}>
            <p style={{ fontWeight: 600, color: '#374151', fontSize: 14, marginBottom: 12 }}>Menu Teratas</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { nama: 'Gulai Bakpao', terjual: '1RB+ terjual', best: true },
                { nama: 'Bakpao Kurut', terjual: '785 terjual', best: false },
                { nama: 'Bakpao Alpukat', terjual: '1GRB+ terjual', best: false },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <img
                      src={`/images/makanan${i + 1}.png`}
                      onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/44x44/f3f3f3/BFA370?text=🍗`; }}
                      style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }}
                      alt=""
                    />
                    {m.best && <span style={{ position: 'absolute', top: -4, left: -4, background: '#BFA370', color: 'white', fontSize: 9, fontWeight: 700, padding: '2px 4px', borderRadius: '50%' }}>★</span>}
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#1F2937' }}>{m.nama}</p>
                    <p style={{ fontSize: 10, color: '#9CA3AF' }}>{m.terjual}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}