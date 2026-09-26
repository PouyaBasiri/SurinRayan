"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, PhoneCall, User, Sparkles } from "lucide-react";

const navigation = [
  { name: "صفحه اصلی", href: "/" },
  { name: "مقالات", href: "/articles" },
  { name: "درباره رایان توسعه سورین", href: "/about" },
  { name: "خدمات ما", href: "/services" },
  { name: "تماس با ما", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 overflow-hidden transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-blue-500/20 shadow-2xl shadow-blue-950/40 py-3"
          : "bg-slate-950/60 backdrop-blur-md border-b border-slate-800/60 py-4"
      }`}
    >
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        {/* ۱. خط شبکه توری شطرنجی (Grid Background) */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* ۲. گوی‌های نوری متحرک (Animated Gradient Blobs) */}
        <div className="absolute -top-10 right-1/4 h-32 w-64 rounded-full bg-blue-600/70 blur-3xl animate-pulse" />
        <div className="absolute top-0 left-1/3 h-28 w-56 rounded-full bg-indigo-500/70 blur-3xl animate-pulse [animation-delay:1.5s]" />
        <div className="absolute -bottom-10 right-1/3 h-24 w-48 rounded-full bg-cyan-500/70 blur-2xl animate-pulse [animation-delay:3s]" />

        {/* ۳. خطوط درخشان نوری لایزر متحرک (Laser Shimmer Line) */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/90 to-transparent animate-shimmer" />
      </div>

      {/* ============================================================ */}
      {/* 🧭 محتوای منو (Navigation Content) */}
      {/* ============================================================ */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8 transition-all duration-300" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1 items-center gap-2">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-black text-blue-500 tracking-tight group">
              <Sparkles className="h-5 w-5 text-blue-400 animate-spin-slow group-hover:scale-110 transition-transform" />
              <Image
                   src="/assets/images/Photoroom.png" 
                   alt="سورین رایان"
                   width={120} 
                   height={40} 
                   priority
                  className="h-18 w-auto object-contain transition-transform group-hover:scale-105 opacity-80"
                />
            </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-semibold leading-6 text-slate-300 hover:text-blue-400 transition-colors group py-1"
            >
              {item.name}
              {/* انیمیشن خط زیر لینک‌ها در هور (Hover Indicator) */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Header CTA Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-3">
          <Link
            href="/contact"
            className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <PhoneCall className="h-4 w-4" />
            درخواست مشاوره
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900/80 border border-slate-700/80 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all"
          >
            <User className="h-4 w-4" />
            پنل مدیریت
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-6 py-5 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-base font-medium text-slate-200 hover:text-blue-400 transition-colors py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 space-y-2 border-t border-slate-800/80">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                <PhoneCall className="h-4 w-4" />
                درخواست مشاوره
              </Link>
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                پنل مدیریت
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}