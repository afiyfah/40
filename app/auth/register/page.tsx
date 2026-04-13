"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"pembeli"|"penjual"|null>(null);
  const router = useRouter();

  if (!role) return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="text-center max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pilih Peran Anda</h1>
        <p className="text-gray-500 mb-12 italic text-sm">Silahkan pilih sebagai apa anda ingin bergabung</p>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <button onClick={() => setRole("pembeli")}
            className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col w-full md:w-80 hover:scale-105 transition cursor-pointer">
            <div className="bg-gradient-to-b from-[#D6E9FC] to-[#3683DF] p-8 flex justify-center items-end h-64">
              <div className="text-9xl">👤</div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-600 mb-1">Datang & Belanja</h2>
              <p className="text-sm font-semibold text-gray-700">Daftar sebagai <span className="text-blue-600 underline">Pembeli</span></p>
              <p className="text-[10px] text-gray-400 mt-1 italic">Cari dan beli produk favoritmu</p>
            </div>
          </button>
          <button onClick={() => setRole("penjual")}
            className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col w-full md:w-80 hover:scale-105 transition cursor-pointer">
            <div className="bg-gradient-to-b from-[#FFCF98] to-[#F4721E] p-8 flex justify-center items-end h-64">
              <div className="text-9xl">🏪</div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-orange-600 mb-1">Buka Booth & Jualan</h2>
              <p className="text-sm font-semibold text-gray-700">Daftar sebagai <span className="text-orange-600 underline">Penjual</span></p>
              <p className="text-[10px] text-gray-400 mt-1 italic">Kelola toko dan raih lebih banyak pelanggan</p>
            </div>
          </button>
        </div>
        <Link href="/" className="mt-12 inline-block text-gray-500 hover:text-gray-800 text-sm font-semibold underline">← Kembali ke Beranda</Link>
      </div>
    </div>
  );

  return (
    <div className="bg-white flex min-h-screen font-sans">
      <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-12">
        <h1 className="text-4xl font-bold text-blue-900 mb-12 italic">Selamat Datang!</h1>
        <div className="max-w-xs w-full h-64 bg-gradient-to-b from-[#D6E9FC] to-[#3683DF] rounded-3xl flex items-center justify-center text-9xl">
          {role === "pembeli" ? "👤" : "🏪"}
        </div>
        <p className="mt-8 text-gray-600 italic">
          Sudah mempunyai akun?{" "}
          <Link href="/auth/login" className="text-blue-600 font-bold underline">Masuk</Link>
        </p>
      </div>

      <div className="w-full md:w-1/2 bg-[#3b5998] flex flex-col items-center justify-center p-8 text-white overflow-y-auto">
        <h2 className="text-3xl font-bold mb-8">Buat Akun — Step {step}</h2>

        {step === 1 && (
          <div className="w-full max-w-md space-y-4">
            <input type="email" placeholder="Email" className="w-full p-4 rounded-lg bg-gray-100 text-gray-800" />
            <input type="password" placeholder="Password" className="w-full p-4 rounded-lg bg-gray-100 text-gray-800" />
            <input type="password" placeholder="Konfirmasi Password" className="w-full p-4 rounded-lg bg-gray-100 text-gray-800" />
            <div className="flex justify-end pt-4">
              <button onClick={() => setStep(2)} className="border border-white px-6 py-2 rounded-lg font-bold hover:bg-white hover:text-[#3b5998] transition">Selanjutnya →</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-md space-y-4 text-sm">
            <div className="flex gap-4">
              <input type="text" placeholder="Nama depan" className="flex-1 p-3 rounded-lg bg-gray-100 text-gray-800" />
              <input type="text" placeholder="Nama belakang" className="flex-1 p-3 rounded-lg bg-gray-100 text-gray-800" />
            </div>
            <input type="text" placeholder="Username" className="w-full p-3 rounded-lg bg-gray-100 text-gray-800" />
            <input type="tel" placeholder="Nomor telepon" className="w-full p-3 rounded-lg bg-gray-100 text-gray-800" />
            <input type="date" className="w-full p-3 rounded-lg bg-gray-100 text-gray-800" />
            <div className="flex justify-between pt-6">
              <button onClick={() => setStep(1)} className="border border-white px-6 py-2 rounded-lg font-bold">← Kembali</button>
              <button onClick={() => router.push("/")} className="bg-green-600 px-6 py-2 rounded-lg font-bold hover:bg-green-700">Selesai ✓</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
