"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, RegisterStep1Data, RegisterStep2Data } from "@/context/AuthContext";
import { SplitLayout, FormTitle, IconInput, PlainInput, PlainSelect, NextButton, NavRow, OrDivider, GoogleButton, ErrorBox, IllustrPembeli } from "@/components/auth/AuthComponents";

export default function RegisterPembeliPage() {
  const { registerPembeli } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const validateStep1 = () => {
    if (!email || !password || !confirmPw) return "Semua field wajib diisi.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Format email tidak valid.";
    if (password.length < 8) return "Password minimal 8 karakter.";
    if (password !== confirmPw) return "Password tidak cocok.";
    return null;
  };

  const handleStep1 = () => {
    const err = validateStep1();
    if (err) { setError(err); return; }
    setError(""); setStep(2);
  };

  const handleFinish = async () => {
    if (!firstName || !lastName || !username || !phone || !birthDate) { setError("Semua field wajib diisi."); return; }
    setError(""); setLoading(true);
    const res = await registerPembeli(
      { email, password, confirmPassword: confirmPw } as RegisterStep1Data,
      { firstName, lastName, username, phone, birthDate } as RegisterStep2Data
    );
    setLoading(false);
    if (res.success) router.push("/");
    else setError(res.error || "Pendaftaran gagal.");
  };

  const inp = { width: "100%", padding: "13px 14px", borderRadius: 10, border: "none", outline: "none", background: "#f0f0f0", color: "#333", fontSize: 13, fontFamily: "'Poppins', sans-serif" } as const;

  return (
    <SplitLayout
      leftTitle="Selamat Datang!"
      leftIllustration={<IllustrPembeli />}
      leftFooter={
        <p style={{ fontSize: 13, color: "#555" }}>
          Sudah mempunyai akun?{" "}
          <Link href="/auth/login?role=pembeli" style={{ color: "#3b5998", fontWeight: 700, textDecoration: "underline" }}>Login</Link>
        </p>
      }
      rightBg="blue"
    >
      <FormTitle>Buat Akun</FormTitle>
      <ErrorBox message={error} />

      {step === 1 && (
        <div key="step1">
          <IconInput icon="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <IconInput icon="lock" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <IconInput icon="lock" type="password" placeholder="Konfirmasi Password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
          <NextButton onClick={handleStep1} />
          <OrDivider />
          <GoogleButton />
        </div>
      )}

      {step === 2 && (
        <div key="step2">
          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>Nama Lengkap</p>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <input type="text" placeholder="Nama depan" value={firstName} onChange={e => setFirstName(e.target.value)} style={inp} />
            <input type="text" placeholder="Nama belakang" value={lastName} onChange={e => setLastName(e.target.value)} style={inp} />
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>Username</p>
          <div style={{ marginBottom: 14 }}>
            <input type="text" placeholder="Masukkan nama toko/user" value={username} onChange={e => setUsername(e.target.value)} style={inp} />
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>Nomor Telepon</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <select style={{ ...inp, width: 80 }}><option>+62</option><option>+1</option></select>
            <input type="tel" placeholder="Masukkan nomor telepon" value={phone} onChange={e => setPhone(e.target.value)} style={{ ...inp, flex: 1 }} />
          </div>

          <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>Tanggal Lahir</p>
          <div style={{ marginBottom: 14 }}>
            <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} style={inp} />
          </div>

          <NavRow onBack={() => { setStep(1); setError(""); }} onNext={handleFinish} loading={loading} isLast />
          <OrDivider />
          <GoogleButton />
        </div>
      )}
    </SplitLayout>
  );
}
