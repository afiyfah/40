"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, RegisterUMKMData } from "@/context/AuthContext";
import {
  SplitLayout, FormTitle, IconInput, NavRow, OrDivider, GoogleButton,
  ErrorBox, UploadZone, KTPZone, BankSection, MapPicker, SuccessScreen, IllustrBerkembang,
} from "@/components/auth/AuthComponents";

const inp = { width: "100%", padding: "13px 14px", borderRadius: 10, border: "none", outline: "none", background: "#f0f0f0", color: "#333", fontSize: 13, fontFamily: "'Poppins', sans-serif" } as const;
const lbl = { fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 6, display: "block" } as const;
const sectionLbl = { fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 8, display: "block" } as const;

export default function RegisterBerkembangPage() {
  const { registerUMKM } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [storeName, setStoreName] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [storePhotos, setStorePhotos] = useState<File[]>([]);
  const [phone, setPhone] = useState("");
  const [opDays, setOpDays] = useState("Senin - Sabtu");
  const [openTime, setOpenTime] = useState("08.00");
  const [closeTime, setCloseTime] = useState("20.00");

  const [address, setAddress] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();

  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");

  const [cashierPhoto, setCashierPhoto] = useState<File[]>([]);
  const [interiorPhotos, setInteriorPhotos] = useState<File[]>([]);
  const [parkingPhotos, setParkingPhotos] = useState<File[]>([]);

  const validate = () => {
    if (step === 1) {
      if (!email || !password || !confirmPw) return "Semua field wajib diisi.";
      if (password !== confirmPw) return "Password tidak cocok.";
      if (password.length < 8) return "Password minimal 8 karakter.";
    }
    if (step === 2 && (!storeName || !phone)) return "Nama toko dan nomor telepon wajib diisi.";
    if (step === 3 && !address) return "Alamat toko wajib diisi.";
    if (step === 4 && (!bankName || !bankAccount || !bankAccountName)) return "Data rekening bank wajib dilengkapi.";
    return null;
  };

  const handleNext = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    if (step < 5) { setStep(s => s + 1); return; }
    setLoading(true);
    const data: RegisterUMKMData = {
      role: "umkm_berkembang", email, password,
      storeName, storeDescription: storeDesc, phone,
      operationalDays: opDays, openTime, closeTime,
      storeAddress: address, storeLat: lat, storeLng: lng,
      ktpImage: ktpFile, bankName, bankAccount, bankAccountName,
      cashierPhoto: cashierPhoto[0] ?? null,
      interiorPhotos, parkingPhotos,
    };
    const res = await registerUMKM(data);
    setLoading(false);
    if (res.success) setStep(6);
    else setError(res.error || "Pendaftaran gagal.");
  };

  if (step === 6) return <SuccessScreen bg="#C2540A" onBack={() => router.push("/auth/login?role=penjual")} />;

  const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}.00`);

  return (
    <SplitLayout
      leftTitle="Selamat Datang!"
      leftTitleColor="#7C2D12"
      leftIllustration={<IllustrBerkembang />}
      leftFooter={
        <p style={{ fontSize: 13, color: "#555" }}>
          Sudah mempunyai akun?{" "}
          <Link href="/auth/login?role=penjual" style={{ color: "#F4721E", fontWeight: 700, textDecoration: "underline" }}>Login</Link>
        </p>
      }
      rightBg="orange"
    >
      <FormTitle>Buat Akun</FormTitle>
      <ErrorBox message={error} />

      {/* Step 1 */}
      {step === 1 && (
        <div>
          <IconInput icon="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <IconInput icon="lock" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <IconInput icon="lock" type="password" placeholder="Konfirmasi Password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6, marginBottom: 4 }}>
            <button onClick={handleNext} style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid #fff", background: "transparent", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Poppins', sans-serif", cursor: "pointer" }}>Selanjutnya →</button>
          </div>
          <OrDivider />
          <GoogleButton />
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={lbl}>Nama Toko</span>
          <input type="text" placeholder="Masukkan nama toko" value={storeName} onChange={e => setStoreName(e.target.value)} style={{ ...inp, marginBottom: 14 }} />
          <span style={lbl}>Deskripsi Toko</span>
          <textarea placeholder="Masukkan deskripsi toko anda" value={storeDesc} onChange={e => setStoreDesc(e.target.value)} style={{ ...inp, height: 88, resize: "none", marginBottom: 14 }} />
          <div style={{ marginBottom: 14 }}>
            <UploadZone files={storePhotos} onFiles={setStorePhotos} multiple />
          </div>
          <span style={lbl}>Nomor Telepon</span>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <select style={{ ...inp, width: 80 }}><option>+62</option></select>
            <input type="tel" placeholder="Masukkan nomor telepon" value={phone} onChange={e => setPhone(e.target.value)} style={{ ...inp, flex: 1 }} />
          </div>
          <span style={lbl}>Jam Operasional</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 14 }}>
            <select value={opDays} onChange={e => setOpDays(e.target.value)} style={{ ...inp, flex: 2 }}>
              <option>Senin - Sabtu</option><option>Senin - Minggu</option><option>Selasa - Minggu</option>
            </select>
            <select value={openTime} onChange={e => setOpenTime(e.target.value)} style={{ ...inp, width: 80, padding: "13px 10px" }}>{hours.map(h => <option key={h}>{h}</option>)}</select>
            <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 700 }}>-</span>
            <select value={closeTime} onChange={e => setCloseTime(e.target.value)} style={{ ...inp, width: 80, padding: "13px 10px" }}>{hours.map(h => <option key={h}>{h}</option>)}</select>
          </div>
          <NavRow onBack={() => { setStep(1); setError(""); }} onNext={handleNext} loading={loading} />
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={lbl}>Alamat Toko</span>
          <input type="text" placeholder="Alamat Lengkap" value={address} onChange={e => setAddress(e.target.value)} style={{ ...inp, marginBottom: 14 }} />
          <span style={lbl}>Cari Lokasi di Peta</span>
          <div style={{ position: "relative", marginBottom: 10 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#aaa", zIndex: 1 }}>🔍</span>
            <input type="text" placeholder="Cari lokasi..." value={locationSearch} onChange={e => setLocationSearch(e.target.value)} style={{ ...inp, paddingLeft: 34 }} />
          </div>
          <MapPicker lat={lat} lng={lng} onSelect={(la, lo) => { setLat(la); setLng(lo); }} />
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", margin: "16px 0 20px" }} />
          <NavRow onBack={() => { setStep(2); setError(""); }} onNext={handleNext} loading={loading} />
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={lbl}>Scan KTP</span>
          <div style={{ marginBottom: 16 }}>
            <KTPZone file={ktpFile} onFile={setKtpFile} />
          </div>
          <BankSection
            bankName={bankName} onBankName={setBankName}
            bankAccount={bankAccount} onBankAccount={setBankAccount}
            bankAccountName={bankAccountName} onBankAccountName={setBankAccountName}
          />
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", margin: "16px 0 20px" }} />
          <NavRow onBack={() => { setStep(3); setError(""); }} onNext={handleNext} loading={loading} />
        </div>
      )}

      {/* Step 5 — Foto Usaha (exclusive Berkembang) */}
      {step === 5 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <span style={sectionLbl}>Foto Kasir</span>
            <UploadZone files={cashierPhoto} onFiles={setCashierPhoto} hint="Pastikan foto device dan layout kasir jelas dan tidak terpotong" thumbWidth={100} thumbHeight={90} />
          </div>
          <div>
            <span style={sectionLbl}>Foto Area Dalam</span>
            <UploadZone files={interiorPhotos} onFiles={setInteriorPhotos} multiple />
          </div>
          <div>
            <span style={sectionLbl}>Foto Area Parkir</span>
            <UploadZone files={parkingPhotos} onFiles={setParkingPhotos} multiple />
          </div>
          <NavRow onBack={() => { setStep(4); setError(""); }} onNext={handleNext} loading={loading} isLast />
        </div>
      )}
    </SplitLayout>
  );
}
