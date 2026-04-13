"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "pembeli" | "umkm_mikro" | "umkm_berkembang" | null;

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  birthDate?: string;
  avatar?: string;
  role: UserRole;
  storeName?: string;
  storeDescription?: string;
  storeAddress?: string;
  storeLat?: number;
  storeLng?: number;
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
}

export interface RegisterStep1Data {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterStep2Data {
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  birthDate: string;
}

export interface RegisterUMKMData {
  role: "umkm_mikro" | "umkm_berkembang";
  email: string;
  password: string;
  storeName: string;
  storeDescription: string;
  phone: string;
  operationalDays: string;
  openTime: string;
  closeTime: string;
  storeAddress: string;
  storeLat?: number;
  storeLng?: number;
  ktpImage?: File | null;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  cashierPhoto?: File | null;
  interiorPhotos?: File[];
  parkingPhotos?: File[];
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  registerPembeli: (step1: RegisterStep1Data, step2: RegisterStep2Data) => Promise<{ success: boolean; error?: string }>;
  registerUMKM: (data: RegisterUMKMData) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = "marketsita_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setIsLoading(false);
  }, []);

  const persistUser = (u: UserProfile | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: ganti dengan real API
      // const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
      // const data = await res.json();
      // if (!res.ok) return { success: false, error: data.message };
      // persistUser(data.user);
      await new Promise(r => setTimeout(r, 800));
      const mockUser: UserProfile = {
        id: "usr_001", email, name: "Faiz Faadillah",
        firstName: "Faiz", lastName: "Faadillah",
        username: "faizfaa", role: "pembeli", avatar: "",
      };
      persistUser(mockUser);
      return { success: true };
    } catch {
      return { success: false, error: "Terjadi kesalahan. Coba lagi." };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => persistUser(null);

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    persistUser({ ...user, ...data });
  };

  const registerPembeli = async (step1: RegisterStep1Data, step2: RegisterStep2Data) => {
    setIsLoading(true);
    try {
      // TODO: ganti dengan real API
      await new Promise(r => setTimeout(r, 1000));
      persistUser({
        id: "usr_new", email: step1.email,
        name: `${step2.firstName} ${step2.lastName}`,
        firstName: step2.firstName, lastName: step2.lastName,
        username: step2.username, phone: step2.phone,
        birthDate: step2.birthDate, role: "pembeli", avatar: "",
      });
      return { success: true };
    } catch {
      return { success: false, error: "Pendaftaran gagal. Coba lagi." };
    } finally {
      setIsLoading(false);
    }
  };

  const registerUMKM = async (data: RegisterUMKMData) => {
    setIsLoading(true);
    try {
      // TODO: ganti dengan real API (FormData untuk file upload)
      await new Promise(r => setTimeout(r, 1000));
      persistUser({
        id: "seller_new", email: data.email,
        name: data.storeName, role: data.role,
        storeName: data.storeName, storeDescription: data.storeDescription,
        phone: data.phone, storeAddress: data.storeAddress,
        storeLat: data.storeLat, storeLng: data.storeLng,
        bankName: data.bankName, bankAccount: data.bankAccount,
        bankAccountName: data.bankAccountName, avatar: "",
      });
      return { success: true };
    } catch {
      return { success: false, error: "Pendaftaran gagal. Coba lagi." };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile, registerPembeli, registerUMKM }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
