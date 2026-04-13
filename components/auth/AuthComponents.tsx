"use client";
import { useRef, useState } from "react";
import Link from "next/link";

// ─── Split Layout ───────────────────────────────────────────────────────────
interface SplitLayoutProps {
  leftTitle: string;
  leftTitleColor?: string;
  leftIllustration: React.ReactNode;
  leftFooter: React.ReactNode;
  rightBg: "blue" | "orange";
  children: React.ReactNode;
}

const BG = { blue: "#3b5998", orange: "#C2540A" };

export function SplitLayout({ leftTitle, leftTitleColor, leftIllustration, leftFooter, rightBg, children }: SplitLayoutProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      {/* Left */}
      <div style={{ width: "45%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 48px", gap: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: leftTitleColor || "#1E3A5F", fontStyle: "italic", alignSelf: "flex-start" }}>
          {leftTitle}
        </h1>
        <div style={{ width: 260, height: 260, borderRadius: 20, overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          {leftIllustration}
        </div>
        <div style={{ alignSelf: "flex-start", fontSize: 13, color: "#555" }}>
          {leftFooter}
        </div>
      </div>
      {/* Right */}
      <div style={{ width: "55%", background: BG[rightBg], display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 56px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── Form Title ──────────────────────────────────────────────────────────────
export function FormTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 32, textAlign: "center" }}>{children}</h2>;
}

// ─── Input with icon ─────────────────────────────────────────────────────────
interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: "email" | "lock";
}
export function IconInput({ icon, ...props }: IconInputProps) {
  return (
    <div style={{ position: "relative", marginBottom: 14 }}>
      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        {icon === "email" ? (
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ) : (
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )}
      </span>
      <input
        {...props}
        style={{ width: "100%", padding: "13px 14px 13px 42px", borderRadius: 10, border: "none", outline: "none", background: "#f0f0f0", color: "#333", fontSize: 13, fontFamily: "'Poppins', sans-serif" }}
      />
    </div>
  );
}

// ─── Plain input ──────────────────────────────────────────────────────────────
export function PlainInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{ width: "100%", padding: "13px 14px", borderRadius: 10, border: "none", outline: "none", background: "#f0f0f0", color: "#333", fontSize: 13, fontFamily: "'Poppins', sans-serif", ...props.style }}
    />
  );
}

// ─── Plain select ─────────────────────────────────────────────────────────────
export function PlainSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{ width: "100%", padding: "13px 14px", borderRadius: 10, border: "none", outline: "none", background: "#f0f0f0", color: "#333", fontSize: 13, fontFamily: "'Poppins', sans-serif", ...props.style }}
    />
  );
}

// ─── Plain textarea ───────────────────────────────────────────────────────────
export function PlainTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "none", outline: "none", background: "#f0f0f0", color: "#333", fontSize: 13, fontFamily: "'Poppins', sans-serif", resize: "none", height: 88, ...props.style }}
    />
  );
}

// ─── Field label ──────────────────────────────────────────────────────────────
export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>{children}</p>;
}

// ─── Divider ─────────────────────────────────────────────────────────────────
export function OrDivider() {
  return <div style={{ textAlign: "center", color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 600, margin: "14px 0" }}>Atau</div>;
}

// ─── Google button ────────────────────────────────────────────────────────────
export function GoogleButton() {
  return (
    <button type="button" style={{ width: "100%", padding: 12, borderRadius: 10, background: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 13, fontWeight: 700, color: "#333", fontFamily: "'Poppins', sans-serif" }}>
      <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" width={18} height={18} alt="Google" />
      Masuk dengan Google
    </button>
  );
}

// ─── Next button (right-aligned) ─────────────────────────────────────────────
export function NextButton({ onClick, loading, label = "Selanjutnya →" }: { onClick?: () => void; loading?: boolean; label?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6, marginBottom: 4 }}>
      <button
        type={onClick ? "button" : "submit"}
        onClick={onClick}
        disabled={loading}
        style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid #fff", background: "transparent", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Poppins', sans-serif", cursor: "pointer" }}
      >
        {loading ? "Memproses..." : label}
      </button>
    </div>
  );
}

// ─── Nav row (back + forward) ─────────────────────────────────────────────────
export function NavRow({ onBack, onNext, loading, isLast }: { onBack: () => void; onNext: () => void; loading?: boolean; isLast?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
      <button onClick={onBack} style={{ padding: "9px 20px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.5)", background: "transparent", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Poppins', sans-serif", cursor: "pointer" }}>
        ← Kembali
      </button>
      <button onClick={onNext} disabled={loading} style={{ padding: "9px 20px", borderRadius: 8, background: isLast ? "#22A459" : "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "'Poppins', sans-serif", cursor: "pointer" }}>
        {loading ? "Menyimpan..." : isLast ? "Selesai ✓" : "Selanjutnya →"}
      </button>
    </div>
  );
}

// ─── Error box ────────────────────────────────────────────────────────────────
export function ErrorBox({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div style={{ background: "rgba(255,100,100,0.2)", border: "1px solid rgba(255,100,100,0.4)", color: "#ffe0e0", fontSize: 12, borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
      {message}
    </div>
  );
}

// ─── Section divider line ─────────────────────────────────────────────────────
export function DividerLine() {
  return <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", margin: "16px 0 20px" }} />;
}

// ─── Upload Zone ─────────────────────────────────────────────────────────────
interface UploadZoneProps {
  files: File[];
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  hint?: string;
  label?: string;
  thumbWidth?: number;
  thumbHeight?: number;
}

export function UploadZone({ files, onFiles, multiple, hint, label, thumbWidth = 80, thumbHeight = 80 }: UploadZoneProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    const newFiles = multiple ? [...files, ...picked] : [picked[0]];
    onFiles(newFiles);
    setPreviews(newFiles.map(f => URL.createObjectURL(f)));
  };

  const remove = (i: number) => {
    const newFiles = files.filter((_, j) => j !== i);
    onFiles(newFiles);
    setPreviews(newFiles.map(f => URL.createObjectURL(f)));
  };

  return (
    <div>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div
        onClick={() => ref.current?.click()}
        style={{ border: "1.5px dashed rgba(255,255,255,0.45)", borderRadius: 12, padding: 14, cursor: "pointer", display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}
      >
        <input ref={ref} type="file" accept="image/*" multiple={multiple} style={{ display: "none" }} onChange={handleChange} />
        {/* Add button */}
        <div style={{ width: thumbWidth, height: thumbHeight, background: "rgba(255,255,255,0.12)", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: "#fff", flexShrink: 0 }}>
          <span style={{ fontSize: 22, fontWeight: 300 }}>+</span>
          <span style={{ fontSize: 9, fontWeight: 600, textAlign: "center", opacity: 0.9 }}>Unggah Foto</span>
          {hint && <span style={{ fontSize: 8, opacity: 0.6, textAlign: "center", padding: "0 4px" }}>{hint}</span>}
          <span style={{ fontSize: 8, opacity: 0.5, textAlign: "center" }}>Format: JPG / PNG<br/>Maks. 5 MB</span>
        </div>
        {/* Previews */}
        {previews.map((src, i) => (
          <div key={i} style={{ width: thumbWidth, height: thumbHeight, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.3)", flexShrink: 0, position: "relative" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <button
              onClick={e => { e.stopPropagation(); remove(i); }}
              style={{ position: "absolute", top: 2, right: 2, width: 16, height: 16, background: "rgba(0,0,0,0.6)", color: "#fff", borderRadius: "50%", border: "none", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
            >×</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── KTP Upload Zone ─────────────────────────────────────────────────────────
export function KTPZone({ file, onFile }: { file: File | null; onFile: (f: File | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    onFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  return (
    <div style={{ display: "flex", gap: 10, border: "1.5px dashed rgba(255,255,255,0.4)", borderRadius: 12, padding: 14 }}>
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={handleChange} />
      {/* Left: upload prompt */}
      <div
        onClick={() => ref.current?.click()}
        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, color: "#fff", minHeight: 100, cursor: "pointer" }}
      >
        <span style={{ fontSize: 20, fontWeight: 300 }}>+</span>
        <span style={{ fontSize: 11, fontWeight: 600 }}>Unggah Foto</span>
        <span style={{ fontSize: 9, opacity: 0.6, textAlign: "center" }}>Pastikan foto KTP jelas dan tidak terpotong<br />Format: JPG / PNG<br />Maks. 5 MB</span>
      </div>
      {/* Right: preview */}
      <div style={{ flex: 1.2, background: "#dbe8f5", borderRadius: 8, minHeight: 110, position: "relative", overflow: "hidden" }}>
        {preview ? (
          <>
            <img src={preview} alt="KTP" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
            <button
              onClick={() => { onFile(null); setPreview(null); }}
              style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16, background: "#333", color: "#fff", borderRadius: "50%", border: "none", cursor: "pointer", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}
            >×</button>
          </>
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#888" }}>Preview KTP</div>
        )}
      </div>
    </div>
  );
}

// ─── Bank Section ─────────────────────────────────────────────────────────────
interface BankSectionProps {
  bankName: string; onBankName: (v: string) => void;
  bankAccount: string; onBankAccount: (v: string) => void;
  bankAccountName: string; onBankAccountName: (v: string) => void;
}
export function BankSection({ bankName, onBankName, bankAccount, onBankAccount, bankAccountName, onBankAccountName }: BankSectionProps) {
  const inp = { width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", outline: "none", background: "#f0f0f0", color: "#333", fontSize: 12, fontFamily: "'Poppins', sans-serif", marginBottom: 8 } as const;
  const lbl = { fontSize: 10, color: "rgba(255,255,255,0.7)", marginBottom: 4, display: "block" } as const;
  return (
    <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: 16, marginTop: 4 }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: 8, marginBottom: 12 }}>Rekening Bank</p>
      <span style={lbl}>Nama Bank</span>
      <select value={bankName} onChange={e => onBankName(e.target.value)} style={inp}>
        <option value="">Pilih bank...</option>
        {["BCA","BRI","BNI","Mandiri","BSI","CIMB","Danamon","Lainnya"].map(b => <option key={b}>{b}</option>)}
      </select>
      <span style={lbl}>Nomor Rekening</span>
      <input type="text" value={bankAccount} onChange={e => onBankAccount(e.target.value)} placeholder="Masukkan nomor rekening" style={inp} />
      <span style={lbl}>Nama Pemilik Rekening</span>
      <input type="text" value={bankAccountName} onChange={e => onBankAccountName(e.target.value)} placeholder="Masukkan nama pemilik rekening" style={{ ...inp, marginBottom: 0 }} />
    </div>
  );
}

// ─── Map Picker ───────────────────────────────────────────────────────────────
export function MapPicker({ lat, lng, onSelect }: { lat?: number; lng?: number; onSelect: (lat: number, lng: number) => void }) {
  return (
    <div>
      <div
        onClick={() => { onSelect(-7.005145, 110.438125); }}
        style={{ width: "100%", height: 170, background: "#dbe8f5", borderRadius: 10, overflow: "hidden", position: "relative", cursor: "pointer" }}
      >
        {/* Static map image - replace with real Leaflet/Google Maps */}
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, color: "#666", fontSize: 12, textAlign: "center" }}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span style={{ fontWeight: 600 }}>Klik untuk pilih lokasi di peta</span>
          <span style={{ opacity: 0.6, fontSize: 11 }}>Integrasi Google Maps / Leaflet</span>
        </div>
        {lat && lng && (
          <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center" }}>
            <span style={{ background: "rgba(255,255,255,0.9)", color: "#333", fontSize: 11, padding: "3px 10px", borderRadius: 20 }}>
              📍 {lat.toFixed(6)}, {lng.toFixed(6)}
            </span>
          </div>
        )}
      </div>
      {lat && lng && (
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textAlign: "center", marginTop: 8 }}>
          Latitude : <strong style={{ color: "#fff" }}>{lat.toFixed(6)}</strong> &nbsp;&nbsp; Longtitude : <strong style={{ color: "#fff" }}>{lng.toFixed(6)}</strong>
        </p>
      )}
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
export function SuccessScreen({ bg, onBack }: { bg: string; onBack: () => void }) {
  return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center", padding: 40, fontFamily: "'Poppins', sans-serif" }}>
      <div style={{ width: 140, height: 140, background: "#fff", borderRadius: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          <path d="M14 37L28 51L56 20" stroke="#22A459" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: 1 }}>SELAMAT!!!</h2>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>Pembuatan akun selesai, menunggu konfirmasi admin</p>
      <button onClick={onBack} style={{ padding: "10px 24px", borderRadius: 8, border: "1.5px solid rgba(255,255,255,0.5)", background: "transparent", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif", marginTop: 8 }}>
        ← Kembali ke halaman login
      </button>
    </div>
  );
}

// ─── Illustrations (SVG inline) ───────────────────────────────────────────────
export function IllustrPembeli({ bg = "linear-gradient(160deg,#D6E9FC,#3683DF)" }: { bg?: string }) {
  return (
    <div style={{ width: 260, height: 260, background: bg, borderRadius: 20, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
      <svg viewBox="0 0 240 240" width="240" height="240">
        <circle cx="120" cy="95" r="30" fill="#fff" opacity="0.9"/>
        <circle cx="120" cy="81" r="14" fill="#3683DF" opacity="0.8"/>
        <path d="M90 108 Q120 122 150 108" fill="#fff" opacity="0.7"/>
        <rect x="50" y="140" width="140" height="14" rx="7" fill="#fff" opacity="0.4"/>
        <rect x="70" y="160" width="100" height="10" rx="5" fill="#fff" opacity="0.25"/>
        <rect x="20" y="80" width="36" height="36" rx="6" fill="#fff" opacity="0.15"/>
        <rect x="184" y="140" width="36" height="36" rx="6" fill="#fff" opacity="0.15"/>
      </svg>
    </div>
  );
}

export function IllustrMikro({ bg = "linear-gradient(160deg,#D6E9FC,#3683DF)" }: { bg?: string }) {
  return (
    <div style={{ width: 260, height: 260, background: bg, borderRadius: 20, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
      <svg viewBox="0 0 240 240" width="240" height="240">
        <rect x="30" y="110" width="180" height="90" rx="10" fill="#fff" opacity="0.2"/>
        <path d="M10 110 Q120 60 230 110 L230 125 Q120 75 10 125 Z" fill="#fff" opacity="0.4"/>
        <ellipse cx="80" cy="130" rx="24" ry="18" fill="#1E56A0" opacity="0.7"/>
        <ellipse cx="160" cy="130" rx="24" ry="18" fill="#1E56A0" opacity="0.7"/>
        <rect x="55" y="100" width="130" height="40" rx="8" fill="#fff" opacity="0.5"/>
        <circle cx="120" cy="108" r="15" fill="#fff" opacity="0.9"/>
        <circle cx="120" cy="99" r="7" fill="#3683DF" opacity="0.8"/>
        <rect x="70" y="150" width="50" height="40" rx="4" fill="#fff" opacity="0.3"/>
        <rect x="130" y="155" width="40" height="32" rx="4" fill="#fff" opacity="0.25"/>
      </svg>
    </div>
  );
}

export function IllustrBerkembang({ bg = "linear-gradient(160deg,#FFCF98,#F4721E)" }: { bg?: string }) {
  return (
    <div style={{ width: 260, height: 260, background: bg, borderRadius: 20, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
      <svg viewBox="0 0 240 240" width="240" height="240">
        <rect x="20" y="80" width="200" height="120" rx="10" fill="#fff" opacity="0.2"/>
        <path d="M0 80 Q120 30 240 80 L240 96 Q120 46 0 96 Z" fill="#fff" opacity="0.4"/>
        <rect x="40" y="100" width="70" height="90" rx="6" fill="#fff" opacity="0.3"/>
        <rect x="130" y="120" width="80" height="70" rx="6" fill="#fff" opacity="0.3"/>
        <rect x="50" y="112" width="50" height="18" rx="4" fill="#F4721E" opacity="0.6"/>
        <rect x="140" y="130" width="60" height="10" rx="3" fill="#fff" opacity="0.5"/>
        <rect x="140" y="145" width="45" height="10" rx="3" fill="#fff" opacity="0.4"/>
        <circle cx="100" cy="88" r="14" fill="#fff" opacity="0.85"/>
        <circle cx="100" cy="80" r="6" fill="#F4721E" opacity="0.7"/>
        <path d="M86 95 Q100 101 114 95" fill="#F4721E" opacity="0.4"/>
      </svg>
    </div>
  );
}
