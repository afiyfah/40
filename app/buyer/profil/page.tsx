"use client";
import BuyerHeader from "@/components/buyer/Header";
import { useState } from "react";

const NAV_ITEMS = [
  { id: "edit-profil", icon: "ri-pencil-line", label: "Edit Profil", section: "Akun Saya" },
  { id: "jenis-member", icon: "ri-shield-check-fill", label: "Jenis Member", section: "Akun Saya" },
  { id: "data-privasi", icon: "ri-shield-line", label: "Data & Privasi", section: "Akun Saya" },
  { id: "voucher", icon: "ri-coupon-line", label: "Voucher Kamu", section: "Akun Saya" },
  { id: "favorit", icon: "ri-heart-line", label: "Favorit Kamu", section: "Aktivitas" },
  { id: "notifikasi", icon: "ri-notification-3-line", label: "Notifikasi", section: "Aktivitas" },
  { id: "histori", icon: "ri-history-line", label: "Histori Pesanan", section: "Aktivitas" },
  { id: "langganan", icon: "ri-vip-crown-line", label: "Langganan", section: "Aktivitas" },
  { id: "kontak", icon: "ri-phone-line", label: "Kontak Kami", section: "Bantuan" },
  { id: "kebijakan", icon: "ri-file-text-line", label: "Kebijakan", section: "Bantuan" },
  { id: "bantuan", icon: "ri-question-line", label: "Pusat Bantuan", section: "Bantuan" },
];

export default function ProfilPage() {
  const [activePanel, setActivePanel] = useState("edit-profil");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const sections = [...new Set(NAV_ITEMS.map((n) => n.section))];

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <BuyerHeader />
      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-6">
        {/* Sidebar */}
        <aside className="w-[240px] flex-shrink-0">
          <div className="bg-white rounded-2xl p-4 shadow-sm sticky top-6">
            <div className="flex items-center gap-3 px-2 py-3 mb-2 border-b border-gray-100">
              <div className="w-11 h-11 rounded-full bg-[#BFA370]/20 flex items-center justify-center text-[#BFA370] font-bold">F</div>
              <div>
                <p className="font-semibold text-gray-800 text-sm leading-tight">Faiz Faadillah</p>
                <p className="text-xs text-gray-400">faiz@gmail.com</p>
              </div>
            </div>

            {sections.map((section) => (
              <div key={section}>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wide px-2 pt-4 pb-1">{section}</div>
                {NAV_ITEMS.filter((n) => n.section === section).map((item) => (
                  <button key={item.id} onClick={() => setActivePanel(item.id)}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-full text-sm transition ${activePanel === item.id ? "bg-[#efe9de] text-[#78450e] font-semibold" : "text-gray-500 hover:bg-[#f3efe8] hover:text-[#78450e]"}`}>
                    <i className={`${item.icon} text-[17px]`} />
                    {item.label}
                  </button>
                ))}
              </div>
            ))}

            <div className="mt-3">
              <button onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:opacity-90">
                <i className="ri-logout-box-line text-lg" /> Keluar
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {activePanel === "edit-profil" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800 mb-7">Profil Saya</h1>
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-full bg-[#BFA370]/20 flex items-center justify-center text-[#BFA370] font-bold text-3xl border-2 border-[#BFA370]">F</div>
                <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  <i className="ri-pencil-line text-[#BFA370]" /> Edit Foto
                </button>
              </div>
              <div className="space-y-5 max-w-lg">
                {[{label:"Username", val:"Faiz Faadillah", type:"text"},{label:"Email",val:"faiz@gmail.com",type:"email"},{label:"Sandi",val:"••••••",type:"password"}].map((f) => (
                  <div key={f.label}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                    <input defaultValue={f.val} type={f.type}
                      className="w-full border border-[#e0d9cf] rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-[#BFA370] focus:ring-2 focus:ring-[#BFA370]/10" />
                  </div>
                ))}
                <button className="bg-blue-500 text-white rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-blue-600 mt-2">Simpan</button>
              </div>
            </div>
          )}

          {activePanel === "jenis-member" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Member Anda</h1>
              <div className="bg-gradient-to-r from-gray-400 to-gray-300 rounded-2xl p-6 text-white flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Status Keanggotaan</p>
                  <p className="text-2xl font-bold tracking-wide">MEMBER SILVER</p>
                </div>
                <i className="ri-arrow-right-s-line text-3xl opacity-70" />
              </div>
              <h2 className="font-semibold text-gray-700 mb-4">Keuntungan:</h2>
              <div className="border border-gray-200 rounded-xl overflow-hidden divide-y divide-gray-100">
                {[["CASHBACK 3%","Dapatkan kembali 3% dari setiap transaksi"],["VOUCHER EXCLUSIF RP 5.000","Kupon spesial hanya untuk member setiap bulan"],["FLASH SALE PRIORITAS","Akses 30 detik lebih cepat untuk FlashSale"]].map(([title, desc]) => (
                  <div key={title} className="flex items-center gap-4 p-5">
                    <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center text-2xl">⭐</div>
                    <div>
                      <p className="font-bold text-gray-800">{title}</p>
                      <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activePanel === "histori" && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">Histori Pesanan</h1>
              <div className="text-center py-16 text-gray-300">
                <i className="ri-history-line text-6xl mb-3 block" />
                <p className="text-base font-medium">Belum ada histori pesanan</p>
              </div>
            </div>
          )}

          {!["edit-profil","jenis-member","histori"].includes(activePanel) && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">{NAV_ITEMS.find((n) => n.id === activePanel)?.label}</h1>
              <div className="text-center py-16 text-gray-300">
                <i className="ri-building-line text-6xl mb-3 block" />
                <p className="text-base font-medium">Konten sedang disiapkan</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 w-80 text-center shadow-2xl">
            <i className="ri-logout-box-line text-4xl text-red-400 mb-3 block" />
            <h3 className="font-bold text-gray-800 text-lg mb-2">Keluar?</h3>
            <p className="text-sm text-gray-500 mb-6">Apakah kamu yakin ingin keluar dari akun ini?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutModal(false)} className="flex-1 border border-gray-200 rounded-lg py-2.5 text-sm text-gray-500 hover:bg-gray-50">Batal</button>
              <button onClick={() => { setShowLogoutModal(false); window.location.href = "/"; }}
                className="flex-1 bg-red-600 text-white rounded-lg py-2.5 text-sm font-semibold hover:opacity-90">Ya, Keluar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
