"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { SplitLayout, FormTitle, IconInput, NextButton, OrDivider, GoogleButton, ErrorBox, IllustrPembeli, IllustrBerkembang } from "@/components/auth/AuthComponents";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") ?? "pembeli";
  const isPenjual = role === "penjual";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Email dan password wajib diisi."); return; }
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      router.push(isPenjual ? "/seller/home" : "/");
    } else {
      setError(res.error || "Email atau password salah.");
    }
  };

  const accent = isPenjual ? "#F4721E" : "#3b5998";
  const registerHref = isPenjual ? "/auth/pilih-umkm" : "/auth/register/pembeli";

  return (
    <SplitLayout
      leftTitle="Selamat Datang!"
      leftTitleColor={isPenjual ? "#7C2D12" : "#1E3A5F"}
      leftIllustration={isPenjual ? <IllustrBerkembang /> : <IllustrPembeli />}
      leftFooter={
        <p style={{ fontSize: 13, color: "#555" }}>
          Tidak memiliki akun?{" "}
          <Link href={registerHref} style={{ color: accent, fontWeight: 700, textDecoration: "underline" }}>
            Daftar
          </Link>
        </p>
      }
      rightBg={isPenjual ? "orange" : "blue"}
    >
      <form onSubmit={handleSubmit}>
        <FormTitle>Masuk</FormTitle>
        <ErrorBox message={error} />
        <IconInput icon="email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <div style={{ position: "relative" }}>
          <IconInput icon="lock" type={showPass ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-60%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", fontSize: 14 }}
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>
        <NextButton loading={loading} label={loading ? "Memproses..." : "Selanjutnya →"} />
        <OrDivider />
        <GoogleButton />
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.6)", cursor: "pointer" }}
          onClick={() => router.push("/auth/pilih-peran")}>
          ← Kembali ke Pilih Peran
        </p>
      </form>
    </SplitLayout>
  );
}
