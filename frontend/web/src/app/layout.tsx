import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "سورین رایان | راهکارهای توسعه نرم‌افزار و سامانه‌های سازمانی",
  description: "شرکت سورین رایان ارائه‌دهنده خدمات تخصصی نرم‌افزار، مشاوره فنی و طراحی سامانه‌های سازمانی با فناوری‌های روز.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="flex min-h-screen flex-col justify-between antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}