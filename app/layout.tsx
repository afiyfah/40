import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Market Kita",
  description: "Platform UMKM makanan lokal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className="bg-[#FDFDFD]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
